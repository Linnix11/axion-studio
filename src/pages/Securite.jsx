import { Link } from 'react-router'
import { PageHeader, Section, SectionHead, CtaBand, textLink, usePageMeta } from '../components/ui'
import { NotDoing } from '../components/Trust'
import { security } from '../data'
import { geminiFreeTier, freeTierNotice } from '../chatbot'

export default function Securite() {
  usePageMeta('/securite')
  return (
    <>
      <PageHeader title="Sécurité de vos données et usage de l’IA" note="Vos outils restent les vôtres">
        Automatiser, c’est donner accès à vos outils. Voici les règles que j’applique sur chaque projet, sans
        exception.
      </PageHeader>
      <Section note="6 règles, sur chaque projet">
        <ol className="border-t-2 border-ink">
          {security.map((s, i) => (
            <li key={s.title} className="grid gap-2 border-b border-rule py-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
              <h2 className="text-2xl leading-tight"><span className="mr-3 text-pen">{i + 1}.</span>{s.title}</h2>
              <p className="max-w-[60ch] text-lg leading-[1.6] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[62ch] text-lg leading-[1.6] text-muted">
          Le détail pour l’IA : <Link to="/blog/ia-donnees-clients-regles/" className={textLink}>les règles pour utiliser l’IA avec des données clients</Link>.
        </p>
      </Section>
      <Section tone="alt" note="Écrit noir sur blanc">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead title="Et sur ce site ?" />
            <p className="max-w-[56ch] text-lg leading-[1.6] text-muted">
              Ce site ne dépose aucun cookie et ne mesure pas votre navigation. Le formulaire de contact m’envoie votre
              message par e-mail : il n’est pas enregistré sur le site. Les questions posées à l’assistant IA sont
              transmises à Google Gemini pour y répondre, sans être conservées ici.{geminiFreeTier && ` ${freeTierNotice}`} Détails dans la{' '}
              <Link to="/confidentialite/" className={textLink}>politique de confidentialité</Link>.
            </p>
          </div>
          <NotDoing />
        </div>
      </Section>
      <CtaBand title="Une question sur vos données ?" text="Posez-la avant de vous engager. Je vous réponds précisément, outil par outil." />
    </>
  )
}
