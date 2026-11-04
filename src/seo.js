// Référencement : titre, description et données structurées (schema.org) de chaque page.
// Utilisé par les pages (onglet du navigateur) ET écrit dans le HTML au build (scripts/prerender-routes.mjs),
// pour Google, Bing et les moteurs de réponse des IA (ChatGPT, Gemini, Perplexity, Claude…).
export const SITE_URL = 'https://axionstudio.fr'
export const BRAND = 'Axion Studio'

export const pageMeta = {
  '/': { title: 'Automatisation et IA pour TPE et PME (Val-d’Oise) | Axion Studio', name: 'Accueil', description: 'Axion Studio automatise les tâches répétitives des TPE, PME et indépendants : workflows, intégration d’outils, IA et sites web. Val-d’Oise et à distance. Audit gratuit.' },
  '/services': { title: 'Automatisation, intégration d’outils, IA et sites web', name: 'Services', description: 'Workflows automatisés, connexion de vos logiciels (CRM, Gmail, Excel…), intelligence artificielle et sites web pour TPE, PME et indépendants. Projets dès 150 €.' },
  '/exemples': { title: 'Exemples d’automatisation pour TPE et indépendants', name: 'Exemples', description: 'Devis, factures, suivi des commandes, relances, reporting : 5 cas concrets d’automatisation pour artisans, cabinets, boutiques en ligne et agences.' },
  '/methode': { title: 'Méthode : audit gratuit, forfait, mise en place, suivi', name: 'Méthode', description: 'Audit gratuit de 30 minutes, proposition au forfait sous 72 h, mise en place testée sur vos données et un mois de suivi inclus.' },
  '/tarifs': { title: 'Tarifs : automatisation et site web dès 150 €', name: 'Tarifs', description: 'Audit offert, projets d’automatisation ou de site web au forfait dès 150 €, suivi mensuel dès 250 € par mois, sans engagement. TVA non applicable.' },
  '/a-propos': { title: 'Arthur Champagne-Forterre, fondateur d’Axion Studio', name: 'À propos', description: 'Arthur Champagne-Forterre, consultant en automatisation et IA basé à Montlignon (Val-d’Oise), aide les petites entreprises à gagner du temps.' },
  '/faq': { title: 'Questions fréquentes sur l’automatisation et l’IA', name: 'FAQ', description: 'Outils utilisés, sécurité des données, délais, prix, maintenance : les réponses aux questions fréquentes sur l’automatisation avec Axion Studio.' },
  '/contact': { title: 'Contact : audit gratuit de 30 minutes', name: 'Contact', description: 'Décrivez la tâche qui vous fait perdre du temps : audit gratuit de 30 minutes, réponse sous 48 heures ouvrées. Montlignon (95), Île-de-France et à distance.' },
  '/securite': { title: 'Sécurité des données et usage de l’IA', name: 'Sécurité et données', description: 'Comptes à votre nom, accès révocables, IA utilisée avec précaution, fin de projet propre : les règles d’Axion Studio pour protéger vos données.' },
  '/mentions-legales': { title: 'Mentions légales', name: 'Mentions légales', description: 'Mentions légales du site axionstudio.fr.' },
  '/confidentialite': { title: 'Politique de confidentialité', name: 'Confidentialité', description: 'Données collectées, durée de conservation, assistant IA, cookies : la politique de confidentialité du site axionstudio.fr.' },
}

export const fullTitle = path => {
  if (path === '/') return pageMeta['/'].title
  const t = pageMeta[path]?.title ?? 'Page introuvable'
  return t.includes(BRAND) ? t : `${t} | ${BRAND}`
}

export const pageUrl = path => `${SITE_URL}${path === '/' ? '/' : path + '/'}`

/** Données structurées JSON-LD d'une page (liste d'objets schema.org). */
export function schemaFor(path, data) {
  const { company, services, offers, faq } = data
  const org = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#entreprise`,
    name: BRAND,
    alternateName: company.tradeName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.svg`,
    image: `${SITE_URL}/og.png`,
    description: 'Automatisation des processus, intelligence artificielle et création de sites web pour les TPE, PME et indépendants.',
    founder: { '@id': `${SITE_URL}/a-propos/#arthur` },
    email: company.email,
    telephone: '+33648612350',
    priceRange: 'À partir de 150 €',
    currenciesAccepted: 'EUR',
    address: { '@type': 'PostalAddress', postalCode: '95680', addressLocality: 'Montlignon', addressRegion: 'Val-d’Oise', addressCountry: 'FR' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Val-d’Oise' },
      { '@type': 'AdministrativeArea', name: 'Île-de-France' },
      { '@type': 'Country', name: 'France' },
    ],
    knowsAbout: ['Automatisation des processus', 'Workflows automatisés', 'Intégration d’outils et API', 'Intelligence artificielle en entreprise', 'n8n', 'Make', 'Zapier', 'Création de sites web'],
    makesOffer: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.short } })),
  }
  const person = {
    '@type': 'Person', '@id': `${SITE_URL}/a-propos/#arthur`, name: company.owner,
    jobTitle: 'Consultant en automatisation et intelligence artificielle', worksFor: { '@id': `${SITE_URL}/#entreprise` },
    address: { '@type': 'PostalAddress', addressLocality: 'Montlignon', postalCode: '95680', addressCountry: 'FR' },
  }
  const website = { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: BRAND, inLanguage: 'fr-FR', publisher: { '@id': `${SITE_URL}/#entreprise` } }
  const out = [org, website]
  if (path !== '/' && pageMeta[path]) {
    out.push({ '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: pageMeta[path].name, item: pageUrl(path) },
    ] })
  }
  if (path === '/faq') out.push({ '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
  if (path === '/services') out.push(...services.map(s => ({
    '@type': 'Service', name: s.title, description: s.intro, serviceType: s.title, provider: { '@id': `${SITE_URL}/#entreprise` },
    areaServed: 'France', url: `${SITE_URL}/services/#${s.slug}`,
    offers: { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: 150, priceCurrency: 'EUR' } },
  })))
  if (path === '/tarifs') out.push({ '@type': 'OfferCatalog', name: 'Formules Axion Studio', itemListElement: offers.map(o => ({
    '@type': 'Offer', name: o.name, description: o.text, priceCurrency: 'EUR',
    ...(o.price === 'Offert' ? { price: 0 } : { priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: parseInt(o.price, 10), priceCurrency: 'EUR', ...(o.name.includes('mensuel') ? { unitText: 'mois' } : {}) } }),
  })) })
  if (path === '/a-propos') out.push(person, { '@type': 'AboutPage', url: pageUrl(path), about: { '@id': `${SITE_URL}/#entreprise` } })
  if (path === '/contact') out.push({ '@type': 'ContactPage', url: pageUrl(path), about: { '@id': `${SITE_URL}/#entreprise` } })
  return { '@context': 'https://schema.org', '@graph': out }
}
