import { Link } from 'react-router'
import { PageHeader, textLink, Section, CtaBand, usePageMeta } from '../components/ui'
import { faq } from '../data'

export default function Faq() {
  usePageMeta('/faq')
  return (
    <>
      <PageHeader title="Questions fréquentes" note={`${faq.length} questions avant de se lancer`} />
      <Section note="Cliquez pour lire la réponse">
        <div className="max-w-3xl border-t-2 border-ink">
          {faq.map(f => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-xl leading-tight font-medium hover:text-pen [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="shrink-0 text-2xl leading-none text-pen transition-transform duration-150 group-open:rotate-45">+</span>
              </summary>
              <p className="faq-a max-w-[62ch] pb-6 text-lg leading-[1.6] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 max-w-[62ch] text-lg leading-[1.6] text-muted">
          À lire aussi : le <Link to="/blog/n8n-make-zapier-comparatif/" className={textLink}>comparatif de n8n, Make et Zapier</Link>,
          et <Link to="/blog/chatbot-site-tpe-utile-ou-gadget/" className={textLink}>ce qu’un chatbot peut vraiment faire pour une TPE</Link>.
        </p>
      </Section>
      <CtaBand title="Votre question n’est pas ici ?" text="Écrivez-moi, je vous réponds sous 24 heures ouvrées." />
    </>
  )
}
