export type ProjectCategory = 'AI / ML' | 'SYSTEMS';

/** One inspectable component in a QUEST architecture diagram. Coordinates are
 *  diagram-space pixels on a 1000 x 520 canvas. `status` distinguishes
 *  implemented components from planned/target-spec components. */
export interface ArchitectureNode {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'IMPLEMENTED' | 'PLANNED';
  purpose: string;
  inputs: string[];
  outputs: string[];
  tech: string[];
  flow: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  /** Dashed = planned/proposed data path. */
  dashed?: boolean;
}

export interface ArchitectureDiagram {
  title: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ProjectMission {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  codename: string;
  role: string;
  category: ProjectCategory;
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
  /** Primary still shown by EQUIP's loadout view. */
  screenshot?: string;
  /** Optional ordered capture gallery rendered by the QUEST dossier (QUEST only). */
  screenshots?: Array<{ src: string; alt: string }>;
  /** Interactive system diagram rendered by the QUEST dossier (QUEST only). */
  architecture?: ArchitectureDiagram;
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
    architecture: {
      title: 'SALVUS EMERGENCY COORDINATION PIPELINE',
      nodes: [
        {
          id: 'salvus-console', label: 'CITIZEN CONSOLE', x: 140, y: 110, status: 'IMPLEMENTED',
          purpose: 'Citizen-facing safety console for raising a distress SOS and following the 8-state emergency journey.',
          inputs: ['Citizen distress report', 'GPS coordinates or landmark fallback'],
          outputs: ['Raw SOS signal into the ingestion pipeline'],
          tech: ['React 19', 'Leaflet', 'Socket.IO'],
          flow: 'Publishes the SOS over multi-room Socket.IO channels, then tracks the emergency journey state through to resolution.'
        },
        {
          id: 'salvus-ingestion', label: 'PII SANITIZE + DEDUP', x: 400, y: 110, status: 'IMPLEMENTED',
          purpose: 'Automated PII sanitization and SHA-256 triage hash deduplication before any model sees citizen data.',
          inputs: ['Raw SOS signal (Socket.IO)'],
          outputs: ['Sanitized incident record', 'SHA-256 triage hash for dedup'],
          tech: ['Python', 'FastAPI'],
          flow: 'First processing stage — only sanitized, deduplicated records are allowed to proceed to AI triage.'
        },
        {
          id: 'salvus-triage', label: '3-TIER AI TRIAGE', x: 660, y: 110, status: 'IMPLEMENTED',
          purpose: 'Automated 3-tier triage waterfall classifying incident severity: Gemini 2.5 → Groq Llama-3.3 → deterministic heuristics.',
          inputs: ['Sanitized incident record'],
          outputs: ['Severity + priority classification'],
          tech: ['Gemini API', 'Groq (Llama-3.3)', 'Deterministic heuristics'],
          flow: 'Escalates down the tiers when a provider fails or confidence drops; the deterministic tier is the always-available floor.'
        },
        {
          id: 'salvus-gate', label: 'AUTHORITY GATE', x: 880, y: 110, status: 'IMPLEMENTED',
          purpose: 'Human authority verification lock — AI never autonomously dispatches emergency units.',
          inputs: ['AI triage classification'],
          outputs: ['Officer-verified dispatch authorization'],
          tech: ['FastAPI', 'Socket.IO dispatch locks'],
          flow: 'Every dispatch decision requires explicit human officer confirmation before allocation begins.'
        },
        {
          id: 'salvus-allocator', label: 'FLEET ALLOCATION', x: 660, y: 320, status: 'IMPLEMENTED',
          purpose: 'Deterministic 6-factor engine scoring capability, proximity, workload, and severity up to 100.',
          inputs: ['Verified incident priority', 'Unit registry status'],
          outputs: ['Ranked unit assignment plan'],
          tech: ['Python (deterministic scoring)'],
          flow: 'Consumes verified priority and computes the assignment plan with zero model inference.'
        },
        {
          id: 'salvus-router', label: 'OSRM GEO ROUTING', x: 400, y: 320, status: 'IMPLEMENTED',
          purpose: 'Tactical geospatial routing with 15-point resilient fallback corridors and shelter capacity telemetry.',
          inputs: ['Unit assignment plan', 'Incident coordinates'],
          outputs: ['Routing corridors + shelter telemetry'],
          tech: ['OSRM', 'Leaflet'],
          flow: 'Terminal stage: converts the plan into actionable routes; local mathematical interpolation covers OSRM network degradation.'
        },
        {
          id: 'salvus-realtime', label: 'REALTIME + WAL STORE', x: 140, y: 320, status: 'IMPLEMENTED',
          purpose: 'Async persistence and real-time message spine for the whole coordination lifecycle.',
          inputs: ['Console events', 'Dispatch updates'],
          outputs: ['Durable incident state', 'Live channel updates'],
          tech: ['FastAPI', 'SQLite WAL', 'Socket.IO'],
          flow: 'Connects console, gate, and allocator through multi-room channels with write-ahead-logged persistence.'
        }
      ],
      edges: [
        { from: 'salvus-console', to: 'salvus-ingestion' },
        { from: 'salvus-ingestion', to: 'salvus-triage' },
        { from: 'salvus-triage', to: 'salvus-gate' },
        { from: 'salvus-gate', to: 'salvus-allocator' },
        { from: 'salvus-allocator', to: 'salvus-router' },
        { from: 'salvus-realtime', to: 'salvus-console' },
        { from: 'salvus-realtime', to: 'salvus-allocator' }
      ]
    },
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
    architecture: {
      title: 'AETHON SIGNAL DISCOVERY INSTRUMENT',
      nodes: [
        {
          id: 'aethon-intake', label: 'FILTERBANK INTAKE', x: 150, y: 110, status: 'IMPLEMENTED',
          purpose: 'Filterbank (.fil) and FITS intake interface with strict client-side runtime schema validation.',
          inputs: ['Filterbank (.fil) capture file', 'FITS capture file'],
          outputs: ['Validated observation dataset'],
          tech: ['React 19', 'TypeScript', 'Zod'],
          flow: 'Every capture is validated against Zod runtime schemas client-side before it can enter the analysis instrument.'
        },
        {
          id: 'aethon-spectrogram', label: 'DYNAMIC SPECTROGRAM', x: 400, y: 110, status: 'IMPLEMENTED',
          purpose: 'Scientific observatory interface rendering real-time dynamic spectrograms and Doppler drift visualization.',
          inputs: ['Validated observation dataset'],
          outputs: ['Rendered spectrogram + drift view'],
          tech: ['React 19', 'Recharts', 'Motion'],
          flow: 'Transforms validated telemetry into the spectrotemporal views analysts inspect for candidate transients.'
        },
        {
          id: 'aethon-anomaly', label: 'ANOMALY SCORING', x: 660, y: 110, status: 'PLANNED',
          purpose: 'Anomaly Scoring Matrix combining reconstruction deviation and latent manifold outlier metrics to isolate uncatalogued transients.',
          inputs: ['Spectrotemporal features'],
          outputs: ['Ranked anomaly candidates'],
          tech: ['Python', 'Scikit-learn'],
          flow: 'Open-set discovery paradigm: the frontend scoring matrix view is implemented, while the deep self-supervised inference components that compute reconstruction deviation and latent-manifold metrics represent the target backend specification.'
        },
        {
          id: 'aethon-dossier', label: 'SIGNAL DOSSIER', x: 880, y: 110, status: 'IMPLEMENTED',
          purpose: 'Deep Signal Dossier (/analysis/:signalId) with spectral cross-sections and exportable provenance.',
          inputs: ['Analyzed signal id', 'Spectral cross-sections'],
          outputs: ['Exportable signal provenance report'],
          tech: ['React 19', 'React Router v7'],
          flow: 'Terminal view: each candidate signal gets a permanent dossier route with exportable provenance for scientific review.'
        },
        {
          id: 'aethon-pfb', label: 'POLYPHASE FILTERBANK', x: 400, y: 330, status: 'PLANNED',
          purpose: 'Architectural blueprint for Polyphase Filterbank channelization and Taylor-tree Doppler drift coherence.',
          inputs: ['Raw wideband receiver data'],
          outputs: ['Channelized frequency bins', 'Drift-coherent candidates'],
          tech: ['Python DSP (target spec)'],
          flow: 'Documented as an architectural blueprint rather than running code: channelization and Taylor-tree drift coherence would feed stronger features into anomaly scoring.'
        }
      ],
      edges: [
        { from: 'aethon-intake', to: 'aethon-spectrogram' },
        { from: 'aethon-spectrogram', to: 'aethon-anomaly' },
        { from: 'aethon-anomaly', to: 'aethon-dossier' },
        { from: 'aethon-pfb', to: 'aethon-anomaly', dashed: true }
      ]
    },
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
    architecture: {
      title: 'ROUTEMIND MODEL ORCHESTRATION PIPELINE',
      nodes: [
        {
          id: 'routemind-ui', label: 'CHAT INTERFACE', x: 140, y: 110, status: 'IMPLEMENTED',
          purpose: 'Auto-resizing chat interface with drag-and-drop document and multi-format code attachments.',
          inputs: ['User query', 'Attached documents / code files'],
          outputs: ['Routed query payload'],
          tech: ['React 19', 'Tailwind CSS v4', 'Framer Motion'],
          flow: 'Entry point of the pipeline: captures the query plus attachments and forwards it to intent classification.'
        },
        {
          id: 'routemind-intent', label: 'INTENT CLASSIFIER', x: 400, y: 110, status: 'IMPLEMENTED',
          purpose: 'Rule-based intent classification evaluating query nature: Coding, Research, Math, General.',
          inputs: ['Routed query payload'],
          outputs: ['Intent class + query features'],
          tech: ['Python (deterministic regex heuristics)'],
          flow: 'Uses a deterministic regex-heuristic classifier rather than an opaque neural router, keeping routing latency transparent and cost at zero.'
        },
        {
          id: 'routemind-policy', label: 'ADAPTIVE POLICY', x: 660, y: 110, status: 'IMPLEMENTED',
          purpose: 'User-selected optimization policy across Cost, Speed, Balanced, and Quality modes.',
          inputs: ['Intent class', 'User optimization policy'],
          outputs: ['Target provider selection'],
          tech: ['Python policy engine'],
          flow: 'Combines classified intent with the selected policy to choose the most suitable provider model.'
        },
        {
          id: 'routemind-adapters', label: 'PROVIDER ADAPTERS', x: 880, y: 110, status: 'IMPLEMENTED',
          purpose: 'Provider Adapter Pattern (BaseProvider ABC) dispatching queries to modular model integrations.',
          inputs: ['Target provider selection'],
          outputs: ['Model response', 'Provider metadata'],
          tech: ['Python (BaseProvider ABC)', 'OpenAI API', 'Google GenAI (Gemini)'],
          flow: 'Live integrations verified for OpenAI and Google GenAI (Gemini); the Anthropic Claude adapter is currently structured as an architectural placeholder (NotImplementedError).'
        },
        {
          id: 'routemind-telemetry', label: 'DECISION TELEMETRY', x: 660, y: 320, status: 'IMPLEMENTED',
          purpose: 'Explainable AI decisions surfacing confidence scores, estimated tokens, latency, and reasoning.',
          inputs: ['Intent classification result', 'Policy decision', 'Provider response metadata'],
          outputs: ['Routing decision report shown in chat'],
          tech: ['FastAPI', 'React 19'],
          flow: 'Collects every intermediate routing signal and streams it back to the interface so each dispatch decision is fully explainable.'
        },
        {
          id: 'routemind-memory', label: 'SESSION MEMORY', x: 400, y: 320, status: 'IMPLEMENTED',
          purpose: 'Persistent SQLite & SQLAlchemy session memory with background long-term fact extraction.',
          inputs: ['Conversation turns', 'Model responses'],
          outputs: ['Persisted conversation context'],
          tech: ['SQLite', 'SQLAlchemy 2.0'],
          flow: 'Stores sessions durably and runs background fact extraction so later queries can reuse long-term context.'
        }
      ],
      edges: [
        { from: 'routemind-ui', to: 'routemind-intent' },
        { from: 'routemind-intent', to: 'routemind-policy' },
        { from: 'routemind-policy', to: 'routemind-adapters' },
        { from: 'routemind-adapters', to: 'routemind-memory' },
        { from: 'routemind-intent', to: 'routemind-telemetry' },
        { from: 'routemind-policy', to: 'routemind-telemetry' },
        { from: 'routemind-telemetry', to: 'routemind-ui' }
      ]
    },
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
    architecture: {
      title: 'ZOGAN WILDLIFE DETECTION PIPELINE',
      nodes: [
        {
          id: 'zogan-yolo', label: 'YOLO DETECTOR', x: 140, y: 110, status: 'IMPLEMENTED',
          purpose: 'Fine-tuned single-class YOLO model (elephant_v1) trained on 456 images, achieving 88.2% mAP@50.',
          inputs: ['Video frame (daytime RGB)'],
          outputs: ['Per-frame elephant detections'],
          tech: ['Python', 'PyTorch', 'Ultralytics YOLO', 'OpenCV'],
          flow: 'First stage: runs single-class detection on every frame; validated on daytime RGB imagery, so night or thermal domains are out of scope.'
        },
        {
          id: 'zogan-persistence', label: 'PERSISTENCE GATE', x: 400, y: 110, status: 'IMPLEMENTED',
          purpose: 'Temporal Persistence Gate requiring 5 consecutive positive frames before confirming an incident.',
          inputs: ['Per-frame detections'],
          outputs: ['Confirmed detection event'],
          tech: ['Python (frame-state machine)'],
          flow: 'Suppresses single-frame false alarms from visual occlusion: an incident is only confirmed after 5 consecutive positive frames.'
        },
        {
          id: 'zogan-bytetrack', label: 'BYTETRACK TRACKING', x: 660, y: 110, status: 'IMPLEMENTED',
          purpose: 'ByteTrack multi-object tracking with LAP solver and rolling image-space velocity vectors.',
          inputs: ['Confirmed detection event'],
          outputs: ['Tracked targets with trajectories'],
          tech: ['ByteTrack', 'LAP Solver', 'OpenCV'],
          flow: 'Assigns stable identities to confirmed detections and maintains rolling velocity vectors per target for trend analysis.'
        },
        {
          id: 'zogan-geofence', label: 'GEOFENCE ENGINE', x: 880, y: 110, status: 'IMPLEMENTED',
          purpose: 'Geofencing engine evaluating Haversine geodesic distance from tracked targets to village settlements.',
          inputs: ['Tracked target positions', 'Settlement coordinates'],
          outputs: ['Geodesic distance + approach trend'],
          tech: ['Python (Haversine geodesics)'],
          flow: 'Computes geodesic proximity per target. Geodesic distances and GPS drift are simulated in software without physical animal GPS collars.'
        },
        {
          id: 'zogan-risk', label: 'RISK SCORING', x: 660, y: 330, status: 'IMPLEMENTED',
          purpose: 'Multi-factor rule-based risk scoring (0-100) factoring distance, approach trend, and herd size.',
          inputs: ['Geodesic distance + approach trend', 'Tracked herd size'],
          outputs: ['Per-incident risk score 0-100'],
          tech: ['Python (rule-based scoring)'],
          flow: 'Combines spatial and behavioral factors into a deterministic risk score; fully rule-based and auditable.'
        },
        {
          id: 'zogan-alerts', label: 'ALERT DISPATCH', x: 400, y: 330, status: 'IMPLEMENTED',
          purpose: 'Thread-safe atomic JSON Lines event logger (logs/alerts.jsonl) and asynchronous Telegram dispatch.',
          inputs: ['Risk score exceeding alert threshold'],
          outputs: ['alerts.jsonl event record', 'Telegram notification'],
          tech: ['Python (atomic JSONL writer)', 'Telegram Bot API'],
          flow: 'Terminal stage: persists every incident durably and notifies operators asynchronously without blocking the pipeline.'
        }
      ],
      edges: [
        { from: 'zogan-yolo', to: 'zogan-persistence' },
        { from: 'zogan-persistence', to: 'zogan-bytetrack' },
        { from: 'zogan-bytetrack', to: 'zogan-geofence' },
        { from: 'zogan-geofence', to: 'zogan-risk' },
        { from: 'zogan-risk', to: 'zogan-alerts' }
      ]
    },
    repoUrl: 'https://github.com/pritesh-4/Project_Zogan',
    screenshots: [
      {
        src: '/assets/projects/zogan_detect.jpg',
        alt: 'PROJECT ZOGAN detection output — YOLO bounding box drawn around an elephant in daytime RGB footage'
      },
      {
        src: '/assets/projects/zogan_hud.jpg',
        alt: 'PROJECT ZOGAN tracking HUD — ByteTrack overlay with per-target trajectory and risk telemetry'
      }
    ],
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

  // PROJECT 006: HOLY TRIAL
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

  // PROJECT 007: PROJECT ORBIT
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
  }
];
