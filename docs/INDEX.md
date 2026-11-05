# Persona 3 Reload Portfolio — Documentation Index

Welcome to the documentation hub for the **Persona 3 Reload Portfolio** project. This directory organizes all technical documentation, design specifications, architectural blueprints, and asset rights registers.

---

## 1. Primary Documentation Hub

| Document | Purpose | Target Audience |
|---|---|---|
| [`/README.md`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/README.md) | Project overview, features, installation & quick start guide | Everyone &bull; Developers &bull; Visitors |
| [`/AGENT.md`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/AGENT.md) | AI Agent operational manual, coding rules, directory map & conventions | AI Coding Assistants &bull; Maintainers |
| [`docs/ARCHITECTURE.md`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/docs/ARCHITECTURE.md) | System architecture, state machine, curve math & component hierarchy | Frontend Engineers &bull; UI Architects |
| [`docs/ASSET_MANAGEMENT.md`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/docs/ASSET_MANAGEMENT.md) | Asset provenance, download scripts, copyright clearance & audio policy | Asset Pipeline Engineers &bull; Legal |
| [`/ASSET_VALIDATION_REPORT.md`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/ASSET_VALIDATION_REPORT.md) | Automated binary verification report for all 44 physical media assets | Pipeline Verification &bull; QA |

---

## 2. Media Manifests & Rights Registers

All production media is stored locally in [`public/assets/persona3/`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/public/assets/persona3).

| Manifest File | Format | Description |
|---|---|---|
| [`public/assets/persona3/manifests/assets.json`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/public/assets/persona3/manifests/assets.json) | JSON | Machine-readable registry of all characters, backgrounds, and audio files |
| [`public/assets/persona3/manifests/asset-inventory.csv`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/public/assets/persona3/manifests/asset-inventory.csv) | CSV | Spreadsheet inventory recording byte sizes, resolutions, formats, and URLs |
| [`public/assets/persona3/manifests/rights-register.md`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/public/assets/persona3/manifests/rights-register.md) | Markdown | Intellectual property ownership, SEGA guidelines, and usage boundaries |
| [`public/assets/persona3/asset-gallery.html`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/public/assets/persona3/asset-gallery.html) | HTML | Live media browser for inspecting all acquired artwork and audio in browser |

---

## 3. Original Design Archive (`Design/`)

The [`Design/`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/Design) folder contains the initial planning kit and handoff specifications:

- **`Design/IMPLEMENTATION_BLUEPRINT.md`**: Master blueprint detailing design rules, component architecture, and acceptance criteria.
- **`Design/ARC_AND_SCENE_PLAN.md`**: Geometric specification of the quadratic Bézier arc navigation curve and wallpaper policy.
- **`Design/ASSET_AND_RIGHTS_REGISTER.md`**: Initial copyright and asset clearance notes.
- **`Design/BUILD_BLOCKERS.md`**: Historical audit of missing media in the upstream template and required fixes.
- **`Design/FONT_AND_AUDIO.md`**: Typography notes and procedural audio synthesis specifications.
- **`Design/reference/curved-menu-reference.png`**: Original UI screenshot establishing the curved menu layout requirement.

---

## 4. Visual Verification & Automated Testing

All application screens and responsive states are validated with automated end-to-end regression tests across multiple viewport profiles (Desktop Ultra 1920×1080, Laptop 1440×900 and 1366×768, Tablet 768×1024, and Mobile 390×844 and 360×800).

- **Route Coverage**: Boot sequence, Title screen, Main menu, Persona, Skill, Equip (Timeline & Loadout), Stats, Quest, Item, Social Link, System, and 404 Anomaly.
- **Git Hygiene**: Local temporary test screenshots are gitignored under `screenshots/` to prevent repository bloat and ensure fast deployment.

