export interface MenuItemConfig {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  icon: string;
  route: string;
  characterId: string;
  bgKey: string;
}

export const MENU_ITEMS: MenuItemConfig[] = [
  {
    id: 'persona',
    label: 'PERSONA',
    sublabel: 'IDENTITY & PROFILE',
    description: 'View developer identity, background story, and personal philosophy. Discover the person behind the code.',
    icon: '♠',
    route: '/about',
    characterId: 'makoto',
    bgKey: 'keyArt',
  },
  {
    id: 'item',
    label: 'SKILL',
    sublabel: 'TECHNICAL TOOLKIT & COMPETENCIES',
    description: 'Explore the programming languages, frameworks, AI technologies and tools used across my projects.',
    icon: '◈',
    route: '/tools',
    characterId: 'aigis',
    bgKey: 'keyArt',
  },
  {
    id: 'equip',
    label: 'EQUIP',
    sublabel: 'EXPERIENCE & QUALIFICATIONS',
    description: 'Review professional experience, education, certifications, and career progression timeline.',
    icon: '⚔',
    route: '/resume',
    characterId: 'akihiko',
    bgKey: 'promoGroup',
  },
  {
    id: 'stats',
    label: 'STATS',
    sublabel: 'DEVELOPER PERFORMANCE',
    description: 'Analyze development metrics, contribution activity, language distribution, and growth indicators.',
    icon: '◆',
    route: '/stats',
    characterId: 'fuuka',
    bgKey: 'keyArt',
  },
  {
    id: 'social',
    label: 'SOCIAL LINK',
    sublabel: 'COMMUNICATION',
    description: 'Connect through social platforms, professional networks, and direct communication channels.',
    icon: '♥',
    route: '/contact',
    characterId: 'yukari',
    bgKey: 'keyArt',
  },
  {
    id: 'system',
    label: 'SYSTEM',
    sublabel: 'SETTINGS & AUDIO',
    description: 'Configure audio preferences, visual settings, and system information for the portfolio interface.',
    icon: '⚙',
    route: '/system',
    characterId: 'koromaru',
    bgKey: 'keyArt',
  },
];

// Preserved for backward-compatible routing and automated audit assertions:
// Requests to '/projects' redirect to '/resume' (EQUIP) where projects are unified.
export const LEGACY_PROJECTS_ROUTE = '/projects';
