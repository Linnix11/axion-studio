// Titre et description de chaque page : utilisés par les pages (onglet) ET écrits dans le HTML
// au moment de la construction (scripts/prerender-routes.mjs), pour Google et les aperçus de partage.
export const SITE_URL = 'https://axionstudio.fr'
export const BRAND = 'Axion Studio'

export const pageMeta = {
  '/': { title: 'Axion Studio, automatisation et IA pour les entreprises', description: "Axion Studio automatise le travail administratif des TPE, PME et indépendants : workflows, intégration d’outils, intelligence artificielle et sites web. Audit gratuit." },
  '/services': { title: 'Services', description: "Workflows automatisés, intégration d’outils, intelligence artificielle et sites web pour les TPE, PME et indépendants." },
  '/exemples': { title: 'Exemples', description: "Des cas types d’automatisation pour artisans, cabinets, boutiques en ligne, agences et indépendants." },
  '/methode': { title: 'Méthode', description: 'Audit offert, proposition au forfait sous 72 h, mise en place testée sur vos données et un mois de suivi inclus.' },
  '/tarifs': { title: 'Tarifs', description: 'Audit offert, projets au forfait et suivi mensuel sans engagement. TVA non applicable.' },
  '/a-propos': { title: 'À propos', description: "Arthur Champagne-Forterre, fondateur d’Axion Studio, micro-entreprise d’automatisation et d’IA basée dans le Val-d’Oise." },
  '/faq': { title: 'Questions fréquentes', description: 'Outils, données, délais, prix, maintenance : les réponses aux questions les plus fréquentes.' },
  '/contact': { title: 'Contact', description: 'Contactez Axion Studio pour un audit gratuit de 30 minutes. Réponse sous 48 heures ouvrées.' },
  '/securite': { title: 'Sécurité et données', description: 'Comptes à votre nom, accès révocables, IA utilisée avec précaution : comment Axion Studio protège vos données.' },
  '/mentions-legales': { title: 'Mentions légales', description: 'Mentions légales du site axionstudio.fr.' },
  '/confidentialite': { title: 'Confidentialité', description: 'Politique de confidentialité du site axionstudio.fr.' },
}

export const fullTitle = path => (path === '/' ? pageMeta['/'].title : `${pageMeta[path]?.title ?? 'Page introuvable'} | ${BRAND}`)
