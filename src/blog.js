// Articles du blog. Pour ajouter un article : copiez un bloc ci-dessous, changez le slug (l'adresse),
// la date et le contenu. Il apparaît automatiquement sur /blog, dans le plan du site, dans les données
// structurées (Google) et dans llms-full.txt (IA).
//
// seoTitle / seoDescription (facultatifs) : versions courtes pour Google ; sinon title / description.
//
// Contenu : une liste de blocs.
//   { h2: 'Titre de partie' }
//   { p: 'Paragraphe. Les liens s’écrivent [comme ceci](/contact/).' }
//   { ul: ['élément', 'élément'] }   liste à puces
//   { ol: ['étape', 'étape'] }       liste numérotée
//   { note: 'Encadré à retenir.' }
//
// faq (facultatif) : [{ q: 'Question', a: 'Réponse' }], affichée en fin d'article et reprise en FAQPage (Google, IA).

export const posts = [
  {
    slug: 'n8n-c-est-quoi',
    seoTitle: 'n8n, c’est quoi ? Le guide simple (TPE)',
    seoDescription: 'n8n expliqué simplement : workflows, déclencheurs, Cloud ou auto-hébergé, licence, IA, exemples concrets pour une TPE et limites honnêtes.',
    title: 'n8n, c’est quoi ? L’outil d’automatisation expliqué simplement',
    description: 'Ce qu’est n8n, comment marche un workflow, n8n Cloud ou auto-hébergé, ce que permet sa licence, l’IA, et ce que ça change pour une petite entreprise.',
    date: '2026-11-13',
    category: 'Outils',
    lead: 'n8n est un logiciel qui relie vos outils entre eux (messagerie, tableur, agenda, logiciel de facturation) et enchaîne des tâches à votre place. Chaque automatisation se dessine comme un schéma, appelé workflow : un événement la déclenche, puis les étapes s’exécutent les unes après les autres. n8n s’utilise en ligne (n8n Cloud) ou installé sur un serveur à votre nom, et il sait faire appel à l’intelligence artificielle.',
    body: [
      { p: 'n8n se présente comme une plateforme pour construire des workflows et des agents d’IA, en combinant un éditeur visuel et, si besoin, du code. Pour un dirigeant, la traduction est simple : c’est l’outil qui fait passer une information d’un logiciel à un autre, au bon moment, sans que personne ait à la recopier. Une demande arrive par le site, et elle se retrouve dans votre tableur, dans votre agenda et dans votre boîte mail, sous la forme que vous avez choisie.' },
      { p: 'Il appartient à la même famille que Make et Zapier : des outils d’automatisation « sans code », qui évitent de faire développer un logiciel sur mesure. Ce qui le distingue, c’est surtout la possibilité de l’installer chez vous et sa place faite à l’IA.' },

      { h2: 'Comment fonctionne un workflow n8n' },
      { p: 'La documentation de n8n définit un workflow comme un ensemble de nœuds reliés entre eux pour automatiser un processus. Trois notions suffisent pour tout comprendre :' },
      { ul: [
        'Le déclencheur : c’est le nœud qui lance le workflow quand une condition est remplie. Par exemple un e-mail reçu dans Gmail, un formulaire envoyé, ou une heure fixe (chaque matin à 8 h, chaque lundi).',
        'Les nœuds : chacun fait une étape. Lire un e-mail, ajouter une ligne dans un tableur, créer un contact, envoyer un message. La plupart sont des connecteurs prêts à l’emploi vers un logiciel précis, et n8n en propose plusieurs centaines.',
        'Les connexions : ce sont les flèches qui relient les nœuds et fixent l’ordre des étapes. Des conditions permettent de prendre un chemin ou un autre (par exemple, « si le montant dépasse tel seuil, prévenir le dirigeant »).',
      ] },
      { p: 'Quand un logiciel n’a pas de connecteur, n8n peut quand même lui parler : le nœud HTTP Request interroge n’importe quel service qui dispose d’une API, c’est-à-dire d’une porte d’entrée prévue pour les échanges entre logiciels. C’est ce qui permet de relier un logiciel de facturation ou un outil métier moins connu.' },

      { h2: 'n8n Cloud ou auto-hébergé : deux façons de l’utiliser' },
      { p: 'n8n propose deux modes, et le choix change le coût comme la charge de travail :' },
      { ul: [
        'n8n Cloud : n8n s’occupe des serveurs, vous vous connectez et vous construisez. L’abonnement est calculé sur le nombre d’exécutions de workflows par mois, une exécution étant un lancement complet du workflow, quel que soit son nombre d’étapes. Les données sont stockées dans l’Union européenne, sur des serveurs situés à Francfort.',
        'Auto-hébergé : n8n est installé sur un serveur que vous louez. L’édition Community est gratuite et ne facture pas les exécutions ; vous payez le serveur. En contrepartie, l’installation, les mises à jour, les sauvegardes et la sécurité sont à votre charge, et la documentation de n8n indique qu’elles demandent des compétences techniques.',
      ] },
      { p: 'Il existe aussi des éditions payantes (Business et Enterprise) qui ajoutent surtout des fonctions d’équipe : projets, partage de workflows entre utilisateurs, connexion par authentification unique, suivi des versions avec Git. Une petite entreprise où une seule personne gère les automatisations s’en passe le plus souvent.' },
      { note: 'Les tarifs de n8n Cloud évoluent : consultez toujours la page de prix à jour sur n8n.io avant de choisir. Dans mes propositions, le coût de l’outil est indiqué à part, vérifié au moment du projet, et l’abonnement est souscrit à votre nom.' },

      { h2: 'n8n est-il un logiciel libre ? Ce que dit sa licence' },
      { p: 'Pas au sens strict, et n8n ne se présente pas comme tel. Son code source est public sur GitHub, mais il est publié sous la Sustainable Use License, que n8n qualifie de licence « fair-code ». Le fair-code désigne des logiciels dont le code est ouvert et l’usage généralement gratuit, mais dont l’exploitation commerciale est encadrée par leurs auteurs. n8n explique qu’il ne se dit pas « open source » parce que, pour l’Open Source Initiative, une licence open source ne peut pas limiter l’usage. Certaines fonctions avancées relèvent d’une seconde licence, la n8n Enterprise License, qui demande une clé payante.' },
      { p: 'Concrètement, d’après la foire aux questions de la licence :' },
      { ul: [
        'vous pouvez utiliser n8n gratuitement pour les besoins internes de votre entreprise ;',
        'un prestataire peut être payé pour créer, installer et maintenir vos workflows ;',
        'en revanche, héberger n8n pour le proposer en service à des clients qui y construiraient leurs propres workflows n’est pas permis par cette licence.',
      ] },
      { p: 'C’est aussi pour cela que j’installe n8n sur un compte ou un serveur à votre nom plutôt que de vous donner accès au mien : l’outil reste le vôtre, et vous gardez tout si nous arrêtons de travailler ensemble.' },

      { h2: 'L’intelligence artificielle dans n8n' },
      { p: 'n8n peut appeler les modèles d’IA de plusieurs fournisseurs, comme OpenAI, Anthropic ou Google, et en combiner plusieurs dans un même workflow. Il y a deux grandes façons de s’en servir :' },
      { ul: [
        'Une étape d’IA au milieu d’un workflow classique : lire une pièce jointe, classer une demande par type, résumer un e-mail, rédiger un brouillon de réponse. Le reste du workflow reste prévisible.',
        'Un agent d’IA : le nœud AI Agent relie un modèle d’IA à un ou plusieurs outils (agenda, tableur, base de données) et choisit lui-même lesquels utiliser pour accomplir une tâche.',
      ] },
      { p: 'Pour une petite entreprise, la première façon est souvent la plus utile : l’IA fait une tâche précise, et une personne relit avant que quoi que ce soit parte chez un client. Une IA peut se tromper, et les données envoyées à un service d’IA doivent être choisies avec soin ; les règles à suivre sont dans les [6 règles pour utiliser l’IA avec des données clients](/blog/ia-donnees-clients-regles/).' },

      { h2: 'Ce que ça change pour une TPE : trois exemples' },
      { p: 'Voici trois workflows typiques pour une petite entreprise. Aucun ne demande de changer vos logiciels : n8n se branche sur ceux que vous utilisez déjà.' },
      { ul: [
        'Les demandes de devis : un client remplit le formulaire de votre site. Le workflow crée sa fiche dans votre tableur ou votre CRM, prépare un brouillon de devis à partir de vos tarifs et vous prévient. Vous relisez et vous envoyez. Le détail est dans [automatiser ses devis quand on est artisan](/blog/devis-artisan-automatiser/).',
        'Les relances de factures : chaque matin, à heure fixe, le workflow parcourt vos factures, envoie un rappel aimable avant l’échéance puis les relances prévues, et s’arrête dès que le paiement est enregistré. Voir [relances de factures impayées](/blog/relances-factures-impayees/).',
        'L’agenda : un client réserve un créneau en ligne, le rendez-vous arrive dans votre agenda, un rappel part la veille et un créneau annulé peut être reproposé. Voir [prise de rendez-vous en ligne et rappels](/blog/prise-rendez-vous-en-ligne-rappels/).',
      ] },
      { p: 'Le bénéfice tient moins à une seule tâche qu’à leur addition : moins de recopie, moins d’oublis, des clients qui reçoivent une réponse plus vite. Pour savoir si une automatisation vaut le coup chez vous, la méthode de calcul est dans [combien coûte l’automatisation](/blog/cout-automatisation-petite-entreprise/).' },

      { h2: 'Les limites, honnêtement' },
      { ul: [
        'Pour deux ou trois automatisations simples entre des outils courants, Make ou Zapier suffisent souvent et se prennent en main plus vite. n8n devient intéressant avec des volumes importants, des données à garder chez soi ou de l’IA.',
        'L’auto-hébergement demande de l’entretien : mises à jour, sauvegardes, surveillance du serveur. Si personne ne s’en occupe, mieux vaut n8n Cloud.',
        'Un workflow qui tourne seul doit être surveillé : un logiciel qui change, un accès qui expire, et il s’arrête sans prévenir s’il n’y a pas d’alerte d’erreur.',
        'L’interface est plus technique que celle de Zapier : les cas simples se font sans code, mais les cas avancés demandent de comprendre comment les données circulent d’un nœud à l’autre.',
      ] },
      { note: 'n8n est un outil, pas une solution toute faite. Ce qui fait la valeur d’une automatisation, c’est le choix de la bonne tâche et un workflow testé sur vos vraies données, avec une vérification humaine là où une erreur coûterait cher.' },

      { h2: 'Comment démarrer avec n8n' },
      { ol: [
        'Choisissez une seule tâche, qui revient chaque semaine et suit toujours les mêmes étapes. Les [5 tâches à automatiser en priorité](/blog/taches-a-automatiser-tpe/) donnent des idées.',
        'Listez les logiciels concernés et vérifiez qu’ils ont un connecteur n8n ou une API.',
        'Pour essayer seul, l’essai de n8n Cloud évite toute installation. Commencez par un workflow de deux ou trois nœuds, par exemple un formulaire qui ajoute une ligne dans un tableur.',
        'Avant de vous y fier, ajoutez une alerte en cas d’erreur et gardez une vérification humaine les premières semaines.',
        'Si vous préférez déléguer, je construis le workflow, je le teste sur vos données et je vous le remets documenté. Les projets démarrent à partir de 150 € au forfait, et un suivi facultatif est proposé à partir de 250 € par mois.',
      ] },
      { p: 'Pour aller plus loin : pour un accompagnement de A à Z (audit, installation, création des workflows et suivi), voir la page [agence n8n pour TPE et PME](/agence-n8n/). Vous hésitez entre plusieurs outils ? Le [comparatif n8n, Make et Zapier](/blog/n8n-make-zapier-comparatif/) aide à choisir. Pour des exemples propres à un métier, voir l’[automatisation pour les artisans du bâtiment](/automatisation/artisans-batiment/). Je regarde avec vous si n8n est le bon choix pendant l’[audit gratuit de 30 minutes](/contact/).' },
      { p: 'Sources : [n8n, choisir entre n8n Cloud et l’auto-hébergement](https://docs.n8n.io/choose-how-to-use-n8n), [n8n, comprendre les workflows](https://docs.n8n.io/build/understand-workflows), [n8n, nœuds déclencheurs](https://docs.n8n.io/integrations/builtin/trigger-nodes), [n8n, nœud HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest), [n8n, tarifs et hébergement des données Cloud](https://n8n.io/pricing/), [n8n, fonctions de l’édition Community](https://docs.n8n.io/deploy/host-n8n/community-edition-features), [n8n, licence](https://docs.n8n.io/n8n-community-license), [n8n, foire aux questions de la licence](https://docs.n8n.io/n8n-community-license/community-license/license-faq), [n8n, intégrer l’IA](https://docs.n8n.io/build/integrate-ai), [n8n, nœud AI Agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent), [dépôt GitHub de n8n](https://github.com/n8n-io/n8n), [faircode.io, définition du fair-code](https://faircode.io/).' },
    ],
    faq: [
      { q: 'n8n, c’est quoi en résumé ?', a: 'n8n est un outil d’automatisation qui relie vos logiciels entre eux par des workflows visuels : un déclencheur (e-mail reçu, formulaire envoyé, heure fixe) lance une suite d’étapes dans vos outils. Il s’utilise en ligne avec n8n Cloud ou installé sur votre propre serveur, et peut faire appel à l’IA.' },
      { q: 'n8n est-il gratuit ?', a: 'L’édition Community, installée sur votre propre serveur, est gratuite : vous payez le serveur et le temps de maintenance. n8n Cloud est un abonnement calculé sur le nombre d’exécutions de workflows par mois. Les services d’IA éventuels sont facturés à part par leur fournisseur.' },
      { q: 'n8n est-il open source ?', a: 'Non au sens strict. Son code est public, mais il est publié sous la Sustainable Use License, une licence « fair-code » qui autorise l’usage interne en entreprise et les prestations de création et de maintenance de workflows, mais pas la revente de n8n comme service hébergé.' },
      { q: 'Faut-il savoir coder pour utiliser n8n ?', a: 'Pas pour les workflows simples : on assemble les étapes dans un éditeur visuel. Les cas avancés (logiciel sans connecteur, transformation de données) demandent de comprendre les API, et n8n permet d’ajouter du code si besoin.' },
    ],
  },
  {
    slug: 'agent-ia-n8n',
    seoTitle: 'Agent IA avec n8n : le guide simple',
    seoDescription: 'Agent IA ou workflow, nœud AI Agent et Agents de n8n, exemple pas à pas pour une TPE (e-mails, agenda, brouillon) et garde-fous : le guide sans code.',
    title: 'Créer un agent IA avec n8n : comment ça marche, exemple pas à pas',
    description: 'Ce qu’est un agent IA, ce que n8n propose aujourd’hui (nœud AI Agent et Agents), un exemple concret pour une TPE, sans code, et les garde-fous à prévoir.',
    date: '2026-11-13',
    category: 'Outils',
    lead: 'Un agent IA est un modèle d’IA à qui l’on donne un objectif, des outils et une mémoire : c’est lui qui décide, à chaque étape, quel outil utiliser. Dans n8n, on le crée avec le nœud AI Agent à l’intérieur d’un workflow, ou avec les Agents, un objet à part entière encore en préversion. Pour une TPE, le bon usage consiste à lui faire préparer le travail (lire, chercher, proposer) en gardant une validation humaine avant tout envoi.',
    body: [
      { p: 'Le mot « agent » sert aujourd’hui à désigner des choses très différentes. Voici ce qu’il recouvre vraiment, ce que n8n permet de faire, et un exemple concret, sans code, de ce qu’un agent peut apporter à une petite entreprise.' },

      { h2: 'Agent IA ou workflow classique : la différence' },
      { p: 'Un workflow classique suit un chemin fixé à l’avance : quand un formulaire arrive, créer le contact, puis envoyer la confirmation. Chaque étape a été décidée par la personne qui l’a construit. Même quand une IA intervient, par exemple pour résumer un message, elle fait une seule tâche, à un endroit précis.' },
      { p: 'Un agent IA fonctionne autrement. On lui donne un objectif, des consignes et une liste d’outils, et le modèle d’IA décide lui-même quels outils appeler, dans quel ordre, jusqu’à obtenir une réponse. La documentation de n8n le résume ainsi : là où une chaîne suit une suite d’appels prévue d’avance, un agent utilise un modèle de langage pour choisir les actions à mener. Un agent réunit quatre éléments :' },
      { ul: [
        'le modèle : l’IA qui raisonne et rédige (n8n se branche notamment sur OpenAI, Anthropic ou Mistral) ;',
        'les consignes : son rôle, son ton, ce qu’il doit faire et ce qu’il ne doit jamais faire ;',
        'les outils : les actions qu’il a le droit d’effectuer dans vos logiciels (lire l’agenda, chercher un client, créer un brouillon d’e-mail…) ;',
        'la mémoire : l’historique de l’échange en cours, pour ne pas repartir de zéro à chaque message.',
      ] },

      { h2: 'Ce que n8n propose aujourd’hui' },
      { p: 'n8n offre deux façons de créer un agent. Elles ne s’opposent pas, elles se complètent.' },
      { p: 'La première est le nœud AI Agent, une brique que l’on place dans un workflow. On y branche un modèle de chat, au moins un outil (c’est obligatoire) et, si besoin, une mémoire. Les outils peuvent être des intégrations de n8n (Gmail, Google Agenda, Outlook, Google Sheets…), un autre workflow, un appel à un service en ligne, ou un serveur MCP, qui donne à l’agent, en une seule connexion, les outils proposés par un service. Le workflow garde la main sur le reste : ce qui déclenche l’agent et ce que l’on fait de sa réponse.' },
      { p: 'La seconde, ce sont les Agents (« Build and manage agents » dans la documentation). Ce ne sont plus des nœuds mais des objets à part entière, rangés à côté des workflows dans un projet. On les configure dans l’Agent Builder : modèle, consignes, outils, mémoire de la conversation (activée par défaut) et tâches planifiées. On les teste en brouillon, puis on publie une version : les modifications suivantes ne touchent pas la version en service tant qu’on ne republie pas. Ils peuvent répondre dans Slack, Telegram, Linear ou Microsoft Teams, et un workflow peut leur écrire avec le nœud Message an Agent.' },
      { note: 'Les Agents de n8n sont en préversion (« Preview ») : n8n prévient qu’ils peuvent se tromper et que leur fonctionnement peut encore changer. Tant que c’est le cas, pour un usage quotidien chez un client, je privilégie le nœud AI Agent dans un workflow.' },

      { h2: 'Exemple pas à pas : un agent qui prépare les réponses aux demandes de rendez-vous' },
      { p: 'Prenons un cabinet ou une petite entreprise de services qui reçoit chaque jour des e-mails du type « Bonjour, je voudrais un rendez-vous la semaine prochaine, plutôt en fin de journée ». Quelqu’un lit le message, ouvre l’agenda, cherche deux ou trois créneaux et rédige la réponse. Voici comment un agent n8n peut préparer ce travail, sans rien envoyer seul.' },
      { ol: [
        'Le déclencheur : un nouvel e-mail arrive dans la boîte de contact. n8n le repère (avec Gmail, il vérifie la boîte à intervalle régulier) et peut se limiter à un libellé ou à un expéditeur, pour ne traiter que les demandes.',
        'Le tri : l’agent lit le message et détermine s’il s’agit d’une demande de rendez-vous, d’une question ou d’autre chose. Ce qui n’est pas une demande de rendez-vous vous est simplement signalé, sans réponse automatique.',
        'La consultation de l’agenda : l’agent interroge votre agenda (Google Agenda ou Outlook) sur la période demandée et repère les créneaux libres, en respectant vos consignes : horaires, durée d’un rendez-vous, jours à éviter.',
        'Le brouillon : il rédige une réponse qui propose deux ou trois créneaux et la dépose en brouillon dans votre messagerie, dans le fil de la conversation.',
        'La validation : vous recevez une notification, relisez le brouillon, le corrigez si besoin et l’envoyez vous-même. Si l’outil d’envoi est confié à l’agent, n8n peut aussi le mettre en pause avant chaque envoi et vous demander d’approuver ou de refuser, par e-mail, Slack, Telegram ou Microsoft Teams.',
        'La suite : une fois le client d’accord, le rendez-vous est inscrit dans l’agenda, par vous ou par un workflow classique.',
      ] },
      { p: 'Pourquoi un agent ici, et pas un simple workflow ? Parce que les demandes sont écrites librement : « mardi ou jeudi », « pas avant le 15 », « le matin si possible ». L’agent interprète la phrase et choisit lui-même la période à vérifier. Dans cet exemple, la mémoire sert peu, car chaque e-mail est traité à part. Elle devient utile quand l’agent dialogue, par exemple dans Telegram ou dans le chat d’un site, pour se souvenir de ce qui a été dit plus tôt dans la conversation.' },

      { h2: 'Les garde-fous à prévoir' },
      { ul: [
        'Une validation humaine avant tout envoi : l’agent prépare, vous décidez. n8n permet d’exiger une approbation outil par outil, par exemple seulement pour l’envoi d’e-mails.',
        'Des outils limités au strict nécessaire : lire l’agenda et créer un brouillon, oui ; supprimer des e-mails ou modifier des fiches clients, non, sauf besoin précis. Avec une intégration n8n, on peut fixer certains réglages à l’avance et ne laisser à l’IA que les champs utiles.',
        'Des consignes claires : ne jamais inventer un prix, un délai ou une disponibilité, et dire « je ne sais pas » plutôt que deviner.',
        'Un suivi : n8n conserve l’historique des exécutions (et, pour les Agents, celui des conversations et des outils utilisés), ce qui permet de vérifier après coup ce que l’agent a fait.',
      ] },

      { h2: 'Données personnelles et RGPD' },
      { p: 'Un agent qui lit vos e-mails et votre agenda manipule des données personnelles : noms, coordonnées, parfois le motif du rendez-vous. Le texte du message est envoyé au fournisseur du modèle d’IA pour être traité, même si n8n est installé sur votre propre serveur. Les règles habituelles s’appliquent donc : n’envoyer que ce qui est utile, choisir une offre professionnelle dont les conditions excluent la réutilisation de vos données, le mentionner dans votre politique de confidentialité et l’inscrire dans votre registre. Le détail est dans [RGPD et automatisation : ce qu’une TPE doit vérifier](/blog/rgpd-automatisation-tpe/) et dans les [6 règles pour utiliser l’IA avec des données clients](/blog/ia-donnees-clients-regles/).' },
      { p: 'Si vos messages contiennent des informations sensibles, des données de santé par exemple, un agent IA généraliste ne doit pas les lire sans un cadre adapté.' },

      { h2: 'Ce que ça coûte' },
      { p: 'Trois postes, sans surprise si on les connaît à l’avance :' },
      { ul: [
        'n8n lui-même : n8n Cloud, ou un serveur à votre nom. Si votre offre compte les exécutions, sachez qu’un échange avec un Agent compte comme une exécution, comme un workflow.',
        'Le modèle d’IA : les fournisseurs facturent leur API à l’usage, selon la quantité de texte envoyée et produite. Un agent appelle souvent le modèle plusieurs fois pour une seule demande (choisir un outil, lire le résultat, rédiger), et la description de ses outils fait partie du texte envoyé : une demande traitée par un agent coûte donc plus qu’un appel unique à l’IA.',
        'La mise en place et le suivi : écriture des consignes, tests sur de vrais e-mails, ajustements les premières semaines.',
      ] },
      { p: 'Je ne donne pas de chiffre général pour l’IA : il dépend du modèle choisi, de la longueur des messages et de votre volume. Je l’estime pendant l’audit, à partir de vos demandes réelles, et les abonnements restent à votre nom. Côté réalisation, les projets démarrent à partir de 150 €, prix exact fixé après l’audit.' },

      { h2: 'Quand un simple workflow suffit' },
      { p: 'Un agent n’est pas toujours la bonne réponse. Si le chemin est toujours le même, un workflow classique est plus prévisible, plus rapide et moins cher :' },
      { ul: [
        'le formulaire de votre site arrive toujours avec les mêmes champs : il suffit de les recopier dans le CRM ;',
        'vos clients réservent déjà en ligne : il n’y a rien à interpréter, seulement des rappels à envoyer (voir [prise de rendez-vous en ligne et rappels](/blog/prise-rendez-vous-en-ligne-rappels/)) ;',
        'l’IA n’a qu’une tâche précise (résumer, classer, lire une facture) : une seule étape d’IA dans un workflow suffit, sans lui laisser le choix des outils.',
      ] },
      { p: 'Mon conseil : commencer par un workflow, ajouter une étape d’IA là où il faut lire du texte libre, et passer à un agent seulement quand les demandes sont trop variées pour être prévues à l’avance. C’est aussi ce que recommande n8n : un agent quand le travail est trop ouvert pour un workflow fixe.' },

      { p: 'Pour aller plus loin : je détaille ce que je fais avec n8n (installation, workflows, IA, maintenance) sur la page [agence n8n pour TPE et PME](/agence-n8n/), et les usages de l’IA dans la partie [intelligence artificielle des services](/services/#ia). Si vous hésitez entre un agent sur vos e-mails et un assistant sur votre site, lisez [Chatbot sur le site d’une TPE : utile ou gadget ?](/blog/chatbot-site-tpe-utile-ou-gadget/). Pour les cabinets qui gèrent beaucoup de rendez-vous, voir aussi la page [professions libérales et cabinets](/automatisation/professions-liberales/). Vous voulez savoir si un agent a du sens chez vous ? [Écrivez-moi](/contact/) : je regarde vos demandes réelles pendant l’audit gratuit de 30 minutes.' },
      { p: 'Sources : documentation n8n, [Build and manage agents](https://docs.n8n.io/build/build-and-manage-agents/), [nœud AI Agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/), [What agents do](https://docs.n8n.io/build/integrate-ai/understand-ai-components/what-agents-do/), [How memory works](https://docs.n8n.io/build/integrate-ai/understand-ai-components/how-memory-works/), [Tools Agent (modèles et outils compatibles)](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent/), [MCP servers](https://docs.n8n.io/build/integrate-ai/mcp-servers/), [Human-in-the-loop for tools](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools/), [Gmail Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/), [Gmail, brouillons](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/), [Google Calendar, disponibilités](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/calendar-operations/), [Microsoft Outlook](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook/), [Message an Agent](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.messageanagent/) ; [Anthropic, tarification de l’API (facturation au texte traité, outils compris)](https://platform.claude.com/docs/en/about-claude/pricing).' },
    ],
    faq: [
      { q: 'Qu’est-ce qu’un agent IA dans n8n ?', a: 'C’est un modèle d’IA relié à des outils (agenda, messagerie, tableur, autre workflow…) et, si besoin, à une mémoire. Contrairement à un workflow classique, c’est le modèle qui décide quels outils appeler et dans quel ordre pour atteindre l’objectif fixé par ses consignes.' },
      { q: 'Quelle différence entre le nœud AI Agent et les Agents de n8n ?', a: 'Le nœud AI Agent se place dans un workflow, qui gère le déclenchement et la suite. Les Agents sont des objets à part entière, configurés dans l’Agent Builder, avec un brouillon et une version publiée ; on les joint par chat, Slack, Telegram, Linear ou Microsoft Teams, ou depuis un workflow. Ils sont encore en préversion.' },
      { q: 'Faut-il savoir coder pour créer un agent IA avec n8n ?', a: 'Non. L’agent se configure dans l’interface de n8n : choix du modèle, consignes rédigées en phrases simples, outils choisis dans une liste. Le vrai travail est ailleurs : écrire de bonnes consignes, tester sur de vrais cas et limiter ses droits.' },
      { q: 'Un agent IA peut-il répondre seul à mes clients ?', a: 'Techniquement oui, mais je le déconseille pour tout ce qui engage l’entreprise. L’agent prépare un brouillon et une personne valide avant l’envoi. n8n permet d’exiger cette approbation avant chaque utilisation d’un outil sensible, comme l’envoi d’un e-mail.' },
    ],
  },
  {
    slug: 'lire-factures-fournisseurs-ia',
    seoTitle: 'Factures fournisseurs : les lire avec l’IA',
    seoDescription: 'Ce que l’IA sait lire sur une facture fournisseur, ses erreurs, ce que change la facture électronique, la conservation et le RGPD : le guide TPE.',
    title: 'Lire ses factures fournisseurs avec l’IA : comment ça marche, quelles limites',
    description: 'Comment l’IA lit, renomme et classe les factures fournisseurs, ce qu’elle rate, ce que change la facture électronique et les règles de conservation à respecter.',
    date: '2026-11-11',
    category: 'Facturation',
    lead: 'Une IA peut lire une facture fournisseur reçue en PDF ou en photo, en extraire le fournisseur, la date, le numéro et les montants, puis la renommer, la ranger et préparer la saisie. Elle peut se tromper : une vérification humaine reste nécessaire avant que les chiffres partent en comptabilité. Avec la facture électronique, dont la réception est obligatoire depuis le 1er septembre 2026, une partie des factures arrive déjà en données structurées, et la lecture par IA sert surtout pour ce qui reste en PDF ou sur papier.',
    body: [
      { p: 'Dans beaucoup de petites entreprises, les factures fournisseurs arrivent par plusieurs chemins : pièce jointe d’un e-mail, espace client où il faut aller les télécharger, papier remis à la livraison. Elles sont rassemblées en fin de mois, renommées, rangées, puis envoyées au comptable. C’est un travail simple et répétitif, et c’est justement ce qui en fait un bon candidat à l’automatisation.' },

      { h2: 'Comment l’IA lit une facture' },
      { p: 'Deux techniques se complètent. La reconnaissance de caractères (OCR) transforme l’image d’une facture scannée ou photographiée en texte. Un modèle d’IA lit ensuite ce texte, ou directement le PDF, et repère les informations utiles, même quand chaque fournisseur présente sa facture à sa façon. Le résultat est une petite fiche :' },
      { ul: [
        'le fournisseur et son numéro SIREN ;',
        'le numéro et la date de la facture ;',
        'les montants hors taxes, de TVA et toutes taxes comprises, avec le taux de TVA ;',
        'la date d’échéance ;',
        'la nature de l’achat (fournitures, sous-traitance, abonnement…), pour proposer un classement.',
      ] },
      { p: 'À partir de cette fiche, une automatisation (par exemple un workflow n8n) renomme le fichier selon une règle fixe, comme « date, fournisseur, montant », le range dans le bon dossier, reporte les montants dans un tableau de suivi ou prépare l’import dans le logiciel comptable, et prévient quand une échéance approche.' },

      { h2: 'Ce que ça change au quotidien' },
      { p: 'Le gain vient surtout de la disparition des petites manipulations : ouvrir la pièce jointe, l’enregistrer, la renommer, recopier trois montants. Sur le cas type « factures fournisseurs » de la page [Exemples](/exemples/), l’ordre de grandeur est d’une à deux heures par semaine pour un cabinet qui reçoit ses factures par e-mail ; pour un [commerce ou un restaurant](/automatisation/commerces-restaurants/) qui en reçoit moins, on parle plutôt d’une à deux heures par mois. Le gain réel dépend du nombre de factures et de leur diversité : il se mesure pendant les premières semaines.' },
      { p: 'L’autre bénéfice est la régularité : les factures sont rangées le jour où elles arrivent, pas en fin de mois, et le comptable reçoit des pièces toujours nommées de la même façon.' },

      { h2: 'Ses limites, et comment s’en protéger' },
      { p: 'Un modèle d’IA peut se tromper, et avec assurance. La lecture est d’autant plus fiable que le document est net ; elle se dégrade sur :' },
      { ul: [
        'les photos floues, froissées ou mal cadrées, et les tickets de caisse ;',
        'les factures de plusieurs pages, avec plusieurs taux de TVA ou des remises ;',
        'les avoirs, qu’il faut reconnaître pour ne pas les compter comme des factures ;',
        'les doublons, quand la même facture arrive par e-mail puis par l’espace client.',
      ] },
      { p: 'Les garde-fous sont simples : contrôler que le hors taxes plus la TVA donne bien le total, vérifier que le numéro de facture n’existe pas déjà pour ce fournisseur, et envoyer en vérification humaine tout ce qui ne passe pas ces contrôles ou que l’IA signale comme incertain. Rien n’entre en comptabilité sans validation : l’IA prépare, vous ou votre comptable décidez.' },
      { note: 'L’automatisation lit et range, elle ne modifie jamais le document reçu. Si un montant ou une mention paraît faux, c’est au fournisseur qu’il faut le signaler, pas à l’outil de le corriger.' },

      { h2: 'Et avec la facture électronique ?' },
      { p: 'Depuis le 1er septembre 2026, toutes les entreprises établies en France et assujetties à la TVA doivent pouvoir recevoir des factures électroniques, par une plateforme agréée par l’État. Une facture électronique n’est pas un simple PDF : c’est un fichier de données structurées (formats UBL ou CII, ou format mixte comme Factur-X, qui associe un PDF lisible et les données). Les informations y sont déjà rangées dans des champs : pour ces factures, il n’y a plus rien à « lire », il suffit de récupérer les données sur la plateforme.' },
      { p: 'La lecture par IA reste utile pour tout ce qui n’arrive pas par ce circuit :' },
      { ul: [
        'les factures des PME, TPE et micro-entreprises, qui ne doivent émettre en électronique qu’à partir du 1er septembre 2027 et peuvent d’ici là envoyer des PDF ou du papier ;',
        'les factures de fournisseurs établis à l’étranger : ces opérations ne passent pas par la facture électronique, elles relèvent en règle générale de la transmission de données à l’administration (e-reporting), sauf les importations de biens, déclarées en douane ;',
        'les tickets de caisse et autres justificatifs de petites dépenses.',
      ] },
      { p: 'Les deux circuits peuvent aboutir au même classement : les factures électroniques récupérées sur la plateforme, les PDF lus par l’IA, et un seul tableau de suivi pour le comptable. Le calendrier complet de la réforme est détaillé dans [Facture électronique 2026-2027 : ce qui change pour les TPE](/blog/facture-electronique-tpe-2026-2027/).' },

      { h2: 'Conservation et mentions : ce que l’automatisation ne doit pas casser' },
      { p: 'Ranger automatiquement, oui ; supprimer ou transformer les originaux, non. Les règles officielles à garder en tête :' },
      { ul: [
        'durée : les factures sont des pièces justificatives à conserver 10 ans à compter de la clôture de l’exercice au titre du Code de commerce (article L123-22), et au moins 6 ans pour l’administration fiscale (article L102 B du Livre des procédures fiscales) ;',
        'factures électroniques : elles se conservent dans leur format informatique d’origine. Une facture reçue en XML peut être convertie en PDF pour la gestion, à condition de garder aussi le fichier d’origine ;',
        'factures papier : elles peuvent être numérisées, mais la copie numérique ne peut servir de pièce justificative que si la numérisation respecte des conditions précises (copie conforme sans retouche, format PDF ou PDF/A-3, cachet, empreinte ou signature électronique, horodatage). À défaut, il faut garder le papier.',
      ] },
      { p: 'Concrètement, l’automatisation range le fichier reçu tel quel, sans le réenregistrer ni le compresser, dans un dossier d’archive sauvegardé, sur un compte à votre nom. Les fiches extraites par l’IA servent au suivi ; elles ne remplacent pas la facture.' },
      { p: 'Côté mentions, une facture comporte notamment la date, un numéro unique, l’identité et le SIREN du vendeur, la désignation des produits ou services, les montants hors taxes et TTC, le taux de TVA, la date de règlement et le taux des pénalités de retard. Avec la réforme, quatre mentions s’ajoutent : le SIREN du client lorsqu’il s’agit d’une entreprise, l’adresse de livraison si elle diffère, la nature des opérations (biens, services ou les deux) et, le cas échéant, l’option pour le paiement de la TVA d’après les débits. Elles s’appliquent depuis le 1er septembre 2026 aux factures des grandes entreprises et des ETI, et s’appliqueront le 1er septembre 2027 à celles des PME et micro-entreprises. L’IA peut signaler une facture où une mention semble manquer ; c’est à vous ou à votre comptable d’en tirer les conséquences.' },

      { h2: 'Données personnelles et choix du service d’IA' },
      { p: 'Une facture fournisseur contient surtout des données d’entreprise, mais pas seulement : celle d’un entrepreneur individuel porte son nom et son adresse, d’autres mentionnent le nom d’un interlocuteur. Ce sont des données personnelles, puisque la CNIL définit ainsi toute information se rapportant à une personne identifiée ou identifiable. Le service d’IA qui lit ces factures pour votre compte est alors un sous-traitant au sens du RGPD, et un contrat doit encadrer ce traitement.' },
      { p: 'En pratique :' },
      { ul: [
        'lire les conditions du service : certaines offres peuvent réutiliser les documents envoyés pour améliorer leurs produits ; préférer une offre qui l’exclut par écrit ;',
        'n’envoyer à l’IA que la facture, pas tout l’e-mail ni toute la boîte de réception ;',
        'savoir où les données sont hébergées, et le noter dans votre registre des traitements ;',
        'limiter la durée de conservation des copies intermédiaires (historique des exécutions, fichiers temporaires).',
      ] },
      { p: 'Le détail de ces vérifications est dans [RGPD et automatisation : ce qu’une TPE doit vérifier](/blog/rgpd-automatisation-tpe/) et dans les [6 règles pour utiliser l’IA avec des données clients](/blog/ia-donnees-clients-regles/).' },

      { h2: 'Par où commencer' },
      { ol: [
        'Comptez vos factures fournisseurs sur un mois, et notez par où elles arrivent : e-mail, espace client, papier, plateforme agréée.',
        'Fixez avec votre comptable une règle de nommage et de classement.',
        'Démarrez par le circuit le plus simple, souvent les PDF reçus par e-mail, avec une vérification humaine de chaque facture les premières semaines.',
        'Ajoutez les contrôles automatiques (total, doublons), puis réservez la vérification aux cas signalés.',
        'Branchez ensuite la récupération des factures électroniques depuis votre plateforme agréée, si elle propose une connexion (API).',
      ] },
      { note: 'Ces repères sont généraux et ne remplacent ni l’avis de votre expert-comptable ni un conseil juridique ou fiscal. Les règles détaillées sont publiées sur impots.gouv.fr et entreprendre.service-public.gouv.fr.' },

      { h2: 'Pour aller plus loin' },
      { p: 'Les cabinets comptables appliquent la même mécanique aux pièces de leurs clients : voir la page [automatisation pour les cabinets d’expertise comptable](/automatisation/experts-comptables/). Pour relier la lecture des factures à votre messagerie, à votre stockage et à votre logiciel, un [workflow n8n](/agence-n8n/) qui tourne sur vos propres comptes suffit le plus souvent ; ce type de projet démarre à partir de 150 € au forfait. Je regarde votre circuit de factures pendant l’[audit gratuit de 30 minutes](/contact/).' },
      { p: 'Sources : [impots.gouv.fr, je découvre la facturation électronique](https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique), [entreprendre.service-public.gouv.fr, mentions obligatoires d’une facture](https://entreprendre.service-public.gouv.fr/vosdroits/F31808), [entreprendre.service-public.gouv.fr, durée de conservation des documents](https://entreprendre.service-public.gouv.fr/vosdroits/F10029), [BOFiP, conservation des documents et des factures (BOI-CF-COM-10-10-30)](https://bofip.impots.gouv.fr/bofip/645-PGP.html/identifiant=BOI-CF-COM-10-10-30-20250903), [CNIL, définition d’une donnée personnelle](https://www.cnil.fr/fr/definition/donnee-personnelle), [CNIL, sous-traitant](https://www.cnil.fr/fr/sous-traitant).' },
    ],
    faq: [
      { q: 'L’IA peut-elle saisir mes factures fournisseurs toute seule ?', a: 'Elle peut lire les informations utiles (fournisseur, date, numéro, montants, TVA) et préparer la saisie ou l’import dans le logiciel comptable. La validation reste humaine : contrôle des totaux et des doublons, puis vérification des cas signalés, avant que les chiffres partent en comptabilité.' },
      { q: 'La lecture par IA est-elle encore utile avec la facture électronique ?', a: 'Oui, pour ce qui n’arrive pas en données structurées : factures des PME, TPE et micro-entreprises, qui n’émettent en électronique qu’à partir du 1er septembre 2027, factures de fournisseurs étrangers, tickets et petits justificatifs. Les factures électroniques reçues par la plateforme agréée se récupèrent directement, sans lecture.' },
      { q: 'Combien de temps conserver les factures fournisseurs ?', a: '10 ans à compter de la clôture de l’exercice au titre du Code de commerce, et au moins 6 ans pour l’administration fiscale. Une facture électronique se conserve dans son format d’origine ; une facture papier peut être numérisée si des conditions précises sont respectées, sinon le papier est à garder.' },
      { q: 'Peut-on envoyer ses factures à un service d’IA en ligne ?', a: 'Oui, avec des précautions : une facture peut contenir des données personnelles (entrepreneur individuel, nom d’un interlocuteur). Le service d’IA est alors un sous-traitant au sens du RGPD : il faut un contrat qui encadre le traitement, une offre qui ne réutilise pas vos documents et un hébergement connu.' },
    ],
  },
  {
    slug: 'rgpd-automatisation-tpe',
    seoTitle: 'RGPD et automatisation : le guide TPE',
    seoDescription: 'Registre, contrats avec les prestataires, durée de conservation, hébergement hors UE, droits des personnes : les points RGPD à vérifier avant d’automatiser.',
    title: 'RGPD et automatisation : ce qu’une TPE doit vérifier',
    description: 'Formulaires, CRM, e-mails, chatbot : les obligations RGPD à vérifier quand une TPE automatise, avec les règles officielles et une liste de contrôle.',
    date: '2026-11-11',
    category: 'IA et sécurité',
    lead: 'Automatiser un formulaire, un CRM, des e-mails ou un chatbot ne change pas les règles du RGPD, mais multiplie les endroits où passent les données de vos clients. Avant de brancher un outil, une TPE doit vérifier six points : son registre des traitements, le contrat avec chaque prestataire, la durée de conservation, le lieu d’hébergement des données, la façon de répondre aux demandes des personnes et la sécurité des accès. Le plus simple est de le faire au moment où l’on construit l’automatisation.',
    body: [
      { p: 'Une automatisation relie des outils entre eux : le formulaire de contact envoie la demande dans un tableur, le CRM crée la fiche du client, l’outil d’e-mail envoie la confirmation, parfois une IA résume le message. À chaque étape, des données personnelles sont copiées ou stockées chez un prestataire différent. Là où il y avait un fichier, il y en a parfois quatre ou cinq. C’est l’occasion de remettre de l’ordre, pas une raison de renoncer.' },

      { h2: 'Tenir un registre des traitements, même court' },
      { p: 'Le registre est la liste de vos fichiers et de ce que vous en faites (article 30 du RGPD). Le texte prévoit une dispense pour les structures de moins de 250 salariés, mais elle ne s’applique pas dès qu’un traitement n’est pas occasionnel, présente un risque pour les personnes ou porte sur des données sensibles. La gestion des clients et des fournisseurs n’a rien d’occasionnel : la CNIL estime que cette dispense est limitée à des cas très particuliers et qu’une TPE qui traite des données personnelles doit tenir un registre.' },
      { p: 'Pour chaque traitement, le registre indique notamment :' },
      { ul: [
        'l’objectif (répondre aux demandes de devis, envoyer une lettre d’information, facturer…) ;',
        'les catégories de personnes et de données concernées ;',
        'les destinataires, y compris les outils et prestataires qui reçoivent les données ;',
        'les éventuels transferts hors de l’Union européenne ;',
        'les durées de conservation ;',
        'une description générale des mesures de sécurité.',
      ] },
      { p: 'La forme est libre, papier ou électronique. La CNIL propose un modèle simplifié au format tableur, pensé pour les petites structures. Chaque nouvelle automatisation y ajoute une ligne, ou complète une ligne existante avec les nouveaux outils.' },

      { h2: 'Un contrat avec chaque prestataire qui touche aux données' },
      { p: 'Votre CRM, votre outil d’e-mailing, votre hébergeur, la plateforme d’automatisation (n8n, Make, Zapier) ou le service d’IA traitent des données pour votre compte : au sens du RGPD, ce sont des sous-traitants. L’article 28 impose de ne choisir que des prestataires qui présentent des garanties suffisantes, et de signer avec chacun un contrat qui prévoit notamment qu’il :' },
      { ul: [
        'ne traite les données que sur vos instructions documentées ;',
        'garantit la confidentialité des personnes autorisées à y accéder ;',
        'met en place les mesures de sécurité nécessaires ;',
        'ne fait pas appel à un autre sous-traitant sans votre autorisation écrite préalable ;',
        'vous aide à répondre aux demandes des personnes et en cas d’incident ;',
        'supprime ou vous restitue les données à la fin de la prestation, selon votre choix ;',
        'vous fournit les informations qui prouvent qu’il respecte ses obligations.',
      ] },
      { p: 'Chez beaucoup d’éditeurs de logiciels, ce contrat existe déjà sous le nom de « DPA » (Data Processing Agreement) ou d’avenant RGPD, parfois intégré aux conditions générales, parfois à accepter à part. Il suffit de le retrouver, de vérifier qu’il couvre bien l’offre que vous utilisez, et de le ranger avec le registre. Le prestataire qui construit l’automatisation et garde un accès à vos outils entre aussi dans ce cadre.' },
      { note: 'Le piège classique : un compte gratuit ouvert « pour tester », qui finit par recevoir les vraies données des clients. Vérifiez que l’offre utilisée au quotidien est bien celle couverte par le contrat.' },

      { h2: 'Fixer une durée de conservation, et l’appliquer' },
      { p: 'Le RGPD interdit de garder les données plus longtemps que nécessaire au regard de l’objectif (article 5). Sauf texte particulier, c’est à vous de fixer la durée. La CNIL donne des repères dans son référentiel sur la gestion des activités commerciales :' },
      { ul: [
        'prospects : trois ans à compter de la collecte ou du dernier contact venant du prospect ;',
        'clients, pour la prospection : pendant la relation commerciale, puis trois ans après sa fin ;',
        'données de facturation : dix ans, en application du Code de commerce.',
      ] },
      { p: 'Ces référentiels ne sont pas contraignants : vous pouvez retenir une autre durée si vous pouvez la justifier. Ici, l’automatisation aide vraiment : une tâche planifiée peut archiver ou supprimer les contacts arrivés au terme de la durée retenue, au lieu de compter sur la mémoire de chacun. Pensez aussi aux copies qu’on oublie : historique des exécutions de la plateforme d’automatisation, pièces jointes restées dans la boîte mail, exports dans un tableur.' },

      { h2: 'Savoir où vont les données' },
      { p: 'Beaucoup d’outils sont édités hors d’Europe, souvent aux États-Unis. Le RGPD n’interdit pas ces transferts, mais il exige qu’ils soient encadrés. Deux cas reviennent le plus souvent :' },
      { ul: [
        'le pays bénéficie d’une décision d’adéquation de la Commission européenne : le transfert est possible sans outil supplémentaire. Pour les États-Unis, la décision du 10 juillet 2023 ne couvre que les entreprises américaines certifiées, inscrites sur la liste tenue par le ministère américain du Commerce ;',
        'sinon, il faut des garanties appropriées, le plus souvent les clauses contractuelles types adoptées par la Commission européenne, que les éditeurs intègrent en général à leur contrat.',
      ] },
      { p: 'À vérifier pour chaque outil : où sont hébergées les données, si l’éditeur est certifié ou fournit ces clauses, et la mention du transfert dans votre registre et votre politique de confidentialité. Ce cadre peut bouger : le précédent accord avec les États-Unis, le Privacy Shield, a été invalidé par la Cour de justice de l’Union européenne en juillet 2020. Quand un hébergement en Europe existe, le choisir limite cette dépendance ; n8n, par exemple, peut être installé sur un serveur situé en Europe.' },

      { h2: 'Informer les personnes et répondre à leurs demandes' },
      { p: 'Au moment de la collecte (formulaire, chatbot, prise de rendez-vous), les personnes doivent être informées (article 13) : qui vous êtes, pourquoi vous collectez leurs données et sur quelle base, à qui elles sont transmises, combien de temps vous les gardez, quels sont leurs droits, et qu’elles peuvent réclamer auprès de la CNIL. Une mention courte sous le formulaire, qui renvoie vers la politique de confidentialité, est la forme habituelle.' },
      { p: 'Une personne peut ensuite demander à accéder à ses données, à les corriger, à les effacer ou s’opposer à la prospection. Vous avez un mois pour répondre, délai prolongeable de deux mois si la demande est complexe ou si les demandes sont nombreuses, à condition de prévenir la personne dans le premier mois (article 12). Avec des données réparties dans plusieurs outils, mieux vaut s’y préparer :' },
      { ul: [
        'savoir dans quels outils une personne peut figurer (c’est le rôle du registre) ;',
        'prévoir un scénario « effacer ce contact partout » plutôt que de fouiller chaque outil à la main ;',
        'transmettre automatiquement une opposition à la prospection à l’outil d’e-mailing.',
      ] },
      { p: 'Enfin, si une automatisation prend une décision importante pour quelqu’un (refuser un dossier, écarter une candidature), l’article 22 du RGPD donne le droit de ne pas faire l’objet d’une décision fondée exclusivement sur un traitement automatisé lorsqu’elle produit des effets juridiques ou l’affecte de manière significative. Il existe des exceptions (contrat, loi, consentement explicite), mais la personne doit alors pouvoir obtenir une intervention humaine. Prévoir une validation humaine est donc la précaution la plus simple.' },

      { h2: 'Sécuriser les accès et prévoir l’incident' },
      { p: 'Une automatisation manipule des clés d’accès et des connexions à vos outils. Les bonnes pratiques : comptes à votre nom, accès limités à ce qui est nécessaire, retirés à la fin d’une mission, double authentification quand l’outil la propose, aucune clé copiée dans un e-mail ou un document partagé.' },
      { p: 'En cas de fuite (formulaire exposé, envoi au mauvais destinataire, compte piraté), le RGPD prévoit de notifier la CNIL dans les meilleurs délais et, si possible, dans les 72 heures après en avoir pris connaissance, sauf si l’incident n’est pas susceptible de présenter un risque pour les personnes (article 33). Si le risque est élevé, les personnes concernées doivent aussi être prévenues (article 34). Et chaque incident, même sans notification, est consigné dans un registre des violations.' },
      { p: 'Avant de mettre une automatisation en service, une liste de contrôle simple :' },
      { ol: [
        'le traitement figure au registre, avec les outils utilisés ;',
        'chaque outil qui reçoit des données a son contrat de sous-traitance ;',
        'la durée de conservation est fixée, et une tâche l’applique ;',
        'le lieu d’hébergement est connu, et les transferts hors Union européenne sont encadrés ;',
        'la mention d’information est en place sur le formulaire ou le chatbot ;',
        'vous savez retrouver et effacer une personne dans tous les outils.',
      ] },
      { note: 'Ces repères sont généraux et ne constituent pas un conseil juridique. Pour une situation particulière, rapprochez-vous de la CNIL (cnil.fr) ou d’un professionnel du droit.' },

      { h2: 'Pour aller plus loin' },
      { p: 'Les précautions prises sur chaque projet Axion Studio (comptes à votre nom, accès révocables, fin de projet propre) sont détaillées sur la page [Sécurité et données](/securite/). Si vous branchez une IA sur vos échanges, lisez aussi les [6 règles pour utiliser l’IA avec des données clients](/blog/ia-donnees-clients-regles/), et pour un assistant sur votre site, l’article [Chatbot sur le site d’une TPE : utile ou gadget ?](/blog/chatbot-site-tpe-utile-ou-gadget/). Les métiers qui manipulent beaucoup de données personnelles sont concernés au premier chef : voir les pages [professions libérales](/automatisation/professions-liberales/) et [agences immobilières](/automatisation/agences-immobilieres/). Un doute sur une automatisation existante ? [Écrivez-moi](/contact/), je vérifie ces points techniques pendant l’audit gratuit de 30 minutes (ce n’est pas un audit juridique).' },
      { p: 'Sources : [texte du RGPD, chapitre II (article 5)](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2), [chapitre III (articles 12, 13 et 22)](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3) et [chapitre IV (articles 28, 30, 33 et 34)](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4) sur cnil.fr, [CNIL, le registre des activités de traitement](https://www.cnil.fr/fr/RGPD-le-registre-des-activites-de-traitement), [CNIL, appliquer le RGPD dans une TPE ou PME](https://www.cnil.fr/fr/appliquer-le-rgpd-dans-une-tpe-ou-pme-les-questionsreponses-de-la-cnil), [CNIL, travailler avec un sous-traitant](https://www.cnil.fr/fr/sous-traitant), [CNIL, les durées de conservation des données](https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees), [CNIL, référentiels sur la gestion des activités commerciales](https://www.cnil.fr/fr/questions-reponses-sur-les-referentiels-relatifs-la-gestion-des-activites-commerciales-et-des), [CNIL, transférer des données hors de l’UE](https://www.cnil.fr/fr/les-outils-de-la-conformite/transferer-des-donnees-hors-de-lue), [CNIL, adéquation des États-Unis](https://www.cnil.fr/fr/adequation-des-etats-unis-les-premieres-questions-reponses).' },
    ],
    faq: [
      { q: 'Une TPE doit-elle tenir un registre des traitements ?', a: 'En pratique, oui. Le RGPD dispense les structures de moins de 250 salariés, sauf pour les traitements non occasionnels, à risque ou portant sur des données sensibles. La gestion des clients et des fournisseurs n’étant pas occasionnelle, la CNIL considère qu’une TPE qui traite des données personnelles doit tenir un registre. Un modèle simplifié est disponible sur cnil.fr.' },
      { q: 'Faut-il un contrat avec un outil comme un CRM ou une plateforme d’automatisation ?', a: 'Oui. Un outil qui traite des données pour votre compte est un sous-traitant au sens du RGPD, et l’article 28 impose un contrat qui encadre ce traitement. Chez beaucoup d’éditeurs, il s’agit d’un accord de traitement des données (DPA) à retrouver dans les conditions de l’offre utilisée.' },
      { q: 'Peut-on utiliser des outils américains pour automatiser ?', a: 'C’est possible, à condition notamment que le transfert soit encadré : entreprise certifiée au titre de la décision d’adéquation du 10 juillet 2023, ou clauses contractuelles types de la Commission européenne. Le transfert doit figurer dans le registre et dans la politique de confidentialité. Un hébergement en Europe, quand il existe, simplifie les choses.' },
      { q: 'Combien de temps garder les données des prospects ?', a: 'La CNIL retient comme repère trois ans à compter de la collecte ou du dernier contact venant du prospect. Ce référentiel n’est pas contraignant : une autre durée est possible si elle est justifiée. Une automatisation peut supprimer ou archiver les contacts au terme de la durée choisie.' },
    ],
  },
  {
    "slug": "chatbot-site-tpe-utile-ou-gadget",
    "seoTitle": "Chatbot pour TPE : utile ou gadget ?",
    "seoDescription": "Ce qu’un chatbot peut faire sur le site d’une petite entreprise, ses limites, les règles (AI Act, RGPD), le coût et un exemple réel.",
    "title": "Chatbot sur le site d’une TPE : utile ou gadget ?",
    "description": "Quand un chatbot rend service, quand il fait perdre du temps, ce que disent l’AI Act et le RGPD, ce qu’il coûte, et l’exemple de l’assistant d’axionstudio.fr.",
    "date": "2026-11-10",
    "updated": "2026-11-11",
    "category": "IA et sécurité",
    "lead": "Un chatbot est utile sur le site d’une TPE quand les visiteurs posent souvent les mêmes questions, à des heures où personne ne peut répondre, et qu’il sait passer la main à un humain. Il devient un gadget quand il cache votre téléphone, répond à côté ou invente. Depuis le 2 août 2026, le visiteur doit aussi savoir clairement qu’il échange avec une IA.",
    "body": [
      {
        "h2": "Ce qu’un chatbot sait bien faire"
      },
      {
        "p": "Les chatbots actuels s’appuient sur un modèle d’IA (Gemini, ChatGPT, Claude…) à qui l’on donne le contenu de votre site comme référence. Bien réglés, ils rendent trois services concrets."
      },
      {
        "ul": [
          "Répondre aux questions fréquentes : horaires, zone d’intervention, prix de départ, délais, documents à prévoir. Y compris le soir et le week-end.",
          "Prendre une demande : le visiteur décrit son besoin en quelques phrases, et le chatbot le transmet sous forme de message ou de formulaire pré-rempli, au lieu de le laisser repartir.",
          "Orienter vers le bon endroit : la page de réservation, le bon service, la bonne personne de l’équipe, ou le formulaire de contact quand la question dépasse ses informations."
        ]
      },
      {
        "h2": "Quand c’est un gadget"
      },
      {
        "ul": [
          "Le site reçoit peu de visites, ou peu de questions : le chatbot n’aura presque rien à faire.",
          "Vos clients ont surtout besoin d’un humain : diagnostic, devis précis, conseil qui engage votre responsabilité.",
          "Personne ne lit les demandes qu’il recueille, ou elles arrivent dans une boîte que vous ne consultez pas.",
          "Il se place entre le client et vous : téléphone introuvable, formulaire caché, questions en boucle.",
          "Il n’est pas cadré et répond à côté, ou donne un prix que vous n’avez jamais annoncé."
        ]
      },
      {
        "note": "Un test simple : listez les dix questions qu’on vous pose le plus souvent. Si une page de questions fréquentes bien faite y répond, commencez par elle. Le chatbot vient ensuite, s’il apporte quelque chose de plus."
      },
      {
        "h2": "Ses limites"
      },
      {
        "p": "Un modèle d’IA peut se tromper avec beaucoup d’assurance. Il faut donc le limiter à vos propres informations, lui interdire d’inventer des prix, des délais ou des garanties, et lui faire dire « je ne sais pas » plutôt que deviner. Il ne doit pas non plus prendre seul une décision importante pour la personne : la CNIL rappelle qu’une conversation sans intervention humaine ne peut pas, à elle seule, fonder une telle décision (article 22 du RGPD)."
      },
      {
        "p": "Enfin, il faut une sortie vers un humain, visible à tout moment : un bouton, un numéro, un formulaire. Un chatbot qui garde le client captif coûte plus de clients qu’il n’en rapporte."
      },
      {
        "h2": "Ce que disent les règles : AI Act et RGPD"
      },
      {
        "p": "Le règlement européen sur l’intelligence artificielle (AI Act) prévoit que les personnes soient informées qu’elles échangent avec un système d’IA, de façon claire et au plus tard lors du premier échange, sauf si c’est évident pour une personne raisonnablement attentive. Ces règles de transparence s’appliquent depuis le 2 août 2026. L’« omnibus » adopté en 2026 a repoussé les règles sur les IA dites à haut risque, pas celle-ci. En pratique : une mention visible dès l’ouverture de la fenêtre, du type « assistant IA », et pas de prénom humain qui laisserait croire à une vraie personne."
      },
      {
        "p": "Côté RGPD, les questions posées au chatbot sont des données personnelles dès qu’elles permettent d’identifier quelqu’un. Les points à vérifier :"
      },
      {
        "ul": [
          "Informer dans votre politique de confidentialité : quelles données, pour quoi faire, avec quel prestataire d’IA.",
          "Avertir avant l’usage de ne pas saisir de données sensibles (santé, opinions…), comme le conseille la CNIL.",
          "Ne conserver les conversations que le temps utile, et les effacer à la fin de l’échange quand rien ne justifie de les garder.",
          "Le cookie éventuel du chatbot n’exige pas de consentement s’il n’est déposé qu’à l’ouverture du chat et ne sert qu’à son fonctionnement.",
          "Lire les conditions du fournisseur : certaines offres gratuites réutilisent les échanges pour améliorer leurs services."
        ]
      },
      {
        "note": "Ces repères sont généraux et ne remplacent pas un conseil juridique. Le détail des précautions prises sur chaque projet figure sur la page [Sécurité et données](/securite/), et l’ensemble des vérifications (registre, contrats, durées de conservation) dans [RGPD et automatisation : ce qu’une TPE doit vérifier](/blog/rgpd-automatisation-tpe/)."
      },
      {
        "h2": "Combien ça coûte"
      },
      {
        "p": "Deux postes, à ne pas confondre. Le premier est l’usage du modèle d’IA, facturé au volume : Google affiche par exemple ses prix par million de « tokens » (des morceaux de mots). Il existe une offre gratuite limitée, mais les conditions de Google réservent l’offre payante aux services proposés à des utilisateurs situés en Europe (Espace économique européen), ce qui est le cas d’un chatbot sur le site d’une entreprise française. Avec l’offre payante, Google indique ne pas utiliser les échanges pour améliorer ses produits. Pour un site de petite entreprise, le volume reste faible, et un plafond quotidien évite toute surprise."
      },
      {
        "p": "Le second poste est le temps : écrire les consignes, tester les questions pièges, relire les premières conversations, mettre à jour le chatbot quand vos prix ou vos horaires changent. C’est souvent lui qui pèse le plus. Les outils de chat prêts à l’emploi, eux, fonctionnent en abonnement mensuel, dont le prix varie selon le nombre de conversations."
      },
      {
        "p": "Un assistant de ce type fait partie des projets d’IA proposés par Axion Studio, qui démarrent à partir de 150 € au forfait, avec un suivi possible à partir de 250 € par mois ([voir les tarifs](/tarifs/))."
      },
      {
        "h2": "Un exemple réel : l’assistant de ce site"
      },
      {
        "p": "Le site que vous lisez a son propre assistant, derrière le bouton « Une question ? » en bas à droite. Voici comment il est construit."
      },
      {
        "ul": [
          "Il utilise Gemini, le modèle d’IA de Google, appelé depuis le serveur du site. La clé d’accès est rangée sur le serveur, jamais dans le code publié.",
          "Ses consignes lui demandent de répondre uniquement à partir du contenu du site, sans inventer de prix, de délai ni de client, et de proposer un échange avec moi quand il ne sait pas.",
          "Il se présente comme « Assistant IA » dès l’ouverture, et indique que les réponses sont générées par Gemini et sont à vérifier.",
          "Il rappelle de ne saisir aucune donnée sensible. La conversation n’est pas enregistrée sur le site : elle reste dans le navigateur du visiteur.",
          "Il est plafonné, par visiteur et pour l’ensemble du site, pour garder les coûts sous contrôle.",
          "Il passe la main : le bouton « Envoyer ma demande à Arthur » pré-remplit le formulaire de contact avec ce que le visiteur a décrit, et c’est lui qui décide de l’envoyer.",
          "Il fonctionne avec l’offre payante de l’API Gemini. Le détail est dans la [politique de confidentialité](/confidentialite/)."
        ]
      },
      {
        "p": "Ce n’est pas un vendeur automatique : son rôle est de répondre aux premières questions et d’orienter vers l’audit gratuit, pas de conclure à ma place."
      },
      {
        "h2": "Pour aller plus loin"
      },
      {
        "p": "Les questions répétitives et la prise de demande sont au cœur des pages consacrées aux [professions libérales](/automatisation/professions-liberales/) et aux [commerces et restaurants](/automatisation/commerces-restaurants/). Avant de brancher une IA sur les échanges de vos clients, lisez aussi les [6 règles pour utiliser l’IA avec des données clients](/blog/ia-donnees-clients-regles/). Un doute sur l’intérêt d’un chatbot pour votre activité ? [Écrivez-moi](/contact/), l’audit de 30 minutes sert à ça."
      },
      {
        "p": "Sources : [Commission européenne, cadre réglementaire sur l’IA](https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai), [Commission européenne, règles de transparence des systèmes d’IA](https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems), [AI Act Service Desk, article 50](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50), [CNIL, chatbots : les conseils pour respecter les droits des personnes](https://www.cnil.fr/fr/chatbots-les-conseils-de-la-cnil-pour-respecter-les-droits-des-personnes), [Google AI Studio, tarifs de l’API Gemini](https://aistudio.google.com/docs/pricing), [Google, conditions de l’API Gemini](https://aistudio.google.com/docs/terms)."
      }
    ],
    "faq": [
      {
        "q": "Un chatbot est-il utile pour une petite entreprise ?",
        "a": "Oui si les visiteurs posent souvent les mêmes questions, hors des heures d’ouverture, et si le chatbot transmet les demandes à un humain. Avec peu de visites ou des questions qui demandent toujours un conseil personnalisé, une bonne page de questions fréquentes suffit."
      },
      {
        "q": "Faut-il dire aux visiteurs qu’ils parlent à une IA ?",
        "a": "Oui. Depuis le 2 août 2026, l’AI Act prévoit que les personnes soient informées clairement, au plus tard au premier échange, qu’elles interagissent avec un système d’IA, sauf si c’est évident. Une mention « assistant IA » visible dès l’ouverture du chat répond à cet objectif."
      },
      {
        "q": "Un chatbot peut-il prendre des demandes de rendez-vous ou de devis ?",
        "a": "Il peut recueillir la demande, poser les questions utiles et la transmettre, ou renvoyer vers votre page de réservation. Le prix, la date confirmée et toute décision importante restent validés par vous."
      },
      {
        "q": "Combien coûte un chatbot sur le site d’une TPE ?",
        "a": "L’usage du modèle d’IA est facturé au volume et reste faible pour un petit site ; l’offre gratuite n’est pas prévue pour un service proposé à des visiteurs européens ; un plafond quotidien garde le coût sous contrôle. Le poste principal est le temps de mise en place et de suivi. Chez Axion Studio, les projets démarrent à partir de 150 € au forfait."
      }
    ]
  },
  {
    "slug": "devis-artisan-automatiser",
    "seoTitle": "Devis d’artisan : le préparer en 5 minutes",
    "seoDescription": "De la demande au devis prêt à relire en quelques minutes : ce qu’un artisan peut automatiser, ce qui reste à faire soi-même et les règles à respecter.",
    "title": "Devis d’artisan : de la demande au devis prêt en 5 minutes",
    "description": "Comment automatiser la réception des demandes, la fiche client, le brouillon de devis et les relances, sans perdre la main sur le chiffrage.",
    "date": "2026-11-10",
    "category": "Artisans",
    "lead": "Un artisan peut passer de la demande au devis prêt à relire en quelques minutes : la demande crée seule une fiche client, un brouillon de devis est préparé à partir de ses tarifs habituels, et il n’a plus qu’à vérifier, ajuster et envoyer. Le chiffrage reste le sien, mais la saisie, le classement et les relances se font sans lui.",
    "body": [
      {
        "h2": "Où part le temps aujourd’hui"
      },
      {
        "p": "Le devis lui-même ne prend souvent que quelques minutes à chiffrer. Le reste du temps part autour : recopier la demande reçue par téléphone, par e-mail ou par un annuaire, retrouver les coordonnées du client, repartir d’un devis vide, puis relancer quand le client ne répond pas."
      },
      {
        "p": "Ce travail se fait le soir ou le week-end, après le chantier. Et une demande qui attend plusieurs jours est souvent une demande perdue : le client a déjà contacté quelqu’un d’autre."
      },
      {
        "h2": "Le circuit automatisé, étape par étape"
      },
      {
        "ol": [
          "La demande arrive par le formulaire du site, par e-mail ou par un annuaire. Pour les appels, un formulaire court, rempli en 30 secondes après l’appel, déclenche la même suite.",
          "Une fiche client est créée automatiquement : nom, adresse du chantier, besoin, photos, délai souhaité.",
          "Le client reçoit tout de suite un message qui confirme la réception et annonce le délai de réponse.",
          "Un brouillon de devis est préparé dans votre logiciel à partir de vos lignes habituelles (déplacement, main-d’œuvre, fournitures courantes).",
          "Vous êtes prévenu sur votre téléphone. Vous relisez, ajustez après la visite si besoin, et envoyez.",
          "Sans réponse après quelques jours, une relance polie part avec vos mots. Une fois le devis signé, la facture d’acompte est préparée."
        ]
      },
      {
        "note": "Rien ne part chez le client sans votre relecture : l’automatisation prépare, c’est vous qui décidez."
      },
      {
        "h2": "Ce qui reste à faire vous-même"
      },
      {
        "ul": [
          "Le chiffrage final, surtout quand il dépend de ce que vous voyez sur le chantier.",
          "La visite technique et les choix de matériaux.",
          "Les échanges délicats : client hésitant, réclamation, litige."
        ]
      },
      {
        "h2": "Les règles à respecter sur un devis"
      },
      {
        "p": "Pour les travaux de dépannage, de réparation et d’entretien chez les particuliers, dans le bâtiment et l’équipement de la maison (plomberie, serrurerie, électricité, chauffage…), le devis détaillé est obligatoire avant toute intervention, quel que soit le montant, depuis l’arrêté du 24 janvier 2017. Il doit notamment indiquer s’il est gratuit ou payant, le taux horaire de main-d’œuvre et les frais de déplacement."
      },
      {
        "p": "Un modèle de devis bien préparé dans votre logiciel reprend ces mentions à chaque fois : c’est un des avantages de partir d’un brouillon plutôt que d’une page blanche."
      },
      {
        "note": "Les mentions exactes dépendent de votre métier et de votre clientèle (particuliers ou professionnels). Vérifiez-les auprès de votre chambre de métiers ou de votre organisation professionnelle. Cet article ne remplace pas un conseil juridique."
      },
      {
        "h2": "Avec quels outils"
      },
      {
        "p": "Les logiciels de devis du bâtiment (Obat, Tolteck, Batappli et d’autres) proposent souvent des modèles et parfois des connexions. Une automatisation relie ce logiciel à votre messagerie, à votre site et à votre agenda, avec un outil comme [n8n, Make ou Zapier](/blog/n8n-make-zapier-comparatif/). Je pars toujours de votre logiciel actuel : en changer n’est proposé que s’il bloque vraiment."
      },
      {
        "p": "Ordre de grandeur : sur ce type de circuit, le gain se compte en heures par semaine, selon le nombre de demandes reçues. Les projets démarrent à 150 € au forfait ([voir les tarifs](/tarifs/))."
      },
      {
        "h2": "Pour aller plus loin"
      },
      {
        "p": "Voir la page consacrée à l’[automatisation pour les artisans du bâtiment](/automatisation/artisans-batiment/), et l’article sur les [relances de factures impayées](/blog/relances-factures-impayees/), l’autre tâche qui pèse le plus sur les artisans. D’autres cas concrets figurent parmi les [exemples d’automatisation commentés](/exemples/)."
      },
      { "p": "Sources : [Fédération française du bâtiment, ce qui a changé le 1er avril 2017](https://www.ffbatiment.fr/actualites-batiment/actualite-ba/ce-qui-a-change-le-1er-avril), [Institut national de la consommation, prestations de dépannage, de réparation et d’entretien](https://www.inc-conso.fr/content/prestations-de-depannage-de-reparation-et-dentretien-une-meilleure-information-sur-les-prix)." }
    ],
    "faq": [
      {
        "q": "Peut-on automatiser un devis d’artisan ?",
        "a": "On automatise tout ce qui l’entoure : réception de la demande, fiche client, brouillon de devis à partir de vos tarifs, notification et relances. Le chiffrage final et l’envoi restent sous votre contrôle."
      },
      {
        "q": "Faut-il changer de logiciel de devis ?",
        "a": "Non, dans la plupart des cas. L’automatisation se branche sur votre logiciel actuel, ou sur un modèle de document si vous n’en avez pas."
      },
      {
        "q": "Et les demandes reçues par téléphone ?",
        "a": "Un formulaire très court, rempli sur votre téléphone après l’appel, déclenche la même suite que les demandes écrites."
      },
      {
        "q": "Le devis est-il obligatoire pour un dépannage ?",
        "a": "Oui, pour les travaux de dépannage, de réparation et d’entretien chez les particuliers, dans le bâtiment et l’équipement de la maison, un devis détaillé doit être remis avant l’intervention, quel que soit le montant."
      }
    ]
  },
  {
    "slug": "prise-rendez-vous-en-ligne-rappels",
    "seoTitle": "Prise de rendez-vous en ligne et rappels SMS",
    "seoDescription": "Relier la réservation en ligne à votre agenda, envoyer des rappels par SMS ou e-mail et limiter les absences : comment faire et quelles règles respecter.",
    "title": "Prise de rendez-vous en ligne : la relier à votre agenda et aux rappels SMS",
    "description": "Réservation en ligne, agenda à jour, rappel la veille et créneaux libérés à temps : comment automatiser les rendez-vous d’une petite entreprise.",
    "date": "2026-11-10",
    "category": "Organisation",
    "lead": "Pour automatiser vos rendez-vous, il faut trois briques reliées entre elles : une page de réservation qui ne propose que vos vrais créneaux libres, votre agenda mis à jour seul, et un rappel envoyé la veille par SMS ou par e-mail avec un lien pour annuler. Le client réserve à toute heure, vous ne ressaisissez rien, et les absences diminuent.",
    "body": [
      {
        "h2": "Le vrai coût des rendez-vous gérés à la main"
      },
      {
        "ul": [
          "Les allers-retours par téléphone ou par e-mail pour trouver un créneau.",
          "La ressaisie dans l’agenda, avec le risque de doublon ou d’oubli.",
          "Les absences sans prévenir : un créneau perdu, impossible à reproposer.",
          "Les rappels faits de mémoire, quand on y pense."
        ]
      },
      {
        "h2": "Le circuit automatisé"
      },
      {
        "ol": [
          "Le client choisit un créneau sur votre page de réservation, qui ne montre que vos disponibilités réelles.",
          "Le rendez-vous s’inscrit dans votre agenda (Google Agenda, Outlook…) avec les informations utiles : nom, motif, téléphone, adresse.",
          "Le client reçoit une confirmation immédiate, avec ce qu’il doit préparer ou apporter.",
          "La veille, un rappel part par SMS ou par e-mail, avec un lien pour annuler ou déplacer.",
          "Un créneau annulé redevient disponible tout de suite, et peut être proposé à une liste d’attente.",
          "Après le rendez-vous, un message peut remercier le client, envoyer un document ou demander un avis."
        ]
      },
      {
        "h2": "SMS ou e-mail : que choisir ?"
      },
      {
        "p": "Le SMS est lu presque toujours et rapidement : c’est le meilleur canal pour un rappel la veille. Il coûte quelques centimes par message selon le fournisseur. L’e-mail est gratuit et convient à la confirmation, qui peut contenir plus d’informations (plan d’accès, documents à préparer). Beaucoup de petites entreprises combinent les deux : e-mail à la réservation, SMS la veille."
      },
      {
        "h2": "Ce que dit la règle (RGPD)"
      },
      {
        "p": "Un rappel de rendez-vous demandé par le client est un message lié au service, pas de la prospection : il n’exige pas de consentement marketing. Il faut en revanche informer le client de l’usage de son numéro, par une mention courte sur la page de réservation. Les [précautions prises sur les données de vos clients](/securite/) sont détaillées à part."
      },
      {
        "p": "Attention : dès qu’un message contient une promotion ou une offre, il bascule dans la prospection commerciale, avec des règles plus strictes (en principe, le consentement préalable du particulier, sauf exceptions pour les clients existants). Gardez les rappels purement pratiques."
      },
      {
        "note": "Les règles détaillées sont sur cnil.fr, page « La prospection commerciale par courrier électronique, SMS-MMS et automate d’appel ». Cet article ne remplace pas un conseil juridique."
      },
      {
        "h2": "Avec quels outils"
      },
      {
        "p": "Les outils de réservation spécialisés (Planity, Doctolib, TheFork, Calendly, la page de réservation de Google Agenda…) font déjà une partie du travail. L’automatisation sert à les [relier au reste de vos outils](/services/) : votre fichier clients, votre facturation, les demandes d’avis, ou une liste d’attente. Je pars de l’outil que vous utilisez déjà, et je n’en propose un nouveau que s’il manque une brique."
      },
      {
        "p": "Ordre de grandeur : ce type de circuit se met en place en une à deux semaines, tests compris, et les projets démarrent à 150 € au forfait ([voir les tarifs](/tarifs/))."
      },
      {
        "h2": "Pour aller plus loin"
      },
      {
        "p": "Les rendez-vous sont au cœur des pages consacrées aux [commerces et restaurants](/automatisation/commerces-restaurants/), aux [professions libérales](/automatisation/professions-liberales/) et aux [agences immobilières](/automatisation/agences-immobilieres/) pour les visites. Voir aussi les [5 tâches à automatiser en priorité](/blog/taches-a-automatiser-tpe/)."
      },
      { "p": "Sources : [CNIL, la prospection commerciale par SMS et MMS](https://www.cnil.fr/fr/la-prospection-commerciale-par-sms-mms), [CNIL, communications électroniques aux prospects et clients](https://www.cnil.fr/fr/communication-electronique-quelles-regles)." }
    ],
    "faq": [
      {
        "q": "Faut-il le consentement du client pour lui envoyer un rappel par SMS ?",
        "a": "Pas pour un rappel de rendez-vous qu’il a lui-même pris : c’est un message lié au service. Il faut l’informer de l’usage de son numéro, et ne pas glisser de promotion dans le rappel."
      },
      {
        "q": "Combien coûte un rappel par SMS ?",
        "a": "Quelques centimes par message selon le fournisseur et le volume. L’e-mail est gratuit mais moins lu au dernier moment."
      },
      {
        "q": "Mon outil de réservation envoie déjà des rappels, à quoi sert une automatisation ?",
        "a": "À relier cet outil au reste : fichier clients, facturation, demandes d’avis, liste d’attente, tableau de suivi. Si votre outil couvre déjà tout, l’audit vous le dira."
      },
      {
        "q": "Les rappels réduisent-ils vraiment les absences ?",
        "a": "Oui, c’est leur principal intérêt : un client rappelé la veille, avec un lien pour annuler, prévient plus souvent quand il ne peut pas venir, ce qui libère le créneau à temps."
      }
    ]
  },
  {
    slug: 'relances-factures-impayees',
    seoTitle: 'Relancer une facture impayée : guide TPE',
    seoDescription: 'Quand relancer, quoi écrire, quelles pénalités appliquer et comment automatiser les relances de factures impayées sans braquer vos clients.',
    title: 'Relances de factures impayées : comment les automatiser sans braquer vos clients',
    description: 'Le calendrier de relance qui marche, les règles à connaître (délais, pénalités, 40 € d’indemnité) et ce qu’une automatisation peut faire à votre place.',
    date: '2026-11-10',
    category: 'Facturation',
    lead: 'Pour relancer une facture impayée sans abîmer la relation, il faut relancer tôt, à date fixe, avec un ton qui monte progressivement : un rappel aimable avant l’échéance, une relance le lendemain, puis une relance ferme et enfin une mise en demeure. Ces étapes se répètent à l’identique d’un client à l’autre : c’est exactement ce qu’une automatisation sait faire, pendant que vous gardez la main sur les cas sensibles.',
    body: [
      { h2: 'Pourquoi les relances sont souvent oubliées' },
      { p: 'Relancer un client est désagréable, prend du temps et passe toujours après le travail urgent. Résultat : la relance part trop tard, ou pas du tout, et le retard s’installe. Plus une facture est ancienne, plus elle est difficile à récupérer.' },
      { p: 'Le problème n’est presque jamais de savoir quoi écrire. C’est de penser à le faire, au bon moment, pour chaque facture. Une tâche régulière, répétitive et basée sur des dates : le cas idéal pour l’automatisation.' },

      { h2: 'Ce que dit la loi entre professionnels' },
      { ul: [
        'Délai de paiement : 30 jours après la réception des marchandises ou la fin de la prestation si rien n’est prévu. Il peut être porté par contrat jusqu’à 60 jours après la date de la facture, ou 45 jours fin de mois (article L. 441-10 du Code de commerce).',
        'Pénalités de retard : dues sans qu’un rappel soit nécessaire. Leur taux est fixé dans vos conditions de vente ; à défaut, c’est le taux de la Banque centrale européenne majoré de 10 points. Il ne peut pas être inférieur à trois fois le taux d’intérêt légal.',
        'Indemnité forfaitaire pour frais de recouvrement : 40 € par facture payée en retard (article D. 441-5 du Code de commerce), en plus des pénalités.',
        'Le taux des pénalités et l’indemnité de 40 € doivent figurer sur vos factures et dans vos conditions générales de vente.',
      ] },
      { note: 'Pour les ventes aux particuliers, les règles sont différentes : les pénalités ne s’appliquent que si elles sont prévues au contrat. Même sans clause, les intérêts au taux légal sont dus à partir de la mise en demeure (article 1231-6 du Code civil), mais l’indemnité forfaitaire de 40 € ne s’applique pas. En cas de doute, vérifiez sur entreprendre.service-public.fr ou auprès de votre expert-comptable. Cet article ne remplace pas un conseil juridique.' },

      { h2: 'Le calendrier de relance qui marche' },
      { ol: [
        'Avant l’échéance (environ 5 jours avant) : un rappel aimable avec la facture en pièce jointe et le lien de paiement. Beaucoup de retards sont de simples oublis.',
        'Le lendemain de l’échéance : une première relance courte et neutre, du type « Sauf erreur de notre part, la facture n° X n’a pas encore été réglée ».',
        'Environ 10 jours après : une deuxième relance plus ferme, qui rappelle les pénalités et l’indemnité de 40 € prévues aux conditions de vente.',
        'Environ 20 jours après : un appel téléphonique. C’est souvent là que le vrai problème apparaît (litige, trésorerie, mauvais destinataire).',
        'Environ 30 jours après : une mise en demeure par lettre recommandée avec avis de réception, qui fixe un dernier délai.',
        'Ensuite : procédure d’injonction de payer auprès du tribunal compétent, ou recours à un service de recouvrement.',
      ] },
      { p: 'Ces délais sont des ordres de grandeur à adapter à vos clients : un client fidèle qui paie toujours avec une semaine de retard ne se traite pas comme un nouveau client silencieux.' },

      { h2: 'Ce que l’automatisation fait à votre place' },
      { ul: [
        'Surveiller chaque jour les factures arrivées à échéance, à partir de votre logiciel de facturation, d’un tableur ou de votre plateforme de facture électronique.',
        'Envoyer le rappel et les relances au bon moment, avec vos mots, la facture en pièce jointe et le lien de paiement.',
        'Arrêter les relances dès que le paiement est reçu, grâce au rapprochement avec la banque ou le logiciel de facturation. Aucun client ne reçoit de relance pour une facture déjà réglée.',
        'Calculer les pénalités et l’indemnité de 40 € pour les relances fermes.',
        'Vous prévenir pour l’appel téléphonique et la mise en demeure, avec un brouillon de courrier prêt : ces étapes restent les vôtres.',
        'Tenir un tableau de suivi : qui doit quoi, depuis quand, quelle relance est partie.',
      ] },
      { p: 'Deux réglages évitent les maladresses : une liste de clients à ne jamais relancer automatiquement (grands comptes, litiges en cours), et, si vous le souhaitez, votre validation avant toute relance ferme.' },

      { h2: 'Avec quels outils' },
      { p: 'Beaucoup de logiciels de facturation proposent des relances intégrées : vérifiez d’abord ce que le vôtre sait faire. Une automatisation sur mesure (avec [n8n, Make ou Zapier](/blog/n8n-make-zapier-comparatif/)) devient utile quand les factures sont dans un tableur, quand plusieurs outils doivent se parler (facturation, banque, messagerie, CRM) ou quand vous voulez un ton et un calendrier qui vous ressemblent.' },
      { p: 'Ordre de grandeur : une telle automatisation se met en place en une à deux semaines, tests compris, et les projets démarrent à 150 € au forfait ([voir les tarifs](/tarifs/)). Le gain se mesure en heures rendues chaque mois et, surtout, en factures payées plus tôt.' },

      { h2: 'Pour aller plus loin' },
      { p: 'Les relances sont souvent la première tâche automatisée chez les [artisans du bâtiment](/automatisation/artisans-batiment/) et dans les [professions libérales](/automatisation/professions-liberales/). Avec la [facture électronique obligatoire en 2026-2027](/blog/facture-electronique-tpe-2026-2027/), le suivi des paiements devient aussi plus simple à brancher.' },
      { "p": "Sources : [entreprendre.service-public.gouv.fr, retard de paiement entre professionnels](https://entreprendre.service-public.gouv.fr/vosdroits/F23211), [Bpifrance Création, taux des pénalités de retard](https://bpifrance-creation.fr/boiteaoutils/taux-penalites-retard), [CCI Paris Île-de-France, l’injonction de payer](https://entreprises.cci-paris-idf.fr/fiches-pratiques/linjonction-de-payer), [justice.fr, recouvrement judiciaire et injonction de payer](https://www.justice.fr/fiche/recouvrement-judiciaire-injonction-payer-france-europe)." }
    ],
    faq: [
      { q: 'Quand faut-il relancer une facture impayée ?', a: 'Dès le lendemain de l’échéance, après un rappel aimable envoyé quelques jours avant. Plus la relance est tardive, plus le paiement est difficile à obtenir.' },
      { q: 'Peut-on facturer 40 € de frais à un client professionnel en retard ?', a: 'Oui. L’indemnité forfaitaire de 40 € pour frais de recouvrement est due pour chaque facture payée en retard entre professionnels, en plus des pénalités. Elle doit figurer sur vos factures et vos conditions de vente.' },
      { q: 'Une relance automatique peut-elle froisser un bon client ?', a: 'Pas si elle est bien réglée : ton aimable au début, arrêt dès le paiement reçu, et liste de clients exclus des relances automatiques. Les étapes fermes peuvent rester soumises à votre validation.' },
      { q: 'Que faire si le client ne paie toujours pas après les relances ?', a: 'Envoyer une mise en demeure par lettre recommandée avec avis de réception, puis engager une procédure d’injonction de payer ou confier le dossier à un service de recouvrement.' },
    ],
  },
  {
    slug: 'facture-electronique-tpe-2026-2027',
    seoTitle: 'Facture électronique 2026 : le guide TPE',
    seoDescription: 'Réception obligatoire depuis septembre 2026, émission en septembre 2027 pour les TPE : qui est concerné, ce qui change et ce que vous pouvez automatiser.',
    title: 'Facture électronique 2026-2027 : ce qui change pour les TPE et ce que vous pouvez automatiser',
    description: 'Le calendrier de la réforme, qui est concerné, ce qui change concrètement, et les tâches autour des factures que vous pouvez automatiser dès maintenant.',
    date: '2026-11-10',
    category: 'Facturation',
    lead: 'Depuis le 1er septembre 2026, toutes les entreprises établies en France et assujetties à la TVA, TPE et micro-entrepreneurs compris, doivent pouvoir recevoir des factures électroniques. À partir du 1er septembre 2027, les PME, TPE et micro-entreprises devront aussi les émettre. Voici ce que cela change concrètement, et ce que vous pouvez automatiser autour.',
    body: [
      { h2: 'Le calendrier en bref' },
      { ul: [
        '1er septembre 2026 : toutes les entreprises doivent pouvoir recevoir des factures électroniques. Les grandes entreprises et les ETI doivent aussi les émettre.',
        '1er septembre 2027 : les PME, TPE et micro-entreprises doivent à leur tour émettre leurs factures en électronique et transmettre leurs données de transaction et, pour les prestations de services, de paiement à l’administration (le « e-reporting »).',
      ] },
      { note: 'Une facture en PDF envoyée par e-mail n’est pas une facture électronique au sens de la réforme : il faut un format structuré (Factur-X, UBL ou CII), transmis par une plateforme agréée par l’État.' },

      { h2: 'Qui est concerné' },
      { p: 'Toutes les entreprises établies en France et assujetties à la TVA, pour leurs factures entre entreprises. Cela inclut les micro-entrepreneurs en franchise en base : ils ne facturent pas la TVA, mais restent assujettis, donc concernés.' },
      { p: 'Pour les ventes aux particuliers et les opérations avec l’étranger, il n’y a pas de facture électronique à émettre, mais certaines données de ces ventes doivent être transmises à l’administration : c’est le e-reporting.' },

      { h2: 'Ce qui change concrètement' },
      { ul: [
        'Choisir une plateforme agréée : c’est par elle que vos factures sont reçues et, à partir de 2027, émises. La liste officielle est publiée sur impots.gouv.fr. Votre logiciel de facturation ou votre expert-comptable en propose souvent une.',
        'Recevoir vos factures fournisseurs par cette plateforme, et non plus seulement par e-mail ou par courrier.',
        'Émettre, à partir de septembre 2027, vos factures dans un format structuré, avec des mentions obligatoires complétées (notamment le numéro SIREN du client).',
        'Transmettre les données de vos ventes aux particuliers et à l’étranger, si vous en faites.',
      ] },

      { h2: 'Ce que vous pouvez automatiser autour des factures' },
      { p: 'La réforme impose un format et un circuit. Elle ne range pas vos factures à votre place, et ne relance pas vos clients. C’est là que l’automatisation fait gagner du temps :' },
      { ul: [
        'Récupérer chaque facture reçue sur la plateforme, la ranger dans le bon dossier et la transmettre à votre comptable, sans téléchargement manuel.',
        'Rapprocher factures et paiements, et relancer automatiquement les factures impayées à date fixe.',
        'Créer la facture à partir d’un devis accepté ou d’une commande, puis l’envoyer par la plateforme, sans ressaisie.',
        'Être prévenu quand une facture est rejetée, pour la corriger tout de suite.',
      ] },
      { p: 'La plupart des plateformes et des logiciels de facturation proposent des connexions (API) : c’est ce qui permet de les relier à votre messagerie, à votre tableur ou à votre CRM, par exemple avec un [workflow n8n relié à votre facturation](/agence-n8n/). Je le vérifie au cas par cas pendant l’[audit gratuit de 30 minutes](/contact/).' },

      { h2: 'Par où commencer' },
      { ol: [
        'Demandez à votre logiciel de facturation ou à votre expert-comptable quelle plateforme agréée ils proposent.',
        'Choisissez et désignez votre plateforme : la réception est déjà obligatoire.',
        'Vérifiez les informations de vos clients professionnels, en particulier leur numéro SIREN.',
        'Listez les tâches répétitives autour de vos factures : téléchargement, classement, envoi au comptable, relances (voir l’exemple du [traitement automatique des factures fournisseurs](/exemples/)).',
        'Testez l’émission bien avant septembre 2027, sur quelques factures, pour ne pas découvrir les problèmes à l’échéance.',
      ] },
      { note: 'Les règles détaillées (cas particuliers, sanctions) évoluent : vérifiez-les sur impots.gouv.fr, rubrique « facturation électronique », ou auprès de votre expert-comptable. Cet article ne remplace pas un conseil fiscal.' },

      { h2: 'Pour aller plus loin' },
      { p: 'Selon votre métier, les tâches à automatiser ne sont pas les mêmes : voir par exemple les pages consacrées aux [artisans du bâtiment](/automatisation/artisans-batiment/) et aux [experts-comptables](/automatisation/experts-comptables/), ou l’article sur les [relances et autres tâches à automatiser en priorité](/blog/taches-a-automatiser-tpe/). Pour les factures fournisseurs qui arrivent encore en PDF ou sur papier, voir [Lire ses factures fournisseurs avec l’IA](/blog/lire-factures-fournisseurs-ia/).' },
      { p: "Sources : [impots.gouv.fr, je passe à la facturation électronique](https://www.impots.gouv.fr/professionnel/je-passe-la-facturation-electronique), [entreprendre.service-public.gouv.fr, facturation électronique entre entreprises](https://entreprendre.service-public.gouv.fr/actualites/A15683)." },
    ],
    faq: [
      { q: "La facture électronique est-elle obligatoire pour les TPE en 2026 ?", a: "Depuis le 1er septembre 2026, toutes les entreprises assujetties à la TVA, TPE et micro-entrepreneurs compris, doivent pouvoir recevoir des factures électroniques. L’obligation d’en émettre arrive le 1er septembre 2027 pour les PME, TPE et micro-entreprises." },
      { q: "Une facture PDF envoyée par e-mail est-elle une facture électronique ?", a: "Non. Au sens de la réforme, une facture électronique est un fichier structuré (Factur-X, UBL ou CII) transmis par une plateforme agréée par l’État." },
      { q: "Les micro-entrepreneurs sont-ils concernés ?", a: "Oui, y compris en franchise en base de TVA : ils ne facturent pas la TVA mais restent assujettis, donc concernés pour leurs factures entre entreprises." },
      { q: "Que peut-on automatiser avec la facture électronique ?", a: "La récupération et le classement des factures reçues, leur transmission au comptable, la création des factures à partir des devis acceptés, le rapprochement avec les paiements et les relances des impayés." },
    ],
  },
  {
    slug: 'cout-automatisation-petite-entreprise',
    seoTitle: 'Combien coûte l’automatisation ? (TPE)',
    seoDescription: 'Ce qui fait varier le prix d’une automatisation, les coûts à prévoir et une méthode simple pour savoir si elle sera rentable pour votre entreprise.',
    title: 'Combien coûte l’automatisation pour une petite entreprise ?',
    description: 'Ce qui fait varier le prix d’une automatisation, les coûts récurrents à prévoir, et une méthode simple pour calculer si elle sera rentable dans votre cas.',
    date: '2026-11-04',
    category: 'Automatisation',
    lead: 'C’est la première question que se posent les dirigeants de petites entreprises, et elle est légitime : une automatisation n’a d’intérêt que si elle fait gagner plus qu’elle ne coûte. Voici ce qui fait varier le prix, ce qu’il faut prévoir chaque mois, et comment savoir en cinq minutes si le jeu en vaut la chandelle.',
    body: [
      { h2: 'Ce qui fait varier le prix' },
      { p: 'Le prix d’une automatisation dépend moins de la technologie que du nombre d’étapes et d’outils à relier. Quatre critères comptent surtout :' },
      { ul: [
        'Le nombre d’outils à connecter : relier une boîte mail à un tableur est plus simple que relier un site, un CRM et un logiciel de facturation (voir l’[intégration d’outils entre eux](/services/)).',
        'Le nombre de cas particuliers : une tâche toujours identique coûte moins cher qu’une tâche avec beaucoup d’exceptions.',
        'L’usage de l’intelligence artificielle : lire des PDF ou rédiger des brouillons demande plus de réglages et de tests.',
        'Le niveau de fiabilité attendu : alertes en cas d’erreur, reprise automatique, documentation.',
      ] },

      { h2: 'Le coût de mise en place' },
      { p: 'Chez Axion Studio, chaque projet est chiffré au forfait après un audit gratuit de 30 minutes, et démarre à 150 €. Une automatisation simple, qui relie deux outils sur une tâche répétitive, se situe dans le bas de la fourchette ; un projet qui combine plusieurs logiciels et de l’IA demande davantage de travail. Le prix exact figure dans la proposition ([voir comment elle est construite](/methode/)), avant tout engagement, et il ne bouge pas en cours de route. Le détail est sur la page [Tarifs](/tarifs/).' },

      { h2: 'Les coûts récurrents à prévoir' },
      { p: 'Une fois en place, une automatisation a généralement deux types de coûts mensuels :' },
      { ul: [
        'L’abonnement aux outils : outil d’automatisation (n8n, Make, Zapier…) et, le cas échéant, service d’IA. Il est [souscrit à votre nom, sur vos propres comptes](/securite/) ; certains usages restent dans les offres gratuites, d’autres non.',
        'Le suivi, si vous le souhaitez : surveillance, corrections et petites évolutions. Il est facultatif et sans engagement.',
      ] },
      { note: 'Les tarifs des outils évoluent souvent : la proposition indique toujours leur coût estimé, vérifié au moment du projet.' },

      { h2: 'Calculer si c’est rentable : la méthode en 3 étapes' },
      { ol: [
        'Estimez le temps passé sur la tâche, en minutes par semaine. Soyez honnête : comptez aussi les interruptions et les reprises.',
        'Multipliez par 47 semaines travaillées pour obtenir les heures par an, puis par la valeur d’une heure de votre temps.',
        'Comparez ce montant au coût de mise en place et aux abonnements sur un an.',
      ] },
      { p: 'Exemple de calcul, avec des chiffres d’illustration : une tâche qui prend 2 heures par semaine représente environ 94 heures par an. Si une heure de votre temps vaut 40 €, cela fait près de 3 760 € de temps par an consacrés à cette tâche. Même en retirant le coût de l’automatisation et des outils, le gain est rapide. À l’inverse, une tâche de 10 minutes par mois ne mérite souvent pas d’être automatisée.' },
      { p: 'Vous pouvez faire l’exercice en quelques secondes avec la semaine type de la [page d’accueil](/) : touchez vos tâches, elle calcule le temps récupérable par semaine et par an.' },

      { h2: 'Ce qui ne se chiffre pas, mais compte' },
      { p: 'Le temps gagné n’est pas le seul bénéfice : moins d’oublis (une relance qui part toujours à l’heure), moins d’erreurs de recopie, des clients qui reçoivent une réponse plus vite, et l’esprit plus libre pour le travail qui compte vraiment.' },

      { h2: 'Le bon réflexe' },
      { p: 'Commencez par la tâche qui vous coûte le plus de temps, et faites-la chiffrer. Si le gain ne justifie pas le coût, un bon prestataire doit vous le dire. C’est l’objet de l’[audit gratuit de 30 minutes](/contact/) : repartir avec une liste claire de ce qui vaut la peine d’être automatisé, et de ce qui ne l’est pas. Délais, outils, pannes : les autres réponses sont dans la [foire aux questions](/faq/).' },
    ],
    faq: [
      { q: 'Combien coûte la mise en place d’une automatisation chez Axion Studio ?', a: 'Chaque projet est chiffré au forfait après un audit gratuit de 30 minutes et démarre à 150 €. Le prix exact figure dans la proposition, avant tout engagement, et ne change pas en cours de projet.' },
      { q: 'Quels coûts mensuels prévoir après la mise en place ?', a: 'L’abonnement aux outils (n8n, Make, Zapier, service d’IA), souscrit à votre nom, et, si vous le souhaitez, un suivi facultatif et sans engagement, à partir de 250 € par mois.' },
      { q: 'Comment savoir si une automatisation sera rentable ?', a: 'Estimez le temps passé sur la tâche chaque semaine, multipliez par 47 semaines puis par la valeur d’une heure de votre temps, et comparez au coût de mise en place et des abonnements sur un an. Une tâche de 10 minutes par mois ne mérite souvent pas d’être automatisée.' },
    ],
  },
  {
    slug: 'taches-a-automatiser-tpe',
    seoTitle: '5 tâches à automatiser en priorité (TPE)',              // titre pour Google (≤ 45 caractères)
    seoDescription: 'Devis, relances, justificatifs, reporting, réponses récurrentes : les 5 tâches qui font gagner le plus de temps une fois automatisées.',
    title: '5 tâches à automatiser en priorité dans une petite entreprise',
    description: 'Devis, relances de factures, classement des justificatifs, reporting, réponses récurrentes : les tâches qui rapportent le plus de temps quand on les automatise, et comment s’y prendre.',
    date: '2026-11-04',
    category: 'Automatisation',
    lead: 'Dans une petite entreprise, le temps perdu ne vient pas d’une grosse tâche, mais d’une dizaine de petites qui reviennent chaque semaine. Voici les cinq qui méritent d’être automatisées en premier, parce qu’elles sont fréquentes, répétitives et faciles à fiabiliser.',
    body: [
      { h2: 'Comment repérer une tâche à automatiser' },
      { p: 'Une bonne candidate coche trois cases : elle revient au moins chaque semaine, elle suit toujours les mêmes étapes, et ses informations existent déjà quelque part sous forme numérique (un e-mail, un formulaire, un tableur, un PDF). Si vous recopiez une information d’un outil vers un autre, c’est presque toujours automatisable.' },
      { note: 'Le bon réflexe : notez pendant une semaine chaque tâche que vous faites « encore une fois ». La liste qui en sort est votre feuille de route.' },

      { h2: '1. Le traitement des demandes de devis' },
      { p: 'Une demande arrive par le site, une autre par e-mail, une troisième par téléphone. Il faut la noter, créer la fiche du client, puis rédiger le devis. L’automatisation regroupe toutes les demandes au même endroit, crée la fiche client dans votre CRM ou votre tableur, et prépare un brouillon de devis à partir de vos tarifs. Vous n’avez plus qu’à relire et envoyer.' },

      { h2: '2. Les relances de factures impayées' },
      { p: 'Relancer est désagréable, donc on le reporte. Une automatisation envoie un rappel aimable quelques jours avant l’échéance, une relance courte le lendemain, puis une relance plus ferme une dizaine de jours après, avec le ton que vous avez choisi. Elle s’arrête dès que le paiement est enregistré. Résultat : moins d’oublis, et une trésorerie plus régulière.' },

      { h2: '3. Le classement des factures et justificatifs' },
      { p: 'Les PDF s’accumulent dans la boîte mail et sont rangés à la main en fin de mois. Ici, l’intelligence artificielle est vraiment utile : elle lit chaque document, en extrait le fournisseur, la date et le montant, le renomme, le range dans le bon dossier et reporte les montants dans votre tableau de suivi ou celui de votre comptable. Le circuit complet figure parmi les [exemples d’automatisation pour TPE](/exemples/).' },

      { h2: '4. Le reporting hebdomadaire' },
      { p: 'Le lundi matin, beaucoup de dirigeants assemblent les chiffres de trois outils différents : ventes, rendez-vous, devis en cours. Un récapitulatif automatique arrive à la place dans votre boîte mail, toujours au même format. Vous gardez l’analyse, la machine fait la collecte.' },

      { h2: '5. Les réponses aux questions qui reviennent' },
      { p: 'Horaires, délais, documents à fournir, suivi de commande : une bonne partie des e-mails reçus posent les mêmes questions. Une automatisation peut classer les messages entrants par type de demande et préparer une réponse que vous relisez avant envoi. Le client est servi plus vite, et vous gardez la main. C’est l’un des usages de l’[intelligence artificielle pour TPE et PME](/services/) que je mets en place.' },

      { h2: 'Par où commencer ?' },
      { p: 'Commencez par une seule tâche, celle qui vous agace le plus. Une première automatisation simple se met en place en une à deux semaines, tests compris, et sert ensuite de base aux suivantes. Les [étapes, de l’audit gratuit au suivi](/methode/) sont détaillées à part. Vous ne savez pas laquelle choisir ? C’est exactement l’objet de l’[audit gratuit de 30 minutes](/contact/) : on regarde votre semaine type et on fixe ensemble l’ordre de priorité.' },
    ],
    faq: [
      { q: 'Quelles tâches automatiser en premier dans une petite entreprise ?', a: 'Le traitement des demandes de devis, les relances de factures impayées, le classement des factures et justificatifs, le reporting hebdomadaire et les réponses aux questions qui reviennent.' },
      { q: 'Comment savoir si une tâche peut être automatisée ?', a: 'Elle revient au moins chaque semaine, suit toujours les mêmes étapes et ses informations existent déjà sous forme numérique (e-mail, formulaire, tableur, PDF). Recopier une information d’un outil à un autre est presque toujours automatisable.' },
      { q: 'Combien de temps pour mettre en place une première automatisation ?', a: 'Une automatisation simple se met en place en une à deux semaines, tests compris, et sert ensuite de base aux suivantes.' },
    ],
  },
  {
    slug: 'n8n-make-zapier-comparatif',
    seoTitle: 'n8n, Make ou Zapier : lequel choisir ?',              // titre pour Google (≤ 45 caractères)
    seoDescription: 'Comparatif simple de n8n, Make et Zapier pour les TPE et PME : facilité, coût, hébergement des données, et comment choisir sans se tromper.',
    title: 'n8n, Make ou Zapier : quel outil choisir pour automatiser votre entreprise ?',
    description: 'Comparatif simple des trois principaux outils d’automatisation pour les TPE et PME : facilité, prix, hébergement des données, cas d’usage. Et comment choisir sans se tromper.',
    date: '2026-11-04',
    category: 'Outils',
    lead: 'Pour relier vos logiciels entre eux sans développement sur mesure, trois outils dominent : Zapier, Make et n8n. Ils font globalement la même chose, mais pas de la même façon. Voici comment les distinguer et choisir celui qui convient à votre activité.',
    body: [
      { h2: 'Ce que font ces outils' },
      { p: 'Tous les trois fonctionnent sur le même principe : un déclencheur (un e-mail reçu, un formulaire rempli, une ligne ajoutée dans un tableur…) lance une suite d’actions dans d’autres logiciels (créer un contact, envoyer un message, mettre à jour une facture…). On appelle cette suite un workflow, ou un scénario.' },

      { h2: 'Zapier : le plus simple à prendre en main' },
      { p: 'Zapier est le plus connu et le plus accessible. Il se connecte à un très grand nombre d’applications et se configure en quelques clics. En contrepartie, il devient vite coûteux quand le nombre d’actions augmente, et il est moins souple pour les enchaînements complexes.' },
      { ul: ['Idéal pour : quelques automatisations simples entre des outils courants.', 'Points d’attention : coût qui grimpe avec le volume, logique avancée limitée.'] },

      { h2: 'Make : le plus visuel' },
      { p: 'Make (anciennement Integromat) présente chaque scénario sous forme de schéma, ce qui le rend très lisible. Il gère bien les traitements plus riches (conditions, boucles, transformations de données) et reste généralement plus économique que Zapier à volume égal.' },
      { ul: ['Idéal pour : des scénarios de complexité moyenne, avec plusieurs étapes et conditions.', 'Points d’attention : un peu plus d’apprentissage au départ.'] },

      { h2: 'n8n : le plus libre' },
      { p: 'n8n peut s’utiliser en ligne ou être installé sur votre propre serveur. Cette seconde option est précieuse quand vos données sont sensibles : elles restent sous votre contrôle, et le coût ne dépend plus du nombre d’exécutions. n8n est aussi très à l’aise avec l’intelligence artificielle et les appels d’API. Je détaille ces usages sur la page [agence n8n pour TPE et PME](/agence-n8n/).' },
      { ul: ['Idéal pour : des volumes importants, des données à garder chez soi, des workflows avec de l’IA.', 'Points d’attention : un hébergement à prévoir et à maintenir si vous l’installez vous-même.'] },

      { h2: 'Comment choisir' },
      { ol: [
        'Partez de vos outils actuels : vérifiez que ceux que vous utilisez chaque jour sont bien pris en charge.',
        'Estimez le volume : quelques dizaines d’exécutions par mois ou plusieurs milliers ? Le modèle de prix change tout.',
        'Regardez la sensibilité des données : données clients, santé, finances… plus elles sont sensibles, plus l’hébergement compte (voir mes règles d’[hébergement en Europe quand c’est possible](/securite/)).',
        'Pensez à la reprise : choisissez un outil que vous ou quelqu’un d’autre pourrez comprendre et faire évoluer.',
      ] },
      { note: 'Les tarifs de ces outils évoluent souvent : consultez toujours leur page de prix à jour avant de vous décider.' },
      { p: 'Il n’y a pas de meilleur outil dans l’absolu, seulement un outil adapté à votre situation. Chez Axion Studio, le choix se fait pendant l’audit, en fonction de vos logiciels, de vos volumes et de vos données, et l’abonnement reste toujours à votre nom. [Voir les services](/services/) ou [demander un audit gratuit](/contact/).' },
    ],
    faq: [
      { q: 'Quelle est la différence entre n8n, Make et Zapier ?', a: 'Zapier est le plus simple à prendre en main mais son coût grimpe avec le volume. Make présente chaque scénario sous forme de schéma et reste généralement plus économique à volume égal. n8n peut être installé sur votre propre serveur, et son coût ne dépend alors plus du nombre d’exécutions.' },
      { q: 'Quel outil d’automatisation choisir quand les données sont sensibles ?', a: 'n8n installé sur votre propre serveur garde les données sous votre contrôle. Il faut alors prévoir un hébergement à maintenir.' },
      { q: 'Sur quels critères choisir son outil d’automatisation ?', a: 'Les logiciels que vous utilisez déjà, le volume d’exécutions par mois, la sensibilité des données et la facilité de reprise par vous ou par quelqu’un d’autre.' },
    ],
  },
  {
    slug: 'ia-donnees-clients-regles',
    seoTitle: 'IA et données clients : 6 règles sûres',              // titre pour Google (≤ 45 caractères)
    seoDescription: 'Utiliser l’IA dans une petite entreprise sans exposer les données de ses clients : 6 bonnes pratiques simples à appliquer.',
    title: 'IA et données clients : 6 règles pour l’utiliser sans risque',
    description: 'Utiliser l’intelligence artificielle dans une petite entreprise sans exposer les données de ses clients : les bonnes pratiques à appliquer, simplement.',
    date: '2026-11-04',
    category: 'IA et sécurité',
    lead: 'L’intelligence artificielle fait gagner un temps réel pour lire, trier, résumer ou rédiger. Mais dès qu’elle touche aux données de vos clients, quelques règles simples évitent les mauvaises surprises. Les voici.',
    body: [
      { h2: '1. N’envoyer que les informations utiles' },
      { p: 'Pour classer un e-mail par type de demande, l’IA n’a pas besoin du numéro de téléphone ni de l’adresse du client. Avant chaque usage, posez-vous la question : de quoi a-t-elle réellement besoin pour faire la tâche ? Tout le reste peut être retiré ou masqué avant l’envoi.' },

      { h2: '2. Choisir des offres professionnelles' },
      { p: 'Les versions gratuites des services d’IA peuvent utiliser vos échanges pour améliorer leurs produits. Les offres professionnelles et les API payantes s’engagent généralement à ne pas le faire. Lisez les conditions de chaque service, et privilégiez ceux qui le garantissent par écrit.' },

      { h2: '3. Garder les données sensibles à l’écart' },
      { p: 'Données de santé, informations bancaires, mots de passe, pièces d’identité : ces informations n’ont rien à faire dans un outil d’IA généraliste sans un cadre précis et l’accord des personnes concernées.' },

      { h2: '4. Garder un humain dans la boucle' },
      { p: 'L’IA peut se tromper, avec beaucoup d’assurance. Pour tout ce qui part chez un client (une réponse, un devis, une relance), la bonne pratique est de faire préparer un brouillon par l’IA, puis de le relire avant l’envoi.' },

      { h2: '5. Informer vos clients' },
      { p: 'Si vous utilisez un outil d’IA pour traiter leurs demandes, dites-le simplement dans votre politique de confidentialité : quelles données, pour quoi faire, et avec quel prestataire. La transparence rassure, et c’est une exigence du RGPD. Les autres points à vérifier (registre, contrat avec chaque prestataire, durée de conservation) sont détaillés dans [RGPD et automatisation : ce qu’une TPE doit vérifier](/blog/rgpd-automatisation-tpe/).' },

      { h2: '6. Pouvoir tout arrêter' },
      { p: 'Les comptes, les clés d’accès et les automatisations doivent être à votre nom. Vous devez pouvoir retirer un accès ou couper un service en quelques minutes, sans dépendre de personne.' },

      { note: 'Ces conseils sont des bonnes pratiques générales, pas un avis juridique. Pour une situation particulière, rapprochez-vous de la CNIL (cnil.fr) ou d’un professionnel du droit.' },
      { p: 'Ce sont exactement les règles appliquées sur chaque projet Axion Studio : elles sont détaillées sur la page [Sécurité et données](/securite/). Les [questions fréquentes sur l’automatisation et l’IA](/faq/) répondent aux cas les plus courants. Une question sur votre cas ? [Écrivez-moi](/contact/).' },
    ],
    faq: [
      { q: 'Peut-on utiliser l’IA avec les données de ses clients ?', a: 'Oui, avec des précautions : n’envoyer que les informations utiles à la tâche, choisir des offres professionnelles, tenir les données sensibles à l’écart, relire avant tout envoi au client, informer les clients et garder la possibilité de tout arrêter.' },
      { q: 'Les versions gratuites des outils d’IA posent-elles un problème ?', a: 'Elles peuvent utiliser vos échanges pour améliorer leurs produits. Les offres professionnelles et les API payantes s’engagent généralement à ne pas le faire : lisez les conditions de chaque service.' },
      { q: 'Faut-il dire à ses clients qu’on utilise l’IA ?', a: 'Oui, dans la politique de confidentialité : quelles données, pour quoi faire et avec quel prestataire. C’est une exigence du RGPD.' },
    ],
  },
]

const words = p => [p.lead, ...p.body.flatMap(b => b.h2 || b.p || b.note || b.ul || b.ol || [])].join(' ').split(/\s+/).length
export const readingMinutes = p => Math.max(1, Math.round(words(p) / 200))
export const wordCount = words
export const formatDate = iso => new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
