# Persona 3 Reload-inspired portfolio — implementation kit

This folder is a source-linked asset kit and repo-specific implementation handoff for `RohitPoul/Person-3-Reload-Potfolio`.

## Selected direction
- P3R-inspired visual system with a distinct personal identity.
- Official Persona 3 Reload character imagery, subject to permission/usage-rights clearance.
- Official Persona 3 Reload soundtrack only if a direct website playback/synchronisation licence is secured. No ripped or bundled soundtrack files.

## Contents
- `IMPLEMENTATION_BLUEPRINT.md` — full repo audit, design system, architecture, components, page plan, audio rules, phases and acceptance criteria.
- `ARC_AND_SCENE_PLAN.md` — curved navigation geometry and the corrected wallpaper/presentation-art-only background policy.
- `AGENT_HANDOFF_PROMPT.md` — ready-to-use coding-agent implementation prompt.
- `BUILD_BLOCKERS.md` — missing media and Node/Vite baseline fixes.
- `ASSET_AND_RIGHTS_REGISTER.md` — source and rights checklist for artwork, music and fonts.
- `assets.json` — URLs for official character artwork, promotional/wallpaper candidates and title/menu UI research references. Gameplay stills are not production backgrounds.
- `download-assets.mjs` — Node downloader that fetches character art and one wide wallpaper/key-art reference into local review folders; it does not grant usage rights.
- `DESIGN_PLAN.md` — shorter design direction overview.
- `FONT_AND_AUDIO.md` — quick typography and audio reference notes.
- `references/curved-menu-reference.png` — the exact curved-menu composition screenshot supplied by the owner.

## Fetch the source images for local review

```bash
node download-assets.mjs
```

The downloader requires outbound network access. It downloads character files and a wide promotional key-art candidate for local design review only. UI screenshots are reference links and are not downloaded. It does not grant permission to redistribute, crop, modify or publish the artwork. Before copying an image into the production site's `public/assets/characters/`, confirm the usage basis and document it in `ASSET_AND_RIGHTS_REGISTER.md`.

## Repo baseline

The inspected `master` tree does not include `src/assets/`, although multiple source files import media from that directory. Restore the missing files or replace those imports first. See `BUILD_BLOCKERS.md`.

The README in the source project says Node 18+, but its Vite 8 dependency requires Node 20.19+ or 22.12+.

## Safety / rights

- Do not redistribute extracted game files, copyrighted soundtrack audio, or ripped sound effects.
- A source URL on the official website is not the same as an image reuse licence. SEGA’s current general guideline is scoped to gameplay videos/thumbnails and limits use to individual non-commercial use; do not assume that automatically covers a professional portfolio website. Obtain written permission for background use, local hosting and cropping.
- Spotify embeds must remain visible and unmodified, and Spotify's widget terms prohibit synchronising its sound recordings with visual media. Do not use it as a hidden custom BGM player.
- Keep BGM disabled until direct web playback and synchronisation rights are documented.


## Background direction (latest owner correction)

Do not use in-game gameplay environment screenshots as page backgrounds. Use designed presentation imagery only: official key visuals, title wallpapers, All-Out Attack wallpapers, character wallpapers and promotional compositions. Title/menu/save/load/social-stat/Fusion/skill screenshots are visual references for rebuilding the React UI, not full-page backplates. Verify any claimed loading-screen asset before use. See `ARC_AND_SCENE_PLAN.md`.

The official ATLUS wallpaper announcement describes the provided images as wallpapers for personal PCs and smartphones; it does not grant portfolio website use. The official SEGA use-material page limits specified promotional files to gameplay videos, livestreams and thumbnails under its guideline. Public site use still requires separate written permission.
