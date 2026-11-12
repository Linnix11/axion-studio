<?php
// Connexion à l'espace client.
// GET  ?action=moi                      → {"ok":true,"user":{...}} ou 401
// GET  ?action=lien&lien=…              → vérifie un lien d'activation ou de nouveau mot de passe
// POST {"action":"connexion","email","password"}
// POST {"action":"deconnexion"}
// POST {"action":"oubli","email"}       → envoie un lien (réponse identique que le compte existe ou non)
// POST {"action":"activer","lien","password"}
// Le premier accès administrateur se fait par « oubli » avec l'adresse crm_admin_email : le compte est alors créé.

require __DIR__ . '/_crm.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $method === 'GET' ? ($_GET['action'] ?? '') : (input()['action'] ?? '');

function user_payload(array $u): array {
  $out = ['email' => $u['email'], 'nom' => $u['nom'], 'role' => $u['role']];
  return $out;
}

if ($method === 'GET' && $action === 'moi') {
  $u = current_user();
  if (!$u) reply(401, ['ok' => false, 'error' => 'auth']);
  reply(200, ['ok' => true, 'user' => user_payload($u)]);
}

if ($method === 'GET' && $action === 'lien') {
  $t = find_token((string) ($_GET['lien'] ?? ''));
  if (!$t) reply(404, ['ok' => false, 'error' => 'lien']);
  reply(200, ['ok' => true, 'email' => $t['email'], 'usage' => $t['usage']]);
}

require_post();
$d = input();

if ($action === 'connexion') {
  $email = strtolower(text($d['email'] ?? '', 200));
  $password = (string) ($d['password'] ?? '');
  if (hit_limit('crm_login_ip_' . client_ip(), 20, 900) || hit_limit('crm_login_' . $email, 8, 900)) {
    reply(429, ['ok' => false, 'error' => 'rate']);
  }
  $st = db()->prepare('SELECT * FROM users WHERE email = ?');
  $st->execute([$email]);
  $u = $st->fetch();
  // Même temps de réponse que le compte existe ou non
  $hash = $u['password_hash'] ?? null;
  $ok = $hash ? password_verify($password, $hash) : (password_hash($password, PASSWORD_DEFAULT) && false);
  if (!$u || !$hash || !$ok || !$u['actif']) reply(401, ['ok' => false, 'error' => 'identifiants']);
  if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
    db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([password_hash($password, PASSWORD_DEFAULT), $u['id']]);
  }
  log_in($u);
  reply(200, ['ok' => true, 'user' => user_payload($u)]);
}

if ($action === 'deconnexion') {
  if (isset($_COOKIE['axion_crm'])) {
    start_session();
    $_SESSION = [];
    session_destroy();
    $p = session_get_cookie_params();
    setcookie('axion_crm', '', ['expires' => time() - 3600, 'path' => $p['path'], 'secure' => $p['secure'], 'httponly' => true, 'samesite' => 'Strict']);
  }
  reply(200, ['ok' => true]);
}

if ($action === 'oubli') {
  $email = strtolower(text($d['email'] ?? '', 200));
  if (hit_limit('crm_oubli_' . client_ip(), 5, 3600)) reply(429, ['ok' => false, 'error' => 'rate']);
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $pdo = db();
    $st = $pdo->prepare('SELECT * FROM users WHERE email = ?');
    $st->execute([$email]);
    $u = $st->fetch();
    if (!$u && $email === crm_admin_email()) {
      $pdo->prepare('INSERT INTO users (email, nom, role, cree_le) VALUES (?, ?, ?, ?)')->execute([$email, 'Arthur', 'admin', time()]);
      $u = ['id' => (int) $pdo->lastInsertId(), 'email' => $email, 'actif' => 1];
    }
    if ($u && $u['actif']) send_reset($u);
  }
  reply(200, ['ok' => true]);   // toujours la même réponse : ne révèle pas quelles adresses ont un compte
}

if ($action === 'activer') {
  if (hit_limit('crm_activer_' . client_ip(), 10, 900)) reply(429, ['ok' => false, 'error' => 'rate']);
  $t = find_token((string) ($d['lien'] ?? ''));
  if (!$t) reply(404, ['ok' => false, 'error' => 'lien']);
  $password = (string) ($d['password'] ?? '');
  $len = function_exists('mb_strlen') ? mb_strlen($password) : strlen($password);
  if ($len < CRM_MIN_PASSWORD || $len > 200) {
    reply(422, ['ok' => false, 'error' => 'validation', 'fields' => ['password' => 'Choisissez un mot de passe d’au moins ' . CRM_MIN_PASSWORD . ' caractères.']]);
  }
  $pdo = db();
  $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([password_hash($password, PASSWORD_DEFAULT), $t['id']]);
  $pdo->prepare('UPDATE tokens SET utilise_le = ? WHERE user_id = ? AND utilise_le IS NULL')->execute([time(), $t['id']]);
  log_in($t);
  reply(200, ['ok' => true, 'user' => user_payload($t)]);
}

reply(400, ['ok' => false, 'error' => 'action']);
