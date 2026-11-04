import { useEffect } from 'react'
import { useReveal } from './useReveal'
import { Link } from 'react-router'
import { company } from '../data'

export function Container({ className = '', children }) {
  return <div className={`mx-auto max-w-[1180px] px-4 md:px-8 ${className}`}>{children}</div>
}

/**
 * Section « page de cahier » : sur grand écran, une marge rouge à gauche porte une annotation
 * manuscrite (note) qui résume la section ; le contenu s'écrit à droite.
 */
export function Section({ id, tone = 'paper', note, className = '', children }) {
  const ref = useReveal()
  return (
    <section ref={ref} id={id} className={`scroll-mt-16 ${tone === 'alt' ? 'bg-paper-2' : ''} ${className}`}>
      <Container className="lg:grid lg:grid-cols-[150px_minmax(0,1fr)]">
        <aside className="margin-line hidden pt-[4.5rem] pr-5 text-right lg:block md:pt-[6.5rem]">
          {note && <p className="rv-note font-serif text-base leading-snug text-pen italic">{note}</p>}
        </aside>
        <div className="rv py-16 md:py-24 lg:pl-12">
          {note && <p className="mb-3 font-serif text-base text-pen italic lg:hidden">{note}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}

export function SectionHead({ title, children, as: H = 'h2' }) {
  return (
    <header className="mb-10 max-w-2xl">
      <H className="text-[2rem] leading-tight tracking-[-0.01em] md:text-5xl">{title}</H>
      {children && <p className="mt-4 font-serif text-lg leading-[1.6] text-muted">{children}</p>}
    </header>
  )
}

/** En-tête de page intérieure, sur papier Seyès avec la marge rouge. */
export function PageHeader({ title, note, children }) {
  return (
    <section className="seyes border-b border-rule">
      <Container className="lg:grid lg:grid-cols-[150px_minmax(0,1fr)]">
        <aside className="margin-line hidden pt-24 pr-5 text-right lg:block">
          {note && <p className="font-serif text-base leading-snug text-pen italic">{note}</p>}
        </aside>
        <div className="intro pt-14 pb-12 md:pt-20 md:pb-16 lg:pl-12">
          <h1 className="max-w-3xl text-[2.75rem] leading-[1.04] tracking-[-0.03em] sm:text-7xl">{title}</h1>
          {children && <p className="mt-6 max-w-[40rem] rounded-sm bg-paper/80 font-serif text-xl leading-[1.6] text-muted">{children}</p>}
        </div>
      </Container>
    </section>
  )
}

/** Bandeau d'appel à l'action placé en bas des pages. */
export function CtaBand({ title = 'Une tâche vous fait perdre du temps ?', text = 'Décrivez-la en quelques lignes. Je vous dis sous 48 heures ce qui peut être automatisé, gratuitement et sans engagement.' }) {
  return (
    <section className="bg-pen text-on-pen">
      <Container className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight md:text-4xl">{title}</h2>
          <p className="mt-3 font-serif text-lg leading-[1.6] opacity-90">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2">
          <Link to="/contact" className="inline-flex min-h-12 items-center rounded-md bg-marker px-6 font-medium text-on-marker no-underline hover:opacity-90">
            Réserver un audit gratuit
          </Link>
          <a href={`tel:${company.phoneHref}`} className="inline-flex min-h-11 items-center text-on-pen underline-offset-4 hover:underline">
            ou appeler le {company.phone}
          </a>
        </div>
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
  ghost: `${base} border border-rule bg-paper text-ink hover:border-pen hover:text-pen`,
}

export const textLink = 'text-pen underline decoration-1 underline-offset-4 hover:decoration-2'
/** Lien seul sur sa ligne : zone cliquable de 44 px de haut. */
export const standaloneLink = `${textLink} inline-flex min-h-11 items-center`
