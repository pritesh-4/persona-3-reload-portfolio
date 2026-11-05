export interface VerifiedSocialChannel {
  id: 'github' | 'linkedin' | 'x' | 'email';
  name: string;
  handle: string;
  url: string;
  purpose: string;
  actionLabel: string;
  brandColor: string;
  badge: string;
}

export const VERIFIED_CHANNELS: VerifiedSocialChannel[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@pritesh-4',
    url: 'https://github.com/pritesh-4',
    purpose: 'Public repositories, engineering projects, experiments and open-source work.',
    actionLabel: 'OPEN GITHUB',
    brandColor: '#F1F5FA',
    badge: 'CORE CODEBASE & REPOSITORIES',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'pritesh-jena-8980a6373',
    url: 'https://www.linkedin.com/in/pritesh-jena-8980a6373/',
    purpose: 'Professional networking, opportunities and engineering connections.',
    actionLabel: 'CONNECT ON LINKEDIN',
    brandColor: '#0A66C2',
    badge: 'CAREER & PROFESSIONAL DIALOGUE',
  },
  {
    id: 'x',
    name: 'X',
    handle: '@PriteshJena02',
    url: 'https://x.com/PriteshJena02',
    purpose: 'Technology interests, thoughts and public updates.',
    actionLabel: 'FOLLOW ON X',
    brandColor: '#F1F5FA',
    badge: 'ENGINEERING THOUGHTS & LOGS',
  },
  {
    id: 'email',
    name: 'Direct Email',
    handle: 'priteshjena16@gmail.com',
    url: 'mailto:priteshjena16@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Pritesh%20Jena',
    purpose: 'Direct 1-on-1 correspondence for collaborations, technical inquiries and opportunities.',
    actionLabel: 'SEND DIRECT EMAIL',
    brandColor: '#37D9F2',
    badge: 'PRIMARY DIRECT CHANNEL',
  },
];

// Preserved for contract compatibility with automated audit tests
export interface SocialLinkCard {
  id: string;
  name: string;
  handle: string;
  url: string;
  shortDescription: string;
}

export const SOCIAL_LINKS_DATA: SocialLinkCard[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@pritesh-4',
    url: 'https://github.com/pritesh-4',
    shortDescription: 'Public repositories, engineering projects, experiments and open-source work.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'pritesh-jena-8980a6373',
    url: 'https://www.linkedin.com/in/pritesh-jena-8980a6373/',
    shortDescription: 'Professional networking, opportunities and engineering connections.',
  },
  {
    id: 'x-twitter',
    name: 'X',
    handle: '@PriteshJena02',
    url: 'https://x.com/PriteshJena02',
    shortDescription: 'Technology interests, thoughts and public updates.',
  },
  {
    id: 'email',
    name: 'Direct Email',
    handle: 'priteshjena16@gmail.com',
    url: 'mailto:priteshjena16@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Pritesh%20Jena',
    shortDescription: 'Direct correspondence terminal.',
  },
  {
    id: 'academic-node',
    name: 'Academic Node',
    handle: 'NIT Rourkela',
    url: 'https://www.nitrkl.ac.in/',
    shortDescription: 'National Institute of Technology, Rourkela.',
  },
  {
    id: 'project-salvus',
    name: 'SALVUS Initiative',
    handle: 'SIH 2026',
    url: 'https://github.com/pritesh-4/SIH-2026---SALVUS',
    shortDescription: 'Emergency disaster intelligence repository.',
  },
  {
    id: 'project-yumei',
    name: 'Narrative Portfolio Archive',
    handle: 'Project Yumei',
    url: 'https://pritesh-jena-portfolio.vercel.app/',
    shortDescription: 'Interactive web narrative archive.',
  },
];
