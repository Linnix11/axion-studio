<?php
// Assistant IA du site : relaie la conversation vers l'API Gemini de Google.
// La clé d'API n'est JAMAIS dans ce dépôt : elle est lue (dans cet ordre)
//   1. dans la variable d'environnement GEMINI_API_KEY ;
//   2. dans un fichier axion-config.php placé AU-DESSUS du dossier public du site
//      (ex. /home/uXXXX/domains/axionstudio.fr/axion-config.php), qui contient :
//        <?php return ['gemini_api_key' => 'VOTRE_CLE'];   // modèle facultatif : 'gemini_model' => 'gemini-3.5-flash'
//
// GET  → {"available": true|false}  (le site affiche ou non l'assistant)
// POST {"messages":[{"role":"user"|"model","text":"..."}]} → {"ok":true,"reply":"..."}

const MAX_MESSAGES_PER_HOUR = 30;    // par adresse IP
const MAX_MESSAGES_PER_DAY  = 400;   // pour tout le site (maîtrise des coûts)
const MAX_INPUT_CHARS       = 1000;  // longueur maximale d'un message du visiteur
const MAX_HISTORY           = 12;    // nombre de messages de la conversation envoyés à Gemini
const DEFAULT_MODEL         = 'gemini-3.5-flash';
const FALLBACK_MODELS       = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest'];   // si le modèle principal est saturé ou retiré

require __DIR__ . '/_common.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

function reply(int $code, array $payload): void {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

function load_config(): array {
  $cfg = [];
  $candidates = [];
  if (!empty($_SERVER['DOCUMENT_ROOT'])) $candidates[] = dirname(rtrim($_SERVER['DOCUMENT_ROOT'], '/')) . '/axion-config.php';
  if (!empty($_SERVER['DOCUMENT_ROOT'])) $candidates[] = rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/axion-config.php';  // dans le dossier public (accès web bloqué par .htaccess)
  $candidates[] = dirname(__DIR__) . '/axion-config.php';
  $candidates[] = dirname(__DIR__, 2) . '/axion-config.php';
  $candidates[] = dirname(__DIR__, 3) . '/axion-config.php';
  foreach ($candidates as $f) {
    if (is_file($f)) { $c = include $f; if (is_array($c)) { $cfg = $c; break; } }
  }
  $key = getenv('GEMINI_API_KEY') ?: ($cfg['gemini_api_key'] ?? '');
  $model = getenv('GEMINI_MODEL') ?: ($cfg['gemini_model'] ?? DEFAULT_MODEL);
  return ['key' => trim((string) $key), 'model' => preg_replace('/[^a-z0-9.\-]/i', '', (string) $model)];
}

$config = load_config();
$prompt = @file_get_contents(__DIR__ . '/assistant-prompt.txt');
$available = $config['key'] !== '' && $prompt !== false && function_exists('curl_init');

if ($_SERVER['REQUEST_METHOD'] === 'GET') reply(200, ['available' => $available]);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);
if (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'axion') reply(403, ['ok' => false, 'error' => 'origin']);   // un autre site ne peut pas envoyer cet en-tête (pas de CORS)
if (!$available) reply(503, ['ok' => false, 'error' => 'unavailable']);

$data = json_decode(file_get_contents('php://input'), true);
$messages = is_array($data['messages'] ?? null) ? array_slice($data['messages'], -MAX_HISTORY) : [];
$contents = [];
foreach ($messages as $m) {
  $role = ($m['role'] ?? '') === 'model' ? 'model' : 'user';
  $text = trim((string) ($m['text'] ?? ''));
  if ($text === '') continue;
  $text = function_exists('mb_substr') ? mb_substr($text, 0, MAX_INPUT_CHARS) : substr($text, 0, MAX_INPUT_CHARS);
  $contents[] = ['role' => $role, 'parts' => [['text' => $text]]];
}
if (!$contents || end($contents)['role'] !== 'user') reply(422, ['ok' => false, 'error' => 'empty']);
while ($contents && $contents[0]['role'] !== 'user') array_shift($contents);  // Gemini attend un premier message utilisateur

if (hit_limit('chat_' . client_ip(), MAX_MESSAGES_PER_HOUR, 3600)) reply(429, ['ok' => false, 'error' => 'rate']);
if (hit_limit('global_day', MAX_MESSAGES_PER_DAY, 86400)) reply(429, ['ok' => false, 'error' => 'quota']);

$payload = [
  'systemInstruction' => ['parts' => [['text' => $prompt]]],
  'contents' => $contents,
  'generationConfig' => ['temperature' => 0.3, 'maxOutputTokens' => 1200],
  'safetySettings' => [
    ['category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'],
    ['category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'],
    ['category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'],
    ['category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'],
  ],
];

// Réflexion réduite : réponses rapides, moins chères, et jamais coupées faute de place.
function thinking_for(string $model): array {
  if (strpos($model, '2.5') !== false) return ['thinkingBudget' => 0];
  return ['thinkingLevel' => 'low'];
}

function call_gemini(string $model, array $payload, string $key): array {
  $payload['generationConfig']['thinkingConfig'] = thinking_for($model);
  $ch = curl_init('https://generativelanguage.googleapis.com/v1beta/models/' . $model . ':generateContent');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'x-goog-api-key: ' . $key],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 20,
    CURLOPT_CONNECTTIMEOUT => 8,
  ]);
  $raw = curl_exec($ch);
  $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  return [$status, $raw];
}

// Modèle principal, puis modèles allégés si Google le sature (quota 429), le retire (404/400) ou ne répond pas.
$models = array_values(array_unique(array_merge([$config['model']], FALLBACK_MODELS)));
foreach ($models as $i => $model) {
  [$status, $raw] = call_gemini($model, $payload, $config['key']);
  if ($status === 200) break;
  if (!in_array($status, [0, 400, 404, 429, 500, 503], true)) break;
  error_log('Axion chat: ' . $model . ' HTTP ' . $status . ($i + 1 < count($models) ? ', essai du modèle suivant' : ''));
}

$res = json_decode((string) $raw, true);
if ($status !== 200 || !is_array($res)) {
  error_log('Axion chat: Gemini HTTP ' . $status . ' ' . substr((string) $raw, 0, 300));
  reply(502, ['ok' => false, 'error' => $status === 429 ? 'busy' : 'upstream']);
}
$text = '';
foreach (($res['candidates'][0]['content']['parts'] ?? []) as $part) if (empty($part['thought'])) $text .= $part['text'] ?? '';
// Nettoyage : pas de Markdown dans la bulle (gras, titres, puces « * »), pas de lignes vides en série.
$text = preg_replace('/\*\*(.+?)\*\*/su', '$1', $text);
$text = preg_replace('/^#{1,6}\s*/mu', '', $text);
$text = preg_replace('/^\s*[*•]\s+/mu', '- ', $text);
$text = preg_replace("/\n{3,}/u", "\n\n", $text);
$text = trim($text);
if ($text === '') reply(200, ['ok' => true, 'reply' => 'Je préfère ne pas répondre à cette demande. Pour toute question sur Axion Studio, je suis là, ou vous pouvez écrire à Arthur via /contact.']);
reply(200, ['ok' => true, 'reply' => $text]);
