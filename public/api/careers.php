<?php
/**
 * Careers & Internships form handler. Like project.php: the host runs this one file with
 * PHP, records the application in ORVANN's CRM (its Applications section, CV and portfolio
 * included) and emails it to ORVANN with the files attached.
 *
 * Sent from info@orvann.com through the host's own mail, with Reply-To set to the
 * applicant. The CRM connection is the project form's (crm-config.php, same key); the
 * application goes to the CRM's /api/applications, next to its /api/leads. Either one
 * taking the application counts as sent. Answers JSON to the page's script; without
 * JavaScript it redirects back to the form with ?sent=1 or ?failed=1.
 */
declare(strict_types=1);

const RECIPIENT = 'info@orvann.com';
const SENDER = 'info@orvann.com';
const CRM_CONFIG = __DIR__ . '/crm-config.php';

// Upload limits in MB, as the page states them (careerFileLimits in src/content/career-options.ts).
const MAX_CV_MB = 5;
const MAX_PORTFOLIO_MB = 10;

// The form's lists, by the id it sends (the CRM's own ids) and named for the email. Keep
// them in step with src/content/career-options.ts and 'applications' in the CRM's app/config.php.
$educations = [
    'student' => 'Current Student',
    'graduate' => 'Graduate',
];
$experiences = [
    'none' => 'No Experience Yet',
    'lt-1' => 'Less than 1 Year',
    '1-3' => '1-3 Years',
    '3-5' => '3-5 Years',
    '5-plus' => 'More than 5 Years',
];
$employments = [
    'available' => 'Available Full-Time',
    'employed' => 'Currently Employed Elsewhere',
    'freelance' => 'Working Freelance',
];
$interests = [
    'job' => 'Job Opportunity',
    'internship' => 'Internship',
];
$arrangementNames = [
    'full-time' => 'Full-Time',
    'part-time' => 'Part-Time',
    'on-site' => 'On-Site',
    'remote' => 'Remote',
];
// Governorates and countries: the project form's list (src/content/lead-options.ts).
$regions = [
    'cairo' => 'Cairo', 'giza' => 'Giza', 'qalyubia' => 'Qalyubia',
    'alexandria' => 'Alexandria', 'beheira' => 'Beheira', 'matrouh' => 'Matrouh',
    'sharqia' => 'Sharqia', 'dakahlia' => 'Dakahlia', 'gharbia' => 'Gharbia', 'monufia' => 'Monufia',
    'kafr-el-sheikh' => 'Kafr El Sheikh', 'damietta' => 'Damietta',
    'port-said' => 'Port Said', 'ismailia' => 'Ismailia', 'suez' => 'Suez', 'north-sinai' => 'North Sinai',
    'south-sinai' => 'South Sinai',
    'fayoum' => 'Fayoum', 'beni-suef' => 'Beni Suef', 'minya' => 'Minya',
    'assiut' => 'Assiut', 'sohag' => 'Sohag', 'qena' => 'Qena', 'luxor' => 'Luxor', 'aswan' => 'Aswan',
    'red-sea' => 'Red Sea', 'new-valley' => 'New Valley',
    'saudi' => 'Saudi Arabia', 'uae' => 'United Arab Emirates', 'kuwait' => 'Kuwait', 'qatar' => 'Qatar',
    'bahrain' => 'Bahrain', 'oman' => 'Oman',
    'other-country' => 'Another Country',
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
        $page = $lang === 'ar' ? '/ar/careers/' : '/careers/';
        header('Location: ' . $page . ($ok ? '?sent=1' : '?failed=1') . '#application-form', true, 303);
    }
    exit;
}

/** One line of text: no line breaks (they could inject mail headers), trimmed and capped. */
function line(string $key, int $max): string
{
    $value = $_POST[$key] ?? '';
    $value = trim(preg_replace('/[\r\n\t]+/', ' ', is_string($value) ? $value : ''));
    return mb_substr($value, 0, $max);
}

function choice(string $key, array $list): string
{
    $id = line($key, 40);
    return isset($list[$id]) ? $id : '';
}

/** A web address: http(s) only; "linkedin.com/in/x" gets https:// in front. */
function url(string $key): string
{
    $value = line($key, 300);
    if ($value === '') {
        return '';
    }
    if (!preg_match('#^https?://#i', $value)) {
        $value = 'https://' . $value;
    }
    return filter_var($value, FILTER_VALIDATE_URL) !== false ? $value : '';
}

/**
 * One uploaded file, checked by size, extension and content (a PDF starts %PDF, a .docx is a
 * ZIP, a .doc an OLE file). Returns ['path', 'name', 'type'], null when none was sent, or false
 * when one was sent and cannot be accepted.
 */
function upload(string $key, array $types, int $maxMb)
{
    $file = $_FILES[$key] ?? null;
    if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }
    if ($file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) {
        return false;
    }
    if ($file['size'] <= 0 || $file['size'] > $maxMb * 1024 * 1024) {
        return false;
    }
    $name = basename(str_replace('\\', '/', (string) $file['name']));
    $name = mb_substr(preg_replace('/[\x00-\x1f\x7f"\\\\\/:*?<>|]+/u', ' ', $name) ?? 'file', 0, 160);
    $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    $signatures = ['pdf' => '%PDF-', 'docx' => "PK\x03\x04", 'doc' => "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1"];
    $mimes = [
        'pdf' => 'application/pdf',
        'doc' => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!in_array($ext, $types, true)) {
        return false;
    }
    $head = (string) file_get_contents($file['tmp_name'], false, null, 0, 8);
    if (strpos($head, $signatures[$ext]) !== 0) {
        return false;
    }
    return ['path' => $file['tmp_name'], 'name' => $name, 'type' => $mimes[$ext]];
}

/** The CRM's applications address, next to the leads one in crm-config.php. */
function applicationsUrl(array $crm): string
{
    if (!empty($crm['applications_url'])) {
        return (string) $crm['applications_url'];
    }
    $leads = (string) ($crm['url'] ?? '');
    if ($leads === '') {
        return '';
    }
    // https://crm.orvann.com/api/leads, or …/api/index.php?r=leads where rewriting is off.
    $url = preg_replace('#([?&]r=)leads\b#', '$1applications', $leads, 1, $count);
    return $count ? $url : preg_replace('#/leads/?$#', '/applications', $leads);
}

/** Records the application in the CRM (multipart POST, files included). False if it did not take it. */
function sendToCrm(string $url, string $key, array $fields, array $files): bool
{
    if (!function_exists('curl_init') || !class_exists('CURLFile')) {
        return false;
    }
    $body = [];
    foreach ($fields as $name => $value) {
        if (is_array($value)) {
            foreach (array_values($value) as $i => $item) {
                $body[$name . '[' . $i . ']'] = $item;
            }
        } else {
            $body[$name] = $value;
        }
    }
    foreach ($files as $name => $file) {
        $body[$name] = new CURLFile($file['path'], $file['type'], $file['name']);
    }
    $request = curl_init($url);
    curl_setopt_array($request, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => ['Accept: application/json', 'X-CRM-Key: ' . $key],
        CURLOPT_RETURNTRANSFER => true,
        // Files take longer than a lead, but the applicant is still waiting.
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_TIMEOUT => 20,
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
$phone = line('phone', 60);
$email = line('email', 200);
$region = choice('region', $regions);
$city = line('city', 120);
$education = choice('education', $educations);
$year = line('graduation_year', 4);
$year = preg_match('/^[0-9]{4}$/D', $year) && (int) $year >= 1960 && (int) $year <= (int) date('Y') + 8 ? $year : '';
$specialization = line('specialization', 160);
$experience = choice('experience', $experiences);
$employment = choice('employment', $employments);
$interest = choice('interest', $interests);
$arrangements = [];
foreach ((array) ($_POST['arrangements'] ?? []) as $id) {
    if (is_string($id) && isset($arrangementNames[$id]) && !in_array($id, $arrangements, true)) {
        $arrangements[] = $id;
    }
}
$portfolioUrl = url('portfolio_url');
$linkedin = url('linkedin');
$cv = upload('cv', ['pdf', 'doc', 'docx'], MAX_CV_MB);
$portfolio = upload('portfolio', ['pdf'], MAX_PORTFOLIO_MB);

// What an application cannot do without: a name, a way to reply, what they are applying for
// and their CV. A file the page would have refused is refused here too. The other fields are
// asked for on the page but not insisted on, so a usable application is never turned away.
if ($name === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false || $interest === ''
    || !is_array($cv) || $portfolio === false) {
    finish(false, 422, $wantsJson, $lang);
}

$files = ['cv' => $cv] + (is_array($portfolio) ? ['portfolio' => $portfolio] : []);

$crm = is_file(CRM_CONFIG) ? (array) require CRM_CONFIG : [];
$crmUrl = applicationsUrl($crm);
$recorded = $crmUrl !== '' && sendToCrm($crmUrl, (string) ($crm['key'] ?? ''), [
    'full_name' => $name,
    'phone' => $phone,
    'email' => $email,
    'region' => $region,
    'city' => $city,
    'education' => $education,
    'graduation_year' => $year,
    'specialization' => $specialization,
    'experience' => $experience,
    'employment' => $employment,
    'interest' => $interest,
    'arrangements' => $arrangements,
    'portfolio_url' => $portfolioUrl,
    'linkedin' => $linkedin,
    'source' => 'orvann.com careers (' . $lang . ')',
], $files);

$rows = [
    'Full name' => $name,
    'Mobile number' => $phone,
    'Email address' => $email,
    'Place of residence' => trim(($regions[$region] ?? '') . ($city !== '' ? ', ' . $city : ''), ', '),
    'Academic status' => $educations[$education] ?? '',
    'Graduation year' => $year,
    'Field of study / specialization' => $specialization,
    'Years of experience' => $experiences[$experience] ?? '',
    'Current employment status' => $employments[$employment] ?? '',
    'Interested in' => $interests[$interest],
    'Preferred work arrangement' => implode(', ', array_map(function ($id) use ($arrangementNames) {
        return $arrangementNames[$id];
    }, $arrangements)),
    'Portfolio link' => $portfolioUrl,
    'LinkedIn' => $linkedin,
    'Attached' => implode(', ', array_map(function ($file) {
        return $file['name'];
    }, $files)),
    'Form language' => $lang === 'ar' ? 'Arabic' : 'English',
    'CRM' => $recorded
        ? 'Recorded in Applications'
        : ($crmUrl === '' ? 'Not connected on this server (no crm-config.php)' : 'NOT recorded - add this application by hand'),
];
$text = "New application from the website (Careers & Internships form).\n\n";
foreach ($rows as $label => $value) {
    $text .= $label . ': ' . ($value === '' ? '(not given)' : $value) . "\n";
}

// The email carries the files too, so nothing depends on the CRM being up.
$boundary = 'orvann-' . bin2hex(random_bytes(12));
$encodeName = function (string $name): string {
    return '=?UTF-8?B?' . base64_encode($name) . '?=';
};
$body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($text)) . "\r\n";
foreach ($files as $file) {
    $body .= "--$boundary\r\n"
        . 'Content-Type: ' . $file['type'] . '; name="' . $encodeName($file['name']) . "\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . 'Content-Disposition: attachment; filename="' . $encodeName($file['name']) . "\"\r\n\r\n"
        . chunk_split(base64_encode((string) file_get_contents($file['path']))) . "\r\n";
}
$body .= "--$boundary--\r\n";

$subject = ($interest === 'internship' ? 'Internship application: ' : 'Job application: ') . $name
    . ($specialization !== '' ? ' (' . $specialization . ')' : '');
$headers = [
    'From' => 'ORVANN Website <' . SENDER . '>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'multipart/mixed; boundary="' . $boundary . '"',
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
