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

## 4. Visual Test Artifacts (`screenshots/`)

Automated visual regression tests captured across multiple viewports are saved in [`screenshots/`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots):

- `01-boot-sequence.png`: Preloader initialization sequence.
- `02-title-screen-1920x1080.png`: Full-screen title screen at 1080p FHD.
- `03-main-menu-1920x1080.png`: Main menu with curved arc navigation.
- `04-main-menu-navigated.png`: Active navigation state with dynamic character update.
- `05-selection-modal.png`: Category overview modal on item confirmation.
- `06-main-menu-1440x900.png`: Laptop widescreen layout.
- `06-main-menu-1366x768.png`: Standard laptop HD layout.
- `06-main-menu-768x1024.png`: Tablet portrait layout.
- `06-main-menu-390x844.png`: Mobile phone layout.
- `07-return-to-title.png`: Escape back-navigation to Title Screen.
- `08-persona-desktop.png`: Character Profile dossier (Makoto Yuki) at 1080p FHD.
- `09-skill-desktop.png`: Ability tree and technical competencies (Mitsuru Kirijo) at 1080p FHD.
- `09b-skill-interactive.png`: Category switching and skill inspection active state.
- `10-equip-desktop.png`: Experience & education progression timeline (Akihiko Sanada) at 1080p FHD.
- `10b-equip-loadout.png`: RPG equipment loadout view with weapon/armor/accessory stats.
- `11-stats-desktop.png`: Real-time GitHub telemetry and language matrix (Fuuka Yamagishi) at 1080p FHD.
- `12-quest-desktop.png`: Project mission archive with status badges (Junpei Iori) at 1080p FHD.
- `12b-quest-selected.png`: Expandable mission architectural dossier and deployment links.
- `13-item-desktop.png`: Developer tooling inventory and rarity slots (Aigis) at 1080p FHD.
- `14-social-desktop.png`: Communication terminal with one-click clipboard copy (Yukari Takeba) at 1080p FHD.
- `15-system-desktop.png`: Configuration menu with volume sliders and localStorage persistence (Koromaru).
- `16-return-to-menu-esc.png`: Keyboard Escape return to Main Menu from internal screens.
- `17-persona-mobile-390x844.png` to `24-system-mobile-390x844.png`: Full suite of mobile-responsive viewports.
- `25-404-fallback.png`: Dark Hour anomaly route fallback screen.

