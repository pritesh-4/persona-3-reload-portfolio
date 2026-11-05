export interface ProfileDossierCard {
  id: string;
  label: string;
  primaryValue: string;
  supportingInfo: string[];
}

export interface ProfileData {
  name: string;
  codename: string;
  role: string;
  headline: string;
  institution: string;
  level: number;
  hp: number;
  sp: number;
  arcana: string;
  affiliation: string;
  location: string;
  status: string;
  summary: string;
  cards: ProfileDossierCard[];
  biography: string[];
  philosophy: {
    title: string;
    statement: string;
  }[];
  attributes: {
    label: string;
    value: string;
    rating: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  name: 'PRITESH KUMAR JENA',
  codename: 'AI BUILDER // S.E.E.S. ARCHIVE',
  role: 'Mining Engineering Undergraduate & Full-Stack Developer',
  headline: 'MINING ENGINEERING STUDENT • FULL-STACK DEVELOPER • AI BUILDER',
  institution: 'National Institute of Technology, Rourkela (NIT Rourkela)',
  level: 99,
  hp: 999,
  sp: 999,
  arcana: 'THE FOOL // 0',
  affiliation: 'NIT ROURKELA // MINING ENGINEERING',
  location: 'Rourkela, Odisha, India',
  status: '2ND YEAR UNDERGRADUATE // ACTIVE BUILDER',
  summary:
    'Second-year Mining Engineering undergraduate at NIT Rourkela with a strong interest in technology, actively exploring AI, software engineering, and intelligent systems through independent projects.',
  cards: [
    {
      id: 'education',
      label: 'EDUCATION',
      primaryValue: 'MINING ENGINEERING',
      supportingInfo: [
        'Second-year undergraduate student.',
        'National Institute of Technology, Rourkela.'
      ]
    },
    {
      id: 'technology',
      label: 'TECHNOLOGY INTERESTS',
      primaryValue: 'AI & SOFTWARE ENGINEERING',
      supportingInfo: [
        'Artificial Intelligence and Machine Learning.',
        'Full-Stack Development.',
        'Intelligent Systems and AI Agents.',
        'Developer Tools and System Architecture.'
      ]
    },
    {
      id: 'research',
      label: 'RESEARCH INTEREST',
      primaryValue: 'SCIENTIFIC COMPUTING',
      supportingInfo: [
        'Astronomical signal analysis and anomaly detection — Project AETHON.'
      ]
    },
    {
      id: 'projects',
      label: 'SELECTED PROJECT WORK',
      primaryValue: 'INTELLIGENT SYSTEMS',
      supportingInfo: [
        'SALVUS — Disaster Intelligence',
        'RouteMind — AI Model Routing',
        'Zogan — Wildlife Computer Vision'
      ]
    },
    {
      id: 'location',
      label: 'LOCATION',
      primaryValue: 'ROURKELA, ODISHA',
      supportingInfo: ['INDIA']
    }
  ],
  biography: [
    'Second-year undergraduate student pursuing Mining Engineering at the National Institute of Technology, Rourkela (NIT Rourkela).',
    'Driven by a strong independent interest in artificial intelligence, full-stack software development, and intelligent systems architecture, turning ambitious ideas into production-ready software.',
    'Lead Systems Architect, Full-Stack & AI Integration Engineer for SALVUS (Smart India Hackathon 2026), building emergency coordination pipelines with FastAPI microservices and 3-tier AI triage.',
    'Author of Project AETHON, an independent scientific computing research prototype investigating unsupervised anomaly detection to surface uncatalogued astronomical radio transients.',
    'Creator of RouteMind (an intelligent multi-model LLM router evaluating query intent across speed, cost, and quality trade-offs) and Project Zogan (YOLO-based elephant detection, ByteTrack tracking, and geofenced risk heuristics).'
  ],
  philosophy: [
    {
      title: 'OPEN DISCOVERY & SYSTEMS CURIOSITY',
      statement:
        'Software reaches its peak when tackling difficult, open-ended discovery problems—whether routing between AI model trade-offs or finding unknown spectral anomalies in radio astronomy.'
    },
    {
      title: 'HUMAN-CENTERED COGNITIVE ARCHITECTURE',
      statement:
        'AI should empower human agency rather than replace it. From human-authorized emergency response in SALVUS to explainable model routing in RouteMind, intelligent systems must be transparent and auditable.'
    },
    {
      title: 'NARRATIVE & INTERACTIVE CRAFTSMANSHIP',
      statement:
        'Code and design are two halves of the same story. Interfaces should feel alive, atmospheric, and deliberate—transforming technical utility into an unforgettable journey.'
    }
  ],
  attributes: [
    { label: 'DEGREE PROGRAM', value: 'MINING ENGINEERING (2ND YEAR)', rating: 'ACTIVE' },
    { label: 'INSTITUTION', value: 'NIT ROURKELA', rating: 'VERIFIED' },
    { label: 'TECHNICAL FOCUS', value: 'AI & SOFTWARE ENGINEERING', rating: 'S-RANK' },
    { label: 'RESEARCH DOMAIN', value: 'SCIENTIFIC COMPUTING (AETHON)', rating: 'ACTIVE' },
    { label: 'KEY PROJECTS', value: 'SALVUS • ROUTEMIND • ZOGAN', rating: 'SHIPPED' },
    { label: 'LOCATION', value: 'ROURKELA, ODISHA (INDIA)', rating: 'LOCAL' }
  ]
};
