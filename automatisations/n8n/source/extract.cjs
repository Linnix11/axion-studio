// Corps du nœud Code « Chercher l'e-mail » (identique dans le workflow), testé ici hors n8n.
// Pas de `URL` : il n'existe pas dans le bac à sable des nœuds Code de n8n.
function chercherEmail(html, site) {
  const origine = (String(site || '').match(/^https?:\/\/[^\/?#]+/i) || [''])[0]
  const domaine = origine.replace(/^https?:\/\/(www\.)?/i, '').replace(/:\d+$/, '').toLowerCase()
  const texte = String(html || '')
    .replace(/&#64;|&#x40;|\[at\]|\(at\)| arobase /gi, '@')
    .replace(/%40/g, '@')
  const trouves = [...new Set((texte.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || []).map(e => e.toLowerCase()))]
    .filter(e => !/\.(png|jpe?g|gif|svg|webp|css|js)$/.test(e))          // noms d'images du type logo@2x.png
    .filter(e => !/(sentry|wixpress|example|exemple|domain|votre|email@|nom@|user@)/.test(e))
  const generique = /^(contact|info|infos|accueil|bonjour|hello|devis|commercial|secretariat|administration|agence|atelier)@/
  const score = e => (domaine && e.endsWith('@' + domaine) ? 2 : 0) + (generique.test(e) ? 1 : 0)
  const email = trouves.sort((a, b) => score(b) - score(a))[0] || ''
  // Lien vers une page contact ou mentions légales, pour un second essai si rien n'est trouvé
  const lien = (String(html || '').match(/href=["']([^"'#]*(contact|mentions)[^"'#]*)["']/i) || [])[1] || ''
  let lien_contact = ''
  if (lien && !/^(mailto|tel|javascript):/i.test(lien)) {
    if (/^https?:\/\//i.test(lien)) lien_contact = lien
    else if (lien.startsWith('//')) lien_contact = 'https:' + lien
    else if (lien.startsWith('/')) lien_contact = origine + lien
    else lien_contact = String(site).replace(/[^\/]*$/, '') + lien
  }
  return { email, lien_contact }
}
module.exports = chercherEmail
