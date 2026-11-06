import { useEffect } from 'react'
import { useReveal } from './useReveal'
import { Link } from 'react-router'
import { company } from '../data'
import { pageMeta, fullTitle } from '../seo'

export function Container({ className = '', children }) {
  return <div className={`mx-auto max-w-[1180px] px-4 md:px-8 ${className}`}>{children}</div>
}

/** Petit sur-titre au-dessus d’un titre : résume la section en quelques mots. */
export const eyebrow = 'text-[0.8125rem] font-semibold tracking-[0.08em] text-pen uppercase'

/** Section de page ; `note` s’affiche en sur-titre, `tone="alt"` donne un bandeau blanc. */
export function Section({ id, tone = 'paper', note, className = '', children }) {
  const ref = useReveal()
  return (
    <section ref={ref} id={id} className={`scroll-mt-16 ${tone === 'alt' ? 'bg-paper' : ''} ${className}`}>
      <Container className="rv py-16 md:py-24">
        {note && <p className={`mb-3 ${eyebrow}`}>{note}</p>}
        {children}
      </Container>
    </section>
  )
}

export function SectionHead({ title, children, as: H = 'h2' }) {
  return (
    <header className="mb-10 max-w-2xl">
      <H className="text-[2rem] leading-tight tracking-[-0.01em] md:text-5xl">{title}</H>
      {children && <p className="mt-4 text-lg leading-[1.6] text-muted">{children}</p>}
    </header>
  )
}

/** En-tête de page intérieure. */
export function PageHeader({ title, note, children }) {
  return (
    <section className="border-b border-rule">
      <Container className="intro pt-14 pb-12 md:pt-20 md:pb-16">
        {note && <p className={eyebrow}>{note}</p>}
        <h1 className="mt-3 max-w-3xl text-[2.75rem] leading-[1.02] tracking-[-0.03em] sm:text-7xl">{title}</h1>
        {children && <p className="mt-6 max-w-[40rem] text-xl leading-[1.6] text-muted">{children}</p>}
      </Container>
    </section>
  )
}

/** Bandeau d’appel à l’action placé en bas des pages. */
export function CtaBand({ title = 'Une tâche vous fait perdre du temps ?', text = 'Décrivez-la en quelques lignes. Je vous dis sous 48 heures ouvrées ce qui peut être automatisé, gratuitement et sans engagement.' }) {
  return (
    <section className="bg-pen text-on-pen">
      <Container className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight md:text-4xl">{title}</h2>
          <p className="mt-3 text-lg leading-[1.6] opacity-90">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2">
          <Link to="/contact" className="inline-flex min-h-12 items-center rounded-full bg-marker px-6 font-medium text-on-marker no-underline hover:opacity-90 focus-visible:outline-on-pen">
            Réserver un audit gratuit
          </Link>
          <a href={`tel:${company.phoneHref}`} className="inline-flex min-h-11 items-center text-on-pen underline-offset-4 hover:underline focus-visible:outline-on-pen">
            ou appeler le {company.phone}
          </a>
        </div>
      </Container>
    </section>
  )
}

/** Titre de l’onglet et description de la page (mêmes valeurs que celles écrites dans le HTML). */
export function usePageMeta(path) {
  useEffect(() => {
    document.title = fullTitle(path)
    const meta = document.querySelector('meta[name="description"]')
    if (meta && pageMeta[path]) meta.setAttribute('content', pageMeta[path].description)
  }, [path])
}

// États : défaut · survol · appui (enfoncé d'1 px) · focus (contour 3 px, global) · désactivé (atténué, curseur interdit)
const base = 'inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base font-semibold no-underline transition-colors duration-150 cursor-pointer active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0'
export const btn = {
  primary: `${base} bg-pen text-on-pen hover:bg-ink active:bg-ink disabled:hover:bg-pen`,
  ghost: `${base} border border-rule bg-paper text-ink hover:border-pen hover:text-pen active:bg-paper-2`,
}

export const textLink = 'text-pen underline decoration-1 underline-offset-4 hover:decoration-2'
/** Lien seul sur sa ligne : zone cliquable de 44 px de haut. */
export const standaloneLink = `${textLink} inline-flex min-h-11 items-center`
