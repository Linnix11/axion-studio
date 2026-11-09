// Met à jour les deux workflows Axion dans votre n8n, en gardant vos accès (credentials) et l'adresse de votre feuille.
// À lancer sur l'ordinateur où tourne n8n :  node mettre-a-jour.mjs
// Il faut une clé d'API n8n : dans n8n, Settings → n8n API → Create an API key (la clé n'est ni affichée ni enregistrée ici).
// Pour changer de feuille Google : FEUILLE="https://docs.google.com/spreadsheets/d/…" node mettre-a-jour.mjs
import { createInterface } from 'node:readline/promises'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const N8N = (process.env.N8N_URL || 'http://localhost:5678').replace(/\/$/, '')
const SOURCE = process.env.AXION_SOURCE || 'https://raw.githubusercontent.com/Linnix11/axion-studio/main/automatisations/n8n/'   // ou un dossier local
const FICHIERS = ['axion-1-collecte-prospects.json', 'axion-2-envoi-emails.json']
const FEUILLE = process.env.FEUILLE?.trim()                        // nouvelle feuille (sinon : celle déjà utilisée)

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

/** Reprend les accès et la feuille Google : nœud du même nom dans l'ancienne version, sinon nœud du même type
 *  dans n'importe quel workflow Axion déjà installé (`reserve`). */
export function fusionner(nouveau, ancien, reserve = []) {
  const anciens = [...(ancien?.nodes || []), ...reserve]
  const feuille = FEUILLE ? { __rl: true, mode: 'url', value: FEUILLE }
    : anciens.find(n => n.type === 'n8n-nodes-base.googleSheets' && n.parameters?.documentId?.value)?.parameters.documentId
  const reel = c => Object.values(c || {}).some(x => x?.id)              // ignore les accès fictifs sans identifiant
  const nodes = nouveau.nodes.map(n => {
    const m = structuredClone(n)
    const source = anciens.find(o => o.name === m.name && o.type === m.type && reel(o.credentials))
      || anciens.find(o => o.type === m.type && reel(o.credentials) && (o.parameters?.authentication || '') === (m.parameters?.authentication || ''))
    if (source) m.credentials = structuredClone(source.credentials)
    // la feuille vient de l'ancienne version ; l'onglet reste celui du dépôt : le premier, quel que soit son nom
    if (m.type === 'n8n-nodes-base.googleSheets' && feuille) m.parameters.documentId = feuille
    return m
  })
  return { name: nouveau.name, nodes, connections: nouveau.connections, settings: { executionOrder: 'v1' } }
}

/** Nœuds qui ont besoin d'un accès et n'en ont pas (à choisir dans n8n). */
const BESOIN = ['n8n-nodes-base.googleSheets', 'n8n-nodes-base.emailSend', '@n8n/n8n-nodes-langchain.lmChatGoogleGemini']
const sansAcces = nodes => nodes.filter(n => (BESOIN.includes(n.type) || n.parameters?.authentication === 'genericCredentialType')
  && !Object.values(n.credentials || {}).some(c => c?.id)).map(n => n.name)

if (import.meta.url === `file://${process.argv[1]}`) {
  const existants = (await api('GET', '/workflows?limit=250')).data
  const axion = await Promise.all(existants.filter(w => w.name.startsWith('Axion')).map(w => api('GET', `/workflows/${w.id}`)))
  const reserve = axion.flatMap(w => w.nodes)
  for (const fichier of FICHIERS) {
    const nouveau = SOURCE.startsWith('http') ? await (await fetch(SOURCE + fichier + '?v=' + Date.now())).json() : JSON.parse(readFileSync(join(SOURCE, fichier), 'utf8'))
    const prefixe = nouveau.name.split('.')[0]                       // « Axion – 1 » ou « Axion – 2 »
    const ancien = existants.find(w => w.name === nouveau.name) || existants.find(w => w.name.startsWith(prefixe))
    const complet = ancien ? await api('GET', `/workflows/${ancien.id}`) : null
    const corps = fusionner(nouveau, complet, reserve)
    const manquants = sansAcces(corps.nodes)
    if (ancien) {
      await api('PUT', `/workflows/${ancien.id}`, corps)
      console.log(`✓ « ${nouveau.name} » mis à jour (vos accès sont conservés, ${FEUILLE ? 'nouvelle feuille branchée' : 'même feuille'}).`)
    } else {
      await api('POST', '/workflows', corps)
      console.log(`✓ « ${nouveau.name} » créé.`)
    }
    if (manquants.length) console.log(`  À compléter dans n8n (accès à choisir) : ${manquants.join(', ')}`)
  }
  if (!FEUILLE) console.log('\nSi ce n’est pas déjà fait : la ligne 1 de votre feuille doit contenir les 19 colonnes du fichier feuille-prospects-en-tetes.csv.')
}
