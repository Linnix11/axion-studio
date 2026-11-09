// Met à jour les deux workflows Axion dans votre n8n, en gardant vos accès (credentials) et l'adresse de votre feuille.
// À lancer sur l'ordinateur où tourne n8n :  node mettre-a-jour.mjs
// Il faut une clé d'API n8n : dans n8n, Settings → n8n API → Create an API key. Collée une première fois, elle est gardée
// dans ~/.config/axion/n8n-api-key (lisible par vous seul) ; si n8n la refuse, elle est oubliée et redemandée.
// Pour changer de feuille Google : FEUILLE="<adresse copiée dans le navigateur, avec #gid=…>" node mettre-a-jour.mjs
// (le numéro gid désigne l'onglet ; sans lui, l'onglet déjà utilisé est gardé)
import { createInterface } from 'node:readline/promises'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { homedir } from 'node:os'

const N8N = (process.env.N8N_URL || 'http://localhost:5678').replace(/\/$/, '')
const SOURCE = process.env.AXION_SOURCE || 'https://raw.githubusercontent.com/Linnix11/axion-studio/main/automatisations/n8n/'   // ou un dossier local
const FICHIERS = ['axion-1-collecte-prospects.json', 'axion-2-envoi-emails.json']
const FEUILLE = process.env.FEUILLE?.trim()                        // nouvelle feuille (sinon : celle déjà utilisée)

const FICHIER_CLE = join(homedir(), '.config', 'axion', 'n8n-api-key')
let key = process.env.N8N_API_KEY || (() => { try { return readFileSync(FICHIER_CLE, 'utf8').trim() } catch { return '' } })()
if (!key) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  key = (await rl.question('Collez votre clé d’API n8n puis appuyez sur Entrée : ')).trim()
  rl.close()
  mkdirSync(dirname(FICHIER_CLE), { recursive: true, mode: 0o700 })
  writeFileSync(FICHIER_CLE, key, { mode: 0o600 })
  console.log(`Clé gardée dans ${FICHIER_CLE} : elle ne sera plus demandée.`)
}

async function api(method, path, body) {
  const res = await fetch(`${N8N}/api/v1${path}`, {
    method, headers: { 'X-N8N-API-KEY': key, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body),
  }).catch(e => { throw new Error(`n8n ne répond pas à ${N8N} : est-il bien lancé ? (${e.message})`) })
  if (res.status === 401 || res.status === 403) {
    rmSync(FICHIER_CLE, { force: true })
    throw new Error('n8n refuse la clé d’API (expirée ou supprimée ?). Elle a été oubliée : relancez la commande et collez-en une nouvelle.')
  }
  if (!res.ok) throw new Error(`n8n a répondu ${res.status} sur ${method} ${path} : ${(await res.text()).slice(0, 200)}`)
  return res.json()
}

/** Reprend les accès et la feuille Google : nœud du même nom dans l'ancienne version, sinon nœud du même type
 *  dans n'importe quel workflow Axion déjà installé (`reserve`). */
export function fusionner(nouveau, ancien, reserve = []) {
  const anciens = [...(ancien?.nodes || []), ...reserve]
  const ancienneFeuille = anciens.find(n => n.type === 'n8n-nodes-base.googleSheets' && n.parameters?.documentId?.value)?.parameters
  const feuille = FEUILLE ? { __rl: true, mode: 'url', value: FEUILLE } : ancienneFeuille?.documentId
  // onglet : le numéro gid de l'adresse collée, sinon celui déjà utilisé, sinon celui du dépôt (premier onglet, gid 0)
  const gid = FEUILLE?.match(/gid=(\d+)/)?.[1]
  const onglet = gid ? { __rl: true, mode: 'id', value: gid } : !FEUILLE ? ancienneFeuille?.sheetName : undefined
  const reel = c => Object.values(c || {}).some(x => x?.id)              // ignore les accès fictifs sans identifiant
  const nodes = nouveau.nodes.map(n => {
    const m = structuredClone(n)
    // une requête HTTP ne reprend que l'accès d'une requête du même genre (la clé Places ne va pas sur l'annuaire)
    const memeGenre = o => m.type !== 'n8n-nodes-base.httpRequest' || (o.parameters?.authentication || '') === (m.parameters?.authentication || '')
    const source = anciens.find(o => o.name === m.name && o.type === m.type && reel(o.credentials))
      || anciens.find(o => o.type === m.type && reel(o.credentials) && memeGenre(o))
    if (source) {
      m.credentials = structuredClone(source.credentials)
      // le mode d'accès va avec l'accès (ex. Google Sheets en « Service Account » plutôt qu'en connexion OAuth)
      if (source.parameters?.authentication) m.parameters.authentication = source.parameters.authentication
    }
    // la feuille vient de l'ancienne version ; l'onglet reste celui du dépôt : le premier, quel que soit son nom
    if (m.type === 'n8n-nodes-base.googleSheets' && feuille) m.parameters.documentId = feuille
    if (m.type === 'n8n-nodes-base.googleSheets' && onglet) m.parameters.sheetName = onglet
    return m
  })
  return { name: nouveau.name, nodes, connections: nouveau.connections, settings: { executionOrder: 'v1' } }
}

/** Nœuds qui ont besoin d'un accès et n'en ont pas (à choisir dans n8n). */
const BESOIN = ['n8n-nodes-base.googleSheets', 'n8n-nodes-base.emailSend', '@n8n/n8n-nodes-langchain.lmChatGoogleGemini', 'n8n-nodes-imap.imap']
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
    let id = ancien?.id
    if (ancien) {
      await api('PUT', `/workflows/${ancien.id}`, corps)
      console.log(`✓ « ${nouveau.name} » mis à jour (vos accès sont conservés, ${FEUILLE ? 'nouvelle feuille branchée' : 'même feuille'}).`)
    } else {
      id = (await api('POST', '/workflows', corps)).id
      console.log(`✓ « ${nouveau.name} » créé.`)
    }
    if (manquants.length) console.log(`  À compléter dans n8n (accès à choisir) : ${manquants.join(', ')}`)
    // Relecture : ce que n8n a réellement enregistré (pas seulement ce qui a été envoyé)
    const enregistre = await api('GET', `/workflows/${id}`)
    const ongletsLus = [...new Set(enregistre.nodes.filter(n => n.type === 'n8n-nodes-base.googleSheets').map(n => n.parameters.sheetName?.value))]
    const attendus = [...new Set(corps.nodes.filter(n => n.type === 'n8n-nodes-base.googleSheets').map(n => n.parameters.sheetName?.value))]
    console.log(`  Relu dans n8n : onglet ${ongletsLus.join(', ')} ${String(ongletsLus) === String(attendus) ? '(conforme)' : '⚠ DIFFÉRENT de ce qui a été envoyé'}`)
    const feuilles = [...new Set(corps.nodes.filter(n => n.type === 'n8n-nodes-base.googleSheets').map(n => n.parameters.documentId?.value || '(aucune)'))]
    const onglets = [...new Set(corps.nodes.filter(n => n.type === 'n8n-nodes-base.googleSheets').map(n => n.parameters.sheetName?.value))]
    console.log(`  Feuille branchée : ${feuilles.map(f => (f.match(/\/d\/([\w-]+)/) || [, f])[1]).join(', ')} (onglet ${onglets.join(', ')})`)
  }
  console.log('\nDans n8n, rechargez la page du workflow avant de le tester : un éditeur resté ouvert garde l’ancienne version,')
  console.log('et un clic sur « Save » dans cet éditeur l’écrirait par-dessus la nouvelle.')
  if (!FEUILLE) console.log('\nSi ce n’est pas déjà fait : la ligne 1 de votre feuille doit contenir les 19 colonnes du fichier feuille-prospects-en-tetes.csv.')
}
