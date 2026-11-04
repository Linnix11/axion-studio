// Rendu côté serveur, utilisé uniquement au build (scripts/prerender-routes.mjs) :
// chaque page est écrite en HTML complet, lisible par Google et par les robots des IA sans JavaScript.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
