// Contenu de la page « Agence n8n » (/agence-n8n) et de la FAQ des tarifs.
// Les textes passent par typo() au chargement : espaces insécables avant : ; ? ! » et après «.

const typo = v => typeof v === 'string'
  ? v.replace(/ :/g, ' :').replace(/ ([;?!»])/g, ' $1').replace(/« /g, '« ').replace(/ €/g, ' €')
  : Array.isArray(v) ? v.map(typo)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, typo(x)]))
  : v

export const n8n = typo({
  title: 'Agence n8n pour TPE et PME',
  seoTitle: 'Agence n8n : workflows et automatisation',
  description: 'Création, hébergement et maintenance de workflows n8n pour TPE et PME en France : intégrations, IA, prospection, facturation. Audit gratuit, projets dès 150 €.',
  intro: 'Je conçois, j’installe et je maintiens des workflows n8n pour les TPE et PME : vos logiciels reliés entre eux, les tâches répétitives faites sans vous, et de l’IA là où elle est utile. Axion Studio est un studio indépendant : vous travaillez directement avec la personne qui construit vos workflows.',
  pourquoi: [
    { titre: 'Vos données chez vous', texte: 'n8n peut être installé sur votre propre serveur. Vos données clients ne transitent pas par une plateforme tierce, ce qui simplifie le RGPD.' },
    { titre: 'Un coût qui ne grimpe pas avec le volume', texte: 'Auto-hébergé, n8n ne facture pas chaque exécution. Pour des workflows qui tournent souvent, l’écart avec les outils payés à la tâche devient vite important.' },
    { titre: 'Des centaines d’intégrations', texte: 'Gmail, Outlook, Google Sheets, CRM, logiciels de facturation, bases de données, et n’importe quelle API quand un connecteur manque.' },
    { titre: 'L’IA intégrée', texte: 'n8n sait appeler les grands modèles d’IA pour lire un document, classer une demande ou rédiger un brouillon, au milieu d’un workflow classique.' },
  ],
  prestations: [
    'Audit de vos processus et choix des workflows qui rapportent le plus de temps',
    'Installation de n8n : n8n Cloud, ou auto-hébergement sur un serveur à votre nom',
    'Création des workflows, testés sur vos données réelles',
    'Connexion de vos logiciels par leurs API, y compris quand aucun connecteur n’existe',
    'Ajout d’étapes d’IA (lecture de documents, tri, brouillons de réponses)',
    'Documentation en mots simples et passation : tout reste à votre nom',
    'Surveillance, corrections et évolutions avec le suivi mensuel',
  ],
  exemples: [
    { titre: 'Prospection B2B', texte: 'Le workflow que j’utilise pour Axion Studio : recherche d’entreprises dans l’annuaire public SIRENE (en respectant l’opposition à la prospection), enrichissement par Google Places, repérage des outils visibles sur leur site, puis brouillons d’e-mails personnalisés par l’IA, à relire avant envoi.' },
    { titre: 'Demandes de devis', texte: 'Chaque demande reçue par le site ou par e-mail crée une fiche client, prépare un brouillon de devis et vous prévient sur votre téléphone.' },
    { titre: 'Factures fournisseurs', texte: 'Les factures reçues par e-mail sont lues, renommées, rangées dans le bon dossier et reportées dans un tableau de suivi.' },
    { titre: 'Relances', texte: 'Factures impayées et devis sans réponse sont relancés à date fixe, et les relances s’arrêtent dès le paiement ou la signature.' },
  ],
  faq: [
    { q: 'Qu’est-ce que n8n ?', a: 'n8n est un outil d’automatisation qui relie vos logiciels entre eux par des workflows visuels. Il peut être utilisé en version hébergée (n8n Cloud) ou installé sur votre propre serveur.' },
    { q: 'n8n, Make ou Zapier : lequel choisir ?', a: 'n8n convient bien quand les volumes sont importants, quand les données doivent rester chez vous ou quand il faut des traitements sur mesure. Make et Zapier sont plus simples à prendre en main pour de petits besoins. Je vous recommande l’outil le plus simple à maintenir pour votre cas.' },
    { q: 'Combien coûte un projet n8n ?', a: 'Les projets démarrent à 150 € au forfait, prix exact fixé après l’audit gratuit. L’hébergement de n8n (n8n Cloud ou serveur) reste à votre nom et à votre charge ; son coût est indiqué dans la proposition.' },
    { q: 'Pouvez-vous reprendre des workflows n8n existants ?', a: 'Oui : audit des workflows en place, corrections, mise à jour de version et documentation, puis suivi si vous le souhaitez.' },
    { q: 'Mes workflows m’appartiennent-ils ?', a: 'Oui. Ils tournent sur votre compte ou votre serveur, avec vos accès. Vous pouvez les exporter, les modifier ou changer de prestataire à tout moment.' },
  ],
})

export const tarifsFaq = typo([
  { q: 'Combien coûte une automatisation pour une TPE ?', a: 'Les projets démarrent à 150 € au forfait. Le prix dépend de ce qui est à construire : nombre d’outils à relier, étapes d’IA, volume de données, cas particuliers. Il est fixé après l’audit gratuit, avant de commencer.' },
  { q: 'Pourquoi un forfait plutôt qu’un tarif horaire ?', a: 'Pour que vous connaissiez le prix exact avant de vous engager. Si la construction prend plus de temps que prévu, c’est pour moi, pas pour vous.' },
  { q: 'Comment se passe le paiement ?', a: 'Un acompte de 30 % à la commande, le solde à la livraison, par virement, payable sous 30 jours. Le détail est dans les conditions générales de vente.' },
  { q: 'Quels coûts prévoir en plus ?', a: 'Les abonnements aux outils (n8n, Make, Zapier, API d’IA, hébergement) sont à votre nom et à votre charge. Beaucoup ont une offre gratuite ou peu chère pour démarrer ; leur coût est indiqué dans la proposition.' },
  { q: 'Le suivi mensuel est-il obligatoire ?', a: 'Non. Un mois de suivi est inclus dans chaque projet. Ensuite, le suivi à partir de 250 € par mois est sans engagement, ou vous pouvez me solliciter ponctuellement.' },
  { q: 'Comment savoir si c’est rentable ?', a: 'L’audit gratuit sert à ça : on estime le temps passé chaque semaine sur la tâche et le temps rendu. Si le gain ne justifie pas le prix, je vous le dis.' },
])

// FAQ de la page Contact. Les liens s'écrivent [texte](/chemin/) ; ils sont retirés dans les données structurées.
export const contactFaq = typo([
  { q: 'L’audit est-il vraiment gratuit ?', a: 'Oui. Il dure 30 minutes et ne vous engage à rien. Si rien chez vous ne vaut la peine d’être automatisé, je vous le dis.' },
  { q: 'Que préparer avant l’audit ?', a: 'Rien d’obligatoire. Pour gagner du temps : la liste des tâches qui reviennent chaque semaine, les logiciels que vous utilisez et une idée du temps qu’elles vous prennent.' },
  { q: 'Travaillez-vous hors d’Île-de-France ?', a: 'Oui. L’audit et la mise en place se font à distance, partout en France. Les prestations sont réservées aux professionnels : entreprises, indépendants, professions libérales et associations.' },
  { q: 'Que deviennent les informations de ce formulaire ?', a: 'Elles servent uniquement à répondre à votre demande et, si vous le souhaitez, à préparer une proposition. Elles ne sont pas enregistrées sur ce site. Le détail est dans la [politique de confidentialité](/confidentialite/), et mes règles pour les données de vos projets sur la page [sécurité et données](/securite/).' },
])

/** Retire la syntaxe [texte](/chemin/) pour ne garder que le texte. */
export const sansLiens = t => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
