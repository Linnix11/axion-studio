// Met à jour les deux workflows Axion dans votre n8n, en gardant vos accès (credentials) et l'adresse de votre feuille.
// À lancer sur l'ordinateur où tourne n8n :  node mettre-a-jour.mjs
// Il faut une clé d'API n8n : dans n8n, Settings → n8n API → Create an API key (la clé n'est ni affichée ni enregistrée ici).
import { createInterface } from 'node:readline/promises'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const N8N = (process.env.N8N_URL || 'http://localhost:5678').replace(/\/$/, '')
const SOURCE = process.env.AXION_SOURCE || 'https://raw.githubusercontent.com/Linnix11/axion-studio/main/automatisations/n8n/'   // ou un dossier local
const FICHIERS = ['axion-1-collecte-prospects.json', 'axion-2-envoi-emails.json']

let key = process.env.N8N_API_KEY
if (!key) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  key = (await rl.question('Collez votre clé d’API n8n puis appuyez sur Entrée : ')).trim()
  rl.close()
}

async function api(method, path, body) {
  const res = await fetch(`${N8N}/api/v1${path}`, {
    method, headers: { 'X-N8N-API-KEY': key, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body),
  }).catch(e => { throw new Error(`n8n ne répond pas à ${N8N} : est-il bien lancé ? (${e.message})`) })
  if (!res.ok) throw new Error(`n8n a répondu ${res.status} sur ${method} ${path} : ${(await res.text()).slice(0, 200)}`)
  return res.json()
}

/** Reprend, nœud par nœud (même nom), les accès et la feuille Google de l'ancienne version. */
export function fusionner(nouveau, ancien) {
  const anciens = Object.fromEntries((ancien?.nodes || []).map(n => [n.name, n]))
  const feuille = (ancien?.nodes || []).find(n => n.type === 'n8n-nodes-base.googleSheets' && n.parameters?.documentId?.value)
  const accesParType = {}
  for (const n of ancien?.nodes || []) for (const [type, cred] of Object.entries(n.credentials || {})) if (cred?.id) accesParType[type] = cred
  const nodes = nouveau.nodes.map(n => {
    const m = structuredClone(n)
    for (const type of Object.keys(m.credentials || {})) {
      const repris = anciens[m.name]?.credentials?.[type] || accesParType[type]
      if (repris) m.credentials[type] = repris
    }
    if (m.type === 'n8n-nodes-base.googleSheets' && feuille) {
      m.parameters.documentId = feuille.parameters.documentId
      if (feuille.parameters.sheetName) m.parameters.sheetName = feuille.parameters.sheetName
    }
    return m
  })
  return { name: nouveau.name, nodes, connections: nouveau.connections, settings: { executionOrder: 'v1' } }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const existants = (await api('GET', '/workflows?limit=250')).data
  for (const fichier of FICHIERS) {
    const nouveau = SOURCE.startsWith('http') ? await (await fetch(SOURCE + fichier + '?v=' + Date.now())).json() : JSON.parse(readFileSync(join(SOURCE, fichier), 'utf8'))
    const prefixe = nouveau.name.split('.')[0]                       // « Axion – 1 » ou « Axion – 2 »
    const ancien = existants.find(w => w.name === nouveau.name) || existants.find(w => w.name.startsWith(prefixe))
    const complet = ancien ? await api('GET', `/workflows/${ancien.id}`) : null
    const corps = fusionner(nouveau, complet)
    const manquants = corps.nodes.filter(n => Object.values(n.credentials || {}).some(c => !c.id)).map(n => n.name)
    if (ancien) {
      await api('PUT', `/workflows/${ancien.id}`, corps)
      console.log(`✓ « ${nouveau.name} » mis à jour (vos accès et votre feuille sont conservés).`)
    } else {
      await api('POST', '/workflows', corps)
      console.log(`✓ « ${nouveau.name} » créé.`)
    }
    if (manquants.length) console.log(`  À compléter dans n8n (accès à choisir) : ${manquants.join(', ')}`)
  }
  console.log('\nDernière étape : ajoutez les colonnes « outils » et « pistes » à la fin de la ligne 1 de votre feuille Google.')
}
