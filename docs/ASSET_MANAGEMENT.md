# Persona 3 Reload Portfolio — Asset Pipeline & Rights Management

This document details the acquisition, provenance, binary validation, and intellectual property compliance policies governing all media assets in the portfolio.

---

## 1. Asset Storage & Structure

All production media files reside under [`public/assets/persona3/`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/public/assets/persona3) and are copied into `dist/assets/persona3/` during the Vite build:

```text
public/assets/persona3/
├── characters/             # 10 Official S.E.E.S. character WebPs (31-43 KB each)
│   └── thumbnails/         # 10 WebP thumbnails (10-14 KB each) for gallery/avatar
├── backgrounds/            # Presentation artwork (1920x1080 key art, promo stills)
│   └── thumbnails/         # Preview thumbnails
├── audio/
│   ├── bgm/                # Procedural ambient loop (24.0s, 22.05kHz 16-bit PCM WAV)
│   └── ui/                 # 5 synthesized sound effect cues (select, hover, confirm, etc.)
├── references/             # User-supplied curved menu blueprint screenshot
└── manifests/              # Machine-readable assets.json, inventory CSV, rights register
```

---

## 2. Character Acquisition & Provenance (10/10 Acquired)

All 10 S.E.E.S. member portraits were retrieved directly from official SEGA Asia servers (`https://asia.sega.com/p3r/en/`):

| Character | Role / Arcana | Dimensions | Format | File Size | Source URL |
|---|---|---|---|---|---|
| **Makoto Yuki** | Protagonist &bull; Fool/Death | 570 &times; 760 | WebP | 32,258 B | `.../top/character1_badbd990dcbabe1f25c22de113f772a0.webp` |
| **Yukari Takeba** | Archer &bull; Lovers | 570 &times; 760 | WebP | 37,694 B | `.../top/character2_35a3dc87ea1a02e2e3d6397d46e1cbf9.webp` |
| **Junpei Iori** | Two-Handed Sword &bull; Magician | 630 &times; 840 | WebP | 42,358 B | `.../top/character4_b11ad41cb7a01fef1d40aeb65d002471.webp` |
| **Akihiko Sanada** | Boxer &bull; Emperor | 630 &times; 840 | WebP | 35,572 B | `.../top/character5_fa07d2d06f3925eea4af9a91937506ba.webp` |
| **Mitsuru Kirijo** | Fencer &bull; Empress | 630 &times; 840 | WebP | 37,542 B | `.../top/character6_0e3115e9f6076da20973ac40ef045866.webp` |
| **Fuuka Yamagishi** | Navigator &bull; Priestess | 630 &times; 840 | WebP | 37,900 B | `.../top/character7_532c5a12d64704763e5cac354fb3874c.webp` |
| **Koromaru** | Canine Fighter &bull; Strength | 630 &times; 840 | WebP | 40,756 B | `.../top/character8_790cb89b62931cfe93f16d61c746464d.webp` |
| **Aigis** | Suppression Weapon &bull; Chariot/Aeon | 630 &times; 840 | WebP | 35,644 B | `.../top/character9_a298bc6fd82a5d83fd4c04fa9c031f4f.webp` |
| **Ken Amada** | Spear Fighter &bull; Justice | 630 &times; 840 | WebP | 31,730 B | `.../top/character10_a301f968f599f0c8c5556d55da608f2d.webp` |
| **Shinjiro Aragaki** | Heavy Axe &bull; Hierophant | 630 &times; 840 | WebP | 42,476 B | `.../top/character12_f2b86e413b00e552aeca9b0960ca96d6.webp` |

Each image was verified with VP8/VP8X header parsers to ensure non-empty, uncorrupted binary data.

---

## 3. Background Artwork Provenance

- **`p3r-main-key-art.png`**: High-resolution 1920&times;1080 PNG (468,038 bytes) retrieved from SEGA's press release distribution CDN (`cdn.uc.assets.prezly.com`). Serves as the primary visual anchor on the Title Screen and Main Menu.
- **`persona3-reload-promo-group.jpg`**: 1280&times;720 JPEG (522,238 bytes) promotional cast visual used as an alternate backdrop.
- **`title-screen-composition.jpg`**: 1280&times;720 JPEG composition reference of the game title screen with moonlit window illumination.
- **`title-menu-hierarchy.jpeg`**: 2000&times;1125 JPEG UI layout reference from Game UI Database.

---

## 4. Audio Architecture & Rights Clearance

### A. Procedural Audio Test Suite (Approved for Website Use)
All audio files bundled in the repository were generated via procedural mathematical synthesis ([`generate_placeholder_audio.py`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/Design/tools/generate_placeholder_audio.py)):
- **Sample Rate**: 22,050 Hz
- **Format**: 16-bit Linear PCM Mono WAV
- **BGM Test Loop**: 24.0-second ambient chord progression (Am &bull; F &bull; G &bull; Em) with loop-boundary fading.
- **UI Sound Cues**:
  - `ui-select.wav`: 880 Hz + 1320 Hz harmonics (0.11s)
  - `ui-hover.wav`: 880 Hz + 1320 Hz harmonics (0.11s)
  - `ui-confirm.wav`: 660 Hz / 990 Hz / 1320 Hz triad chord (0.30s)
  - `ui-back.wav`: 720 Hz to 480 Hz descending frequency sweep (0.19s)
  - `ui-transition.wav`: White-noise + descending sine sweep (0.48s)

### B. Strict Soundtrack Clearance Policy
- **No Commercial Game Music is Bundled**: Commercial game recordings (*Burn My Dread*, *Color Your Night*, *When the Moon's Reaching Out Stars*) are protected by exclusive master recording and synchronization copyrights owned by ATLUS Co., Ltd.
- **Future Integration**: The audio service ([`src/config/personaAssets.ts`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/src/config/personaAssets.ts)) is designed to accept an official sync-licensed stream or embedded player without altering component logic.

---

## 5. Rights Classification Matrix

| Asset Group | Count | Physical Presence | Rights Status | Deployment Recommendation |
|---|---|---|---|---|
| **Characters** | 10 WebP | Local | `REFERENCE ONLY` | Keep for local evaluation / portfolio demo; obtain written clearance from SEGA/ATLUS prior to public commercial hosting. |
| **Key Visuals** | 2 PNG/JPG | Local | `PERMISSION REQUIRED` | SEGA press server assets; permissible for prototype evaluation. |
| **Synthesized Audio** | 7 WAV | Local | `APPROVED FOR WEBSITE USE` | Original procedural synthesis; safe for public hosting. |
| **UI References** | 3 PNG/JPG | Local | `USER-PROVIDED / REFERENCE ONLY` | Layout targets only. |
| **Game Soundtrack** | 0 Files | Omitted | `PERMISSION REQUIRED` | Commercial sync license required. |

---

## 6. Offline Asset Backup

A standalone archive containing all 44 verified media assets is available at:
[`Projects/Persona_port/Persona3_Reload_Acquired_Assets.zip`](file:///c:/Users/HP/Documents/c_programm/Projects/Persona_port/Persona3_Reload_Acquired_Assets.zip) (5.3 MB).

