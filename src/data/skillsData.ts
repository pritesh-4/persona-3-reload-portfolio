export interface SkillItem {
  id: string;
  name: string;
  category: 'programming' | 'development' | 'aiml' | 'engineering' | 'tools';
  categoryLabel: string;
  tier: string;
  element: 'SLASH' | 'STRIKE' | 'PIERCE' | 'FIRE' | 'ICE' | 'ELEC' | 'WIND' | 'ALMIGHTY';
  spCost: number;
  proficiency: 'CORE MASTER' | 'FLUENT' | 'PROFICIENT' | 'ADVANCED' | 'EXPLORING';
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
  // Programming
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER IV',
    element: 'ELEC',
    spCost: 32,
    proficiency: 'CORE MASTER',
    description: 'Strict type contracts, generic architectures, discriminated unions, and scalable front-end state isolation.',
    usageContext: 'Primary language for production web applications, type-safe state machines, and modern React interfaces.'
  },
  {
    id: 'js',
    name: 'JavaScript (ES6+)',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER IV',
    element: 'ELEC',
    spCost: 28,
    proficiency: 'CORE MASTER',
    description: 'Event loop mechanics, asynchronous concurrency, DOM synthesis, closures, and modular package architectures.',
    usageContext: 'Foundation of modern browser runtimes, dynamic client rendering, and RESTful pipeline integration.'
  },
  {
    id: 'py',
    name: 'Python',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER III',
    element: 'FIRE',
    spCost: 24,
    proficiency: 'FLUENT',
    description: 'Object-oriented programming, data structures, automation scripting, and backend API service compilation.',
    usageContext: 'Utilized for machine learning heuristics, AI assistants (Friday), and Flask microservices.'
  },
  {
    id: 'cpp',
    name: 'C / C++',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER II',
    element: 'SLASH',
    spCost: 20,
    proficiency: 'PROFICIENT',
    description: 'Memory allocation, pointers, algorithmic optimization, and computational problem solving.',
    usageContext: 'Foundational systems programming, competitive algorithmic benchmarks, and low-level performance understanding.'
  },
  {
    id: 'html-css',
    name: 'CSS3 & Modern HTML5',
    category: 'programming',
    categoryLabel: 'PROGRAMMING',
    tier: 'TIER IV',
    element: 'ALMIGHTY',
    spCost: 36,
    proficiency: 'CORE MASTER',
    description: 'Bespoke CSS variables, GPU transforms, responsive viewport calculations, and complex keyframe animations.',
    usageContext: 'Architect of gaming-fidelity UI, zero-dependency styling, and custom Persona 3 aesthetic engines.'
  },

  // Development
  {
    id: 'react',
    name: 'React 19',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER IV',
    element: 'ICE',
    spCost: 38,
    proficiency: 'CORE MASTER',
    description: 'Component lifecycles, custom reactive hooks, memoization pipelines, and concurrent rendering architectures.',
    usageContext: 'Core framework powering portfolio portals, DevLore, and rich interactive web client systems.'
  },
  {
    id: 'vite',
    name: 'Vite Bundler',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER IV',
    element: 'WIND',
    spCost: 26,
    proficiency: 'CORE MASTER',
    description: 'Lightning-fast ES modules, hot module replacement, optimized production chunking, and rollup asset pipelines.',
    usageContext: 'Development and production build engine for all modern web applications and SPA deployments.'
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER IV',
    element: 'WIND',
    spCost: 34,
    proficiency: 'CORE MASTER',
    description: 'Physics-based spring dynamics, gesture recognition, presence orchestration, and complex layout transitions.',
    usageContext: 'Drives cinematic page transitions, curved arc animations, and real-time interface telemetry effects.'
  },
  {
    id: 'node',
    name: 'Node.js & Express',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER III',
    element: 'STRIKE',
    spCost: 25,
    proficiency: 'FLUENT',
    description: 'Server-side runtime, event-driven I/O, middleware chaining, and RESTful JSON service construction.',
    usageContext: 'Backend server implementations, API proxies, and local development CLI automation tools.'
  },
  {
    id: 'flask',
    name: 'Flask Backend',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    tier: 'TIER III',
    element: 'FIRE',
    spCost: 22,
    proficiency: 'FLUENT',
    description: 'Lightweight WSGI Python microframework, routing decorators, and rapid ML model inference endpoints.',
    usageContext: 'Backend API serving the AI Impact Predictor risk analysis heuristic model.'
  },

  // AI / ML
  {
    id: 'scikit',
    name: 'scikit-learn',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER II',
    element: 'PIERCE',
    spCost: 28,
    proficiency: 'PROFICIENT',
    description: 'Supervised classification models, feature engineering, regression pipelines, and predictive risk heuristics.',
    usageContext: 'Core statistical machine learning algorithms behind the AI Code Impact Predictor platform.'
  },
  {
    id: 'opencv',
    name: 'OpenCV & Computer Vision',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER II',
    element: 'STRIKE',
    spCost: 30,
    proficiency: 'PROFICIENT',
    description: 'Image processing, spatial matrix transformations, frame extraction, and object tracking pipelines.',
    usageContext: 'Implemented in the Elephant Detector wildlife computer vision tracking system.'
  },
  {
    id: 'llm',
    name: 'LLM Integration & Prompting',
    category: 'aiml',
    categoryLabel: 'AI / MACHINE LEARNING',
    tier: 'TIER III',
    element: 'ALMIGHTY',
    spCost: 35,
    proficiency: 'ADVANCED',
    description: 'Context engineering, agentic loop architectures, structured JSON schemas, and autonomous tooling.',
    usageContext: 'Powers intelligent developer tooling, conversational agents, and contextual code assistants.'
  },

  // Engineering
  {
    id: 'git',
    name: 'Git & Version Control',
    category: 'engineering',
    categoryLabel: 'ENGINEERING',
    tier: 'TIER IV',
    element: 'SLASH',
    spCost: 25,
    proficiency: 'CORE MASTER',
    description: 'Branching topologies, atomic rebasing, pull request reviews, conflict resolution, and release workflows.',
    usageContext: 'Employed daily across personal archives and collaborative open-source GSSoC repositories.'
  },
  {
    id: 'cicd',
    name: 'CI/CD & Vercel Deployment',
    category: 'engineering',
    categoryLabel: 'ENGINEERING',
    tier: 'TIER III',
    element: 'WIND',
    spCost: 22,
    proficiency: 'FLUENT',
    description: 'Automated build checks, continuous deployment webhooks, preview branch staging, and global CDN caching.',
    usageContext: 'Zero-downtime deployment pipelines for production portfolios and interactive web applications.'
  },
  {
    id: 'linux',
    name: 'Linux / Bash Environment',
    category: 'engineering',
    categoryLabel: 'ENGINEERING',
    tier: 'TIER III',
    element: 'STRIKE',
    spCost: 20,
    proficiency: 'FLUENT',
    description: 'Command line utilities, shell scripting, file permissions, and environment container navigation.',
    usageContext: 'Daily developer environment, build pipeline orchestration, and server configuration.'
  },

  // Tools
  {
    id: 'vscode',
    name: 'VS Code & Extensions',
    category: 'tools',
    categoryLabel: 'TOOLS & ENV',
    tier: 'TIER IV',
    element: 'SLASH',
    spCost: 15,
    proficiency: 'CORE MASTER',
    description: 'Configured development environment with ESLint, Prettier, TypeScript server, and keyboard efficiency macros.',
    usageContext: 'Primary mission command station for engineering clean, typed, high-performance code.'
  },
  {
    id: 'devtools',
    name: 'Chrome DevTools & Profiler',
    category: 'tools',
    categoryLabel: 'TOOLS & ENV',
    tier: 'TIER IV',
    element: 'ELEC',
    spCost: 24,
    proficiency: 'CORE MASTER',
    description: 'Network throttling diagnostics, memory leak analysis, frame-rate profiling, and responsive layout testing.',
    usageContext: 'Ensuring 60fps animations, sub-second load times, and flawless mobile responsive fidelity.'
  },
  {
    id: 'postman',
    name: 'Postman & REST API Auditing',
    category: 'tools',
    categoryLabel: 'TOOLS & ENV',
    tier: 'TIER III',
    element: 'PIERCE',
    spCost: 18,
    proficiency: 'FLUENT',
    description: 'Endpoint payload assertion, header token validation, response timing benchmarks, and mock API servers.',
    usageContext: 'Verification and contract testing for REST API integrations in DevLore and AI Impact Predictor.'
  }
];

