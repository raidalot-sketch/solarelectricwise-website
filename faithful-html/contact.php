<?php
// Standalone mail handler. No WordPress files, plugins or database are loaded.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function respond(int $status, bool $success, string $message): never {
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, false, 'Please use the contact form.');
if (strlen((string)($_POST['website'] ?? '')) || strlen((string)($_POST['fax'] ?? ''))) respond(422, false, 'Please check the form and try again.');
$fields = [];
foreach (['first_name', 'last_name', 'email', 'phone', 'subject', 'message'] as $key) {
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) respond(422, false, 'Please check the form and try again.');
    $fields[$key] = trim($value);
    if ($fields[$key] === '' || strlen($value) > ($key === 'message' ? 10000 : 254)) respond(422, false, 'Please complete all fields.');
}
if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $fields['email'])) respond(422, false, 'Please enter a valid email address.');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array(parse_url($origin, PHP_URL_HOST), ['www.solarelectricwise.co.za', 'solarelectricwise.co.za'], true)) respond(403, false, 'Please use the contact form on this website.');
// Preview deliberately cannot send mail. Enable only after proofing and delivery testing.
if (getenv('SOLAR_CONTACT_ENABLED') !== '1') respond(503, false, 'This is a preview. Please contact us using the phone or email details shown on this page.');
$rateDir = sys_get_temp_dir() . '/solar-contact-' . getmyuid();
if (!is_dir($rateDir) && !@mkdir($rateDir, 0700, true) && !is_dir($rateDir)) respond(503, false, 'Please contact us by phone or email.');
$rateFile = $rateDir . '/' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown') . '.json';
$handle = @fopen($rateFile, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) respond(503, false, 'Please try again later or contact us by phone.');
@chmod($rateFile, 0600);
$times = json_decode(stream_get_contents($handle), true);
$now = time();
$times = array_values(array_filter(is_array($times) ? $times : [], static fn ($time) => is_int($time) && $time > $now - 3600));
if (count($times) >= 30 || count(array_filter($times, static fn ($time) => $time > $now - 60)) >= 3) {
    flock($handle, LOCK_UN); fclose($handle);
    respond(429, false, 'Please wait a little before sending another message.');
}
$times[] = $now;
ftruncate($handle, 0); rewind($handle); fwrite($handle, json_encode($times)); fflush($handle);
flock($handle, LOCK_UN); fclose($handle);
$body = '';
foreach ($fields as $name => $value) $body .= ucfirst(str_replace('_', ' ', $name)) . ": " . $value . "\n\n";
$subject = 'SolarElectricWise website enquiry';
$headers = ['From' => 'info@solarelectricwise.co.za', 'Reply-To' => $fields['email'], 'Content-Type' => 'text/plain; charset=UTF-8'];
if (!mail('info@solarelectricwise.co.za', $subject, $body, $headers)) respond(503, false, 'Your message could not be sent. Please contact us by phone or email.');
respond(200, true, 'Thank you. Your message has been sent.');
