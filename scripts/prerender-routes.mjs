// Après `vite build` :
// - crée un fichier HTML par page (dist/services/index.html, ...) pour les liens directs,
//   avec le bon titre, la description, l'adresse canonique et les balises de partage (Open Graph) ;
// - crée dist/404.html, dist/sitemap.xml et dist/robots.txt.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pageMeta, fullTitle, SITE_URL, BRAND } from '../src/seo.js'
import * as data from '../src/data.js'
import { assistantRules } from '../src/chatbot.js'

const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')
// Précharge les deux polices principales (alphabet latin) pour accélérer le premier affichage.
const fonts = readdirSync(join(dist, 'assets')).filter(f => /^(schibsted-grotesk|source-serif-4)-latin-wght-normal-.*\.woff2$/.test(f))
const preload = fonts.map(f => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n  ')

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function render(path) {
  const meta = pageMeta[path] ?? { description: pageMeta['/'].description }
  const title = esc(fullTitle(path))
  const desc = esc(meta.description)
  const url = path === '/404' ? SITE_URL + '/' : `${SITE_URL}${path === '/' ? '/' : path + '/'}`
  const tags = [
    preload,
    path === '/404' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${BRAND}">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${desc}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${SITE_URL}/og.png">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ].join('\n  ')
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`)
    .replace('</head>', `  ${tags}\n</head>`)
}

const paths = Object.keys(pageMeta)
for (const path of paths) {
  const dir = path === '/' ? dist : join(dist, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), render(path))
}
writeFileSync(join(dist, '404.html'), render('/404'))

const today = new Date().toISOString().slice(0, 10)
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p + '/'}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
// Instructions de l'assistant IA : règles + tout le contenu du site, lus par public/api/chat.php.
const knowledge = Object.entries(data)
  .filter(([k]) => !['nav', 'tasks', 'demo'].includes(k))
  .map(([k, v]) => `## ${k}\n${JSON.stringify(v, null, 1)}`)
  .join('\n\n')
mkdirSync(join(dist, 'api'), { recursive: true })
writeFileSync(join(dist, 'api', 'assistant-prompt.txt'), `${assistantRules}\n\nINFORMATIONS SUR AXION STUDIO (source : le site axionstudio.fr)\n\n${knowledge}\n`)

console.log(`${paths.length} pages, 404.html, sitemap.xml et robots.txt générés`)
