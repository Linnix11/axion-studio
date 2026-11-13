// Signale à Bing (et aux moteurs compatibles IndexNow) toutes les pages du plan du site.
// À lancer après une publication importante :  node scripts/indexnow.mjs
// La clé est publique par nature : elle prouve que le site autorise ces signalements (fichier public/<clé>.txt).
const KEY = 'a0c151f7f1797e02da7cf2971dc6be50'
const HOST = 'axionstudio.fr'
const r = await fetch(`https://${HOST}/sitemap.xml`)
if (!r.ok) { console.error(`Plan du site illisible : HTTP ${r.status} (page anti-robot ?)`); process.exit(1) }
const sitemap = await r.text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
if (!urlList.length) { console.error('Aucune adresse dans le plan du site : rien envoyé.'); process.exit(1) }
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`IndexNow : ${urlList.length} adresses envoyées → HTTP ${res.status} ${res.statusText}`)
if (![200, 202].includes(res.status)) process.exit(1)
