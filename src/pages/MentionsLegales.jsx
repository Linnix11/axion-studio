import { Link } from 'react-router'
import { PageHeader, Section, textLink, usePageMeta } from '../components/ui'
import { company } from '../data'

export default function MentionsLegales() {
  usePageMeta('/mentions-legales')
  const rows = [
    ['Éditeur', `${company.owner}, entrepreneur individuel (micro-entreprise), nom commercial « ${company.tradeName} »`],
    ['Siège', company.siege],
    ['SIRET', company.siret],
    ['TVA', 'TVA non applicable, art. 293 B du CGI'],
    ['Contact', <>
      <a href={`mailto:${company.email}`} className={`${textLink} -my-3 inline-block py-3`}>{company.email}</a>
      {' · '}
      <a href={`tel:${company.phoneHref}`} className={`${textLink} -my-3 inline-block py-3`}>{company.phone}</a>
    </>],
    ['Directeur de la publication', company.owner],
    ['Hébergeur', company.host],
  ]
  return (
    <>
      <PageHeader title="Mentions légales" note="Obligations légales" />
      <Section>
        <dl className="grid max-w-4xl gap-x-8 border-t-2 border-ink sm:grid-cols-[minmax(140px,240px)_1fr]">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="pt-4 text-muted sm:border-b sm:border-rule sm:pb-4">{k}</dt>
              <dd className="border-b border-rule pt-1 pb-4 break-words sm:pt-4">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 max-w-[64ch] space-y-4 leading-[1.6] text-muted">
          <h2 className="font-sans text-xl text-ink">Propriété intellectuelle</h2>
          <p>Les textes et éléments graphiques de ce site sont la propriété de {company.owner}. Toute reproduction sans autorisation est interdite.</p>
          <h2 className="pt-4 font-sans text-xl text-ink">Données personnelles</h2>
          <p>Voir la <Link to="/confidentialite/" className={textLink}>politique de confidentialité</Link>.</p>
        </div>
      </Section>
    </>
  )
}
