<?php
// Reçoit le formulaire de contact du site et l'envoie par e-mail.
// Répond en JSON : {"ok":true} ou {"ok":false,"error":"..."}.

const TO_EMAIL   = 'contact@axionstudio.fr';
const FROM_EMAIL = 'ne-pas-repondre@axionstudio.fr';   // expéditeur technique (aucune boîte nécessaire, autorisé par le SPF du domaine) ; les réponses vont au visiteur (Reply-To)
const MAX_PER_HOUR = 5;                         // envois maximum par adresse IP et par heure

require __DIR__ . '/_common.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

function reply(int $code, array $payload): void {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}
function clean($v, int $max, bool $multiline = false): string {
  $v = trim((string) $v);
  if (!$multiline) $v = str_replace(["\r", "\n"], ' ', $v);   // empêche l'injection d'en-têtes
  return function_exists('mb_substr') ? mb_substr($v, 0, $max) : substr($v, 0, $max);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) $data = $_POST;

// Champ piège invisible : rempli uniquement par les robots.
if (!empty($data['site'])) reply(200, ['ok' => true]);

$nom        = clean($data['nom'] ?? '', 120);
$entreprise = clean($data['entreprise'] ?? '', 160);
$email      = clean($data['email'] ?? '', 200);
$telephone  = clean($data['telephone'] ?? '', 30);   // facultatif
$type       = clean($data['type'] ?? '', 80);
$message    = clean($data['message'] ?? '', 5000, true);

$errors = [];
if ($nom === '') $errors['nom'] = 'Indiquez votre nom.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Indiquez une adresse e-mail valide, par ex. nom@exemple.fr.';
if ($telephone !== '' && !preg_match('/^\+?[0-9 .\-]{9,20}$/', $telephone)) $errors['telephone'] = 'Indiquez un numéro valide, par ex. 06 12 34 56 78, ou laissez vide.';
if ((function_exists('mb_strlen') ? mb_strlen($message) : strlen($message)) < 10) $errors['message'] = 'Décrivez votre projet en quelques mots (10 caractères minimum).';
if ($errors) reply(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);

// Limite d'envois par visiteur (adresse réelle, compteur verrouillé).
if (hit_limit('contact_' . client_ip(), MAX_PER_HOUR, 3600)) reply(429, ['ok' => false, 'error' => 'rate']);

$subject = '=?UTF-8?B?' . base64_encode("Demande Axion Studio – $type – $nom") . '?=';
$body = "Nouvelle demande depuis axionstudio.fr\n\n"
      . "Nom : $nom\n"
      . "Entreprise : " . ($entreprise !== '' ? $entreprise : '-') . "\n"
      . "E-mail : $email\n"
      . "Téléphone : " . ($telephone !== '' ? $telephone : '-') . "\n"
      . "Besoin : $type\n\n"
      . "Message :\n$message\n\n"
      . "--\nRépondez directement à cet e-mail pour écrire à $nom.\n";
$headers = implode("\r\n", [
  'From: Axion Studio <' . FROM_EMAIL . '>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
]);

$sent = @mail(TO_EMAIL, $subject, $body, $headers, '-f' . FROM_EMAIL);
if (!$sent) reply(500, ['ok' => false, 'error' => 'send']);
reply(200, ['ok' => true]);
