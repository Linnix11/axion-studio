// Liste des pages. Le script scripts/prerender-routes.mjs crée un fichier HTML par chemin.
import { pageMeta } from './seo.js'
export const routePaths = Object.keys(pageMeta)
