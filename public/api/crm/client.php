<?php
// Tableau de bord du client connecté : son contrat et ses automatisations (celles marquées visibles).
// GET → {"ok":true,"client":{...},"automatisations":[...],"acces":[...],"derniere_synchro":1731400000}
// POST {"action":"acces-envoyer", id, chiffre:{v,k,iv,c}} → dépose un accès chiffré dans le navigateur (jamais en clair ici)

require __DIR__ . '/_crm.php';

$u = require_user();
if ($u['role'] !== 'client' || !$u['client_id']) reply(403, ['ok' => false, 'error' => 'forbidden']);
$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  require_post();
  $d = input();
  if (($d['action'] ?? '') !== 'acces-envoyer') reply(400, ['ok' => false, 'error' => 'action']);
  if (hit_limit('crm_acces_' . $u['id'], 30, 3600)) reply(429, ['ok' => false, 'error' => 'rate']);
  $bloc = bloc_chiffre_valide($d['chiffre'] ?? null);
  if ($bloc === null) reply(422, ['ok' => false, 'error' => 'chiffre']);
  // Seulement une demande de CE client, encore à fournir (ou à refournir après une erreur)
  $st = $pdo->prepare("UPDATE acces SET chiffre = ?, statut = 'recu', recu_le = ?, erreur = '' WHERE id = ? AND client_id = ? AND statut IN ('demande', 'erreur')");
  $st->execute([$bloc, time(), (int) ($d['id'] ?? 0), $u['client_id']]);
  if ($st->rowCount() !== 1) reply(404, ['ok' => false, 'error' => 'acces']);
  reply(200, ['ok' => true]);
}
if ($_SERVER['REQUEST_METHOD'] !== 'GET') reply(405, ['ok' => false, 'error' => 'method']);
$st = $pdo->prepare('SELECT entreprise, contact, formule, suivi, statut, date_contrat FROM clients WHERE id = ?');
$st->execute([$u['client_id']]);
$client = $st->fetch();
if (!$client) reply(404, ['ok' => false, 'error' => 'client']);
$client['suivi'] = (bool) $client['suivi'];

$st = $pdo->prepare('SELECT * FROM automations WHERE client_id = ? AND visible = 1 AND absent = 0 ORDER BY nom');
$st->execute([$u['client_id']]);
$autos = array_map('public_automation', $st->fetchAll());

$st = $pdo->prepare('SELECT * FROM acces WHERE client_id = ? ORDER BY cree_le');
$st->execute([$u['client_id']]);

reply(200, [
  'ok' => true,
  'client' => $client,
  'automatisations' => $autos,
  'acces' => array_map('public_acces', $st->fetchAll()),
  'derniere_synchro' => last_sync(),
  'contact' => ['email' => CRM_CONTACT],
]);
