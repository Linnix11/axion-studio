<?php
// Tableau de bord du client connecté : son contrat et ses automatisations (celles marquées visibles).
// GET → {"ok":true,"client":{...},"automatisations":[...],"derniere_synchro":1731400000}

require __DIR__ . '/_crm.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') reply(405, ['ok' => false, 'error' => 'method']);
$u = require_user();
if ($u['role'] !== 'client' || !$u['client_id']) reply(403, ['ok' => false, 'error' => 'forbidden']);

$pdo = db();
$st = $pdo->prepare('SELECT entreprise, contact, formule, suivi, statut, date_contrat FROM clients WHERE id = ?');
$st->execute([$u['client_id']]);
$client = $st->fetch();
if (!$client) reply(404, ['ok' => false, 'error' => 'client']);
$client['suivi'] = (bool) $client['suivi'];

$st = $pdo->prepare('SELECT * FROM automations WHERE client_id = ? AND visible = 1 AND absent = 0 ORDER BY nom');
$st->execute([$u['client_id']]);
$autos = array_map('public_automation', $st->fetchAll());

reply(200, [
  'ok' => true,
  'client' => $client,
  'automatisations' => $autos,
  'derniere_synchro' => last_sync(),
  'contact' => ['email' => crm_admin_email()],
]);
