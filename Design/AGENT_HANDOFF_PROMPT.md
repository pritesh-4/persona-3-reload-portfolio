# Coding-agent handoff prompt

Use this prompt when opening the reference project in Cursor, Claude Code or another coding agent with access to the user's working repository.

---

You are implementing a P3R-inspired personal portfolio in the existing React/Vite repository `Person-3-Reload-Potfolio`.

## Chosen direction
- Visual direction: Persona 3 Reload-inspired, but retain an original personal identity. Do not create a pixel-perfect copy of proprietary game UI.
- Character artwork: official Persona 3 Reload characters. Use only files that the user has supplied or explicitly confirmed are cleared for public use. The URLs in `assets.json` are sources, not permission. Never bundle uncleared artwork in the public build.
- Audio: the user prefers the official licensed OST. Do not rip or bundle game music. Leave BGM disabled until a direct web streaming/synchronisation licence is documented. Never hide a Spotify embed behind a custom player. Original/licensed UI SFX are acceptable if their licences allow web use.

## First inspect, then change
1. Read `IMPLEMENTATION_BLUEPRINT.md`, `ASSET_AND_RIGHTS_REGISTER.md`, `assets.json` and the current source tree.
2. Check every import under `src/assets`. The inspected GitHub tree did not contain `src/assets`, although App, About, Resume, GitHub and Side Projects import media from it. Do not assume those files exist; repair the missing imports/fallbacks before building.
3. Correct the README Node requirement: Vite 8 requires Node 20.19+ or 22.12+.
4. Run `npm ci`, `npm run lint` and `npm run build` before and after changes; report exact results.
5. Do not push to an upstream repository without write access and explicit instruction.

## Visual direction
- Midnight/deep ocean blue as the dominant atmosphere, cyan/electric blue as active/focus colour, white for high-contrast information planes, red as a selective action accent.
- Use official P3R promotional/key visuals, official PC/mobile wallpaper compositions, title wallpapers and character promo art as the real background layer on main routes. Do not use gameplay-environment screenshots (Tartarus, classroom, Velvet Room dialogue, random cutscenes) as wallpapers. Title/menu/save/load/Social Stats/Fusion/skill screenshots are UI references only; recreate the UI using real portfolio content. Use only artwork cleared for public website use. Do not replace artwork with generic CSS gradients, abstract geometry or vector characters.
- A shallow curved SVG navigation rail is mandatory: each menu destination must be placed along the arc, not arranged in a straight row. Animate the active selection along the rail with white/cyan emphasis and a red offset edge. See `ARC_AND_SCENE_PLAN.md`.
- Diagonal masks, sharp slanted panels, offset red edges, oversized condensed headlines, compact uppercase HUD details and restrained water/caustic/reflection texture.
- Typography: Anton for display, Bebas Neue for nav/labels, Montserrat for body, loaded once globally. Avoid extracting proprietary game fonts.
- No geometric vector character placeholders, generic glassmorphism or rounded SaaS-card styling.
- Preserve the reference's five-section navigation idea, arrow-key navigation, Enter activation, and fast Framer Motion page transitions. Add pointer/touch parity, accessible focus and reduced-motion handling.

## Engineering constraints
- Keep React, React Router, Vite, Framer Motion and existing services. Avoid dependency churn.
- Centralise design tokens in `src/styles/tokens.css`.
- Centralise portfolio and character data; do not put asset URLs or personal content into multiple page components.
- Build shared components for shell, nav, character portrait, diagonal panel, section title, HUD label, transition and global audio dock.
- Avoid repeating large inline `<style>` blocks in page components.
- Keep hero media efficient; do not autoplay large videos across every route.
- Do not invent the user's biography, education, project results, stats or social links. Preserve known repo content unless it is stale and clearly flag uncertain entries for user review.

## Suggested implementation order
1. Build repair and Node version docs.
2. Design tokens + global font setup + wallpaper-led visual shell.
3. Curved arc navigation and home screen composition; validate it at desktop/tablet/mobile.
4. Wallpaper manifest and image-backed page wallpapers, then interior sections.
5. About, Resume, Projects, GitHub and Contact pages.
6. Global audio manager with no BGM source by default until direct rights are confirmed.
7. Accessibility, mobile, performance and final build QA.

## Required output
- A working implementation, not just a mockup.
- A concise change log and list of remaining user-supplied assets/permissions.
- Exact test commands and pass/fail output.
- No public deployment of art/audio with unresolved rights status.
