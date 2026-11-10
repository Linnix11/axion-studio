const assert = require('assert')
const wf = require('../axion-1-collecte-prospects.json')
const code = wf.nodes.find(n => n.name === 'Garder les prospects utilisables').parameters.jsCode
const etab = { etat_administratif: 'A', statut_diffusion_etablissement: 'O', adresse: 'X', code_postal: '95000', libelle_commune: 'CERGY' }
const ent = siren => ({ json: { siren, nom_complet: 'E' + siren, activite_principale: '43.22A', statut_diffusion: 'O', opposition_diffusion_commerciale: false, matching_etablissements: [etab] } })
const feuille = [
  { siren: '1', statut: 'sans e-mail', nom_google: '' },                          // Google jamais passé → retentée
  { siren: '2', statut: 'sans e-mail', nom_google: '(pas trouvé sur Google)' },   // Google a répondu → pas retentée
  { siren: '3', statut: 'nouveau', nom_google: 'PLOMBERIE X' },                   // déjà complète
]
const $ = n => ({ 'Lire les prospects déjà connus': { all: () => feuille.map(json => ({ json })) },
  'Pages à lire': { all: () => [{ json: { naf: '43.22A', metier: 'plombiers' } }] },
  'Critères de recherche': { first: () => ({ json: { max_entreprises: 80 } }) } })[n]
const out = new Function('$', '$input', code)($, { all: () => ['1', '2', '3', '4'].map(ent) })
assert.deepStrictEqual(out.map(i => i.json.siren), ['1', '4'])
const save = wf.nodes.find(n => n.name === 'Enregistrer dans la feuille').parameters
assert.strictEqual(save.operation, 'appendOrUpdate'); assert.deepStrictEqual(save.columns.matchingColumns, ['siren'])
assert.ok(!wf.nodes.find(n => n.name === 'Trouver le site et le téléphone (Google)').onError)
console.log('ok : retentée (1), nouvelle (4) ; écartées (2, 3) ; mise à jour par siren ; arrêt si Google refuse')
