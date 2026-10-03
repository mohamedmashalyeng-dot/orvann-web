<?php
/**
 * Start a Project form handler (Contact page). The site itself is static; the host runs
 * this one file with PHP and emails the details to ORVANN.
 *
 * Sent from info@orvann.com through the host's own mail service (orvann.com's mail and SPF
 * are on Hostinger), with Reply-To set to the visitor, so a reply goes straight to them.
 * Answers JSON to the page's script; without JavaScript it redirects back to the form with
 * ?sent=1 or ?failed=1.
 */
declare(strict_types=1);

const RECIPIENT = 'info@orvann.com';
const SENDER = 'info@orvann.com';

$services = [
    'strategy' => 'Strategy & Consulting',
    'branding' => 'Branding & Creative',
    'marketing' => 'Marketing & Media',
    'digital' => 'Digital Experiences',
    'events' => 'Events, Outdoor & Production',
    'multiple' => 'Multiple Services',
    'unsure' => 'Not Sure Yet',
];

$wantsJson = strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;
$lang = ($_POST['lang'] ?? '') === 'ar' ? 'ar' : 'en';

/** Answers and stops. (Plain PHP 7 syntax: the host's PHP version may vary.) */
function finish(bool $ok, int $status, bool $wantsJson, string $lang): void
{
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode(['ok' => $ok]);
    } else {
        $page = $lang === 'ar' ? '/ar/contact-us/' : '/contact-us/';
        header('Location: ' . $page . ($ok ? '?sent=1' : '?failed=1') . '#project-form', true, 303);
    }
    exit;
}

/** One line of text: no line breaks (they could inject mail headers), trimmed and capped. */
function line(string $key, int $max): string
{
    $value = trim(preg_replace('/[\r\n\t]+/', ' ', (string) ($_POST[$key] ?? '')));
    return mb_substr($value, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    finish(false, 405, $wantsJson, $lang);
}

// Honeypot: people never see this field. A bot that fills it gets a quiet "thank you".
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    finish(true, 200, $wantsJson, $lang);
}

$name = line('name', 120);
$company = line('company', 160);
$email = line('email', 200);
$phone = line('phone', 60);
$need = line('need', 40);
$start = line('start', 200);
$budget = line('budget', 200);
$goal = mb_substr(trim(str_replace("\r\n", "\n", (string) ($_POST['goal'] ?? ''))), 0, 4000);

if ($name === '' || $goal === '' || !isset($services[$need]) || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    finish(false, 422, $wantsJson, $lang);
}

$rows = [
    'Name' => $name,
    'Company' => $company,
    'Work email' => $email,
    'Phone / WhatsApp' => $phone,
    'What do you need?' => $services[$need],
    'When do you need to start?' => $start,
    'Estimated budget range' => $budget,
    'Form language' => $lang === 'ar' ? 'Arabic' : 'English',
];
$body = "New project details from the website (Start a Project form).\n\n";
foreach ($rows as $label => $value) {
    $body .= $label . ': ' . ($value === '' ? '(not given)' : $value) . "\n";
}
$body .= "\nWhat are you trying to achieve?\n" . $goal . "\n";

$subject = 'Project enquiry: ' . $name . ($company !== '' ? ' (' . $company . ')' : '');
$headers = [
    'From' => 'ORVANN Website <' . SENDER . '>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];

$sent = mail(
    RECIPIENT,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    $headers,
    '-f' . SENDER
);

finish($sent, $sent ? 200 : 500, $wantsJson, $lang);
