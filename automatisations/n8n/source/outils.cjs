// Corps du nœud Code « Repérer les outils du site » (identique dans le workflow), testé ici hors n8n.
// Repère dans le code de la page les outils visibles publiquement, puis en déduit 1 ou 2 pistes d'automatisation.
function reperer(html) {
  const h = String(html || '').toLowerCase()
  const OUTILS = [
    ['WordPress', /wp-content|wp-includes/], ['Wix', /wixstatic|wix\.com/], ['Shopify', /cdn\.shopify|myshopify/],
    ['Squarespace', /squarespace/], ['Webflow', /website-files\.com|webflow\.js/], ['Jimdo', /jimdo/],
    ['PrestaShop', /prestashop/], ['WooCommerce', /woocommerce/], ['Google Sites', /sites\.google\.com/],
    ['Calendly', /calendly\.com/], ['Doctolib', /doctolib\.fr/], ['Planity', /planity\.com/], ['Resalib', /resalib\.fr/],
    ['Treatwell', /treatwell/], ['Zenchef', /zenchef/], ['TheFork', /thefork|lafourchette/], ['Google Agenda', /calendar\.google\.com|calendar\.app\.google/],
    ['HubSpot', /hs-scripts|hubspot/], ['Brevo', /sendinblue|brevo\.com|sibforms/], ['Mailchimp', /mailchimp|list-manage\.com/],
    ['Stripe', /js\.stripe\.com/], ['PayPal', /paypal\.com/], ['SumUp', /sumup/],
    ['Crisp', /crisp\.chat/], ['Tawk.to', /tawk\.to/], ['Intercom', /intercom/], ['Zendesk', /zdassets|zendesk/], ['WhatsApp', /wa\.me\/|api\.whatsapp\.com/],
    ['Typeform', /typeform/], ['Google Forms', /docs\.google\.com\/forms|forms\.gle/], ['Jotform', /jotform/],
  ]
  const outils = OUTILS.filter(([, re]) => re.test(h)).map(([nom]) => nom)
  const a = noms => noms.filter(n => outils.includes(n))
  const rdv = a(['Calendly', 'Doctolib', 'Planity', 'Resalib', 'Treatwell', 'Zenchef', 'TheFork', 'Google Agenda'])
  const crm = a(['HubSpot', 'Brevo', 'Mailchimp'])
  const chat = a(['Crisp', 'Tawk.to', 'Intercom', 'Zendesk', 'WhatsApp'])
  const boutique = a(['Shopify', 'WooCommerce', 'PrestaShop']).length > 0 || /ajouter au panier|add to cart/.test(h)
  const formulaire = /<form[\s>]/.test(h.replace(/<form[^>]*(search|recherche)[^>]*>/g, '')) || a(['Typeform', 'Google Forms', 'Jotform']).length > 0
  const devis = /demande de devis|devis gratuit|devis en ligne|demander un devis/.test(h)
  if (formulaire) outils.push('formulaire de contact')

  const pistes = []
  if (boutique) pistes.push('mettre à jour commandes, stock et suivi client automatiquement')
  if (devis) pistes.push('préparer automatiquement les demandes de devis reçues par le site')
  if (rdv.length) pistes.push(`relier les rendez-vous pris sur ${rdv[0]} au fichier client et aux rappels`)
  if (formulaire && !crm.length && !devis) pistes.push('faire arriver les demandes du formulaire directement dans un fichier client')
  if (chat.length) pistes.push('répondre automatiquement aux questions les plus fréquentes')
  if (!formulaire && !rdv.length && !boutique) pistes.push('ajouter un formulaire ou une prise de rendez-vous en ligne reliés à vos outils')
  return { outils: outils.join(', '), pistes: pistes.slice(0, 2).join(' ; ') }
}
module.exports = reperer
