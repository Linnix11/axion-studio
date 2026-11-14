// Signale à Bing (et aux moteurs compatibles IndexNow) toutes les pages du plan du site.
// À lancer après une publication importante :  node scripts/indexnow.mjs
// La clé est publique par nature : elle prouve que le site autorise ces signalements (fichier public/<clé>.txt).
// La liste est construite depuis le dépôt (même source que le plan du site), et non lue sur le site en ligne :
// une page tout juste publiée est ainsi signalée même si l'hébergeur n'a pas encore mis le site à jour.
import { pageMeta, pageUrl } from '../src/seo.js'

const KEY = 'a0c151f7f1797e02da7cf2971dc6be50'
const HOST = 'axionstudio.fr'
const urlList = Object.keys(pageMeta).map(pageUrl)
if (!urlList.length) { console.error('Aucune page listée dans src/seo.js : rien envoyé.'); process.exit(1) }
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`IndexNow : ${urlList.length} adresses envoyées → HTTP ${res.status} ${res.statusText}`)
if (![200, 202].includes(res.status)) process.exit(1)
