export interface SocialLinkChannel {
  id: string;
  name: string;
  sublabel: string;
  handle: string;
  url: string;
  icon: string;
  arcanaRank: string;
  rankLevel: number;
  description: string;
  actionType: 'external' | 'copy' | 'email';
}

export const SOCIAL_LINKS_DATA: SocialLinkChannel[] = [
  {
    id: 'github',
    name: 'GITHUB ARCHIVE',
    sublabel: 'PRIMARY CODE REPOSITORY FREQUENCY',
    handle: 'github.com/pritesh-4',
    url: 'https://github.com/pritesh-4',
    icon: '♠',
    arcanaRank: 'ARCANA: THE CHARIOT',
    rankLevel: 10,
    description: 'Explore full public source repositories, system architecture blueprints, AI experiments, and open-source contributions.',
    actionType: 'external'
  },
  {
    id: 'linkedin',
    name: 'LINKEDIN NETWORK',
    sublabel: 'PROFESSIONAL CONNECTION LINK',
    handle: 'in/pritesh-jena-8980a6373',
    url: 'https://www.linkedin.com/in/pritesh-jena-8980a6373',
    icon: '★',
    arcanaRank: 'ARCANA: THE EMPEROR',
    rankLevel: 10,
    description: 'Connect for software engineering collaborations, technical discussions, hackathon initiatives, and developer opportunities.',
    actionType: 'external'
  },
  {
    id: 'email',
    name: 'ELECTRONIC DISPATCH',
    sublabel: 'DIRECT TRANSMISSION TERMINAL',
    handle: 'priteshjena16@gmail.com',
    url: 'mailto:priteshjena16@gmail.com',
    icon: '♥',
    arcanaRank: 'ARCANA: THE LOVERS',
    rankLevel: 10,
    description: 'Send direct email transmissions, technical project inquiries, and engineering correspondence directly to the inbox.',
    actionType: 'copy'
  },
  {
    id: 'chronicles',
    name: 'THE LAST CHRONICLE',
    sublabel: 'SISTER INTERACTIVE NARRATIVE PORTAL',
    handle: 'pritesh-jena-portfolio.vercel.app',
    url: 'https://pritesh-jena-portfolio.vercel.app/',
    icon: '◈',
    arcanaRank: 'ARCANA: THE STAR',
    rankLevel: 9,
    description: 'Inspect the sister interactive web experience inspired by Omniscient Reader\'s Viewpoint, featuring timeline milestones and scenarios.',
    actionType: 'external'
  },
  {
    id: 'x-twitter',
    name: 'X (TWITTER) DISPATCH',
    sublabel: 'PUBLIC THOUGHTS & TECH UPDATES',
    handle: '@PriteshJena02',
    url: 'https://x.com/PriteshJena02',
    icon: '◆',
    arcanaRank: 'ARCANA: THE HERMIT',
    rankLevel: 7,
    description: 'Follow public updates, technology explorations, software shipping milestones, and sci-fi thoughts.',
    actionType: 'external'
  },
  {
    id: 'instagram',
    name: 'INSTAGRAM DISPATCH',
    sublabel: 'CREATIVE VISUAL FREQUENCY',
    handle: '@priteshjena02',
    url: 'https://instagram.com/priteshjena02',
    icon: '✦',
    arcanaRank: 'ARCANA: THE SUN',
    rankLevel: 6,
    description: 'Visual sketches, graphic design experiments, and informal creative updates.',
    actionType: 'external'
  }
];
