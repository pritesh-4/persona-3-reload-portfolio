# Asset and rights register

This register separates **where an asset can be found** from **whether it can be published**. A public source URL is not a grant of copyright permission.

## Character artwork

| Asset group | Source | Current status | Required check before public deployment |
|---|---|---|---|
| Makoto and S.E.E.S. character portraits | Official SEGA Persona 3 Reload site; URLs listed in `assets.json` | Source identified; permission not established | Written permission or another licence covering local hosting, web display, cropping and portfolio use |
| Character group/key art | Official Persona 3 Reload media / official site | Source identified; permission not established | Same as above; confirm derivative crop/overlay rights |
| Backgrounds and scene images | Official SEGA-hosted Persona 3 Reload game stills listed in `assets.json` | Sources identified; permission for portfolio background use not established | Obtain written permission for public background display, local hosting, cropping/positioning and transformations; document territory, term and attribution. Some candidate stills have baked-in HUD/dialogue. |
| Grain/caustics | CSS-generated or permissively licensed texture | Not selected | Verify texture licence; avoid game UI screenshots as textures |
| Game logo / UI captures | Atlus/SEGA | Not cleared | Do not include as a site logo or reusable UI asset without express permission |

### Official character image source list

The current URLs are stored in `assets.json` for repeatable source retrieval. They are official-site hosted character portraits and gameplay stills, but the official hosting location should not be interpreted as permission to reproduce them as full-page backgrounds on a public portfolio. The supplied candidate backgrounds are genuine game scenes; some have UI/dialogue baked in, so crop and composition need careful review.

## SEGA / ATLUS image-use guideline note (checked 2026-11-03)

SEGA's general English streaming guideline states that official product-site images may be used in the scope of gameplay videos/thumbnails, and that the guideline is for individual users using SEGA-owned IP. It also describes non-commercial limits. This is not a blanket web-design or portfolio-background licence. A job-seeking portfolio may be used for professional/commercial purposes; obtain explicit permission rather than assuming this guideline covers the use. Do not present the site as official or affiliated.

Reference: https://www.sega.co.jp/en/streaming_guideline/index.html (last updated 2026-05-22). The P3R-specific Atlus guideline also warns against uploading the background music tracks or streaming with the purpose of distributing the music: https://atlus.com/persona-3-reload-official-streaming-guidelines/.

## Music

| Option | Can it be the custom site-wide background player? | Notes |
|---|---|---|
| Persona 3 Reload OST file ripped from game/video/Steam app | **No** | Do not extract or redistribute. Atlus's P3R streaming guidelines say not to upload background music tracks or stream for the purpose of distributing the music. |
| Spotify visible embed | **No, not as the hidden/custom BGM dock** | Spotify embed is intended as a visible interactive widget. Its terms require the widget to remain unaltered and prohibit synchronising its sound recordings with visual media. |
| Direct P3R web playback with written rights | **Yes, if the permission covers the actual implementation** | Licence must cover master + composition, web playback, sync, territory, term, caching/hosting and loop behaviour. |
| Commissioned/original track | **Yes, if contract grants rights** | Obtain written web/public display, sync, streaming and looping rights; ensure work is original, not a soundalike copy. |

## Official music references

- Atlus streaming guidelines: https://atlus.com/persona-3-reload-official-streaming-guidelines/
- Spotify embed documentation: https://developer.spotify.com/documentation/embeds
- Spotify widget terms: https://developer.spotify.com/documentation/embeds/terms
- Official soundtrack on Apple Music: https://music.apple.com/us/album/persona-3-reload-original-soundtrack/1733407068
- Official Spotify album embed: https://open.spotify.com/embed/album/0ou89XjahTvTUm8mJu8go6
- Official Steam soundtrack page: https://store.steampowered.com/app/2517310/Persona_3_Reload_Digital_Soundtrack/

## Fonts

| Font | Intended use | Plan |
|---|---|---|
| Anton | Oversized display headlines | Keep; confirm current webfont licence if self-hosting |
| Bebas Neue | Navigation / HUD labels | Keep; confirm current webfont licence if self-hosting |
| Montserrat | Body copy | Keep; confirm current webfont licence if self-hosting |
| Proprietary in-game fonts | Exact game typography | Do not extract/bundle without a licence |

## Required metadata for every production asset

Record the following in a `credits.json` entry or the portfolio asset register:

```json
{
  "file": "character-makoto.webp",
  "creatorOrRightsHolder": "ATLUS / SEGA",
  "sourceUrl": "https://asia.sega.com/p3r/en/",
  "licenceOrPermission": "pending",
  "permissionDocument": null,
  "allowedUse": ["pending"],
  "transformationsAllowed": false,
  "attributionText": ""
}
```

Do not change `licenceOrPermission` to `cleared` without an actual permission record or a licence whose scope clearly covers the use.


## Background-art selection correction (2026-11-03)

The portfolio owner explicitly rejected gameplay-environment screenshots as page backgrounds because they are context-dependent and cluttered when separated from the game. Remove the previous Tartarus, classroom, Velvet Room and dialogue-scene background candidates from the production manifest.

Preferred visual source groups are now: official P3R main/key-visual wallpapers, title wallpapers, All-Out Attack PC/mobile wallpapers, character-specific wallpapers and wide promotional key art. The official Persona Channel post at https://p-ch.jp/news/15777/ distributes wallpapers for personal PC and smartphone use. That does not, by itself, grant the right to host those images as backgrounds on a public/professional portfolio. Obtain permission for that separate use.

Title screen, New Game/Load Game/Config, save/load, Social Stats, Fusion, skill and loading-screen references may guide layout and interaction design. They must not be used as flattened page backgrounds. A loading-screen background is only eligible after its exact official P3R source is verified.

Current visual research references:
- Wallpaper announcement: https://p-ch.jp/news/15777/
- Wide key-art image in SEGA pressroom: https://cdn.uc.assets.prezly.com/d4f21110-01df-4792-90ee-ca3870107bba/-/format/auto/Persona%203%20Reload%20Key%20Art_1920x1080.png
- Title screen capture (reference only): https://duniaku.idntimes.com/game/konsol-pc/review-persona-3-reload-00-rgfzd-p8b391
- Title/menu UI article (reference only): https://medium.com/illumination-gaming/a-love-letter-to-persona-3-reloads-ui-3eae29554134
- UI and screenshot gallery (reference only): https://megatenwiki.com/wiki/Gallery:Persona_3_Reload

SEGA's official page says specified available materials may be saved/used for live streaming, videos and thumbnails under its gameplay-video guidelines, and says not to modify them except limited resizing/cropping needed for those contexts. This is not blanket permission for a portfolio website background: https://www.sega.jp/game/detail/p3re/
