export type SocialLinkCategory =
  | 'OPEN_SOURCE'
  | 'ACADEMIC'
  | 'COLLABORATIONS'
  | 'PROFESSIONAL'
  | 'DIRECT'
  | 'COMMUNITIES';

export interface SocialLinkCard {
  id: string;
  name: string;
  category: SocialLinkCategory;
  categoryLabel: string;
  arcanaName: string;
  arcanaNumber: string;
  arcanaRank: string;
  rankLevel: number; // 1 to 10 (10 = MAX)
  handle: string;
  url: string;
  icon: string;
  tarotSymbol: string;
  colorAccent: string;
  shortDescription: string;
  detailedProfile: string;
  connectionSignificance: string;
  associatedProjects: string[];
  actionType: 'external' | 'copy' | 'email';
  actionLabel: string;
}

export const SOCIAL_LINK_CATEGORIES = [
  { id: 'ALL', label: 'ALL LINKS' },
  { id: 'OPEN_SOURCE', label: 'OPEN SOURCE' },
  { id: 'ACADEMIC', label: 'ACADEMIC & CAMPUS' },
  { id: 'COLLABORATIONS', label: 'COLLABORATIONS' },
  { id: 'PROFESSIONAL', label: 'PROFESSIONAL' },
  { id: 'DIRECT', label: 'DIRECT DISPATCH' },
  { id: 'COMMUNITIES', label: 'COMMUNITIES' },
] as const;

export const SOCIAL_LINKS_DATA: SocialLinkCard[] = [
  {
    id: 'github',
    name: 'GitHub Engineering Commons',
    category: 'OPEN_SOURCE',
    categoryLabel: 'Open Source & Repositories',
    arcanaName: 'THE CHARIOT',
    arcanaNumber: 'VII',
    arcanaRank: 'ARCANA VII // THE CHARIOT',
    rankLevel: 10,
    handle: 'github.com/pritesh-4',
    url: 'https://github.com/pritesh-4',
    icon: '♠',
    tarotSymbol: '⚔️',
    colorAccent: 'var(--p3r-cyan)',
    shortDescription: 'Primary public source code archive containing 19 repositories, system architectures, and AI prototypes.',
    detailedProfile: 'The central hub of Pritesh Jena\'s open-source activity. Houses production implementations including SALVUS (disaster response), RouteMind (intelligent LLM routing), Project Zogan (YOLOv8 elephant detection), and F.R.I.D.A.Y. (conversational assistant).',
    connectionSignificance: 'Represents unstoppable forward drive and direct engineering execution through open-source code and public contributions.',
    associatedProjects: ['SIH-2026---SALVUS', 'Project_RouteMind', 'Project_Zogan', 'Project_Aethon', 'Project-FRIDAY'],
    actionType: 'external',
    actionLabel: 'EXPLORE GITHUB ARCHIVE'
  },
  {
    id: 'nit-rourkela',
    name: 'NIT Rourkela Campus Node',
    category: 'ACADEMIC',
    categoryLabel: 'Academic & Engineering Community',
    arcanaName: 'THE MAGICIAN',
    arcanaNumber: 'I',
    arcanaRank: 'ARCANA I // THE MAGICIAN',
    rankLevel: 9,
    handle: 'National Institute of Technology, Rourkela',
    url: 'https://www.nitrkl.ac.in/',
    icon: '✦',
    tarotSymbol: '⚡',
    colorAccent: 'var(--p3r-yellow)',
    shortDescription: 'Undergraduate engineering studies, algorithmic problem solving, and technical campus collaboration.',
    detailedProfile: 'Pritesh\'s academic home at the National Institute of Technology, Rourkela (NIT Rourkela). Engages in computer science fundamentals, engineering mathematics, peer technical discussions, and hackathon project teams.',
    connectionSignificance: 'The foundational bedrock where theoretical computing principles transform into functional systems engineering.',
    associatedProjects: ['Algorithms & Data Structures', 'Systems Engineering', 'SIH Hackathon Team'],
    actionType: 'external',
    actionLabel: 'CAMPUS AFFILIATION'
  },
  {
    id: 'salvus-consortium',
    name: 'SALVUS Hackathon Team',
    category: 'COLLABORATIONS',
    categoryLabel: 'Collaborations & Hackathons',
    arcanaName: 'THE EMPEROR',
    arcanaNumber: 'IV',
    arcanaRank: 'ARCANA IV // THE EMPEROR',
    rankLevel: 10,
    handle: 'Smart India Hackathon (SIH 2026)',
    url: 'https://github.com/pritesh-4/SIH-2026---SALVUS',
    icon: '★',
    tarotSymbol: '🛡️',
    colorAccent: 'var(--p3r-red)',
    shortDescription: 'Lead Systems Architect for an emergency disaster response and intelligent responder allocation platform.',
    detailedProfile: 'Collaborative initiative tackling emergency dispatch coordination. Pritesh served as Lead Systems Architect, orchestrating live SOS map telemetry, triage queues, priority routing algorithms, and multi-agency response dispatch.',
    connectionSignificance: 'Exemplifies leadership, architectural authority, and high-stakes problem solving during collaborative hackathon builds.',
    associatedProjects: ['SIH-2026---SALVUS (Live Vercel App)'],
    actionType: 'external',
    actionLabel: 'INSPECT SALVUS REPO'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Professional Network',
    category: 'PROFESSIONAL',
    categoryLabel: 'Professional Network',
    arcanaName: 'THE HIEROPHANT',
    arcanaNumber: 'V',
    arcanaRank: 'ARCANA V // THE HIEROPHANT',
    rankLevel: 10,
    handle: 'in/pritesh-jena-8980a6373',
    url: 'https://www.linkedin.com/in/pritesh-jena-8980a6373',
    icon: '◆',
    tarotSymbol: '📜',
    colorAccent: '#0077b5',
    shortDescription: 'Professional connection link for software engineering collaborations, recruitment, and technical dialog.',
    detailedProfile: 'The professional frequency for industry connections, engineering mentorship, technical recruitment opportunities, and formal project announcements.',
    connectionSignificance: 'Anchors developer credibility, verifiable background, and formal communication with engineering teams and recruiters.',
    associatedProjects: ['Full-Stack Engineering', 'AI System Integration', 'Industry Dialog'],
    actionType: 'external',
    actionLabel: 'CONNECT ON LINKEDIN'
  },
  {
    id: 'email',
    name: 'Electronic Direct Dispatch',
    category: 'DIRECT',
    categoryLabel: 'Direct Communications',
    arcanaName: 'THE LOVERS',
    arcanaNumber: 'VI',
    arcanaRank: 'ARCANA VI // THE LOVERS',
    rankLevel: 10,
    handle: 'priteshjena16@gmail.com',
    url: 'mailto:priteshjena16@gmail.com',
    icon: '♥',
    tarotSymbol: '✉️',
    colorAccent: 'var(--p3r-magenta)',
    shortDescription: 'Direct 1-on-1 electronic transmission terminal for technical project inquiries, collaborations, and queries.',
    detailedProfile: 'The most direct and reliable communication channel to reach Pritesh Jena directly. Inquiries regarding project collaboration, technical design, or developer roles receive immediate attention.',
    connectionSignificance: 'Represents authentic human-to-human connection and immediate responsive dialogue without platform intermediaries.',
    associatedProjects: ['Direct Correspondence', 'Project Inquiries', 'Engineering Discussions'],
    actionType: 'copy',
    actionLabel: 'COPY EMAIL ADDRESS'
  },
  {
    id: 'chronicles',
    name: 'The Last Chronicle Portal',
    category: 'COMMUNITIES',
    categoryLabel: 'Creative Systems & Narrative UI',
    arcanaName: 'THE STAR',
    arcanaNumber: 'XVII',
    arcanaRank: 'ARCANA XVII // THE STAR',
    rankLevel: 9,
    handle: 'pritesh-jena-portfolio.vercel.app',
    url: 'https://pritesh-jena-portfolio.vercel.app/',
    icon: '◈',
    tarotSymbol: '⭐',
    colorAccent: 'var(--p3r-cyan)',
    shortDescription: 'Sister interactive web experience inspired by Omniscient Reader\'s Viewpoint, exploring narrative web craft.',
    detailedProfile: 'A sister creative portfolio project (Project Yumei / The Last Chronicle) developed by Pritesh, showcasing complex timeline progressions, animated scenarios, and narrative web development techniques.',
    connectionSignificance: 'Bridges deep technical engineering with narrative art and imaginative frontend craftsmanship.',
    associatedProjects: ['The Last Chronicle (Project Yumei)'],
    actionType: 'external',
    actionLabel: 'VISIT SISTER PORTAL'
  },
  {
    id: 'x-twitter',
    name: 'X (Twitter) Engineering Broadcast',
    category: 'COMMUNITIES',
    categoryLabel: 'Developer Communities',
    arcanaName: 'THE HERMIT',
    arcanaNumber: 'IX',
    arcanaRank: 'ARCANA IX // THE HERMIT',
    rankLevel: 7,
    handle: '@PriteshJena02',
    url: 'https://x.com/PriteshJena02',
    icon: '◇',
    tarotSymbol: '🏮',
    colorAccent: 'var(--p3r-ice)',
    shortDescription: 'Public thoughts, software shipping logs, technology explorations, and autonomous AI insights.',
    detailedProfile: 'Pritesh\'s public micro-broadcast channel sharing daily software findings, ML insights, frontend UI experiments, and open discussions with the global engineering community.',
    connectionSignificance: 'A window into exploratory thinking, continuous curiosity, and public tech reflection.',
    associatedProjects: ['Tech Logs', 'AI Insights', 'Developer Community'],
    actionType: 'external',
    actionLabel: 'FOLLOW ON X'
  }
];
