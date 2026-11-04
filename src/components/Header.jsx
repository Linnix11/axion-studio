import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Container, btn } from './ui'
import { nav } from '../data'

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
        <Link to="/" className="flex min-h-11 items-center gap-2 text-lg font-semibold text-ink no-underline" aria-label="Axion Studio, accueil">
          <span aria-hidden="true" className="grid size-6 place-items-center rounded-[5px] bg-pen">
            <span className="h-[3px] w-3.5 rounded-full bg-marker" />
          </span>
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
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-16 flex-col border-b border-rule bg-paper px-4 pt-2 pb-4
                      lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:p-0`}
        >
          {nav.map(item => (
            <NavLink key={item.to} to={item.to} className={linkClass}>{item.label}</NavLink>
          ))}
          <Link to="/contact" className={`${btn.primary} mt-3 min-h-11 lg:mt-0 lg:ml-2`}>Contact</Link>
        </nav>
      </Container>
    </header>
  )
}
