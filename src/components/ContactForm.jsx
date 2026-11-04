import { useState } from 'react'
import { btn } from './ui'
import { company, needs } from '../data'

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

export default function ContactForm() {
  const [values, setValues] = useState({ nom: '', entreprise: '', email: '', type: needs[0], message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const validate = name => setErrors(e => ({ ...e, [name]: rules[name](values[name]) }))

  const onChange = e => {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const onSubmit = e => {
    e.preventDefault()
    const next = Object.fromEntries(Object.keys(rules).map(k => [k, rules[k](values[k])]))
    setErrors(next)
    const firstBad = Object.keys(next).find(k => next[k])
    if (firstBad) { document.getElementById(firstBad)?.focus(); setStatus(''); return }
    const body = `Nom : ${values.nom}\nEntreprise : ${values.entreprise || '-'}\nE-mail : ${values.email}\nBesoin : ${values.type}\n\n${values.message}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Demande ${company.brand} – ${values.type}`)}&body=${encodeURIComponent(body)}`
    setStatus('Votre logiciel de messagerie s’ouvre avec votre demande. Envoyez le message pour finaliser.')
  }

  const fieldProps = name => ({
    id: name, name, value: values[name], onChange,
    onBlur: rules[name] ? () => validate(name) : undefined,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-err` : undefined,
    className: `${input} ${errors[name] ? 'border-error' : 'border-rule'}`,
  })

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-lg border border-rule bg-paper-2 p-6 sm:p-8">
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
      <button type="submit" className={btn.primary}>Envoyer la demande</button>
      <p role="status" aria-live="polite" className="mt-4 font-medium">{status}</p>
    </form>
  )
}
