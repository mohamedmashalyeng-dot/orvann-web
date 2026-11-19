<?php
/**
 * How the form handlers (project.php, careers.php) send their email. Included by them only;
 * public/.htaccess refuses it, mail-config.php and mail.log to visitors.
 *
 * With api/mail-config.php on the server (see mail-config.example.php; the deploy can write
 * it from the SMTP_PASSWORD secret), each email goes out over SMTP, signed in as the
 * info@orvann.com mailbox on Hostinger's mail server: the way that mailbox's own mail goes,
 * so it is delivered and not dropped as spoofed. Without it, PHP's mail() is used, as before.
 * A failure is written to api/mail.log (one line, never the message), so it can be seen.
 */
declare(strict_types=1);

const MAIL_CONFIG = __DIR__ . '/mail-config.php';
const MAIL_LOG = __DIR__ . '/mail.log';

/**
 * Sends one email. $subject is plain text (encoded here); $headers are the message's own
 * (From, Reply-To, MIME-Version, Content-Type, Content-Transfer-Encoding). True once the
 * mail server has accepted it.
 */
function sendMail(string $to, string $from, string $subject, string $body, array $headers): bool
{
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $config = is_file(MAIL_CONFIG) ? (array) require MAIL_CONFIG : [];

    if (($config['host'] ?? '') === '' || ($config['password'] ?? '') === '') {
        $ok = mail($to, $encodedSubject, $body, $headers, '-f' . $from);
        if (!$ok) {
            mailLog('mail() refused the message (no mail-config.php, so SMTP was not tried)');
        }
        return $ok;
    }

    // 8-bit text is sent as base64 so no server along the way has to carry raw UTF-8.
    if (strtolower((string) ($headers['Content-Transfer-Encoding'] ?? '')) === '8bit') {
        $headers['Content-Transfer-Encoding'] = 'base64';
        $body = chunk_split(base64_encode($body));
    }
    $domain = substr(strrchr($from, '@') ?: '@localhost', 1);
    $message = 'Date: ' . date('r') . "\r\n"
        . 'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . $domain . ">\r\n"
        . 'To: ' . $to . "\r\n"
        . 'Subject: ' . $encodedSubject . "\r\n";
    foreach ($headers as $name => $value) {
        $message .= $name . ': ' . $value . "\r\n";
    }
    $message .= "\r\n" . preg_replace("/\r?\n/", "\r\n", $body);

    $error = smtpSend($config, $from, $to, $message);
    if ($error === '') {
        return true;
    }
    mailLog('SMTP: ' . $error);
    // The mailbox could not be reached or refused us: try the host's own mail as a last resort.
    $ok = mail($to, $encodedSubject, preg_replace("/\r\n/", "\n", substr($message, strpos($message, "\r\n\r\n") + 4)), $headers, '-f' . $from);
    if (!$ok) {
        mailLog('mail() fallback refused the message too');
    }
    return $ok;
}

/** One SMTP conversation. Returns '' when the message was accepted, else what went wrong. */
function smtpSend(array $config, string $from, string $to, string $message): string
{
    $host = (string) $config['host'];
    $port = (int) ($config['port'] ?? 465);
    $user = (string) ($config['username'] ?? $from);
    $secure = (string) ($config['secure'] ?? ($port === 465 ? 'ssl' : 'tls'));

    // 'ssl' (port 465) or 'tls' (STARTTLS, port 587); 'none' is for a local test server only.
    $address = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $socket = @stream_socket_client($address, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, stream_context_create([
        'ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true, 'peer_name' => $host],
    ]));
    if (!$socket) {
        return "cannot connect to $host:$port ($errstr)";
    }
    stream_set_timeout($socket, 20);

    $read = function () use ($socket): array {
        $text = '';
        while (($line = fgets($socket, 1024)) !== false) {
            $text .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return [(int) substr($text, 0, 3), trim($text)];
    };
    // $label names the step in the log; the command itself is never logged (it may be the password).
    $say = function (string $command, array $expect, string $label) use ($socket, $read): string {
        fwrite($socket, $command . "\r\n");
        [$code, $text] = $read();
        return in_array($code, $expect, true) ? '' : "$label answered $code: " . substr($text, 0, 200);
    };

    $result = (function () use ($socket, $read, $say, $secure, $host, $user, $config, $from, $to, $message): string {
        [$code, $text] = $read();
        if ($code !== 220) {
            return "greeting $code: " . substr($text, 0, 200);
        }
        $name = gethostname() ?: 'orvann.com';
        if (($error = $say("EHLO $name", [250], 'EHLO')) !== '') {
            return $error;
        }
        if ($secure === 'tls') {
            if (($error = $say('STARTTLS', [220], 'STARTTLS')) !== '') {
                return $error;
            }
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                return 'STARTTLS handshake failed';
            }
            if (($error = $say("EHLO $name", [250], 'EHLO')) !== '') {
                return $error;
            }
        }
        $steps = [
            ['AUTH LOGIN', [334], 'AUTH LOGIN'],
            [base64_encode($user), [334], 'username'],
            [base64_encode((string) $config['password']), [235], 'password (sign-in refused)'],
            ["MAIL FROM:<$from>", [250], 'MAIL FROM'],
            ["RCPT TO:<$to>", [250, 251], 'RCPT TO'],
            ['DATA', [354], 'DATA'],
        ];
        foreach ($steps as [$command, $expect, $label]) {
            if (($error = $say($command, $expect, $label)) !== '') {
                return $error;
            }
        }
        // A line that starts with a dot gets a second one, so it cannot end the message early.
        $data = preg_replace('/^\./m', '..', $message);
        return $say(rtrim($data, "\r\n") . "\r\n.", [250], 'message');
    })();

    @fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return $result;
}

/** One line in api/mail.log: when, and what failed. Kept short; the file stays small. */
function mailLog(string $what): void
{
    if (is_file(MAIL_LOG) && filesize(MAIL_LOG) > 200000) {
        @rename(MAIL_LOG, MAIL_LOG . '.old');
    }
    @file_put_contents(MAIL_LOG, gmdate('Y-m-d H:i:s') . ' UTC  ' . str_replace(["\r", "\n"], ' ', $what) . "\n", FILE_APPEND | LOCK_EX);
}
