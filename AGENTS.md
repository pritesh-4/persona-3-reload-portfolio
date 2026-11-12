# AGENTS.md

Persona 3 Reload interactive portfolio for Pritesh Jena (`pritesh-4`). React 19 + TypeScript 6 + Vite 8 + Framer Motion 14 + React Router 7. Node 20.19+/22.12+ (CI uses Node 22).

## Commands

```bash
npm run dev          # Vite dev server
npm run lint         # ESLint (flat config)
npm run type-check   # tsc --noEmit
npm run test         # node scripts/run-tests.mjs — static integrity suite, NOT a unit test framework
npm run build        # tsc -b && vite build
npm run preview      # serve dist/
```

CI (`.github/workflows/deploy.yml`) runs in this exact order: `lint → type-check → test → build`. Never leave the repo failing any of these.

## Critical: `npm test` is content-coupled

`scripts/run-tests.mjs` asserts on raw file contents — no framework. It fails the build if you:

- Rename/remove assets under `public/assets/persona3/` (it checks exact filenames and minimum file sizes, including the 10 character WebPs, key backgrounds, all 6 WAVs, and `bgm/colour-your-night.mp3`).
- Change repo URLs in `src/data/projectsData.ts`, or drop below 7 `quest-*` ids there (ids are intentionally non-contiguous: quest-01…05, quest-08, quest-09).
- Change route paths in `src/data/menuConfig.ts` or `src/App.tsx`.
- Change SEO meta in `index.html`, the SPA rewrite/`immutable` cache rule in `vercel.json`, or the `node-version: 22` / lint / type-check steps in `deploy.yml`.

If a test fails after an intentional change, update `scripts/run-tests.mjs` together with the source — they are meant to move in lockstep.

## Routing

Defined in `src/App.tsx` (single state machine, no router config file):

- Internal pages: `/about` (PersonaPage), `/tools` (ItemPage, menu label "SKILL"), `/resume` (EquipPage), `/experience`, `/projects` (QuestPage, menu label "QUEST"), `/stats`, `/contact`, `/system`; plus `/menu` and boot/title at `/`. Section IDs: 001–008 in menu order (QUEST 005, STATS 006, SOCIAL LINK 007, SYSTEM 008).
- Legacy redirect: `/skills` → `/tools`. Keep it; tests and old links depend on it. `/projects` is a real QUEST route again — do not reintroduce a redirect.
- All internal pages are `React.lazy()` chunks behind `<Suspense fallback={<P3RLoader />}>` — keep new routes lazy.
- Deep links to internal paths skip the boot sequence automatically (`bootCompleted` initialized from pathname).

## Audio

- Primary BGM: locally hosted authorized MP3 `colour-your-night.mp3`. `AudioProvider` detects a missing file at runtime and falls back to `bgm-ambient-test.wav` — this fallback path is a feature, don't remove it.
- 5 UI SFX WAVs (`hover`, `select`, `confirm`, `back`, `transition`) played through the singleton audio pool in `src/context/AudioProvider.tsx` with throttles: hover ≥ 70ms, select ≥ 45ms between plays.
- Audio must only start after an intentional user gesture (Enter on the Title Screen) — never attempt audible autoplay on load.

## Conventions

- **TypeScript**: `verbatimModuleSyntax`, `noUnusedLocals`/`noUnusedParameters`, and `erasableSyntaxOnly` are on. Always use `import { type X }` for types; no enums/namespaces.
- **Assets**: resolve everything through the typed registries `src/config/personaAssets.ts` and `src/config/screenArtConfig.ts`. Never hardcode asset paths or remote URLs in components. Do not edit files under `public/assets/persona3/` without strong reason.
- **Styling**: design tokens live in `src/styles/theme.css`. Slanted-plate pattern: outer `skewX(-14deg)`, inner content `skewX(14deg)`. Per-page CSS goes in `styles/pages/`, shared internal layout in `styles/layout/` — no inline style blocks in components.
- **System settings** (volumes, mute, reduced motion) persist in `localStorage`; toggled reduced motion applies a `.reduced-motion-active` override in `theme.css`.

## Deployment

- GitHub Pages auto-deploys on push to `main` via Actions. Build base path is relative (`VITE_BASE_PATH=./` in CI, default `'./'` in `vite.config.ts`) so it works on subpaths and root domains.
- SPA fallbacks for non-GitHub hosts: `vercel.json`, `public/_redirects` (Netlify/Cloudflare), `public/404.html` (GH Pages trick). Keep all three in sync when adding routes.
- `VITE_GITHUB_TOKEN` (optional, from `.env.example`) raises the GitHub API rate limit used by `/stats`; without it, StatsPage uses its fallback cache.

## Content integrity (non-negotiable)

This portfolio represents a real person: an undergraduate at NIT Rourkela. Never invent employment, graduation dates, CGPA, internships, or awards, and never present forked repos as original work. `src/data/projectsData.ts` uses explicit `implementationStatus` tags (`VERIFIED IMPLEMENTED` / `RESEARCH PROTOTYPE`) — preserve these boundaries when editing project copy.

## Docs & quirks

- Real documentation lives in `docs/` (`INDEX.md`, `ARCHITECTURE.md`, `ASSET_MANAGEMENT.md`). README links to several release/QA reports that are **not present in the repo** — don't chase those links; check `docs/` instead.
- `scripts/capture-viewports.mjs` and friends are ad-hoc Playwright screenshot tools; Playwright is not a dependency of this repo (the old workflow set `NODE_PATH` to a sibling project's `node_modules`). Skip them unless asked to update `screenshots/`.
