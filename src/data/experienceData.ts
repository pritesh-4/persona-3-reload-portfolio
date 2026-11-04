export interface EquipmentSlot {
  slotType: 'WEAPON' | 'ARMOR' | 'ACCESSORY' | 'FOOTWEAR' | 'SPECIAL';
  slotName: string;
  itemName: string;
  rarity: 'LEGENDARY' | 'EPIC' | 'RARE' | 'COMMON';
  powerStat: string;
  defenseStat: string;
  description: string;
  perks: string[];
}

export interface ProgressionMilestone {
  id: string;
  period: string;
  category: 'EDUCATION' | 'EXPERIENCE' | 'OPEN_SOURCE' | 'MILESTONE';
  title: string;
  organization: string;
  role: string;
  location: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

export const EQUIPMENT_LOADOUT: EquipmentSlot[] = [
  {
    slotType: 'WEAPON',
    slotName: 'PRIMARY ARSENAL',
    itemName: 'React 19 / TypeScript Katana',
    rarity: 'LEGENDARY',
    powerStat: 'ATK +99',
    defenseStat: 'CRIT +45%',
    description: 'Forged from modern web standards and strict type definitions. Slices through complex state bugs and renders interfaces at 60 FPS.',
    perks: ['Zero Runtime Type Flaws', 'Instant HMR Speed', 'Fluid Component Trees']
  },
  {
    slotType: 'ARMOR',
    slotName: 'SYSTEM BODY ARMOR',
    itemName: 'B.Tech Engineering Chassis',
    rarity: 'EPIC',
    powerStat: 'DEF +85',
    defenseStat: 'RESIST [STRESS]',
    description: 'Rigorous undergraduate curriculum in Computer Science & Engineering. Absorbs algorithmic complexity and theoretical problem sets.',
    perks: ['Data Structures & Algorithms', 'Operating Systems', 'Database Architecture']
  },
  {
    slotType: 'ACCESSORY',
    slotName: 'RELIC ACC. 1',
    itemName: 'GSSoC 2026 Contributor Emblem',
    rarity: 'EPIC',
    powerStat: 'MAG +70',
    defenseStat: 'REP +100',
    description: 'Awarded for collaborative contributions to global open-source codebases during GirlScript Summer of Code 2026.',
    perks: ['10+ Merged Production PRs', 'Global Async Teamwork', 'Rigorous Code Review']
  },
  {
    slotType: 'ACCESSORY',
    slotName: 'RELIC ACC. 2',
    itemName: 'Top Tier Contributor Ribbon',
    rarity: 'RARE',
    powerStat: 'AGI +60',
    defenseStat: 'EXP +35%',
    description: 'Recognized for high-speed resolution of critical issues and rapid feature deployments in competitive sprints.',
    perks: ['Swift Bug Turnaround', 'Cross-Repo Versatility', 'Active Mentorship']
  },
  {
    slotType: 'SPECIAL',
    slotName: 'TACTICAL BELT',
    itemName: 'Vercel & Git Autonomous Deployer',
    rarity: 'EPIC',
    powerStat: 'SPD +80',
    defenseStat: 'UPTIME 99.9%',
    description: 'Automated CI/CD webhook orchestrator connecting GitHub pushes directly to global edge networks.',
    perks: ['Instant Edge Invalidation', 'Branch Previews', 'Zero Downtime']
  }
];

export const PROGRESSION_TIMELINE: ProgressionMilestone[] = [
  {
    id: 'exp-gssoc',
    period: '2026',
    category: 'OPEN_SOURCE',
    title: 'Open Source Contributor',
    organization: 'GirlScript Summer of Code (GSSoC 2026)',
    role: 'Core Contributor & Developer',
    location: 'Remote / Global',
    summary: 'Selected among thousands of applicants to refactor, debug, and implement mission-critical features in active open-source projects.',
    achievements: [
      'Authored and successfully merged 10+ pull requests addressing performance, responsive layouts, and UI bugs.',
      'Collaborated asynchronously with maintainers and contributors worldwide via Git and GitHub workflows.',
      'Achieved Top-Ranked status through consistent output and high review velocity.'
    ],
    skills: ['Git', 'GitHub', 'React', 'JavaScript', 'Documentation', 'Code Review']
  },
  {
    id: 'exp-devlore',
    period: '2026',
    category: 'EXPERIENCE',
    title: 'Lead Frontend Architect',
    organization: 'DevLore Project',
    role: 'Creator & Engineer',
    location: 'Independent',
    summary: 'Engineered a stateful developer knowledge quiz compilation platform from scratch with custom React hooks and API integration.',
    achievements: [
      'Designed responsive modular interface with instant question synchronization.',
      'Constructed state persistence layer ensuring quiz progress survives browser refreshes.',
      'Deployed live with 100% lighthouse accessibility and mobile responsiveness score.'
    ],
    skills: ['React', 'Vite', 'REST APIs', 'Custom Hooks', 'CSS3']
  },
  {
    id: 'exp-ai-impact',
    period: '2026',
    category: 'MILESTONE',
    title: 'ML System Engineer',
    organization: 'AI Impact Predictor',
    role: 'Full-Stack & ML Developer',
    location: 'Independent',
    summary: 'Developed an intelligent predictive layer to analyze code changes and forecast post-deployment risk metrics before release.',
    achievements: [
      'Trained heuristic classification pipeline using Python and scikit-learn.',
      'Built a Flask backend service with REST endpoints to serve model predictions to a dynamic React dashboard.',
      'Visualized risk curves with interactive chart interfaces.'
    ],
    skills: ['Python', 'scikit-learn', 'Flask', 'React', 'Data Analysis']
  },
  {
    id: 'edu-btech',
    period: '2023 - 2027',
    category: 'EDUCATION',
    title: 'B.Tech in Computer Science & Engineering',
    organization: 'University Engineering College',
    role: 'Undergraduate Engineering Student',
    location: 'India',
    summary: 'Pursuing comprehensive curriculum in Computer Science principles, systems architecture, algorithmic analysis, and software engineering.',
    achievements: [
      'Consistent academic performance with focus on algorithms, OOP, database management, and computer networks.',
      'Led student tech initiatives and organized collaborative hackathon participation.'
    ],
    skills: ['C/C++', 'Data Structures', 'Algorithms', 'DBMS', 'Computer Networks']
  }
];

