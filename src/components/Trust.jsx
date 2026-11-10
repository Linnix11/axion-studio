import { Link } from 'react-router'
import { CheckIcon } from './Icons'
import { standaloneLink } from './ui'
import { identity, guarantees, notDoing, company } from '../data'

/** Fiche d’identité de l’entreprise. */
export function IdentityCard() {
  return (
    <div className="rounded-xl border border-rule bg-paper">
      <div className="border-b border-rule px-5 py-4 sm:px-6">
        <h3 className="text-lg">Qui est derrière Axion Studio</h3>
      </div>
      <dl className="px-5 py-2 sm:px-6">
        {identity.map(([k, v]) => (
          <div key={k} className="grid gap-x-4 border-b border-rule py-3 last:border-0 sm:grid-cols-[120px_1fr]">
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="text-lg leading-snug font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule px-5 py-2 sm:px-6">
        <a href={`tel:${company.phoneHref}`} className={standaloneLink}>{company.phone}</a>
        <a href={`mailto:${company.email}`} className={`${standaloneLink} break-all`}>{company.email}</a>
      </div>
    </div>
  )
}

export function Guarantees() {
  return (
    <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {guarantees.map(g => (
        <li key={g.title} className="flex gap-3">
          <span aria-hidden="true" className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ok text-paper"><CheckIcon /></span>
          <div>
            <p className="text-lg leading-tight font-medium">{g.title}</p>
            <p className="mt-1 leading-[1.6] text-muted">{g.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function NotDoing() {
  return (
    <div className="rounded-lg border border-rule bg-paper p-5 sm:p-6">
      <h3 className="text-lg">Ce que je ne fais pas</h3>
      <ul className="mt-3">
        {notDoing.map(n => (
          <li key={n} className="border-b border-rule py-3 leading-[1.5] last:border-0">{n}</li>
        ))}
      </ul>
      <p className="mt-2"><Link to="/securite/" className={standaloneLink}>Comment je protège vos données</Link></p>
    </div>
  )
}
