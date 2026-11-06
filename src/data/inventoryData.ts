export type InventoryCategory =
  | 'LANGUAGES'
  | 'FRAMEWORKS'
  | 'AI_ML'
  | 'DEV_TOOLS'
  | 'INFRASTRUCTURE'
  | 'HARDWARE';

export interface InventoryItem {
  id: string;
  name: string;
  category: InventoryCategory;
  categoryLabel: string;
  icon: string;
  rarity: 'LEGENDARY' | 'EPIC' | 'RARE' | 'UNCOMMON';
  quantity: string;
  whatItIsUsedFor: string;
  flavorText: string;
  relevantProjects: string[];
  docsUrl: string;
}

export const INVENTORY_CATEGORIES = [
  { id: 'ALL', label: 'ALL SKILLS' },
  { id: 'LANGUAGES', label: 'LANGUAGES' },
  { id: 'FRAMEWORKS', label: 'FRAMEWORKS & LIBS' },
  { id: 'AI_ML', label: 'AI & ML' },
  { id: 'DEV_TOOLS', label: 'DEV TOOLS' },
  { id: 'INFRASTRUCTURE', label: 'DATA & INFRA' },
  { id: 'HARDWARE', label: 'HARDWARE RIG' },
] as const;

export const INVENTORY_ITEMS: InventoryItem[] = [
  // 1. Programming Languages
  {
    id: 'lang-python',
    name: 'Python 3.11+',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: 'PY',
    rarity: 'LEGENDARY',
    quantity: 'x5',
    whatItIsUsedFor: 'Core engine for machine learning pipelines, FastAPI microservices, computer vision inference, and data processing.',
    flavorText: 'Primary language for computer vision pipelines, FastAPI asynchronous services, and PyTorch deep learning models.',
    relevantProjects: ['Project Zogan', 'Project AETHON', 'SALVUS Backend', 'Project-FRIDAY'],
    docsUrl: 'https://www.python.org/'
  },
  {
    id: 'lang-typescript',
    name: 'TypeScript 6.0',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: 'TS',
    rarity: 'LEGENDARY',
    quantity: 'x4',
    whatItIsUsedFor: 'Strict static type enforcement, compile-time contract safety, and predictable state across complex web interfaces.',
    flavorText: 'Strict type enforcement and static compile-time safety across frontend interfaces, routing state, and data schemas.',
    relevantProjects: ['Persona 3 Reload Portfolio', 'SALVUS Frontend', 'Project RouteMind'],
    docsUrl: 'https://www.typescriptlang.org/'
  },
  {
    id: 'lang-javascript',
    name: 'JavaScript (ES2024+)',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: 'JS',
    rarity: 'EPIC',
    quantity: 'x6',
    whatItIsUsedFor: 'Dynamic client-side interactivity, asynchronous event loops, DOM orchestration, and web API integration.',
    flavorText: 'Dynamic event loops, DOM orchestration, and real-time client state management across browser runtime targets.',
    relevantProjects: ['RouteMind', 'DevLore', 'The Last Chronicle', 'code-Geass-fan-page-'],
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    id: 'lang-cpp',
    name: 'C / C++ 20',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: 'C++',
    rarity: 'RARE',
    quantity: 'x2',
    whatItIsUsedFor: 'Algorithmic problem solving, low-level memory allocation, data structures, and computational optimization.',
    flavorText: 'Deterministic memory management, manual pointer control, and low-level algorithmic problem solving in DSA labs.',
    relevantProjects: ['NIT Rourkela Computational Core', 'Data Structures & Algorithms Lab'],
    docsUrl: 'https://en.cppreference.com/'
  },
  {
    id: 'lang-php',
    name: 'PHP',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: 'PHP',
    rarity: 'UNCOMMON',
    quantity: 'x1',
    whatItIsUsedFor: 'Server-side request handling, session state management, and traditional backend rendering paradigms.',
    flavorText: 'Scripting language explored during foundational backend web development and database scripting exercises.',
    relevantProjects: ['Foundational Backend Experiments'],
    docsUrl: 'https://www.php.net/'
  },

  // 2. Frameworks & Libraries
  {
    id: 'fw-react',
    name: 'React 19.3',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: 'REACT',
    rarity: 'LEGENDARY',
    quantity: 'x4',
    whatItIsUsedFor: 'Declarative component hierarchies, server actions, concurrent rendering transitions, and reactive UI architecture.',
    flavorText: 'Concurrent rendering transitions, reactive state trees, and custom coordinate-mapped Bézier HUD menus.',
    relevantProjects: ['Persona 3 Reload Portfolio', 'SALVUS', 'RouteMind', 'DevLore'],
    docsUrl: 'https://react.dev/'
  },
  {
    id: 'fw-fastapi',
    name: 'FastAPI',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: 'FASTAPI',
    rarity: 'EPIC',
    quantity: 'x2',
    whatItIsUsedFor: 'High-concurrency async Python REST endpoints, automatic OpenAPI schema generation, and ML model serving.',
    flavorText: 'Asynchronous Python REST microservices with Pydantic validation, OpenAPI schema generation, and ML model inference serving.',
    relevantProjects: ['Project AETHON Microservice', 'SALVUS Emergency API'],
    docsUrl: 'https://fastapi.tiangolo.com/'
  },
  {
    id: 'fw-framer-motion',
    name: 'Framer Motion 14.9',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: 'MOTION',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    whatItIsUsedFor: 'Spring physics-driven layout animations, diagonal screen transition wipes, and gesture drag interactions.',
    flavorText: 'Hardware-accelerated spring physics, orchestrated diagonal screen transitions, and gesture drag interactions.',
    relevantProjects: ['Persona 3 Reload Portfolio', 'The Last Chronicle'],
    docsUrl: 'https://www.framer.com/motion/'
  },
  {
    id: 'fw-tailwind',
    name: 'Tailwind CSS',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: 'TAILWIND',
    rarity: 'RARE',
    quantity: 'x3',
    whatItIsUsedFor: 'Rapid utility-first responsive styling, zero-runtime CSS purging, and design token consistency.',
    flavorText: 'Utility-first design tokens and responsive layout utilities compiling to minimal production stylesheets.',
    relevantProjects: ['SALVUS Dashboard', 'RouteMind Interface'],
    docsUrl: 'https://tailwindcss.com/'
  },
  {
    id: 'fw-websockets',
    name: 'WebSockets & Real-Time Streams',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: 'SOCKET',
    rarity: 'EPIC',
    quantity: 'x2',
    whatItIsUsedFor: 'Full-duplex real-time communication channels, room-scoped event multiplexing, and live responder updates.',
    flavorText: 'Full-duplex real-time communication channels and room-scoped dispatch messaging for emergency operations.',
    relevantProjects: ['SALVUS Live Distress Dispatch', 'Project-FRIDAY'],
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API'
  },

  // 3. AI / Machine Learning
  {
    id: 'ai-opencv',
    name: 'OpenCV & Edge Vision',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: 'CV',
    rarity: 'EPIC',
    quantity: 'x2',
    whatItIsUsedFor: 'Frame preprocessing, edge filtering, contour detection, and bipartite linear assignment matching.',
    flavorText: 'Frame preprocessing, morphological transforms, contour detection, and matrix operations for video streams.',
    relevantProjects: ['Project Zogan'],
    docsUrl: 'https://opencv.org/'
  },
  {
    id: 'ai-yolov8',
    name: 'Ultralytics YOLOv8',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: 'YOLO',
    rarity: 'LEGENDARY',
    quantity: 'x1',
    whatItIsUsedFor: 'Real-time edge object detection, bounding box classification, and wildlife incident prevention.',
    flavorText: 'Fine-tuned edge object detector on 456 forest annotations, achieving 88.2% mAP@50 under low-light wildlife corridor conditions.',
    relevantProjects: ['Project Zogan'],
    docsUrl: 'https://docs.ultralytics.com/'
  },
  {
    id: 'ai-pytorch',
    name: 'PyTorch 2.0+',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: 'TORCH',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    whatItIsUsedFor: 'Dynamic computational tensor graphs, neural network training loops, and loss convergence optimization.',
    flavorText: 'Dynamic computation graphs, GPU-accelerated tensor computations, and custom training loops with validation checkpoints.',
    relevantProjects: ['Project Zogan', 'Project AETHON'],
    docsUrl: 'https://pytorch.org/'
  },
  {
    id: 'ai-bytetrack',
    name: 'ByteTrack Multi-Object Tracking',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: 'TRACK',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Associating bounding boxes across video frames, handling occlusions, and computing trajectory vectors.',
    flavorText: 'Multi-object tracker utilizing low-score detection boxes and Kalman filtering to maintain persistent identities through dense occlusions.',
    relevantProjects: ['Project Zogan (Elephant Detection)'],
    docsUrl: 'https://github.com/ifzhang/ByteTrack'
  },
  {
    id: 'ai-llm-orchestration',
    name: 'OpenAI & Google Gemini APIs',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: 'LLM',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    whatItIsUsedFor: 'Prompt engineering, intent classification, token cost arbitrage, and automated reasoning pipelines.',
    flavorText: 'Multimodal frontier API routing, structured JSON schema outputs, and token-cost-aware fallback heuristics.',
    relevantProjects: ['Project RouteMind', 'Project-FRIDAY'],
    docsUrl: 'https://platform.openai.com/'
  },
  {
    id: 'ai-chromadb',
    name: 'ChromaDB Vector Store',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: 'VECTOR',
    rarity: 'RARE',
    quantity: 'x1',
    whatItIsUsedFor: 'Embedding generation, similarity search, and semantic long-term memory retrieval for conversational agents.',
    flavorText: 'Embedded vector database managing high-dimensional embeddings and cosine similarity retrieval for retrieval-augmented generation.',
    relevantProjects: ['Project-FRIDAY (Virtual Assistant)'],
    docsUrl: 'https://www.trychroma.com/'
  },

  // 4. Developer Tools
  {
    id: 'tool-git',
    name: 'Git & GitHub Toolchain',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: 'GIT',
    rarity: 'LEGENDARY',
    quantity: 'x1',
    whatItIsUsedFor: 'Distributed version control, atomic commit histories, branch workflows, and automated GitHub Actions CI/CD.',
    flavorText: 'Distributed version control, atomic commit histories, branching strategies, and automated GitHub Actions verification workflows.',
    relevantProjects: ['All 19 Public GitHub Repositories'],
    docsUrl: 'https://github.com/pritesh-4'
  },
  {
    id: 'tool-vite',
    name: 'Vite 8.3 & Rolldown',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: 'VITE',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    whatItIsUsedFor: 'Sub-second ESM hot module replacement, optimized chunk splitting, and production bundle minification in 463ms.',
    flavorText: 'Sub-second ESM hot-module replacement and production bundle chunk splitting compiling in under 500ms.',
    relevantProjects: ['Persona 3 Reload Portfolio', 'SALVUS'],
    docsUrl: 'https://vite.dev/'
  },
  {
    id: 'tool-playwright',
    name: 'Playwright Test Suite',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: 'TEST',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Headless browser end-to-end regression testing, screenshot visual verification, and console error audits.',
    flavorText: 'Automated end-to-end regression testing and cross-browser viewport verification across desktop and mobile devices.',
    relevantProjects: ['Persona 3 Portfolio Verification Suite'],
    docsUrl: 'https://playwright.dev/'
  },
  {
    id: 'tool-editor',
    name: 'VS Code & Neovim',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: 'CLI',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Modal editing, Language Server Protocol (LSP) AST code intelligence, and cross-platform terminal workspaces.',
    flavorText: 'Modal keyboard editing, Language Server Protocol (LSP) diagnostics, and integrated terminal workspace configuration.',
    relevantProjects: ['Daily Systems & Full-Stack Development'],
    docsUrl: 'https://code.visualstudio.com/'
  },
  {
    id: 'tool-figma',
    name: 'Figma UI Prototyping',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: 'FIGMA',
    rarity: 'RARE',
    quantity: 'x1',
    whatItIsUsedFor: 'Interface wireframing, component design systems, typography hierarchy, and creative aesthetic experimentation.',
    flavorText: 'Vector interface prototyping for high-contrast HUD elements, typography scale, and layout composition.',
    relevantProjects: ['SALVUS Interface Ideation', 'The Last Chronicle', 'Persona 3 Portfolio Theme Design'],
    docsUrl: 'https://www.figma.com/'
  },

  // 5. Databases & Infrastructure
  {
    id: 'infra-sqlite',
    name: 'SQLite & SQLAlchemy 2.0',
    category: 'INFRASTRUCTURE',
    categoryLabel: 'Databases & Infrastructure',
    icon: 'SQL',
    rarity: 'EPIC',
    quantity: 'x2',
    whatItIsUsedFor: 'Write-Ahead Logging (WAL) concurrency, declarative ORM models, relational foreign keys, and atomic transactions.',
    flavorText: 'Write-Ahead Logging (WAL) embedded database with declarative SQLAlchemy ORM models and atomic transactions.',
    relevantProjects: ['SALVUS Emergency Registry', 'RouteMind Session Store'],
    docsUrl: 'https://www.sqlalchemy.org/'
  },
  {
    id: 'infra-vercel',
    name: 'Vercel Edge Platform',
    category: 'INFRASTRUCTURE',
    categoryLabel: 'Databases & Infrastructure',
    icon: 'EDGE',
    rarity: 'LEGENDARY',
    quantity: 'x5',
    whatItIsUsedFor: 'Global edge network delivery, instant Git deployments, preview branches, and serverless compute.',
    flavorText: 'Edge CDN routing, preview deployments, SPA rewrite rules, and immutable cache-control headers.',
    relevantProjects: ['SALVUS (Live)', 'RouteMind (Live)', 'Friday (Live)', 'DevLore (Live)', 'The Last Chronicle (Live)'],
    docsUrl: 'https://vercel.com/'
  },
  {
    id: 'infra-docker',
    name: 'Docker Containers',
    category: 'INFRASTRUCTURE',
    categoryLabel: 'Databases & Infrastructure',
    icon: 'DOCK',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Isolated service packaging, containerized ML inference environments, and reproducible production runtimes.',
    flavorText: 'Containerized service packaging for reproducible local development and isolated ML inference microservices.',
    relevantProjects: ['Project AETHON Microservice', 'FastAPI Backends'],
    docsUrl: 'https://www.docker.com/'
  },
  {
    id: 'infra-storage',
    name: 'LocalStorage & IndexedDB',
    category: 'INFRASTRUCTURE',
    categoryLabel: 'Databases & Infrastructure',
    icon: 'CACHE',
    rarity: 'RARE',
    quantity: 'x2',
    whatItIsUsedFor: 'Zero-latency offline client state caching, user system calibration preferences, and session telemetry.',
    flavorText: 'Synchronous client-side persistence for user audio volumes, theme preferences, and local application state.',
    relevantProjects: ['Persona 3 Portfolio System Settings', 'DevLore Analytics'],
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'
  },

  // 6. Hardware & Physical Rig
  {
    id: 'hw-dual-ips',
    name: 'Dual IPS Display Workstation',
    category: 'HARDWARE',
    categoryLabel: 'Hardware / Physical Equipment',
    icon: 'RIG',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Simultaneous side-by-side terminal debugging, responsive viewport testing, and design system inspection.',
    flavorText: 'Dual calibrated sRGB displays configured for simultaneous full-screen terminal debugging and responsive layout verification.',
    relevantProjects: ['Full-Stack Engineering Command Center'],
    docsUrl: '#'
  },
  {
    id: 'hw-mech-deck',
    name: 'Tactile Mechanical Keyboard',
    category: 'HARDWARE',
    categoryLabel: 'Hardware / Physical Equipment',
    icon: 'DECK',
    rarity: 'RARE',
    quantity: 'x1',
    whatItIsUsedFor: 'Low-latency tactile actuation and sustained typing comfort for marathon programming sessions.',
    flavorText: 'Tactile mechanical keyboard optimized for low-latency actuation during extended engineering sessions.',
    relevantProjects: ['Daily Engineering Execution'],
    docsUrl: '#'
  }
];
