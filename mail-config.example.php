<?php
// Sends the forms' email over SMTP as the info@orvann.com mailbox (see public/api/mailer.php).
// The deploy writes this file to the server from the repository secret SMTP_PASSWORD, so
// usually nothing needs doing here. To set it by hand instead: copy it to
// public/api/mail-config.php (not committed: it holds the mailbox password) or create it in
// hPanel's File Manager at public_html/api/mail-config.php.
return [
    'host' => 'smtp.hostinger.com',
    'port' => 465,          // 465 with 'ssl', or 587 with 'tls'
    'secure' => 'ssl',
    'username' => 'info@orvann.com',
    'password' => '',       // the info@orvann.com mailbox password (hPanel → Emails)
];
