export interface InventoryItem {
  id: string;
  name: string;
  category: 'RUNTIMES' | 'FRAMEWORKS' | 'BACKEND' | 'AI_ML' | 'DEV_TOOLS' | 'HARDWARE';
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
  { id: 'FRAMEWORKS', label: 'FRAMEWORKS' },
  { id: 'RUNTIMES', label: 'RUNTIMES & LANG' },
  { id: 'BACKEND', label: 'BACKEND & DATA' },
  { id: 'AI_ML', label: 'AI & HEURISTICS' },
  { id: 'DEV_TOOLS', label: 'DEV ARSENAL' },
  { id: 'HARDWARE', label: 'WORKSPACE' }
] as const;

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'item-react',
    name: 'React 19 Core Prism',
    category: 'FRAMEWORKS',
    categoryLabel: 'FRAMEWORKS',
    icon: '⚛',
    rarity: 'LEGENDARY',
    quantity: 'x99',
    effect: 'Empowers instantaneous virtual DOM updates and fluid 60fps component rendering.',
    flavorText: 'An iridescent blue crystal vibrating with reactive state frequencies. Mastered across multiple enterprise-grade interfaces.',
    associatedProject: 'DevLore, Portfolio & Chronicles of Fate'
  },
  {
    id: 'item-vite',
    name: 'Vite Speed Ring',
    category: 'FRAMEWORKS',
    categoryLabel: 'FRAMEWORKS',
    icon: '⚡',
    rarity: 'EPIC',
    quantity: 'x99',
    effect: 'Reduces module bundling latency to sub-second speeds using native ES modules.',
    flavorText: 'A lightweight aerodynamic ring that accelerates build and compilation cycles beyond human perception.',
    associatedProject: 'All Modern Frontend Archives'
  },
  {
    id: 'item-framer',
    name: 'Framer Motion Spring Coil',
    category: 'FRAMEWORKS',
    categoryLabel: 'FRAMEWORKS',
    icon: '◈',
    rarity: 'LEGENDARY',
    quantity: 'x45',
    effect: 'Injects real-world spring physics, drag inertia, and cinematic layout transitions.',
    flavorText: 'Coiled with kinetic energy that smooths every user touchpoint into game-grade motion.',
    associatedProject: 'Persona 3 Portfolio & Chronicles of Fate'
  },
  {
    id: 'item-ts',
    name: 'TypeScript Aegis Shield',
    category: 'RUNTIMES',
    categoryLabel: 'RUNTIMES & LANG',
    icon: '🛡',
    rarity: 'LEGENDARY',
    quantity: 'x99',
    effect: 'Nullifies runtime TypeError anomalies before code execution reaches production.',
    flavorText: 'A reinforced shield etched with compile-time type definitions and static analysis runes.',
    associatedProject: 'Full-Stack Enterprise Applications'
  },
  {
    id: 'item-py',
    name: 'Pythonic Serpent Staff',
    category: 'RUNTIMES',
    categoryLabel: 'RUNTIMES & LANG',
    icon: '🐍',
    rarity: 'EPIC',
    quantity: 'x80',
    effect: 'Executes rapid computational logic, neural inference, and OS automation scripts.',
    flavorText: 'A flexible staff revered by data engineers and automation sorcerers alike.',
    associatedProject: 'AI Impact Predictor, Friday, Elephant Detector'
  },
  {
    id: 'item-flask',
    name: 'Flask Micro Flask',
    category: 'BACKEND',
    categoryLabel: 'BACKEND & DATA',
    icon: '🧪',
    rarity: 'RARE',
    quantity: 'x20',
    effect: 'Brew lightweight REST API endpoints with minimal overhead and rapid inference.',
    flavorText: 'A clean glass vial containing concentrated WSGI server spirits.',
    associatedProject: 'AI Impact Predictor API'
  },
  {
    id: 'item-node',
    name: 'Node Runtime Battery',
    category: 'BACKEND',
    categoryLabel: 'BACKEND & DATA',
    icon: '🟢',
    rarity: 'EPIC',
    quantity: 'x60',
    effect: 'Powers asynchronous non-blocking event-driven backend microservices.',
    flavorText: 'A dense energy cell that runs JavaScript outside the confines of browser sandboxes.',
    associatedProject: 'Serverless Edge & API Gateways'
  },
  {
    id: 'item-yolo',
    name: 'YOLO Computer Vision Scope',
    category: 'AI_ML',
    categoryLabel: 'AI & HEURISTICS',
    icon: '👁',
    rarity: 'EPIC',
    quantity: 'x15',
    effect: 'Detects and tracks objects across real-time video frames in a single forward pass.',
    flavorText: 'High-precision optical sensory module capable of discerning wildlife through thick forest canopy.',
    associatedProject: 'Elephant Detector'
  },
  {
    id: 'item-scikit',
    name: 'scikit-learn Matrix Tablet',
    category: 'AI_ML',
    categoryLabel: 'AI & HEURISTICS',
    icon: '📊',
    rarity: 'RARE',
    quantity: 'x25',
    effect: 'Extracts feature vectors and calculates regression risk curves.',
    flavorText: 'Inscribed with statistical formulas that predict future software regressions.',
    associatedProject: 'AI Impact Predictor'
  },
  {
    id: 'item-git',
    name: 'Git Chrono Time-Turner',
    category: 'DEV_TOOLS',
    categoryLabel: 'DEV ARSENAL',
    icon: '⌛',
    rarity: 'LEGENDARY',
    quantity: 'x99',
    effect: 'Allows branching into alternate timelines and cherry-picking perfect commits.',
    flavorText: 'An indispensable artifact for any developer operating across parallel project timelines.',
    associatedProject: 'GirlScript Summer of Code (GSSoC 2026)'
  },
  {
    id: 'item-vscode',
    name: 'VS Code Command Deck',
    category: 'DEV_TOOLS',
    categoryLabel: 'DEV ARSENAL',
    icon: '💻',
    rarity: 'LEGENDARY',
    quantity: 'x1',
    effect: 'Central nervous system for drafting syntax, debugging runtimes, and linting.',
    flavorText: 'Customized with dark themes, keybindings, and extensions honed through thousands of hours of development.',
    associatedProject: 'Every Active Engineering Operation'
  },
  {
    id: 'item-hardware',
    name: 'Dual Display Battle Rig',
    category: 'HARDWARE',
    categoryLabel: 'WORKSPACE',
    icon: '🖥',
    rarity: 'RARE',
    quantity: 'x1',
    effect: 'Provides expansive desktop real estate for simultaneous terminal, browser, and IDE workflows.',
    flavorText: 'High refresh workstation calibrated for uninterrupted multi-threaded developer focus.',
    associatedProject: 'Local Engineering Command'
  }
];

