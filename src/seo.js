// Référencement : titre, description et données structurées (schema.org) de chaque page.
// Utilisé par les pages (onglet du navigateur) ET écrit dans le HTML au build (scripts/prerender-routes.mjs),
// pour Google, Bing et les moteurs de réponse des IA (ChatGPT, Gemini, Perplexity, Claude…).
import { posts, wordCount } from './blog.js'
import { metiers } from './data.js'

export const SITE_URL = 'https://axionstudio.fr'
export const BRAND = 'Axion Studio'

export const pageMeta = {
  '/': { title: 'Automatisation IA pour TPE et PME en France | Axion Studio', name: 'Accueil', description: 'Axion Studio automatise les tâches répétitives des TPE, PME et indépendants en France : workflows, outils connectés, IA, sites web. Audit gratuit.' },
  '/services': { title: 'Automatisation, IA et sites web', name: 'Services', description: 'Workflows automatisés, connexion de vos logiciels (CRM, Gmail, Excel…), intelligence artificielle et sites web pour TPE, PME et indépendants. Projets dès 150 €.' },
  '/exemples': { title: 'Exemples d’automatisation pour TPE', name: 'Exemples', description: 'Devis, factures, suivi des commandes, relances, reporting : 5 cas concrets d’automatisation pour artisans, cabinets, boutiques en ligne et agences.' },
  '/methode': { title: 'Méthode : audit gratuit, forfait, suivi', name: 'Méthode', description: 'Audit gratuit de 30 minutes, proposition au forfait sous 72 h, mise en place testée sur vos données et un mois de suivi inclus.' },
  '/tarifs': { title: 'Tarifs : automatisation et site web dès 150 €', name: 'Tarifs', description: 'Audit offert, projets d’automatisation ou de site web au forfait dès 150 €, suivi mensuel dès 250 € par mois, sans engagement. TVA non applicable.' },
  '/a-propos': { title: 'Arthur Champagne-Forterre, fondateur d’Axion Studio', name: 'À propos', description: 'Arthur Champagne-Forterre, consultant en automatisation et IA basé à Montlignon (Val-d’Oise), aide les petites entreprises à gagner du temps.' },
  '/faq': { title: 'FAQ : automatisation et IA', name: 'FAQ', description: 'Outils utilisés, sécurité des données, délais, prix, maintenance : les réponses aux questions fréquentes sur l’automatisation avec Axion Studio.' },
  '/contact': { title: 'Contact : audit gratuit de 30 minutes', name: 'Contact', description: 'Décrivez la tâche qui vous fait perdre du temps : audit gratuit de 30 minutes, réponse sous 24 heures ouvrées. Montlignon (95) et à distance partout en France.' },
  '/securite': { title: 'Sécurité des données et usage de l’IA', name: 'Sécurité et données', description: 'Comptes à votre nom, accès révocables, IA utilisée avec précaution, fin de projet propre : les règles d’Axion Studio pour protéger vos données.' },
  '/blog': { title: 'Blog : automatisation et IA', name: 'Blog', description: 'Conseils concrets pour gagner du temps : tâches à automatiser, choix des outils (n8n, Make, Zapier) et usage de l’IA sans risque pour vos données.' },
  ...Object.fromEntries(posts.map(p => [`/blog/${p.slug}`, { title: p.seoTitle || p.title, name: p.title, description: p.seoDescription || p.description, post: p }])),
  ...Object.fromEntries(metiers.map(m => [`/automatisation/${m.slug}`, { title: m.seoTitle, name: m.nom, description: m.description, metier: m }])),
  '/cgv': { title: 'Conditions générales de vente', name: 'CGV', description: 'Conditions générales de vente d’Axion Studio : commande, prix au forfait, paiement, livraison, propriété des livrables, responsabilité et données.' },
  '/mentions-legales': { title: 'Mentions légales', name: 'Mentions légales', description: 'Mentions légales du site axionstudio.fr : éditeur, statut de micro-entreprise, hébergeur et contact d’Axion Studio.' },
  '/confidentialite': { title: 'Politique de confidentialité', name: 'Confidentialité', description: 'Données collectées, durée de conservation, assistant IA, cookies : la politique de confidentialité du site axionstudio.fr.' },
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
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og.png`,
    description: 'Automatisation des processus, intelligence artificielle et création de sites web pour les TPE, PME et indépendants.',
    founder: { '@id': `${SITE_URL}/a-propos/#arthur` },
    email: company.email,
    telephone: '+33648612350',
    priceRange: 'À partir de 150 €',
    currenciesAccepted: 'EUR',
    address: { '@type': 'PostalAddress', streetAddress: '5 allée des Pommiers', postalCode: '95680', addressLocality: 'Montlignon', addressRegion: 'Val-d’Oise', addressCountry: 'FR' },
    geo: { '@type': 'GeoCoordinates', latitude: 49.008, longitude: 2.291 },   // centre de Montlignon
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', telephone: '+33648612350', email: company.email, areaServed: 'FR', availableLanguage: 'French' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Val-d’Oise' },
      { '@type': 'AdministrativeArea', name: 'Île-de-France' },
      { '@type': 'Country', name: 'France' },
    ],
    knowsAbout: ['Automatisation des processus', 'Workflows automatisés', 'Intégration d’outils et API', 'Intelligence artificielle en entreprise', 'n8n', 'Make', 'Zapier', 'Création de sites web'],
    makesOffer: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.short } })),
    ...(company.profils?.length ? { sameAs: company.profils } : {}),
  }
  const person = {
    '@type': 'Person', '@id': `${SITE_URL}/a-propos/#arthur`, name: company.owner,
    jobTitle: 'Consultant en automatisation et intelligence artificielle', worksFor: { '@id': `${SITE_URL}/#entreprise` }, knowsLanguage: 'fr',
    address: { '@type': 'PostalAddress', addressLocality: 'Montlignon', postalCode: '95680', addressCountry: 'FR' },
  }
  const website = { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: BRAND, inLanguage: 'fr-FR', publisher: { '@id': `${SITE_URL}/#entreprise` } }
  const out = [org, website]
  const post = pageMeta[path]?.post
  const metier = pageMeta[path]?.metier
  if (path !== '/' && pageMeta[path]) {
    const crumbs = [{ name: 'Accueil', item: `${SITE_URL}/` }]
    if (post) crumbs.push({ name: 'Blog', item: pageUrl('/blog') })
    if (metier) crumbs.push({ name: 'Services', item: pageUrl('/services') })
    crumbs.push({ name: pageMeta[path].name, item: pageUrl(path) })
    out.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, ...c })) })
  }
  if (path === '/blog') out.push({ '@type': 'Blog', '@id': `${pageUrl('/blog')}#blog`, name: 'Blog Axion Studio', url: pageUrl('/blog'), inLanguage: 'fr-FR', publisher: { '@id': `${SITE_URL}/#entreprise` },
    blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: pageUrl(`/blog/${p.slug}`), datePublished: p.date })) })
  if (post) out.push({
    '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.date, dateModified: post.updated || post.date,
    inLanguage: 'fr-FR', articleSection: post.category, wordCount: wordCount(post), image: `${SITE_URL}/og.png`,
    mainEntityOfPage: pageUrl(path), url: pageUrl(path), isPartOf: { '@id': `${pageUrl('/blog')}#blog` },
    author: { '@type': 'Person', '@id': `${SITE_URL}/a-propos/#arthur`, name: data.company.owner, url: pageUrl('/a-propos') },
    publisher: { '@id': `${SITE_URL}/#entreprise` },
  })
  if (post?.faq?.length) out.push({ '@type': 'FAQPage', mainEntity: post.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
  if (metier) out.push({
    '@type': 'Service', name: metier.title, description: metier.probleme, serviceType: 'Automatisation des tâches administratives',
    provider: { '@id': `${SITE_URL}/#entreprise` }, areaServed: { '@type': 'Country', name: 'France' }, url: pageUrl(path),
    audience: { '@type': 'BusinessAudience', audienceType: metier.cible },
    hasOfferCatalog: { '@type': 'OfferCatalog', name: `Automatisations pour ${metier.nom.toLowerCase()}`, itemListElement: metier.taches.map(t => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: t.titre, description: t.texte } })) },
    offers: { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: 150, priceCurrency: 'EUR' } },
  }, { '@type': 'FAQPage', mainEntity: metier.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
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
