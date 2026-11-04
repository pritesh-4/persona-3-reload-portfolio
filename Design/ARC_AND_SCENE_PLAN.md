# Curved arc navigation + designed wallpaper/presentation backgrounds

**Owner direction (2026-11-03):** Keep the curved arc menu from the supplied reference screenshot. Do **not** use gameplay-environment screenshots as page backgrounds. Use designed P3R presentation imagery instead: title/start screen art, official PC/mobile wallpapers, main/key visuals, all-out-attack art and character promo compositions. Official character art remains a separate layer only when it improves the layout.

## 1. Desired visual language

The page should feel like a personal system booting into a Persona 3 Reload-inspired interface. It should not look like a game walkthrough or random collection of gameplay screenshots. Use the images that already have strong composition, intentional negative space, character placement, logo hierarchy and graphic identity.

Asset priority:
1. **Wide promotional/key art and PC wallpapers** — preferred hero and full-page backgrounds.
2. **Official title wallpaper / main visual wallpaper** — opening, identity and profile screens.
3. **All-Out Attack wallpapers and character-specific PC/mobile wallpapers** — section-specific visual variants.
4. **Official character portraits/cutouts** — foreground layer where a background composition leaves room.
5. **Title screen, menu, save/load, Social Stats, Fusion, map and skill UI screenshots** — reference only for reconstructing UI; do not stretch these screenshots behind portfolio content.
6. **Loading-screen art** — only when an exact official P3R source is verified. Do not infer provenance from repost titles.

**Explicit exclusions:** no Tartarus gameplay screenshots, classroom gameplay screenshots, Velvet Room dialogue screenshots, combat environment captures or arbitrary cutscenes as full-page backdrops. Those are context-dependent and visually noisy when removed from the game flow.

## 2. Curved arc navigation

The owner supplied a reference where the menu destinations sit on a dramatic curve, not a straight row with a curved underline. Make the curve structural and recognisable.

Suggested SVG path:

```svg
<svg viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
  <path d="M 65 188 Q 500 30 935 188" />
</svg>
```

For each item index `i` across `n` items, calculate its quadratic Bézier point and tangent. Position semantic HTML buttons at those points. Let the label tilt subtly along the tangent (roughly ±8 degrees max). A single active state drives pointer preview, keyboard movement, touch selection, route activation and the travelling selection marker.

- Desktop: shallow broad arc across the open area of the wallpaper composition.
- Tablet: smaller rise, full-size hit targets and no overlap with character face/logo.
- Mobile: compact vertical/partial arc sheet or a readable simplified curve; never shrink labels into tiny radial-wheel items.
- Active item: white slanted plate, dark lettering, cyan/red offset edges and a bright marker. Keep inactive items quieter but legible.
- Support arrows, Enter, Escape, pointer, touch, visible focus and `prefers-reduced-motion`.

## 3. Designed-image backgrounds — mandatory policy

Use a shared `ArtBackdrop` component that renders a real local image asset (`<picture>`/`<img>`), with route-specific crop metadata. The image itself must provide the composition, character presence and colour. CSS is limited to a restrained contrast veil, vignette, mask, texture and UI geometry. Never use CSS gradient art as the main background.

### Preferred asset groups

| Group | Role | Source / status |
|---|---|---|
| P3R main/key visual PC wallpaper | Home hero and overall visual anchor | [Official Persona Channel wallpaper post](https://p-ch.jp/news/15777/) — personal wallpaper distribution; portfolio use needs separate permission |
| Title wallpaper | Boot/title state and About/profile | Same official wallpaper post; permission required for site background use |
| All-Out Attack PC wallpaper | Projects / featured work section | Same official wallpaper post; permission required for site background use |
| Official wide promo/key art (1920×1080) | Hero or project archive reference | [SEGA pressroom asset](https://cdn.uc.assets.prezly.com/d4f21110-01df-4792-90ee-ca3870107bba/-/format/auto/Persona%203%20Reload%20Key%20Art_1920x1080.png) — source is SEGA press release; verify website reuse rights |
| Official S.E.E.S. character wallpapers | Resume, Skills, Personal section variants | Obtain via official wallpaper collection; do not scrape unlicensed rehosts |
| Game title/menu screenshot | Navigation design reference only | [Title-screen capture](https://duniaku.idntimes.com/game/konsol-pc/review-persona-3-reload-00-rgfzd-p8b391) |
| In-game menu screen | Type hierarchy and menu state reference only | [P3R UI analysis](https://medium.com/illumination-gaming/a-love-letter-to-persona-3-reloads-ui-3eae29554134) |

### How screens should be used

- **Title/start screen:** study the “PRESS ANY BUTTON” prompt, moon/window composition and calm negative space. Build a new portfolio start screen with the user's own copy; do not use the full game screen as a wallpaper if it contains logo/menu copy that conflicts with portfolio content.
- **Loading screen:** if an official, isolated loading illustration or loading background can be verified, use it as a transition frame or background. Until then, do not label fan captures or title-screen images as loading screens.
- **Save/load and menu pages:** use screenshots to study selection bars, skew, panel alignment, status labels and typography. Rebuild the menu in React with the portfolio's actual destinations.
- **Official wallpapers/key art:** use these as the actual backplates when permission allows. Check for empty negative-space areas before placing copy and arc navigation. If there is no clean space, use a second wallpaper with a more suitable composition rather than burying the art under an opaque overlay.
- **Character cutouts:** use only if they do not duplicate a character already prominent in the wallpaper. Preserve aspect ratio; skew the mask/frame, never the face or body.

## 4. Route-to-art direction

| Route | Preferred art source | Composition |
|---|---|---|
| Home | Wide main visual / title wallpaper | Keep hero art intact; place the arc in its natural negative-space zone; avoid duplicating Makoto if he is already the main subject |
| About | Character-specific official wallpaper | One character is the visual anchor; place a clean profile dossier opposite |
| Resume / Skills | Character wallpaper or official key-art variant | Use a strong character silhouette and high-contrast information plate; skills and education stay readable |
| Projects | All-Out Attack wallpaper or wide key art | Strong action composition; project records in a sharply clipped panel, no gameplay stills |
| GitHub | Title/main-visual wallpaper variant | Darker crop or character wallpaper; real repository data in an opaque white/blue panel |
| Socials / Contact | Character wallpaper or title wallpaper | Calm composition with sufficient negative space around contact methods |

Avoid assigning a different character to every route just for variety. Consistency and image composition matter more than the number of unique wallpapers.

## 5. React implementation

Use `src/data/visuals.js`, not a gameplay `scenes.js` manifest:

```js
export const visuals = {
  home: {
    src: "/assets/wallpapers/p3r-main-key-art.webp",
    alt: "Persona 3 Reload main promotional artwork",
    position: "center 38%",
    mode: "cover",
    rightsStatus: "approved", // build-time allowlist, not inferred from URL
  },
};
```

Shared component:

```jsx
function ArtBackdrop({ visual }) {
  return (
    <div className="art-backdrop" aria-hidden="true">
      <img
        className="art-backdrop__image"
        src={visual.src}
        alt=""
        style={{ objectPosition: visual.position }}
        fetchPriority={visual.priority ? "high" : "auto"}
        decoding="async"
      />
      <div className="art-backdrop__contrast" />
    </div>
  );
}
```

The example's `rightsStatus: "approved"` is a deployment gate only. Do not mark a source approved until written permissions or a valid licence are recorded. The public build must reject all non-approved image assets.

Asset folders:

```text
public/assets/
  characters/       # official character images only after clearance
  wallpapers/       # wide key art / official PC wallpapers after clearance
  mobile-wallpapers/# portrait art for mobile compositions after clearance
  textures/         # optional licensed textures; never substitutes for art
  audio/bgm/        # empty until direct playback/sync rights are secured
  audio/sfx/        # original or licensed UI sounds
```

### Image handling
- Prefer official wide files at native resolution; preserve original source files in a local review folder.
- Use `object-fit: cover` only where the crop retains the artwork's designed hierarchy. Use `contain` if the full poster/key visual is the point.
- Maintain separate desktop and mobile art selections when portrait crops materially alter the composition.
- Do not overlay a second character cutout when the wallpaper already includes that character.
- Preload only the home key art; lazy-load other page wallpapers.
- Do not hotlink production images from third-party sites.
- Do not crop, recolour, remove logos or create derivatives unless the applicable permission allows it.

## 6. Rights gate

The official Persona Channel wallpaper post says the wallpapers are for personal PC and smartphone use. That is not a licence for a public portfolio website. SEGA's P3R page separately limits specified downloadable game materials to gameplay video, livestream and thumbnail creation under its streaming guideline; it is not a blanket background-art licence. Obtain written permission for website display, local hosting, cropping, transformations, territory and duration. The character image sources are also not automatically cleared for public use.

For the OST, obtain permission covering both master recordings and compositions, website playback, synchronisation, territory, duration and caching/hosting. A soundtrack purchase or streaming subscription does not grant these rights. Keep BGM off until the permission is documented.

## 7. Acceptance checks

- No gameplay-environment capture is used as a page background.
- Backgrounds come from approved promotional/key art, title wallpapers, main visuals or character wallpapers.
- Title/menu/save/load/skill screenshots are treated as interface references, not as wallpaper backgrounds.
- The source and permissions are recorded for every production image.
- The image remains recognisable and provides intentional negative space for content.
- The curved menu destinations themselves sit on the SVG arc.
- Desktop/mobile use composition-appropriate image variants.
- No unlicensed game music or sound effects are bundled.
