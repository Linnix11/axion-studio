import { PageHeader, Section, textLink, usePageMeta } from '../components/ui'
import { company } from '../data'

const blocks = (c) => [
  ['Responsable du traitement', `${c.owner}, entrepreneur individuel, ${c.siege}.`],
  ['Données collectées', 'Uniquement celles que vous saisissez dans le formulaire de contact : nom, entreprise, adresse e-mail et message. Elles me sont transmises par e-mail, via le serveur de l’hébergeur Hostinger, et ne sont pas enregistrées sur ce site.'],
  ['Finalité', 'Répondre à votre demande et, si vous le souhaitez, préparer une proposition commerciale.'],
  ['Durée de conservation', 'Les échanges sont conservés 3 ans après le dernier contact, puis supprimés.'],
  ['Cookies et mesure d’audience', 'Ce site ne dépose aucun cookie et n’utilise aucun outil de mesure d’audience ni de publicité.'],
  ['Vos droits', 'Vous pouvez demander l’accès, la rectification ou la suppression de vos données, ou vous opposer à leur traitement, en écrivant à l’adresse ci-dessous. Vous pouvez aussi saisir la CNIL (cnil.fr).'],
]

export default function Confidentialite() {
  usePageMeta('/confidentialite')
  return (
    <>
      <PageHeader title="Confidentialité" note="Aucun cookie">
        Ce site collecte le moins de données possible. Voici exactement lesquelles, et ce qu’elles deviennent.
      </PageHeader>
      <Section note="RGPD">
        <div className="max-w-3xl border-t-2 border-ink">
          {blocks(company).map(([t, x]) => (
            <section key={t} className="border-b border-rule py-6">
              <h2 className="text-xl leading-tight">{t}</h2>
              <p className="mt-2 max-w-[64ch] font-serif text-lg leading-[1.6] text-muted">{x}</p>
            </section>
          ))}
          <p className="py-6">Contact : <a href={`mailto:${company.email}`} className={`${textLink} -my-3 inline-block py-3`}>{company.email}</a></p>
        </div>
      </Section>
    </>
  )
}
