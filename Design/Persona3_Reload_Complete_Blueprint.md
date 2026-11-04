## Persona 3 Reload-Inspired Portfolio

## Complete Visual and React Implementation Blueprint

## Portfolio Implementation Blueprint

## 3 November 2026

## Contents

## Selected Direction

A Persona 3 Reload-inspired portfolio with a distinct personal identity. The interface uses the curved menu from the supplied visual reference, official character artwork subject to rights clearance, and designed presentation imagery such as official key visuals and wallpapers. Gameplay-environment screenshots are excluded as page backgrounds. The actual Persona 3 Reload soundtrack is only used if direct website playback and synchronisation rights are secured.

## Deliverables in this document

- 1. Visual specification: curved arc navigation, wallpaper-led backgrounds, composition rules and asset policy.

- 2. React implementation blueprint: repository audit, component contracts, page structure, audio rules, work phases and acceptance criteria.


## Part I — Visual Specification

## Curved arc navigation + designed wallpaper/presentation back- grounds

Owner direction (2026-11-03): Keep the curved arc menu from the supplied reference screenshot. Do not use gameplay-environment screenshots as page backgrounds. Use designed P3R presentation imagery instead: title/start screen art, official PC/mobile wallpapers, main/key visuals, all-out-attack art and character promo compositions. Official character art remains a separate layer only when it improves the layout.

- 1. Desired visual language

The page should feel like a personal system booting into a Persona 3 Reload-inspired interface. It should not look like a game walkthrough or random collection of gameplay screenshots. Use the images that already have strong composition, intentional negative space, character placement, logo hierarchy and graphic identity. Asset priority: 1. Wide promotional/key art and PC wallpapers — preferred hero and full-page backgrounds. 2. Official title wallpaper / main visual wallpaper — opening, identity and profile screens. 3. All-Out Attack wallpapers and character-specific PC/mobile wallpapers — section- specific visual variants. 4. Official character portraits/cutouts — foreground layer where a back- ground composition leaves room. 5. Title screen, menu, save/load, Social Stats, Fusion, map and skill UI screenshots — reference only for reconstructing UI; do not stretch these screenshots behind portfolio content. 6. Loading-screen art — only when an exact official P3R source is verified. Do not infer provenance from repost titles. Explicit exclusions: no Tartarus gameplay screenshots, classroom gameplay screenshots, Velvet Room dialogue screenshots, combat environment captures or arbitrary cutscenes as full-page back-

drops. Those are context-dependent and visually noisy when removed from the game flow.

- 2. Curved arc navigation

The owner supplied a reference where the menu destinations sit on a dramatic curve, not a straight row with a curved underline. Make the curve structural and recognisable.

Suggested SVG path:

<svg viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true"> <path d="M 65 188 Q 500 30 935 188" />

</svg>

For each item index i across n items, calculate its quadratic Bézier point and tangent. Position semantic HTML buttons at those points. Let the label tilt subtly along the tangent (roughly ±8 degrees max). A single active state drives pointer preview, keyboard movement, touch selection, route activation and

the travelling selection marker.

- Desktop: shallow broad arc across the open area of the wallpaper composition.

- Tablet: smaller rise, full-size hit targets and no overlap with character face/logo.

- Mobile: compact vertical/partial arc sheet or a readable simplified curve; never shrink labels into tiny radial-wheel items.

- Active item: white slanted plate, dark lettering, cyan/red offset edges and a bright marker. Keep inactive items quieter but legible.

- Support arrows, Enter, Escape, pointer, touch, visible focus and prefers-reduced-motion.


## 3. Designed-image backgrounds — mandatory policy

Use a shared ArtBackdrop component that renders a real local image asset (<picture>/<img>), with route-specific crop metadata. The image itself must provide the composition, character presence and colour. CSS is limited to a restrained contrast veil, vignette, mask, texture and UI geometry. Never use CSS gradient art as the main background.

## Preferred asset groups

| Group | Role | Source / status |
| --- | --- | --- |
| P3R main/key visual PC | Home hero and overall visual | Official Persona Channel |
| wallpaper | anchor | wallpaper post — personal |
|   |   | wallpaper distribution; portfolio |
|   |   | use needs separate permission |
| Title wallpaper | Boot/title state and | Same official wallpaper post; |
|   | About/profile | permission required for site |
|   |   | background use |
| All-Out Attack PC wallpaper | Projects / featured work section Same official wallpaper post; |   |
|   |   | permission required for site |
|   |   | background use |
| Official wide promo/key art | Hero or project archive | SEGA pressroom asset — source |
| (1920×1080) | reference | is SEGA press release; verify |
|   |   | website reuse rights |
| Official S.E.E.S. character | Resume, Skills, Personal section | Obtain via official wallpaper |
| wallpapers | variants | collection; do not scrape |
|   |   | unlicensed rehosts |
| Game title/menu screenshot | Navigation design reference | Title-screen capture |
|   | only |   |
| In-game menu screen | Type hierarchy and menu state | P3R UI analysis |
|   | reference only |   |

## How screens should be used

- Title/start screen: study the “PRESS ANY BUTTON” prompt, moon/window composition and calm negative space. Build a new portfolio start screen with the user’s own copy; do not use the full game screen as a wallpaper if it contains logo/menu copy that conflicts with portfolio content.

- Loading screen: if an official, isolated loading illustration or loading background can be verified, use it as a transition frame or background. Until then, do not label fan captures or title-screen images as loading screens.

- Save/load and menu pages: use screenshots to study selection bars, skew, panel alignment, status labels and typography. Rebuild the menu in React with the portfolio’s actual destinations.

- Official wallpapers/key art: use these as the actual backplates when permission allows. Check for empty negative-space areas before placing copy and arc navigation. If there is no clean space, use a second wallpaper with a more suitable composition rather than burying the art under an opaque overlay.

- Character cutouts: use only if they do not duplicate a character already prominent in the wall- paper. Preserve aspect ratio; skew the mask/frame, never the face or body.

## 4. Route-to-art direction


| Route | Preferred art source | Composition |
| --- | --- | --- |
| Home | Wide main visual / title | Keep hero art intact; place the |
|   | wallpaper | arc in its natural negative-space |
|   |   | zone; avoid duplicating Makoto |
|   |   | if he is already the main subject |
| About | Character-specific official | One character is the visual |
|   | wallpaper | anchor; place a clean profile |
|   |   | dossier opposite |
| Resume / Skills | Character wallpaper or official | Use a strong character |
|   | key-art variant | silhouette and high-contrast |
|   |   | information plate; skills and |
|   |   | education stay readable |
| Projects | All-Out Attack wallpaper or wide | Strong action composition; |
|   | key art | project records in a sharply |
|   |   | clipped panel, no gameplay |
|   |   | stills |
| GitHub | Title/main-visual wallpaper | Darker crop or character |
|   | variant | wallpaper; real repository data |
|   |   | in an opaque white/blue panel |
| Socials / Contact | Character wallpaper or title | Calm composition with |
|   | wallpaper | sufficient negative space |
|   |   | around contact methods |

Avoid assigning a different character to every route just for variety. Consistency and image composition matter more than the number of unique wallpapers.

## 5. React implementation

```
Use src/data/visuals.js, not a gameplay scenes.js manifest:
export const visuals = {
home: {
src: "/assets/wallpapers/p3r-main-key-art.webp",
alt: "Persona 3 Reload main promotional artwork",
position: "center 38%",
mode: "cover",
rightsStatus: "approved", // build-time allowlist, not inferred from URL
},
};
Shared component:
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


The example’s rightsStatus: "approved" is a deployment gate only. Do not mark a source approved until written permissions or a valid licence are recorded. The public build must reject all non-approved image assets.

## Asset folders:

## public/assets/

```
characters/ # official character images only after clearance
wallpapers/ # wide key art / official PC wallpapers after clearance
mobile-wallpapers/# portrait art for mobile compositions after clearance
textures/ # optional licensed textures; never substitutes for art
audio/bgm/ # empty until direct playback/sync rights are secured
audio/sfx/ # original or licensed UI sounds
```

## Image handling

- Prefer official wide files at native resolution; preserve original source files in a local review folder.

- Use object-fit: cover only where the crop retains the artwork’s designed hierarchy. Use con- tain if the full poster/key visual is the point.

- Maintain separate desktop and mobile art selections when portrait crops materially alter the com- position.

- Do not overlay a second character cutout when the wallpaper already includes that character.

- Preload only the home key art; lazy-load other page wallpapers.

- Do not hotlink production images from third-party sites.

- Do not crop, recolour, remove logos or create derivatives unless the applicable permission allows it.

## 6. Rights gate

The official Persona Channel wallpaper post says the wallpapers are for personal PC and smartphone use. That is not a licence for a public portfolio website. SEGA’s P3R page separately limits specified downloadable game materials to gameplay video, livestream and thumbnail creation under its stream- ing guideline; it is not a blanket background-art licence. Obtain written permission for website display, local hosting, cropping, transformations, territory and duration. The character image sources are also not automatically cleared for public use.

For the OST, obtain permission covering both master recordings and compositions, website playback, synchronisation, territory, duration and caching/hosting. A soundtrack purchase or streaming subscrip- tion does not grant these rights. Keep BGM off until the permission is documented.

## 7. Acceptance checks

- No gameplay-environment capture is used as a page background.

- Backgrounds come from approved promotional/key art, title wallpapers, main visuals or character wallpapers.

- Title/menu/save/load/skill screenshots are treated as interface references, not as wallpaper back- grounds.

- The source and permissions are recorded for every production image.

- The image remains recognisable and provides intentional negative space for content.

- The curved menu destinations themselves sit on the SVG arc.

- Desktop/mobile use composition-appropriate image variants.

- No unlicensed game music or sound effects are bundled.


## Part II — React Implementation Blueprint

## Persona 3 Reload-inspired portfolio — implementation blue- print

Target repository: RohitPoul/Person-3-Reload-Potfolio

Target branch inspected: master

Selected direction: P3R-inspired personal identity (not a pixel-perfect clone) · official character art- work · licensed soundtrack only after rights clearance

Stack: React 19 · Vite 8 · React Router 7 · Framer Motion 12 · plain CSS

## 1. Product intent

Build a personal portfolio that feels like entering a stylised Persona 3 Reload-inspired character dossier. It should be recognisable through its blue-led atmosphere, sharp white/red cut-ins, diagonal compo- sition, expressive character art, high-impact condensed typography and precise motion. It must still read as Pree’s engineering portfolio, not a fan-made game menu pasted over unrelated content.

## Design principles

- 1. Designed art, not gameplay screenshots. Every route uses a real P3R promotional/key vi- sual, official wallpaper or title/presentation artwork as its backplate, plus official character artwork only where it improves the composition. Never use gameplay-environment screenshots as back- grounds. Use assets only after the website-use permission is confirmed; no random gradients or vector people as substitutes.

- 2. Blue is the atmosphere. Use midnight navy, deep ocean blue and cyan as the main colour family. White is the information surface; red is a selective action/selection accent.

- 3. The arc menu is structural. The main navigation must follow a shallow SVG curve; the menu items themselves sit along the arc rather than on a straight row with a curved underline. Combine this with angled masks, layered slashes, clipped panels, hard edges and deliberate overlaps. Avoid generic SaaS cards, floating glass panels and random decorative polygons.

- 4. Water is the motion metaphor. Use restrained caustics, reflections, slow parallax and soft particle/noise layers. Keep content crisp and high contrast.

- 5. Portfolio content stays credible. Projects, dates, GitHub stats and skills must come from real data. Do not invent RPG levels, rankings or performance metrics.

- 6. Audio is opt-in. No audible autoplay. The exact P3R soundtrack stays disabled until a direct web playback/synchronisation permission is obtained for the intended use.

## 2. Repository audit and blockers

The inspected master tree contains the React/Vite source, but no tracked src/assets/ directory. The source imports files from that missing directory:

| Source | Missing media referenced |
| --- | --- |
| src/App.jsx | src/assets/videos/Mainn.mp4, |
|   | src/assets/audio/stream.mp3 |
| src/hooks/useClickSound.js | src/assets/audio/Click.mp3 |
| src/pages/AboutMe.jsx | images/characters/char1-3.webp, |
|   | videos/main1.mp4, |
|   | images/icons/icon1-3.webp, |
|   | images/portraits/mainm/mainm2/mainf.webp |
| src/pages/ResumePage.jsx | videos/main2.mp4 |
| src/pages/GitHubPage.jsx | videos/main1.mp4 |


| Source | Missing media referenced |
| --- | --- |
| src/pages/SideProjPage.jsx | videos/main1.mp4 |

P0: Restore the missing media or remove/replace every unresolved import before expecting a clean clone to build. The repository tree did not include those assets; this is a source-tree finding, not a guess about whether the original author has local copies.

## Additional observations:

- src/App.jsx already owns the route table, global click sound and fixed music player.

- src/components/P3Menu.jsx implements a five-item angled menu, arrow-key navigation and Enter selection. Preserve the interaction model; improve the art direction and responsive states.

- src/components/MusicPlayer.jsx currently attempts autoplay after canplay, then retries after a click/key interaction. Replace this with an explicit user-controlled start so the browser and user expectation are clear.

- src/hooks/useClickSound.js creates a small audio pool for immediate feedback. Keep the pool pattern, but point it only at original/licensed SFX and respect the global sound toggle.

- AboutMe.jsx, ResumePage.jsx, GitHubPage.jsx and SideProjPage.jsx each contain large in- line style blocks. Move shared visual rules and tokens into common styles/components, and leave only page-specific styles in page stylesheets.

- Font imports are repeated and inconsistent: About uses Bebas Neue, Barlow Condensed and Montserrat; other pages refer to Anton, Bebas Neue and Montserrat. Consolidate the font system.

- GitHubPage.jsx uses externally hosted stats images. Prefer the existing GitHub service/API for core data and make third-party image widgets optional fallbacks.

- Socials.jsx is in src/components/, not src/pages/.

- README currently says Node 18+. Vite 8 requires Node 20.19+ or 22.12+; correct the prerequisite before onboarding.

## Baseline command sequence once assets are restored

```
node --version
npm ci
npm run lint
npm run build
npm run preview
```

Use Node 20.19+ or 22.12+ for the current Vite 8 line. Do not upgrade the dependency stack as part of the visual redesign unless a specific blocker requires it.

## 3. Visual system

## Colour tokens

Start with these tokens, then tune them against the licensed/source imagery selected for the final composition:

```
:root {
--p3-ink: #061321;
--p3-night: #081A2D;
--p3-panel: #0D2943;
--p3-blue: #087BC2;
--p3-cyan: #36D5F2;
--p3-ice: #EAF5FC;
--p3-white: #F7FAFD;
--p3-red: #E5394A;
--p3-muted: #9AAFC2;
--p3-line: rgb(164 211 237 / 22%);
```


```
--font-display: "Anton", Impact, sans-serif;
--font-label: "Bebas Neue", "Arial Narrow", sans-serif;
--font-body: "Montserrat", Arial, sans-serif;
--cut-sm: 8px;
--cut-md: 18px;
--cut-lg: 32px;
--ease-p3: cubic-bezier(.22, 1, .36, 1);
}
```

Use cyan and bright blue for focus/active states, not as a full-screen flat fill. Red should be rare enough that a selected item feels important. Build light texture with gradients/pseudo-elements or a small properly licensed noise texture; do not rasterise whole UI screens.

## Typography

- Anton: portfolio title and section display words.

- Bebas Neue: nav items, labels, numeric indexes and HUD microcopy.

- Montserrat: body copy, project detail and readable metadata.

- Load each font once in index.html or a single global stylesheet. Prefer self-hosting only when the relevant font file and licence allow it. Do not extract proprietary in-game fonts from the game.

- Use uppercase sparingly in long content; display type can be condensed and tilted, but body text must remain comfortable to read.

## Arc navigation — mandatory design feature

The home navigation is not a straight menu row. Follow the owner’s supplied screenshot: destinations are distributed along a shallow curved rail, and the active destination has the strongest scale/colour/offset treatment. Use the full geometry and interaction specification in ARC_AND_SCENE_PLAN.md.

Suggested SVG rail and quadratic curve: M 65 188 Q 500 30 935 188 in a 1000 × 240 viewBox. Position each semantic HTML button at its matching point on that Bézier curve; rotate each label only slightly to follow the tangent. Use a visible, thin rail with nodes/ticks. Animate the selected node and white/cyan highlight with a small red offset layer. The SVG itself is decorative; buttons remain accessible and independently keyboard/touch operable. On mobile, switch to a readable vertical curved rail or expanded curved sheet rather than shrinking five items into tiny targets.

## Designed-image backgrounds — mandatory design feature

Every primary route receives a real presentation-art image from src/data/visuals.js and a local asset under public/assets/wallpapers/. The permitted art categories are official wide key visuals, official PC/mobile wallpapers, title wallpapers, All-Out Attack wallpaper compositions and character promotional artwork. Do not use gameplay-environment screenshots (Tartarus, classroom, Velvet Room dialogue or random cutscenes) as backplates; those images lose their narrative context and

create visual clutter.

Title/start-screen, save/load, Social Stats, Fusion, skill and other in-game UI screenshots are references for recreating the portfolio interface. They are not page backgrounds. A loading-screen asset may be used only if an exact official P3R loading image is verified and cleared; do not mislabel a title-screen capture or fan repost as a loading screen.

Best current source pool: - Official ATLUS Persona Channel wallpaper announcement — main visual, All- Out Attack and title wallpapers; the article says these are for personal PC/smartphone wallpaper use, not a website licence. - SEGA pressroom main key art, 1920×1080 — promotional image candidate; public portfolio reuse still needs permission. - Title screen reference and UI analysis — study-only [URL 🔗](https://p-ch.jp/news/15777/)

sources.


Use one image as the actual backplate. The image must supply the composition, character presence and colour. CSS may add a restrained contrast veil, edge vignette, mask, slashes and UI planes; it must not invent the wallpaper backplate. Do not use a second character cutout if the wallpaper already features that same character prominently.

## Composition rules

Home screen - Use a wide main visual or title wallpaper as the hero backplate, after rights clearance. - Respect the source artwork’s negative space. Place the curved menu in the open region; do not place it across faces, title lettering or other meaningful focal areas. - If the source art already features Makoto prominently, do not paste another Makoto cutout over it. - Keep the user’s name/title and curved arc navigation readable without flattening the artwork under a solid overlay.

Interior pages - Choose character-specific wallpapers or official promo art, not gameplay environment screenshots. - Use the image’s intended composition and subject placement; create the dossier/info panel in the available negative space. - Title/menu/save/load/social-stat/skills screenshots guide the layout of original React UI but are not used as backgrounds.

Responsive behaviour - Desktop: prefer the original landscape wallpaper with a deliberate content- safe area. - Mobile: use a matching official portrait wallpaper where available; do not crop a landscape image until its composition is unreadable. - Tablet: choose crop/position values per asset and keep the curve away from character faces and embedded title text.

## 4. Proposed source structure

Keep the existing React Router and Framer Motion dependencies. Refactor incrementally into this

structure:

```
src/
app/
App.jsx
routes.jsx
components/
layout/
PortfolioShell.jsx
ArtBackdrop.jsx
WallpaperImage.jsx
SectionFrame.jsx
navigation/
ArcNavigation.jsx
MobileNavigation.jsx
character/
CharacterPortrait.jsx
motion/
PageTransition.jsx
DiagonalWipe.jsx
audio/
AudioDock.jsx
AudioManager.jsx
ui/
HudLabel.jsx
DiagonalPanel.jsx
SectionTitle.jsx
ProjectRecord.jsx
data/
portfolio.js
characters.js
visuals.js
```


```
audioConfig.js
hooks/
useReducedMotion.js
useSoundPreference.js
services/
githubService.js
pages/
HomePage.jsx
AboutPage.jsx
ResumePage.jsx
ProjectsPage.jsx
GitHubPage.jsx
ContactPage.jsx
styles/
tokens.css
global.css
motion.css
layout.css
pages/
home.css
about.css
resume.css
projects.css
github.css
contact.css
```

The current source can be migrated into this structure without changing the stack. Keep src/main.jsx as the entry point. Avoid a large rewrite before the baseline build and content are understood.

## Static media structure

```
public/
assets/
characters/ # official/licensed files only after clearance
wallpapers/ # official promotional art / wallpapers only after clearance
mobile-wallpapers/ # portrait variants where available
textures/ # licensed grain/caustic textures, if used
audio/
bgm/ # empty until direct music rights are confirmed
sfx/ # original or licensed SFX only
```

Use central src/data/characters.js and src/data/visuals.js manifests for stable references, route-specific crops and attribution metadata. Do not hard-code asset paths inside individual pages. The home navigation layout belongs in a dedicated ArcNavigation component. For public/production builds, never depend on another website continuing to hotlink an image.

Example manifest shape:

```
export const characters = {
makoto: {
name: "Makoto Yuki",
src: "/assets/characters/makoto.webp",
alt: "Makoto Yuki from Persona 3 Reload",
source: "https://asia.sega.com/p3r/en/",
rightsStatus: "pending-permission",
objectPosition: "center top",
},
};
```


Do not ship a file with rightsStatus: "pending-permission" in a public build. Enforce this with a simple prebuild validation or an asset review checklist.

## 5. Component contracts

## PortfolioShell

Owns route-level wallpaper framing, background treatment, global navigation affordance, safe-area spacing and the fixed audio dock. It does not own page content.

## P3Navigation

- Data-driven destinations: About, Resume, Projects, GitHub, Contact.

- Keyboard: ArrowUp/ArrowDown changes selection; Enter activates; Escape returns to home or closes overlay where appropriate.

- Pointer: hover previews selection, click activates.

- Touch: tap selects/activates without hover dependency.

- Proper anchor/button semantics, visible focus, aria-current/aria-selected where appropriate.

- Do not intercept arrow keys while focus is inside an input, textarea or contenteditable.

## CharacterPortrait

- Receives an asset manifest entry and presentation mode (hero, side, compact).

- Uses loading="eager" only for the opening hero; lazy-load interior page portraits.

- Maintains native aspect ratio and configurable object position.

- Optional separate slanted frame/underlay; do not skew the image and distort faces.

- Supplies meaningful alt text or empty alt if a purely decorative copy is used alongside an acces- sible label.

## SectionFrame / DiagonalPanel

Reusable slanted planes, white information surfaces, red edge accents, divider rules and small HUD labels. Use CSS clip-path or pseudo-elements; ensure clipped controls remain clickable and focus-

visible.

## PageTransition / DiagonalWipe

Use Framer Motion for a fast diagonal wipe and content entrance. Target 350–650ms for page change; do not make navigation wait for long cinematic sequences. Honour prefers-reduced-motion by dis- abling large transforms and keeping short fades.

## AudioDock / AudioManager

One audio state for the whole app, rather than one <audio> instance per page. States: unavailable, ready, playing, paused, error. User initiates playback; remember preference only after interaction. Include mute/volume and visible track/source label. The exact P3R OST source stays unset until the relevant direct licence is documented. If no permitted direct stream exists, show a visible link to an authorised soundtrack page instead of pretending an embedded stream is background music.

## ProjectRecord

A non-rounded mission-record style display with title, brief, stack, role, evidence/outcome and links. Use actual project info from portfolio.js; repository data is an optional refresh source.


## 6. Page-by-page content plan

| Current source | New role | Main content |
| --- | --- | --- |
| P3Menu.jsx | HomePage + P3Navigation | Hero, short identity line, menu, |
|   |   | selected portrait |
| AboutMe.jsx | AboutPage | Profile dossier, interests, |
|   |   | engineering focus, short |
|   |   | personal statement |
| ResumePage.jsx | ResumePage | Education, experience, skill |
|   |   | groups, certifications, |
|   |   | downloadable PDF |
| SideProjPage.jsx | ProjectsPage | 3–5 strongest project records, |
|   |   | problem / solution / stack / |
|   |   | results / links |
| GitHubPage.jsx | GitHubPage | Selected repos, contribution |
|   |   | activity, language and |
|   |   | repository links; no invented |
|   |   | stats |
| Socials.jsx | ContactPage | GitHub, LinkedIn, email and |
|   |   | other chosen public links |

Do not add a new route just to make the site feel larger. A focused set of polished sections is better than a large number of empty screens.

## 7. Audio decision — important licensing boundary

The user selected licensed Persona 3 Reload soundtrack, not an unlicensed MP3 copy. This means the implementation must not proceed by ripping tracks from the game, Steam soundtrack app, video uploads or unofficial download links.

For a website-wide background player using the actual recordings, obtain written permission that cov-

ers at least:

- the sound recording/master and the underlying composition;

- public online playback/streaming on the portfolio domain;

- synchronisation with the site’s visual experience if the audio is paired with transitions or anima- tion;

- the relevant territory, duration, traffic/usage and monetisation status;

- looping, caching, hosting and delivery method, if applicable.

Buying the soundtrack or paying for Spotify Premium is not the same as obtaining those website play- back/synchronisation rights. Atlus’s public streaming guidelines specifically say not to upload P3R background music tracks or stream for the purpose of distributing the music. Spotify provides user- facing embeds, but its widget terms require the supplied widget to remain unaltered and prohibit synchronising Spotify sound recordings with visual media. Therefore:

- Do not hide a Spotify iframe behind a custom CD button or use it as a covert background player.

- A visible, unmodified Spotify embed may be used as a separate soundtrack-listening panel, subject to Spotify’s current terms, but it is not the custom looping BGM solution specified here.

- Until a direct licence is obtained, leave audioConfig.js with no BGM source and make audio default to off. Use original/commissioned UI SFX only if their licence permits web use.

Keep AudioManager source-agnostic so a cleared stream can be plugged in later without a rewrite.

## 8. Artwork and trademark decision

The character image URLs in assets.json are hosted on the official SEGA Persona 3 Reload site. That is a useful source reference, but public hosting does not itself grant permission to copy, crop, re-host


or use the art in a portfolio. The licensing page on the game site contains third-party software notices; do not treat those library licences as a licence for Persona characters, logos or game artwork.

Before a public deployment that bundles official character art, seek and retain written permission or an- other clearly applicable licence for online display, local hosting and the planned transformations/crops. If that cannot be obtained, keep the design and use artwork you have permission to publish. Do not use game logos or title treatments in a way that implies an official Atlus/SEGA affiliation.

## 9. Implementation phases

## Phase 0 — establish a buildable baseline (P0)

- 1. Fork the reference repo or work in a repository the user controls; the inspected repository connec- tion is read-only.

- 2. Recover the original missing media from the author’s working copy, or replace each missing import with an approved asset/fallback.

- 3. Correct the README Node requirement to Node 20.19+ or 22.12+.

- 4. Run npm ci, npm run lint, npm run build; record baseline results before redesign.

## Phase 1 — design foundation

- 1. Add tokens.css, global.css, and the central font loading strategy.

- 2. Replace repeated font imports and standardise the three-family hierarchy.

- 3. Introduce PortfolioShell, SectionFrame, SectionTitle, HudLabel and CharacterPortrait.

- 4. Move navigation content into a data array.

## Phase 2 — home screen first

- 1. Implement the character-led wallpaper composition and title/key-art backplate.

- 2. Match diagonal planes, offset red edge, selection highlight and typography scale.

- 3. Retain arrow-key, Enter, mouse and touch navigation.

- 4. Create responsive desktop/tablet/mobile compositions and a reduced-motion mode.

## Phase 3 — interior sections

- 1. Convert About to a personal dossier.

- 2. Convert Resume to an academic/experience record.

- 3. Convert Side Projects to mission records.

- 4. Refine GitHub and Contact sections using the shared system.

- 5. Remove duplicated page-level style blocks after each page is migrated.

## Phase 4 — audio and finishing

- 1. Implement the global audio state machine with no source by default.

- 2. Connect only an authorised music source after paperwork/source terms are verified.

- 3. Add original/licensed UI SFX and one global sound toggle.

- 4. Add image loading fallbacks, attribution, keyboard focus, mobile QA and performance checks.

## 10. Acceptance criteria

## Visual

- The experience is immediately P3R-inspired through real P3R promotional wallpaper/key art imagery, character composition, curved arc navigation, diagonal cuts, condensed type, wa- ter/underwater atmosphere and animated selection.

- It still has an original personal identity and does not use Atlus/SEGA logos as if affiliated.


- Every route uses a real approved promotional/key visual or wallpaper as its primary background; no gameplay environment screenshots; character portraits are real image files, not vector place- holders.

- The home navigation visibly follows a shallow curve, with each destination positioned on the curve rather than on a straight line.

- All pages use the same tokens, typography and transition language.

## Content

- Every project, metric, qualification and link is accurate and belongs to the portfolio owner.

- Each major page has a clear purpose and a useful primary action.

## Interaction

- Menu works with keyboard, pointer and touch.

- Audio is off by default and starts only after a direct user gesture.

- Reduced-motion mode is usable; no important content is motion-dependent.

- Mobile layouts have no overflow, clipped text or controls hidden behind the audio dock.

## Engineering

- Fresh clone installs and builds with supported Node.

- No missing local imports or console errors.

- Hero media is prioritised; noncritical images are lazy-loaded.

- Large full-screen videos are not redundantly downloaded/played on every route.

- No copyrighted soundtrack or unapproved art is bundled in the public build.

## 11. Source references

- Reference portfolio repo: https://github.com/RohitPoul/Person-3-Reload-Potfolio

- Official Persona 3 Reload site: https://asia.sega.com/p3r/en/

- Official SEGA/ATLUS character image sources: see assets.json (URLs are references, not blanket usage permission).

- P3R art-direction interview: https://personacentral.com/p3r-art-design-direction-interview/

- Atlus P3R streaming guidelines: https://atlus.com/persona-3-reload-official-streaming-guidelines/

- Spotify embed guide: https://developer.spotify.com/documentation/embeds

- Spotify widget terms: https://developer.spotify.com/documentation/embeds/terms

- Vite Node compatibility: https://vite.dev/guide/
