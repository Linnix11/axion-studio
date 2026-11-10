import { PageHeader, Section, btn, usePageMeta } from '../components/ui'
import ContactForm from '../components/ContactForm'
import { CheckIcon } from '../components/Icons'
import { company, guarantees } from '../data'

export default function Contact() {
  usePageMeta('/contact')
  const infos = [
    ['E-mail', <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center text-pen">{company.email.replace('@', '@\u200b')}</a>],
    ['Téléphone', <a href={`tel:${company.phoneHref}`} className="inline-flex min-h-11 items-center text-pen">{company.phone}</a>],
    ['Zone', `${company.city}, Île-de-France, et à distance partout en France`],
    ['Délai de réponse', `Sous ${company.delai}`],
  ]
  return (
    <>
      <PageHeader title="Parlons de votre semaine" note={`Réponse sous ${company.delai}`}>
        Décrivez la tâche qui vous fait perdre du temps. Je vous réponds sous {company.delai} pour fixer l’audit
        gratuit de 30 minutes.
      </PageHeader>
      <Section note="Audit gratuit, sans engagement">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-2xl leading-tight">Coordonnées</h2>
            <ul className="mt-4 border-t border-rule">
              {infos.map(([k, v]) => (
                <li key={k} className="grid min-h-13 grid-cols-[120px_1fr] items-center gap-3 border-b border-rule py-1">
                  <span className="text-sm text-muted">{k}</span><span className="min-w-0">{v}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-2xl leading-tight">Ce qui se passe ensuite</h2>
            <ol className="mt-4 space-y-3 text-lg leading-[1.6] text-muted">
              <li>1. Je lis votre message et vous propose un créneau pour l’audit.</li>
              <li>2. On échange 30 minutes sur votre semaine et vos outils.</li>
              <li>3. Vous recevez une proposition chiffrée sous 72 heures, sans engagement.</li>
            </ol>
          </div>
          {/* Sur mobile, le formulaire passe avant les coordonnées */}
          <div className="order-first lg:order-none">
            {company.rdv && (
              <div className="mb-8 rounded-xl border-2 border-pen bg-paper p-6">
                <h2 className="text-2xl leading-tight">Choisir un créneau</h2>
                <p className="mt-2 text-muted">Réservez directement l’audit gratuit de 30 minutes dans mon agenda.</p>
                <a href={company.rdv} target="_blank" rel="noopener" className={`${btn.primary} mt-4`}>Voir les créneaux libres</a>
                <p className="mt-4 text-sm text-muted">Ou décrivez votre besoin ci-dessous, je vous réponds sous {company.delai}.</p>
              </div>
            )}
            <ContactForm />
            <ul className="mt-6 space-y-3">
              {guarantees.slice(0, 3).map(g => (
                <li key={g.title} className="flex gap-3 text-sm">
                  <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-ok text-paper"><CheckIcon className="size-3" /></span>
                  <span><strong>{g.title}.</strong> <span className="text-muted">{g.text}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
