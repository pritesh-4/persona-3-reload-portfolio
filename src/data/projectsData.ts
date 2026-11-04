export interface ProjectMission {
  id: string;
  code: string;
  title: string;
  codename: string;
  category: 'FRONTEND' | 'AI / ML' | 'SYSTEMS' | 'CREATIVE';
  status: 'COMPLETED' | 'ACTIVE' | 'ARCHIVED';
  difficulty: 'RANK S' | 'RANK A' | 'RANK B';
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  repoUrl: string;
  demoUrl?: string;
  targetArcana: string;
}

export const PROJECTS_DATA: ProjectMission[] = [
  {
    id: 'quest-01',
    code: 'M-001',
    title: 'DEVLORE',
    codename: 'KNOWLEDGE COMPILATION PROTOCOL',
    category: 'FRONTEND',
    status: 'COMPLETED',
    difficulty: 'RANK A',
    summary: 'An advanced interactive quiz compilation platform engineered with custom React hooks, state synchronization, and RESTful question pipelines.',
    problem: 'Conventional quiz platforms frequently lose state during network fluctuations, suffer from high latency, and lack engaging micro-feedback.',
    solution: 'Designed an asynchronous state caching pipeline with custom React hooks, instantaneous feedback loops, timed response scoring, and responsive modular components.',
    features: [
      'Asynchronous REST API question dispatch with category filters',
      'Local state caching ensuring progress recovery upon browser refresh',
      'Precision timer with score multiplier calculation',
      'Detailed post-quiz diagnostic breakdown and review analytics'
    ],
    techStack: ['React 19', 'Vite', 'Axios', 'JavaScript ES6+', 'CSS3 Custom Tokens'],
    repoUrl: 'https://github.com/pritesh-4/DevLore',
    demoUrl: 'https://devlore-ebon.vercel.app/',
    targetArcana: 'THE MAGICIAN'
  },
  {
    id: 'quest-02',
    code: 'M-002',
    title: 'AI IMPACT PREDICTOR',
    codename: 'POST-DEPLOYMENT RISK HEURISTIC',
    category: 'AI / ML',
    status: 'ACTIVE',
    difficulty: 'RANK S',
    summary: 'Intelligent predictive layer utilizing machine learning heuristics to analyze proposed code alterations and forecast deployment risks before compiling.',
    problem: 'Large codebase refactoring can produce unexpected downstream regressions and deployment side-effects that pass unit tests but impact runtime stability.',
    solution: 'Engineered a supervised machine learning heuristic pipeline in Python/scikit-learn paired with a Flask REST microservice and interactive React analytics dashboard.',
    features: [
      'Automated code metrics and dependency impact assessment',
      'Heuristic risk scoring categorized by severity and module coupling',
      'Dynamic risk curves visualized with Chart.js and React',
      'RESTful inference endpoints with sub-100ms response latency'
    ],
    techStack: ['Python', 'Flask', 'scikit-learn', 'React', 'Chart.js', 'REST APIs'],
    repoUrl: 'https://github.com/pritesh-4/AI-Impact-Predictor',
    demoUrl: 'https://ai-impact-predictor.vercel.app',
    targetArcana: 'JUDGEMENT'
  },
  {
    id: 'quest-03',
    code: 'M-003',
    title: 'CHRONICLES OF FATE',
    codename: 'STAR STREAM ARCHIVE',
    category: 'CREATIVE',
    status: 'COMPLETED',
    difficulty: 'RANK S',
    summary: 'An immersive narrative developer portfolio inspired by Omniscient Reader\'s Viewpoint, transforming achievements into timelines and projects into scenarios.',
    problem: 'Standard developer portfolios often feel dry, generic, and fail to convey the developer\'s creative ambition, storytelling capability, and UI passion.',
    solution: 'Created an unforgettable interactive narrative with Framer Motion spring physics, ambient audio orchestration, constellation unlock trees, and responsive system windows.',
    features: [
      'Interactive scenario entry and unlockable hidden routes',
      'Custom audio controller with continuous background soundtrack',
      'Dynamic constellation timeline revealing milestones on scroll',
      'Zero external UI library dependency; hand-crafted bespoke CSS styling'
    ],
    techStack: ['React', 'Vite', 'Framer Motion', 'Vanilla CSS3', 'Vercel Edge'],
    repoUrl: 'https://github.com/pritesh-4/Chronicles-of-Fate',
    demoUrl: 'https://chronicle-of-fate-portfolio.vercel.app/',
    targetArcana: 'THE STAR'
  },
  {
    id: 'quest-04',
    code: 'M-004',
    title: 'ELEPHANT DETECTOR',
    codename: 'WILDLIFE TRACKING PROTOCOL',
    category: 'AI / ML',
    status: 'COMPLETED',
    difficulty: 'RANK A',
    summary: 'Computer vision deep learning detection pipeline engineered to detect and track wild elephants near human corridors to prevent human-wildlife conflict.',
    problem: 'Human-wildlife conflicts in agrarian areas necessitate real-time early warning detection systems capable of running on camera feeds under variable lighting.',
    solution: 'Trained and optimized an object detection model with OpenCV and YOLO neural architectures to monitor video streams and generate automated bounding detections.',
    features: [
      'Real-time object bounding box detection and confidence telemetry',
      'Optimized frame extraction and noise reduction preprocessing',
      'Automated alert triggering upon perimeter threshold crossing',
      'High accuracy across adverse daylight and forest canopy conditions'
    ],
    techStack: ['Python', 'OpenCV', 'YOLO', 'Deep Learning', 'NumPy'],
    repoUrl: 'https://github.com/pritesh-4/Elephant_detector',
    targetArcana: 'THE CHARIOT'
  },
  {
    id: 'quest-05',
    code: 'M-005',
    title: 'FRIDAY ASSISTANT',
    codename: 'AUTONOMOUS VOICE AGENT',
    category: 'SYSTEMS',
    status: 'ACTIVE',
    difficulty: 'RANK B',
    summary: 'Personal desktop voice assistant engineered in Python to execute voice commands, automate repetitive system workflows, and parse web inquiries.',
    problem: 'Switching contexts between code editing, searching technical docs, and running desktop routines disrupts engineering focus and productivity.',
    solution: 'Constructed an event-driven voice recognition daemon capable of processing natural voice commands, opening applications, summarizing queries, and running shell macros.',
    features: [
      'Offline & online speech-to-text recognition pipeline',
      'Automated desktop process launching, volume control, and browser tasks',
      'Real-time voice feedback using synthesized text-to-speech',
      'Modular command plugin architecture for adding custom developer tasks'
    ],
    techStack: ['Python', 'SpeechRecognition', 'pyttsx3', 'OS Automation', 'NLP'],
    repoUrl: 'https://github.com/pritesh-4/Friday',
    targetArcana: 'THE EMPEROR'
  }
];

