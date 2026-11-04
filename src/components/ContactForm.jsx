import { useState } from 'react'
import { btn, textLink } from './ui'
import { company, needs } from '../data'

const ENDPOINT = '/api/contact.php'

const rules = {
  nom: v => (v.trim() ? '' : 'Indiquez votre nom.'),
  email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Indiquez une adresse e-mail valide, par ex. nom@exemple.fr.'),
  message: v => (v.trim().length >= 10 ? '' : 'Décrivez votre projet en quelques mots (10 caractères minimum).'),
}

const input = 'w-full min-h-12 rounded-md border bg-paper px-3 py-3 text-base text-ink'

function Field({ id, label, hint, error, children }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-2 block text-base font-medium">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-sm text-muted">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-2 text-sm text-error">{error}</p>}
    </div>
  )
}

const failureText = {
  rate: 'Trop de messages envoyés depuis votre connexion. Réessayez dans une heure, ou écrivez-moi directement.',
  default: 'Le message n’est pas parti : le serveur n’a pas répondu. Réessayez dans un instant, ou écrivez-moi directement.',
}

export default function ContactForm() {
  const empty = { nom: '', entreprise: '', email: '', type: needs[0], message: '', site: '' }
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | failed
  const [failure, setFailure] = useState('')
  const [copied, setCopied] = useState(false)

  const validate = name => setErrors(e => ({ ...e, [name]: rules[name](values[name]) }))

  const onChange = e => {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const onSubmit = async e => {
    e.preventDefault()
    const next = Object.fromEntries(Object.keys(rules).map(k => [k, rules[k](values[k])]))
    setErrors(next)
    const firstBad = Object.keys(next).find(k => next[k])
    if (firstBad) { document.getElementById(firstBad)?.focus(); return }

    setState('sending'); setFailure('')
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) { setState('sent'); return }
      if (data.error === 'validation' && data.fields) { setErrors(data.fields); setState('idle'); return }
      setFailure(failureText[data.error] || failureText.default); setState('failed')
    } catch {
      setFailure(failureText.default); setState('failed')
    }
  }

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(company.email); setCopied(true) } catch { setCopied(false) }
  }

  if (state === 'sent') {
    return (
      <div className="drop rounded-lg border-2 border-ok bg-paper-2 p-6 sm:p-8" role="status">
        <p className="flex items-center gap-3 text-2xl leading-tight font-medium">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-ok text-paper">✓</span>
          Message envoyé
        </p>
        <p className="mt-4 font-serif text-lg leading-[1.6]">
          Merci {values.nom.split(' ')[0]}. Je vous réponds sous 48 heures ouvrées à l’adresse {values.email}.
        </p>
        <button type="button" className={`${btn.ghost} mt-6`} onClick={() => { setValues(empty); setState('idle') }}>
          Écrire un autre message
        </button>
      </div>
    )
  }

  const fieldProps = name => ({
    id: name, name, value: values[name], onChange,
    onBlur: rules[name] ? () => validate(name) : undefined,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-err` : undefined,
    className: `${input} ${errors[name] ? 'border-error' : 'border-rule'}`,
  })

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={state === 'sending'} className="rounded-lg border border-rule bg-paper-2 p-6 sm:p-8">
      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field id="nom" label="Nom" error={errors.nom}>
          <input {...fieldProps('nom')} autoComplete="name" required />
        </Field>
        <Field id="entreprise" label="Entreprise (facultatif)">
          <input {...fieldProps('entreprise')} autoComplete="organization" />
        </Field>
      </div>
      <Field id="email" label="E-mail" error={errors.email}>
        <input {...fieldProps('email')} type="email" autoComplete="email" required />
      </Field>
      <Field id="type" label="Besoin">
        <select {...fieldProps('type')}>
          {needs.map(n => <option key={n}>{n}</option>)}
        </select>
      </Field>
      <Field id="message" label="Votre projet" hint="La tâche concernée, les outils utilisés et le temps qu’elle vous prend." error={errors.message}>
        <textarea {...fieldProps('message')} rows={6} required className={`${fieldProps('message').className} resize-y`}
                  aria-describedby={errors.message ? 'message-err' : 'message-hint'} />
      </Field>
      {/* Champ piège pour les robots, invisible pour les visiteurs */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="site">Ne pas remplir</label>
        <input id="site" name="site" tabIndex={-1} autoComplete="off" value={values.site} onChange={onChange} />
      </div>
      <button type="submit" disabled={state === 'sending'} className={`${btn.primary} disabled:cursor-wait disabled:opacity-70`}>
        {state === 'sending' ? 'Envoi en cours…' : 'Envoyer la demande'}
      </button>
      <div role="status" aria-live="polite">
        {state === 'failed' && (
          <div className="drop mt-5 rounded-md border border-error p-4">
            <p className="font-medium text-error">{failure}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              <a href={`mailto:${company.email}`} className={`${textLink} inline-flex min-h-11 items-center`}>{company.email.replace('@', '@​')}</a>
              <button type="button" onClick={copyEmail} className="inline-flex min-h-11 items-center text-sm text-pen underline-offset-4 hover:underline">
                {copied ? 'Adresse copiée' : 'Copier l’adresse'}
              </button>
            </p>
          </div>
        )}
      </div>
    </form>
  )
}
