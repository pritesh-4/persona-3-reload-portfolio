# AGENTS.md

## What agents consistently miss

- **Not a router** — `src/App.tsx` is a three-screen state machine (`boot | title | menu`), not React Router
- **Curved arc navigation** — Menu items follow SVG Bézier curve ($P_0=[65,188], P_1=[500,30], P_2=[935,188]$), never straight row
- **Assets in public only** — All media lives in `public/assets/persona3/`, never import from `src/assets`
- **Audio autoplay blocked** — Audio starts only after user gesture (title Enter/click)
- **Lazy-loaded routes** — All 8 internal pages dynamically loaded; initial bundle 137 kB gzipped
- **Decoupled audio** — BGM mute ≠ UI SFX mute (independent channels)
- **Exact Node version** — `20.19+` or `22.12+` required for Vite 8
- **Always run lint** — `npm run lint` must pass (0 errors, 0 warnings) before any changes
- **Rights verification** — All character art and backgrounds require written permission for public hosting
- **Specific fonts** — Anton, Bebas Neue, Montserrat via CSS imports only

## Essential commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — `tsc -b && vite build` (only TypeScript compilation)
- `npm run lint` — ESLint flat config validation
- `npm run preview` — Serve production build

## Key files to understand

- `src/config/personaAssets.ts` — Asset registry with rights status
- `src/data/menuConfig.ts` — Menu labels and metadata
- `Design/ARC_AND_SCENE_PLAN.md` — Curved arc navigation specs
- `Design/ASSET_AND_RIGHTS_REGISTER.md` — Permissions tracker

## Navigation

- `ENTER`/`SPACE` — Confirm, initialize title, open overview
- `ARROWS`/`W`/`S` — Navigate along curved arc menu
- `ESC` — Return to Main Menu or Title Screen
- `M` — Toggle master audio mute

## Common fatal errors

- Adding new routes as React Router paths (use lazy components instead)
- Creating `src/assets` directory (all assets in `public/assets/persona3/`)
- Using gameplay screenshots as backgrounds (use promotional art only)
- Autoplaying audio (requires user gesture)
- Making menu items in straight row (must follow SVG curve)
- Bundling copyrighted OST tracks (use only procedural SFX and ambient loop)
- Skipping `npm run lint` validation
- Assuming Node 18+ works (Vite 8 requires Node 20.19+ or 22.12+)