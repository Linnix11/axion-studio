<?php
// Socle de l'espace client (CRM) : configuration, base SQLite, session, e-mails, contrôles d'accès.
// Inaccessible depuis le web (voir .htaccess : fichiers commençant par « _ »).
//
// Réglages lus dans axion-config.php (au-dessus du dossier public, jamais dans le dépôt) :
//   'crm_n8n_token'   => jeton secret partagé avec n8n (au moins 32 caractères), obligatoire pour n8n.php
//   'crm_admin_email' => adresse du compte administrateur (par défaut : celle du site)
//   'crm_db'          => chemin du fichier SQLite (par défaut : axion-crm.sqlite à côté d'axion-config.php)
//   'crm_admin_password_hash' => facultatif : empreinte du mot de passe administrateur (password_hash), pour se connecter
//                        sans passer par l'e-mail ; générée avec : php -r 'echo password_hash(readline("Mot de passe : "), PASSWORD_DEFAULT), "\n";'
// Journal des e-mails : axion-crm-mail.log à côté d'axion-config.php (date, destinataire, objet, résultat ; jamais le contenu).
// Pour les tests locaux : variables d'environnement CRM_DB, CRM_SITE_URL, CRM_MAIL_LOG (écrit les e-mails dans un fichier).

require_once dirname(__DIR__) . '/_common.php';

const CRM_FROM          = 'ne-pas-repondre@axionstudio.fr';
const CRM_DEFAULT_ADMIN = 'arthur.champagne@icloud.com';
const CRM_INVITE_TTL    = 7 * 86400;   // lien d'activation : 7 jours
const CRM_RESET_TTL     = 2 * 86400;   // lien de nouveau mot de passe : 2 jours
const CRM_SESSION_IDLE  = 8 * 3600;    // déconnexion après 8 h sans activité
const CRM_MIN_PASSWORD  = 10;

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

function reply(int $code, array $payload): void {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function crm_config(): array {
  static $cfg = null;
  if ($cfg !== null) return $cfg;
  $cfg = [];
  $root = rtrim($_SERVER['DOCUMENT_ROOT'] ?? '', '/');
  $candidates = array_filter([
    $root !== '' ? dirname($root) . '/axion-config.php' : null,
    $root !== '' ? $root . '/axion-config.php' : null,
    dirname(__DIR__, 2) . '/axion-config.php',
    dirname(__DIR__, 3) . '/axion-config.php',
    dirname(__DIR__, 4) . '/axion-config.php',
  ]);
  foreach ($candidates as $f) {
    if (is_file($f)) { $c = include $f; if (is_array($c)) { $cfg = $c; $cfg['_dir'] = dirname($f); break; } }
  }
  return $cfg;
}

function crm_site_url(): string {
  return rtrim(getenv('CRM_SITE_URL') ?: (crm_config()['site_url'] ?? 'https://axionstudio.fr'), '/');
}

function crm_admin_email(): string {
  return strtolower(trim(crm_config()['crm_admin_email'] ?? CRM_DEFAULT_ADMIN));
}

/** Connexion à la base ; crée les tables au premier appel. */
function db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;
  $cfg = crm_config();
  $path = getenv('CRM_DB') ?: ($cfg['crm_db'] ?? (isset($cfg['_dir']) ? $cfg['_dir'] . '/axion-crm.sqlite' : ''));
  if ($path === '') reply(503, ['ok' => false, 'error' => 'config']);
  try {
    $pdo = new PDO('sqlite:' . $path, null, null, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
  } catch (Throwable $e) {
    reply(503, ['ok' => false, 'error' => 'db']);
  }
  $pdo->exec('PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
  $pdo->exec(<<<SQL
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      entreprise TEXT NOT NULL,
      contact TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      telephone TEXT NOT NULL DEFAULT '',
      formule TEXT NOT NULL DEFAULT '',
      suivi INTEGER NOT NULL DEFAULT 0,
      statut TEXT NOT NULL DEFAULT 'actif',
      date_contrat TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      cree_le INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      nom TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL CHECK (role IN ('admin', 'client')),
      client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
      password_hash TEXT,
      actif INTEGER NOT NULL DEFAULT 1,
      cree_le INTEGER NOT NULL,
      derniere_connexion INTEGER
    );
    CREATE TABLE IF NOT EXISTS tokens (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      hash TEXT NOT NULL UNIQUE,
      usage TEXT NOT NULL,
      expire_le INTEGER NOT NULL,
      utilise_le INTEGER
    );
    CREATE TABLE IF NOT EXISTS automations (
      id INTEGER PRIMARY KEY,
      instance TEXT NOT NULL,
      workflow_id TEXT NOT NULL,
      client_slug TEXT NOT NULL DEFAULT '',
      client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
      nom TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      visible INTEGER NOT NULL DEFAULT 1,
      active INTEGER NOT NULL DEFAULT 0,
      absent INTEGER NOT NULL DEFAULT 0,
      dernier_statut TEXT NOT NULL DEFAULT '',
      derniere_execution TEXT NOT NULL DEFAULT '',
      executions_7j INTEGER NOT NULL DEFAULT 0,
      erreurs_7j INTEGER NOT NULL DEFAULT 0,
      maj_le INTEGER NOT NULL,
      UNIQUE (instance, workflow_id)
    );
    CREATE TABLE IF NOT EXISTS synchros (
      instance TEXT PRIMARY KEY,
      recu_le INTEGER NOT NULL,
      nb INTEGER NOT NULL
    );
  SQL);
  return $pdo;
}

function input(): array {
  $d = json_decode((string) file_get_contents('php://input'), true);
  return is_array($d) ? $d : [];
}

function text($v, int $max): string {
  $v = trim(str_replace(["\r", "\n", "\0"], ' ', (string) $v));
  return function_exists('mb_substr') ? mb_substr($v, 0, $max) : substr($v, 0, $max);
}

function long_text($v, int $max): string {
  $v = trim(str_replace("\0", '', (string) $v));
  return function_exists('mb_substr') ? mb_substr($v, 0, $max) : substr($v, 0, $max);
}

// ——— Session ———

function start_session(): void {
  if (session_status() === PHP_SESSION_ACTIVE) return;
  $https = ($_SERVER['HTTPS'] ?? '') !== '' && ($_SERVER['HTTPS'] ?? '') !== 'off'
        || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
  session_name('axion_crm');
  session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Strict']);
  session_start();
  if (isset($_SESSION['vu']) && time() - $_SESSION['vu'] > CRM_SESSION_IDLE) { $_SESSION = []; session_regenerate_id(true); }
  $_SESSION['vu'] = time();
}

/** Les requêtes qui modifient quelque chose doivent venir du site (en-tête ajouté par le front, cookie SameSite=Strict). */
function require_post(): void {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);
  if (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'axion') reply(403, ['ok' => false, 'error' => 'origin']);
}

function current_user(): ?array {
  if (!isset($_COOKIE['axion_crm'])) return null;   // pas de cookie déposé tant qu'on ne se connecte pas
  start_session();
  if (empty($_SESSION['uid'])) return null;
  $st = db()->prepare('SELECT id, email, nom, role, client_id, actif FROM users WHERE id = ?');
  $st->execute([$_SESSION['uid']]);
  $u = $st->fetch();
  if (!$u || !$u['actif']) { $_SESSION = []; return null; }
  return $u;
}

function require_user(): array {
  $u = current_user();
  if (!$u) reply(401, ['ok' => false, 'error' => 'auth']);
  return $u;
}

function require_admin(): array {
  $u = require_user();
  if ($u['role'] !== 'admin') reply(403, ['ok' => false, 'error' => 'forbidden']);
  return $u;
}

function log_in(array $u): void {
  start_session();
  session_regenerate_id(true);
  $_SESSION['uid'] = (int) $u['id'];
  $_SESSION['vu'] = time();
  db()->prepare('UPDATE users SET derniere_connexion = ? WHERE id = ?')->execute([time(), $u['id']]);
}

// ——— Liens à usage unique (activation, nouveau mot de passe) ———

function new_token(int $userId, string $usage): string {
  $raw = bin2hex(random_bytes(32));
  $ttl = $usage === 'invitation' ? CRM_INVITE_TTL : CRM_RESET_TTL;
  $pdo = db();
  // Un seul lien valide à la fois par compte et par usage
  $pdo->prepare('UPDATE tokens SET utilise_le = ? WHERE user_id = ? AND usage = ? AND utilise_le IS NULL')->execute([time(), $userId, $usage]);
  $pdo->prepare('INSERT INTO tokens (user_id, hash, usage, expire_le) VALUES (?, ?, ?, ?)')
      ->execute([$userId, hash('sha256', $raw), $usage, time() + $ttl]);
  return $raw;
}

/** Renvoie le jeton valide (avec l'utilisateur) ou null. */
function find_token(string $raw): ?array {
  if (!preg_match('/^[a-f0-9]{64}$/', $raw)) return null;
  $st = db()->prepare('SELECT t.id AS token_id, t.usage, t.expire_le, u.id, u.email, u.nom, u.role, u.actif
                       FROM tokens t JOIN users u ON u.id = t.user_id
                       WHERE t.hash = ? AND t.utilise_le IS NULL');
  $st->execute([hash('sha256', $raw)]);
  $t = $st->fetch();
  if (!$t || $t['expire_le'] < time() || !$t['actif']) return null;
  return $t;
}

// ——— E-mails ———

function send_mail(string $to, string $subject, string $body): bool {
  $log = getenv('CRM_MAIL_LOG');
  if ($log) {
    $ok = file_put_contents($log, "À : $to\nObjet : $subject\n\n$body\n-----\n", FILE_APPEND) !== false;
    mail_log($to, $subject, $ok, '');
    return $ok;
  }
  $headers = implode("\r\n", [
    'From: Axion Studio <' . CRM_FROM . '>',
    'Reply-To: ' . crm_admin_email(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
  ]);
  $ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . CRM_FROM);
  mail_log($to, $subject, $ok, $ok ? '' : (string) (error_get_last()['message'] ?? 'mail() a renvoyé false'));
  return $ok;
}

function mail_log_path(): ?string {
  $dir = crm_config()['_dir'] ?? null;
  return getenv('CRM_MAIL_JOURNAL') ?: ($dir ? $dir . '/axion-crm-mail.log' : null);
}

/** Note chaque envoi (sans le contenu, qui peut contenir un lien d'accès). */
function mail_log(string $to, string $subject, bool $ok, string $err): void {
  $f = mail_log_path();
  if (!$f) return;
  $line = json_encode(['date' => date('c'), 'a' => $to, 'objet' => $subject, 'ok' => $ok, 'erreur' => substr($err, 0, 300)], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  @file_put_contents($f, $line . "\n", FILE_APPEND | LOCK_EX);
}

/** Les $n derniers envois notés (pour l'administration). */
function mail_log_tail(int $n = 20): array {
  $f = mail_log_path();
  if (!$f || !is_file($f)) return [];
  $lines = array_slice(file($f, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [], -$n);
  return array_reverse(array_values(array_filter(array_map(fn($l) => json_decode($l, true), $lines))));
}

function portal_url(): string { return crm_site_url() . '/espace-client/'; }

function send_invitation(array $user, string $contact): bool {
  $link = portal_url() . '?lien=' . new_token((int) $user['id'], 'invitation');
  $hello = $contact !== '' ? "Bonjour $contact," : 'Bonjour,';
  $body = "$hello\n\n"
        . "Merci pour votre confiance. Votre espace client Axion Studio est prêt : vous y suivez vos automatisations, leur état et leur activité.\n\n"
        . "Adresse de l'espace client : " . portal_url() . "\n"
        . "Votre identifiant : {$user['email']}\n\n"
        . "Pour choisir votre mot de passe, ouvrez ce lien (valable 7 jours, utilisable une seule fois) :\n$link\n\n"
        . "Une question ? Répondez simplement à cet e-mail.\n\n"
        . "Arthur Champagne-Forterre\nAxion Studio\n";
  return send_mail($user['email'], 'Votre espace client Axion Studio', $body);
}

function send_reset(array $user): bool {
  $link = portal_url() . '?lien=' . new_token((int) $user['id'], 'reinitialisation');
  $body = "Bonjour,\n\n"
        . "Pour choisir un nouveau mot de passe pour votre espace client Axion Studio, ouvrez ce lien (valable 48 heures, utilisable une seule fois) :\n$link\n\n"
        . "Votre identifiant : {$user['email']}\n\n"
        . "Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail : votre mot de passe actuel reste valable.\n\n"
        . "Axion Studio\n";
  return send_mail($user['email'], 'Nouveau mot de passe, espace client Axion Studio', $body);
}

// ——— Clients ———

function slugify(string $s): string {
  $s = function_exists('iconv') ? (string) @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s) : $s;
  $s = strtolower(preg_replace('/[^A-Za-z0-9]+/', '-', $s));
  return trim($s, '-') ?: 'client';
}

/** Crée le client et son compte ; envoie l'e-mail d'accès si $envoyer. Renvoie [client, user, mail_envoye]. */
function create_client(array $d, bool $envoyer): array {
  $entreprise = text($d['entreprise'] ?? '', 160);
  $email = strtolower(text($d['email'] ?? '', 200));
  $errors = [];
  if ($entreprise === '') $errors['entreprise'] = 'Indiquez le nom de l’entreprise.';
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Indiquez une adresse e-mail valide.';
  $pdo = db();
  if (!$errors) {
    $st = $pdo->prepare('SELECT 1 FROM users WHERE email = ?');
    $st->execute([$email]);
    if ($st->fetch()) $errors['email'] = 'Un compte existe déjà avec cette adresse.';
  }
  if ($errors) reply(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);

  $base = slugify(text($d['slug'] ?? '', 60) ?: $entreprise);
  $slug = $base; $n = 2;
  $chk = $pdo->prepare('SELECT 1 FROM clients WHERE slug = ?');
  while (true) { $chk->execute([$slug]); if (!$chk->fetch()) break; $slug = $base . '-' . $n++; }

  $contact = text($d['contact'] ?? '', 120);
  $pdo->beginTransaction();
  $pdo->prepare('INSERT INTO clients (slug, entreprise, contact, email, telephone, formule, suivi, statut, date_contrat, notes, cree_le)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      ->execute([$slug, $entreprise, $contact, $email, text($d['telephone'] ?? '', 30), text($d['formule'] ?? '', 120),
                 !empty($d['suivi']) ? 1 : 0, 'actif', text($d['date_contrat'] ?? date('Y-m-d'), 10), long_text($d['notes'] ?? '', 4000), time()]);
  $clientId = (int) $pdo->lastInsertId();
  $pdo->prepare('INSERT INTO users (email, nom, role, client_id, cree_le) VALUES (?, ?, ?, ?, ?)')
      ->execute([$email, $contact, 'client', $clientId, time()]);
  $userId = (int) $pdo->lastInsertId();
  // Rattache les automatisations déjà envoyées par n8n avec cette étiquette
  $pdo->prepare('UPDATE automations SET client_id = ? WHERE client_slug = ? AND client_id IS NULL')->execute([$clientId, $slug]);
  $pdo->commit();

  $user = ['id' => $userId, 'email' => $email];
  $sent = $envoyer ? send_invitation($user, $contact) : false;
  return [['id' => $clientId, 'slug' => $slug, 'entreprise' => $entreprise], $user, $sent];
}

/** État lisible d'une automatisation pour l'affichage. */
function automation_state(array $a): string {
  if ($a['absent']) return 'retiree';
  if (in_array($a['dernier_statut'], ['error', 'crashed'], true)) return 'erreur';
  if (!$a['active']) return 'pause';
  if ($a['dernier_statut'] === '') return 'attente';
  return 'ok';
}

function public_automation(array $a): array {
  return [
    'id' => (int) $a['id'],
    'nom' => $a['nom'],
    'description' => $a['description'],
    'etat' => automation_state($a),
    'derniere_execution' => $a['derniere_execution'],
    'executions_7j' => (int) $a['executions_7j'],
    'erreurs_7j' => (int) $a['erreurs_7j'],
  ];
}

function last_sync(): ?int {
  $v = db()->query('SELECT MAX(recu_le) FROM synchros')->fetchColumn();
  return $v ? (int) $v : null;
}
