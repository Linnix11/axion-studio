// Après `vite build` (client) et `vite build --ssr` (serveur) :
// - écrit une page HTML COMPLÈTE par route (texte lisible sans JavaScript par Google et les robots des IA),
//   avec titre, description, adresse canonique, balises de partage et données structurées schema.org ;
// - crée 404.html, sitemap.xml, robots.txt, llms.txt et llms-full.txt (référencement dans les IA) ;
// - crée api/assistant-prompt.txt (consignes du chatbot).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { pageMeta, fullTitle, pageUrl, schemaFor, SITE_URL, BRAND } from '../src/seo.js'
import * as data from '../src/data.js'
import { assistantRules } from '../src/chatbot.js'
import { posts } from '../src/blog.js'
import { cgv, cgvSettings } from '../src/legal.js'
import { render } from '../dist-server/entry-server.js'

const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Précharge les deux polices principales (alphabet latin) pour accélérer le premier affichage.
const fonts = readdirSync(join(dist, 'assets')).filter(f => /^(bricolage-grotesque-latin-wdth|hanken-grotesk-latin-wght)-normal-.*\.woff2$/.test(f))
const preload = fonts.map(f => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n  ')

function page(path) {
  const is404 = path === '/404'
  const meta = pageMeta[path] ?? { description: pageMeta['/'].description }
  const title = esc(fullTitle(path)), desc = esc(meta.description)
  const url = is404 ? `${SITE_URL}/` : pageUrl(path)
  const jsonld = JSON.stringify(schemaFor(is404 ? '/' : path, data)).replace(/</g, '\\u003c')
  const head = [
    preload,
    is404 ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`,
    '<link rel="alternate" type="text/plain" href="/llms.txt" title="Résumé du site pour les IA">',
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${BRAND}">`,
    `<meta property="og:locale" content="fr_FR">`,
    // Public visé : la France. hreflang sur la page elle-même (pas d'autre version) ; geo.* lus par Bing, ignorés par Google.
    is404 ? '' : `<link rel="alternate" hreflang="fr-FR" href="${url}">`,
    '<meta name="geo.region" content="FR-95"><meta name="geo.placename" content="Montlignon">',
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${desc}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${SITE_URL}/og.png">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Axion Studio : vos tâches répétitives, faites sans vous.">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${jsonld}</script>`,
  ].join('\n  ')
  const body = render(is404 ? '/page-introuvable' : path === '/' ? '/' : path + '/')   // adresse réelle, avec « / » final (liens actifs du menu)
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`)
    .replace('</head>', `  ${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

const paths = Object.keys(pageMeta)
// Typographie française : une espace normale devant : ; ? ! » laisse le signe tomber seul en début de ligne.
const typoWarnings = []
for (const path of paths) {
  const dir = path === '/' ? dist : join(dist, path)
  mkdirSync(dir, { recursive: true })
  const html = page(path)
  writeFileSync(join(dir, 'index.html'), html)
  const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ')
  for (const m of text.matchAll(/\S{0,30} [:;?!»]/g)) typoWarnings.push(`${path} : « ${m[0]} »`)
}
if (typoWarnings.length) console.warn(`⚠ Espace insécable manquante (à remplacer par \\u00A0 avant « : », \\u202F avant ; ? ! ») :\n  ${typoWarnings.join('\n  ')}`)
writeFileSync(join(dist, '404.html'), page('/404'))

// ——— Plan du site et robots ———
const priority = p => (p === '/' ? '1.0' : p.startsWith('/blog') ? '0.7' : ['/services', '/tarifs', '/contact', '/exemples'].includes(p) || p.startsWith('/automatisation/') ? '0.8' : p.startsWith('/mentions') || p === '/confidentialite' || p === '/cgv' ? '0.3' : '0.6')
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => {
  // Date réelle seulement pour les articles : une date de build ferait croire que tout change à chaque publication
  const date = pageMeta[p]?.post?.date
  return `  <url><loc>${pageUrl(p)}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}<priority>${priority(p)}</priority></url>`
}).join('\n')}
</urlset>
`)
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Applebot', 'Bingbot', 'Googlebot', 'DuckAssistBot', 'MistralAI-User', 'meta-externalagent']
writeFileSync(join(dist, 'robots.txt'), `# Moteurs de recherche et moteurs de réponse des IA : bienvenue.
${aiBots.map(b => `User-agent: ${b}\nAllow: /\nDisallow: /api/\n`).join('\n')}
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`)

// ——— Référencement dans les IA : llms.txt (résumé) et llms-full.txt (contenu complet) ———
const { company, services, useCases, steps, offers, faq, guarantees, security, notDoing, tools } = data
const intro = `> Axion Studio est la micro-entreprise d'${company.owner}, basée à Montlignon (Val-d'Oise, 95). Elle automatise les tâches répétitives des TPE, PME et indépendants : workflows automatisés, intégration d'outils (CRM, messagerie, tableurs, facturation), intelligence artificielle appliquée et création de sites web. Clientèle : entreprises et indépendants situés en France, accompagnés en français. Interventions en Île-de-France et à distance partout en France. Audit gratuit de 30 minutes ; projets au forfait à partir de 150 € ; suivi mensuel à partir de 250 € par mois ; TVA non applicable (art. 293 B du CGI).`
const links = paths.filter(p => !['/mentions-legales'].includes(p) && !p.startsWith('/blog/')).map(p => `- [${pageMeta[p].name}](${pageUrl(p)}) : ${pageMeta[p].description}`).join('\n')
writeFileSync(join(dist, 'llms.txt'), `# ${BRAND}

${intro}

## Contact
- Site : ${SITE_URL}/
- E-mail : ${company.email}
- Téléphone : ${company.phone}
- Zone : Montlignon (95), Val-d'Oise, Île-de-France, et à distance partout en France
- Prise de contact : ${pageUrl('/contact')} (réponse sous 24 heures ouvrées)

## Pages
${links}

## Articles
${posts.map(p => `- [${p.title}](${pageUrl(`/blog/${p.slug}`)}) : ${p.description}`).join('\n')}

## Pour aller plus loin
- [Contenu complet du site en texte](${SITE_URL}/llms-full.txt)
`)
const md = []
md.push(`# ${BRAND} : contenu complet du site\n\n${intro}\n`)
md.push(`## Services\n` + services.map(s => `### ${s.title}\n${s.intro}\n\nCe qui est inclus :\n${s.includes.map(i => `- ${i}`).join('\n')}\n\nExemples :\n${s.examples.map(i => `- ${i}`).join('\n')}\n`).join('\n'))
md.push(`Outils utilisés selon les besoins : ${tools.join(', ')}.\n`)
md.push(`## Automatisation par métier\n` + data.metiers.map(m => `### ${m.title}\n${pageUrl(`/automatisation/${m.slug}`)}\n\nPour : ${m.cible}. ${m.probleme}\n\n${m.taches.map(t => `- ${t.titre} : ${t.texte}`).join('\n')}\n\nOrdre de grandeur : ${m.exemple.gain} de temps rendu.\n`).join('\n'))
md.push(`## Exemples (cas types, gains en ordre de grandeur)\n` + useCases.map(u => `### ${u.task} (${u.sector})\n- Avant : ${u.before}\n- Après : ${u.after}\n- Temps gagné : ${u.gain}\n`).join('\n'))
md.push(`## Méthode\n` + steps.map((s, i) => `${i + 1}. ${s.title} (${s.duration}) : ${s.text} ${s.detail}`).join('\n') + '\n')
md.push(`## Tarifs\n` + offers.map(o => `- ${o.name} : ${o.from ? 'à partir de ' : ''}${o.price}, ${o.unit}. ${o.text} (${o.items.join(' ; ')})`).join('\n') + '\n\nTVA non applicable, article 293 B du CGI.\n')
md.push(`## Garanties\n` + guarantees.map(g => `- ${g.title} : ${g.text}`).join('\n') + '\n')
md.push(`## Ce qu'Axion Studio ne fait pas\n` + notDoing.map(n => `- ${n}`).join('\n') + '\n')
md.push(`## Sécurité des données\n` + security.map(s => `- ${s.title} : ${s.text}`).join('\n') + '\n')
md.push(`## Questions fréquentes\n` + faq.map(f => `### ${f.q}\n${f.a}\n`).join('\n'))
md.push(`## Articles du blog\n` + posts.map(p => `### ${p.title}\n${pageUrl(`/blog/${p.slug}`)} (${p.date})\n\n${p.lead}\n\n` + p.body.map(b => b.h2 ? `#### ${b.h2}` : b.p ? b.p : b.note ? `> ${b.note}` : (b.ul || b.ol).map((x, i) => (b.ol ? `${i + 1}. ` : '- ') + x).join('\n')).join('\n\n') + (p.faq?.length ? '\n\n#### Questions fréquentes\n\n' + p.faq.map(f => `**${f.q}**\n${f.a}`).join('\n\n') : '')).join('\n\n') + '\n')
md.push(`## Conditions générales de vente (version du ${cgvSettings.version})\n` + cgv.map((a, i) => `### Article ${i + 1}. ${a.title}\n` + a.text.join('\n')).join('\n\n') + '\n')
md.push(`## Contact\n- E-mail : ${company.email}\n- Téléphone : ${company.phone}\n- Adresse : ${company.siege}\n- Formulaire : ${pageUrl('/contact')}\n`)
writeFileSync(join(dist, 'llms-full.txt'), md.join('\n'))

// ——— Consignes du chatbot ———
const knowledge = [...Object.entries(data), ['conditions_generales_de_vente', cgv]].filter(([k]) => !['nav', 'tasks', 'demo'].includes(k)).map(([k, v]) => `## ${k}\n${JSON.stringify(v, null, 1)}`).join('\n\n')
mkdirSync(join(dist, 'api'), { recursive: true })
writeFileSync(join(dist, 'api', 'assistant-prompt.txt'), `${assistantRules}\n\nINFORMATIONS SUR AXION STUDIO (source : le site axionstudio.fr)\n\n${knowledge}\n`)

rmSync('dist-server', { recursive: true, force: true })
console.log(`${paths.length} pages pré-rendues, 404.html, sitemap.xml, robots.txt, llms.txt et llms-full.txt générés`)
