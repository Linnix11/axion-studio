# Rapport de l'agent seo-indexation

Date : 10 novembre 2026. Contrôle en lecture seule : aucun fichier du site modifié, pas de build, rien publié.

## En bref

- Les 28 pages du plan du site existent, répondent normalement (code 200) et se déclarent elles-mêmes comme adresse officielle (canonical). Aucune n'est marquée « ne pas indexer ».
- `robots.txt` est correct : moteurs de recherche et robots des IA autorisés, seul `/api/` est exclu.
- Un seul vrai blocage, déjà connu : la protection anti-robots de Hostinger renvoie 429 (« trop de demandes ») au robot GPTBot d'OpenAI. **Il se règle dans le hPanel, par vous.**
- Le workflow IndexNow (signalement à Bing) est en place.
- Les 10 pages à soumettre demain dans la Search Console sont listées plus bas.

## 1. Plan du site (`sitemap.xml`)

- 28 adresses dans `dist/sitemap.xml`, et 28 pages pré-rendues dans `dist/` (plus `404.html`, à juste titre absente du plan).
- Correspondance exacte : aucune page oubliée, aucune adresse en trop.
- La version en ligne (`https://axionstudio.fr/sitemap.xml`) est identique à celle de `dist/`.
- Toutes les adresses finissent par « / », comme les canonicals : pas de redirection inutile.
- Date `lastmod` seulement sur les 8 articles (vraies dates de publication), conformément à la décision du 10 novembre.

## 2. `robots.txt`

- Identique en ligne et dans `dist/`.
- Autorisés : Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot, Applebot-Extended, DuckAssistBot, MistralAI-User, meta-externalagent, et tous les autres (`*`).
- `/api/` exclu pour tous. L'adresse du plan du site est indiquée en dernière ligne.

## 3. Contrôle en ligne

Testé avec un navigateur normal (Chrome) :

| Contrôle | Résultat |
|---|---|
| Les 28 pages du plan du site | 200, canonical identique à l'adresse, aucun « noindex » |
| `https://axionstudio.fr/services` (sans « / ») | 301 vers `/services/` (normal) |
| `https://www.axionstudio.fr/` et `http://axionstudio.fr/` | 301 vers `https://axionstudio.fr/` (une seule adresse, bien) |
| Page inexistante | 404 (vraie erreur, pas une fausse page 200) |
| `robots.txt`, `llms.txt`, fichier de clé IndexNow | 200 |
| `/api/contact.php` appelé directement | 405 (refusé hors formulaire, normal) |

En imitant l'en-tête de chaque robot :

| Robot | Code | Lecture |
|---|---|---|
| OAI-SearchBot (recherche ChatGPT) | 200 | passe |
| PerplexityBot | 200 | passe |
| ClaudeBot | 200 | passe |
| **GPTBot** (OpenAI) | **429** | **bloqué par Hostinger** |
| Bingbot, Googlebot | 403 | normal dans ce test : Hostinger refuse un faux Googlebot ou Bingbot qui ne vient pas de leurs adresses. Leur accès réel se vérifie avec l'inspection d'URL de la Search Console et de Bing Webmaster Tools. |

**À faire par vous** : hPanel Hostinger, réglages de sécurité du site, assouplir la protection anti-robots (ou autoriser GPTBot). Je ne peux pas le faire à votre place.

## 4. IndexNow

- `.github/workflows/indexnow.yml` existe : à chaque envoi sur `main` qui modifie les textes, il attend 2 minutes puis envoie toutes les adresses du plan du site à IndexNow (Bing et moteurs compatibles).
- Le fichier de clé est bien en ligne (200).
- Non vérifié : le résultat des dernières exécutions (l'outil GitHub n'est pas installé ici). À regarder dans GitHub, onglet « Actions » : la ligne « IndexNow : 28 adresses envoyées → HTTP 200 » ou « 202 » indique que c'est bon.
- Rappel : IndexNow ne sert pas pour Google. Pour Bing, ajouter aussi le site dans Bing Webmaster Tools (toujours à faire).

## 5. Pages à soumettre dans la Search Console

Déjà demandées le 10 novembre (10) : accueil, `/agence-n8n/`, `/services/`, `/tarifs/`, `/automatisation/agences-immobilieres/`, `/automatisation/experts-comptables/`, et les articles facture électronique, relances, devis, rendez-vous.

Restent 18 pages. **À soumettre demain, 11 novembre (10 pages, dans cet ordre)** :

| # | Adresse | Pourquoi maintenant |
|---|---|---|
| 0 | https://axionstudio.fr/blog/lire-factures-fournisseurs-ia/ | Ajouté le 11 nov. : nouvel article |
| 0 | https://axionstudio.fr/blog/rgpd-automatisation-tpe/ | Ajouté le 11 nov. : nouvel article, à soumettre en premier avec l'article chatbot |
| 1 | https://axionstudio.fr/blog/n8n-make-zapier-comparatif/ | Seule page déjà classée (71e sur « n8n make zapier comparatif ») : la faire revisiter peut l'aider à monter |
| 2 | https://axionstudio.fr/automatisation/artisans-batiment/ | Première cible commerciale, mot-clé « automatisation artisan » prévu dans le suivi |
| 3 | https://axionstudio.fr/contact/ | Page de demande d'audit gratuit, la plus utile pour vous |
| 4 | https://axionstudio.fr/exemples/ | Cas concrets, page clé avant la prise de contact |
| 5 | https://axionstudio.fr/automatisation/professions-liberales/ | Page métier neuve |
| 6 | https://axionstudio.fr/automatisation/commerces-restaurants/ | Page métier neuve |
| 7 | https://axionstudio.fr/automatisation/boutiques-en-ligne/ | Page métier neuve |
| 8 | https://axionstudio.fr/blog/ | Liste de tous les articles : aide Google à trouver les 8 articles |
| 9 | https://axionstudio.fr/blog/cout-automatisation-petite-entreprise/ | Question de prix, fréquente avant achat |
| 10 | https://axionstudio.fr/blog/taches-a-automatiser-tpe/ | Sujet large « automatisation TPE », mot-clé suivi |

**Le 12 novembre (5 pages)** : `/a-propos/` (qui est derrière le site, utile pour la confiance et les IA), `/faq/`, `/methode/`, `/securite/`, `/blog/ia-donnees-clients-regles/`.

**Inutile de soumettre** : `/cgv/`, `/mentions-legales/`, `/confidentialite/`. Elles sont dans le plan du site et Google les trouvera seul ; mieux vaut garder les demandes pour les pages qui comptent.

Comment faire (environ 2 minutes par page) : Search Console, barre « Inspecter n'importe quelle URL » en haut, coller l'adresse, attendre, puis « Demander l'indexation ». Si le message « quota dépassé » apparaît, reprendre le lendemain. Une demande accélère la visite de Google mais ne garantit pas l'indexation ; compter quelques jours à quelques semaines. À la fin, noter la date dans `docs/HANDOFF.md` (section Search Console).

## 6. Rien d'autre à corriger dans le site

Aucune modification du code n'est nécessaire pour l'indexation. Les actions restantes sont toutes hors site et à faire par vous :
1. hPanel : débloquer GPTBot (429).
2. Search Console : les 10 pages ci-dessus demain, puis les 5 suivantes.
3. Bing Webmaster Tools : ajouter le site (import depuis la Search Console), puis inspecter 2 ou 3 pages pour confirmer que Bingbot passe.
4. GitHub, onglet « Actions » : vérifier que la dernière exécution IndexNow a répondu 200 ou 202.

Note : mes consignes prévoient de mettre à jour l'avancement dans `docs/plan-seo-ia.md`. Je ne l'ai pas fait, car cette exécution interdisait de modifier les fichiers du projet (d'autres agents travaillent en parallèle).
