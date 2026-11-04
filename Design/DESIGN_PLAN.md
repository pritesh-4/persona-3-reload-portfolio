# Design plan — Persona 3 Reload-inspired personal portfolio

## Direction
Build a portfolio that feels like a playable Persona 3 Reload menu / dossier, not a generic portfolio with a blue background. **Use designed promotional art, title screens and wallpapers as backplates; do not use gameplay-environment screenshots as backgrounds. In-game UI screenshots are reference material only.** Use official game art only where permitted; otherwise replace it with original commissioned artwork that references the same composition language without copying characters or logos.

## What the reference repository already does
- React 19 + Vite; React Router; Framer Motion.
- Main menu with stylized angled labels and keyboard up/down + Enter support.
- Page transitions; About / Resume / GitHub / Socials / Side Projects pages.
- Fixed CD-style music control and global click-sound hook.
- README says audio files are intentionally not bundled; App.jsx imports local video and audio files, so the original repository is not self-contained.
- Repo's stated palette: `#dc2626`, `#3ce2ff`, `#0a0e27`; font choices: Anton, Bebas Neue, Montserrat.

## Recommended visual system
1. **Colour therapy**
   - Deep midnight / navy base: `#071323`, `#0A1830`.
   - Signature seaside / electric blue: `#16C7F3`, `#26D9F4`, `#087BC2`.
   - Hard red accent: `#E51E36` / `#F12B43`, reserved for selection, alerts and section markers.
   - White: `#F4F8FC`; cool grey: `#AAB8C8`.
   - Use blue as the emotional base, not a flat saturated fill. Layer translucent water-like gradients, subtle grain, soft caustic/ripple motion and official P3R title/key visual wallpapers and character promotional art.
2. **Composition**
   - Main menu: full-viewport official title/key-art wallpaper with its original character composition, a large angled typographic menu on the other, and restrained HUD microcopy.
   - Section transition: a fast diagonal white/blue/red slash; the selected character image slides in with a slight skew and parallax.
   - Content pages: oversized section title, character cutout, stacked dark panels, fine divider lines, small uppercase metadata, bright active state.
   - Project cards should resemble dossier entries / S.E.E.S. mission records, not rounded SaaS cards.
3. **Patterns and shape language**
   - Diagonal clipping and slanted bars, layered offsets, hard-edged rectangular panels, thin outlines, circular gauges and small numeric labels.
   - Avoid generic blobs, random hexagons, gradients-as-decoration, floating glassmorphism cards and geometric-vector characters.
   - Texture: subtle paper/noise, underwater caustic light, restrained halftone only as a secondary layer.
4. **Typography**
   - Use the original game's font reference list at GameFontLibrary as research; verify license before embedding any font.
   - For a safe web stack: Anton or a licensed similar condensed display face for huge headings; Bebas Neue for nav / labels; Montserrat for readable body. Keep the original repo's current fonts as the fallback direction, but tune size, tracking and slant to match the game.
   - Use a strict hierarchy: display 64–112px desktop; labels 11–16px with 0.12–0.22em tracking; body 14–17px. Do not use 3+ display faces in the same view.
5. **Characters / art**
   - Use the official SEGA-hosted individual character portrait URLs in `assets.json` as reference/source URLs. The downloader writes full source WebP files locally.
   - Prefer transparent portrait art and preserve each image's native proportions. Do not use generated vector substitutes.
   - Compose portraits with image masking, skewed white/red planes, soft blue rim light, and crop positioning. Keep text legible over artwork.
6. **Motion and sound**
   - UI: 160–280ms crisp transitions; menu hover should feel sharp; section entrance 350–650ms; background motion slow and low amplitude.
   - Keep the existing CD player concept but make state and accessibility clear. Browsers block autoplay with sound: begin music only after explicit interaction; remember mute state within the session.
   - Exact Persona 3 Reload BGM and game SFX are copyrighted. Do not scrape or rip. Use licensed soundtrack playback links, or commission/create a legally usable original track with a similar high-level mood (jazz / hip-hop / melancholy urban atmosphere) without copying melody, lyrics or recordings. Create original click/confirm/back sounds.

## Section-by-section redesign
- **Opening / menu**: wide official promo wallpaper or title visual; avoid duplicating the character already printed in the artwork, large `PORTFOLIO` / owner name, 5 menu choices, date/time HUD and sound toggle.
- **About**: single character portrait + personal profile presented as an in-game character dossier; stats are real skills, not fabricated attributes.
- **Resume**: timeline as a calendar / academic record; skills as clean category bars; download CV button.
- **Projects**: mission briefing layout: objective, stack, role, outcomes, repository / live links. Keep the actual project work prominent.
- **GitHub**: live repository stats and contribution summaries; avoid fake progress meters.
- **Socials**: three or four high-contrast contact bars, with one character portrait and minimal copy.

## Implementation order
1. Extract reusable tokens and typography; move inline style blocks to CSS modules or page styles.
2. Add character artwork pipeline using `assets.json`; create image variants/crops and a fallback for image load errors.
3. Rebuild the home screen composition first, then use its design language across About / Resume / Projects / Socials.
4. Implement global audio manager with user-initiated play, volume, mute, track metadata, reduced-motion and no-audio fallback.
5. Make responsive variants: preserve art composition on desktop; use portrait header + stacked navigation on mobile.
6. Add keyboard focus, reduced motion, image lazy loading, proper alt text and performance checks.

## Acceptance checklist
- No geometric vector character placeholders.
- A consistent P3R colour / type / diagonal composition language across all pages.
- Every character portrait is an actual image asset with source attribution and a documented usage basis.
- No copyrighted soundtrack or game-ripped sound effects bundled without permission.
- All content and links are the user's real information; no invented stats or projects.
- Keyboard navigation, touch navigation, reduced motion, mobile layout and audio-off mode all work.
