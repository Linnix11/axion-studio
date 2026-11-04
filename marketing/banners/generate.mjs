// Génère les bannières LinkedIn et Google Business d'Axion Studio (HTML → PNG, dimensions exactes et @2x).
// Usage : node marketing/banners/generate.mjs   (Playwright requis)
import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const { chromium } = createRequire(import.meta.url)('playwright')
const root = resolve('.')
const OUT = join(root, 'marketing/banners')
const font = f => `file://${join(root, 'node_modules', f)}`
const C = { paper: '#ffffff', paper2: '#f3f6fc', ink: '#14213d', muted: '#56627d', pen: '#2b5ce6', marker: '#ffe45c', margin: 'rgba(217,61,99,.75)', seyes: 'rgba(35,70,200,.13)', seyesL: 'rgba(35,70,200,.055)' }

const logo = (h, chevron = C.ink) => `<svg viewBox="0 0 210 175" height="${h}" aria-hidden="true"><g stroke="${C.pen}" stroke-width="9" stroke-linecap="round"><line x1="66" y1="25" x2="23" y2="81"/><line x1="23" y1="81" x2="128" y2="81"/><line x1="128" y1="81" x2="68" y2="150"/></g><g fill="${C.pen}"><circle cx="66" cy="25" r="18"/><circle cx="23" cy="81" r="18"/><circle cx="128" cy="81" r="18"/><circle cx="68" cy="150" r="18"/></g><path d="M95 22H148L190 86L148 152H95" fill="none" stroke="${chevron}" stroke-width="18" stroke-linejoin="round"/></svg>`

const base = (w, h, body, { grid = 32, marginX = null } = {}) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face{font-family:SG;src:url(${font('@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:SS;src:url(${font('@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:SS;font-style:italic;src:url(${font('@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-italic.woff2')});font-weight:100 900}
*{box-sizing:border-box;margin:0}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{font-family:SG,Arial,sans-serif;color:${C.ink};background:${C.paper};position:relative;
background-image:linear-gradient(${C.seyes} 1px,transparent 1px),linear-gradient(90deg,${C.seyes} 1px,transparent 1px),linear-gradient(${C.seyesL} 1px,transparent 1px);
background-size:${grid}px ${grid}px,${grid}px ${grid}px,${grid}px ${grid / 4}px;background-position:-1px -1px}
${marginX !== null ? `.margin{position:absolute;top:0;bottom:0;left:${marginX}px;width:3px;background:${C.margin}}` : ''}
.brand{display:flex;align-items:center;gap:.45em;font-weight:600;letter-spacing:-.01em}
.h{font-weight:600;letter-spacing:-.03em;line-height:1.02;text-wrap:balance}
.serif{font-family:SS,Georgia,serif;color:${C.muted}}
.note{font-family:SS,Georgia,serif;font-style:italic;color:${C.pen}}
.mark{background:${C.marker};padding:0 .18em;border-radius:3px}
.pill{display:inline-flex;align-items:center;background:${C.pen};color:#fff;border-radius:10px;font-weight:600}
.abs{position:absolute}
</style></head><body>${marginX !== null ? '<div class="margin"></div>' : ''}${body}</body></html>`

const banners = [
  { // Profil LinkedIn : la photo recouvre ~ le quart inférieur gauche → contenu à droite de 430 px
    name: 'linkedin-profil-1584x396', w: 1584, h: 396,
    html: base(1584, 396, `
      <div class="abs" style="left:470px;top:62px;right:90px">
        <div class="brand" style="font-size:30px">${logo(40)}Axion Studio</div>
        <p class="h" style="font-size:58px;margin-top:22px;white-space:nowrap">Vos tâches répétitives, faites sans vous.</p>
        <p class="serif" style="font-size:26px;margin-top:16px">Automatisation, IA et sites web pour les TPE, PME et indépendants</p>
      </div>
      <p class="abs note" style="right:90px;bottom:36px;font-size:24px">axionstudio.fr <span style="color:${C.ink};font-style:normal;font-family:SG">— audit gratuit de 30 min</span></p>`, { marginX: 430 }),
  },
  { // Couverture de page LinkedIn : bandeau très fin, recadré sur mobile → contenu centré
    name: 'linkedin-page-1128x191', w: 1128, h: 191,
    html: base(1128, 191, `
      <div class="abs" style="left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;gap:38px">
        <p class="h" style="font-size:40px">Vos tâches répétitives, <span class="mark">faites sans vous.</span></p>
        <p class="note" style="font-size:22px;white-space:nowrap">axionstudio.fr</p>
      </div>`, { grid: 24 }),
  },
  { // Publication LinkedIn : dernier article du blog
    name: 'linkedin-publication-article-1200x627', w: 1200, h: 627,
    html: base(1200, 627, `
      <div class="abs" style="left:200px;top:70px;right:80px">
        <p class="note" style="font-size:26px">Nouvel article · Blog Axion Studio</p>
        <p class="h" style="font-size:66px;margin-top:22px">Combien coûte l’automatisation pour une petite entreprise ?</p>
        <p class="serif" style="font-size:28px;margin-top:24px">Ce qui fait varier le prix, les coûts à prévoir et une méthode simple pour savoir si c’est rentable.</p>
      </div>
      <div class="abs brand" style="left:200px;bottom:56px;font-size:28px">${logo(38)}Axion Studio</div>
      <p class="abs" style="right:80px;bottom:62px;font-size:24px;color:${C.pen};font-weight:600">axionstudio.fr/blog</p>`, { marginX: 150 }),
  },
  { // Couverture Google Business : Google recadre selon l'écran → contenu dans le centre
    name: 'google-couverture-1024x576', w: 1024, h: 576,
    html: base(1024, 576, `
      <div class="abs" style="left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 120px">
        <div class="brand" style="font-size:30px">${logo(42)}Axion Studio</div>
        <p class="h" style="font-size:56px;margin-top:22px">Vos tâches répétitives, faites sans vous.</p>
        <p class="serif" style="font-size:23px;margin-top:18px;text-wrap:balance">Automatisation et IA pour TPE, PME et indépendants, Val-d’Oise et à distance</p>
      </div>`),
  },
  { // Logo carré Google Business
    name: 'google-logo-720x720', w: 720, h: 720,
    html: `<!doctype html><html><head><style>html,body{margin:0;width:720px;height:720px;background:#fff;display:flex;align-items:center;justify-content:center}</style></head><body>${logo(430)}</body></html>`,
  },
  { // Publication Google Business : offre
    name: 'google-publication-audit-1200x900', w: 1200, h: 900,
    html: base(1200, 900, `
      <div class="abs" style="left:200px;top:110px;right:100px">
        <div class="brand" style="font-size:32px">${logo(46)}Axion Studio</div>
        <p class="h" style="font-size:84px;margin-top:40px">Audit <span class="mark">gratuit</span><br>de 30 minutes</p>
        <p class="serif" style="font-size:32px;margin-top:30px;line-height:1.45">On repère ensemble les tâches répétitives qui vous coûtent du temps, et ce qui peut être automatisé.</p>
        <p style="font-size:28px;margin-top:34px;line-height:1.6">Sans engagement · Projets dès 150 € · Réponse sous 48 h ouvrées</p>
      </div>
      <p class="abs pill" style="left:200px;bottom:100px;font-size:30px;padding:18px 30px">Réserver sur axionstudio.fr/contact</p>`, { marginX: 150 }),
  },
]

const b = await chromium.launch()
for (const x of banners) {
  writeFileSync(join(OUT, `${x.name}.html`), x.html)
  for (const scale of [1, 2]) {
    const p = await b.newPage({ viewport: { width: x.w, height: x.h }, deviceScaleFactor: scale })
    await p.goto(`file://${join(OUT, x.name + '.html')}`)
    await p.evaluate(() => document.fonts.ready)
    await p.screenshot({ path: join(OUT, `${x.name}${scale === 2 ? '@2x' : ''}.png`) })
    await p.close()
  }
  console.log('✓', x.name)
}
await b.close()
