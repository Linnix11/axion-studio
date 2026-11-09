// Génère les bannières LinkedIn et Google Business d'Axion Studio (HTML → PNG, dimensions exactes et @2x).
// Style « le temps rendu » (charte v2) : fond gris bleuté, cartes blanches, surligneur pour le temps gagné,
// hachures pour ce qui est automatisé.
// Usage : node marketing/banners/generate.mjs   (Playwright requis)
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const { chromium } = createRequire(import.meta.url)('playwright')
const root = resolve('.')
const OUT = join(root, 'marketing/banners')
const font = f => `file://${join(root, 'node_modules', f)}`
const C = { page: '#f3f5f9', card: '#ffffff', ink: '#14213d', muted: '#56627d', rule: '#d9e0ec', pen: '#2b5ce6', marker: '#ffe45c', hatch: '#c3cde0' }

const logo = (h, chevron = C.ink) => `<svg viewBox="0 0 210 175" height="${h}" aria-hidden="true"><g stroke="${C.pen}" stroke-width="9" stroke-linecap="round"><line x1="66" y1="25" x2="23" y2="81"/><line x1="23" y1="81" x2="128" y2="81"/><line x1="128" y1="81" x2="68" y2="150"/></g><g fill="${C.pen}"><circle cx="66" cy="25" r="18"/><circle cx="23" cy="81" r="18"/><circle cx="128" cy="81" r="18"/><circle cx="68" cy="150" r="18"/></g><path d="M95 22H148L190 86L148 152H95" fill="none" stroke="${chevron}" stroke-width="18" stroke-linejoin="round"/></svg>`

// Semaine type de l'accueil du site, en libellés courts (lisibles en petit) : [jour, [libellé, minutes, automatisé]]
const WEEK = [
  ['Lun', [['Client', 0, false], ['Commandes', 45, true]]],
  ['Mar', [['Chantier', 0, false], ['Relances', 30, true]]],
  ['Mer', [['E-mails', 60, true]]],
  ['Jeu', [['Devis', 0, false], ['Factures', 35, false]]],
  ['Ven', [['Chantier', 0, false], ['Agenda', 20, false]]],
]
/** Carte « Temps rendu chaque semaine », mise à l'échelle par sa taille de police (em). */
const week = (size, width) => `<div class="card" style="font-size:${size}px;width:${width}px;padding:1.1em 1.2em 1.2em">
  <p class="muted" style="font-size:.85em">Temps rendu chaque semaine</p>
  <p class="h" style="font-size:3.1em;margin-top:.12em;line-height:1.1"><span class="mark">2 h 15</span></p>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:.4em;margin-top:.9em;align-items:start">
    ${WEEK.map(([day, blocks]) => `<div style="display:grid;gap:.4em">
      <p class="day">${day}</p>
      ${blocks.map(([label, min, auto]) => `<p class="blk${auto ? ' hatch' : ''}" style="min-height:${min ? 1.5 + min / 22 : 2.6}em">${auto ? `<s>${label}</s>` : label}</p>`).join('')}
    </div>`).join('')}
  </div>
</div>`

const base = (w, h, body) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face{font-family:BG;src:url(${font('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2')});font-weight:200 800;font-stretch:75% 100%}
@font-face{font-family:HG;src:url(${font('@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2')});font-weight:100 900}
*{box-sizing:border-box;margin:0}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{font-family:HG,Arial,sans-serif;color:${C.ink};background:${C.page};position:relative}
.brand{display:flex;align-items:center;gap:.45em;font-weight:600;letter-spacing:-.01em}
.h{font-family:BG,'Arial Narrow',sans-serif;font-weight:700;font-stretch:85%;letter-spacing:-.02em;line-height:1.02;text-wrap:balance}
.lead{color:${C.muted};line-height:1.45}
.muted{color:${C.muted}}
.eyebrow{color:${C.pen};font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.mark{background:${C.marker};color:${C.ink};padding:0 .14em;border-radius:.14em}
.card{background:${C.card};border:1px solid ${C.rule};border-radius:18px}
.day{font-size:.72em;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${C.muted};text-align:center}
.blk{font-size:.78em;line-height:1.25;padding:.45em .5em;border:1px solid ${C.rule};border-radius:.6em;background:${C.page}}
.hatch{background:repeating-linear-gradient(-45deg,transparent 0 6px,${C.hatch} 6px 7px),${C.card};color:${C.muted}}
.hatch s{text-decoration-color:${C.pen};text-decoration-thickness:1.5px}
.pill{display:inline-flex;align-items:center;background:${C.pen};color:#fff;border-radius:999px;font-weight:600}
.abs{position:absolute}
</style></head><body>${body}</body></html>`

const banners = [
  { // Profil LinkedIn : la photo recouvre le coin inférieur gauche → rien d'important à gauche de 440 px
    name: 'linkedin-profil-1584x396', w: 1584, h: 396,
    html: base(1584, 396, `
      <div class="abs" style="left:470px;top:70px;width:660px">
        <p class="eyebrow" style="font-size:17px">Automatisation pour TPE, PME et indépendants</p>
        <p class="h" style="font-size:62px;margin-top:16px">Vos tâches répétitives,<br>faites sans vous.</p>
        <div class="brand" style="font-size:26px;margin-top:30px">${logo(34)}Axion Studio <span class="muted" style="font-weight:400;margin-left:.4em">axionstudio.fr</span></div>
      </div>
      <div class="abs" style="right:50px;top:50px">${week(15, 400)}</div>`),
  },
  { // Couverture de page LinkedIn : bandeau très fin, recadré sur mobile → contenu centré
    name: 'linkedin-page-1128x191', w: 1128, h: 191,
    html: base(1128, 191, `
      <div class="abs" style="inset:0;display:flex;align-items:center;justify-content:center;gap:40px">
        <p class="h" style="font-size:46px">Vos tâches répétitives, <span class="mark">faites sans vous.</span></p>
        <p style="font-size:21px;font-weight:600;color:${C.pen};white-space:nowrap">axionstudio.fr</p>
      </div>`),
  },
  { // Publication LinkedIn : dernier article du blog
    name: 'linkedin-publication-article-1200x627', w: 1200, h: 627,
    html: base(1200, 627, `
      <div class="abs card" style="left:56px;top:56px;right:56px;bottom:56px;padding:58px 64px">
        <p class="eyebrow" style="font-size:19px">Nouvel article · Blog Axion Studio</p>
        <p class="h" style="font-size:70px;margin-top:20px;max-width:900px">Combien coûte l’automatisation pour une petite entreprise ?</p>
        <p class="lead" style="font-size:26px;margin-top:24px;max-width:860px">Ce qui fait varier le prix, les coûts à prévoir et une méthode simple pour savoir si c’est rentable.</p>
        <div class="abs brand" style="left:64px;bottom:48px;font-size:26px">${logo(34)}Axion Studio</div>
        <p class="abs" style="right:64px;bottom:52px;font-size:23px;color:${C.pen};font-weight:600">axionstudio.fr/blog</p>
      </div>`),
  },
  { // Couverture Google Business : Google recadre selon l'écran → contenu au centre
    name: 'google-couverture-1024x576', w: 1024, h: 576,
    html: base(1024, 576, `
      <div class="abs" style="inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 130px">
        <div class="brand" style="font-size:28px">${logo(38)}Axion Studio</div>
        <p class="h" style="font-size:66px;margin-top:22px">Vos tâches répétitives, faites sans vous.</p>
        <p class="lead" style="font-size:23px;margin-top:18px;text-wrap:balance">Automatisation et IA pour TPE, PME et indépendants, Val-d’Oise et à distance</p>
        <p style="font-size:22px;margin-top:26px"><span class="mark" style="font-weight:700">2 h 15</span> rendues chaque semaine, en moyenne indicative</p>
      </div>`),
  },
  { // Logo carré Google Business
    name: 'google-logo-720x720', w: 720, h: 720,
    html: `<!doctype html><html><head><style>html,body{margin:0;width:720px;height:720px;background:#fff;display:flex;align-items:center;justify-content:center}</style></head><body>${logo(430)}</body></html>`,
  },
  { // Publication Google Business : offre d'audit
    name: 'google-publication-audit-1200x900', w: 1200, h: 900,
    html: base(1200, 900, `
      <div class="abs" style="left:90px;top:96px;width:560px">
        <div class="brand" style="font-size:28px">${logo(38)}Axion Studio</div>
        <p class="h" style="font-size:96px;margin-top:40px">Audit <span class="mark">gratuit</span> de 30 minutes</p>
        <p class="lead" style="font-size:28px;margin-top:28px">On repère ensemble les tâches répétitives qui vous coûtent du temps, et ce qui peut être automatisé.</p>
        <p style="font-size:24px;margin-top:30px;line-height:1.7">Sans engagement<br>Projets dès 150 €<br>Réponse sous 48 h ouvrées</p>
      </div>
      <div class="abs" style="right:80px;top:200px">${week(17, 440)}</div>
      <p class="abs pill" style="left:90px;bottom:90px;font-size:28px;padding:20px 34px">Réserver sur axionstudio.fr/contact</p>`),
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
