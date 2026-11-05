export interface ProjectMission {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  codename: string;
  role: string;
  category: 'FRONTEND' | 'AI / ML' | 'SYSTEMS' | 'CREATIVE';
  status: 'COMPLETED' | 'ACTIVE' | 'ARCHIVED';
  implementationStatus: 'VERIFIED IMPLEMENTED' | 'RESEARCH PROTOTYPE' | 'EXPERIMENTAL CONCEPT' | 'EARLY EXPERIMENT';
  difficulty: 'RANK S' | 'RANK A' | 'RANK B';
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  limitations: string[];
  techStack: string[];
  repoUrl: string;
  demoUrl?: string;
  screenshot?: string;
  targetArcana: string;
}

export const PROJECTS_DATA: ProjectMission[] = [
  // PROJECT 001: SALVUS
  {
    id: 'quest-01',
    code: 'M-001',
    title: 'SALVUS',
    subtitle: 'AI-Powered Disaster Intelligence & Emergency Rescue Coordination Platform',
    codename: 'CRISIS COORDINATION LIFECYCLE',
    role: 'Lead Systems Architect, Full-Stack & AI Integration Engineer',
    category: 'SYSTEMS',
    status: 'ACTIVE',
    implementationStatus: 'VERIFIED IMPLEMENTED',
    difficulty: 'RANK S',
    summary: 'A mission-critical disaster response platform connecting citizens in distress with emergency authorities through real-time geospatial telemetry, 3-tier AI triage, and deterministic resource allocation.',
    problem: 'During acute crises (flash floods, industrial collapses), response failures stem from fragmented signals across social media/calls, lack of verified GPS, unstructured threat priorities, and dispatcher cognitive overload during the golden 1–4 hours.',
    solution: 'Constructed an end-to-end async coordination architecture in FastAPI with SQLite WAL persistence, multi-room Socket.IO real-time channels, an automated 3-tier AI triage waterfall, and human-in-the-loop dispatch locks.',
    features: [
      'Citizen Safety Console with distress SOS beacon, landmark fallback, and 8-state emergency journey',
      'Automated PII sanitization and SHA-256 triage hash deduplication before model ingestion',
      '3-Tier AI Triage Waterfall (Gemini 2.5 → Groq Llama-3.3 → Deterministic Heuristics)',
      'Human Authority Verification Gate (AI never autonomously dispatches emergency units)',
      'Deterministic 6-Factor Fleet Allocation Engine (Scoring capability, proximity, workload, and severity up to 100)',
      'Tactical Geospatial Routing using OSRM with 15-point resilient fallback corridors and shelter capacity telemetry'
    ],
    limitations: [
      'Human-Authorized Dispatch: AI operates strictly as decision support; dispatch requires explicit human officer confirmation.',
      'Operational Scope: Engineered and validated in rigorous simulated test harnesses; not yet deployed as an official municipal emergency service.',
      'Geospatial Corridors: Route calculations depend on live OSRM nodes with local mathematical interpolation during network degradation.'
    ],
    techStack: ['React 19', 'FastAPI', 'Python', 'Tailwind CSS', 'SQLite WAL', 'Socket.IO', 'Leaflet', 'OSRM', 'Gemini API', 'Groq'],
    repoUrl: 'https://github.com/pritesh-4/SIH-2026---SALVUS',
    demoUrl: 'https://sih-2026-salvus.vercel.app/',
    targetArcana: 'JUDGEMENT'
  },

  // PROJECT 002: AETHON
  {
    id: 'quest-02',
    code: 'M-002',
    title: 'AETHON',
    subtitle: 'AI-Assisted Discovery of Anomalous Astronomical Radio Signatures',
    codename: 'SPECTROTEMPORAL ANOMALY DISCOVERY',
    role: 'Lead Systems Architect & Machine Learning Researcher',
    category: 'AI / ML',
    status: 'ACTIVE',
    implementationStatus: 'RESEARCH PROTOTYPE',
    difficulty: 'RANK S',
    summary: 'An independent scientific research prototype exploring how machine learning can surface uncatalogued radio-signal transients in astronomical telemetry through normality modeling and anomaly detection.',
    problem: 'Gigahertz-bandwidth radio receivers produce terabytes of data per second flooded with terrestrial RFI. Supervised deep learning fails in open discovery because unknown astrophysical transients have zero prior labeled training data.',
    solution: 'Designed an open-set discovery paradigm based on learning the baseline distribution of cosmic noise and instrument background to isolate outliers, paired with a high-precision scientific observatory web console.',
    features: [
      'Scientific Observatory Interface with real-time dynamic spectrograms and Doppler drift visualization',
      'Filterbank (.fil) and FITS intake interface with strict client-side Zod runtime schema validation',
      'Anomaly Scoring Matrix combining reconstruction deviation and latent manifold outlier metrics',
      'Deep Signal Dossier (/analysis/:signalId) with spectral cross-sections and exportable provenance',
      'Architectural blueprint for Polyphase Filterbank channelization and Taylor-tree Doppler drift coherence'
    ],
    limitations: [
      'Research Prototype: Operates as an exploratory scientific instrument; does not claim validated extraterrestrial discoveries.',
      'Architecture Boundaries: Frontend scientific dashboard, client telemetry, and Zod contracts are fully implemented; deep neural self-supervised inference components represent the target backend specification.',
      'Observational Telemetry: Tested using synthetic and public astronomical benchmark captures.'
    ],
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Motion', 'Zod', 'Python', 'Scikit-learn'],
    repoUrl: 'https://github.com/pritesh-4/Project_Aethon',
    demoUrl: 'https://aethon-eight-chi.vercel.app/',
    targetArcana: 'THE HIEROPHANT'
  },

  // PROJECT 003: ROUTEMIND
  {
    id: 'quest-03',
    code: 'M-003',
    title: 'ROUTEMIND',
    subtitle: 'Intelligent AI Model Routing Platform',
    codename: 'ADAPTIVE MODEL ORCHESTRATION',
    role: 'Creator & Full-Stack Engineer',
    category: 'SYSTEMS',
    status: 'ACTIVE',
    implementationStatus: 'VERIFIED IMPLEMENTED',
    difficulty: 'RANK A',
    summary: 'An intelligent AI routing platform that analyzes user intent and automatically dispatches queries to the most suitable model—balancing quality, speed, and cost with explainable routing metadata.',
    problem: 'Developers and users face decision fatigue manually switching between models (GPT-4o, Claude, Gemini) without transparent heuristics on cost, latency, or suitability for specific tasks.',
    solution: 'Engineered a multi-step routing pipeline with an extensible intent classifier, provider adapter pattern, SQLite conversation memory, and transparent real-time decision telemetry.',
    features: [
      'Rule-Based Intent Classification evaluating query nature (Coding, Research, Math, General)',
      'Adaptive Policies allowing user-selected optimization across Cost, Speed, Balanced, and Quality',
      'Explainable AI Decisions surfacing confidence scores, estimated tokens, latency, and reasoning',
      'Provider Adapter Pattern (BaseProvider ABC) supporting modular model integration',
      'Persistent SQLite & SQLAlchemy session memory with background long-term fact extraction',
      'Auto-resizing chat interface with drag-and-drop document and multi-format code attachments'
    ],
    limitations: [
      'Provider Availability: Live integrations verified for OpenAI and Google GenAI (Gemini); Anthropic Claude adapter is currently structured as an architectural placeholder (NotImplementedError).',
      'Routing Heuristic: Uses a deterministic regex-heuristic classifier rather than an opaque neural router to ensure transparent latency and zero routing cost.'
    ],
    techStack: ['React 19', 'FastAPI', 'Python', 'SQLite', 'SQLAlchemy 2.0', 'Tailwind CSS v4', 'Framer Motion', 'React Router v7'],
    repoUrl: 'https://github.com/pritesh-4/Project_RouteMind',
    demoUrl: 'https://routemind-ai-app.vercel.app/',
    targetArcana: 'THE MAGICIAN'
  },

  // PROJECT 004: PROJECT ZOGAN
  {
    id: 'quest-04',
    code: 'M-004',
    title: 'PROJECT ZOGAN',
    subtitle: 'AI-Assisted Elephant Detection & Wildlife Monitoring',
    codename: 'PERIMETER SPATIAL HEURISTIC',
    role: 'Computer Vision & ML Systems Developer',
    category: 'AI / ML',
    status: 'COMPLETED',
    implementationStatus: 'RESEARCH PROTOTYPE',
    difficulty: 'RANK A',
    summary: 'A computer vision and spatial risk research prototype designed to detect wild elephants, track herd movements, and evaluate simulated geofenced safety perimeters to mitigate human-wildlife conflict.',
    problem: 'Human-elephant conflict along forest-village fringes causes severe crop and property damage. Passive camera traps lack real-time utility, while single-frame detectors trigger false alarms from visual occlusion.',
    solution: 'Constructed an end-to-end Python pipeline combining a fine-tuned YOLO detector with a 5-frame persistence gate, ByteTrack multi-target tracking, Haversine geodesic distance evaluation, and Telegram alerts.',
    features: [
      'Fine-tuned single-class YOLO model (elephant_v1) trained on 456 images, achieving 88.2% mAP@50',
      'Temporal Persistence Gate requiring 5 consecutive positive frames before confirming an incident',
      'ByteTrack Multi-Object Tracking with LAP solver and rolling image-space velocity vectors',
      'Geofencing Engine evaluating Haversine geodesic distance to village settlements',
      'Multi-factor rule-based risk scoring (0–100) factoring distance, approach trend, and herd size',
      'Thread-safe atomic JSON Lines event logger (logs/alerts.jsonl) and asynchronous Telegram dispatch'
    ],
    limitations: [
      'Software-Only Prototype: Evaluated as a computer vision pipeline; not certified as an autonomous life-safety hardware system.',
      'Simulated Coordinates: Geodesic distances and GPS drift are simulated in software without physical animal GPS collars.',
      'Sensory Domain: Current custom model is trained and validated on daytime RGB imagery.'
    ],
    techStack: ['Python', 'PyTorch', 'Ultralytics YOLO', 'OpenCV', 'ByteTrack', 'LAP Solver', 'Pytest', 'Ruff'],
    repoUrl: 'https://github.com/pritesh-4/Project_Zogan',
    screenshot: '/assets/projects/zogan_hud.jpg',
    targetArcana: 'THE CHARIOT'
  },

  // PROJECT 005: F.R.I.D.A.Y.
  {
    id: 'quest-05',
    code: 'M-005',
    title: 'F.R.I.D.A.Y.',
    subtitle: 'Future Responsive Intelligent Digital Assistant for You',
    codename: 'COGNITIVE WORKFLOW ORCHESTRATOR',
    role: 'Creator & AI Systems Architect',
    category: 'SYSTEMS',
    status: 'ACTIVE',
    implementationStatus: 'VERIFIED IMPLEMENTED',
    difficulty: 'RANK A',
    summary: 'An experimental personal AI assistant and companion exploring voice-first interaction, contextual vector memory, and autonomous digital task orchestration inspired by sci-fi interfaces.',
    problem: 'Traditional productivity involves fractured multi-tab multitasking and manual window juggling. Conversational assistants often lack long-term memory, real-time voice interruptions, and visual presence.',
    solution: 'Built an integrated React 19 frontend featuring an animated 4-state reactive Orb and WebGL shader background, backed by a FastAPI core with ChromaDB semantic memory and WebSocket voice streaming.',
    features: [
      'Dynamic Reactive Core Orb (Orb.jsx) morphing across idle, listening, processing, and speaking states',
      'Cyberspace background rendered with custom WebGL fragment shaders on an HTML5 canvas',
      'Full-Duplex WebSocket voice streaming loop with speculative rolling speech-to-text (faster-whisper)',
      'Barge-in / interruption handling that immediately halts active synthesis upon user speech',
      'Cognitive Memory Engine with ChromaDB vector search and SQLite transactional persistence',
      'Executive Goal Decomposition DAG scheduler for multi-step task planning'
    ],
    limitations: [
      'Experimental Scope: Explores conversational and memory boundaries; does not claim artificial general intelligence (AGI) or consciousness.',
      'Voice Tooling: Advanced speech models (faster-whisper, kokoro-onnx) are configured as optional local modules requiring local GPU/CPU dependencies.'
    ],
    techStack: ['React 19', 'FastAPI', 'Python', 'ChromaDB', 'WebSockets', 'Tailwind CSS v4', 'Framer Motion', 'WebGL Shaders', 'Pydantic v2'],
    repoUrl: 'https://github.com/pritesh-4/Project-FRIDAY',
    demoUrl: 'https://friday-assistant-lake.vercel.app/',
    targetArcana: 'THE EMPEROR'
  },

  // PROJECT 006: THE LAST CHRONICLE
  {
    id: 'quest-06',
    code: 'M-006',
    title: 'THE LAST CHRONICLE',
    subtitle: 'Interactive Narrative Portfolio (Project Yumei)',
    codename: 'STAR STREAM ARCHIVE',
    role: 'Creator & Creative Frontend Architect',
    category: 'CREATIVE',
    status: 'COMPLETED',
    implementationStatus: 'VERIFIED IMPLEMENTED',
    difficulty: 'RANK S',
    summary: 'An immersive, narrative-driven developer portfolio inspired by Omniscient Reader\'s Viewpoint, transforming achievements into timelines, projects into scenarios, and skills into attributes.',
    problem: 'Standard developer portfolios often feel sterile and repetitive, failing to communicate a builder\'s creative vision, storytelling instincts, and passion for UI craft.',
    solution: 'Engineered an interactive narrative experience using React, Vite, Framer Motion spring physics, and bespoke CSS—inviting visitors to accept scenarios and explore hidden paths.',
    features: [
      'Scenario-based entry system with animated ORV system windows and atmospheric transitions',
      'Constellation-style milestone achievement timeline revealing developer progression on scroll',
      'Technical attributes matrix and dedicated project scenario records',
      'Unlockable secret route (Hidden Scenario) detailing future architectural ambitions',
      'Bespoke zero-dependency CSS engine delivering game-grade aesthetic fidelity'
    ],
    limitations: [
      'Creative Frontend Focus: Built specifically as a story-driven portfolio and creative interaction experiment.',
      'Active Canonical URL: Verified deployed and active at pritesh-jena-portfolio.vercel.app (superseding older chronicle-of-fate alias).'
    ],
    techStack: ['React', 'Vite', 'JavaScript', 'Vanilla CSS3', 'Framer Motion', 'Vercel Edge'],
    repoUrl: 'https://github.com/pritesh-4/Project_Yumei',
    demoUrl: 'https://pritesh-jena-portfolio.vercel.app/',
    screenshot: '/assets/projects/chronicle.png',
    targetArcana: 'THE STAR'
  },

  // PROJECT 007: DEVLORE
  {
    id: 'quest-07',
    code: 'M-007',
    title: 'DEVLORE',
    subtitle: 'Dynamic Quiz Platform & Knowledge Analytics Hub',
    codename: 'KNOWLEDGE COMPILATION PROTOCOL',
    role: 'Creator & Frontend Engineer',
    category: 'FRONTEND',
    status: 'COMPLETED',
    implementationStatus: 'VERIFIED IMPLEMENTED',
    difficulty: 'RANK B',
    summary: 'A dynamic, stateful quiz platform built with React, Vite, Axios, and Open Trivia DB API that enables users to test knowledge across categories, track performance, and review historical attempts.',
    problem: 'Many learning and quiz web applications suffer from hardcoded questions, lose state upon page refresh, and offer no historical progress tracking.',
    solution: 'Constructed a modular React application featuring dynamic REST API ingestion, custom hook state synchronization, randomized answer positions, and LocalStorage analytics.',
    features: [
      'Dynamic question generation across multiple categories and difficulty levels via Open Trivia DB API',
      'Real-time countdown timer with score multiplier calculation and instant feedback loops',
      'Accuracy percentage, completion time tracking, and detailed question-by-question review',
      'Persistent dashboard analytics tracking total quizzes, highest score, and average performance',
      'Robust LocalStorage persistence ensuring quiz state survives accidental browser reloads'
    ],
    limitations: [
      'API Dependency: Relies on external Open Trivia DB endpoints; graceful local fallback handles rate limits or offline conditions.',
      'Client-Side Persistence: Analytics currently stored in browser LocalStorage without cross-device cloud synchronization.'
    ],
    techStack: ['React', 'Vite', 'React Router DOM', 'Axios', 'Open Trivia DB API', 'LocalStorage', 'CSS3'],
    repoUrl: 'https://github.com/pritesh-4/Project_DevLore',
    demoUrl: 'https://devlore-ebon.vercel.app/',
    screenshot: '/assets/projects/devlore.png',
    targetArcana: 'THE WHEEL OF FORTUNE'
  },

  // PROJECT 008: HOLY TRIAL
  {
    id: 'quest-08',
    code: 'M-008',
    title: 'HOLY TRIAL',
    subtitle: 'The Obsidian Tribunal Investigative Judicial Workspace',
    codename: 'EPISTEMIC SCRUTINY ENGINE',
    role: 'Lead Frontend & Systems Architect',
    category: 'SYSTEMS',
    status: 'ACTIVE',
    implementationStatus: 'VERIFIED IMPLEMENTED',
    difficulty: 'RANK A',
    summary: 'An institutional investigative workspace connecting proposition formulation, empirical evidence ingestion, adversarial cross-examination, and structured judicial adjudication.',
    problem: 'Evaluating controversial or complex technical claims is typically fragmented across unstructured notes without cryptographic integrity checks, adversarial counter-evidence, or clear confidence bounds.',
    solution: 'Designed a multi-stage investigative dossier workflow combining React 19 and FastAPI with SHA-256 evidence hashing, grounded thesis/antithesis cross-examination, and persistent case registries.',
    features: [
      'Multi-stage judicial workflow: Threshold Prologue, Claim Docket, Chamber of Evidence, Adversarial Scrutiny, Adjudication Verdict',
      'Triple-vector evidence ingestion: verbatim text excerpts, SSRF-protected URLs, and document uploads',
      'Cryptographic SHA-256 evidence integrity fingerprints and auditable evidence ledger',
      'Grounded adversarial analysis citing exact exhibits with contradiction mapping and confidence gauges',
      'Persistent Case Switcher drawer to formulate, review, and switch between active case dockets'
    ],
    limitations: [
      'Investigative Framework: Built as a structured epistemological and judicial decision-support tool; verdicts reflect ingested evidence and model calibration.',
      'Backend Coupling: Connects to local/hosted FastAPI analysis services with local storage preservation.'
    ],
    techStack: ['React 19', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'Tailwind CSS', 'Web Audio API'],
    repoUrl: 'https://github.com/pritesh-4/Project_HolyTrial',
    targetArcana: 'JUSTICE'
  },

  // PROJECT 009: PROJECT ORBIT
  {
    id: 'quest-09',
    code: 'M-009',
    title: 'PROJECT ORBIT',
    subtitle: 'Personality-Driven AI Desk Companion Robot',
    codename: 'DESKTOP KINEMATIC COMPANION',
    role: 'Robotics & Embedded Systems Designer',
    category: 'SYSTEMS',
    status: 'ACTIVE',
    implementationStatus: 'EXPERIMENTAL CONCEPT',
    difficulty: 'RANK S',
    summary: 'An independent robotics and embedded systems project exploring multimodal human-robot interaction through a small, expressive desk companion built from the ground up on ESP32-S3.',
    problem: 'Most desktop smart devices sit completely inert until triggered by wake words, lacking spatial presence, expressive physical body language, and organic life-like responsiveness.',
    solution: 'Architected a bottom-up hardware and software blueprint decoupling real-time embedded motor control and circular display micro-expressions from high-level conversational intelligence.',
    features: [
      'Articulated 2-axis (pan/tilt) servo-driven neck mechanism for expressive tracking and head-tilts',
      'Circular visual display architecture rendering animated eye micro-expressions and gaze cues',
      'Dual-bus power isolation separating inductive servo noise from sensitive ESP32-S3 logic',
      'Multimodal sensory roadmap: Time-of-flight presence rangefinding, capacitive touch shell, and I2S digital audio',
      'Behavioral state machine balancing curiosity, attention, expressiveness, and sleep cycles'
    ],
    limitations: [
      'Experimental Hardware Concept: Core mechanics, power isolation, and kinematics are actively designed in architecture specifications and firmware prototyping.',
      'Status Transparency: Not a mass-produced commercial consumer device; documented strictly as an ongoing open-ended robotics engineering exploration.'
    ],
    techStack: ['ESP32-S3', 'C/C++', 'Robotics Kinematics', 'I2S Audio', 'HRI Design', 'CAD / 3D Print'],
    repoUrl: 'https://github.com/pritesh-4/Project_ORBIT',
    targetArcana: 'THE SUN'
  },

  // PROJECT 010: CODE GEASS FAN PAGE
  {
    id: 'quest-10',
    code: 'M-010',
    title: 'CODE GEASS FAN PAGE',
    subtitle: 'Early Visual & Interactive CSS Fan Experience',
    codename: 'FOUNDATIONAL DESIGN ARTIFACT',
    role: 'Creator & Early Frontend Designer',
    category: 'CREATIVE',
    status: 'COMPLETED',
    implementationStatus: 'EARLY EXPERIMENT',
    difficulty: 'RANK B',
    summary: 'An early HTML/CSS fan-page created as a college club induction exercise to explore visual design hierarchy, hover micro-interactions, anime typography, and keyframe animations.',
    problem: 'Learning modern web development requires building foundational muscle memory in semantic HTML structure, responsive box models, and raw CSS animations before adopting frameworks.',
    solution: 'Designed a multi-page thematic fan site centered on the anime series Code Geass, exploring high-contrast color schemes, hover states, and atmospheric styling.',
    features: [
      'Multi-page thematic navigation including Truth, Join, and Character spotlight views',
      'Zero-framework implementation using raw semantic HTML5 and vanilla CSS3',
      'Exploration of anime aesthetic palettes, diagonal visual tension, and button transitions',
      'Historical milestone representing initial steps into deliberate user interface design'
    ],
    limitations: [
      'Early Learning Exercise: Preserved as a historical baseline demonstrating the progression from early static styling to complex modern reactive applications.',
      'Static Scope: Purely visual and informational without dynamic client-side state or backend services.'
    ],
    techStack: ['HTML5', 'CSS3', 'Keyframe Animations', 'Vanilla Web'],
    repoUrl: 'https://github.com/pritesh-4/code-Geass-fan-page-',
    targetArcana: 'THE FOOL'
  }
];
