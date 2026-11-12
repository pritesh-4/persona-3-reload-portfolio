export interface ScreenArtConfig {
  screenId: string;
  title: string;
  desktopBg: string;
  mobileBg?: string;
  /** object-position crop of the desktop wallpaper (focal point art direction) */
  bgPositionDesktop?: string;
  /** object-position crop of the mobile wallpaper */
  bgPositionMobile?: string;
  characterId: string;
  characterName: string;
  characterScaleDesktop: number;
  characterRightDesktop: string;
  characterBottomDesktop: string;
  characterOpacityDesktop: number;
  characterOpacityMobile: number;
  characterHeightMobile: string;
  gradientOverlay: string;
}

/*
 * ART DIRECTION MAP
 * Only four pieces of official presentation art exist, so section identity is
 * built from crop (object-position), lighting (overlay direction + palette
 * bias) and character anchoring instead of repeating identical compositions.
 *
 *   PERSONA    001 — key art, low crop, dark left dossier rail
 *   SKILL      002 — main visual, right-weighted crop, cyan top light
 *   EQUIP      003 — promo group, left crop, crimson loadout accent
 *   EXPERIENCE 004 — main visual, wide crop, mist top fade
 *   QUEST      005 — promo group, right crop, crimson archive rail
 *   STATS      006 — key art, sky crop (moon telemetry), cyan right glow
 *   SOCIAL     007 — key art, left crop, soft magenta comm glow
 *   SYSTEM     008 — title composition, bottom-heavy console vignette
 */
export const SCREEN_ART_CONFIG: Record<string, ScreenArtConfig> = {
  title: {
    screenId: 'title',
    title: 'TITLE SCREEN',
    desktopBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    characterId: 'makoto',
    characterName: 'Makoto Yuki',
    characterScaleDesktop: 1.0,
    characterRightDesktop: '10%',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.40,
    characterHeightMobile: '75vh',
    gradientOverlay: 'linear-gradient(180deg, rgba(3, 8, 20, 0.4) 0%, rgba(3, 8, 20, 0.85) 100%)',
  },
  menu: {
    screenId: 'menu',
    title: 'MAIN COMMAND MENU',
    desktopBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    bgPositionDesktop: 'center 25%',
    bgPositionMobile: 'center 20%',
    characterId: 'makoto',
    characterName: 'Makoto Yuki',
    characterScaleDesktop: 1.0,
    characterRightDesktop: 'clamp(40px, 12vw, 240px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.52,
    characterOpacityMobile: 0.45,
    characterHeightMobile: '65vh',
    gradientOverlay: 'linear-gradient(180deg, rgba(3, 8, 20, 0.5) 0%, rgba(3, 8, 20, 0.88) 100%)',
  },
  persona: {
    screenId: 'persona',
    title: 'PERSONA // ABOUT ME',
    desktopBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    mobileBg: '/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png',
    bgPositionDesktop: 'center 30%',
    bgPositionMobile: 'center 35%',
    characterId: 'makoto',
    characterName: 'Makoto Yuki',
    characterScaleDesktop: 1.02,
    characterRightDesktop: 'clamp(20px, 6vw, 140px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.40,
    characterHeightMobile: '65vh',
    // Identity dossier: heavy left rail so the profile column owns the stage
    gradientOverlay: 'linear-gradient(90deg, rgba(3, 11, 25, 0.96) 0%, rgba(9, 38, 75, 0.78) 46%, rgba(3, 11, 25, 0.88) 100%), linear-gradient(0deg, rgba(3, 11, 25, 0.55) 0%, transparent 30%)',
  },
  skill: {
    screenId: 'skill',
    title: 'SKILL // TECHNICAL COMPETENCIES',
    desktopBg: '/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png',
    mobileBg: '/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png',
    bgPositionDesktop: '68% center',
    bgPositionMobile: '60% center',
    characterId: 'aigis',
    characterName: 'Aigis',
    characterScaleDesktop: 1.05,
    characterRightDesktop: 'clamp(20px, 8vw, 160px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.38,
    characterHeightMobile: '60vh',
    // Technical ability interface: cyan instrument light from above
    gradientOverlay: 'linear-gradient(180deg, rgba(55, 217, 242, 0.10) 0%, rgba(3, 11, 25, 0.82) 55%, rgba(3, 11, 25, 0.94) 100%), linear-gradient(90deg, rgba(3, 11, 25, 0.9) 0%, rgba(6, 19, 33, 0.6) 55%, rgba(3, 11, 25, 0.85) 100%)',
  },
  equip: {
    screenId: 'equip',
    title: 'EQUIP // PROGRESSION & LOADOUT',
    desktopBg: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    mobileBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    bgPositionDesktop: '22% center',
    bgPositionMobile: 'center 30%',
    characterId: 'akihiko',
    characterName: 'Akihiko Sanada',
    characterScaleDesktop: 1.0,
    characterRightDesktop: 'clamp(20px, 6vw, 140px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.40,
    characterHeightMobile: '65vh',
    // Loadout: crimson accent rail on the left, deep navy floor
    gradientOverlay: 'linear-gradient(90deg, rgba(240, 25, 91, 0.14) 0%, rgba(3, 11, 25, 0.94) 30%, rgba(6, 19, 33, 0.8) 60%, rgba(3, 11, 25, 0.88) 100%), linear-gradient(0deg, rgba(3, 11, 25, 0.6) 0%, transparent 35%)',
  },
  experience: {
    screenId: 'experience',
    title: 'EXPERIENCE // FIELD RECORD & ACHIEVEMENTS',
    desktopBg: '/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png',
    mobileBg: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    bgPositionDesktop: '32% center',
    bgPositionMobile: 'center 25%',
    characterId: 'mitsuru',
    characterName: 'Mitsuru Kirijo',
    characterScaleDesktop: 0.96,
    characterRightDesktop: 'clamp(20px, 5vw, 120px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.46,
    characterOpacityMobile: 0.38,
    characterHeightMobile: '62vh',
    // Field archive: mist top fade recedes into midnight stacks
    gradientOverlay: 'linear-gradient(180deg, rgba(164, 184, 205, 0.08) 0%, rgba(3, 11, 25, 0.85) 45%, rgba(3, 11, 25, 0.94) 100%), linear-gradient(90deg, rgba(3, 11, 25, 0.94) 0%, rgba(6, 19, 33, 0.78) 55%, rgba(3, 11, 25, 0.86) 100%)',
  },
  stats: {
    screenId: 'stats',
    title: 'STATS // DEVELOPER TELEMETRY',
    desktopBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    mobileBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    bgPositionDesktop: 'center 18%',
    bgPositionMobile: 'center 12%',
    characterId: 'fuuka',
    characterName: 'Fuuka Yamagishi',
    characterScaleDesktop: 0.94,
    characterRightDesktop: 'clamp(20px, 8vw, 170px)',
    characterBottomDesktop: '6%',
    characterOpacityDesktop: 0.5,
    characterOpacityMobile: 0.42,
    characterHeightMobile: '58vh',
    // Telemetry: moonlit sky crop with cyan cast sweeping from the right
    gradientOverlay: 'linear-gradient(270deg, rgba(55, 217, 242, 0.10) 0%, rgba(3, 11, 25, 0.88) 40%, rgba(3, 11, 25, 0.92) 100%), linear-gradient(0deg, rgba(3, 11, 25, 0.62) 0%, transparent 40%)',
  },
  quest: {
    screenId: 'quest',
    title: 'QUEST // MISSION ARCHIVE',
    desktopBg: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    mobileBg: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    bgPositionDesktop: '62% center',
    bgPositionMobile: '40% center',
    characterId: 'junpei',
    characterName: 'Junpei Iori',
    characterScaleDesktop: 1.0,
    characterRightDesktop: 'clamp(20px, 6vw, 140px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.40,
    characterHeightMobile: '65vh',
    // Mission archive: crimson rail anchored left, dossier floor
    gradientOverlay: 'linear-gradient(90deg, rgba(240, 25, 91, 0.12) 0%, rgba(3, 11, 25, 0.94) 34%, rgba(6, 19, 33, 0.8) 60%, rgba(3, 11, 25, 0.86) 100%), linear-gradient(0deg, rgba(3, 11, 25, 0.6) 0%, transparent 38%)',
  },
  item: {
    screenId: 'item',
    title: 'ITEM // DEVELOPER INVENTORY',
    desktopBg: '/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png',
    mobileBg: '/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png',
    bgPositionDesktop: '75% center',
    bgPositionMobile: '70% center',
    characterId: 'aigis',
    characterName: 'Aigis',
    characterScaleDesktop: 1.05,
    characterRightDesktop: 'clamp(20px, 8vw, 160px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.38,
    characterHeightMobile: '60vh',
    // Inventory: cool cyan bench light, heavy right darkening for grids
    gradientOverlay: 'linear-gradient(180deg, rgba(55, 217, 242, 0.08) 0%, rgba(3, 11, 25, 0.84) 50%, rgba(3, 11, 25, 0.94) 100%), linear-gradient(90deg, rgba(3, 11, 25, 0.92) 0%, rgba(6, 19, 33, 0.62) 50%, rgba(3, 11, 25, 0.88) 100%)',
  },
  social: {
    screenId: 'social',
    title: 'SOCIAL LINK // COMMUNICATION TERMINAL',
    desktopBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    mobileBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    bgPositionDesktop: '18% center',
    bgPositionMobile: 'center 40%',
    characterId: 'yukari',
    characterName: 'Yukari Takeba',
    characterScaleDesktop: 1.02,
    characterRightDesktop: 'clamp(20px, 6vw, 140px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.40,
    characterHeightMobile: '65vh',
    // Communication terminal: soft crimson/magenta glow drifting from the moon side
    gradientOverlay: 'linear-gradient(90deg, rgba(240, 25, 91, 0.08) 0%, rgba(3, 11, 25, 0.9) 40%, rgba(6, 19, 33, 0.72) 70%, rgba(3, 11, 25, 0.86) 100%), linear-gradient(0deg, rgba(3, 11, 25, 0.55) 0%, transparent 32%)',
  },
  system: {
    screenId: 'system',
    title: 'SYSTEM // CONFIGURATION & AUDIO',
    desktopBg: '/assets/persona3/backgrounds/title/persona3-reload-title.jpg',
    mobileBg: '/assets/persona3/backgrounds/title/persona3-reload-title.jpg',
    bgPositionDesktop: 'center 30%',
    bgPositionMobile: 'center 25%',
    characterId: 'koromaru',
    characterName: 'Koromaru',
    characterScaleDesktop: 1.1,
    characterRightDesktop: 'clamp(30px, 10vw, 200px)',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.40,
    characterHeightMobile: '65vh',
    // Configuration console: bottom-heavy console vignette, moonlit floor
    gradientOverlay: 'linear-gradient(90deg, rgba(3, 11, 25, 0.94) 0%, rgba(6, 19, 33, 0.8) 50%, rgba(3, 11, 25, 0.88) 100%), linear-gradient(0deg, rgba(3, 11, 25, 0.72) 0%, rgba(9, 38, 75, 0.25) 45%, transparent 70%)',
  },
  notFound: {
    screenId: 'notFound',
    title: '404 // TARTARUS ANOMALY',
    desktopBg: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    bgPositionDesktop: 'center 40%',
    characterId: 'makoto',
    characterName: 'Makoto Yuki',
    characterScaleDesktop: 1.0,
    characterRightDesktop: '15%',
    characterBottomDesktop: '0',
    characterOpacityDesktop: 0.48,
    characterOpacityMobile: 0.40,
    characterHeightMobile: '65vh',
    gradientOverlay: 'linear-gradient(180deg, rgba(3, 8, 20, 0.7) 0%, rgba(240, 25, 91, 0.25) 50%, rgba(3, 8, 20, 0.9) 100%)',
  },
};
