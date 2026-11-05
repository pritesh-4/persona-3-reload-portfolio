export interface InventoryItem {
  id: string;
  name: string;
  category: 'WORKSTATION' | 'DEV_ENV' | 'DEPLOY_OPS' | 'INSPECTION';
  categoryLabel: string;
  icon: string;
  rarity: 'LEGENDARY' | 'EPIC' | 'RARE' | 'UNCOMMON';
  quantity: string;
  effect: string;
  flavorText: string;
  associatedProject: string;
}

export const INVENTORY_CATEGORIES = [
  { id: 'all', label: 'ALL GEAR' },
  { id: 'WORKSTATION', label: 'HARDWARE & RIG' },
  { id: 'DEV_ENV', label: 'SHELL & EDITOR' },
  { id: 'DEPLOY_OPS', label: 'CONTAINERS & CI/CD' },
  { id: 'INSPECTION', label: 'PROBES & AUDIT' }
] as const;

export const INVENTORY_ITEMS: InventoryItem[] = [
  // Workstation Hardware
  {
    id: 'gear-dual-ips',
    name: 'Dual IPS Panoramic Rig',
    category: 'WORKSTATION',
    categoryLabel: 'HARDWARE & RIG',
    icon: '🖥',
    rarity: 'LEGENDARY',
    quantity: 'x2',
    effect: 'Enables panoramic visual multitasking with 100% sRGB color accuracy for pixel-perfect UI/UX auditing.',
    flavorText: 'Dual high-refresh IPS panels mounted on articulating gas-spring arms, eliminating viewport switching latency during live debugging.',
    associatedProject: 'Full-Stack Command Center'
  },
  {
    id: 'gear-mech-deck',
    name: 'Hot-Swap Mechanical Deck',
    category: 'WORKSTATION',
    categoryLabel: 'HARDWARE & RIG',
    icon: '⌨',
    rarity: 'EPIC',
    quantity: 'x1',
    effect: 'Delivers responsive 55g tactile feedback and low-latency actuation for sustained marathon coding sessions.',
    flavorText: 'Custom 75% mechanical layout equipped with factory-lubed tactile switches, sound-dampening foam, and PBT double-shot keycaps.',
    associatedProject: 'Engineering Architecture & Prose'
  },
  {
    id: 'gear-mouse',
    name: 'High-DPI Precision Mouse',
    category: 'WORKSTATION',
    categoryLabel: 'HARDWARE & RIG',
    icon: '🖱',
    rarity: 'RARE',
    quantity: 'x1',
    effect: 'Grants sub-millimeter cursor precision for CSS layout alignment and multi-monitor navigational sweeps.',
    flavorText: 'Ergonomic optical sensor tuned to 3,200 DPI with low-friction PTFE skates and programmable thumb macros for workspace switching.',
    associatedProject: 'UI Prototyping & Inspection'
  },
  {
    id: 'gear-cans',
    name: 'Studio Monitoring Headphones',
    category: 'WORKSTATION',
    categoryLabel: 'HARDWARE & RIG',
    icon: '🎧',
    rarity: 'EPIC',
    quantity: 'x1',
    effect: 'Isolates developer cognitive focus through passive noise isolation and acoustic soundstage clarity.',
    flavorText: 'Over-ear studio monitoring cans calibrated with a flat frequency response curve for web audio balancing and deep-flow sessions.',
    associatedProject: 'Audio Direction & Sound Synthesis'
  },

  // Shell & Editor
  {
    id: 'env-linux-wsl',
    name: 'Linux WSL2 / Ubuntu Shell',
    category: 'DEV_ENV',
    categoryLabel: 'SHELL & EDITOR',
    icon: '🐧',
    rarity: 'LEGENDARY',
    quantity: 'x1',
    effect: 'Executes native ELF-64 POSIX toolchains, system daemons, and bash automation scripts on Windows host.',
    flavorText: 'Hardened Linux subsystem paired with zsh, Oh My Posh prompt, and unified cross-platform path mapping for seamless virtualization.',
    associatedProject: 'AI Inference & Systems Automation'
  },
  {
    id: 'env-nvim-vscode',
    name: 'Neovim & VS Code Hybrid',
    category: 'DEV_ENV',
    categoryLabel: 'SHELL & EDITOR',
    icon: '💻',
    rarity: 'LEGENDARY',
    quantity: 'x1',
    effect: 'Combines blazing modal editing ergonomics with rich Language Server Protocol (LSP) AST intellisense.',
    flavorText: 'Heavily tuned environment featuring Vim keybindings, Treesitter semantic highlights, and custom Persona theme palette.',
    associatedProject: 'Daily Core Engineering & Refactoring'
  },
  {
    id: 'env-starship',
    name: 'Starship Cross-Shell Prompt',
    category: 'DEV_ENV',
    categoryLabel: 'SHELL & EDITOR',
    icon: '🚀',
    rarity: 'RARE',
    quantity: 'x1',
    effect: 'Visualizes git branch status, active package versions, and command duration directly in prompt line.',
    flavorText: 'Ultra-fast Rust-powered shell prompt that gives instant situational awareness before executing git actions or builds.',
    associatedProject: 'Terminal Workflow Optimization'
  },
  {
    id: 'env-powershell',
    name: 'PowerShell 7 Hardened Console',
    category: 'DEV_ENV',
    categoryLabel: 'SHELL & EDITOR',
    icon: '⚡',
    rarity: 'RARE',
    quantity: 'x1',
    effect: 'Drives object-oriented pipeline scripting, environment synchronization, and task automation on Windows.',
    flavorText: 'Modern cross-platform PS Core shell configured with PSReadLine syntax prediction and posh-git integration.',
    associatedProject: 'Local Build Systems & Task Orchestration'
  },

  // Containers & CI/CD
  {
    id: 'ops-docker',
    name: 'Docker Container Engine',
    category: 'DEPLOY_OPS',
    categoryLabel: 'CONTAINERS & CI/CD',
    icon: '🐳',
    rarity: 'LEGENDARY',
    quantity: 'x8',
    effect: 'Encapsulates dependencies into reproducible container images, eliminating "works on my machine" anomalies.',
    flavorText: 'Multi-stage Docker builds orchestrating microservices, model weights, and web runtime environments in isolated cgroups.',
    associatedProject: 'AI Impact Predictor & Friday Microservices'
  },
  {
    id: 'ops-gh-actions',
    name: 'GitHub Actions CI/CD Pipeline',
    category: 'DEPLOY_OPS',
    categoryLabel: 'CONTAINERS & CI/CD',
    icon: '⚙',
    rarity: 'EPIC',
    quantity: 'x12',
    effect: 'Automates linting, type validation, security scanning, and atomic deployment on every push to main.',
    flavorText: 'Automated workflow pipelines executing Matrix builds, artifact compression, and zero-downtime edge distribution.',
    associatedProject: 'Persona Portfolio & Open Source Repositories'
  },
  {
    id: 'ops-vercel-edge',
    name: 'Vercel & Cloudflare Edge Fabric',
    category: 'DEPLOY_OPS',
    categoryLabel: 'CONTAINERS & CI/CD',
    icon: '🌐',
    rarity: 'EPIC',
    quantity: 'x4',
    effect: 'Routes worldwide requests through globally distributed edge nodes with sub-50ms TTFB and automatic HTTPS.',
    flavorText: 'Decentralized serverless edge network handling static asset caching, header security policies, and 404 rewriting.',
    associatedProject: 'Portfolio Production Hosting'
  },

  // Probes & Audit
  {
    id: 'audit-postman',
    name: 'Postman & Bruno API Probes',
    category: 'INSPECTION',
    categoryLabel: 'PROBES & AUDIT',
    icon: '📡',
    rarity: 'RARE',
    quantity: 'x30',
    effect: 'Dispatches automated REST payloads, monitors latency percentiles, and verifies HTTP status contracts.',
    flavorText: 'Pre-configured test collections verifying JSON schemas, authentication tokens, and API error codes across endpoints.',
    associatedProject: 'REST API & Microservice Integration'
  },
  {
    id: 'audit-lighthouse',
    name: 'Lighthouse Telemetry Scanner',
    category: 'INSPECTION',
    categoryLabel: 'PROBES & AUDIT',
    icon: '🚨',
    rarity: 'EPIC',
    quantity: 'x100',
    effect: 'Benchmarks Performance, Accessibility, Best Practices, and SEO against Core Web Vitals targets.',
    flavorText: 'Automated auditing module reporting 100/100 scores across DOM depth, script execution time, and color contrast.',
    associatedProject: 'Performance Tuning & Auditing'
  },
  {
    id: 'audit-git-lfs',
    name: 'Git LFS & Cryptographic Keyring',
    category: 'INSPECTION',
    categoryLabel: 'PROBES & AUDIT',
    icon: '🔑',
    rarity: 'LEGENDARY',
    quantity: 'x1',
    effect: 'Signs commits with Ed25519 GPG keys and manages multi-gigabyte neural network weights via pointers.',
    flavorText: 'Secure hardware-backed cryptographic credentials verifying source integrity across open-source collaborations.',
    associatedProject: 'Security & Open-Source Verification'
  }
];
