// Rendu côté serveur, utilisé uniquement au build (scripts/prerender-routes.mjs) :
// chaque page est écrite en HTML complet, lisible par Google et par les robots des IA sans JavaScript.
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

// prerender (et non renderToString) : attend les pages chargées à part (article, espace client) au lieu d'écrire
// « Chargement… ». progressiveChunkSize illimité : sinon React met à part tout bloc de plus de ~12 Ko (un article),
// caché dans la page et remis en place seulement par JavaScript, illisible pour un robot qui ne l'exécute pas.
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    { progressiveChunkSize: Infinity },
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}
