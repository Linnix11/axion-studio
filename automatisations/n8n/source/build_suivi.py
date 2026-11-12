# Génère ../axion-3-suivi-clients.json : toutes les 15 minutes, l'état des workflows n8n est envoyé à l'espace client du site.
# Usage : python3 automatisations/n8n/source/build_suivi.py   puis   node automatisations/n8n/source/suivi.test.cjs
# Les nœuds Code reprennent tels quels les fonctions de suivi.cjs (testées à part).
# Paramètres du nœud HTTP Request (v4.2, pagination) vérifiés sur n8n 2.7.5 (n8n-nodes-base/dist/nodes/HttpRequest/V3/Description.js).
import json, uuid
from pathlib import Path

ICI = Path(__file__).resolve().parent
src = (ICI / 'suivi.cjs').read_text()
fn_lister = src[src.index('function listerWorkflows'):src.index('/** Workflows + pages')].strip()
fn_synchro = 'const SEPT_JOURS = 7 * 24 * 3600 * 1000\n\n' + src[src.index('function construireSynchro'):src.index('module.exports')].strip()

def uid(): return str(uuid.uuid4())
def node(name, type_, ver, params, pos):
    # Aucun accès (credentials) écrit ici : n8n signale la case vide et propose l'accès existant.
    return {"parameters": params, "id": uid(), "name": name, "type": type_, "typeVersion": ver, "position": pos}

def pagination(complete, max_requests):
    return {"pagination": {"pagination": {
        "paginationMode": "updateAParameterInEachRequest",
        "parameters": {"parameters": [{"type": "qs", "name": "cursor", "value": "={{ $response.body.nextCursor }}"}]},
        "paginationCompleteWhen": "other",
        "completeExpression": complete,
        "limitPagesFetched": True,
        "maxRequests": max_requests,
    }}}

API_N8N = {"authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth"}

nodes = [
    node("Toutes les 15 minutes", "n8n-nodes-base.scheduleTrigger", 1.2,
         {"rule": {"interval": [{"field": "minutes", "minutesInterval": 15}]}}, [0, 0]),
    node("Réglages", "n8n-nodes-base.code", 2, {"jsCode": "\n".join([
        "// À adapter si besoin :",
        "// - n8n_url : adresse de ce n8n (sur le Mac : http://localhost:5678)",
        "// - crm_url : point d'entrée de l'espace client du site",
        "// - instance : nom de ce n8n dans l'espace client (utile si plusieurs n8n envoient des statuts)",
        "return [{ json: {",
        "  n8n_url: 'http://localhost:5678',",
        "  crm_url: 'https://axionstudio.fr/api/crm/n8n.php',",
        "  instance: 'mac-arthur',",
        "} }]",
    ])}, [220, 0]),
    node("Lister les workflows", "n8n-nodes-base.httpRequest", 4.2, {
        "url": "={{ $json.n8n_url }}/api/v1/workflows?limit=250", **API_N8N,
        "options": pagination("={{ !$response.body.nextCursor }}", 20),
    }, [440, 0]),
    node("Préparer la liste", "n8n-nodes-base.code", 2, {"jsCode":
        fn_lister + "\n\nreturn listerWorkflows($input.all().map(i => i.json)).map(w => ({ json: w }))"}, [660, 0]),
    node("Lire les exécutions (7 jours)", "n8n-nodes-base.httpRequest", 4.2, {
        "url": "={{ $('Réglages').first().json.n8n_url }}/api/v1/executions?workflowId={{ $json.id }}&limit=250", **API_N8N,
        # Pages jusqu'à dépasser 7 jours (ou 1 000 exécutions par workflow)
        "options": pagination("={{ !$response.body.nextCursor || (($response.body.data || []).length > 0 && Date.parse($response.body.data[$response.body.data.length - 1].startedAt) < Date.now() - 7 * 24 * 3600 * 1000) }}", 4),
    }, [880, 0]),
    node("Construire la synchro", "n8n-nodes-base.code", 2, {"jsCode": fn_synchro + "\n\n" + "\n".join([
        "const reglages = $('Réglages').first().json",
        "const workflows = $('Préparer la liste').all().map(i => i.json)",
        "return [{ json: construireSynchro(workflows, $input.all().map(i => i.json), reglages.instance, Date.now()) }]",
    ])}, [1100, 0]),
    node("Envoyer à l'espace client", "n8n-nodes-base.httpRequest", 4.2, {
        "method": "POST", "url": "={{ $('Réglages').first().json.crm_url }}", **API_N8N,
        "sendBody": True, "specifyBody": "json", "jsonBody": "={{ JSON.stringify($json) }}",
        "options": {"timeout": 30000},
    }, [1320, 0]),
]

def link(conns, a, b):
    conns.setdefault(a, {"main": [[]]})["main"][0].append({"node": b, "type": "main", "index": 0})

conns = {}
for a, b in zip(nodes, nodes[1:]):
    link(conns, a["name"], b["name"])

wf = {
    "name": "Axion – 3. Suivi des automatisations clients",
    "nodes": nodes,
    "connections": conns,
    "settings": {"executionOrder": "v1"},
    "pinData": {},
    "meta": {"templateCredsSetupCompleted": False},
}
out = ICI.parent / 'axion-3-suivi-clients.json'
out.write_text(json.dumps(wf, ensure_ascii=False, indent=2) + "\n")
print(f"écrit : {out.relative_to(ICI.parents[2])}")
