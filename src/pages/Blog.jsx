import { Link } from 'react-router'
import { PageHeader, Section, CtaBand, usePageMeta } from '../components/ui'
import { posts, readingMinutes, formatDate } from '../blog'

export default function Blog() {
  usePageMeta('/blog')
  const list = [...posts].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <PageHeader title="Blog" note="Conseils concrets, sans jargon">
        Des articles courts et pratiques pour gagner du temps dans votre entreprise : quoi automatiser, avec
        quels outils, et comment utiliser l’IA sans risque.
      </PageHeader>
      <Section note={`${list.length} article${list.length > 1 ? 's' : ''}`}>
        <ul className="border-t-2 border-ink">
          {list.map(p => (
            <li key={p.slug} className="border-b border-rule">
              <article className="grid gap-3 py-8 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-10">
                <p className="text-sm text-muted">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span className="block">{p.category}, {readingMinutes(p)} min de lecture</span>
                </p>
                <div>
                  <h2 className="text-2xl leading-tight md:text-[1.75rem]">
                    <Link to={`/blog/${p.slug}`} className="text-ink no-underline hover:text-pen">{p.title}</Link>
                  </h2>
                  <p className="mt-3 max-w-[62ch] font-serif text-lg leading-[1.6] text-muted">{p.description}</p>
                  <p className="mt-3">
                    <Link to={`/blog/${p.slug}`} className="inline-flex min-h-11 items-center text-pen underline decoration-1 underline-offset-4 hover:decoration-2" aria-label={`Lire l’article : ${p.title}`}>
                      Lire l’article
                    </Link>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  )
}
