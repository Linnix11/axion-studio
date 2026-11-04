# Charte de marque Axion Studio v1.0

Source de vérité de l'identité d'Axion Studio (site, réseaux sociaux, documents commerciaux).
Établie avec les skills `brand`, `design-system` et `ui-ux-pro-max`. Les valeurs techniques font foi
dans `src/index.css` (jetons) ; ce document les explique et fixe les règles d'usage.

## Quick Reference
- **Primary Color:** #2B5CE6 (bleu stylo)
- **Secondary Color:** #14213D (encre marine)
- **Primary Font:** Schibsted Grotesk (titres, interface) · Source Serif 4 (textes)
- **Voice:** clair, honnête, concret
- **Signature :** « Vos tâches répétitives, faites sans vous. »
- **Univers visuel :** le cahier d'écolier français (papier Seyès, marge rouge, stylo bleu, surligneur)

## 1. Color Palette

### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Bleu stylo (pen) | #2B5CE6 | rgb(43,92,230) | Boutons principaux, liens, contour de focus, notes de marge |
| Encre (ink) | #14213D | rgb(20,33,61) | Textes, titres, chevron du logo |

### Secondary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Surligneur (marker) | #FFE45C | rgb(255,228,92) | Réservé au résultat ou au gain (« automatisé », temps gagné), et au bouton du bandeau bleu. Jamais en fond de grande surface |
| Marge rouge (margin) | #D93D63 | rgb(217,61,99) | Uniquement la ligne de marge verticale, à 70 % d'opacité. Jamais pour du texte |
| Vert validé (ok) | #1D7A4B | rgb(29,122,75) | Coches des garanties et confirmations |

### Neutral Palette
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background | #FFFFFF | rgb(255,255,255) | Fond des pages (paper) |
| Surface | #F3F6FC | rgb(243,246,252) | Bandeaux alternés, formulaires (paper-2) |
| Text Primary | #14213D | rgb(20,33,61) | Corps de texte |
| Text Secondary | #56627D | rgb(86,98,125) | Chapeaux, légendes (muted) |
| Border | #D6DEEE | rgb(214,222,238) | Lignes réglées, bordures (rule) |

### Semantic Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Erreur | #B42318 | rgb(180,35,24) | Messages et bordures d'erreur |
| Bleu du logo | #2B5CE6 | rgb(43,92,230) | Nœuds du logo, identique dans tous les thèmes (`--c-logo`) |

### Thème sombre (sur demande, bouton lune)
| Jeton | Hex |
|-------|-----|
| Fond / surface | #0E1525 / #141D31 |
| Texte / secondaire | #E7EBF4 / #A3ADC4 |
| Bleu stylo / surligneur | #93A9FF / #E9D04B |
| Marge | #FF7D9B |

Le thème clair est le thème par défaut. Un mode « contraste renforcé » assombrit les textes secondaires et retire le quadrillage.

### Accessibility
- Contraste de 4,5:1 minimum pour tout texte (bleu stylo sur blanc : 5,56:1 ; encre sur blanc : 15,9:1).
- Contour de focus de 3 px, contrasté (5,56:1 en clair ; blanc ou encre dans le bandeau bleu).
- Ne jamais transmettre une information par la couleur seule : un texte ou une icône l'accompagne.

## 2. Typography

### Font Stack
- **heading** : 'Schibsted Grotesk Variable', Helvetica Neue, Arial, sans-serif
- **body** : 'Source Serif 4 Variable', Georgia, serif (textes longs, chapeaux, notes de marge en italique)
- **Accessibilité** : Atkinson Hyperlegible remplace les deux sur demande du visiteur

Polices hébergées sur le site (pas de Google Fonts). Trois graisses : 400, 500, 600. Jamais de 700 ni plus.

### Type Scale
| Element | Font | Weight | Size (Desktop/Mobile) | Line Height |
|---------|------|--------|----------------------|-------------|
| H1 accueil | Schibsted Grotesk | 600 | 84px / 44px | 1.02 |
| H1 pages | Schibsted Grotesk | 600 | 72px / 44px | 1.04 |
| H2 | Schibsted Grotesk | 600 | 48px / 32px | 1.15 |
| H3 | Schibsted Grotesk | 500 | 20–24px | 1.25 |
| Chapeau | Source Serif 4 | 400 | 20px / 18px | 1.6 |
| Body | Source Serif 4 | 400 | 18px / 16px | 1.6 |
| Interface | Schibsted Grotesk | 400–500 | 16px | 1.5 |
| Small | Schibsted Grotesk | 400 | 14px | 1.5 |
| Note de marge | Source Serif 4 italique | 400 | 16px | 1.35 |

Titres en casse de phrase (« Comment on travaille ensemble »), jamais en capitales.
Espaces insécables entre un nombre et son unité (« 150 € », « 48 h ») ; apostrophe typographique ’.

## 3. Logo Usage

### Variants
- **Complet** : symbole (réseau de nœuds bleus + chevron) suivi de « Axion Studio » en Schibsted Grotesk 600
- **Symbole seul** : favicon, avatar, logo Google Business (`marketing/banners/google-logo-720x720.png`)
- **Fond sombre** : le chevron passe en couleur claire (il suit la couleur du texte), les nœuds restent bleu #2B5CE6

### Clear Space
Espace libre autour du logo au moins égal au diamètre d'un nœud (1/9 de la hauteur du symbole).

### Minimum Size
Symbole : 24 px de haut à l'écran (favicon 16 px toléré). Logo complet : 32 px de haut.

### Don'ts
- Ne pas changer les couleurs des nœuds, ni ajouter de dégradé ou d'ombre
- Ne pas déformer, incliner ni séparer les nœuds du chevron
- Ne pas poser le logo sur une photo chargée ou sur le surligneur jaune

## 4. Voice & Tone

### Brand Personality
| Trait | Description |
|-------|-------------|
| **Clair** | Mots simples, phrases courtes, aucun jargon sans explication |
| **Honnête** | Pas de chiffres inventés ; les gains sont des ordres de grandeur ; on dit quand ce n'est pas rentable |
| **Concret** | Des exemples de tâches réelles plutôt que des promesses abstraites |
| **Accessible** | Proche et chaleureux, sans familiarité |

### Voice Chart
| Nous sommes | Nous ne sommes pas |
|-------------|--------------------|
| Directs | Agressifs ou insistants |
| Rassurants | Alarmistes sur l'IA |
| Précis (prix, délais écrits) | Vagues (« sur mesure » sans détail) |
| Modestes | Arrogants (« le meilleur », « révolutionnaire ») |

### Tone by Context
| Contexte | Ton |
|----------|-----|
| Site, accueil | Première personne (Arthur, « je »), vouvoiement, bénéfice d'abord |
| Assistant IA | Troisième personne (« Arthur peut… »), brièveté, une question à la fois |
| Erreurs du formulaire | Ce qui se passe et comment corriger, sans s'excuser ni culpabiliser |
| LinkedIn | Conseil utile d'abord, lien ensuite ; pas de hashtags en rafale |
| Devis, CGV | Factuel, chiffres et délais écrits |

### Prohibited Terms
| Terme à éviter | Préférer |
|----------------|----------|
| Révolutionnaire, disruptif | Concret, simple |
| Boostez, explosez vos résultats | Gagnez du temps, moins d'oublis |
| Solution clé en main miracle | Une automatisation testée avec vous |
| 100 % garanti (sur les gains) | Ordre de grandeur, estimation |
| Jargon non expliqué (webhook, API, LLM…) | « vos logiciels se parlent », « l'IA lit vos documents » |

### Messages clés
- Signature : « Vos tâches répétitives, faites sans vous. »
- Proposition : automatiser le travail administratif des TPE, PME et indépendants, avec leurs outils actuels.
- Preuves : audit gratuit de 30 min, prix fixé avant de commencer, vous gardez tout, un mois de suivi inclus.
- Appels à l'action (toujours les mêmes mots) : « Réserver un audit gratuit » (principal), « Voir une démonstration », « Envoyer la demande ».

## 5. Imagery Guidelines

### Photography Style
Pas de photos de banque d'images. Si photos un jour : vrais lieux de travail, lumière naturelle, aucune mise en scène.

### Illustrations
Construites avec l'univers du cahier : papier Seyès (carreaux de 32 px, interlignes de 8 px), marge rouge,
rature au stylo bleu, surligneur jaune. Pas de personnages, pas de robots, pas de dégradés violets « IA ».

### Icons
SVG au trait (épaisseur 2), couleur héritée du texte. Jamais d'emoji ni de caractère « ✓ » comme icône.
Les icônes décoratives sont masquées aux lecteurs d'écran (aria-hidden).

## 6. Composants (rappel des états)

| Composant | Défaut | Survol | Appui | Focus | Désactivé |
|-----------|--------|--------|-------|-------|-----------|
| Bouton principal | fond bleu stylo, texte blanc | fond encre | fond encre, enfoncé d'1 px | contour 3 px | opacité 60 %, curseur interdit |
| Bouton secondaire | fond blanc, bordure réglée | bordure et texte bleus | fond surface | contour 3 px | opacité 60 % |
| Lien | bleu stylo souligné | soulignement épais | — | contour 3 px | — |
| Carte | bordure réglée | soulevée de 3 px, bordure bleue, ombre `card` | — | — | — |

Ombres : `shadow-card` (cartes), `shadow-float` (bulle du chat), `shadow-overlay` (panneaux). Aucune autre ombre.

## Usage
- Toute nouvelle page ou visuel respecte ce document ; en cas de doute, la valeur de `src/index.css` fait foi.
- Bannières et visuels de réseaux sociaux : `marketing/banners/` (script de génération inclus).
