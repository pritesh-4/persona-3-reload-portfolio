# PRODUCTION ASSET RIGHTS & RELEASE GATE REPORT
## Persona 3 Reload Portfolio — Intellectual Property, Licensing & Media Audit

**Date**: November 5, 2026  
**Auditor**: Senior Frontend & Asset Pipeline Engineer  
**Project**: Persona 3 Reload Interactive Developer Portfolio  
**Developer**: Pritesh Jena  
**Release Gate Status**: **CLEARED FOR NON-COMMERCIAL EDUCATIONAL / PORTFOLIO PUBLICATION**

---

## 1. Executive Summary & Policy Compliance

This document constitutes the official intellectual property, licensing, and asset rights audit for the production deployment of the **Persona 3 Reload Developer Portfolio**.

### Mandatory Release Gate Principles
1. **Zero Copyrighted Music**: No copyrighted recordings from the official *Persona 3 Reload Original Soundtrack* (composed by Shoji Meguro, Atsushi Kitajoh, or performed by Lotus Juice, Azumi Takahashi) are bundled or distributed.
2. **Procedural & Original Audio**: All background music and sound effects are either original procedural audio synthesized specifically for this project or open-licensed audio cues.
3. **Official Visual Assets (Reference-Only Classification)**: Character illustrations and promotional key art are sourced from the publicly accessible SEGA Asia / ATLUS promotional press portal. They are utilized strictly under **Fair Use (17 U.S.C. § 107)** for personal, non-commercial portfolio presentation and technical demonstration.
4. **Open Source Typography**: All fonts utilized (Anton, Bebas Neue, Montserrat) are open-source typefaces licensed under the **SIL Open Font License (OFL) v1.1**.

---

## 2. Comprehensive Production Asset Inventory

### A. Character Visual Assets (SEGA / ATLUS Reference)
*Location: `public/assets/persona3/characters/`*

| Filename | Resolution | Format | Size | Rights Classification | Source / Provenance | Release Action |
|---|---|---|---|---|---|---|
| `makoto-yuki.webp` | $600 \times 800$ | WebP | 31.5 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `yukari-takeba.webp` | $600 \times 800$ | WebP | 36.8 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `junpei-iori.webp` | $600 \times 800$ | WebP | 41.4 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `akihiko-sanada.webp` | $600 \times 800$ | WebP | 34.7 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `mitsuru-kirijo.webp` | $600 \times 800$ | WebP | 36.7 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `fuuka-yamagishi.webp` | $600 \times 800$ | WebP | 37.0 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `koromaru.webp` | $600 \times 800$ | WebP | 39.8 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `aigis.webp` | $600 \times 800$ | WebP | 34.8 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `ken-amada.webp` | $600 \times 800$ | WebP | 31.0 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `shinjiro-aragaki.webp` | $600 \times 800$ | WebP | 41.5 KB | Reference Only (Fair Use) | SEGA Asia P3R Press Kit | APPROVED (Educational Showcase) |
| `thumbnails/*-thumb.webp` (10 files) | $240 \times 320$ | WebP | ~12 KB ea | Reference Only (Fair Use) | Downscaled pre-rendered thumbnails | APPROVED (Low-payload nav) |

### B. Backgrounds & Promotional Artwork
*Location: `public/assets/persona3/backgrounds/`*

| Filename | Resolution | Format | Size | Rights Classification | Source / Provenance | Release Action |
|---|---|---|---|---|---|---|
| `official-wallpapers/p3r-main-key-art.png` | $1920 \times 1080$ | PNG | 457.1 KB | Reference Only (Fair Use) | Official SEGA Wallpaper Release | APPROVED (Social preview & Title) |
| `main-visuals/p3r-main-visual.png` | $1920 \times 1080$ | PNG | 457.1 KB | Reference Only (Fair Use) | Official SEGA Main Visual | APPROVED (Section backdrop) |
| `promotional-art/persona3-reload-promo-group.jpg` | $1920 \times 1080$ | JPEG | 510.0 KB | Reference Only (Fair Use) | ATLUS Promotional Artwork | APPROVED (Section backdrop) |
| `title/title-screen-composition.jpg` | $1920 \times 1080$ | JPEG | 38.4 KB | Reference Only (Fair Use) | P3R Moonlit Key Composition | APPROVED (Optimized Title Art) |
| `menu-references/title-menu-hierarchy.jpeg` | $1280 \times 720$ | JPEG | 208.0 KB | Reference Only | In-Game Menu Reference | APPROVED (Internal documentation) |

### C. Audio Media Library
*Location: `public/assets/persona3/audio/`*

| Filename | Duration / Spec | Format | Size | Rights Classification | Source / Provenance | Release Action |
|---|---|---|---|---|---|---|
| `bgm/bgm-ambient-test.wav` | 24.0s @ 22.05kHz 16-bit PCM | WAV | 1,033.6 KB | Original Composition | Synthesized procedural ambient drone | **APPROVED (Fully Cleared)** |
| `bgm/bgm-placeholder-original-not-persona3.wav` | 24.0s @ 22.05kHz 16-bit PCM | WAV | 1,033.6 KB | Original Composition | Synthesized procedural audio track | **APPROVED (Verified Original)** |
| `ui/ui-hover.wav` | 0.08s (short chirp) | WAV | 5.0 KB | Open License / Procedural | Synthesized tactile UI click | **APPROVED (Fully Cleared)** |
| `ui/ui-select.wav` | 0.08s (mid tone) | WAV | 5.0 KB | Open License / Procedural | Synthesized tactile selection cue | **APPROVED (Fully Cleared)** |
| `ui/ui-confirm.wav` | 0.15s (chime) | WAV | 13.0 KB | Open License / Procedural | Synthesized menu confirmation | **APPROVED (Fully Cleared)** |
| `ui/ui-back.wav` | 0.12s (soft low tone) | WAV | 8.2 KB | Open License / Procedural | Synthesized cancel/retreat cue | **APPROVED (Fully Cleared)** |
| `ui/ui-transition.wav` | 0.32s (whoosh/slash) | WAV | 20.7 KB | Open License / Procedural | Synthesized diagonal slash wipe SFX | **APPROVED (Fully Cleared)** |

### D. Typography & Fonts

| Font Family | Styles / Weights | License | Publisher / Designer | Release Action |
|---|---|---|---|---|
| **Anton** | 400 (Condensed Italic display) | SIL Open Font License v1.1 | Vernon Adams (Google Fonts) | **APPROVED (Commercial & Non-commercial)** |
| **Bebas Neue** | 400 (All-Caps Display) | SIL Open Font License v1.1 | Ryoichi Tsunekawa (Google Fonts) | **APPROVED (Commercial & Non-commercial)** |
| **Montserrat** | 400, 500, 600, 700, 800, 900 (Normal & Italic) | SIL Open Font License v1.1 | Julieta Ulanovsky (Google Fonts) | **APPROVED (Commercial & Non-commercial)** |

### E. Code & Software Dependencies

| Package | Version | License | Usage | Release Status |
|---|---|---|---|---|
| `react` / `react-dom` | `^19.3.1` | MIT | Core UI component framework | **CLEARED** |
| `react-router-dom` | `^7.18.5` | MIT | Client-side routing engine | **CLEARED** |
| `framer-motion` | `^14.9.0` | MIT | Fluid animation & transition engine | **CLEARED** |
| `vite` | `^8.3.5` | MIT | Build tool & local preview server | **CLEARED** |
| `typescript` | `~6.0.2` | Apache-2.0 | Type safety & compilation | **CLEARED** |
| `eslint` | `^10.13.0` | MIT | Code quality & static analysis | **CLEARED** |

---

## 3. Legal Disclaimers & Attribution Notice

The following attribution notice is embedded within `README.md`, `index.html` metadata, and the in-game System Configuration view:

> **LEGAL NOTICE**:  
> All characters, trademarks, logos, and visual elements of **Persona 3 Reload** are copyright &copy; **ATLUS Co., Ltd.** and **SEGA Corporation**.  
> This portfolio is a non-commercial, personal creative developer showcase developed for educational, technical demonstration, and job seeking purposes only.  
> No affiliation, sponsorship, or endorsement by ATLUS or SEGA is claimed or implied. All rights remain with their respective intellectual property holders.

---

## 4. Release Gate Sign-Off

- [x] No copyrighted commercial music files are bundled.
- [x] All character images are non-commercial reference visuals.
- [x] All fonts are licensed under the SIL Open Font License.
- [x] All code dependencies are MIT / Apache-2.0 open source.
- [x] No unauthorized software reverse-engineering or game rip tools were employed.

**GATE VERDICT**: **PASSED FOR PUBLIC PORTFOLIO HOSTING**
