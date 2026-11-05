# AGENT.md — Developer & AI Agent Operations Manual

**Project**: Persona 3 Reload Interactive Portfolio  
**Stack**: React 19.3 &bull; TypeScript 6.0 &bull; Vite 8.3 &bull; Framer Motion 14.9 &bull; React Router 7.1  
**Root Path**: `c:\Users\HP\Documents\c_programm\Projects\Persona_port`  
**Node Requirement**: Node.js `20.19+` or `22.12+` (Vite 8 compatibility)

---

## 1. Project Mission & Identity

This repository is an interactive personal portfolio inspired by the visual design, atmospheric audio, and user experience of **Persona 3 Reload (ATLUS / SEGA)**.

### Visual & Atmospheric Directives
- **Palette**: Deep midnight blue (`#030814`, `#081730`), cyan highlights (`#00d2ff`), and crimson/magenta selection accents (`#e11d48`, `#f43f7a`).
- **Typography**: Large condensed italic display headers (**Anton**), UI and navigation plates (**Bebas Neue**), and legible secondary information (**Montserrat**).
- **Background Policy**: **Zero generic CSS gradient scenery or random gameplay screenshots**. All backgrounds must use high-resolution presentation artwork (`p3r-main-key-art.png`, `persona3-reload-promo-group.jpg`) and verified official character cutouts.
- **Navigation**: Curved arc navigation following dynamic quadratic Bézier SVG geometry, not a conventional flat vertical list.
- **Audio**: Autoplay-compliant audio engine with a singleton audio pool for rapid UI sound effects and an original synthesized ambient loop (no unauthorized copyrighted OST files).

---

## 2. Repository Directory Map

```text
Projects/Persona_port/
├── public/
│   └── assets/
│       └── persona3/                  # PRIMARY ASSET REPOSITORY
│           ├── characters/            # 10 Official S.E.E.S. character WebPs
│           │   └── thumbnails/        # Pre-generated 240x320 WebP thumbnails
│           ├── backgrounds/           # Official presentation artwork
│           │   ├── official-wallpapers/  # p3r-main-key-art.png (1920x1080)
│           │   ├── main-visuals/         # Desktop presentation art
│           │   ├── promotional-art/      # Cast promo artwork
│           │   ├── title/                # Moonlit title composition
│           │   └── menu-references/      # In-game menu UI references
│           ├── audio/                 # Validated 22.05kHz 16-bit PCM WAVs
│           │   ├── bgm/               # bgm-ambient-test.wav (24.0s loop)
│           │   └── ui/                # hover, select, confirm, back, transition
│           ├── references/            # Curved menu blueprint screenshot
│           ├── manifests/             # Machine-readable assets.json, CSV, rights
│           └── asset-gallery.html     # Browser-accessible asset preview gallery
│
├── src/
│   ├── components/
│   │   ├── boot/
│   │   │   └── BootSequence.tsx       # Preloader & system initialization screen
│   │   ├── title/
│   │   │   └── TitleScreen.tsx        # Title presentation & prompt screen
│   │   ├── menu/
│   │   │   ├── MainMenu.tsx           # Menu orchestrator & global keybindings
│   │   │   ├── ArcNavigation.tsx      # SVG Bézier curve math & item placement
│   │   │   └── MenuItem.tsx           # Slanted selection plates & active state
│   │   ├── hud/
│   │   │   ├── ProfileStatus.tsx      # Upper-right LV.99 player status panel
│   │   │   ├── ContextPanel.tsx       # Command description & purpose card
│   │   │   ├── ControlHints.tsx       # Bottom game keycap hints
│   │   │   ├── ThemeIndicator.tsx     # THEME: P3R status badge
│   │   │   └── MusicControl.tsx       # Compact HUD audio controller & wave bars
│   │   └── shared/
│   │       ├── CharacterBackdrop.tsx  # Multi-layer background & character stage
│   │       └── ScreenTransition.tsx   # Cinematic diagonal slash wipe
│   ├── config/
│   │   ├── personaAssets.ts           # Centralized typed asset registry
│   │   └── screenArtConfig.ts         # Screen-specific art & character scaling
│   ├── context/
│   │   ├── AudioProvider.tsx          # Single source of truth for Audio & System
│   │   └── AudioContextValue.ts       # React Context contract
│   ├── data/
│   │   ├── experienceData.ts          # Career timeline & RPG equipment
│   │   ├── inventoryData.ts           # Developer workbench gear & tools
│   │   ├── menuConfig.ts              # 8 P3R categories, labels, and metadata
│   │   ├── profileData.ts             # Developer bio, philosophy & attributes
│   │   ├── projectsData.ts            # Featured missions & case studies
│   │   ├── skillsData.ts              # Technical skills & ability tree
│   │   ├── socialLinksData.ts         # Social link frequencies
│   │   └── systemConfig.ts            # Persistent system settings & defaults
│   ├── hooks/
│   │   ├── useAudioContext.ts         # Hook consuming unified audio state
│   │   └── useMenuNavigation.ts       # Keyboard (H & V) & pointer navigation
│   ├── pages/                         # All 9 internal screens & 404
│   │   ├── EquipPage.tsx              # Resume, timeline & print export
│   │   ├── ItemPage.tsx               # Developer workbench & gear
│   │   ├── NotFoundPage.tsx           # 404 anomaly screen
│   │   ├── PersonaPage.tsx            # About & developer dossier
│   │   ├── QuestPage.tsx              # Project archive & missions
│   │   ├── SkillPage.tsx              # Technical skills & ability tree
│   │   ├── SocialLinkPage.tsx         # Contact frequencies & dispatch
│   │   ├── StatsPage.tsx              # GitHub metrics & radar stats
│   │   └── SystemPage.tsx             # Audio, motion & artwork calibration
│   ├── styles/
│   │   ├── theme.css                  # Color tokens, fonts & resets
│   │   ├── boot.css                   # Boot sequence & transition styles
│   │   ├── title.css                  # Title screen typography & prompt
│   │   ├── menu.css                   # Arc navigation, plates & backdrop
│   │   └── hud.css                    # Status panel, context card, hints
│   ├── App.tsx                        # Master screen state machine
│   ├── App.css                        # Viewport layout container
│   ├── index.css                      # Base styling & resets
│   └── main.tsx                       # React 19 root mount
│
├── docs/                              # DOCUMENTATION DIRECTORY
│   ├── INDEX.md                       # Documentation index & navigation map
│   ├── ARCHITECTURE.md                # System design, curve math & state flow
│   └── ASSET_MANAGEMENT.md            # Asset pipeline, rights & audio policy
│
├── Design/                            # Original blueprint kit & handoff specs
├── screenshots/                       # Verified automated test screenshots
├── ASSET_VALIDATION_REPORT.md         # Automated binary validation report
├── Persona3_Reload_Acquired_Assets.zip# 5.3 MB archive with all 44 assets
├── package.json                       # Dependencies & scripts
├── tsconfig.app.json                  # TypeScript configuration
└── eslint.config.js                   # ESLint flat configuration
```

---

## 3. Current Implementation Status

### Phase 1: Opening Screen & Main Menu — COMPLETED
- [x] **Initial Boot Sequence**: Preloads key art, character WebP, and audio while animating authentic system initialization logs. Skippable via <kbd>Space</kbd>, <kbd>Enter</kbd>, or <kbd>Esc</kbd>.
- [x] **Title Screen**: Full-screen 1920&times;1080 key visual with atmospheric contrast veil, corner metadata, and pulsing `PRESS ENTER TO INITIALIZE` prompt.
- [x] **Cinematic Screen Transition**: Diagonal gradient slash wipe crossing the screen between title and menu views.
- [x] **Curved Arc Navigation**: 8-item menu dynamically placed along an SVG quadratic Bézier curve:
  $$\mathbf{B}(t) = (1-t)^2 P_0 + 2(1-t)t P_1 + t^2 P_2 \quad (P_0=[65, 188], P_1=[500, 30], P_2=[935, 188])$$
- [x] **Selection Plates**: Slanted white active plate (`skewX(-14deg)`), crimson red offset accent, dark typography, cyan icons, and an active travelling marker on the SVG track.
- [x] **Dynamic Character Backdrop**: Automatically updates the character cutout and wallpaper when navigating between commands (Makoto, Mitsuru, Akihiko, Fuuka, Junpei, Aigis, Yukari, Koromaru).
- [x] **Surrounding HUD**: Upper-right `YOU (DEV)` status panel with HP/SP meters, left context panel, bottom control hints, theme indicator, and music controller.
- [x] **Audio System**: Singleton audio pool with 5 short UI sound effects and an autoplay-compliant ambient test loop.
- [x] **Responsive Layouts**: Verified across 1920&times;1080, 1440&times;900, 1366&times;768, 768&times;1024, and 390&times;844 with **0 console errors**.

### Phase 2: All Internal Portfolio Screens — COMPLETED
All eight internal screens have been fully implemented with individual Persona 3 Reload visual identities, authentic developer data, and complete interactivity:
1. [x] **PERSONA** (`/about`): Character Profile / Personnel Database File 001. Features Makoto Yuki artwork, S-rank combat/engineering attribute matrix, personal narrative bio, and core engineering directives.
2. [x] **SKILL** (`/skills`): Ability Tree & Competency Matrix. Features Mitsuru Kirijo artwork, category filter tabs (Programming, Development, AI/ML, Engineering, Tools), SP costs, ability tiers, and interactive ability inspector panel.
3. [x] **EQUIP** (`/resume`): Progression & Equipment. Features Akihiko Sanada artwork, dual-mode progression timeline (GSSoC 2026 Contributor, DevLore, AI Impact Predictor, B.Tech) vs. RPG equipment loadout view, and resume dispatch modal.
4. [x] **STATS** (`/stats`): Developer Telemetry & GitHub Activity. Features Fuuka Yamagishi artwork, real-time GitHub API integration (`pritesh-4`), public repo metrics, language matrix distribution bars, and fallback caching.
5. [x] **QUEST** (`/projects`): Mission Archive. Features Junpei Iori artwork, Tartarus request cards with difficulty ranks (Rank S, Rank A), mission status tags, and interactive detail panel with architecture breakdown, live demos, and repos.
6. [x] **ITEM** (`/tools`): Developer Tooling & Inventory. Features Aigis artwork, grid slot layout with icons/quantities, rarity tiers, and item inspection panel with functional lore and project provenance.
7. [x] **SOCIAL LINK** (`/contact`): Communication Terminal. Features Yukari Takeba artwork, frequency link cards (GitHub, LinkedIn, Email, Chronicles of Fate), one-click copy email with visual toast, and external links.
8. [x] **SYSTEM** (`/system`): In-Game Configuration Menu. Features Koromaru artwork, real functional controls for BGM/SFX volumes, mute, reduced motion, artwork dimmer, and factory reset, all persisted in `localStorage`.
9. [x] **404 Anomaly Fallback** (`*`): Themed Dark Hour anomaly screen with quick retreat to command hub.
10. [x] **Universal Internal Layout**: Reusable header with `< MENU [ESC]` button, quick section navigation switcher pills, BGM control, and keyboard shortcuts (<kbd>ESC</kbd>, <kbd>M</kbd>).
11. [x] **Routing & Audio Continuity**: Full React Router integration with uninterrupted background music playback across all route changes.

### Phase 3: Visual Polish, UX Refinement & Production Optimization — COMPLETED
- [x] **Curved Arc Mobile Preservation**: Re-engineered quadratic Bézier positioning in `ArcNavigation.tsx` so the arc never collapses into a flat list on mobile. Integrated adaptive 5-item sliding window, plate scaling, and touch swipe gestures.
- [x] **Audio Decoupling & SFX Throttling**: Decoupled BGM mute from tactile UI sound cues in `AudioProvider.tsx`. Added timestamp throttle cache (70ms hover, 45ms select) to prevent audio buffer overlap and distortion.
- [x] **Route-Level Code Splitting**: Converted all 8 internal routes in `App.tsx` to `React.lazy()` chunks with `<Suspense fallback={<P3RLoader />}>`, cutting initial bundle size to 137 kB gzipped and enabling sub-second load times.
- [x] **Per-Screen Image Engine**: Created `src/config/screenArtConfig.ts` to manage high-resolution wallpapers, character cutouts, scale, positioning, mobile opacity, and directional contrast masks.
- [x] **Comprehensive Viewport Audits**: Tested across all 9 target viewports (1920x1080, 1440x900, 1366x768, 1024x768, 768x1024, 430x932, 390x844, 375x812, 360x800) with 0 horizontal overflow and zero console errors.
- [x] **Accessibility & Reduced Motion**: Added `.reduced-motion-active` CSS overrides in `theme.css` to instantly disable animations when toggled in the in-game System menu.
- [x] **Final Production QA Report**: Complete documentation generated in [`FINAL_QA_REPORT.md`](./FINAL_QA_REPORT.md) with 14/14 automated test verification.

### Phase 4: Production Deployment & Launch — COMPLETED
- [x] **GitHub Actions CI/CD Pipeline**: Configured `.github/workflows/deploy.yml` with least-privilege permissions, linting, type-checking, build steps, and automated publishing to GitHub Pages.
- [x] **Multi-Platform SPA Routing**: Integrated `public/404.html` and `index.html` redirection script for GitHub Pages, `vercel.json` for Vercel edge deployment with immutable caching, and `public/_redirects` for Netlify/Cloudflare.
- [x] **Production SEO & Discovery Engine**: Implemented `public/robots.txt`, `public/sitemap.xml`, `public/manifest.json`, `public/favicon.svg`, Open Graph tags, Twitter/X cards, and JSON-LD structured data for Pritesh Jena.
- [x] **Asset Rights & Release Gate Verification**: Published comprehensive [`PRODUCTION_ASSET_RIGHTS_REPORT.md`](./PRODUCTION_ASSET_RIGHTS_REPORT.md) verifying non-commercial educational use for character artwork and original procedural synthesized audio.
- [x] **Security & Privacy Audit**: Published [`SECURITY_REVIEW.md`](./SECURITY_REVIEW.md) certifying zero exposed secrets, 100% `rel="noopener noreferrer"` external links, no XSS vectors, and zero third-party tracking scripts.
- [x] **Performance Optimization**: Measured real-world performance: FCP 520ms, DOMContentLoaded 434ms, initial JS transfer 135.27 KB, and 329ms build time.
- [x] **24/24 Automated Smoke Test Pass**: Tested complete user journey across all 11 screens, direct deep link access, SPA refreshes, and mobile viewports with 0 broken assets and zero network 404s.
- [x] **Multi-Platform Deployment Operations Guide**: Published [`PRODUCTION_DEPLOYMENT_GUIDE.md`](./PRODUCTION_DEPLOYMENT_GUIDE.md) and [`FINAL_RELEASE_REPORT.md`](./FINAL_RELEASE_REPORT.md).

---

## 4. Key Architectural Patterns & Rules

### A. TypeScript & Module Conventions
- **`verbatimModuleSyntax` is enabled in `tsconfig.app.json`**: Always use type-only imports for types and interfaces:
  ```typescript
  import { useState, useCallback, type FC } from 'react';
  import { type MenuItemConfig } from '../../data/menuConfig';
  ```
- **Zero TypeScript Errors**: Always run `npm run build` (`tsc -b && vite build`) to confirm compilation.

### B. Asset Path Conventions
- Always reference assets from `/assets/persona3/` via the centralized registry in [`src/config/personaAssets.ts`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/src/config/personaAssets.ts).
- Never hardcode remote URLs or absolute local machine paths inside React components.
- Standard asset helper:
  ```typescript
  import { PERSONA_CHARACTERS, PERSONA_BACKGROUNDS, PERSONA_AUDIO } from '../config/personaAssets';
  ```

### C. Audio Rules (Strict Compliance)
- **No Copyrighted OST Rips**: Do not download or bundle copyrighted Persona 3 Reload soundtrack recordings (*Burn My Dread*, *Color Your Night*, etc.).
- **Development Placeholder**: Use `/assets/persona3/audio/bgm/bgm-ambient-test.wav`.
- **Autoplay Compliance**: Audio must never attempt audible autoplay on page load. It starts only after an intentional user gesture (e.g., pressing Enter on the Title Screen).
- **Sound Effects**: Play UI sounds via the `useAudio` hook or `playUiSound(cue)` helper.

### D. CSS & Styling Philosophy
- Maintain all theme tokens in [`src/styles/theme.css`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/src/styles/theme.css).
- Skew angles:
  - Outer slanted containers: `transform: skewX(-12deg)` or `skewX(-14deg)`.
  - Inner content un-skew: `transform: skewX(12deg)` or `skewX(14deg)` to keep text vertical and sharp.
- Do not use inline styles with hundreds of lines of CSS; keep components modular and maintain styling in `src/styles/*.css`.

---

## 5. Development & Verification Commands

All commands should be executed from `c:\Users\HP\Documents\c_programm\Projects\Persona_port`:

```bash
# Start local development server (with HMR)
npm run dev

# Run ESLint validation
npm run lint

# Run TypeScript compilation and production build
npm run build

# Preview production build locally
npm run preview
```

### Running Automated Visual Tests (Playwright)
To execute the multi-viewport visual test suite and capture screenshots:
```powershell
$env:NODE_PATH = "C:\Users\HP\Documents\c_programm\Projects\Holytrial\node_modules"
node "C:\Users\HP\.gemini\antigravity\brain\f20eba93-f1e2-497c-98c0-96c3a21f687a\scratch\run_visual_tests.cjs"
```

---

## 6. Agent Rules of Engagement

1. **Maintain Working Builds**: Never leave the repository in a state where `npm run lint` or `npm run build` fails.
2. **Preserve Documentation**: When adding new pages or features, update `docs/INDEX.md` and `README.md`.
3. **Respect Existing Assets**: Do not modify or overwrite files in `public/assets/persona3/` without explicit necessity.
4. **Follow the Established Component Hierarchy**: Keep boot, title, menu, hud, and shared components separated in `src/components/`.
5. **No AI-Generated Substitutes**: Official character artwork and promotional key visuals must remain genuine; do not substitute with generative AI artwork.

