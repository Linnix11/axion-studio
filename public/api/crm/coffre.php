<?php
// Point d'entrée réservé au programme du serveur n8n qui installe les accès clients (voir docs/coffre-acces.md).
// Pas de mot de passe partagé : chaque requête est signée par la clé privée du serveur n8n (RSA, SHA-256),
// vérifiée ici avec la clé publique ci-dessous. En-têtes : X-Axion-Temps (horodatage Unix), X-Axion-Signature
// (base64 de la signature de « temps + "\n" + corps »). Une signature de plus de 5 minutes est refusée.
//
// POST {"action":"a-installer"}            → accès reçus à installer : [{id, type, nom, champs, fixes, chiffre}]
// POST {"action":"installe", id, n8n_id}   → installé dans n8n : le bloc chiffré est effacé
// POST {"action":"echec", id, erreur}      → échec : le bloc est effacé, le client devra renvoyer l'accès

require __DIR__ . '/_crm.php';

const COFFRE_SIGNATURE_PUB = <<<'PEM'
-----BEGIN PUBLIC KEY-----
MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA8WauxxZazGybi1NzGQaL
k8PPGWVxScIZJ3QQ9iL7IoRnTrFiJ4JLEQfxinrHlYsViSbSfS0fvNpExApBrhtn
fWIh40YgQBHjwc6DeJXy5tO9J3YFJW6ZLEOGe8ytOLOdYxUfx7HDzEyavRO49QHo
jBjAouHFIrc+z9v4cRsfT75/9zYHPRMdo7OCafPAaL9G5Amg68SOrVVJBq9gNWt3
EpaD8sw3W+FYNWOOyB/WZ1LAIV83BhuMCZAd2sSHfPKl1gz7VY+utcWZqHuQlDUT
JY7AII/8WS87EAT6hNKRwaj9YCmVAUVwUnWqrsGtNfqkfbp4QnT3rfpSQMF71yIa
RMA5bBrWsqaZjkE2/E/IUlCFOBIhgCU6ZQJQPPrTzUv/h/u3kl/a6n4GYeKOvcIS
Zz3nBa6F53LQ8rLHpN269FHx5Rls3xdSQEnN8ScGS/kO7fHjPBt8V0GbOPMGpONb
Pq54D/Rc6PRWw3X0b2Eh9aRNTu5cc0pphWx89n+pvPSXAgMBAAE=
-----END PUBLIC KEY-----
PEM;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);

$body = (string) file_get_contents('php://input');
$temps = (string) ($_SERVER['HTTP_X_AXION_TEMPS'] ?? '');
$sig = base64_decode((string) ($_SERVER['HTTP_X_AXION_SIGNATURE'] ?? ''), true);
// Clé de test locale uniquement (variable d'environnement du serveur, jamais modifiable par un visiteur)
$pub = getenv('CRM_COFFRE_SIGNATURE_PUB') ? (string) file_get_contents(getenv('CRM_COFFRE_SIGNATURE_PUB')) : COFFRE_SIGNATURE_PUB;
$valide = ctype_digit($temps) && abs(time() - (int) $temps) <= 300 && $sig !== false
  && openssl_verify($temps . "\n" . $body, $sig, $pub, OPENSSL_ALGO_SHA256) === 1;
if (!$valide) {
  if (hit_limit('crm_coffre_ko_' . client_ip(), 20, 3600)) reply(429, ['ok' => false, 'error' => 'rate']);
  reply(401, ['ok' => false, 'error' => 'signature']);
}

$d = json_decode($body, true);
if (!is_array($d)) reply(400, ['ok' => false, 'error' => 'format']);
$action = $d['action'] ?? '';
$pdo = db();

if ($action === 'a-installer') {
  $rows = $pdo->query("SELECT a.id, a.type, a.champs, a.fixes, a.chiffre, a.libelle, c.entreprise FROM acces a JOIN clients c ON c.id = a.client_id
                       WHERE a.statut = 'recu' AND a.chiffre IS NOT NULL ORDER BY a.recu_le LIMIT 20")->fetchAll();
  reply(200, ['ok' => true, 'acces' => array_map(fn($a) => [
    'id' => (int) $a['id'], 'type' => $a['type'],
    'nom' => mb_substr('Client ' . $a['entreprise'] . ' - ' . $a['libelle'], 0, 128),
    'champs' => array_column(json_decode($a['champs'], true) ?: [], 'cle'),   // le serveur n'installe que ces champs-là
    'fixes' => json_decode($a['fixes'], true) ?: (object) [], 'chiffre' => json_decode($a['chiffre'], true),
  ], $rows)]);
}

if ($action === 'installe') {
  $n8nId = (string) ($d['n8n_id'] ?? '');
  if (!preg_match('/^[A-Za-z0-9_-]{1,32}$/', $n8nId)) reply(422, ['ok' => false, 'error' => 'n8n_id']);
  $pdo->prepare("UPDATE acces SET statut = 'installe', chiffre = NULL, n8n_id = ?, installe_le = ?, erreur = '' WHERE id = ? AND statut = 'recu'")
      ->execute([$n8nId, time(), (int) ($d['id'] ?? 0)]);
  reply(200, ['ok' => true]);
}

if ($action === 'echec') {
  $pdo->prepare("UPDATE acces SET statut = 'erreur', chiffre = NULL, erreur = ? WHERE id = ? AND statut = 'recu'")
      ->execute([text($d['erreur'] ?? 'échec', 300), (int) ($d['id'] ?? 0)]);
  reply(200, ['ok' => true]);
}

reply(400, ['ok' => false, 'error' => 'action']);
