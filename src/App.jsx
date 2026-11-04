import { useEffect } from 'react'
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
import NotFound from './pages/NotFound'

/** Remonte en haut à chaque changement de page, ou va à l'ancre (#...) demandée. */
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

export default function App() {
  return (
    <>
      <ScrollManager />
      <a href="#contenu" className="absolute -left-[999px] focus:top-4 focus:left-4 focus:z-[100] focus:inline-flex focus:min-h-11 focus:items-center focus:bg-paper focus:px-4">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
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
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
