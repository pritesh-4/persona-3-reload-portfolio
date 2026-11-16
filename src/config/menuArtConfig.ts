/**
 * Persona 3 Reload — Menu Art Direction Configuration
 * 
 * Defines distinct visual atmosphere for each of the seven menu selections:
 * - 01 PERSONA: Midnight blue protagonist key art with upside-down hero & logo
 * - 02 SKILL: Electric cyan open stratosphere sky & fractured clouds (2.0x zoom)
 * - 03 EQUIP: Dynamic S.E.E.S. cast battle lineup with scarlet diagonal slash
 * - 04 EXPERIENCE: Silver-blue tall architectural window frames & sheer curtains
 * - 05 STATS: Gigantic luminous full moon filling the top half of the screen
 * - 06 SOCIAL LINK: Soft rose-magenta school bond scene
 * - 07 SYSTEM: Deep charcoal obsidian silhouettes with crimson water reflections
 * - DARK HOUR: Supernatural Tartarus tower & green moonlight
 */

export interface MenuSectionArtConfig {
  id: string;
  label: string;
  characterId: string;
  bgPath: string;
  bgPositionDesktop: string;
  bgPositionMobile: string;
  bgScale: number;
  bgFilter: string;
  gradientOverlay: string;
  accentColor: string;
  secondaryColor: string;
  themeTitle: string;
}

export const MENU_SECTION_ART_CONFIG: Record<string, MenuSectionArtConfig> = {
  persona: {
    id: 'persona',
    label: 'PERSONA',
    characterId: 'makoto',
    bgPath: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    bgPositionDesktop: 'center 30%',
    bgPositionMobile: 'center 20%',
    bgScale: 1.02,
    bgFilter: 'brightness(0.76) contrast(1.15) saturate(1.1)',
    gradientOverlay:
      'linear-gradient(180deg, rgba(3, 8, 20, 0.45) 0%, rgba(3, 8, 20, 0.2) 40%, rgba(3, 8, 20, 0.92) 100%), linear-gradient(90deg, rgba(3, 11, 25, 0.85) 0%, rgba(3, 11, 25, 0.3) 45%, transparent 70%, rgba(3, 11, 25, 0.8) 100%)',
    accentColor: '#00D4FF',
    secondaryColor: '#0066FF',
    themeTitle: 'MIDNIGHT PROTAGONIST ARCHIVE',
  },
  item: {
    id: 'item',
    label: 'SKILL',
    characterId: 'aigis',
    bgPath: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    bgPositionDesktop: '2% 2%',
    bgPositionMobile: '5% 5%',
    bgScale: 2.0,
    bgFilter: 'brightness(0.85) contrast(1.28) saturate(1.4) hue-rotate(15deg)',
    gradientOverlay:
      'linear-gradient(180deg, rgba(0, 212, 255, 0.22) 0%, rgba(4, 18, 38, 0.55) 45%, rgba(3, 11, 25, 0.94) 100%), linear-gradient(90deg, rgba(3, 11, 25, 0.9) 0%, rgba(0, 40, 85, 0.25) 48%, rgba(3, 11, 25, 0.82) 100%)',
    accentColor: '#00D4FF',
    secondaryColor: '#38BDF8',
    themeTitle: 'TECHNOLOGICAL CYBERNETIC SKY',
  },
  equip: {
    id: 'equip',
    label: 'EQUIP',
    characterId: 'akihiko',
    bgPath: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    bgPositionDesktop: 'center 48%',
    bgPositionMobile: 'center 35%',
    bgScale: 1.06,
    bgFilter: 'brightness(0.72) contrast(1.22) saturate(1.25) hue-rotate(-10deg)',
    gradientOverlay:
      'linear-gradient(120deg, rgba(240, 25, 91, 0.28) 0%, rgba(3, 11, 25, 0.85) 36%, rgba(8, 20, 38, 0.7) 65%, rgba(3, 11, 25, 0.95) 100%), linear-gradient(0deg, rgba(3, 11, 25, 0.6) 0%, transparent 40%)',
    accentColor: '#F0195B',
    secondaryColor: '#FF6B8B',
    themeTitle: 'CRIMSON COMBAT LINEUP',
  },
  experience: {
    id: 'experience',
    label: 'EXPERIENCE',
    characterId: 'mitsuru',
    bgPath: '/assets/persona3/backgrounds/title/title-screen-composition.jpg',
    bgPositionDesktop: '88% 40%',
    bgPositionMobile: '85% 30%',
    bgScale: 1.25,
    bgFilter: 'brightness(0.68) contrast(1.15) saturate(0.75)',
    gradientOverlay:
      'linear-gradient(180deg, rgba(164, 184, 205, 0.2) 0%, rgba(5, 15, 30, 0.72) 42%, rgba(3, 11, 25, 0.95) 100%), linear-gradient(90deg, rgba(3, 11, 25, 0.94) 0%, rgba(10, 25, 48, 0.4) 50%, rgba(3, 11, 25, 0.88) 100%)',
    accentColor: '#A4B8CD',
    secondaryColor: '#CBD5E1',
    themeTitle: 'CINEMATIC ARCHITECTURAL WINDOW',
  },
  stats: {
    id: 'stats',
    label: 'STATS',
    characterId: 'fuuka',
    bgPath: '/assets/persona3/backgrounds/title/title-screen-composition.jpg',
    bgPositionDesktop: 'center 10%',
    bgPositionMobile: 'center 8%',
    bgScale: 1.45,
    bgFilter: 'brightness(0.82) contrast(1.3) saturate(1.15) hue-rotate(6deg)',
    gradientOverlay:
      'radial-gradient(circle at 50% 20%, rgba(0, 212, 255, 0.28) 0%, rgba(3, 11, 25, 0.6) 45%, rgba(3, 11, 25, 0.95) 100%), linear-gradient(90deg, rgba(3, 11, 25, 0.92) 0%, transparent 60%, rgba(3, 11, 25, 0.8) 100%)',
    accentColor: '#38BDF8',
    secondaryColor: '#00D4FF',
    themeTitle: 'CELESTIAL OBSERVATORY FULL MOON',
  },
  social: {
    id: 'social',
    label: 'SOCIAL LINK',
    characterId: 'yukari',
    bgPath: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    bgPositionDesktop: '28% 58%',
    bgPositionMobile: '25% 50%',
    bgScale: 1.5,
    bgFilter: 'brightness(0.75) contrast(1.18) saturate(1.38) hue-rotate(-24deg)',
    gradientOverlay:
      'linear-gradient(135deg, rgba(235, 64, 120, 0.24) 0%, rgba(3, 11, 25, 0.8) 42%, rgba(6, 19, 33, 0.72) 68%, rgba(3, 11, 25, 0.92) 100%), linear-gradient(0deg, rgba(3, 11, 25, 0.55) 0%, transparent 35%)',
    accentColor: '#EB4078',
    secondaryColor: '#F472B6',
    themeTitle: 'ROSE SPECTRUM SOCIAL TERMINAL',
  },
  system: {
    id: 'system',
    label: 'SYSTEM',
    characterId: 'koromaru',
    bgPath: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    bgPositionDesktop: '96% 92%',
    bgPositionMobile: '90% 85%',
    bgScale: 2.0,
    bgFilter: 'brightness(0.6) contrast(1.42) saturate(1.1) hue-rotate(-15deg)',
    gradientOverlay:
      'linear-gradient(0deg, rgba(240, 25, 91, 0.2) 0%, rgba(2, 6, 16, 0.86) 35%, rgba(2, 6, 16, 0.98) 100%), radial-gradient(ellipse at center, transparent 28%, rgba(2, 6, 16, 0.94) 100%)',
    accentColor: '#EF4444',
    secondaryColor: '#F87171',
    themeTitle: 'OBSIDIAN CONSOLE EMBER ALERT',
  },
};

/**
 * Secret Dark Hour easter egg theme configuration
 */
export const DARK_HOUR_THEME_OVERRIDE = {
  bgPath: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
  bgPositionDesktop: '82% 12%',
  bgPositionMobile: '80% 10%',
  bgScale: 1.5,
  bgFilter: 'brightness(0.75) contrast(1.35) saturate(1.45) hue-rotate(65deg)',
  gradientOverlay:
    'radial-gradient(circle at 65% 20%, rgba(52, 211, 153, 0.35) 0%, rgba(6, 26, 18, 0.85) 50%, rgba(3, 15, 10, 0.98) 100%), linear-gradient(180deg, rgba(16, 185, 129, 0.16) 0%, rgba(3, 15, 10, 0.94) 100%)',
  accentColor: '#10B981',
  secondaryColor: '#34D399',
  themeTitle: '12:00 AM // TARTARUS SHADOW HOUR',
};
