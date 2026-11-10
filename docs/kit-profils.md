# Kit des fiches et profils Axion Studio

Textes prêts à copier-coller pour l'étape 1 et l'étape 4 du plan SEO/IA (`docs/plan-seo-ia.md`).
Règle d'or : **le même nom, la même adresse, le même téléphone et la même description partout**.
Les moteurs et les IA recoupent ces informations ; une incohérence les fait douter.

Après chaque profil créé, envoyez son adresse : elle sera ajoutée à `company.profils` (`src/data.js`),
que Google et les IA lisent comme « ces profils sont bien cette entreprise ».

## Informations communes

| Champ | Valeur |
|---|---|
| Nom | Axion Studio |
| Dirigeant | Arthur Champagne-Forterre |
| Adresse | 5 allée des Pommiers, 95680 Montlignon |
| Téléphone | 06 48 61 23 50 |
| E-mail | arthur.champagne@icloud.com |
| Site | https://axionstudio.fr |
| Zone | France entière à distance ; déplacements en Île-de-France |
| Statut | Entrepreneur individuel (micro-entreprise) |

**Description courte (150 caractères)**
> Automatisation et IA pour TPE, PME et indépendants : devis, relances, factures, reporting. Audit gratuit de 30 min, prix fixé avant de commencer.

**Description moyenne (300 caractères)**
> Axion Studio automatise le travail administratif des TPE, PME et indépendants : demandes de devis, relances, factures, reporting, réponses récurrentes. Vos outils actuels sont reliés entre eux, avec de l'IA quand c'est utile. Audit gratuit de 30 minutes, projets au forfait dès 150 €, partout en France.

**Description longue (750 caractères, limite de la fiche Google)**
> Axion Studio aide les TPE, PME et indépendants à se libérer des tâches administratives répétitives. Demandes de devis rangées toutes seules, relances de factures qui partent à date fixe, factures fournisseurs classées et transmises au comptable, rendez-vous dans l'agenda avec rappel au client : chaque automatisation relie les outils que vous utilisez déjà (messagerie, agenda, tableur, CRM, logiciel de facturation), avec de l'intelligence artificielle quand elle fait vraiment gagner du temps. Chaque projet commence par un audit gratuit de 30 minutes, le prix est fixé avant de commencer et vous gardez tout : comptes, workflows et documentation. Basé à Montlignon (Val-d'Oise), j'interviens partout en France à distance.

**Services (une ligne chacun)**
- Workflows automatisés (relances, facturation, reporting, saisie de données)
- Intégration d'outils (CRM, tableur, messagerie, agenda, facturation)
- Intelligence artificielle en entreprise (tri d'e-mails, lecture de documents, réponses assistées)
- Création de sites web reliés à vos outils
- Audit gratuit de 30 minutes

## Étape 1 — à faire en premier

### 1. Hostinger : laisser passer les robots de Bing et d'OpenAI (10 min)
hPanel → Sites web → axionstudio.fr → cherchez la protection contre les robots (souvent dans « Sécurité » ou
« Performance », parfois appelée protection anti-bots, mode « sous attaque » ou pare-feu). Désactivez-la ou
ajoutez une exception pour **Bingbot** et **GPTBot**. Si vous ne trouvez pas : chat du support Hostinger, phrase à coller :
> Bonjour, la protection anti-robots de mon site axionstudio.fr renvoie des erreurs 403 à Bingbot et 429 à GPTBot. Pouvez-vous autoriser les robots d'indexation des moteurs de recherche et des IA (Bingbot, Googlebot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) ? Merci.

### 2. Google Search Console (10 min)
1. https://search.google.com/search-console → « Ajouter une propriété » → **Préfixe d'URL** → `https://axionstudio.fr`.
2. Méthode de validation **« Balise HTML »** : copiez la balise `<meta name="google-site-verification" …>` et envoyez-la ; elle sera ajoutée au site et publiée, puis vous cliquerez sur « Valider ».
3. Menu « Sitemaps » → saisissez `sitemap.xml` → Envoyer.

### 3. Bing Webmaster Tools (5 min)
https://www.bing.com/webmasters → connexion → « Importer depuis Google Search Console » (une fois l'étape 2 validée).
Bing alimente ChatGPT, Copilot et DuckDuckGo.

### 4. Fiche Google Business Profile (20 min + vérification par Google)
https://business.google.com → Ajouter une entreprise.
- Nom : **Axion Studio** (rien d'autre : pas de mots-clés ajoutés au nom, c'est interdit).
- Catégorie principale : **Consultant en informatique** ; catégories secondaires : Concepteur de sites web, Service de conseil aux entreprises.
- « Je livre des produits ou fournis des services à mes clients » : **oui** ; zone desservie : Île-de-France, puis France.
- Masquer l'adresse (vous ne recevez pas de clients sur place).
- Description : la description longue ci-dessus. Site : https://axionstudio.fr. Téléphone : 06 48 61 23 50.
- Photos : `marketing/banners/google-logo-720x720.png` (logo), `google-couverture-1024x576.png` (couverture).
- Première publication : `google-publication-audit-1200x900.png` avec la description courte et un bouton « En savoir plus » vers https://axionstudio.fr/contact/.
- Google demande une vérification (vidéo, appel ou courrier) : seule la personne qui gère l'entreprise peut la faire.

## Étape 4 — profils et annuaires (1 h par semaine)

| Plateforme | Ce qu'il faut remplir |
|---|---|
| **LinkedIn — profil d'Arthur** | Titre : « Automatisation et IA pour TPE et PME · Fondateur d'Axion Studio ». Infos : description moyenne. Bannière : `linkedin-profil-1584x396.png`. Section Services : la liste ci-dessus. Lien : https://axionstudio.fr |
| **LinkedIn — page Axion Studio** | Slogan : description courte. À propos : description longue. Couverture : `linkedin-page-1128x191.png`. Secteur : Services et conseil en informatique |
| **Malt** | Titre : « Consultant automatisation n8n / Make et IA pour TPE-PME ». Présentation : description longue. Compétences : n8n, Make, Zapier, API, automatisation, intégration IA, Google Workspace, Microsoft 365 |
| **Codeur.com** | Même titre et présentation que Malt |
| **PagesJaunes (Solocal)** | Fiche gratuite : activité « Conseil en informatique », description moyenne, zone Île-de-France |
| **Annuaire des experts n8n** et **partenaires Make** | Description courte + lien vers le site (sur candidature) |
| **CCI Val-d'Oise, mairie de Montlignon, réseaux d'entrepreneurs du 95** | Demander à figurer dans l'annuaire des entreprises locales, avec la description moyenne |

**Avis clients** : à la fin de chaque mois de suivi, envoyer au client le lien « Demander un avis » de la fiche Google.
Jamais d'avis inventés ni de contrepartie.

**LinkedIn, à chaque nouvel article du blog** : 3 lignes qui résument l'idée principale + le lien de l'article.
