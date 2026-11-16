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

export const PRIMARY_CONTACT = {
  email: 'priteshjena16@gmail.com',
  githubUrl: 'https://github.com/pritesh-4',
  githubHandle: '@pritesh-4',
  linkedinUrl: 'https://www.linkedin.com/in/pritesh-jena-8980a6373/',
  linkedinHandle: 'pritesh-jena-8980a6373',
  xUrl: 'https://x.com/PriteshJena02',
  xHandle: '@PriteshJena02',
  mailtoUrl: 'mailto:priteshjena16@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Pritesh%20Jena',
};

export const VERIFIED_CHANNELS: VerifiedSocialChannel[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: PRIMARY_CONTACT.githubHandle,
    url: PRIMARY_CONTACT.githubUrl,
    purpose: 'Public repositories, engineering projects, experiments and open-source work.',
    actionLabel: 'OPEN GITHUB',
    brandColor: '#F1F5FA',
    badge: 'CORE CODEBASE & REPOSITORIES',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: PRIMARY_CONTACT.linkedinHandle,
    url: PRIMARY_CONTACT.linkedinUrl,
    purpose: 'Professional networking, opportunities and engineering connections.',
    actionLabel: 'CONNECT ON LINKEDIN',
    brandColor: '#0A66C2',
    badge: 'CAREER & PROFESSIONAL DIALOGUE',
  },
  {
    id: 'x',
    name: 'X',
    handle: PRIMARY_CONTACT.xHandle,
    url: PRIMARY_CONTACT.xUrl,
    purpose: 'Technology interests, thoughts and public updates.',
    actionLabel: 'FOLLOW ON X',
    brandColor: '#F1F5FA',
    badge: 'ENGINEERING THOUGHTS & LOGS',
  },
  {
    id: 'email',
    name: 'Direct Email',
    handle: PRIMARY_CONTACT.email,
    url: PRIMARY_CONTACT.mailtoUrl,
    purpose: 'Direct 1-on-1 correspondence for collaborations, technical inquiries and opportunities.',
    actionLabel: 'SEND DIRECT EMAIL',
    brandColor: '#37D9F2',
    badge: 'PRIMARY DIRECT CHANNEL',
  },
];
