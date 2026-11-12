// node automatisations/n8n/source/suivi.test.cjs
const assert = require('node:assert')
const { listerWorkflows, construireSynchro } = require('./suivi.cjs')

const pagesWf = [
  { data: [
    { id: '11', name: 'Relances factures', active: true, tags: [{ name: 'client-boulangerie-martin' }, { name: 'factures' }] },
    { id: '12', name: 'Devis', active: false, tags: [{ name: 'Client-Boulangerie-Martin' }] },
    { id: '20', name: 'Prospection', active: true, tags: [] },
    { id: '30', name: 'Archivé', active: false, isArchived: true, tags: [] },
  ], nextCursor: 'x' },
  { data: [{ id: '11', name: 'Relances factures', active: true, tags: [] }, { id: '40', name: 'Sans tags', active: true }], nextCursor: null },
]
const wf = listerWorkflows(pagesWf)
assert.deepStrictEqual(wf.map(w => w.id), ['11', '12', '20', '40'], 'doublons et archivés retirés')
assert.strictEqual(wf[0].client, 'boulangerie-martin')
assert.strictEqual(wf[1].client, 'boulangerie-martin', 'étiquette en majuscules acceptée')
assert.strictEqual(wf[2].client, '')
assert.strictEqual(wf[3].client, '', 'workflow sans champ tags')

const now = Date.parse('2026-11-12T12:00:00Z')
const pagesEx = [
  { data: [
    { id: 5, workflowId: '11', status: 'success', startedAt: '2026-11-12T11:45:00Z' },
    { id: 4, workflowId: '11', status: 'error', startedAt: '2026-11-12T11:30:00Z' },
    { id: 3, workflowId: '11', status: 'success', startedAt: '2026-11-01T10:00:00Z' },   // plus de 7 jours
    { id: 9, workflowId: '12', status: 'crashed', startedAt: '2026-11-10T08:00:00Z' },
  ] },
  { data: [{ id: 5, workflowId: '11', status: 'success', startedAt: '2026-11-12T11:45:00Z' }] },   // doublon de page
  {},   // page vide (workflow sans exécution)
]
const body = construireSynchro(wf, pagesEx, 'mac-arthur', now)
assert.strictEqual(body.action, 'synchro')
assert.strictEqual(body.instance, 'mac-arthur')
const w11 = body.workflows.find(w => w.id === '11')
assert.deepStrictEqual(
  { s: w11.dernier_statut, d: w11.derniere_execution, n: w11.executions_7j, e: w11.erreurs_7j },
  { s: 'success', d: '2026-11-12T11:45:00.000Z', n: 2, e: 1 },
)
const w12 = body.workflows.find(w => w.id === '12')
assert.deepStrictEqual({ s: w12.dernier_statut, n: w12.executions_7j, e: w12.erreurs_7j }, { s: 'crashed', n: 1, e: 1 })
const w20 = body.workflows.find(w => w.id === '20')
assert.deepStrictEqual({ s: w20.dernier_statut, d: w20.derniere_execution, n: w20.executions_7j }, { s: '', d: '', n: 0 })
assert.strictEqual(body.workflows.length, 4)
console.log('suivi.test.cjs : OK')
