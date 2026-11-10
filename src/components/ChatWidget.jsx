import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { assistantName, welcome, suggestions, geminiFreeTier } from '../chatbot'
import { company } from '../data'
import { preparerDemande } from '../demande'

const ENDPOINT = '/api/chat.php'
const STORE = 'axion-chat'
const PAGES = ['/services', '/exemples', '/methode', '/tarifs', '/a-propos', '/faq', '/securite', '/contact']

const errorText = {
  rate: 'Vous avez envoyé beaucoup de messages. Réessayez dans un moment, ou écrivez directement à Arthur.',
  quota: 'L’assistant a atteint sa limite du jour. Écrivez directement à Arthur, il vous répond sous ' + company.delai + '.',
  busy: 'L’assistant est très sollicité. Réessayez dans quelques secondes.',
  default: 'L’assistant n’a pas pu répondre. Réessayez, ou écrivez directement à Arthur.',
}

/** Transforme les adresses de pages, e-mails et téléphones en liens. */
function Rich({ text, onNavigate }) {
  const re = new RegExp(`(${PAGES.map(p => p.replace('/', '\\/')).join('|')})(?![\\w-])|([\\w.+-]+@[\\w-]+\\.[\\w.]+)|(0\\d(?:[ .]?\\d{2}){4})`, 'g')
  const out = []; let last = 0; let m
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) out.push(<Link key={m.index} to={m[1] + '/'} onClick={onNavigate} className="text-pen underline underline-offset-2">{m[1]}</Link>)
    else if (m[2]) out.push(<a key={m.index} href={`mailto:${m[2]}`} className="break-all text-pen underline underline-offset-2">{m[2]}</a>)
    else out.push(<a key={m.index} href={`tel:${m[3].replace(/\D/g, '')}`} className="whitespace-nowrap text-pen underline underline-offset-2">{m[3]}</a>)
    last = m.index + m[0].length
  }
  out.push(text.slice(last))
  return <>{out}</>
}

function load() {
  try { const v = JSON.parse(sessionStorage.getItem(STORE)); return Array.isArray(v) ? v : [] } catch { return [] }
}

export default function ChatWidget() {
  const [available, setAvailable] = useState(false)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const loaded = useRef(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const toggleRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const onContact = pathname.startsWith('/contact')

  // L'assistant n'apparaît que si le serveur est configuré (clé Gemini présente).
  useEffect(() => {
    fetch(ENDPOINT).then(r => r.json()).then(d => setAvailable(!!d.available)).catch(() => setAvailable(false))
  }, [])

  useEffect(() => { setMessages(load()); loaded.current = true }, [])
  useEffect(() => { if (!loaded.current) return; try { sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-30))) } catch { /* stockage indisponible */ } }, [messages])
  useEffect(() => { if (open) inputRef.current?.focus() }, [open])
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight }) }, [messages, sending, open])

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = async text => {
    const q = text.trim()
    if (!q || sending) return
    const next = [...messages, { role: 'user', text: q }]
    setMessages(next); setInput(''); setError(''); setSending(true)
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next }) })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) setMessages(m => [...m, { role: 'model', text: data.reply }])
      else setError(errorText[data.error] || errorText.default)
    } catch {
      setError(errorText.default)
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

  // Pré-remplit le formulaire de contact avec ce que le visiteur a décrit dans la conversation.
  const handOff = () => {
    const said = messages.filter(m => m.role === 'user').map(m => `- ${m.text}`).join('\n')
    const draft = `Bonjour Arthur,\n\nVoici ce que j’ai décrit à l’assistant du site :\n${said}\n\nJe souhaite en parler lors de l’audit gratuit.`
    preparerDemande(draft)
    setOpen(false)
    navigate('/contact/')
  }

  const reset = () => { setMessages([]); setError(''); inputRef.current?.focus() }

  // Masqué sur la page Contact : le formulaire y est déjà, et la bulle ne recouvre pas le champ du message.
  if (!available || (onContact && !open)) return null

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="assistant"
        className="fixed right-4 bottom-4 z-[60] inline-flex min-h-13 min-w-13 items-center justify-center gap-2 rounded-full border-2 border-pen bg-paper px-0 font-medium text-pen shadow-float sm:px-5 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-offset-4 sm:right-6 sm:bottom-6"
      >
        <span aria-hidden="true" className="text-2xl leading-none sm:text-lg">{open ? '×' : '?'}</span>
        {/* Sur mobile, bouton rond : le libellé long masquait le contenu de la page */}
        <span className="sr-only sm:not-sr-only">{open ? 'Fermer l’assistant' : 'Une question ?'}</span>
      </button>

      {open && (
        <section
          id="assistant"
          role="dialog"
          aria-modal="false"
          aria-labelledby="assistant-title"
          className="drop fixed inset-x-2 bottom-20 z-[60] flex max-h-[min(640px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-xl border border-rule bg-paper shadow-overlay sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[400px]"
        >
          <header className="flex items-start justify-between gap-3 border-b border-rule bg-paper-2 px-4 py-3">
            <div>
              <h2 id="assistant-title" className="text-base">{assistantName}</h2>
              <p className="text-sm text-muted">Assistant IA, répond à partir du contenu du site.</p>
            </div>
            {messages.length > 0 && (
              <button type="button" onClick={reset} className="inline-flex min-h-11 shrink-0 items-center text-sm text-pen hover:underline">Effacer</button>
            )}
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            <p className="max-w-[90%] rounded-lg rounded-tl-sm bg-paper-2 px-3 py-2 leading-[1.55]">{welcome}</p>
            {messages.length === 0 && (
              <ul className="flex flex-wrap gap-2 pt-1" aria-label="Questions suggérées">
                {suggestions.map(s => (
                  <li key={s}>
                    <button type="button" onClick={() => send(s)} className="min-h-11 rounded-full border border-rule px-3 py-2 text-left text-sm hover:border-pen hover:text-pen">{s}</button>
                  </li>
                ))}
              </ul>
            )}
            {messages.map((m, i) => (
              <p key={i} className={m.role === 'user'
                ? 'ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-pen px-3 py-2 whitespace-pre-line text-on-pen'
                : 'max-w-[90%] rounded-lg rounded-tl-sm bg-paper-2 px-3 py-2 leading-[1.55] whitespace-pre-line'}>
                <span className="sr-only">{m.role === 'user' ? 'Vous : ' : 'Assistant : '}</span>
                {m.role === 'user' ? m.text : <Rich text={m.text} onNavigate={() => setOpen(false)} />}
              </p>
            ))}
            {sending && <p className="max-w-[90%] rounded-lg bg-paper-2 px-3 py-2 text-sm text-muted">L’assistant écrit…</p>}
            {error && (
              <div className="rounded-lg border border-error px-3 py-2 text-sm">
                <p className="text-error">{error}</p>
                <p className="mt-1"><Link to="/contact/" onClick={() => setOpen(false)} className="text-pen underline">Écrire à Arthur</Link> ou {company.phone}</p>
              </div>
            )}
          </div>

          {messages.some(m => m.role === 'model') && (
            <div className="border-t border-rule px-3 pt-3">
              <button type="button" onClick={handOff} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-marker px-4 font-medium text-on-marker hover:opacity-90">
                Envoyer ma demande à Arthur
              </button>
            </div>
          )}
          <form onSubmit={e => { e.preventDefault(); send(input) }} className="p-3">
            <label htmlFor="assistant-input" className="mb-1.5 block text-sm font-medium">Votre question <span className="font-normal text-muted">(sans données sensibles)</span></label>
            <div className="flex items-end gap-2">
            <textarea
              id="assistant-input"
              ref={inputRef}
              rows={1}
              maxLength={1000}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder="Ex. : je perds du temps sur mes devis"
              className="max-h-32 min-h-11 flex-1 resize-none rounded-md border border-rule bg-paper px-3 py-2.5 text-base"
            />
            <button type="submit" disabled={sending || !input.trim()} className="inline-flex min-h-11 items-center rounded-md bg-pen px-4 font-medium text-on-pen disabled:opacity-50">
              Envoyer
            </button>
            </div>
          </form>
          <p className="border-t border-rule px-4 py-2 text-xs text-muted">
            Réponses générées par l’IA Gemini de Google, à vérifier.{geminiFreeTier && ' Offre gratuite : Google peut utiliser ces échanges.'} <Link to="/confidentialite/" onClick={() => setOpen(false)} className="underline">Confidentialité</Link>
          </p>
        </section>
      )}
    </>
  )
}
