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
    icon: '🐍',
    rarity: 'LEGENDARY',
    quantity: 'x5',
    whatItIsUsedFor: 'Core engine for machine learning pipelines, FastAPI microservices, computer vision inference, and data processing.',
    flavorText: 'High-level expressive syntax paired with high-performance native tensor libraries. The quintessential language of modern intelligence.',
    relevantProjects: ['Project Zogan', 'Project AETHON', 'SALVUS Backend', 'Project-FRIDAY'],
    docsUrl: 'https://www.python.org/'
  },
  {
    id: 'lang-typescript',
    name: 'TypeScript 6.0',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: '🔷',
    rarity: 'LEGENDARY',
    quantity: 'x4',
    whatItIsUsedFor: 'Strict static type enforcement, compile-time contract safety, and predictable state across complex web interfaces.',
    flavorText: 'An impenetrable structural shield eliminating runtime type mutations and enforcing crystal-clear component contracts.',
    relevantProjects: ['Persona 3 Reload Portfolio', 'SALVUS Frontend', 'Project RouteMind'],
    docsUrl: 'https://www.typescriptlang.org/'
  },
  {
    id: 'lang-javascript',
    name: 'JavaScript (ES2024+)',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: '⚡',
    rarity: 'EPIC',
    quantity: 'x6',
    whatItIsUsedFor: 'Dynamic client-side interactivity, asynchronous event loops, DOM orchestration, and web API integration.',
    flavorText: 'The ubiquitous lingua franca of the modern web. Flexible, rapid, and universally understood across all connected client nodes.',
    relevantProjects: ['RouteMind', 'DevLore', 'The Last Chronicle', 'code-Geass-fan-page-'],
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    id: 'lang-cpp',
    name: 'C / C++ 20',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: '⚙️',
    rarity: 'RARE',
    quantity: 'x2',
    whatItIsUsedFor: 'Algorithmic problem solving, low-level memory allocation, data structures, and computational optimization.',
    flavorText: 'Bare-metal deterministic execution. Yields maximum compute throughput and direct control over pointers and memory layouts.',
    relevantProjects: ['NIT Rourkela Computational Core', 'Data Structures & Algorithms Lab'],
    docsUrl: 'https://en.cppreference.com/'
  },
  {
    id: 'lang-php',
    name: 'PHP',
    category: 'LANGUAGES',
    categoryLabel: 'Programming Languages',
    icon: '🐘',
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
    icon: '⚛️',
    rarity: 'LEGENDARY',
    quantity: 'x4',
    whatItIsUsedFor: 'Declarative component hierarchies, server actions, concurrent rendering transitions, and reactive UI architecture.',
    flavorText: 'The latest evolution of reactive virtual DOM rendering. Powers this portfolio\'s complex curved menus and real-time state trees.',
    relevantProjects: ['Persona 3 Reload Portfolio', 'SALVUS', 'RouteMind', 'DevLore'],
    docsUrl: 'https://react.dev/'
  },
  {
    id: 'fw-fastapi',
    name: 'FastAPI',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: '⚡',
    rarity: 'EPIC',
    quantity: 'x2',
    whatItIsUsedFor: 'High-concurrency async Python REST endpoints, automatic OpenAPI schema generation, and ML model serving.',
    flavorText: 'Lightweight Starlette-powered asynchronous framework. Delivers near-Go throughput with Pydantic type safety.',
    relevantProjects: ['Project AETHON Microservice', 'SALVUS Emergency API'],
    docsUrl: 'https://fastapi.tiangolo.com/'
  },
  {
    id: 'fw-framer-motion',
    name: 'Framer Motion 14.9',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: '🎭',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    whatItIsUsedFor: 'Spring physics-driven layout animations, diagonal screen transition wipes, and gesture drag interactions.',
    flavorText: 'Translates physical mechanics into 60fps kinetic screen choreography. Powers the signature Persona 3 diagonal transition slashes.',
    relevantProjects: ['Persona 3 Reload Portfolio', 'The Last Chronicle'],
    docsUrl: 'https://www.framer.com/motion/'
  },
  {
    id: 'fw-tailwind',
    name: 'Tailwind CSS',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: '🎨',
    rarity: 'RARE',
    quantity: 'x3',
    whatItIsUsedFor: 'Rapid utility-first responsive styling, zero-runtime CSS purging, and design token consistency.',
    flavorText: 'Atomic utility styling system compiling to minimal CSS bundles for instant production layout rendering.',
    relevantProjects: ['SALVUS Dashboard', 'RouteMind Interface'],
    docsUrl: 'https://tailwindcss.com/'
  },
  {
    id: 'fw-websockets',
    name: 'WebSockets & Real-Time Streams',
    category: 'FRAMEWORKS',
    categoryLabel: 'Frameworks & Libraries',
    icon: '📡',
    rarity: 'EPIC',
    quantity: 'x2',
    whatItIsUsedFor: 'Full-duplex real-time communication channels, room-scoped event multiplexing, and live responder updates.',
    flavorText: 'Bidirectional streaming protocol keeping authorities and responders continuously synchronized during critical incidents.',
    relevantProjects: ['SALVUS Live Distress Dispatch', 'Project-FRIDAY'],
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API'
  },

  // 3. AI / Machine Learning
  {
    id: 'ai-opencv',
    name: 'OpenCV & Edge Vision',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: '👁️',
    rarity: 'EPIC',
    quantity: 'x2',
    whatItIsUsedFor: 'Frame preprocessing, edge filtering, contour detection, and bipartite linear assignment matching.',
    flavorText: 'Real-time computer vision toolkit processing raw video feeds for low-latency wildlife detection pipelines.',
    relevantProjects: ['Project Zogan'],
    docsUrl: 'https://opencv.org/'
  },
  {
    id: 'ai-yolov8',
    name: 'Ultralytics YOLOv8',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: '🎯',
    rarity: 'LEGENDARY',
    quantity: 'x1',
    whatItIsUsedFor: 'Real-time edge object detection, bounding box classification, and wildlife incident prevention.',
    flavorText: 'State-of-the-art vision architecture. Fine-tuned on 456 elephant image annotations to achieve 88.2% mAP@50 under low-light forest environments.',
    relevantProjects: ['Project Zogan'],
    docsUrl: 'https://docs.ultralytics.com/'
  },
  {
    id: 'ai-pytorch',
    name: 'PyTorch 2.0+',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: '🔥',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    whatItIsUsedFor: 'Dynamic computational tensor graphs, neural network training loops, and loss convergence optimization.',
    flavorText: 'The premier deep learning framework. Enables GPU-accelerated gradient backpropagation with intuitive Pythonic control flow.',
    relevantProjects: ['Project Zogan', 'Project AETHON'],
    docsUrl: 'https://pytorch.org/'
  },
  {
    id: 'ai-bytetrack',
    name: 'ByteTrack Multi-Object Tracking',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: '🔍',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Associating bounding boxes across video frames, handling occlusions, and computing trajectory vectors.',
    flavorText: 'High-accuracy tracking algorithm utilizing low-score detection boxes to maintain persistent identity IDs through dense vegetation.',
    relevantProjects: ['Project Zogan (Elephant Detection)'],
    docsUrl: 'https://github.com/ifzhang/ByteTrack'
  },
  {
    id: 'ai-llm-orchestration',
    name: 'OpenAI & Google Gemini APIs',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: '🤖',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    whatItIsUsedFor: 'Prompt engineering, intent classification, token cost arbitrage, and automated reasoning pipelines.',
    flavorText: 'Leading multimodal frontier models integrated via intelligent routing heuristics to maximize answer quality while minimizing latency.',
    relevantProjects: ['Project RouteMind', 'Project-FRIDAY'],
    docsUrl: 'https://platform.openai.com/'
  },
  {
    id: 'ai-chromadb',
    name: 'ChromaDB Vector Store',
    category: 'AI_ML',
    categoryLabel: 'AI / Machine Learning',
    icon: '🧬',
    rarity: 'RARE',
    quantity: 'x1',
    whatItIsUsedFor: 'Embedding generation, similarity search, and semantic long-term memory retrieval for conversational agents.',
    flavorText: 'Local-first open-source vector database storing high-dimensional semantic vectors for instant nearest-neighbor recall.',
    relevantProjects: ['Project-FRIDAY (Virtual Assistant)'],
    docsUrl: 'https://www.trychroma.com/'
  },

  // 4. Developer Tools
  {
    id: 'tool-git',
    name: 'Git & GitHub Toolchain',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: '🐙',
    rarity: 'LEGENDARY',
    quantity: 'x1',
    whatItIsUsedFor: 'Distributed version control, atomic commit histories, branch workflows, and automated GitHub Actions CI/CD.',
    flavorText: 'Immutable cryptographic version tree. Tracks every modification across all 19 public repositories with complete transparency.',
    relevantProjects: ['All 19 Public GitHub Repositories'],
    docsUrl: 'https://github.com/pritesh-4'
  },
  {
    id: 'tool-vite',
    name: 'Vite 8.3 & Rolldown',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: '⚡',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    whatItIsUsedFor: 'Sub-second ESM hot module replacement, optimized chunk splitting, and production bundle minification in 463ms.',
    flavorText: 'Next-generation web build toolchain. Replaces sluggish legacy bundlers with native ES modules and lightning-fast Rollup builds.',
    relevantProjects: ['Persona 3 Reload Portfolio', 'SALVUS'],
    docsUrl: 'https://vite.dev/'
  },
  {
    id: 'tool-playwright',
    name: 'Playwright Test Suite',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: '🎭',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Headless browser end-to-end regression testing, screenshot visual verification, and console error audits.',
    flavorText: 'Chromium automation engine that rigorously audits all 11 screens across desktop and mobile viewports with zero console warnings.',
    relevantProjects: ['Persona 3 Portfolio Verification Suite'],
    docsUrl: 'https://playwright.dev/'
  },
  {
    id: 'tool-editor',
    name: 'VS Code & Neovim',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: '💻',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Modal editing, Language Server Protocol (LSP) AST code intelligence, and cross-platform terminal workspaces.',
    flavorText: 'Ergonomic developer cockpit configured with Vim modal navigation and custom Persona Dark Hour color schemes.',
    relevantProjects: ['Daily Systems & Full-Stack Development'],
    docsUrl: 'https://code.visualstudio.com/'
  },
  {
    id: 'tool-figma',
    name: 'Figma UI Prototyping',
    category: 'DEV_TOOLS',
    categoryLabel: 'Developer Tools',
    icon: '📐',
    rarity: 'RARE',
    quantity: 'x1',
    whatItIsUsedFor: 'Interface wireframing, component design systems, typography hierarchy, and creative aesthetic experimentation.',
    flavorText: 'Vector design platform for modeling angular layouts, high-contrast HUD components, and game UI themes.',
    relevantProjects: ['SALVUS Interface Ideation', 'The Last Chronicle', 'Persona 3 Portfolio Theme Design'],
    docsUrl: 'https://www.figma.com/'
  },

  // 5. Databases & Infrastructure
  {
    id: 'infra-sqlite',
    name: 'SQLite & SQLAlchemy 2.0',
    category: 'INFRASTRUCTURE',
    categoryLabel: 'Databases & Infrastructure',
    icon: '🗄️',
    rarity: 'EPIC',
    quantity: 'x2',
    whatItIsUsedFor: 'Write-Ahead Logging (WAL) concurrency, declarative ORM models, relational foreign keys, and atomic transactions.',
    flavorText: 'High-speed embedded persistence powering emergency registries and session telemetry with zero runtime daemon overhead.',
    relevantProjects: ['SALVUS Emergency Registry', 'RouteMind Session Store'],
    docsUrl: 'https://www.sqlalchemy.org/'
  },
  {
    id: 'infra-vercel',
    name: 'Vercel Edge Platform',
    category: 'INFRASTRUCTURE',
    categoryLabel: 'Databases & Infrastructure',
    icon: '▲',
    rarity: 'LEGENDARY',
    quantity: 'x5',
    whatItIsUsedFor: 'Global edge network delivery, instant Git deployments, preview branches, and serverless compute.',
    flavorText: 'Serverless deployment network hosting live production apps with sub-50ms latency across global edge points.',
    relevantProjects: ['SALVUS (Live)', 'RouteMind (Live)', 'Friday (Live)', 'DevLore (Live)', 'The Last Chronicle (Live)'],
    docsUrl: 'https://vercel.com/'
  },
  {
    id: 'infra-docker',
    name: 'Docker Containers',
    category: 'INFRASTRUCTURE',
    categoryLabel: 'Databases & Infrastructure',
    icon: '🐳',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Isolated service packaging, containerized ML inference environments, and reproducible production runtimes.',
    flavorText: 'Standardized OS-level virtualization guaranteeing that software executes identically across development and cloud environments.',
    relevantProjects: ['Project AETHON Microservice', 'FastAPI Backends'],
    docsUrl: 'https://www.docker.com/'
  },
  {
    id: 'infra-storage',
    name: 'LocalStorage & IndexedDB',
    category: 'INFRASTRUCTURE',
    categoryLabel: 'Databases & Infrastructure',
    icon: '💾',
    rarity: 'RARE',
    quantity: 'x2',
    whatItIsUsedFor: 'Zero-latency offline client state caching, user system calibration preferences, and session telemetry.',
    flavorText: 'Browser client database keeping Persona SYSTEM volumes, artwork dimmers, and DevLore quiz analytics persisted locally.',
    relevantProjects: ['Persona 3 Portfolio System Settings', 'DevLore Analytics'],
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'
  },

  // 6. Hardware & Physical Rig
  {
    id: 'hw-dual-ips',
    name: 'Dual IPS Display Workstation',
    category: 'HARDWARE',
    categoryLabel: 'Hardware / Physical Equipment',
    icon: '🖥️',
    rarity: 'EPIC',
    quantity: 'x1',
    whatItIsUsedFor: 'Simultaneous side-by-side terminal debugging, responsive viewport testing, and design system inspection.',
    flavorText: 'Dual high-resolution panels with calibrated sRGB accuracy eliminating context-switching friction during complex development.',
    relevantProjects: ['Full-Stack Engineering Command Center'],
    docsUrl: '#'
  },
  {
    id: 'hw-mech-deck',
    name: 'Tactile Mechanical Keyboard',
    category: 'HARDWARE',
    categoryLabel: 'Hardware / Physical Equipment',
    icon: '⌨️',
    rarity: 'RARE',
    quantity: 'x1',
    whatItIsUsedFor: 'Low-latency tactile actuation and sustained typing comfort for marathon programming sessions.',
    flavorText: 'Custom mechanical deck with responsive switches providing crisp audio-tactile feedback on every keystroke.',
    relevantProjects: ['Daily Engineering Execution'],
    docsUrl: '#'
  }
];
