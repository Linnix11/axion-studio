<?php
// Administration de l'espace client (compte administrateur uniquement).
// GET  ?action=tableau                         → clients avec leurs compteurs, automatisations non rattachées, synchros
// GET  ?action=client&id=…                     → fiche complète d'un client et toutes ses automatisations
// POST {"action":"creer", entreprise, contact, email, telephone, formule, suivi, date_contrat, notes, envoyer}
// POST {"action":"modifier", id, …champs du client}
// POST {"action":"renvoyer", id}               → nouvel e-mail d'accès (le lien précédent ne marche plus)
// POST {"action":"acces", id, actif}           → suspend ou rétablit l'accès du client
// POST {"action":"automatisation", id, description, visible, client_id}
// POST {"action":"supprimer", id, confirmation}  → efface le client, son compte et ses liens (confirmation = nom de l'entreprise)
// POST {"action":"oublier", instance}         → retire un n8n qui n'envoie plus rien : sa synchro et ses workflows

require __DIR__ . '/_crm.php';

$admin = require_admin();
$pdo = db();
$method = $_SERVER['REQUEST_METHOD'];
$action = $method === 'GET' ? ($_GET['action'] ?? '') : (input()['action'] ?? '');

function admin_automation(array $a): array {
  return public_automation($a) + [
    'workflow_id' => $a['workflow_id'],
    'instance' => $a['instance'],
    'client_slug' => $a['client_slug'],
    'client_id' => $a['client_id'] !== null ? (int) $a['client_id'] : null,
    'visible' => (bool) $a['visible'],
    'active' => (bool) $a['active'],
    'dernier_statut' => $a['dernier_statut'],
  ];
}

function client_row(PDO $pdo, int $id): array {
  $st = $pdo->prepare('SELECT c.*, u.id AS user_id, u.password_hash IS NOT NULL AS active_compte, u.actif AS acces, u.derniere_connexion
                       FROM clients c LEFT JOIN users u ON u.client_id = c.id AND u.role = \'client\' WHERE c.id = ?');
  $st->execute([$id]);
  $c = $st->fetch();
  if (!$c) reply(404, ['ok' => false, 'error' => 'client']);
  return $c;
}

function compte_state(array $c): string {
  if (!$c['user_id']) return 'sans-compte';
  if (!$c['acces']) return 'suspendu';
  return $c['active_compte'] ? 'actif' : 'invite';
}

if ($method === 'GET' && $action === 'tableau') {
  $clients = $pdo->query('SELECT c.id, c.slug, c.entreprise, c.contact, c.email, c.formule, c.suivi, c.statut, c.date_contrat,
                                 u.id AS user_id, u.password_hash IS NOT NULL AS active_compte, u.actif AS acces, u.derniere_connexion
                          FROM clients c LEFT JOIN users u ON u.client_id = c.id AND u.role = \'client\'
                          ORDER BY c.entreprise COLLATE NOCASE')->fetchAll();
  $autos = $pdo->query('SELECT * FROM automations')->fetchAll();
  $by = [];
  foreach ($autos as $a) if ($a['client_id'] !== null) $by[(int) $a['client_id']][] = $a;
  $out = [];
  foreach ($clients as $c) {
    $list = array_filter($by[(int) $c['id']] ?? [], fn($a) => !$a['absent']);
    $etats = array_map('automation_state', $list);
    $out[] = [
      'id' => (int) $c['id'], 'slug' => $c['slug'], 'entreprise' => $c['entreprise'], 'contact' => $c['contact'],
      'email' => $c['email'], 'formule' => $c['formule'], 'suivi' => (bool) $c['suivi'], 'statut' => $c['statut'],
      'date_contrat' => $c['date_contrat'], 'compte' => compte_state($c),
      'derniere_connexion' => $c['derniere_connexion'] ? (int) $c['derniere_connexion'] : null,
      'nb' => count($list),
      'actives' => count(array_filter($etats, fn($e) => $e === 'ok' || $e === 'attente')),
      'erreurs' => count(array_filter($etats, fn($e) => $e === 'erreur')),
      'pause' => count(array_filter($etats, fn($e) => $e === 'pause')),
    ];
  }
  $orphelines = array_values(array_map('admin_automation', array_filter($autos, fn($a) => $a['client_id'] === null && !$a['absent'])));
  $synchros = $pdo->query('SELECT instance, recu_le, nb FROM synchros ORDER BY recu_le DESC')->fetchAll();
  reply(200, ['ok' => true, 'clients' => $out, 'non_rattachees' => $orphelines, 'synchros' => $synchros, 'emails' => mail_log_tail(15)]);
}

if ($method === 'GET' && $action === 'client') {
  $c = client_row($pdo, (int) ($_GET['id'] ?? 0));
  $st = $pdo->prepare('SELECT * FROM automations WHERE client_id = ? ORDER BY absent, nom');
  $st->execute([$c['id']]);
  $client = [
    'id' => (int) $c['id'], 'slug' => $c['slug'], 'entreprise' => $c['entreprise'], 'contact' => $c['contact'],
    'email' => $c['email'], 'telephone' => $c['telephone'], 'formule' => $c['formule'], 'suivi' => (bool) $c['suivi'],
    'statut' => $c['statut'], 'date_contrat' => $c['date_contrat'], 'notes' => $c['notes'],
    'compte' => compte_state($c), 'derniere_connexion' => $c['derniere_connexion'] ? (int) $c['derniere_connexion'] : null,
  ];
  reply(200, ['ok' => true, 'client' => $client, 'automatisations' => array_map('admin_automation', $st->fetchAll())]);
}

require_post();
$d = input();

if ($action === 'creer') {
  [$client, , $sent] = create_client($d, !empty($d['envoyer']));
  reply(200, ['ok' => true, 'client' => $client, 'mail_envoye' => $sent]);
}

if ($action === 'modifier') {
  $c = client_row($pdo, (int) ($d['id'] ?? 0));
  $statut = in_array($d['statut'] ?? '', ['actif', 'pause', 'termine'], true) ? $d['statut'] : $c['statut'];
  $entreprise = text($d['entreprise'] ?? $c['entreprise'], 160);
  if ($entreprise === '') reply(422, ['ok' => false, 'error' => 'validation', 'fields' => ['entreprise' => 'Indiquez le nom de l’entreprise.']]);
  $pdo->prepare('UPDATE clients SET entreprise = ?, contact = ?, telephone = ?, formule = ?, suivi = ?, statut = ?, date_contrat = ?, notes = ? WHERE id = ?')
      ->execute([$entreprise, text($d['contact'] ?? $c['contact'], 120), text($d['telephone'] ?? $c['telephone'], 30),
                 text($d['formule'] ?? $c['formule'], 120), array_key_exists('suivi', $d) ? (!empty($d['suivi']) ? 1 : 0) : $c['suivi'],
                 $statut, text($d['date_contrat'] ?? $c['date_contrat'], 10), long_text($d['notes'] ?? $c['notes'], 4000), $c['id']]);
  reply(200, ['ok' => true]);
}

if ($action === 'renvoyer') {
  $c = client_row($pdo, (int) ($d['id'] ?? 0));
  if (!$c['user_id'] || !$c['acces']) reply(409, ['ok' => false, 'error' => 'compte']);
  $sent = send_invitation(['id' => $c['user_id'], 'email' => $c['email']], $c['contact']);
  reply(200, ['ok' => true, 'mail_envoye' => $sent]);
}

if ($action === 'acces') {
  $c = client_row($pdo, (int) ($d['id'] ?? 0));
  if (!$c['user_id']) reply(409, ['ok' => false, 'error' => 'compte']);
  $pdo->prepare('UPDATE users SET actif = ? WHERE id = ?')->execute([!empty($d['actif']) ? 1 : 0, $c['user_id']]);
  if (empty($d['actif'])) $pdo->prepare('UPDATE tokens SET utilise_le = ? WHERE user_id = ? AND utilise_le IS NULL')->execute([time(), $c['user_id']]);
  reply(200, ['ok' => true]);
}

if ($action === 'automatisation') {
  $st = $pdo->prepare('SELECT * FROM automations WHERE id = ?');
  $st->execute([(int) ($d['id'] ?? 0)]);
  $a = $st->fetch();
  if (!$a) reply(404, ['ok' => false, 'error' => 'automatisation']);
  $clientId = array_key_exists('client_id', $d) ? ($d['client_id'] === null || $d['client_id'] === '' ? null : (int) $d['client_id']) : $a['client_id'];
  if ($clientId !== null) { client_row($pdo, $clientId); }
  $pdo->prepare('UPDATE automations SET description = ?, visible = ?, client_id = ? WHERE id = ?')
      ->execute([long_text($d['description'] ?? $a['description'], 500), array_key_exists('visible', $d) ? (!empty($d['visible']) ? 1 : 0) : $a['visible'], $clientId, $a['id']]);
  reply(200, ['ok' => true]);
}

if ($action === 'supprimer') {
  $c = client_row($pdo, (int) ($d['id'] ?? 0));
  if (trim((string) ($d['confirmation'] ?? '')) !== $c['entreprise']) {
    reply(422, ['ok' => false, 'error' => 'validation', 'fields' => ['confirmation' => 'Recopiez exactement le nom de l’entreprise.']]);
  }
  // Compte, liens et fiche effacés ; les automatisations restent (sans client) pour ne pas perdre le suivi technique
  $pdo->beginTransaction();
  $pdo->prepare('UPDATE automations SET client_id = NULL, visible = 0 WHERE client_id = ?')->execute([$c['id']]);   // masqués : un futur client au même identifiant ne les verra pas d'office
  $pdo->prepare('DELETE FROM users WHERE client_id = ?')->execute([$c['id']]);
  $pdo->prepare('DELETE FROM clients WHERE id = ?')->execute([$c['id']]);
  $pdo->commit();
  reply(200, ['ok' => true]);
}

if ($action === 'oublier') {
  $instance = text($d['instance'] ?? '', 60);
  $pdo->beginTransaction();
  $pdo->prepare('DELETE FROM automations WHERE instance = ?')->execute([$instance]);
  $pdo->prepare('DELETE FROM synchros WHERE instance = ?')->execute([$instance]);
  $pdo->commit();
  reply(200, ['ok' => true]);
}

reply(400, ['ok' => false, 'error' => 'action']);
