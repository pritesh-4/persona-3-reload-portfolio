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
    sublabel: 'CODE REPOSITORY FREQUENCY',
    handle: 'github.com/pritesh-4',
    url: 'https://github.com/pritesh-4',
    icon: '♠',
    arcanaRank: 'ARCANA: THE CHARIOT',
    rankLevel: 10,
    description: 'Explore full source code, open-source pull requests, algorithm challenges, and ongoing system commits.',
    actionType: 'external'
  },
  {
    id: 'linkedin',
    name: 'LINKEDIN FREQUENCY',
    sublabel: 'PROFESSIONAL NETWORK LINK',
    handle: 'in/pritesh-jena-8980a6373',
    url: 'https://www.linkedin.com/in/pritesh-jena-8980a6373',
    icon: '★',
    arcanaRank: 'ARCANA: THE EMPEROR',
    rankLevel: 9,
    description: 'Connect for software engineering opportunities, tech talks, open-source initiatives, and collaboration.',
    actionType: 'external'
  },
  {
    id: 'email',
    name: 'DIRECT EMAIL TERMINAL',
    sublabel: 'STAR STREAM DISPATCH',
    handle: 'priteshjena16@gmail.com',
    url: 'mailto:priteshjena16@gmail.com',
    icon: '♥',
    arcanaRank: 'ARCANA: THE LOVERS',
    rankLevel: 10,
    description: 'Send direct transmissions, project proposals, contracting opportunities, or technical inquiries.',
    actionType: 'copy'
  },
  {
    id: 'chronicles',
    name: 'CHRONICLES OF FATE',
    sublabel: 'LIVE WEB PORTAL',
    handle: 'chronicle-of-fate-portfolio.vercel.app',
    url: 'https://chronicle-of-fate-portfolio.vercel.app/',
    icon: '◈',
    arcanaRank: 'ARCANA: THE STAR',
    rankLevel: 8,
    description: 'Inspect the sister interactive web experience chronicling achievements, timelines, and developer fables.',
    actionType: 'external'
  }
];

