// BROUILLON, non publié : article prévu pour le 5 janvier 2027. Le site ne lit pas ce fichier.
// Pour le publier : copier le bloc ci-dessous en tête du tableau `posts` de src/blog.js, ajouter
// 'collecte-justificatifs-expert-comptable' au champ `articles` de la page experts-comptables (src/data.js),
// puis `npm run build`.
// À revérifier le jour de la publication (vérifié le 16 nov. 2026) :
// - L102 B du Livre des procédures fiscales affiche bien dix ans sur Légifrance (version au 1er janvier 2027) ;
// - le calendrier fiscal 2027 sur impots.gouv.fr : s'il est publié, on peut remplacer « au printemps » par la date ;
// - la phrase au futur sur la facture électronique (« une partie des pièces arrivera en données structurées ») ;
// - les pages CNIL et de l'Ordre citées sont toujours en ligne ; les prix (150 €, 250 € par mois) dans src/data.js.

export const brouillon =
  {
    slug: 'collecte-justificatifs-expert-comptable',
    seoTitle: 'Expert-comptable : collecte des justificatifs',
    seoDescription: 'Liste des pièces attendues, relance graduée qui ne cite que ce qui manque, dépôt simple, appel du collaborateur : automatiser la collecte des justificatifs.',
    title: 'Expert-comptable : automatiser la collecte des justificatifs clients',
    description: 'Comment un cabinet comptable obtient à temps les pièces de ses clients : liste par dossier, relance graduée, dépôt simple, tableau de suivi, appel.',
    date: '2027-01-05',
    category: 'Organisation',
    lead: 'Pour automatiser la collecte des justificatifs, un cabinet d’expertise comptable tient pour chaque dossier la liste des pièces attendues, puis envoie à chaque client des rappels espacés qui ne citent que ce qui manque encore, avec un seul endroit simple où déposer ses documents. Un tableau montre chaque semaine les dossiers complets et incomplets, et quand les rappels ne suffisent plus, c’est le collaborateur qui appelle. L’automatisation se charge des envois et du pointage ; le cabinet garde le contrôle des pièces, la relation avec le client et les cas particuliers.',
    body: [
      { p: 'En janvier, dans beaucoup de cabinets, la même scène se répète : beaucoup de clients à relancer pour leurs relevés bancaires, leurs factures d’achat ou leurs notes de frais, des e-mails écrits un par un, des pièces qui arrivent par trois canaux différents, et la question permanente « est-ce que celui-là m’a déjà envoyé son relevé de décembre ? ».' },
      { p: 'Cet article s’adresse aux cabinets d’expertise comptable de petite taille, mais aussi aux dirigeants qui reçoivent ces relances. Il porte sur des documents à obtenir, pas sur de l’argent à récupérer : pas de pénalités ni de mise en demeure ici. Si c’est le recouvrement qui vous occupe, lisez plutôt [relances de factures impayées](/blog/relances-factures-impayees/).' },

      { p: 'Pourquoi la collecte prend-elle autant de temps ? Le travail n’est pas difficile, il est répétitif et dispersé. Les mêmes difficultés reviennent d’un cabinet à l’autre :' },
      { ul: [
        'chaque client a sa propre liste de pièces, selon son activité, sa banque, ses emprunts ou ses salariés ;',
        'les pièces arrivent par e-mail, par le portail du cabinet, par une application, sur papier, parfois par message sur un téléphone ;',
        'personne ne sait d’un coup d’œil ce qui manque encore pour un dossier : il faut ouvrir la boîte mail, le dossier partagé et ses notes ;',
        'les relances s’écrivent à la main, une par une, et partent quand le collaborateur a le temps, donc souvent tard ;',
        'au printemps, les relances se superposent à la production des comptes, au moment où le temps manque le plus.',
      ] },
      { p: 'Tout cela a une même cause : l’information « ce qui est attendu » et l’information « ce qui est arrivé » ne sont pas au même endroit. Une fois qu’elles le sont, la relance devient une simple soustraction.' },

      { h2: 'Partir d’une liste des pièces attendues, dossier par dossier' },
      { p: 'Tout commence par une liste écrite, pour chaque client, des pièces attendues sur la période. Voici un exemple type pour une petite société commerciale, à adapter à chaque dossier :' },
      { ul: [
        'les relevés de chaque compte bancaire, mois par mois ;',
        'les factures d’achat et de frais, et les factures de vente si elles ne sont pas émises depuis un logiciel relié au cabinet ;',
        'les notes de frais et leurs justificatifs ;',
        'les contrats et tableaux d’amortissement des emprunts, et les contrats de crédit-bail ;',
        'pour la clôture : l’état des stocks, la liste des clients et fournisseurs restant à payer, les immobilisations achetées ou vendues dans l’année.',
      ] },
      { p: 'Cette liste n’a pas besoin d’être inventée : la lettre de mission en donne déjà le cadre. D’après l’Ordre des experts-comptables, elle est établie avant le début des travaux et précise notamment les obligations de chaque partie, les délais d’exécution et, le cas échéant, un tableau de répartition des tâches entre le client et le cabinet. Ce tableau est un bon point de départ pour dire, noir sur blanc, quelles pièces le client fournit et à quel rythme.' },
      { p: 'Une fois la liste rangée dans un tableur ou dans l’outil du cabinet, chaque pièce reçue est cochée, à la main ou automatiquement quand elle est reconnue à l’arrivée. Ce qui reste non coché, c’est ce qui manque.' },

      { h2: 'La relance graduée, étape par étape' },
      { p: 'Voici un circuit possible, présenté comme un exemple type et non comme le récit d’un client. Les délais sont à régler selon vos habitudes et la période :' },
      { ol: [
        'Au début du mois, chaque client reçoit un message court : la liste de ses pièces attendues pour le mois écoulé, et le lien vers l’endroit où les déposer.',
        'Au fil des jours, chaque pièce reçue est rapprochée de la liste. Le client qui a tout envoyé reçoit un simple accusé de réception, et plus aucun rappel.',
        'Une semaine plus tard, ceux à qui il manque encore quelque chose reçoivent un rappel qui ne cite que les pièces manquantes, pas toute la liste.',
        'Une semaine après, un second rappel, plus court, propose de l’aide : « Si une pièce vous pose problème, répondez à ce message ou appelez-nous. »',
        'Si rien n’a bougé, plus aucun message automatique ne part : le dossier passe dans la liste « à appeler » du collaborateur, avec l’historique des envois et ce qui manque.',
      ] },
      { note: 'Un rappel automatique doit toujours être juste. Avant chaque envoi, l’outil revérifie ce qui est arrivé depuis la veille, par toutes les voies prévues. Un client relancé pour une pièce qu’il a déposée la veille perd confiance dans tous les rappels suivants.' },
      { p: 'Le ton reste le même du début à la fin : poli, précis, sans menace. On ne relance pas une dette mais un partenaire qui a d’autres priorités. Ce qui change d’une étape à l’autre, c’est la longueur du message et le canal, jusqu’à la voix du collaborateur.' },

      { h2: 'Côté client : un seul endroit où déposer ses pièces' },
      { p: 'Pour le dirigeant qui reçoit ces relances, la question est simple : où envoyer, et sous quelle forme ? Plus la réponse est courte, plus les pièces arrivent vite. Un bon dépôt :' },
      { ul: [
        'tient dans un seul lien, toujours le même, accessible depuis un téléphone ;',
        'accepte une photo, un PDF ou un transfert d’e-mail, sans demander de renommer les fichiers ;',
        'confirme ce qui a été reçu, pour que le client sache qu’il n’a rien à renvoyer ;',
        'n’oblige pas à créer un compte de plus quand le cabinet en propose déjà un.',
      ] },
      { p: 'Ces pièces contiennent des informations sensibles : relevés bancaires, salaires, noms de clients. La CNIL déconseille de transmettre des fichiers contenant des données personnelles en clair par des messageries ou plateformes grand public, et recommande, pour un dépôt de fichiers, de limiter la durée de mise à disposition et l’accès aux seuls destinataires autorisés. Si vous comptez faire lire ces pièces par une IA, voyez aussi les [règles pour utiliser l’IA avec des données clients](/blog/ia-donnees-clients-regles/). Mes propres précautions sur chaque projet sont décrites sur la page [sécurité et données](/securite/).' },

      { h2: 'Le tableau des dossiers, et ce qui reste au collaborateur' },
      { p: 'Chaque lundi, le collaborateur reçoit un tableau simple, qui remplace les recherches dans la boîte mail :' },
      { ul: [
        'les dossiers complets, prêts à être traités ;',
        'les dossiers incomplets, avec pour chacun la liste des pièces manquantes et la date du dernier rappel ;',
        'les dossiers à appeler, où les rappels automatiques n’ont rien donné ;',
        'les pièces arrivées mais non reconnues, à rattacher à la main.',
      ] },
      { p: 'Pour les clients dont l’exercice se clôt le 31 décembre, les déclarations annuelles se préparent au printemps : ce tableau aide à voir tôt quels dossiers risquent de manquer de pièces. Les dates limites de 2027 sont à consulter dans le calendrier fiscal de l’espace professionnel, sur impots.gouv.fr.' },

      { p: 'L’automatisation fait les envois et le pointage. Le reste demande un jugement que l’outil n’a pas :' },
      { ul: [
        'l’appel quand les rappels ne suffisent plus : un client qui ne répond pas a souvent une raison (absence, difficulté, changement de banque) qu’un message ne fera pas sortir ;',
        'les exceptions : un client en congé, une entreprise en difficulté, un dossier où l’on suspend les rappels pour une période ;',
        'la vérification que la pièce reçue est la bonne : un relevé du mauvais mois, une facture illisible, un devis envoyé à la place d’une facture ;',
        'la mise à jour de la liste quand l’activité du client change : nouveau compte bancaire, nouvel emprunt, premier salarié ;',
        'la relation : c’est le collaborateur qui connaît le client et qui décide du ton, pas le circuit.',
      ] },

      { h2: 'Les erreurs classiques' },
      { ul: [
        'Relancer pour une pièce déjà reçue, parce que l’outil ne regarde qu’un canal (le portail) alors que le client a répondu par e-mail.',
        'Renvoyer toute la liste à chaque rappel, au lieu des seules pièces qui manquent : le client ne sait plus ce qu’il a déjà fait.',
        'Monter le ton à chaque étape, comme pour un impayé. Le client n’est pas en faute, il est occupé ; un message sec abîme la relation sans faire arriver la pièce plus vite.',
        'Relancer trop souvent, ou tous les clients le même jour à la même heure, ce qui déclenche une vague de réponses et d’appels que le cabinet ne peut pas absorber.',
        'Laisser les pièces arriver n’importe où : messagerie personnelle d’un collaborateur, message sur téléphone, clé USB. Elles se perdent, et leur sécurité n’est plus assurée.',
        'Écrire dans le jargon du cabinet. « Merci de nous transmettre vos justificatifs de charges du T4 » est moins clair que « il nous manque vos factures d’achat d’octobre à décembre ».',
      ] },

      { h2: 'Combien de temps garder les pièces' },
      { p: 'Une fois obtenues, les pièces doivent être conservées. Deux textes fixent les durées :' },
      { ul: [
        'le Code de commerce : les documents comptables et les pièces justificatives sont conservés pendant dix ans (article L123-22) ;',
        'le Livre des procédures fiscales : les livres, registres, documents et pièces sur lesquels l’administration peut exercer ses droits de communication, d’enquête et de contrôle sont conservés pendant dix ans à compter de la dernière opération mentionnée ou de la date d’établissement des documents (article L102 B). Ce délai était de six ans ; l’article 36 de la loi n° 2026-534 du 25 juin 2026 relative à la lutte contre les fraudes sociales et fiscales l’a porté à dix ans pour les documents et pièces dont le délai de conservation expire après le 1er janvier 2027. En pratique, les pièces établies après le 1er janvier 2021 se gardent dix ans.',
      ] },
      { p: 'Pour un circuit automatisé, cela veut dire des dossiers rangés par client et par exercice, une copie de sauvegarde, et des copies intermédiaires (pièces jointes en transit, fichiers temporaires) supprimées dès qu’elles ne servent plus. Avec la facture électronique, une partie des pièces arrivera en données structurées plutôt qu’en PDF ; je ne réexplique pas la réforme ici, tout est dans [facture électronique 2026-2027](/blog/facture-electronique-tpe-2026-2027/).' },

      { h2: 'Par où commencer' },
      { ol: [
        'Choisissez un petit groupe de dossiers, par exemple ceux d’un même collaborateur, plutôt que tout le cabinet d’un coup.',
        'Écrivez pour chacun la liste des pièces attendues, en partant de la lettre de mission.',
        'Fixez un seul endroit de dépôt et dites-le clairement aux clients concernés.',
        'Rédigez une fois pour toutes les messages de chaque étape, relus par le collaborateur qui suit ces dossiers.',
        'Mesurez pendant un mois ou deux le temps passé à relancer, avant et après, relecture comprise. Si vous préférez déléguer la construction, je relie vos outils actuels (messagerie, dossier partagé, tableur, logiciel de production) et je teste le circuit sur vos vrais dossiers. Les projets démarrent à partir de 150 €, et un suivi facultatif est proposé à partir de 250 € par mois.',
      ] },

      { p: 'Pour aller plus loin : les autres tâches que j’automatise pour les cabinets sont détaillées sur la page [automatisation pour les cabinets d’expertise comptable](/automatisation/experts-comptables/). Une fois la pièce arrivée, la suite du traitement (lecture, renommage, classement) est expliquée dans [lire ses factures fournisseurs avec l’IA](/blog/lire-factures-fournisseurs-ia/). Vous voulez voir ce que cela donnerait avec vos dossiers ? [Écrivez-moi](/contact/) : nous regardons votre circuit actuel pendant l’audit gratuit de 30 minutes.' },
      { p: 'Sources : Légifrance, [Code de commerce, article L123-22](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006219327), [Livre des procédures fiscales, article L102 B](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054566874) et [article 36 de la loi n° 2026-534 du 25 juin 2026](https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000054309787) ; entreprendre.service-public.gouv.fr, [lutte contre les fraudes sociales et fiscales](https://entreprendre.service-public.gouv.fr/actualites/A18906) ; Ordre des experts-comptables Pays de la Loire, [exigez une lettre de mission](https://www.paysdelaloire.experts-comptables.fr/entreprises-et-associations/les-relations-avec-votre-expert-comptable-2/exigez-une-lettre-de-mission/) ; CNIL, [sécuriser les échanges avec l’extérieur](https://www.cnil.fr/fr/securite-securiser-les-echanges-avec-dautres-organismes) ; impots.gouv.fr, [calendrier fiscal des professionnels](https://www.impots.gouv.fr/professionnel/calendrier-fiscal).' },
    ],
    faq: [
      { q: 'Peut-on automatiser la relance des pièces comptables ?', a: 'Oui, pour l’essentiel : l’envoi de la liste des pièces attendues, les rappels qui ne citent que ce qui manque, l’accusé de réception et le tableau des dossiers incomplets. L’appel au client quand les rappels ne suffisent plus, la vérification des pièces et les exceptions restent au collaborateur.' },
      { q: 'À quelle fréquence relancer un client pour ses justificatifs ?', a: 'Il n’y a pas de règle officielle. Un rythme possible : un premier envoi en début de mois, puis un rappel par semaine, deux au plus, avant un appel du collaborateur. L’important est de ne relancer que pour ce qui manque vraiment.' },
      { q: 'Comment le client doit-il envoyer ses pièces au cabinet ?', a: 'Par un seul canal, fixé par le cabinet : un portail ou un lien de dépôt sécurisé plutôt qu’une messagerie grand public. La CNIL déconseille de transmettre en clair des fichiers contenant des données personnelles par des messageries ou plateformes grand public.' },
      { q: 'Combien de temps conserver les pièces justificatives ?', a: 'Dix ans au titre du Code de commerce (article L123-22). Côté fiscal, l’article L102 B du Livre des procédures fiscales fixait six ans ; la loi du 25 juin 2026 porte ce délai à dix ans pour les documents dont le délai de conservation expire après le 1er janvier 2027.' },
    ],
  }
