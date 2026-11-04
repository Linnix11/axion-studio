import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Container, btn } from './ui'
import { LogoMark } from './Logo'
import { nav, company } from '../data'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = ({ isActive }) =>
    `flex min-h-11 items-center border-b border-rule text-base no-underline hover:text-pen lg:border-0 ${
      isActive ? 'font-medium text-pen lg:underline lg:decoration-2 lg:underline-offset-8' : 'text-ink'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper">
      <Container className="relative flex h-16 items-center justify-between">
        <Link to="/" className="group flex min-h-11 items-center gap-2.5 text-xl font-semibold tracking-[-0.01em] text-ink no-underline" aria-label="Axion Studio, accueil">
          <LogoMark className="logo-mark h-9 w-auto text-ink" />
          Axion Studio
        </Link>

        <button
          className="flex size-11 flex-col justify-center gap-1 p-3 lg:hidden"
          aria-expanded={open}
          aria-controls="nav"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen(o => !o)}
        >
          <span className="h-0.5 bg-ink" /><span className="h-0.5 bg-ink" /><span className="h-0.5 bg-ink" />
        </button>

        <nav
          id="nav"
          aria-label="Navigation principale"
          className={`${open ? 'drop flex' : 'hidden'} absolute inset-x-0 top-16 flex-col border-b border-rule bg-paper px-4 pt-2 pb-4
                      lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:p-0`}
        >
          {nav.map(item => (
            <NavLink key={item.to} to={item.to} className={linkClass}>{item.label}</NavLink>
          ))}
          <a href={`tel:${company.phoneHref}`} className="flex min-h-11 items-center text-base text-ink no-underline hover:text-pen lg:ml-2 xl:border-l xl:border-rule xl:pl-6">{company.phone}</a>
          <Link to="/contact" className={`${btn.primary} mt-3 min-h-11 lg:mt-0`}>Contact</Link>
        </nav>
      </Container>
    </header>
  )
}
