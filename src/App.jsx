import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Exemples from './pages/Exemples'
import Methode from './pages/Methode'
import Tarifs from './pages/Tarifs'
import APropos from './pages/APropos'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import MentionsLegales from './pages/MentionsLegales'
import Confidentialite from './pages/Confidentialite'
import Securite from './pages/Securite'
import Cgv from './pages/Cgv'
import Blog from './pages/Blog'
import Article from './pages/Article'
import Metier from './pages/Metier'
import AgenceN8n from './pages/AgenceN8n'
import ChatWidget from './components/ChatWidget'
import NotFound from './pages/NotFound'
// Espace client : chargé à part, seulement quand on l'ouvre (n'alourdit pas le site public)
const EspaceClient = lazy(() => import('./pages/EspaceClient'))
const EspaceAdmin = lazy(() => import('./pages/EspaceAdmin'))
const attente = <div className="mx-auto max-w-[1180px] px-4 py-20 text-lg text-muted md:px-8" role="status">Chargement…</div>

/** Remonte en haut à chaque changement de page, ou va à l’ancre (#...) demandée. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function PageFade() {
  // Rejoue un fondu léger sur le contenu à chaque changement de page (pas au premier affichage : il clignoterait).
  const { pathname } = useLocation()
  const premier = useRef(true)
  useEffect(() => {
    if (premier.current) { premier.current = false; return }
    const main = document.getElementById('contenu')
    if (!main) return
    main.classList.remove('page-fade'); void main.offsetWidth; main.classList.add('page-fade')
  }, [pathname])
  return null
}

/** L'assistant du site n'apparaît pas dans l'espace client. */
function Chat() {
  const { pathname } = useLocation()
  return pathname.startsWith('/espace-client') ? null : <ChatWidget />
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <a href="#contenu" className="absolute -left-[999px] focus:top-4 focus:left-4 focus:z-[100] focus:inline-flex focus:min-h-11 focus:items-center focus:bg-paper focus:px-4">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <PageFade />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/exemples" element={<Exemples />} />
          <Route path="/methode" element={<Methode />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/securite" element={<Securite />} />
          <Route path="/cgv" element={<Cgv />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/automatisation/:slug" element={<Metier />} />
          <Route path="/agence-n8n" element={<AgenceN8n />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/espace-client" element={<Suspense fallback={attente}><EspaceClient /></Suspense>} />
          <Route path="/espace-client/admin" element={<Suspense fallback={attente}><EspaceAdmin /></Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Chat />
    </>
  )
}
