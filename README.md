# Persona 3 Reload — Interactive Portfolio

[![React](https://img.shields.io/badge/React-19.3-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite)](https://vite.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.9-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Build Status](https://img.shields.io/badge/Build-Passing_(329ms)-00e676?style=for-the-badge)](#build-and-test)
[![Production Smoke Test](https://img.shields.io/badge/Smoke_Test-24%2F24_PASS-00d2ff?style=for-the-badge)](./FINAL_RELEASE_REPORT.md)
[![Security Review](https://img.shields.io/badge/Security-0_Vulnerabilities-00e676?style=for-the-badge)](./SECURITY_REVIEW.md)

An interactive, game-inspired developer portfolio built with **React 19**, **TypeScript**, **Vite 8**, and **Framer Motion**, delivering the authentic visual identity, atmospheric audio, and UI layout of **Persona 3 Reload (ATLUS / SEGA)**.

---

## Live Demo & Deployment Links
- **Production URL**: [https://pritesh-4.github.io/persona-3-reload-portfolio/](https://pritesh-4.github.io/persona-3-reload-portfolio/)
- **Release & Quality Documentation**:
  - ◈ [**Persona 3 System Expansion Report (4 New Experiences)**](./SYSTEM_EXPANSION_REPORT.md)
  - ◈ [**"Colour Your Night" Soundtrack Implementation Report**](./AUDIO_IMPLEMENTATION_REPORT.md)
  - ◈ [**GitHub Personalisation & Real Project Dossier Report**](./GITHUB_PERSONALISATION_REPORT.md)
  - ◈ [**Product Cleanup & Feature Consolidation Report (Phase 5)**](./PRODUCT_CLEANUP_REPORT.md)
  - ◈ [**Product Completeness Checklist (Phase 5)**](./PRODUCT_COMPLETENESS_CHECKLIST.md)
  - ◈ [**Final Production Release Report (Phase 4)**](./FINAL_RELEASE_REPORT.md)
  - ◈ [**Multi-Platform Deployment Guide**](./PRODUCTION_DEPLOYMENT_GUIDE.md)
  - ◈ [**Security & Privacy Review**](./SECURITY_REVIEW.md)
  - ◈ [**Production Asset Rights Report**](./PRODUCTION_ASSET_RIGHTS_REPORT.md)

---

## Architecture & Features

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

### 2. Eight Internal Portfolio Destinations
Every section is built with its own distinctive Persona 3 Reload interface concept:
1. **PERSONA (`/about`, ID 001)**: Character Profile / Personnel Database File 001. Features Makoto Yuki artwork, S-rank combat/engineering attribute matrix, personal narrative bio, and core engineering directives.
2. **SKILL (`/tools`, ID 002 — legacy `/skills` redirects here)**: Technical Toolkit & Competencies. Features Aigis artwork, category filter tabs, and an interactive item inspection panel.
3. **EQUIP (`/resume`, ID 003)**: Progression & Equipment. Features Akihiko Sanada artwork, dual-mode progression timeline vs. RPG equipment loadout view, project provenance, and zero-dependency resume PDF export.
4. **EXPERIENCE (`/experience`, ID 004)**: Field Record & Achievements. Professional activities, leadership, research and achievement records.
5. **QUEST (`/projects`, ID 005)**: Mission Archive & Project Dossiers. Features Junpei Iori artwork, seven selectable missions (SALVUS, AETHON, ROUTEMIND, ZOGAN, F.R.I.D.A.Y., HOLY TRIAL, ORBIT) with `M-00X` mission codes, category filters (ALL MISSIONS / AI & HEURISTICS / SYSTEMS & AGENTS), implementation-status badges, and a technical dossier panel with briefing, architecture, capabilities, limitations, capture gallery, and repo/demo actions.
6. **STATS (`/stats`, ID 006)**: Developer Telemetry & GitHub Activity. Features Fuuka Yamagishi artwork, real-time GitHub API integration (`pritesh-4`), public repo metrics, language matrix distribution bars, and fallback caching.
7. **SOCIAL LINK (`/contact`, ID 007)**: Communication Terminal. Features Yukari Takeba artwork, frequency link cards (GitHub, LinkedIn, Email, Chronicles of Fate), one-click copy email with visual toast, and external links.
8. **SYSTEM (`/system`, ID 008)**: In-Game Configuration Menu. Features Koromaru artwork, real functional controls for BGM/SFX volumes, mute, reduced motion, artwork dimmer, and factory reset, all persisted in `localStorage`.
9. **404 Anomaly Fallback (`*`)**: Themed Dark Hour anomaly screen with quick retreat to command hub.
10. **Audio Continuity**: Continuous background music across all internal pages with an overarching `AudioProvider` singleton.

### 3. Visual Polish, UX Refinement & Production Optimization (Phase 3)
- **Mobile Responsive Curved Arc Navigation**: Re-engineered quadratic Bézier positioning to preserve the curved arc menu on small devices with an adaptive 5-item sliding window (active up to 1024px viewports), plate scaling, touch swipe gestures, and a portrait offset that keeps the active plate clear of the HUD panel.
- **Per-Screen Image Engine (`screenArtConfig.ts`)**: Custom desktop/mobile wallpapers, character cutout anchors, clamp scaling, and gradient masks ensuring text never overlaps character cutouts.
- **Audio Channel Decoupling & SFX Throttling**: Independent BGM vs. UI SFX controls so muting music never silences clicks. SFX throttle cache (70ms hover, 45ms select) prevents audio clipping.
- **Route-Level Code Splitting**: All internal routes dynamic loaded via `React.lazy()` with `<Suspense fallback={<P3RLoader />}>`, dropping initial bundle transfer to 137 kB gzipped.
- **In-Game Reduced Motion & Accessibility**: CSS overrides halt transforms and transitions instantly when enabled. Zero horizontal scroll overflow across all 9 target viewports.

### 4. Intelligence, Command Terminal & Recruiter Experience (Phase 4 & 5)
- **Global Command Terminal (`Ctrl + K` / `Cmd + K`)**: Native game-styled command palette (`CommandTerminal.tsx`) offering keyboard-driven instant navigation across all 8 destinations, direct project dossier routing with query parameters (`/projects?mission=quest-0X`), quick action access (Resume, Email, GitHub, LinkedIn), and fuzzy keyword filtering with sound effects.
- **Genuine GitHub Telemetry Engine**: Live telemetry for `@pritesh-4` computing language distributions from actual repository codebase byte counts (via GitHub `languages_url` APIs) rather than coarse repository counts. Includes verified tracking of total forks, stars, followers, following, and explicit distinction between live telemetry, local storage caching, and archival benchmark data.
- **Executive Recruiter Quick Profile (`/recruiter`)**: Dedicated scannable profile highlighting academic background at NIT Rourkela, core competencies, 5 flagship project case studies, achievements, verified contact channels, and a print-optimized stylesheet for instant PDF export without replacing the interactive game atmosphere.
- **Developer Personnel Status Panel**: Transparent status configuration (`developerStatusData.ts`) surfacing current research explorations (computational radio astronomy & anomaly detection), active project builds (SALVUS SIH 2026), technical focus areas, and verified availability windows. Accessible via HUD status trigger, menu pill, and command terminal.

---

## Controls Reference

| Input | Action |
|---|---|
| <kbd>ENTER</kbd> / <kbd>SPACE</kbd> | Confirm selection / Initialize title / Activate focused mission |
| <kbd>&uarr;</kbd> / <kbd>&darr;</kbd> or <kbd>W</kbd> / <kbd>S</kbd> | Navigate along the curved arc menu; move between QUEST mission entries |
| <kbd>CTRL+K</kbd> / <kbd>CMD+K</kbd> | Open global S.E.E.S. Command Terminal |
| <kbd>ESC</kbd> | Return to Main Menu / Close active modal or lightbox |
| <kbd>M</kbd> | Toggle master audio mute |
| **Mouse / Touch** | Tap or hover any menu plate; click anywhere to enter |

---

## Visual Verification & Quality Assurance

All screens and navigation flows are verified via automated end-to-end tests across multiple viewport profiles with **0 console errors**:
- **Desktop Ultra (1920 &times; 1080)**: Complete curved arc navigation, full-screen background watermark composition, and high-contrast typography.
- **Laptop Standard (1440 &times; 900, 1366 &times; 768)**: Fluid clamp typography and unobstructed HUD layouts.
- **Tablet Portrait (768 &times; 1024)**: Responsive column folding and touch-optimized navigation plates.
- **Mobile Modern (390 &times; 844, 360 &times; 800)**: Single-column stack, touch gestures, and zero horizontal scroll overflow.

---

## Getting Started

### Prerequisites
- **Node.js**: `20.19+` or `22.12+` (Vite 8 prerequisite)
- **Package Manager**: `npm`

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/pritesh-4/persona-3-reload-portfolio.git
cd persona-3-reload-portfolio

# Install dependencies reproducibly
npm ci

# Start local development server (with HMR)
npm run dev
```

Navigate to `http://localhost:5173/` in your browser.

### Verification, Build & Preview
```bash
# Code quality and linting verification (0 errors, 0 warnings)
npm run lint

# TypeScript strict type checking
npm run type-check

# Compile production bundle (tsc -b && vite build)
npm run build

# Preview production build locally on port 4173
npm run preview -- --port 4173
```

### Production Deployment
The repository includes `.github/workflows/deploy.yml` which deploys automatically to **GitHub Pages** on every push to `main`.
For manual deployment instructions on **Vercel**, **Netlify**, or **Custom Domains**, see [`PRODUCTION_DEPLOYMENT_GUIDE.md`](./PRODUCTION_DEPLOYMENT_GUIDE.md).

---

## Project Architecture

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

## Legal & Intellectual Property Notice

All characters, trademarks, logos, and visual designs of **Persona 3 Reload** are the intellectual property of **ATLUS Co., Ltd.** and **SEGA Corporation**.

- **Character Artwork**: Acquired from the public SEGA Asia website for local portfolio evaluation & non-commercial demonstration under `REFERENCE ONLY` classification.
- **Audio Compliance**: The primary background track is a locally hosted MP3 (`public/assets/persona3/audio/bgm/colour-your-night.mp3`) that is not committed for redistribution; when the file is absent the app automatically falls back to the original synthesized ambient test loop. UI sound cues are procedurally generated.
