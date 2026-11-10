// Exécute le code du nœud « Composer l'e-mail » avec de fausses données n8n.
const assert = require('assert')
const wf = require('../axion-2-envoi-emails.json')
const code = wf.nodes.find(n => n.name === "Composer l'e-mail").parameters.jsCode
const composer = (prospect, texteIA) => new Function('$', '$json', code)(() => ({ item: { json: prospect } }), { text: texteIA }).json
const plombier = composer({ siren: '1', nom: 'PLOMBERIE X', activite: '43.22A', email: 'a@b.fr' }, '{"objet": "Vos devis", "paragraphe": "Phrase."}')
assert.strictEqual(plombier.objet, 'Vos devis')
assert.ok(plombier.message.includes('https://axionstudio.fr/automatisation/artisans-batiment/'))
const autre = composer({ siren: '2', nom: 'AUTRE', activite: '01.11Z', email: 'c@d.fr' }, 'réponse illisible')
assert.ok(!autre.message.includes('/automatisation/') && autre.objet.includes('AUTRE'))
console.log('ok : lien vers la page métier pour un plombier, aucun lien sans page, texte de secours si l’IA répond mal')
