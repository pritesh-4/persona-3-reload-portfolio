# Persona 3 Reload — Interactive Portfolio

[![React](https://img.shields.io/badge/React-19.3-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite)](https://vite.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.9-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Build Status](https://img.shields.io/badge/Build-Passing_(721ms)-00e676?style=for-the-badge)](#build-and-test)
[![Phase 3 QA](https://img.shields.io/badge/Phase_3_QA-14%2F14_PASS-00d2ff?style=for-the-badge)](./FINAL_QA_REPORT.md)

An interactive, game-inspired developer portfolio built with **React 19**, **TypeScript**, **Vite 8**, and **Framer Motion**, delivering the authentic visual identity, atmospheric audio, and UI layout of **Persona 3 Reload (ATLUS / SEGA)**.

---

## 🌟 Complete Architecture & Features

### 1. Opening Experience & Main Menu (Phase 1)
- **Cinematic Boot Sequence**: Atmospheric system initialization with scanlines, real asset preloading, progress indicator, and skippable prompt.
- **Title / Entry Screen**: Full-screen 1080p promotional key art composition with metadata badges, atmospheric vignette, and interactive entry prompt (`PRESS ENTER TO INITIALIZE`).
- **Cinematic Screen Transition**: High-velocity diagonal slash wipe with Persona crimson red, magenta, cyan, and white gradient.
- **Curved Arc Navigation**: Menu items positioned dynamically along an SVG quadratic Bézier curve:
  $$\mathbf{B}(t) = (1-t)^2 P_0 + 2(1-t)t P_1 + t^2 P_2$$
  featuring slanted active plates (`skewX(-14deg)`), crimson offset accents, and travelling SVG arc markers.
- **Dynamic Character & Presentation Artwork**: Seamlessly coordinates 10 official SEGA character renders with high-resolution promotional artwork.
- **Surrounding HUD System**:
  - Upper-right `YOU (DEV) LV. 99` status panel with HP/SP-styled DEV and EXP meters.
  - Contextual command description card.
  - Compact HUD music controller with real-time animated wave bars.
  - Game-style control keycap hints.
  - Theme status badge (`THEME: P3R`).

### 2. All Eight Internal Portfolio Screens (Phase 2)
Every section is built with its own distinctive Persona 3 Reload interface concept:
1. **PERSONA (`/about`)**: Character Profile / Personnel Database File 001. Features Makoto Yuki artwork, S-rank combat/engineering attribute matrix, personal narrative bio, and core engineering directives.
2. **SKILL (`/skills`)**: Ability Tree & Competency Matrix. Features Mitsuru Kirijo artwork, category filter tabs (Programming, Development, AI/ML, Engineering, Tools), SP costs, ability tiers, and interactive ability inspector panel.
3. **EQUIP (`/resume`)**: Progression & Equipment. Features Akihiko Sanada artwork, dual-mode progression timeline (GSSoC 2026 Contributor, DevLore, AI Impact Predictor, B.Tech) vs. RPG equipment loadout view, and resume dispatch modal.
4. **STATS (`/stats`)**: Developer Telemetry & GitHub Activity. Features Fuuka Yamagishi artwork, real-time GitHub API integration (`pritesh-4`), public repo metrics, language matrix distribution bars, and fallback caching.
5. **QUEST (`/projects`)**: Mission Archive. Features Junpei Iori artwork, Tartarus request cards with difficulty ranks (Rank S, Rank A), mission status tags, and interactive detail panel with architecture breakdown, live demos, and repos.
6. **ITEM (`/tools`)**: Developer Tooling & Inventory. Features Aigis artwork, grid slot layout with icons/quantities, rarity tiers, and item inspection panel with functional lore and project provenance.
7. **SOCIAL LINK (`/contact`)**: Communication Terminal. Features Yukari Takeba artwork, frequency link cards (GitHub, LinkedIn, Email, Chronicles of Fate), one-click copy email with visual toast, and external links.
8. **SYSTEM (`/system`)**: In-Game Configuration Menu. Features Koromaru artwork, real functional controls for BGM/SFX volumes, mute, reduced motion, artwork dimmer, and factory reset, all persisted in `localStorage`.
9. **404 Anomaly Fallback (`*`)**: Themed Dark Hour anomaly screen with quick retreat to command hub.
10. **Audio Continuity**: Continuous background music across all internal pages with an overarching `AudioProvider` singleton.

### 3. Visual Polish, UX Refinement & Production Optimization (Phase 3)
- **Mobile Responsive Curved Arc Navigation**: Re-engineered quadratic Bézier positioning to preserve the curved arc menu on small devices ($\le 768\text{px}$) with an adaptive 5-item sliding window, plate scaling, and touch swipe gestures.
- **Per-Screen Image Engine (`screenArtConfig.ts`)**: Custom desktop/mobile wallpapers, character cutout anchors, clamp scaling, and gradient masks ensuring text never overlaps character cutouts.
- **Audio Channel Decoupling & SFX Throttling**: Independent BGM vs. UI SFX controls so muting music never silences clicks. SFX throttle cache (70ms hover, 45ms select) prevents audio clipping.
- **Route-Level Code Splitting**: All internal routes dynamic loaded via `React.lazy()` with `<Suspense fallback={<P3RLoader />}>`, dropping initial bundle transfer to 137 kB gzipped.
- **In-Game Reduced Motion & Accessibility**: CSS overrides halt transforms and transitions instantly when enabled. Zero horizontal scroll overflow across all 9 target viewports.
- **Complete QA Audit**: 14/14 automated tests passed with 0 console errors and 0 ESLint warnings. Detailed in [`FINAL_QA_REPORT.md`](./FINAL_QA_REPORT.md).

---

## 🎮 Controls Reference

| Input | Action |
|---|---|
| <kbd>ENTER</kbd> / <kbd>SPACE</kbd> | Confirm selection / Initialize title / Open category overview |
| <kbd>&uarr;</kbd> / <kbd>&darr;</kbd> or <kbd>W</kbd> / <kbd>S</kbd> | Navigate along the curved arc menu |
| <kbd>ESC</kbd> | Return to Main Menu / Return to Title Screen |
| <kbd>M</kbd> | Toggle master audio mute |
| **Mouse / Touch** | Tap or hover any menu plate; click anywhere to enter |

---

## 📸 Visual Previews & Test Artifacts

Automated visual regression tests verified with Playwright (**0 console errors**):

| Screen | Viewport | Screenshot Link |
|---|---|---|
| **Boot Sequence** | 1920 &times; 1080 | [`screenshots/01-boot-sequence.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/01-boot-sequence.png) |
| **Title Screen** | 1920 &times; 1080 | [`screenshots/02-title-screen-1920x1080.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/02-title-screen-1920x1080.png) |
| **Main Menu (Arc Navigation)** | 1920 &times; 1080 | [`screenshots/03-main-menu-1920x1080.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/03-main-menu-1920x1080.png) |
| **PERSONA (Profile Dossier)** | 1920 &times; 1080 | [`screenshots/08-persona-desktop.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/08-persona-desktop.png) |
| **SKILL (Ability Matrix)** | 1920 &times; 1080 | [`screenshots/09-skill-desktop.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/09-skill-desktop.png) |
| **EQUIP (Progression Timeline)**| 1920 &times; 1080 | [`screenshots/10-equip-desktop.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/10-equip-desktop.png) |
| **EQUIP (Loadout Mode)** | 1920 &times; 1080 | [`screenshots/10b-equip-loadout.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/10b-equip-loadout.png) |
| **STATS (Telemetry & GitHub)** | 1920 &times; 1080 | [`screenshots/11-stats-desktop.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/11-stats-desktop.png) |
| **QUEST (Mission Archive)** | 1920 &times; 1080 | [`screenshots/12-quest-desktop.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/12-quest-desktop.png) |
| **ITEM (Inventory Gear)** | 1920 &times; 1080 | [`screenshots/13-item-desktop.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/13-item-desktop.png) |
| **SOCIAL LINK (Terminal)** | 1920 &times; 1080 | [`screenshots/14-social-desktop.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/14-social-desktop.png) |
| **SYSTEM (Configuration)** | 1920 &times; 1080 | [`screenshots/15-system-desktop.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/15-system-desktop.png) |
| **Mobile PERSONA** | 390 &times; 844 | [`screenshots/17-persona-mobile-390x844.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/17-persona-mobile-390x844.png) |
| **Mobile QUEST** | 390 &times; 844 | [`screenshots/21-quest-mobile-390x844.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/21-quest-mobile-390x844.png) |
| **404 Dark Hour Anomaly** | 1920 &times; 1080 | [`screenshots/25-404-fallback.png`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/screenshots/25-404-fallback.png) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `20.19+` or `22.12+` (Vite 8 prerequisite)
- **Package Manager**: `npm`

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/RohitPoul/Person-3-Reload-Potfolio.git
cd Person-3-Reload-Potfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Navigate to `http://localhost:5173/` in your browser.

### Build and Test
```bash
# Run ESLint check (0 errors, 0 warnings)
npm run lint

# Build for production (tsc -b && vite build)
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```text
src/
├── components/
│   ├── boot/             # Preloader and boot sequence
│   ├── title/            # Title presentation & prompt screen
│   ├── menu/             # Curved arc navigation & selection modal
│   ├── hud/              # Player status, context card, hints, audio control
│   ├── layout/           # InternalPageLayout reusable page framework
│   └── shared/           # Character stage backdrop & diagonal slash wipe
├── context/              # AudioProvider & AudioContextValue (persistent state)
├── config/               # Centralized typed personaAssets registry
├── data/                 # Typed content models (profile, skills, experience, projects, inventory, social, system)
├── hooks/                # useAudio, useAudioContext, useMenuNavigation, useClickSound
├── pages/                # 8 P3R internal screens + 404 fallback
├── styles/               # Theme tokens, menu, hud, layout, and page-specific styles
├── App.tsx               # Master router & screen transition orchestrator
└── main.tsx              # Application mount with BrowserRouter & AudioProvider
```

---

## ⚖️ Legal & Intellectual Property Notice

All characters, trademarks, logos, and visual designs of **Persona 3 Reload** are the intellectual property of **ATLUS Co., Ltd.** and **SEGA Corporation**.

- **Character Artwork**: Acquired from the public SEGA Asia website for local portfolio evaluation & non-commercial demonstration under `REFERENCE ONLY` classification.
- **Audio Compliance**: No copyrighted game soundtrack files are bundled. The project features an original synthesized ambient test loop and procedural UI sound cues.
