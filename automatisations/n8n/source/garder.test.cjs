// Exécute le code du nœud « Garder les prospects utilisables » avec de fausses données n8n.
const assert = require('assert')
const wf = require('../axion-1-collecte-prospects.json')
const code = wf.nodes.find(n => n.name === 'Garder les prospects utilisables').parameters.jsCode
const etab = (o) => ({ etat_administratif: 'A', statut_diffusion_etablissement: 'O', siret: '1', adresse: '1 RUE X', code_postal: '95000', libelle_commune: 'CERGY', ...o })
const ent = (siren, o = {}, et = {}) => ({ json: { siren, nom_complet: 'ENT ' + siren, activite_principale: '43.22A', statut_diffusion: 'O', opposition_diffusion_commerciale: false, matching_etablissements: [etab(et)], ...o } })
const input = [ent('1'), ent('2', { opposition_diffusion_commerciale: true }), ent('3', {}, { statut_diffusion_etablissement: 'P' }),
  ent('4', {}, { nom_commercial: '[NON-DIFFUSIBLE]' }), ent('5', {}, { etat_administratif: 'F' }), ent('1'), ent('6')]
const $ = n => ({ 'Lire les prospects déjà connus': { all: () => [{ json: { siren: '6' } }] },
  'Pages à lire': { all: () => [{ json: { naf: '43.22A', metier: 'plombiers' } }] },
  'Critères de recherche': { first: () => ({ json: { max_entreprises: 80 } }) } })[n]
const out = new Function('$', '$input', code)($, { all: () => input })
assert.deepStrictEqual(out.map(i => i.json.siren), ['1'])
assert.strictEqual(out[0].json.metier, 'plombiers')
console.log('ok : seule l’entreprise 1 est gardée (opposition, diffusion partielle, [NON-DIFFUSIBLE], fermée, doublon et déjà connue écartées)')
