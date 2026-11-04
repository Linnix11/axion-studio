import { useEffect } from 'react'
import { Link } from 'react-router'
import { company } from '../data'

export function Container({ className = '', children }) {
  return <div className={`mx-auto max-w-[1120px] px-4 md:px-8 ${className}`}>{children}</div>
}

export function Section({ id, tone = 'paper', className = '', children }) {
  return (
    <section id={id} className={`scroll-mt-16 py-16 md:py-24 ${tone === 'alt' ? 'bg-paper-2' : ''} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHead({ title, children, as: H = 'h2' }) {
  return (
    <header className="mb-10 max-w-2xl">
      <H className="text-[2rem] leading-tight md:text-5xl">{title}</H>
      {children && <p className="mt-4 font-serif text-lg leading-[1.6] text-muted">{children}</p>}
    </header>
  )
}

/** En-tête de page intérieure : titre h1 + chapeau. */
export function PageHeader({ title, children }) {
  return (
    <section className="border-b border-rule pt-14 pb-12 md:pt-20 md:pb-16">
      <Container>
        <h1 className="max-w-3xl text-[2.5rem] leading-[1.08] tracking-[-0.02em] sm:text-6xl">{title}</h1>
        {children && <p className="mt-6 max-w-[40rem] font-serif text-xl leading-[1.6] text-muted">{children}</p>}
      </Container>
    </section>
  )
}

/** Bandeau d'appel à l'action placé en bas des pages. */
export function CtaBand({ title = 'Une tâche vous fait perdre du temps ?', text = 'Décrivez-la en quelques lignes. Je vous dis sous 48 heures ce qui peut être automatisé.' }) {
  return (
    <section className="bg-pen text-on-pen">
      <Container className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight">{title}</h2>
          <p className="mt-3 font-serif text-lg leading-[1.6] opacity-90">{text}</p>
        </div>
        <Link to="/contact" className="inline-flex min-h-12 shrink-0 items-center rounded-md bg-marker px-6 font-medium text-on-marker no-underline hover:opacity-90">
          Réserver un audit gratuit
        </Link>
      </Container>
    </section>
  )
}

/** Titre de l'onglet et description de la page. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${company.brand}` : `${company.brand}, automatisation et IA pour les entreprises`
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [title, description])
}

const base = 'inline-flex min-h-12 items-center justify-center rounded-md px-6 text-base font-medium no-underline transition-colors duration-150 cursor-pointer'
export const btn = {
  primary: `${base} bg-pen text-on-pen hover:bg-ink`,
  ghost: `${base} border border-rule text-ink hover:border-pen hover:text-pen`,
}

export const textLink = 'text-pen underline decoration-1 underline-offset-4 hover:decoration-2'
/** Lien seul sur sa ligne : zone cliquable de 44 px de haut. */
export const standaloneLink = `${textLink} inline-flex min-h-11 items-center`
