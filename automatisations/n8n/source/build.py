# Génère les deux workflows n8n (../axion-1-collecte-prospects.json, ../axion-2-envoi-emails.json).
# Usage : python3 automatisations/n8n/source/build.py   puis   for t in automatisations/n8n/source/*.test.cjs; do node $t; done
# Les nœuds Code reprennent tels quels extract.js et outils.js (testés à part) ; les pages métier viennent de src/data.js.
import json, re, subprocess, uuid
from pathlib import Path
ICI = Path(__file__).resolve().parent
RACINE = ICI.parents[2]
NB=' '; FI=' '
extract = (ICI / 'extract.cjs').read_text()
fn = extract[extract.index('function chercherEmail'):extract.index('module.exports')].strip()
outils_src = (ICI / 'outils.cjs').read_text()
fn_outils = outils_src[outils_src.index('function reperer'):outils_src.index('module.exports')].strip()

def uid(): return str(uuid.uuid4())
def node(name, type_, ver, params, pos, **extra):
    # Pas d'accès fictif (id vide) : n8n les afficherait comme choisis et l'exécution échouerait
    # (« Found credential with no ID »). Sans accès, n8n signale la case et propose l'accès existant.
    extra.pop("credentials", None)
    n = {"parameters": params, "id": uid(), "name": name, "type": type_, "typeVersion": ver, "position": pos}
    n.update(extra); return n
def link(conns, a, b, out=0, kind="main", idx=0):
    lst = conns.setdefault(a, {}).setdefault(kind, [])
    while len(lst) <= out: lst.append([])
    lst[out].append({"node": b, "type": kind, "index": idx})
def cond(left, op, typ="string", right=None):
    c = {"id": uid(), "leftValue": left, "operator": {"type": typ, "operation": op}}
    if right is None: c["operator"]["singleValue"] = True; c["rightValue"] = ""
    else: c["rightValue"] = right
    return c
def conds(*cs): return {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2}, "conditions": list(cs), "combinator": "and"}
SHEET_DOC = {"__rl": True, "mode": "url", "value": "COLLER_ICI_L_ADRESSE_DE_VOTRE_GOOGLE_SHEET"}
SHEET_TAB = {"__rl": True, "mode": "id", "value": "gid=0"}   # premier onglet, quel que soit son nom
COLS = ["siren","nom","metier","activite","adresse","code_postal","ville","site","telephone","email","source_email","nom_google","statut","date_collecte","date_envoi","objet","message","outils","pistes"]
def schema(cols): return [{"id": c, "displayName": c, "required": False, "defaultMatch": False, "display": True, "type": "string", "canBeUsedToMatch": True} for c in cols]
def sheets_write(name, op, values, pos, match=None, **extra):
    # schema vide : n8n range les valeurs par nom de colonne et ne bloque plus si l'ordre des colonnes de la feuille
    # diffère (« Column names were updated after the node's setup ») ou si on en ajoute une.
    cols = {"mappingMode": "defineBelow", "value": values, "matchingColumns": match or [], "schema": [], "attemptToConvertTypes": False, "convertFieldsToString": True}
    return node(name, "n8n-nodes-base.googleSheets", 4.5, {"operation": op, "documentId": SHEET_DOC, "sheetName": SHEET_TAB, "columns": cols, "options": {}}, pos,
                credentials={"googleSheetsOAuth2Api": {"id": "", "name": "Google Sheets (à connecter)"}}, **extra)

# ───────────────────────── Workflow 1 : collecte ─────────────────────────
n, c = [], {}
n.append(node("Lancer la collecte", "n8n-nodes-base.manualTrigger", 1, {}, [0, 300]))
n.append(node("Critères de recherche", "n8n-nodes-base.set", 3.4, {"assignments": {"assignments": [
    {"id": uid(), "name": "metiers", "value": "43.22A = plombiers et chauffagistes\n43.21A = électriciens\n43.32A = menuisiers\n69.20Z = experts-comptables", "type": "string"},
    {"id": uid(), "name": "departements", "value": "95, 78", "type": "string"},
    {"id": uid(), "name": "pages", "value": 1, "type": "number"},
    {"id": uid(), "name": "max_entreprises", "value": 80, "type": "number"},
]}, "options": {}}, [220, 300], notes=f"À modifier avant chaque lancement{NB}:\n• metiers{NB}: une ligne par métier, « code d'activité = métier en mots » (43.22A plomberie, 43.21A électricité, 69.20Z comptables, 56.10A restaurants, 96.02A coiffure, 47.71Z vêtements…)\n• departements{NB}: séparés par des virgules (95, 78, 75…)\n• pages{NB}: 25 entreprises par page, pour chaque métier et chaque département\n• max_entreprises{NB}: plafond par lancement (limite le coût de Google Places)", notesInFlow=True))
n.append(node("Lire les prospects déjà connus", "n8n-nodes-base.googleSheets", 4.5, {"documentId": SHEET_DOC, "sheetName": SHEET_TAB, "options": {}}, [440, 300],
    credentials={"googleSheetsOAuth2Api": {"id": "", "name": "Google Sheets (à connecter)"}}, alwaysOutputData=True, executeOnce=True))
n.append(node("Pages à lire", "n8n-nodes-base.code", 2, {"jsCode":
"""// Une ligne par recherche : chaque métier × chaque département × chaque page (25 entreprises par page)
const c = $('Critères de recherche').first().json
const metiers = String(c.metiers || '').split('\\n').map(l => l.split('=')).filter(([naf]) => naf && naf.trim())
  .map(([naf, metier]) => ({ naf: naf.trim().toUpperCase(), metier: (metier || '').trim() }))
const departements = String(c.departements || '').split(/[,;\\s]+/).filter(Boolean)
const recherches = []
for (const m of metiers) for (const departement of departements) for (let page = 1; page <= (c.pages || 1); page++)
  recherches.push({ json: { ...m, departement, page } })
return recherches"""}, [660, 300]))
n.append(node("Chercher les entreprises (annuaire de l'État)", "n8n-nodes-base.httpRequest", 4.2, {
    "url": "https://recherche-entreprises.api.gouv.fr/search",
    "sendQuery": True, "queryParameters": {"parameters": [
        {"name": "activite_principale", "value": "={{ $json.naf }}"},
        {"name": "departement", "value": "={{ $json.departement }}"},
        {"name": "etat_administratif", "value": "A"},
        {"name": "per_page", "value": "25"},
        {"name": "page", "value": "={{ $json.page }}"}]},
    "options": {"batching": {"batch": {"batchSize": 1, "batchInterval": 400}}, "timeout": 20000}}, [880, 300],
    notes="API publique et gratuite de l'État (données SIRENE), sans clé. Limite : 7 appels par seconde.", notesInFlow=True))
n.append(node("Une ligne par entreprise", "n8n-nodes-base.splitOut", 1, {"fieldToSplitOut": "results", "options": {}}, [1100, 300]))
n.append(node("Garder les prospects utilisables", "n8n-nodes-base.code", 2, {"jsCode":
"""// Écarte : les entreprises qui refusent la prospection commerciale (droit d'opposition SIRENE),
// celles à diffusion restreinte, celles déjà dans la feuille, et les doublons.
// Déjà connues : toutes les lignes de la feuille, sauf celles que Google n'a jamais traitées (nom_google vide),
// qui sont retentées et mises à jour sur place.
const deja = new Set($('Lire les prospects déjà connus').all().map(i => i.json)
  .filter(r => r.siren && !(r.statut === 'sans e-mail' && !r.nom_google)).map(r => String(r.siren)))
const metierDe = Object.fromEntries($('Pages à lire').all().map(i => [i.json.naf, i.json.metier]))
const { max_entreprises } = $('Critères de recherche').first().json
const vus = new Set()
const prospects = []
for (const { json: e } of $input.all()) {
  if (e.opposition_diffusion_commerciale || e.statut_diffusion !== 'O') continue
  if (deja.has(e.siren) || vus.has(e.siren)) continue
  // établissement ouvert dans le département, et diffusible (un entrepreneur peut masquer son adresse : « [NON-DIFFUSIBLE] »)
  const etab = (e.matching_etablissements || []).find(x => x.etat_administratif === 'A' && (x.statut_diffusion_etablissement || 'O') === 'O')
  if (!etab || /NON-DIFFUSIBLE/.test(JSON.stringify(etab))) continue
  vus.add(e.siren)
  prospects.push({ json: {
    siren: e.siren,
    nom: etab.nom_commercial || (etab.liste_enseignes || [])[0] || e.nom_complet,
    metier: metierDe[e.activite_principale] || '',
    activite: e.activite_principale,
    adresse: etab.adresse,
    code_postal: etab.code_postal,
    ville: etab.libelle_commune,
  } })
}
return prospects.slice(0, max_entreprises || 80)"""}, [1320, 300]))
n.append(node("Trouver le site et le téléphone (Google)", "n8n-nodes-base.httpRequest", 4.2, {
    "method": "POST", "url": "https://places.googleapis.com/v1/places:searchText",
    "authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth",
    "sendHeaders": True, "headerParameters": {"parameters": [{"name": "X-Goog-FieldMask", "value": "places.displayName,places.websiteUri,places.nationalPhoneNumber"}]},
    "sendBody": True, "specifyBody": "json",
    "jsonBody": "={{ JSON.stringify({ textQuery: $json.nom + ' ' + $json.ville, languageCode: 'fr', regionCode: 'FR', pageSize: 1 }) }}",
    "options": {"batching": {"batch": {"batchSize": 1, "batchInterval": 200}}, "timeout": 15000}}, [1540, 300],
    credentials={"httpHeaderAuth": {"id": "", "name": "Google Places (clé d'API)"}},
    notes="Google Places API (New). Payant au-delà du quota gratuit mensuel : environ 3 à 4 centimes par entreprise. Si Google refuse (clé, API non activée, facturation), la collecte s'arrête ici avec son message : rien n'est écrit.", notesInFlow=True))
n.append(node("Ajouter site et téléphone", "n8n-nodes-base.code", 2, {"mode": "runOnceForEachItem", "jsCode":
"""const lieu = ($json.places || [])[0] || {}
return { json: {
  ...$('Garder les prospects utilisables').item.json,
  site: lieu.websiteUri || '',
  telephone: lieu.nationalPhoneNumber || '',
  // à comparer au nom : Google peut renvoyer une autre entreprise ; rempli aussi quand Google n'a rien trouvé (pas retentée)
  nom_google: lieu.displayName?.text || '(pas trouvé sur Google)',
} }"""}, [1760, 300]))
n.append(node("Site trouvé ?", "n8n-nodes-base.if", 2.2, {"conditions": conds(cond("={{ $json.site }}", "notEmpty")), "options": {}}, [1980, 300]))
n.append(node("Lire la page d'accueil", "n8n-nodes-base.httpRequest", 4.2, {"url": "={{ $json.site }}",
    "options": {"batching": {"batch": {"batchSize": 1, "batchInterval": 500}}, "timeout": 10000,
                "response": {"response": {"responseFormat": "text", "outputPropertyName": "html"}}}}, [2200, 200], onError="continueRegularOutput"))
n.append(node("Repérer les outils du site", "n8n-nodes-base.code", 2, {"mode": "runOnceForEachItem", "jsCode":
fn_outils + """

const r = reperer($json.html)
return { json: { ...$('Ajouter site et téléphone').item.json, html: $json.html, outils: r.outils, pistes: r.pistes } }"""}, [2420, 200],
    notes="Outils visibles dans le code de la page d'accueil (site, rendez-vous, boutique, formulaire, chat, e-mailing) et 1 ou 2 pistes d'automatisation, reprises dans l'e-mail.", notesInFlow=True))
n.append(node("Chercher l'e-mail (accueil)", "n8n-nodes-base.code", 2, {"mode": "runOnceForEachItem", "jsCode":
fn + """

const { html, ...base } = $json
const r = chercherEmail(html, base.site)
return { json: { ...base, email: r.email, source_email: r.email ? base.site : '', lien_contact: r.lien_contact } }"""}, [2640, 200]))
n.append(node("Essayer la page contact ?", "n8n-nodes-base.if", 2.2, {"conditions": conds(cond("={{ $json.email }}", "empty"), cond("={{ $json.lien_contact }}", "notEmpty")), "options": {}}, [2860, 200]))
n.append(node("Lire la page contact", "n8n-nodes-base.httpRequest", 4.2, {"url": "={{ $json.lien_contact }}",
    "options": {"batching": {"batch": {"batchSize": 1, "batchInterval": 500}}, "timeout": 10000,
                "response": {"response": {"responseFormat": "text", "outputPropertyName": "html"}}}}, [3080, 100], onError="continueRegularOutput"))
n.append(node("Chercher l'e-mail (page contact)", "n8n-nodes-base.code", 2, {"mode": "runOnceForEachItem", "jsCode":
fn + """

const base = $('Chercher l\\'e-mail (accueil)').item.json
const r = chercherEmail($json.html, base.lien_contact)
return { json: { ...base, email: r.email, source_email: r.email ? base.lien_contact : '' } }"""}, [3300, 100]))
vals = {k: "={{ $json.%s ?? '' }}" % k for k in ["siren","nom","metier","activite","adresse","code_postal","ville","site","telephone","email","source_email","nom_google","outils","pistes"]}
vals.update({"statut": "={{ $json.email ? 'nouveau' : 'sans e-mail' }}", "date_collecte": "={{ $now.toFormat('yyyy-MM-dd') }}"})
n.append(sheets_write("Enregistrer dans la feuille", "appendOrUpdate", vals, [3520, 300], match=["siren"]))
for a, b in [("Lancer la collecte","Critères de recherche"),("Critères de recherche","Lire les prospects déjà connus"),("Lire les prospects déjà connus","Pages à lire"),
             ("Pages à lire","Chercher les entreprises (annuaire de l'État)"),("Chercher les entreprises (annuaire de l'État)","Une ligne par entreprise"),
             ("Une ligne par entreprise","Garder les prospects utilisables"),("Garder les prospects utilisables","Trouver le site et le téléphone (Google)"),
             ("Trouver le site et le téléphone (Google)","Ajouter site et téléphone"),("Ajouter site et téléphone","Site trouvé ?"),
             ("Lire la page d'accueil","Repérer les outils du site"),("Repérer les outils du site","Chercher l'e-mail (accueil)"),("Chercher l'e-mail (accueil)","Essayer la page contact ?"),
             ("Lire la page contact","Chercher l'e-mail (page contact)"),("Chercher l'e-mail (page contact)","Enregistrer dans la feuille")]:
    link(c, a, b)
link(c, "Site trouvé ?", "Lire la page d'accueil", 0); link(c, "Site trouvé ?", "Enregistrer dans la feuille", 1)
link(c, "Essayer la page contact ?", "Lire la page contact", 0); link(c, "Essayer la page contact ?", "Enregistrer dans la feuille", 1)
wf1 = {"name": "Axion – 1. Collecte de prospects", "nodes": n, "connections": c, "active": False, "settings": {"executionOrder": "v1"}, "pinData": {}}

# Code d'activité (NAF) → adresse de la page métier du site
PAGES = json.loads(subprocess.check_output(['node', '-e',
  "import('" + (RACINE / 'src' / 'data.js').as_uri() + "').then(d => console.log(JSON.stringify(Object.fromEntries(d.metiers.flatMap(m => m.naf.map(n => [n, 'https://axionstudio.fr/automatisation/' + m.slug + '/']))))))"]))

# ───────────────────────── Workflow 2 : envoi ─────────────────────────
n, c = [], {}
n.append(node("Chaque jour ouvré à 9 h 40", "n8n-nodes-base.scheduleTrigger", 1.2, {"rule": {"interval": [{"field": "cronExpression", "expression": "40 9 * * 1-5"}]}}, [0, 200]))
n.append(node("Tester maintenant", "n8n-nodes-base.manualTrigger", 1, {}, [0, 400]))
n.append(node("Lire les prospects à contacter", "n8n-nodes-base.googleSheets", 4.5, {"documentId": SHEET_DOC, "sheetName": SHEET_TAB,
    "filtersUI": {"values": [{"lookupColumn": "statut", "lookupValue": "nouveau"}]}, "options": {}}, [220, 300],
    credentials={"googleSheetsOAuth2Api": {"id": "", "name": "Google Sheets (à connecter)"}}))
n.append(node("Avec une adresse e-mail", "n8n-nodes-base.filter", 2.2, {"conditions": conds(cond("={{ $json.email }}", "regex", "string", "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")), "options": {}}, [440, 300]))
n.append(node("20 e-mails par jour au maximum", "n8n-nodes-base.limit", 1, {"maxItems": 20}, [660, 300],
    notes="20 brouillons par jour au plus : de quoi relire chaque e-mail avant de l'envoyer.", notesInFlow=True))
n.append(node("Un prospect à la fois", "n8n-nodes-base.splitInBatches", 3, {"options": {}}, [880, 300]))
prompt = ("=Tu aides Arthur Champagne-Forterre (Axion Studio, automatisation et IA pour les TPE et PME, basé à Montlignon dans le Val-d'Oise) "
  "à écrire le début d'un e-mail de prospection.\n\n"
  "Entreprise : {{ $json.nom }}\nMétier : {{ $json.metier }} (code d'activité {{ $json.activite }})\nVille : {{ $json.ville }}\n"
  "Outils repérés sur son site : {{ $json.outils || 'aucun' }}\nPistes d'automatisation possibles : {{ $json.pistes || 'aucune repérée' }}\n\n"
  "Écris en français, en vouvoyant :\n"
  "- \"objet\" : un objet d'e-mail de 5 à 9 mots, concret, sans emoji ni point d'exclamation ;\n"
  "- \"paragraphe\" : 2 phrases au maximum. S'il y a une piste, appuie-toi sur la plus concrète et, si c'est naturel, "
  "cite l'outil repéré correspondant (par exemple « vous prenez déjà vos rendez-vous sur Planity »). Sinon, cite une tâche "
  "administrative répétitive typique de ce métier (demandes de devis, relances de factures, rendez-vous, commandes, réponses "
  "aux mêmes questions…). Dans les deux cas, dis ce qu'une automatisation simple changerait au quotidien.\n\n"
  "Règles : n'invente aucun fait sur cette entreprise, aucun chiffre, aucun client ; ne cite que les outils listés ci-dessus. Pas de flatterie. "
  "Pas de jargon technique (API, IA générative, workflow). Ne salue pas et ne signe pas.\n\n"
  "Réponds uniquement avec ce JSON : {\"objet\": \"...\", \"paragraphe\": \"...\"}")
n.append(node("Rédiger l'accroche (IA)", "@n8n/n8n-nodes-langchain.chainLlm", 1.7, {"promptType": "define", "text": prompt}, [1100, 380]))
n.append(node("Gemini", "@n8n/n8n-nodes-langchain.lmChatGoogleGemini", 1, {"modelName": "models/gemini-3.5-flash", "options": {"temperature": 0.4}}, [1100, 600],
    credentials={"googlePalmApi": {"id": "", "name": "Google Gemini (clé d'API)"}}))
signature = "Bien cordialement,\nArthur Champagne-Forterre\nAxion Studio · 06 48 61 23 50\nhttps://axionstudio.fr"
n.append(node("Composer l'e-mail", "n8n-nodes-base.code", 2, {"mode": "runOnceForEachItem", "jsCode":
f"""const p = $('Un prospect à la fois').item.json
let ia = {{}}
try {{ ia = JSON.parse(String($json.text || '').replace(/```(json)?/g, '').trim()) }} catch {{ /* réponse illisible : texte de secours ci-dessous */ }}

const objet = ia.objet || `Moins de saisie et de relances chez ${{p.nom}}`
// page du site consacrée au métier du prospect (si son code d'activité en a une)
const PAGES = {json.dumps(PAGES)}
const page = PAGES[String(p.activite || '').toUpperCase()]
const accroche = ia.paragraphe || "Dans beaucoup d'entreprises comme la vôtre, les devis, les relances et les réponses aux mêmes questions prennent plusieurs heures chaque semaine."
const message = [
  'Bonjour,',
  accroche,
  "Je suis Arthur et j'automatise ce type de tâches pour les TPE et PME, avec les outils qu'elles utilisent déjà. Je vous propose un audit gratuit de 30 minutes, par téléphone ou en visio, pour voir ce qui peut l'être chez vous. Le prix est fixé avant de commencer et vous restez libre ensuite.",
  ...(page ? [`Quelques exemples concrets pour votre métier{NB}: ${{page}}`] : []),
  'Auriez-vous 30 minutes la semaine prochaine{FI}?',
  {json.dumps(signature, ensure_ascii=False)},
  "Vous recevez ce message car votre entreprise figure dans l'annuaire public des entreprises (base SIRENE) et que cette adresse est publiée sur votre site. Pour ne plus recevoir de message de ma part, répondez simplement «{FI}STOP{FI}».",
].join('\\n\\n')

return {{ json: {{ ...p, objet, message }} }}"""}, [1320, 380]))
# Brouillon iCloud plutôt qu'envoi : nœud communautaire n8n-nodes-imap (à installer : Settings → Community nodes),
# opération « Create Draft » (IMAP APPEND dans le dossier Drafts, drapeau \\Draft). Accès : l'accès IMAP standard de n8n.
n.append(node("Créer le brouillon (iCloud)", "n8n-nodes-imap.imap", 1, {
    "authentication": "coreImapAccount", "resource": "email", "operation": "createDraft",
    "destinationMailbox": {"__rl": True, "mode": "path", "value": "Drafts"},
    "inputFormat": "fields", "subject": "={{ $json.objet }}", "from": "Arthur Champagne-Forterre <arthur.champagne@icloud.com>",
    "to": "={{ $json.email }}", "text": "={{ $json.message }}"}, [1540, 380], onError="continueErrorOutput",
    notes="Rien n'est envoyé : l'e-mail arrive dans Brouillons (Mail, iCloud). À relire puis envoyer à la main.", notesInFlow=True))
up = lambda statut: {"siren": "={{ $('Composer l\\'e-mail').item.json.siren }}", "statut": statut,
                     "date_envoi": "={{ $now.toFormat('yyyy-MM-dd HH:mm') }}", "objet": "={{ $('Composer l\\'e-mail').item.json.objet }}",
                     "message": "={{ $('Composer l\\'e-mail').item.json.message }}"}
n.append(sheets_write("Marquer « brouillon »", "update", up("brouillon"), [1760, 300], match=["siren"]))
n.append(sheets_write("Marquer « erreur brouillon »", "update", up("erreur brouillon"), [1760, 500], match=["siren"]))
for a, b in [("Chaque jour ouvré à 9 h 40","Lire les prospects à contacter"),("Tester maintenant","Lire les prospects à contacter"),
             ("Lire les prospects à contacter","Avec une adresse e-mail"),("Avec une adresse e-mail","20 e-mails par jour au maximum"),
             ("20 e-mails par jour au maximum","Un prospect à la fois"),("Rédiger l'accroche (IA)","Composer l'e-mail"),
             ("Composer l'e-mail","Créer le brouillon (iCloud)"),("Marquer « brouillon »","Un prospect à la fois"),
             ("Marquer « erreur brouillon »","Un prospect à la fois")]:
    link(c, a, b)
link(c, "Un prospect à la fois", "Rédiger l'accroche (IA)", 1)        # sortie 1 = « loop » (sortie 0 = terminé)
link(c, "Gemini", "Rédiger l'accroche (IA)", 0, "ai_languageModel")
link(c, "Créer le brouillon (iCloud)", "Marquer « brouillon »", 0); link(c, "Créer le brouillon (iCloud)", "Marquer « erreur brouillon »", 1)
wf2 = {"name": "Axion – 2. Brouillons des e-mails de prospection", "nodes": n, "connections": c, "active": False, "settings": {"executionOrder": "v1"}, "pinData": {}}

for f, wf in [("axion-1-collecte-prospects.json", wf1), ("axion-2-envoi-emails.json", wf2)]:
    names = {x["name"] for x in wf["nodes"]}
    assert len(names) == len(wf["nodes"]), "noms en double"
    for a, outs in wf["connections"].items():
        assert a in names, a
        for kind, lst in outs.items():
            for l in lst:
                for t in l: assert t["node"] in names, t["node"]
    json.dump(wf, open(ICI.parent / f, "w"), ensure_ascii=False, indent=2)
    print(f, len(wf["nodes"]), "nœuds")
