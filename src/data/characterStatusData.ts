export interface CharacterAttribute {
  id: string;
  name: string;
  category: 'ENGINEERING' | 'PROBLEM_SOLVING' | 'DEVELOPMENT' | 'AI_ML' | 'DESIGN';
  rankGrade: 'RANK S' | 'RANK A+' | 'RANK A';
  rankScore: number; // 1 to 5 stars or numerical weight
  experienceLabel: string;
  evidenceSummary: string;
  supportingSkills: string[];
  relevantProjects: Array<{
    name: string;
    role: string;
    evidence: string;
  }>;
}

export interface CharacterProfileData {
  name: string;
  codename: string;
  level: number;
  personaArcana: string;
  role: string;
  affiliation: string;
  location: string;
  introduction: string;
  currentInterests: string[];
  achievements: Array<{
    title: string;
    context: string;
    tag: string;
  }>;
  links: {
    github: string;
    linkedin: string;
    email: string;
    portfolio: string;
  };
  portraitThumb: string;
  characterStageArt: string;
}

export const CHARACTER_PROFILE: CharacterProfileData = {
  name: 'PRITESH KUMAR JENA',
  codename: 'S.E.E.S. ARCHITECT',
  level: 99,
  personaArcana: 'FOOL / DEATH (ORPHEUS)',
  role: 'Mining Engineering Undergraduate & Full-Stack Developer',
  affiliation: 'National Institute of Technology, Rourkela',
  location: 'Rourkela, Odisha, India',
  introduction:
    'Second-year Mining Engineering undergraduate student at NIT Rourkela with a strong technical passion for AI systems, intelligent model routing, and production-grade full-stack architectures.',
  currentInterests: [
    'Edge Computer Vision & Multi-Object Tracking',
    'Multimodal LLM Dynamic Intent Routing',
    'High-Concurrency React 19 & Async Python',
    'Audio-Visual Web Shaders & Game UI Systems'
  ],
  achievements: [
    {
      title: 'Lead Systems Architect — SALVUS (SIH 2026)',
      context: 'Engineered disaster triage and multi-agency responder dispatch platform.',
      tag: 'LEADERSHIP'
    },
    {
      title: 'Wildlife Computer Vision Model — Project Zogan',
      context: 'Trained custom YOLOv8 model reaching 88.2% mAP@50 with ByteTrack tracking.',
      tag: 'MACHINE LEARNING'
    },
    {
      title: 'Dynamic Intent Router — RouteMind AI',
      context: 'Deployed real-time query analyzer routing prompts across OpenAI and Gemini.',
      tag: 'FULL-STACK AI'
    },
    {
      title: 'Interactive Narrative Experience — The Last Chronicle',
      context: 'Crafted story-driven portfolio inspired by Omniscient Reader\'s Viewpoint.',
      tag: 'CREATIVE DEV'
    }
  ],
  links: {
    github: 'https://github.com/pritesh-4',
    linkedin: 'https://www.linkedin.com/in/pritesh-jena-8980a6373',
    email: 'mailto:priteshjena16@gmail.com',
    portfolio: 'https://pritesh-jena-portfolio.vercel.app/'
  },
  portraitThumb: '/assets/persona3/characters/thumbnails/makoto-yuki-thumb.webp',
  characterStageArt: '/assets/persona3/characters/makoto-yuki.webp'
};

export const CHARACTER_ATTRIBUTES: CharacterAttribute[] = [
  {
    id: 'engineering',
    name: 'SYSTEMS ENGINEERING',
    category: 'ENGINEERING',
    rankGrade: 'RANK S',
    rankScore: 5,
    experienceLabel: 'Production Systems Architect & Dispatch Engine Lead',
    evidenceSummary:
      'Proven capacity to architect decoupled full-stack systems with real-time state synchronization, fault tolerance, and deterministic telemetry.',
    supportingSkills: [
      'System Architecture Blueprints',
      'High-Concurrency REST & WebSocket APIs',
      'Docker Containerization & Virtualization',
      'Client-Side State Singletons & Telemetry'
    ],
    relevantProjects: [
      {
        name: 'SALVUS (SIH 2026)',
        role: 'Lead Systems Architect',
        evidence: 'Architected SOS telemetry pipelines, priority triage queues, and responder dispatch matrices.'
      },
      {
        name: 'RouteMind AI',
        role: 'Creator & Engineer',
        evidence: 'Built latency-aware model dispatch and query intent classifier.'
      }
    ]
  },
  {
    id: 'ai-ml',
    name: 'AI & MACHINE LEARNING',
    category: 'AI_ML',
    rankGrade: 'RANK S',
    rankScore: 5,
    experienceLabel: 'Edge Computer Vision & Multimodal Agent Integration',
    evidenceSummary:
      'Practical expertise in dataset curation, object detection model training (YOLOv8), multi-object tracking, and multi-model LLM API orchestration.',
    supportingSkills: [
      'Ultralytics YOLOv8 & PyTorch Pipelines',
      'ByteTrack Multi-Object Tracking & Kalman Association',
      'OpenAI & Gemini API Prompt Engineering',
      'ChromaDB Vector Embeddings & Agent Memory'
    ],
    relevantProjects: [
      {
        name: 'Project Zogan',
        role: 'Computer Vision Engineer',
        evidence: 'Curated 456 annotated training images; trained YOLOv8 achieving 88.2% mAP@50.'
      },
      {
        name: 'F.R.I.D.A.Y.',
        role: 'AI Systems Engineer',
        evidence: 'Implemented conversational assistant with persistent cognitive context and WebGL visual orb.'
      },
      {
        name: 'Project AETHON',
        role: 'ML Researcher',
        evidence: 'Formulated multimodal sensor anomaly pipeline specifications.'
      }
    ]
  },
  {
    id: 'development',
    name: 'FULL-STACK DEVELOPMENT',
    category: 'DEVELOPMENT',
    rankGrade: 'RANK S',
    rankScore: 5,
    experienceLabel: 'Modern React 19, TypeScript & Async Python',
    evidenceSummary:
      'Deep fluency with modern component architecture, type safety, sub-second Vite bundling, and high-performance asynchronous backends.',
    supportingSkills: [
      'React 19 & Concurrent Mode',
      'TypeScript 6 Strict Typing',
      'FastAPI & Python 3.11+ Backends',
      'Vite 8 & ESM Code Splitting'
    ],
    relevantProjects: [
      {
        name: 'Persona 3 Reload Portfolio',
        role: 'Lead Developer',
        evidence: 'Implemented SVG quadratic Bézier curved arc menus, singleton audio pool, and responsive game HUD.'
      },
      {
        name: 'DevLore',
        role: 'Full-Stack Developer',
        evidence: 'Engineered dynamic quiz engine consuming Open Trivia DB with client analytics.'
      }
    ]
  },
  {
    id: 'problem-solving',
    name: 'PROBLEM SOLVING & LOGIC',
    category: 'PROBLEM_SOLVING',
    rankGrade: 'RANK A+',
    rankScore: 4,
    experienceLabel: 'Algorithmic Optimization & Real-Time Triage',
    evidenceSummary:
      'Rigorous grounding in data structures, mathematical modeling, graph traversal, and resource allocation logic honed at NIT Rourkela.',
    supportingSkills: [
      'Algorithms & Data Structures in C++ / Python',
      'Dynamic Route Calculation & Optimization',
      'Threshold-Based Triage Matrix Modeling',
      'Edge Geofencing & Proximity Calculations'
    ],
    relevantProjects: [
      {
        name: 'SALVUS Responder Routing',
        role: 'Systems Engineer',
        evidence: 'Devised real-time distance and severity weighting algorithm for emergency vehicle dispatch.'
      },
      {
        name: 'NIT Rourkela Coursework',
        role: 'Undergraduate Engineer',
        evidence: 'Continuous coursework solving computational logic and systems problems.'
      }
    ]
  },
  {
    id: 'design-creativity',
    name: 'DESIGN & CREATIVITY',
    category: 'DESIGN',
    rankGrade: 'RANK A+',
    rankScore: 4,
    experienceLabel: 'Game UI Aesthetic & Narrative Web Craft',
    evidenceSummary:
      'Demonstrated talent for recreating high-fidelity game interfaces (Persona 3 Reload) and cinematic web storytelling without vector shortcuts.',
    supportingSkills: [
      'Persona 3 Reload UI Layouts & Palettes',
      'Framer Motion Kinetic Physics & Skew Plates',
      'Interactive Canvas & Audio Web Visualizers',
      'Responsive Cross-Device Typography Design'
    ],
    relevantProjects: [
      {
        name: 'Persona 3 Portfolio',
        role: 'Creative Frontend Engineer',
        evidence: 'Accurately captured ATLUS visual identity: moonlit vignettes, slanted plates, and CD player.'
      },
      {
        name: 'The Last Chronicle',
        role: 'Frontend Creative Dev',
        evidence: 'Created immersive Korean web-novel inspired interactive scenario interface.'
      }
    ]
  }
];
