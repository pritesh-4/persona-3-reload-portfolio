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
    itemName: 'FastAPI & React 19 Dual Blade',
    rarity: 'LEGENDARY',
    powerStat: 'ATK +99',
    defenseStat: 'CRIT +45%',
    description: 'Forged from high-performance asynchronous Python microservices and concurrent React rendering. Slices through latency and delivers responsive user journeys.',
    perks: ['Zero Runtime Type Flaws', 'Sub-second API Latency', 'Fluid 60 FPS Component Trees']
  },
  {
    slotType: 'ARMOR',
    slotName: 'SYSTEM BODY ARMOR',
    itemName: 'NIT Rourkela Engineering Aegis',
    rarity: 'EPIC',
    powerStat: 'DEF +90',
    defenseStat: 'RESIST [COMPLEXITY]',
    description: 'Rigorous undergraduate engineering training at National Institute of Technology, Rourkela. Absorbs computational problems and algorithmic complexity.',
    perks: ['Data Structures & Algorithms', 'Operating Systems', 'System Architecture']
  },
  {
    slotType: 'ACCESSORY',
    slotName: 'RELIC ACC. 1',
    itemName: 'SALVUS System Architecture Seal',
    rarity: 'LEGENDARY',
    powerStat: 'MAG +88',
    defenseStat: 'DISPATCH LOCK 100%',
    description: 'Awarded for lead architectural design of the emergency rescue coordination platform, incorporating 3-tier AI triage and human authorization safety locks.',
    perks: ['Deterministic Fleet Matching', 'Real-Time Socket.IO Streaming', 'Human Command Lock']
  },
  {
    slotType: 'ACCESSORY',
    slotName: 'RELIC ACC. 2',
    itemName: 'AETHON Spectrotemporal Prism',
    rarity: 'EPIC',
    powerStat: 'AGI +75',
    defenseStat: 'OUTLIER SCAN +60%',
    description: 'Inscribed with unsupervised normality algorithms for detecting anomalous astronomical radio signatures without labeled ground truth.',
    perks: ['Normality Modeling', 'Doppler Drift Analysis', 'Dynamic Waterfall Spectra']
  },
  {
    slotType: 'SPECIAL',
    slotName: 'TACTICAL RELIC',
    itemName: 'RouteMind Intent Router Engine',
    rarity: 'EPIC',
    powerStat: 'SPD +85',
    defenseStat: 'EFFICIENCY +95%',
    description: 'Intelligently classifies user query intent and dispatches across multi-provider AI endpoints balancing speed, cost, and quality.',
    perks: ['Explainable Routing Metadata', 'Multi-Provider Adapters', 'Persistent Memory Extraction']
  }
];

export const PROGRESSION_TIMELINE: ProgressionMilestone[] = [
  {
    id: 'exp-salvus',
    period: '2026',
    category: 'EXPERIENCE',
    title: 'Lead Systems Architect & AI Integration Engineer',
    organization: 'SIH 2026 — SALVUS (Disaster Intelligence Platform)',
    role: 'Lead Systems Architect',
    location: 'NIT Rourkela / Smart India Hackathon',
    summary: 'Led system architecture and engineering for an AI-powered disaster coordination platform connecting citizens in acute distress with emergency authorities.',
    achievements: [
      'Architected asynchronous FastAPI backend core with SQLite WAL persistence, handling live geospatial telemetry and incident registries.',
      'Constructed 3-tier AI triage waterfall (Gemini 2.5 → Groq Llama-3.3 → deterministic heuristics) with PII sanitization and human verification safety locks.',
      'Engineered explainable 6-factor deterministic fleet allocation engine (scored up to 100) and multi-room Socket.IO real-time event broadcasting.'
    ],
    skills: ['FastAPI', 'Python', 'React 19', 'Socket.IO', 'SQLite WAL', 'Geospatial Routing', 'Gemini API']
  },
  {
    id: 'exp-aethon',
    period: '2026',
    category: 'MILESTONE',
    title: 'Lead Researcher & Frontend Architect',
    organization: 'Project AETHON (Astronomical Radio Discovery)',
    role: 'Research Architect',
    location: 'Independent Research Prototype',
    summary: 'Developed an independent research prototype exploring unsupervised anomaly detection for surfacing anomalous radio signatures in astronomical telemetry.',
    achievements: [
      'Engineered high-precision astronomical observatory web console with real-time dynamic spectrograms and Doppler drift visualization.',
      'Formulated typed telemetry data contracts with strict runtime Zod schema validation and Recharts analytical views.',
      'Architected target machine learning discovery pipeline based on normality modeling, manifold projection, and Taylor-tree Doppler drift coherence.'
    ],
    skills: ['TypeScript', 'React 19', 'Recharts', 'Zod', 'Python', 'Scientific Visualization']
  },
  {
    id: 'exp-routemind',
    period: '2026',
    category: 'MILESTONE',
    title: 'Creator & AI Systems Developer',
    organization: 'Project RouteMind',
    role: 'Creator & Full-Stack Developer',
    location: 'Open Source / Independent',
    summary: 'Engineered an intelligent query classification and multi-model LLM routing platform designed to eliminate model selection decision fatigue.',
    achievements: [
      'Implemented extensible rule-based intent classification engine dispatching requests based on Cost, Speed, Balanced, and Quality trade-offs.',
      'Integrated live provider adapters for OpenAI and Google GenAI with structured confidence, cost, and latency telemetry.',
      'Constructed persistent conversation session memory and background long-term fact extraction in SQLite with SQLAlchemy 2.0.'
    ],
    skills: ['FastAPI', 'React 19', 'SQLAlchemy', 'SQLite', 'LLM Routing', 'Tailwind CSS v4']
  },
  {
    id: 'exp-zogan',
    period: '2026',
    category: 'MILESTONE',
    title: 'Computer Vision & ML Developer',
    organization: 'Project Zogan (Wildlife Detection & Tracking)',
    role: 'ML Systems Engineer',
    location: 'Independent Research Prototype',
    summary: 'Constructed an automated deep learning pipeline for elephant detection, multi-target tracking, and simulated geofenced risk evaluation.',
    achievements: [
      'Fine-tuned custom single-class YOLO model (elephant_v1) on 456 images, achieving 88.2% mAP@50.',
      'Integrated ByteTrack multi-target tracking with 5-frame persistence filtering to eliminate transient false alarms in monocular video feeds.',
      'Implemented Haversine geodesic distance evaluation, multi-factor risk scoring, atomic JSONL logging, and asynchronous Telegram alerting.'
    ],
    skills: ['Python', 'PyTorch', 'Ultralytics YOLO', 'OpenCV', 'ByteTrack', 'Spatial Heuristics']
  },
  {
    id: 'exp-friday',
    period: '2026',
    category: 'MILESTONE',
    title: 'Creator & AI Assistant Architect',
    organization: 'Project F.R.I.D.A.Y.',
    role: 'Creator & Full-Stack Developer',
    location: 'Open Source / Independent',
    summary: 'Explored conversational voice-first interfaces, cognitive memory systems, and workflow automation inspired by sci-fi AI companions.',
    achievements: [
      'Engineered 4-state dynamic Framer Motion reactive core Orb and custom WebGL fragment shader cyberspace canvas.',
      'Constructed full-duplex WebSocket voice loop with speculative intent prefetching and interruption handling.',
      'Integrated ChromaDB semantic memory layer for cross-session knowledge graph contextual recall.'
    ],
    skills: ['React 19', 'FastAPI', 'ChromaDB', 'WebSockets', 'Framer Motion', 'WebGL Shaders']
  },
  {
    id: 'exp-yumei',
    period: '2026',
    category: 'MILESTONE',
    title: 'Creator & Narrative UI Engineer',
    organization: 'The Last Chronicle (Project Yumei)',
    role: 'Creative Frontend Engineer',
    location: 'Independent Web Experience',
    summary: 'Reimagined the developer portfolio as an interactive narrative journey inspired by Omniscient Reader\'s Viewpoint.',
    achievements: [
      'Built scenario-based narrative entry and milestone constellation timelines with fluid spring physics.',
      'Constructed responsive ORV system windows and hidden unlockable scenario routes with hand-crafted zero-dependency CSS.',
      'Deployed live web experience at pritesh-jena-portfolio.vercel.app with high engagement.'
    ],
    skills: ['React', 'Vite', 'Framer Motion', 'Storytelling UI', 'CSS3 Engine']
  },
  {
    id: 'exp-devlore',
    period: '2026',
    category: 'MILESTONE',
    title: 'Creator & Frontend Developer',
    organization: 'Project DevLore',
    role: 'Frontend Engineer',
    location: 'Independent Web Application',
    summary: 'Engineered a stateful developer knowledge quiz compilation platform from scratch with custom React hooks and API integration.',
    achievements: [
      'Designed responsive modular interface with dynamic Open Trivia DB API question ingestion.',
      'Constructed state persistence layer ensuring quiz progress and historical analytics survive browser refreshes.',
      'Deployed live at devlore-ebon.vercel.app with full test suite passing.'
    ],
    skills: ['React', 'Vite', 'Axios', 'REST APIs', 'LocalStorage', 'CSS3']
  },
  {
    id: 'edu-nitr',
    period: 'Active',
    category: 'EDUCATION',
    title: 'Undergraduate Engineering Student',
    organization: 'National Institute of Technology, Rourkela (NIT Rourkela)',
    role: 'Undergraduate Student',
    location: 'Rourkela, Odisha, India',
    summary: 'Pursuing undergraduate engineering curriculum at National Institute of Technology, Rourkela, focusing on core computer science fundamentals, algorithms, data structures, machine learning, and systems software.',
    achievements: [
      'Active focus on algorithm complexity, object-oriented systems design, and database architecture.',
      'Hands-on engineering across hackathon initiatives (SALVUS Lead Architect, AETHON) and open-source systems.'
    ],
    skills: ['Data Structures & Algorithms', 'C/C++', 'Python', 'Systems Architecture', 'Web Technologies']
  }
];
