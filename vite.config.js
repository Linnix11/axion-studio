import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Tests locaux de l'espace client : l'API PHP tourne à part (php -S 127.0.0.1:8099 -t public)
  server: { proxy: { '/api': 'http://127.0.0.1:8099' } },
  preview: { proxy: { '/api': 'http://127.0.0.1:8099' } },
  // Le JS principal fait ~500 Ko (151 Ko compressés) : découpage par page prévu (voir docs/HANDOFF.md, performance).
  // Seuil relevé à 520 Ko pour que l'alerte signale toute vraie hausse sans bloquer le build à 0 avertissement.
  build: { chunkSizeWarningLimit: 520 },
})
