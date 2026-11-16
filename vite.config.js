import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, pathToFileURL } from 'node:url'

// « import … from './blog.js?meta' » : la liste des articles SANS leur texte (titres, dates, temps de lecture).
// Les pages qui n'affichent pas un article l'importent ainsi : les ~110 Ko de texte ne partent qu'avec la page Article.
// Hors Vite (scripts de build en Node), la même adresse charge simplement blog.js complet.
const BLOG = fileURLToPath(new URL('./src/blog.js', import.meta.url))
function blogMeta() {
  return {
    name: 'blog-meta',
    async load(id) {
      if (id !== `${BLOG}?meta`) return
      this.addWatchFile(BLOG)
      const m = await import(`${pathToFileURL(BLOG).href}?t=${Date.now()}`)
      const posts = m.posts.map(({ lead, body, faq, ...meta }) => ({ ...meta, words: m.wordCount({ lead, body }), minutes: m.readingMinutes({ lead, body }) }))
      return `export const posts = ${JSON.stringify(posts)}
export const wordCount = p => p.words
export const readingMinutes = p => p.minutes
export const formatDate = ${m.formatDate}`
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), blogMeta()],
  // Tests locaux de l'espace client : l'API PHP tourne à part (php -S 127.0.0.1:8099 -t public)
  server: { proxy: { '/api': 'http://127.0.0.1:8099' } },
  preview: { proxy: { '/api': 'http://127.0.0.1:8099' } },
  // JS principal : ~425 Ko depuis que le texte des articles part à part (blog.js?meta, page Article chargée à part).
  // Seuil à 450 Ko : l'alerte signale toute vraie hausse.
  build: { chunkSizeWarningLimit: 450 },
})
