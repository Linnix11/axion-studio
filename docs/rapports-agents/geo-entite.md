# Rapport de l'agent geo-entite (10 novembre 2026)

Objet : vérifier que l'identité d'Axion Studio est la même partout, avant la création des fiches externes
(Google Business, LinkedIn, Malt, Codeur.com, PagesJaunes, annuaires). Aucune fiche n'existe encore
(`company.profils` est vide), la comparaison porte donc sur le site lui-même.

Sources relues : `src/data.js` (company), `src/seo.js`, `src/legal.js`, `scripts/prerender-routes.mjs`,
les 29 pages HTML de `dist/` (texte visible et JSON-LD), `dist/llms.txt`, `dist/llms-full.txt`,
`dist/mentions-legales/`, `docs/kit-profils.md`, `marketing/banners/*.html`.
Aucun fichier du projet n'a été modifié (consigne de la session) : `docs/plan-seo-ia.md` n'a donc pas été mis à jour.

## 1. Verdict

L'identité est très cohérente. Sur tout `dist/` :
- une seule adresse e-mail (`arthur.champagne@icloud.com`, 98 occurrences) ;
- un seul téléphone (`06 48 61 23 50` à l'écran, `+33648612350` dans les liens et le JSON-LD) ;
- un seul nom de dirigeant, toujours avec trait d'union : « Arthur Champagne-Forterre » (64 occurrences) ;
- une seule adresse : « 5 allée des Pommiers, 95680 Montlignon » ;
- un seul bloc entreprise (`ProfessionalService`, `@id https://axionstudio.fr/#entreprise`) identique sur les 29 pages, JSON-LD valide partout ;
- le bloc `Person` (Arthur) n'apparaît que sur `/a-propos/`, relié à l'entreprise par `founder` / `worksFor`.

Les seuls autres numéros et e-mails trouvés (`06 00 00 00 00`, `c.martin@exemple.fr`) sont ceux de l'exemple fictif
« Claire Martin » de la démonstration de l'accueil : sans effet sur l'identité.

## 2. Écarts trouvés (à trancher par Arthur)

| # | Écart | Où | Importance |
|---|---|---|---|
| 1 | **Nom commercial contradictoire.** Mentions légales, accueil et À propos : nom commercial « axionstudio » (JSON-LD `alternateName`). CGV (`src/legal.js`, article 1, repris dans `llms-full.txt`) : « Axion Studio, nom commercial d'Arthur Champagne-Forterre ». | `src/data.js` (`tradeName`), `src/legal.js` | Haute : c'est une mention légale. Il faut garder la forme exacte déclarée lors de l'immatriculation (avis de situation INSEE / guichet unique) et l'écrire pareil dans les CGV et les mentions. |
| 2 | **SIRET absent** (« En cours d'attribution »). Malt, PagesJaunes et la plupart des annuaires le demandent. | `src/data.js` (`siret`), mentions légales, À propos | Haute dès réception : le reporter le même jour dans `src/data.js` et sur chaque fiche déjà créée. |
| 3 | **Aucun `sameAs`** : normal tant que `company.profils` est vide. Mais `company.profils` ne nourrit que le bloc entreprise : le bloc `Person` (Arthur) n'a pas de champ `sameAs`, alors que le profil LinkedIn personnel décrit Arthur, pas l'entreprise. | `src/seo.js` (objet `person`) | Moyenne : au moment d'ajouter les profils, prévoir un `sameAs` pour Arthur (profil LinkedIn personnel, Malt) distinct de celui de l'entreprise (page LinkedIn, fiche Google, PagesJaunes). Changement à faire par l'agent seo-donnees-structurees sur une branche. |
| 4 | **`llms.txt` ne liste ni l'adresse postale ni les profils.** La rubrique Contact donne e-mail, téléphone et zone ; l'adresse complète n'est que dans `llms-full.txt`. Aucun profil externe n'y figure (aucun n'existe encore). | `scripts/prerender-routes.mjs` (lignes 111 à 114) | Basse : quand des profils existent, les ajouter aussi à `llms.txt` (une ligne « Profils : … »). Pour l'agent geo-llms-txt. |
| 5 | **Description de l'entreprise : trois formulations proches mais différentes.** JSON-LD : « Agence d'automatisation et d'IA pour les TPE, PME et indépendants : workflows n8n, … ». `llms.txt` : « agence d'automatisation et d'IA indépendante, spécialiste de n8n … ». Kit des fiches : « Automatisation et IA pour TPE, PME et indépendants … » (sans le mot « agence » ni « n8n »). | `src/seo.js`, `scripts/prerender-routes.mjs`, `docs/kit-profils.md` | Basse : pas d'erreur de fait, mais les IA recoupent mieux une même catégorie. Suggestion : faire commencer les fiches par « Agence d'automatisation et d'IA » comme le site (voir section 4). |
| 6 | **Caractère invisible dans l'e-mail affiché** : dans le formulaire de contact (pied des pages Contact, À propos, Confidentialité…), l'adresse est écrite avec une espace de largeur nulle après « @ » pour permettre le retour à la ligne. Le lien `mailto:` est juste, mais un visiteur qui copie le texte obtient une adresse invalide. | `src/components/ContactForm.jsx` ligne 178 | Basse : remplacer par une balise `<wbr>` ou une coupure CSS (`overflow-wrap: anywhere`). |

Points vérifiés sans écart : statut (« entrepreneur individuel, micro-entreprise », TVA non applicable art. 293 B du CGI),
zone (Montlignon, Val-d'Oise, Île-de-France, France entière à distance), prix d'appel (audit gratuit de 30 min,
projets dès 150 €), délai de réponse (24 heures ouvrées), site `https://axionstudio.fr/`, hébergeur, bannières
(`marketing/banners/` : seulement « Axion Studio » et « axionstudio.fr »).

## 3. Ce que chaque future fiche doit reprendre à l'identique

Valeurs de référence (celles du site, déjà reprises dans `docs/kit-profils.md`) :

| Champ | À écrire exactement | Remarque |
|---|---|---|
| Nom de l'entreprise | `Axion Studio` | Avec espace et majuscules. Jamais « axionstudio », « AxionStudio » ni de mot-clé ajouté (« Axion Studio automatisation » est interdit sur Google Business). |
| Dirigeant | `Arthur Champagne-Forterre` | Toujours avec le trait d'union, y compris sur le profil LinkedIn personnel et Malt. |
| Adresse | `5 allée des Pommiers, 95680 Montlignon` | Sur Google Business : saisie puis masquée (zone desservie), comme prévu dans le kit. |
| Téléphone | `06 48 61 23 50` | Sur les plateformes internationales (LinkedIn) : `+33 6 48 61 23 50`. Même numéro. |
| E-mail | `arthur.champagne@icloud.com` | Règle 7 : la seule adresse tant qu'il n'existe pas d'adresse @axionstudio.fr. |
| Site | `https://axionstudio.fr/` | Toujours en https, sans « www ». Pour Google Business, le lien de bouton peut viser `https://axionstudio.fr/contact/`. |
| Zone | France entière à distance ; déplacements en Île-de-France ; basé à Montlignon (Val-d'Oise) | Identique au JSON-LD `areaServed`. |
| Statut | Entrepreneur individuel (micro-entreprise) | Ajouter le SIRET dès qu'il est attribué, le même partout. |
| Logo | `marketing/banners/google-logo-720x720.png` (ou `public/logo.png`) | Le même visuel partout. |
| Descriptions | Courte (145 car.), moyenne (303 car.), longue (725 car.) du kit | Copier sans retoucher. Les faits (audit 30 min, dès 150 €, Montlignon, France entière) sont conformes au site. |
| Services | Les 5 lignes du kit | Conformes aux 4 services du site plus l'audit. |
| Fondateur / titre | Le kit donne pour LinkedIn « Automatisation et IA pour TPE et PME · Fondateur d'Axion Studio » | Le JSON-LD dit « Consultant en automatisation et intelligence artificielle ». Compatible ; garder « Fondateur d'Axion Studio » dans chaque profil personnel pour relier la personne à l'entreprise. |

## 4. Suggestion (facultative) pour le kit

Pour que la catégorie soit la même que sur le site et dans `llms.txt`, la description courte pourrait commencer par
le même groupe de mots. Exemple (143 caractères) :

> Agence d'automatisation et d'IA pour TPE, PME et indépendants : devis, relances, factures, reporting. Audit gratuit de 30 min, prix fixé avant.

À valider par Arthur avant de modifier `docs/kit-profils.md`.

## 5. À faire après la création de chaque fiche

1. Envoyer l'adresse exacte du profil (URL publique) pour l'ajouter à `company.profils` dans `src/data.js` :
   elle sera reprise automatiquement en `sameAs` du bloc entreprise sur toutes les pages.
2. Pour le profil LinkedIn personnel et Malt : prévoir un `sameAs` sur le bloc `Person` (écart n° 3).
3. Relancer l'agent geo-entite avec les adresses des fiches : il comparera champ par champ (nom, adresse,
   téléphone, description, lien) et listera chaque écart.
4. Rebuild puis publication uniquement après le « publie » d'Arthur.

## 6. Actions proposées, par ordre

1. Arthur : confirmer le nom commercial officiel (« Axion Studio » ou « axionstudio ») ; corriger ensuite `tradeName` ou les CGV pour qu'ils disent la même chose.
2. Arthur : renseigner le SIRET dès réception.
3. Arthur : créer les fiches avec les valeurs de la section 3, puis envoyer leurs adresses.
4. Agent seo-donnees-structurees (sur branche) : `sameAs` séparé pour le bloc `Person`.
5. Agent geo-llms-txt (sur branche) : ligne « Profils » dans `llms.txt` quand des profils existent.
6. Correction mineure : espace invisible de l'e-mail dans `ContactForm.jsx`.
