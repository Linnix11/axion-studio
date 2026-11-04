// Copie dist/index.html dans un dossier par page (dist/services/index.html, ...)
// pour que les liens directs et les rechargements fonctionnent sur un hébergement statique,
// et crée dist/404.html pour les adresses inconnues.
import { copyFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { routePaths } from '../src/routes.js'

const dist = 'dist'
const index = join(dist, 'index.html')
for (const path of routePaths) {
  if (path === '/') continue
  const dir = join(dist, path)
  mkdirSync(dir, { recursive: true })
  copyFileSync(index, join(dir, 'index.html'))
}
copyFileSync(index, join(dist, '404.html'))
console.log(`${routePaths.length - 1} pages + 404.html générées`)
