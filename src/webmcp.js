// Outils WebMCP pour les agents IA intégrés au navigateur (proposition W3C, encore expérimentale).
// La spécification place l'API sur document.modelContext ; les premières versions et certains
// contrôles utilisent navigator.modelContext. Les deux sont essayés ; sans API, rien ne se passe.
// Aucun outil n'envoie de message : la demande d'audit est seulement pré-remplie, le visiteur l'envoie.
import { company, services, offers, metiers } from './data'
import { preparerDemande } from './demande'

const site = `https://${company.domain}`
const texte = t => ({ content: [{ type: 'text', text: t }] })

const infos = () => [
  `${company.brand} : studio indépendant d'automatisation et d'IA pour TPE et PME, ${company.city}, interventions à distance partout en France.`,
  `Responsable : ${company.owner}. Contact : ${company.email}, ${company.phone}. Réponse sous ${company.delai}.`,
  '',
  'Services :',
  ...services.map(s => `- ${s.title} : ${s.short} (${site}/services/#${s.slug})`),
  `- Agence n8n : workflows n8n sur mesure (${site}/agence-n8n/)`,
  '',
  'Tarifs :',
  ...offers.map(o => `- ${o.name} : ${o.from ? 'dès ' : ''}${o.price}, ${o.unit}`),
  `Détail : ${site}/tarifs/`,
  '',
  'Pages par métier :',
  ...metiers.map(m => `- ${m.nom} : ${site}/automatisation/${m.slug}/`),
  '',
  `Prestations réservées aux professionnels. Contact : ${site}/contact/`,
].join('\n')

const outils = [
  {
    name: 'axion_studio_infos',
    description: 'Renvoie la présentation d’Axion Studio (agence d’automatisation et d’IA pour TPE et PME en France) : services, tarifs, pages par métier et coordonnées.',
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    async execute() { return texte(infos()) },
  },
  {
    name: 'axion_studio_preparer_demande_audit',
    description: 'Ouvre la page Contact d’Axion Studio avec le message de demande d’audit gratuit déjà rédigé. N’envoie rien : le visiteur complète son nom et son e-mail puis envoie lui-même.',
    inputSchema: {
      type: 'object',
      properties: {
        besoin: { type: 'string', description: 'La tâche à automatiser, les outils utilisés et le temps qu’elle prend chaque semaine.' },
        entreprise: { type: 'string', description: 'Activité ou métier de l’entreprise (facultatif).' },
      },
      required: ['besoin'],
    },
    async execute({ besoin, entreprise } = {}) {
      const msg = `Bonjour,\n\n${entreprise ? `Activité : ${entreprise}.\n` : ''}Mon besoin : ${String(besoin || '').trim()}`
      preparerDemande(msg)
      if (!location.pathname.startsWith('/contact')) location.assign('/contact/')
      return texte('Le formulaire de contact est ouvert avec la demande pré-remplie. Le visiteur doit indiquer son nom et son e-mail, puis cliquer sur « Envoyer la demande ».')
    },
  },
]

export function enregistrerOutils() {
  const mc = document.modelContext || navigator.modelContext
  if (!mc?.registerTool) return
  for (const outil of outils) {
    try { Promise.resolve(mc.registerTool(outil)).catch(() => {}) } catch { /* API différente ou outil déjà enregistré */ }
  }
}
