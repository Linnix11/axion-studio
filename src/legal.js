// Conditions générales de vente (CGV) d'Axion Studio.
// MODÈLE À FAIRE RELIRE par un professionnel du droit avant de s'y fier pleinement.
// Les valeurs à adapter sont regroupées ci-dessous ; le texte des articles les reprend automatiquement.

export const cgvSettings = {
  version: '4\u00a0novembre 2026',
  depositPercent: 30,        // acompte à la commande (%)
  paymentDays: 30,           // délai de paiement des factures (jours, 60 maximum en B2B)
  quoteValidityDays: 30,     // durée de validité d'une proposition (jours)
  acceptanceDays: 8,         // délai de validation de la livraison (jours)
  terminationNoticeDays: 15, // délai de mise en demeure avant résiliation (jours)
}

const s = cgvSettings

// Chaque article : un titre et des paragraphes ; une ligne commençant par « - » devient un élément de liste.
export const cgv = [
  {
    title: 'Objet et champ d’application',
    text: [
      'Les présentes conditions générales de vente (CGV) s’appliquent à toutes les prestations réalisées par Axion Studio, nom commercial d’Arthur Champagne-Forterre, entrepreneur individuel (micro-entreprise), dont le siège est situé 5 allée des Pommiers, 95680 Montlignon, ci-après « Axion Studio », pour le compte de ses clients professionnels, ci-après « le Client ».',
      'Les prestations concernées sont : l’audit, la conception et la mise en place d’automatisations, l’intégration d’outils, l’intégration de solutions d’intelligence artificielle, la création de sites web et le suivi mensuel.',
      'Les prestations s’adressent aux professionnels (entreprises, indépendants, associations dans le cadre de leur activité). Toute commande implique l’acceptation sans réserve des présentes CGV, qui prévalent sur tout autre document du Client, sauf accord écrit contraire.',
    ],
  },
  {
    title: 'Audit, proposition et commande',
    text: [
      'L’audit initial de 30 minutes est gratuit et sans engagement.',
      `À l’issue de l’audit, Axion Studio adresse au Client une proposition écrite précisant les prestations, les outils utilisés, le délai prévisionnel et le prix au forfait. Cette proposition est valable ${s.quoteValidityDays} jours.`,
      `La commande est ferme dès l’acceptation écrite de la proposition par le Client (signature ou e-mail) et le versement de l’acompte prévu à l’article « Modalités de paiement ».`,
      'Toute prestation non prévue dans la proposition acceptée fait l’objet d’une proposition complémentaire.',
    ],
  },
  {
    title: 'Prix',
    text: [
      'Les prix sont exprimés en euros, au forfait, pour le périmètre décrit dans la proposition. TVA non applicable, article 293 B du Code général des impôts.',
      'Les abonnements aux outils et services tiers nécessaires (par exemple outil d’automatisation, service d’intelligence artificielle, hébergement, nom de domaine) sont souscrits au nom du Client et restent à sa charge. Leur coût estimé est indiqué dans la proposition.',
    ],
  },
  {
    title: 'Modalités de paiement',
    text: [
      `Projets au forfait : un acompte de ${s.depositPercent} % est versé à la commande ; le solde est facturé à la livraison.`,
      'Suivi mensuel : facturé chaque mois, en début de période.',
      `Les factures sont payables par virement bancaire dans un délai de ${s.paymentDays} jours à compter de leur date d’émission. Aucun escompte n’est accordé en cas de paiement anticipé.`,
    ],
  },
  {
    title: 'Retard de paiement',
    text: [
      'Tout retard de paiement entraîne de plein droit, sans rappel préalable :',
      '- des pénalités de retard calculées au taux égal à trois fois le taux d’intérêt légal en vigueur, sur les sommes dues ;',
      '- une indemnité forfaitaire pour frais de recouvrement de 40 €, conformément aux articles L441-10 et D441-5 du Code de commerce.',
      'Après une mise en demeure restée sans effet, Axion Studio peut suspendre l’exécution des prestations en cours jusqu’au paiement complet.',
    ],
  },
  {
    title: 'Exécution des prestations et collaboration du Client',
    text: [
      'Axion Studio s’engage à exécuter les prestations avec soin, conformément aux règles de l’art. Il s’agit d’une obligation de moyens.',
      'Les délais indiqués dans la proposition sont donnés à titre indicatif. Ils dépendent notamment de la disponibilité des accès et des informations fournies par le Client.',
      'Le Client s’engage à fournir dans les délais les accès nécessaires, des exemples de données représentatifs pour les tests, et à désigner un interlocuteur disponible pour valider chaque étape.',
    ],
  },
  {
    title: 'Livraison et validation',
    text: [
      'Avant toute mise en production, chaque automatisation est testée avec le Client sur des cas réels. La livraison intervient après validation par le Client.',
      `À défaut de réserve écrite et motivée du Client dans un délai de ${s.acceptanceDays} jours suivant la livraison, celle-ci est réputée acceptée.`,
    ],
  },
  {
    title: 'Suivi inclus et suivi mensuel',
    text: [
      'Chaque projet comprend un mois de suivi à compter de la livraison : correction des anomalies et ajustements dans le périmètre de la proposition, sans frais supplémentaires.',
      'Le suivi mensuel est sans engagement de durée. Il peut être résilié à tout moment par e-mail ; la résiliation prend effet à la fin du mois en cours.',
      'Les évolutions hors du périmètre initial font l’objet d’une proposition distincte.',
    ],
  },
  {
    title: 'Propriété des livrables',
    text: [
      'Sous réserve du paiement complet du prix, le Client devient propriétaire des automatisations, configurations, documents et contenus réalisés spécifiquement pour lui, et peut les utiliser, les modifier et les faire évoluer librement.',
      'Les outils et services tiers restent soumis à leurs propres conditions d’utilisation. Axion Studio conserve son savoir-faire général, ses méthodes et ses éléments génériques non spécifiques au Client.',
      'Axion Studio ne cite le Client comme référence qu’avec son accord écrit.',
    ],
  },
  {
    title: 'Comptes, accès et confidentialité',
    text: [
      'Les comptes des outils utilisés sont ouverts au nom du Client. Les accès confiés à Axion Studio sont limités au besoin de la mission et peuvent être retirés à tout moment par le Client.',
      'À la fin de la mission, Axion Studio remet la documentation, supprime ses accès et efface les données de test.',
      'Axion Studio s’engage à garder confidentielles les informations et données dont il a connaissance pendant la mission, et à ne pas les utiliser à d’autres fins.',
    ],
  },
  {
    title: 'Données personnelles',
    text: [
      'Lorsque la mission conduit Axion Studio à traiter des données personnelles pour le compte du Client, Axion Studio agit en qualité de sous-traitant au sens de l’article 28 du Règlement général sur la protection des données (RGPD) : il ne traite ces données que sur instruction du Client, en assure la sécurité et la confidentialité, et les supprime en fin de mission. Un accord de sous-traitance peut être signé sur demande.',
      'Les données des visiteurs du site sont traitées conformément à la politique de confidentialité, disponible sur la page /confidentialite.',
    ],
  },
  {
    title: 'Responsabilité',
    text: [
      'La responsabilité d’Axion Studio est limitée aux dommages directs et prouvés, et plafonnée au montant payé par le Client pour la prestation concernée.',
      'Axion Studio ne peut être tenu responsable des dommages indirects (perte de chiffre d’affaires, de clientèle ou de données), ni des interruptions, modifications ou défaillances des services tiers (outils d’automatisation, services d’IA, hébergeurs, interfaces de programmation), ni des conséquences d’informations inexactes fournies par le Client.',
      'Le Client reste responsable de la vérification des contenus produits avec l’aide de l’intelligence artificielle avant leur envoi à des tiers.',
    ],
  },
  {
    title: 'Force majeure',
    text: [
      'Aucune des parties ne pourra être tenue responsable d’un manquement résultant d’un cas de force majeure au sens de l’article 1218 du Code civil. Les obligations concernées sont suspendues pendant la durée de l’événement.',
    ],
  },
  {
    title: 'Résiliation',
    text: [
      `En cas de manquement grave de l’une des parties à ses obligations, non réparé dans un délai de ${s.terminationNoticeDays} jours après une mise en demeure par lettre recommandée ou e-mail avec accusé de réception, l’autre partie peut résilier la commande.`,
      'Les prestations réalisées jusqu’à la date de résiliation restent dues.',
    ],
  },
  {
    title: 'Droit applicable et litiges',
    text: [
      'Les présentes CGV sont soumises au droit français.',
      'En cas de différend, les parties recherchent d’abord une solution amiable. À défaut, le litige est porté devant la juridiction compétente selon les règles de droit commun.',
    ],
  },
]
