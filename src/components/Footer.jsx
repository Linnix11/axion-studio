import { Link } from 'react-router'
import { Container } from './ui'
import { LogoMark } from './Logo'
import { company, nav, services } from '../data'

const link = 'inline-flex min-h-11 items-center text-ink no-underline hover:text-pen'

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-2 text-sm">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <p className="flex items-center gap-2.5 text-lg font-semibold"><LogoMark className="h-7 w-auto text-ink" />{company.brand}</p>
          <p className="mt-2 font-serif text-base leading-[1.6] text-muted">
            Automatisation des processus, intelligence artificielle et sites web pour les TPE, PME et indépendants.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-base">Services</h2>
          <ul>{services.map(s => <li key={s.slug}><Link className={link} to={`/services#${s.slug}`}>{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="mb-2 text-base">Le studio</h2>
          <ul>{nav.filter(n => n.to !== '/services').map(n => <li key={n.to}><Link className={link} to={n.to}>{n.label}</Link></li>)}<li><Link className={link} to="/securite">Sécurité et données</Link></li></ul>
        </div>
        <div>
          <h2 className="mb-2 text-base">Contact</h2>
          <ul>
            <li><a className={link} href={`mailto:${company.email}`}>{company.email.replace('@', '@\u200b')}</a></li>
            <li><a className={link} href={`tel:${company.phoneHref}`}>{company.phone}</a></li>
            <li className="flex min-h-11 items-center text-muted">{company.city}</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-rule">
        <Container className="flex flex-wrap justify-between gap-x-8 gap-y-1 py-4 text-muted">
          <p className="flex min-h-11 items-center">© {new Date().getFullYear()} {company.owner}, EI en micro-entreprise. TVA non applicable, art. 293 B du CGI.</p>
          <p className="flex gap-6">
            <Link className="inline-flex min-h-11 items-center text-muted hover:text-pen" to="/mentions-legales">Mentions légales</Link>
            <Link className="inline-flex min-h-11 items-center text-muted hover:text-pen" to="/confidentialite">Confidentialité</Link>
          </p>
        </Container>
      </div>
    </footer>
  )
}
