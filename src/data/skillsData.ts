export interface SkillItem {
  id: string;
  name: string;
  category: 'programming' | 'development' | 'aiml' | 'engineering' | 'tools';
  categoryLabel: string;
  tier: string;
  element: 'SLASH' | 'STRIKE' | 'PIERCE' | 'FIRE' | 'ICE' | 'ELEC' | 'WIND' | 'ALMIGHTY';
  spCost: number;
  proficiency: 'CORE IMPLEMENTATION' | 'RESEARCH PROTOTYPE' | 'USED IN IMPLEMENTATION' | 'EXPERIMENTED WITH' | 'CORE ACADEMIC & DSA';
  description: string;
  usageContext: string;
}

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'ALL ABILITIES' },
  { id: 'programming', label: 'PROGRAMMING' },
  { id: 'development', label: 'DEVELOPMENT' },
  { id: 'aiml', label: 'AI / MACHINE LEARNING' },
  { id: 'engineering', label: 'ENGINEERING' },
  { id: 'tools', label: 'TOOLS & ENV' }
] as const;

export const SKILLS_DATA: SkillItem[] = [
  // Programming Languages
  {
    id: 'py',
    name: 'Python',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER IV',
    element: 'FIRE',
    spCost: 32,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Object-oriented programming, asynchronous concurrency, data pipelines, computer vision orchestration, and backend microservice APIs.',
    usageContext: 'Primary language across SALVUS, Project AETHON, Project Zogan, and F.R.I.D.A.Y.'
  },
  {
    id: 'js',
    name: 'JavaScript (ES6+)',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER IV',
    element: 'ELEC',
    spCost: 28,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Event loop mechanics, asynchronous closures, dynamic client rendering, modular package architecture, and DOM synthesis.',
    usageContext: 'Foundation for RouteMind, The Last Chronicle, DevLore, and modern reactive client interfaces.'
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER III',
    element: 'ELEC',
    spCost: 26,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Strict type contracts, generic architectures, discriminated unions, runtime Zod validation, and scalable state isolation.',
    usageContext: 'Applied in Project AETHON for observational telemetry schemas and in Holy Trial judicial workflows.'
  },
  {
    id: 'cpp',
    name: 'C / C++',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER II',
    element: 'SLASH',
    spCost: 22,
    proficiency: 'CORE ACADEMIC & DSA',
    description: 'Pointers, memory management, algorithmic complexity, data structures, and computational problem solving.',
    usageContext: 'Undergraduate computing foundations and competitive algorithmic problem solving at NIT Rourkela.'
  },
  {
    id: 'html-css',
    name: 'CSS3 & Modern HTML5',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER IV',
    element: 'ALMIGHTY',
    spCost: 34,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Bespoke CSS variables, GPU transform math, keyframe animations, responsive viewports, and narrative game styling.',
    usageContext: 'Architect of zero-dependency narrative engines in The Last Chronicle and Persona 3 aesthetic portfolio.'
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER I',
    element: 'STRIKE',
    spCost: 16,
    proficiency: 'EXPERIMENTED WITH',
    description: 'Server-side request handling, session state management, and traditional backend rendering paradigms.',
    usageContext: 'Explored during foundational backend web development and database scripting exercises.'
  },

  // Frontend & Backend Development
  {
    id: 'react',
    name: 'React 19',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER IV',
    element: 'ICE',
    spCost: 38,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Component lifecycles, custom reactive hooks, memoization pipelines, concurrent rendering, and single-page routing.',
    usageContext: 'Core framework powering SALVUS, RouteMind, F.R.I.D.A.Y., Project AETHON, and The Last Chronicle.'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER IV',
    element: 'FIRE',
    spCost: 36,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'High-performance async Python backend framework with automatic OpenAPI docs, Pydantic v2 validation, and dependency injection.',
    usageContext: 'Engineered backend cores for SALVUS emergency coordination, RouteMind model router, and F.R.I.D.A.Y.'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS (v4)',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER IV',
    element: 'WIND',
    spCost: 26,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Utility-first modern styling, responsive grid choreography, dark mode management, and streamlined compilation.',
    usageContext: 'Primary layout and styling framework across SALVUS, RouteMind, Project AETHON, and F.R.I.D.A.Y.'
  },
  {
    id: 'vite',
    name: 'Vite 8 Bundler',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER IV',
    element: 'WIND',
    spCost: 24,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Sub-second ES module hot reload, production Rollup chunking, manual asset optimization, and SPA deployment.',
    usageContext: 'Standard development environment and build toolchain across all modern client applications.'
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER IV',
    element: 'WIND',
    spCost: 32,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Physics-based spring dynamics, gesture recognition, presence orchestration, and complex layout morphing.',
    usageContext: 'Applied for storytelling transitions in The Last Chronicle, RouteMind, and the F.R.I.D.A.Y. reactive Orb.'
  },
  {
    id: 'django-flask',
    name: 'Django & Flask',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER III',
    element: 'STRIKE',
    spCost: 28,
    proficiency: 'USED IN IMPLEMENTATION',
    description: 'WSGI microservices, ORM abstractions, middleware pipelines, and RESTful service compilation.',
    usageContext: 'Utilized for lightweight Python REST APIs, machine learning model serving, and full-stack prototypes.'
  },
  {
    id: 'websockets',
    name: 'WebSockets & Socket.IO',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER III',
    element: 'ELEC',
    spCost: 30,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Full-duplex real-time communication channels, room-scoped event multiplexing, and reconnection reconciliation.',
    usageContext: 'Powers real-time authority/citizen distress streams in SALVUS and streaming voice in F.R.I.D.A.Y.'
  },

  // AI & Machine Learning
  {
    id: 'llm-routing',
    name: 'LLM Integration & Routing',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER IV',
    element: 'ALMIGHTY',
    spCost: 40,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Intent classification heuristics, multi-provider adapter architectures (OpenAI, Gemini), and explainable latency/cost trade-offs.',
    usageContext: 'Architected RouteMind model routing platform and SALVUS 3-tier emergency triage waterfalls.'
  },
  {
    id: 'yolo',
    name: 'Ultralytics YOLO (Object Detection)',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER IV',
    element: 'STRIKE',
    spCost: 36,
    proficiency: 'RESEARCH PROTOTYPE',
    description: 'Single-stage deep neural object detection, custom transfer learning, hyperparameter tuning, and real-time bounding box inference.',
    usageContext: 'Trained custom elephant_v1 model on 456 images, achieving 88.2% mAP@50 in Project Zogan.'
  },
  {
    id: 'cv-tracking',
    name: 'Computer Vision & ByteTrack',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER III',
    element: 'PIERCE',
    spCost: 32,
    proficiency: 'RESEARCH PROTOTYPE',
    description: 'Frame preprocessing with OpenCV, bipartite linear assignment matching (LAP solver), and anti-jitter trajectory deadbands.',
    usageContext: 'Multi-object motion tracking and velocity estimation in Project Zogan wildlife monitoring.'
  },
  {
    id: 'anomaly-ml',
    name: 'Anomaly Detection Concepts',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER III',
    element: 'ALMIGHTY',
    spCost: 34,
    proficiency: 'RESEARCH PROTOTYPE',
    description: 'Unsupervised normality modeling, spectrotemporal dynamic spectra compression, and reconstruction deviation metrics.',
    usageContext: 'Explored in Project AETHON to identify uncatalogued radio anomalies without prior labeled training examples.'
  },
  {
    id: 'speech-audio',
    name: 'Speech Processing & Voice Audio',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER III',
    element: 'WIND',
    spCost: 28,
    proficiency: 'RESEARCH PROTOTYPE',
    description: 'Streaming raw PCM float32 audio over WebSockets, speculative rolling speech-to-text, and local TTS synthesis.',
    usageContext: 'Engineered conversational speech loop in F.R.I.D.A.Y. with barge-in interruption handling.'
  },
  {
    id: 'vector-memory',
    name: 'Vector Embeddings & Semantic Memory',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER III',
    element: 'ICE',
    spCost: 30,
    proficiency: 'USED IN IMPLEMENTATION',
    description: 'ChromaDB vector collection queries, semantic cosine similarity matching, and conversation summary extraction.',
    usageContext: 'Long-term context retention and memory recall in F.R.I.D.A.Y. and RouteMind session persistence.'
  },

  // Systems Engineering
  {
    id: 'geospatial-math',
    name: 'Geospatial & Geofencing Math',
    category: 'engineering',
    categoryLabel: 'ENGINEERING',
    tier: 'TIER IV',
    element: 'ALMIGHTY',
    spCost: 35,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Great-circle Haversine geodesic calculations, concentric safety zone evaluation, Leaflet GIS mapping, and OSRM routing.',
    usageContext: 'Applied for spatial risk calculation in Project Zogan and tactical routing corridors in SALVUS.'
  },
  {
    id: 'deterministic-scoring',
    name: 'Deterministic Resource Allocation',
    category: 'engineering',
    categoryLabel: 'ENGINEERING',
    tier: 'TIER IV',
    element: 'ALMIGHTY',
    spCost: 36,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Mathematically explainable multi-factor scoring algorithms factoring proximity, capability, workload, and threat severity.',
    usageContext: 'Constructed the 6-factor emergency responder match engine (scored up to 100) in SALVUS.'
  },
  {
    id: 'api-architecture',
    name: 'RESTful API & Contract Architecture',
    category: 'engineering',
    categoryLabel: 'ENGINEERING',
    tier: 'TIER IV',
    element: 'ELEC',
    spCost: 32,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Strict schema contracts, error isolation, PII sanitization, HTTP status modeling, and cryptographic integrity.',
    usageContext: 'Standardized across SALVUS, RouteMind, and Holy Trial backend services.'
  },

  // Tools & Environment
  {
    id: 'git-github',
    name: 'Git & GitHub Workflows',
    category: 'tools',
    categoryLabel: 'TOOLS & ENV',
    tier: 'TIER IV',
    element: 'ALMIGHTY',
    spCost: 30,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Branch management, pull request reviews, automated GitHub Actions CI/CD workflows, and semantic release tagging.',
    usageContext: 'Daily engineering across 19 public repositories and collaborative hackathon teams.'
  },
  {
    id: 'sqlite-sql',
    name: 'SQLite & SQLAlchemy 2.0',
    category: 'tools',
    categoryLabel: 'TOOLS & ENV',
    tier: 'TIER IV',
    element: 'STRIKE',
    spCost: 28,
    proficiency: 'CORE IMPLEMENTATION',
    description: 'Write-Ahead Logging (WAL) concurrency, declarative ORM models, relational foreign keys, and atomic transactions.',
    usageContext: 'High-speed embedded persistence for SALVUS emergency registries and RouteMind session memories.'
  },
  {
    id: 'databases-relational',
    name: 'MySQL, PostgreSQL & MongoDB',
    category: 'tools',
    categoryLabel: 'TOOLS & ENV',
    tier: 'TIER III',
    element: 'STRIKE',
    spCost: 26,
    proficiency: 'USED IN IMPLEMENTATION',
    description: 'Relational table design, indexing, foreign key constraints, document storage, and schema migrations.',
    usageContext: 'Undergraduate database engineering coursework at NIT Rourkela and full-stack application data layers.'
  },
  {
    id: 'docker',
    name: 'Docker Containerization',
    category: 'tools',
    categoryLabel: 'TOOLS & ENV',
    tier: 'TIER III',
    element: 'ICE',
    spCost: 28,
    proficiency: 'USED IN IMPLEMENTATION',
    description: 'Multi-stage Dockerfiles, docker-compose multi-container orchestration, and reproducible Linux deployment environments.',
    usageContext: 'Packaging backend microservices and database engines in SALVUS and F.R.I.D.A.Y.'
  },
  {
    id: 'figma',
    name: 'Figma UI Prototyping',
    category: 'tools',
    categoryLabel: 'TOOLS & ENV',
    tier: 'TIER III',
    element: 'WIND',
    spCost: 22,
    proficiency: 'USED IN IMPLEMENTATION',
    description: 'User experience wireframing, component design systems, typography hierarchy, and creative aesthetic experimentation.',
    usageContext: 'Interface ideation for SALVUS, The Last Chronicle, and creative frontend concepts.'
  }
];
