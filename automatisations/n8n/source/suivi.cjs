// Logique du workflow « Axion – 3. Suivi des automatisations clients » (reprise telle quelle dans ses nœuds Code).
// Testée par suivi.test.cjs. Ne pas utiliser `URL` ni de module : le nœud Code de n8n ne les a pas.

const SEPT_JOURS = 7 * 24 * 3600 * 1000

/** Pages de GET /api/v1/workflows → une entrée par workflow, avec le client tiré de l'étiquette « client-<identifiant> ». */
function listerWorkflows(pages) {
  const vus = new Set()
  const out = []
  for (const page of pages) {
    for (const w of (page && page.data) || []) {
      if (!w || w.id == null || vus.has(String(w.id)) || w.isArchived) continue
      vus.add(String(w.id))
      const noms = (w.tags || []).map(t => String((t && t.name) || t || '').trim().toLowerCase())
      const tag = noms.find(t => /^client-[a-z0-9-]+$/.test(t))
      out.push({ id: String(w.id), nom: String(w.name || ''), active: !!w.active, client: tag ? tag.slice('client-'.length) : '' })
    }
  }
  return out
}

/** Workflows + pages de GET /api/v1/executions → corps envoyé à l'espace client (action « synchro »). */
function construireSynchro(workflows, pagesExecutions, instance, maintenant) {
  const depuis = maintenant - SEPT_JOURS
  const stats = {}
  const vues = new Set()
  for (const page of pagesExecutions) {
    for (const e of (page && page.data) || []) {
      if (!e || e.workflowId == null || vues.has(e.id)) continue
      vues.add(e.id)
      const wid = String(e.workflowId)
      const s = stats[wid] || (stats[wid] = { derniere: null, statut: '', n7: 0, e7: 0 })
      const debut = Date.parse(e.startedAt || '')
      if (Number.isNaN(debut)) continue
      if (!s.derniere || debut > s.derniere) { s.derniere = debut; s.statut = String(e.status || '') }
      if (debut >= depuis) {
        s.n7++
        if (e.status === 'error' || e.status === 'crashed') s.e7++
      }
    }
  }
  return {
    action: 'synchro',
    instance,
    workflows: workflows.map(w => {
      const s = stats[w.id]
      return {
        id: w.id, nom: w.nom, active: w.active, client: w.client,
        dernier_statut: s ? s.statut : '',
        derniere_execution: s && s.derniere ? new Date(s.derniere).toISOString() : '',
        executions_7j: s ? s.n7 : 0,
        erreurs_7j: s ? s.e7 : 0,
      }
    }),
  }
}

module.exports = { listerWorkflows, construireSynchro }
