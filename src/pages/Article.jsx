import { Fragment } from 'react'
import { Link, useParams } from 'react-router'
import { Container, CtaBand, AuditLink, btn, usePageMeta } from '../components/ui'
import { posts, readingMinutes, formatDate } from '../blog'
import { company } from '../data'
import NotFound from './NotFound'

/** Texte avec liens au format [texte](/chemin). */
function Inline({ text }) {
  const parts = []; let last = 0; let m
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(m[2].startsWith('/')
      ? <Link key={m.index} to={m[2]} className="text-pen underline decoration-1 underline-offset-4 hover:decoration-2">{m[1]}</Link>
      : <a key={m.index} href={m[2]} className="text-pen underline decoration-1 underline-offset-4">{m[1]}</a>)
    last = m.index + m[0].length
  }
  parts.push(text.slice(last))
  return <>{parts}</>
}

function Block({ b }) {
  if (b.h2) return <h2 id={slugify(b.h2)} className="mt-12 scroll-mt-24 text-[1.75rem] leading-tight">{b.h2}</h2>
  if (b.p) return <p className="mt-5"><Inline text={b.p} /></p>
  if (b.ul) return <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-pen">{b.ul.map(i => <li key={i}><Inline text={i} /></li>)}</ul>
  if (b.ol) return <ol className="mt-5 list-decimal space-y-2 pl-6 marker:font-sans marker:text-pen">{b.ol.map(i => <li key={i}><Inline text={i} /></li>)}</ol>
  if (b.note) return <p className="mt-8 rounded-r-md border-l-4 border-marker bg-paper px-5 py-4 font-sans text-base leading-[1.6]"><Inline text={b.note} /></p>
  return null
}

const slugify = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function Article() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)
  usePageMeta(post ? `/blog/${slug}` : '/404')
  if (!post) return <NotFound />
  const others = posts.filter(p => p.slug !== slug).slice(0, 2)
  const toc = post.body.filter(b => b.h2)
  const milieu = post.body.findIndex((b, i) => b.h2 && post.body.slice(0, i).some(x => x.h2))   // 2ᵉ intertitre

  return (
    <>
      <article>
        <header className="border-b border-rule">
          <Container>
            <div className="intro pt-10 pb-12 md:pt-14 md:pb-16">
              <nav aria-label="Fil d’Ariane" className="text-sm text-muted">
                <ol className="flex flex-wrap gap-x-2">
                  <li><Link to="/" className="inline-flex min-h-11 items-center hover:text-pen">Accueil</Link> /</li>
                  <li><Link to="/blog/" className="inline-flex min-h-11 items-center hover:text-pen">Blog</Link> /</li>
                  <li aria-current="page" className="inline-flex min-h-11 items-center">{post.category}</li>
                </ol>
              </nav>
              <h1 className="mt-2 max-w-4xl text-[2.25rem] leading-[1.08] tracking-[-0.02em] sm:text-6xl">{post.title}</h1>
              <p className="mt-6 text-sm text-muted">
                Par {company.owner} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} min de lecture
              </p>
            </div>
          </Container>
        </header>

        <Container>
          <div className="grid gap-12 py-12 md:py-16 xl:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="min-w-0 max-w-[68ch] text-lg leading-[1.7]">
              <p className="text-xl leading-[1.6] text-muted">{post.lead}</p>
              {post.body.map((b, i) => (
                <Fragment key={i}>
                  {i === milieu && (
                    <aside className="mt-10 rounded-xl border border-rule bg-paper p-6 font-sans text-base">
                      <p className="font-medium">Vous vous reconnaissez dans ces tâches ?</p>
                      <p className="mt-1 text-muted">En 30 minutes, je vous dis lesquelles peuvent être automatisées chez vous. Gratuit, sans engagement.</p>
                      <AuditLink className={`${btn.primary} mt-4`} demande={`Bonjour,\n\nJ’ai lu votre article « ${post.title} ». Chez moi : `} />
                    </aside>
                  )}
                  <Block b={b} />
                </Fragment>
              ))}
              {post.faq?.length > 0 && (
                <section aria-labelledby="questions-frequentes">
                  <h2 id="questions-frequentes" className="mt-12 scroll-mt-24 text-[1.75rem] leading-tight">Questions fréquentes</h2>
                  {post.faq.map(f => (
                    <Fragment key={f.q}>
                      <h3 className="mt-6 font-sans text-xl leading-tight font-medium">{f.q}</h3>
                      <p className="mt-2">{f.a}</p>
                    </Fragment>
                  ))}
                </section>
              )}
            </div>
            {toc.length > 2 && (
              <nav aria-label="Sommaire de l’article" className="hidden min-w-0 self-start xl:sticky xl:top-24 xl:block">
                <p className="text-sm font-medium">Sommaire</p>
                <ol className="mt-2 space-y-2 border-l-2 border-rule pl-4 text-sm">
                  {toc.map(t => <li key={t.h2}><a href={`#${slugify(t.h2)}`} className="inline-flex min-h-11 items-center text-muted hover:text-pen">{t.h2}</a></li>)}
                </ol>
              </nav>
            )}
          </div>
        </Container>
      </article>

      {others.length > 0 && (
        <section className="border-t border-rule bg-paper">
          <Container className="py-14">
            <h2 className="text-2xl leading-tight">À lire aussi</h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {others.map(p => (
                <li key={p.slug} className="lift rounded-lg border border-rule bg-paper p-6">
                  <p className="text-sm text-muted">{p.category}, {readingMinutes(p)} min</p>
                  <Link to={`/blog/${p.slug}/`} className="mt-1 block text-xl leading-tight font-medium text-ink no-underline hover:text-pen">{p.title}</Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <CtaBand />
    </>
  )
}
