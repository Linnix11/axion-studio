import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH : sous-dossier où le site est servi (ex. /axion-studio/ sur GitHub Pages).
// Laisser vide pour un domaine dédié comme axionstudio.fr.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
