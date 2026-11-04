// Toutes les informations de l'entreprise et les textes du site sont centralisés ici.
export const company = {
  brand: 'Axion Studio',
  tradeName: 'axionstudio',
  owner: 'Arthur Champagne-Forterre',
  email: 'arthur.champagne@icloud.com',
  phone: '06 48 61 23 50',
  phoneHref: '+33648612350',
  city: 'Montlignon (95)',
  siege: '95680 Montlignon, France',
  domain: 'axionstudio.fr',
  siret: "En cours d'attribution",
  host: 'GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis (GitHub Pages)',
}

export const nav = [
  { to: '/services', label: 'Services' },
  { to: '/exemples', label: 'Exemples' },
  { to: '/methode', label: 'Méthode' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/faq', label: 'FAQ' },
]

export const services = [
  {
    slug: 'workflows',
    title: 'Workflows automatisés',
    short: 'Relances, facturation, reporting, saisie de données : des workflows qui tournent seuls, 24 h/24.',
    intro: "Les tâches que vous refaites chaque semaine à l'identique sont les premières à automatiser. Je conçois des enchaînements qui se déclenchent seuls : à la réception d'un e-mail, d'un formulaire, d'une commande ou à heure fixe.",
    includes: [
      'Cartographie de la tâche telle que vous la faites aujourd’hui',
      'Conception et construction du workflow',
      'Gestion des erreurs : vous êtes prévenu si quelque chose bloque',
      'Tests sur vos vraies données avant la mise en route',
      'Documentation simple pour comprendre et modifier',
    ],
    examples: ['Relance automatique des factures impayées à J+7 et J+15', 'Création des commandes dans le tableur à partir des e-mails reçus', 'Envoi du récapitulatif hebdomadaire des ventes'],
  },
  {
    slug: 'integrations',
    title: "Intégration d'outils",
    short: 'CRM, tableur, messagerie, agenda, facturation : vos logiciels connectés via leurs API.',
    intro: "Vous utilisez déjà de bons outils, mais ils ne se parlent pas : vous recopiez donc les mêmes informations à plusieurs endroits. Je les relie pour qu'une donnée saisie une fois soit à jour partout.",
    includes: [
      'Inventaire de vos outils et des données qui circulent',
      'Connexion via les API ou les intégrations natives',
      'Synchronisation dans un sens ou dans les deux',
      'Contrôle des doublons et des données manquantes',
    ],
    examples: ['Un nouveau client dans le CRM crée sa fiche dans l’outil de facturation', 'Les rendez-vous pris en ligne arrivent dans l’agenda partagé', 'Les paiements reçus mettent à jour le tableau de trésorerie'],
  },
  {
    slug: 'ia',
    title: 'Intelligence artificielle',
    short: "Tri d'e-mails, extraction de documents, assistants internes, réponses clients assistées.",
    intro: "L'IA est utile là où une tâche demande de lire et de comprendre un texte : trier, résumer, extraire, rédiger un premier jet. Je l'intègre dans vos workflows, avec une validation humaine quand c'est nécessaire.",
    includes: [
      'Choix du bon usage : là où l’IA fait vraiment gagner du temps',
      'Extraction de données depuis des PDF, e-mails ou formulaires',
      'Brouillons de réponses que vous relisez avant envoi',
      'Assistant interne qui répond à partir de vos propres documents',
      'Attention portée à la confidentialité des données envoyées',
    ],
    examples: ['Lecture des factures fournisseurs et report des montants', 'Classement des e-mails entrants par type de demande', 'Brouillon de réponse aux questions récurrentes des clients'],
  },
  {
    slug: 'sites-web',
    title: 'Sites web',
    short: 'Sites vitrines rapides et clairs, reliés directement à vos automatisations.',
    intro: "Un site vitrine sert à être trouvé et contacté. Je réalise des sites rapides, lisibles sur mobile et faciles à mettre à jour, dont les formulaires alimentent directement vos outils.",
    includes: [
      'Structure des pages et rédaction avec vous',
      'Design sur mesure, adapté au mobile',
      'Formulaire de contact relié à votre CRM ou à votre messagerie',
      'Mise en ligne, nom de domaine et mentions légales',
    ],
    examples: ['Site vitrine de 4 à 8 pages', 'Page de prise de rendez-vous reliée à l’agenda', 'Formulaire de devis qui crée le contact dans le CRM'],
  },
]

export const tools = ['n8n', 'Make', 'Zapier', 'Google Workspace', 'Microsoft 365', 'Notion', 'Airtable', 'HubSpot', 'Pipedrive', 'Brevo', 'Stripe', 'API OpenAI et Anthropic']

export const useCases = [
  { sector: 'Artisan du bâtiment', task: 'Demandes de devis', before: 'Les demandes arrivent par le site, par e-mail et par téléphone. Vous les recopiez dans un carnet, puis rédigez chaque devis de zéro.', after: 'Chaque demande crée une fiche client, un brouillon de devis est préparé à partir de vos tarifs et vous êtes prévenu sur votre téléphone.', gain: '2 à 3 h par semaine' },
  { sector: 'Cabinet de conseil', task: 'Factures fournisseurs', before: 'Les PDF s’accumulent dans la boîte mail et sont classés à la main en fin de mois, avant d’être envoyés au comptable.', after: 'Chaque facture est lue, renommée, rangée dans le bon dossier et ses montants sont reportés dans le tableau de suivi partagé avec le comptable.', gain: '1 à 2 h par semaine' },
  { sector: 'Boutique en ligne', task: 'Suivi des commandes', before: 'Vous exportez les commandes, mettez à jour le stock dans un tableur et répondez aux clients qui demandent où en est leur colis.', after: 'Le stock se met à jour à chaque vente, le client reçoit son numéro de suivi automatiquement et vous recevez une alerte quand un produit passe sous le seuil.', gain: '3 à 4 h par semaine' },
  { sector: 'Agence immobilière', task: 'Qualification des contacts', before: 'Les demandes des portails d’annonces arrivent en vrac, et il faut les trier et rappeler chaque contact pour connaître son projet.', after: 'Chaque demande est classée (achat, location, estimation), un e-mail de bienvenue pose les premières questions et le contact arrive qualifié dans le CRM.', gain: '2 h par semaine' },
  { sector: 'Indépendant', task: 'Reporting et relances', before: 'Le lundi matin, vous assemblez les chiffres de trois outils et relancez les factures en retard une par une.', after: 'Le récapitulatif arrive seul dans votre boîte mail et les relances partent automatiquement, avec un ton que vous avez choisi.', gain: '1 h 30 par semaine' },
]

export const steps = [
  { title: 'Audit', duration: '30 min offertes', text: 'On repère ensemble les tâches qui vous coûtent le plus de temps.', detail: "Un appel en visio ou par téléphone. Vous me décrivez votre semaine type et vos outils. Je vous dis ce qui peut être automatisé, ce qui ne vaut pas la peine de l'être, et dans quel ordre." },
  { title: 'Proposition', duration: 'sous 72 h', text: 'Une solution chiffrée, avec le temps gagné estimé, sans engagement.', detail: 'Vous recevez un document clair : ce qui sera construit, avec quels outils, le prix au forfait, le délai et une estimation du temps gagné. Vous décidez ensuite, sans relance insistante.' },
  { title: 'Mise en place', duration: '1 à 4 semaines', text: 'Construction, tests sur vos vraies données, puis mise en production.', detail: "Je construis l'automatisation, je la teste sur des cas réels avec vous, puis je la mets en route. Vous suivez l'avancement et validez chaque étape avant qu'elle touche vos clients." },
  { title: 'Suivi', duration: '1 mois inclus', text: 'Prise en main, documentation et ajustements pour que tout reste fiable.', detail: "Je vous montre comment tout fonctionne et vous remets une documentation simple. Pendant un mois, j'ajuste ce qui doit l'être. Ensuite, vous êtes autonome ou vous choisissez un suivi mensuel." },
]

export const commitments = [
  { title: 'Vous restez propriétaire', text: 'Les automatisations sont créées sur vos comptes et vous appartiennent. Rien ne s’arrête si nous cessons de travailler ensemble.' },
  { title: 'Pas de boîte noire', text: 'Chaque workflow est documenté en français, avec des mots simples, pour que vous ou quelqu’un d’autre puissiez le reprendre.' },
  { title: 'Vos outils d’abord', text: 'Je pars de ce que vous utilisez déjà. Je ne propose un nouvel outil que s’il apporte un vrai gain.' },
  { title: 'Un prix fixé à l’avance', text: 'Chaque projet est chiffré au forfait. Pas de facturation à l’heure qui dérape.' },
]

export const offers = [
  { name: 'Audit', price: 'Offert', unit: '30 minutes', text: 'Pour savoir ce qui peut être automatisé chez vous et par quoi commencer.', items: ['Appel en visio ou par téléphone', 'Liste des tâches automatisables', 'Ordre de priorité conseillé'], cta: 'Réserver l’audit' },
  { name: 'Projet', price: 'Sur devis', unit: 'au forfait', text: 'Pour une automatisation, une intégration ou un site web, livré clés en main.', items: ['Proposition détaillée sous 72 h', 'Construction et tests sur vos données', 'Documentation et 1 mois de suivi inclus'], cta: 'Demander un devis', featured: true },
  { name: 'Suivi mensuel', price: 'Sur devis', unit: 'par mois, sans engagement', text: 'Pour faire évoluer vos automatisations et en ajouter au fil de l’eau.', items: ['Surveillance et correction des workflows', 'Petites évolutions incluses', 'Un point mensuel sur les prochaines tâches à automatiser'], cta: 'En parler' },
]

export const faq = [
  { q: 'Je ne suis pas à l’aise avec la technique, est-ce un problème ?', a: 'Non. Vous me décrivez votre travail avec vos mots, je m’occupe de la partie technique. Je vous explique ensuite le fonctionnement simplement, et la documentation est écrite pour être lue par quelqu’un qui n’est pas développeur.' },
  { q: 'Quels outils utilisez-vous ?', a: 'Je pars des vôtres. Pour relier et automatiser, j’utilise selon les cas n8n, Make ou Zapier, et les API des logiciels que vous utilisez. Je vous recommande la solution la plus simple à maintenir pour votre situation.' },
  { q: 'Que deviennent mes données ?', a: 'Les automatisations tournent sur vos comptes. Avant d’utiliser un service d’IA, je vérifie avec vous quelles données lui sont envoyées et je privilégie les options qui n’utilisent pas vos données pour entraîner leurs modèles. Rien n’est conservé de mon côté au-delà du projet.' },
  { q: 'Combien de temps faut-il pour mettre en place une automatisation ?', a: 'Une automatisation simple est en place en une à deux semaines. Un projet qui relie plusieurs outils ou intègre de l’IA demande généralement trois à quatre semaines, tests compris.' },
  { q: 'Que se passe-t-il si une automatisation tombe en panne ?', a: 'Chaque workflow prévient en cas d’erreur. Pendant le mois de suivi inclus, je corrige sans frais. Ensuite, vous pouvez choisir le suivi mensuel ou me solliciter ponctuellement.' },
  { q: 'Travaillez-vous à distance ?', a: 'Oui, la plupart des projets se font entièrement à distance, partout en France. Je me déplace aussi en Île-de-France, notamment dans le Val-d’Oise, quand c’est utile.' },
  { q: 'Combien ça coûte ?', a: 'Chaque projet est chiffré au forfait après l’audit gratuit, en fonction de ce qui est à construire. Vous connaissez le prix exact avant de vous engager. La TVA n’est pas applicable (article 293 B du CGI).' },
]

// Liste interactive de la page d'accueil : durées moyennes indicatives, en minutes par semaine.
export const tasks = [
  { label: 'Recopier les commandes dans le tableur', minutes: 45, preset: true },
  { label: 'Relancer les factures impayées', minutes: 30, preset: true },
  { label: 'Répondre aux mêmes questions par e-mail', minutes: 60, preset: true },
  { label: 'Préparer le reporting du lundi', minutes: 40, preset: false },
  { label: 'Classer les justificatifs et factures', minutes: 35, preset: false },
  { label: 'Saisir les rendez-vous dans l’agenda', minutes: 20, preset: false },
]

export const needs = [
  'Automatisation de processus',
  "Intégration d'outils",
  'Intelligence artificielle',
  'Site web',
  'Je ne sais pas encore',
]
