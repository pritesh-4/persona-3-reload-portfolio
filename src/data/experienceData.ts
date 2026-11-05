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
  projectId?: string;
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
    projectId: 'quest-01',
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
    projectId: 'quest-02',
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
    projectId: 'quest-03',
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
    projectId: 'quest-04',
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
    projectId: 'quest-05',
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
    id: 'exp-holytrial',
    projectId: 'quest-08',
    period: '2026',
    category: 'MILESTONE',
    title: 'Lead Frontend & Systems Architect',
    organization: 'Project Holy Trial (The Obsidian Tribunal)',
    role: 'Lead Systems Architect',
    location: 'Open Source / Independent',
    summary: 'Designed an institutional investigative workspace connecting proposition formulation, empirical evidence ingestion, adversarial cross-examination, and structured judicial adjudication.',
    achievements: [
      'Designed a multi-stage judicial workflow: Threshold Prologue, Claim Docket, Chamber of Evidence, Adversarial Scrutiny, and Adjudication Verdict.',
      'Implemented triple-vector evidence ingestion with cryptographic SHA-256 integrity fingerprints and auditable ledger.',
      'Constructed grounded adversarial analysis citing exact exhibits with contradiction mapping and confidence gauges.'
    ],
    skills: ['React 19', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'Tailwind CSS', 'Web Audio API']
  },
  {
    id: 'exp-orbit',
    projectId: 'quest-09',
    period: 'Ongoing',
    category: 'MILESTONE',
    title: 'Robotics & Embedded Systems Designer',
    organization: 'Project ORBIT (AI Desk Companion Robot)',
    role: 'Robotics & Embedded Designer',
    location: 'Hardware Prototyping / Research',
    summary: 'Architected an independent robotics and embedded systems project exploring multimodal human-robot interaction through an expressive desk companion built from the ground up on ESP32-S3.',
    achievements: [
      'Designed articulated 2-axis (pan/tilt) servo neck mechanism for expressive physical tracking and head-tilts.',
      'Constructed circular visual display architecture rendering animated eye micro-expressions and gaze cues.',
      'Engineered dual-bus power isolation separating inductive servo noise from sensitive ESP32-S3 microcontroller logic.'
    ],
    skills: ['ESP32-S3', 'C/C++', 'Robotics Kinematics', 'I2S Audio', 'HRI Design', 'CAD / 3D Print']
  },
  {
    id: 'edu-nitr',
    period: 'Active',
    category: 'EDUCATION',
    title: 'Undergraduate Student — Mining Engineering',
    organization: 'National Institute of Technology, Rourkela (NIT Rourkela)',
    role: 'Second-Year Undergraduate',
    location: 'Rourkela, Odisha, India',
    summary:
      'Second-year undergraduate student pursuing Mining Engineering at NIT Rourkela, with strong independent technical interests in artificial intelligence, full-stack software engineering, and intelligent systems.',
    achievements: [
      'Active independent project engineering across machine learning, system architecture, and full-stack software development.',
      'Lead Systems Architect for SALVUS (Smart India Hackathon 2026), engineering emergency coordination platforms and 3-tier AI triage.',
      'Independent research and development across Project AETHON (radio astronomy anomaly detection), RouteMind (intelligent LLM router), and Project Zogan (wildlife CV).'
    ],
    skills: ['Python', 'FastAPI', 'React 19', 'PyTorch', 'Data Structures', 'Scientific Computing']
  }
];
