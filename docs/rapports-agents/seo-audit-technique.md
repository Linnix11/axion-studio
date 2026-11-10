# Audit technique SEO (10 novembre 2026)

Analyse des 28 pages de `dist/` (build déjà à jour, identique au site en ligne : même fichier CSS `index-rlL5OlfH.css`, même plan du site) et vérification en lecture de https://axionstudio.fr.

## Ce qui est déjà bon

- Les 28 pages ont un seul H1, un titre de 60 caractères maximum, une description de 160 maximum, sans doublon, et un canonical exact avec « / » final.
- Aucun lien interne cassé ni sans « / » final ; le plan du site contient exactement les 28 pages ; aucune image sans texte alternatif.
- En ligne : http et www redirigent vers https://axionstudio.fr/, une adresse sans « / » redirige en 301 vers la bonne, une page inconnue renvoie une vraie erreur 404 marquée « noindex ».

## À corriger, par ordre d'importance

| # | Problème | Page(s) | Correction proposée |
|---|---|---|---|
| 1 | Page jamais citée dans le texte des autres pages (seulement dans le menu et le pied de page) | `/a-propos/` | Ajouter un lien « qui suis-je » vers `/a-propos/` dans le texte de l'accueil, de `/methode/` et de `/contact/` (agent seo-maillage-interne). |
| 2 | Pages principales citées dans le texte d'une seule page (règle : au moins 3) | `/exemples/`, `/methode/`, `/faq/` (1 page chacune), `/services/` (2 pages) | Ajouter des liens naturels dans le contenu : `/exemples/` depuis les pages métier et `/tarifs/` ; `/methode/` depuis `/tarifs/` et `/services/` ; `/faq/` depuis `/contact/` et `/services/` ; `/services/` depuis `/tarifs/` et les articles. |
| 3 | Accueil et page du blog cités dans le texte de 0 ou 1 page | `/` (1), `/blog/` (0) | Faible impact (présents dans le menu et le fil d'Ariane). Optionnel : en fin d'article, un lien « Tous les articles » vers `/blog/`. |
| 4 | H1 très courts, sans mot-clé, alors que le titre en contient | `/a-propos/` (« À propos »), `/exemples/` (« Exemples »), `/methode/` (« Méthode »), `/blog/` (« Blog ») | Allonger le H1 avec le sujet, par exemple « Exemples d'automatisation pour TPE », « Blog : automatisation et IA pour TPE » (agent seo-titres-descriptions). |
| 5 | Double redirection pour l'ancienne adresse http + www | `http://www.axionstudio.fr/…` | Passe par `https://www…` puis `https://axionstudio.fr/…` (2 sauts). Si Hostinger le permet, rediriger directement vers `https://axionstudio.fr/` en un saut. Impact faible. |
| 6 | `/index.html` répond aussi (200) en plus de `/` | `/index.html` | Sans gravité : le canonical pointe bien vers `/`. Rien à faire, sauf si Search Console signale un doublon. |

Pages de règles (`/cgv/`, `/mentions-legales/`, `/confidentialite/`) : peu de liens dans le texte, c'est normal, rien à faire.
