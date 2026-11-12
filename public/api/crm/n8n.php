<?php
// Point d'entrée réservé à n8n (en-tête « Authorization: Bearer <crm_n8n_token> »).
//
// POST {"action":"synchro","instance":"mac-arthur","workflows":[
//        {"id":"12","nom":"Relances factures","active":true,"client":"boulangerie-martin",
//         "dernier_statut":"success","derniere_execution":"2026-11-12T08:00:03.000Z","executions_7j":42,"erreurs_7j":0}, …]}
//   → enregistre l'état de chaque workflow. La liste est complète pour l'instance : un workflow absent est marqué « retiré ».
//
// POST {"action":"nouveau-client","entreprise","contact","email","telephone","formule","suivi","date_contrat","envoyer":true}
//   → crée le client et son compte, et envoie l'e-mail d'accès (par ex. depuis un workflow « contrat signé »).

require __DIR__ . '/_crm.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);

$token = (string) (crm_config()['crm_n8n_token'] ?? getenv('CRM_N8N_TOKEN') ?: '');
// En-tête X-Axion-Token (conseillé : certains serveurs retirent Authorization) ou Authorization: Bearer
$auth = isset($_SERVER['HTTP_X_AXION_TOKEN']) ? 'Bearer ' . $_SERVER['HTTP_X_AXION_TOKEN']
      : ($_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? ''));
if (strlen($token) < 32 || !preg_match('/^Bearer\s+(\S+)$/', $auth, $m) || !hash_equals($token, $m[1])) {
  if (hit_limit('crm_n8n_ko_' . client_ip(), 20, 3600)) reply(429, ['ok' => false, 'error' => 'rate']);
  reply(401, ['ok' => false, 'error' => 'auth']);
}

$d = input();
$action = $d['action'] ?? '';
$pdo = db();

if ($action === 'synchro') {
  $instance = text($d['instance'] ?? 'n8n', 60) ?: 'n8n';
  $list = is_array($d['workflows'] ?? null) ? array_slice($d['workflows'], 0, 500) : null;
  if ($list === null) reply(422, ['ok' => false, 'error' => 'workflows']);

  $slugToId = [];
  foreach ($pdo->query('SELECT id, slug FROM clients') as $c) $slugToId[$c['slug']] = (int) $c['id'];
  $statuts = ['success', 'error', 'crashed', 'running', 'waiting', 'canceled', 'new', 'unknown', ''];

  $pdo->beginTransaction();
  $upsert = $pdo->prepare('INSERT INTO automations (instance, workflow_id, client_slug, client_id, nom, active, absent, dernier_statut, derniere_execution, executions_7j, erreurs_7j, maj_le)
    VALUES (:instance, :wid, :slug, :cid, :nom, :active, 0, :statut, :derniere, :n7, :e7, :now)
    ON CONFLICT (instance, workflow_id) DO UPDATE SET
      client_slug = excluded.client_slug,
      client_id = CASE WHEN excluded.client_slug = automations.client_slug THEN COALESCE(automations.client_id, excluded.client_id) ELSE excluded.client_id END,
      nom = excluded.nom, active = excluded.active, absent = 0, dernier_statut = excluded.dernier_statut,
      derniere_execution = excluded.derniere_execution, executions_7j = excluded.executions_7j, erreurs_7j = excluded.erreurs_7j, maj_le = excluded.maj_le');
  $seen = [];
  foreach ($list as $w) {
    if (!is_array($w)) continue;
    $wid = text($w['id'] ?? '', 64);
    if ($wid === '') continue;
    $slug = slugify(text($w['client'] ?? '', 80));
    if (($w['client'] ?? '') === '') $slug = '';
    $statut = in_array($w['dernier_statut'] ?? '', $statuts, true) ? $w['dernier_statut'] : 'unknown';
    $derniere = text($w['derniere_execution'] ?? '', 40);
    if ($derniere !== '' && strtotime($derniere) === false) $derniere = '';
    $upsert->execute([
      ':instance' => $instance, ':wid' => $wid, ':slug' => $slug, ':cid' => $slugToId[$slug] ?? null,
      ':nom' => text($w['nom'] ?? '', 160), ':active' => !empty($w['active']) ? 1 : 0, ':statut' => $statut, ':derniere' => $derniere,
      ':n7' => max(0, (int) ($w['executions_7j'] ?? 0)), ':e7' => max(0, (int) ($w['erreurs_7j'] ?? 0)), ':now' => time(),
    ]);
    $seen[] = $wid;
  }
  // Les workflows qui ne sont plus envoyés sont marqués « retirés » (jamais supprimés : l'historique reste)
  $place = $seen ? implode(',', array_fill(0, count($seen), '?')) : "''";
  $pdo->prepare("UPDATE automations SET absent = 1, maj_le = ? WHERE instance = ? AND workflow_id NOT IN ($place)")
      ->execute(array_merge([time(), $instance], $seen));
  $pdo->prepare('INSERT INTO synchros (instance, recu_le, nb) VALUES (?, ?, ?) ON CONFLICT (instance) DO UPDATE SET recu_le = excluded.recu_le, nb = excluded.nb')
      ->execute([$instance, time(), count($seen)]);
  $pdo->commit();
  reply(200, ['ok' => true, 'recues' => count($seen)]);
}

if ($action === 'nouveau-client') {
  [$client, , $sent] = create_client($d, !array_key_exists('envoyer', $d) || !empty($d['envoyer']));
  reply(200, ['ok' => true, 'client' => $client, 'mail_envoye' => $sent]);
}

reply(400, ['ok' => false, 'error' => 'action']);
