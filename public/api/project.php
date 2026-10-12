<?php
/**
 * Start a Project form handler (Contact page). The site itself is static; the host runs
 * this one file with PHP, records the enquiry as a lead in ORVANN's CRM and emails the
 * details to ORVANN.
 *
 * Sent from info@orvann.com through the host's own mail service (orvann.com's mail and SPF
 * are on Hostinger), with Reply-To set to the visitor, so a reply goes straight to them.
 * The email says whether the CRM took the lead; either one arriving counts as sent.
 * Answers JSON to the page's script; without JavaScript it redirects back to the form with
 * ?sent=1 or ?failed=1.
 */
declare(strict_types=1);

const RECIPIENT = 'info@orvann.com';
const SENDER = 'info@orvann.com';

// Where the CRM is and the key it knows this site by: ['url' => …, 'key' => …]. The key is
// a secret, so the file is kept out of the repository (see crm-config.example.php);
// without it the form only emails.
const CRM_CONFIG = __DIR__ . '/crm-config.php';

// The form's lists, by the id it sends (the CRM's own ids) and named for the email. Keep
// them in step with src/content/lead-options.ts and the CRM's config.js.
$services = [
    'strategy' => 'Strategy & Consulting',
    'branding' => 'Branding & Creative',
    'marketing' => 'Marketing & Media',
    'digital' => 'Digital Experiences',
    'events' => 'Events, Outdoor & Production',
    'multiple' => 'Multiple Services',
    'unsure' => 'Not Sure Yet',
];
$jobTitles = [
    'owner' => 'Business Owner / Founder',
    'ceo' => 'CEO / General Manager',
    'marketing-head' => 'Marketing Manager',
    'manager' => 'Department Manager',
    'employee' => 'Employee / Specialist',
    'freelancer' => 'Freelancer',
    'student' => 'Student',
    'other' => 'Other',
];
$regions = [
    'cairo' => 'Cairo',
    'giza' => 'Giza',
    'qalyubia' => 'Qalyubia',
    'alexandria' => 'Alexandria',
    'beheira' => 'Beheira',
    'matrouh' => 'Matrouh',
    'sharqia' => 'Sharqia',
    'dakahlia' => 'Dakahlia',
    'gharbia' => 'Gharbia',
    'monufia' => 'Monufia',
    'kafr-el-sheikh' => 'Kafr El Sheikh',
    'damietta' => 'Damietta',
    'port-said' => 'Port Said',
    'ismailia' => 'Ismailia',
    'suez' => 'Suez',
    'north-sinai' => 'North Sinai',
    'south-sinai' => 'South Sinai',
    'fayoum' => 'Fayoum',
    'beni-suef' => 'Beni Suef',
    'minya' => 'Minya',
    'assiut' => 'Assiut',
    'sohag' => 'Sohag',
    'qena' => 'Qena',
    'luxor' => 'Luxor',
    'aswan' => 'Aswan',
    'red-sea' => 'Red Sea',
    'new-valley' => 'New Valley',
    'saudi' => 'Saudi Arabia',
    'uae' => 'United Arab Emirates',
    'kuwait' => 'Kuwait',
    'qatar' => 'Qatar',
    'bahrain' => 'Bahrain',
    'oman' => 'Oman',
    'other-country' => 'Another Country',
];
$timelines = [
    'asap' => 'Immediately',
    'month' => 'Within a Month',
    'quarter' => 'Within 3 Months',
    'exploring' => 'Just Exploring',
];
$budgets = [
    'lt-10k' => 'Under EGP 10,000',
    '10k-50k' => 'EGP 10,000 - 50,000',
    '50k-200k' => 'EGP 50,000 - 200,000',
    'gt-200k' => 'Over EGP 200,000',
    'unknown' => 'Not Decided Yet',
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

/** A choice from one of the lists above: its id, or nothing when it is not on the list. */
function choice(string $key, array $list): string
{
    $id = line($key, 40);
    return isset($list[$id]) ? $id : '';
}

/** Records the lead in the CRM (POST to its /api/leads, as JSON). False if it did not take it. */
function sendToCrm(string $url, string $key, array $lead): bool
{
    if (!function_exists('curl_init')) {
        return false;
    }
    $request = curl_init($url);
    curl_setopt_array($request, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE),
        // The key tells the CRM this is the website's server, not one visitor to rate limit.
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json', 'X-CRM-Key: ' . $key],
        CURLOPT_RETURNTRANSFER => true,
        // The visitor is waiting: a CRM that is slow or down must not hold up the email.
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_TIMEOUT => 6,
    ]);
    $response = curl_exec($request);
    $status = (int) curl_getinfo($request, CURLINFO_RESPONSE_CODE);
    $result = is_string($response) ? json_decode($response, true) : null;

    return $status >= 200 && $status < 300 && is_array($result) && ($result['ok'] ?? false) === true;
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
$jobTitle = choice('job_title', $jobTitles);
$company = line('company', 160);
$email = line('email', 200);
$phone = line('phone', 60);
$region = choice('region', $regions);
$city = line('city', 120);
$need = line('need', 40);
$timeline = choice('timeline', $timelines);
$budget = choice('budget', $budgets);
$goal = mb_substr(trim(str_replace("\r\n", "\n", (string) ($_POST['goal'] ?? ''))), 0, 4000);

// The page also asks for a phone number, job title and region. They are not insisted on
// here, so an enquiry that can be answered is never turned away over one of them.
if ($name === '' || $goal === '' || !isset($services[$need]) || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    finish(false, 422, $wantsJson, $lang);
}

$crm = is_file(CRM_CONFIG) ? (array) require CRM_CONFIG : [];
$crmUrl = (string) ($crm['url'] ?? '');
$recorded = $crmUrl !== '' && sendToCrm($crmUrl, (string) ($crm['key'] ?? ''), [
    'full_name' => $name,
    'email' => $email,
    'phone' => $phone,
    'company' => $company,
    'job_title' => $jobTitle,
    'region' => $region,
    'city' => $city,
    'service' => $need,
    'timeline' => $timeline,
    'budget' => $budget,
    'message' => $goal,
    'source' => 'orvann.com (' . $lang . ')',
]);

$rows = [
    'Name' => $name,
    'Job title' => $jobTitles[$jobTitle] ?? '',
    'Company' => $company,
    'Work email' => $email,
    'Phone / WhatsApp' => $phone,
    'Governorate / Country' => $regions[$region] ?? '',
    'City / Area' => $city,
    'What do you need?' => $services[$need],
    'When do you need to start?' => $timelines[$timeline] ?? '',
    'Estimated budget range' => $budgets[$budget] ?? '',
    'Form language' => $lang === 'ar' ? 'Arabic' : 'English',
    'CRM' => $recorded
        ? 'Recorded as a lead'
        : ($crmUrl === '' ? 'Not connected on this server (no crm-config.php)' : 'NOT recorded - add this enquiry by hand'),
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

$ok = $sent || $recorded;
finish($ok, $ok ? 200 : 500, $wantsJson, $lang);
