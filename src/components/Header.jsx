import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Container, AuditLink, btn } from './ui'
import { LogoMark } from './Logo'
import DisplayTools from './DisplayTools'
import { nav, company } from '../data'

/** Vrai quand le visiteur a agrandi le texte (bouton Accessibilité). */
function useBigText() {
  const read = () => (document.documentElement.dataset.text || 'normal') !== 'normal'
  const [big, setBig] = useState(false)
  useEffect(() => {
    setBig(read())
    const obs = new MutationObserver(() => setBig(read()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-text'] })
    return () => obs.disconnect()
  }, [])
  return big
}

// Deux jeux de classes complets (Tailwind ne lit que des noms écrits en entier) :
// texte normal → menu déplié dès 1024 px ; texte agrandi → menu déplié seulement à partir de 1536 px.
const C = {
  normal: {
    wrap: 'lg:gap-6',
    nav: 'lg:static lg:flex lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:p-0 xl:gap-6',
    link: 'lg:border-0', active: 'lg:underline lg:decoration-2 lg:underline-offset-8',
    phone: 'lg:hidden 2xl:flex 2xl:border-l 2xl:border-rule 2xl:pl-6', contact: 'lg:mt-0', burger: 'lg:hidden', brand: 'max-[480px]:sr-only', audit: 'max-[359px]:hidden',
  },
  big: {
    wrap: '2xl:gap-6',
    nav: '2xl:static 2xl:flex 2xl:flex-row 2xl:items-center 2xl:gap-6 2xl:border-0 2xl:p-0',
    link: '2xl:border-0', active: '2xl:underline 2xl:decoration-2 2xl:underline-offset-8',
    phone: '2xl:hidden', contact: '2xl:mt-0', burger: '2xl:hidden', brand: 'max-[600px]:sr-only', audit: 'max-[479px]:hidden',
  },
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const c = C[useBigText() ? 'big' : 'normal']
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = ({ isActive }) =>
    `flex min-h-11 items-center whitespace-nowrap border-b border-rule text-base no-underline hover:text-pen ${c.link} ${
      isActive ? `font-medium text-pen ${c.active}` : 'text-ink'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper">
      <Container className="relative flex h-16 items-center justify-between gap-3">
        <Link to="/" className="group flex min-h-11 items-center gap-2.5 whitespace-nowrap text-xl font-semibold tracking-[-0.01em] text-ink no-underline" aria-label="Axion Studio, accueil">
          <LogoMark className="logo-mark h-9 w-auto shrink-0 text-ink" />
          <span className={c.brand}>Axion Studio</span>
        </Link>

        <div className={`flex items-center gap-2 ${c.wrap}`}>
          <nav
            id="nav"
            aria-label="Navigation principale"
            className={`${open ? 'drop flex' : 'hidden'} absolute inset-x-0 top-16 flex-col border-b border-rule bg-paper px-4 pt-2 pb-4 ${c.nav}`}
          >
            {nav.map(item => (
              <NavLink key={item.to} to={item.to} className={linkClass}>{item.label}</NavLink>
            ))}
            <a href={`tel:${company.phoneHref}`} className={`flex min-h-11 items-center whitespace-nowrap text-base text-ink no-underline hover:text-pen ${c.phone}`}>{company.phone}</a>
            <Link to="/contact/" className={`${btn.primary} mt-3 min-h-11 whitespace-nowrap ${c.contact}`}>Contact</Link>
          </nav>

          {/* Sur mobile, le bouton d'audit reste visible sans ouvrir le menu */}
          <AuditLink className={`${btn.primary} min-h-11 px-4 text-sm whitespace-nowrap ${c.burger} ${c.audit}`}>Audit gratuit</AuditLink>
          <DisplayTools />

          <button
            className={`flex size-11 flex-col justify-center gap-1 p-3 ${c.burger}`}
            aria-expanded={open}
            aria-controls="nav"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen(o => !o)}
          >
            <span className="h-0.5 bg-ink" /><span className="h-0.5 bg-ink" /><span className="h-0.5 bg-ink" />
          </button>
        </div>
      </Container>
    </header>
  )
}
