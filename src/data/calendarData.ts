export type MoonPhase =
  | 'FULL MOON'
  | 'HALF MOON'
  | 'CRESCENT'
  | 'NEW MOON'
  | 'DARK HOUR';

export type MilestoneCategory =
  | 'HACKATHON'
  | 'AI_MODEL'
  | 'PRODUCTION'
  | 'RESEARCH'
  | 'ACADEMIC'
  | 'CREATIVE';

export interface CalendarMilestone {
  id: string;
  date: string;
  displayDate: string;
  year: number;
  monthIndex: number; // 1 to 12 (or 0 for general year)
  monthLabel: string;
  moonPhase: MoonPhase;
  moonIcon: string;
  title: string;
  category: MilestoneCategory;
  categoryLabel: string;
  summary: string;
  technicalDetails: string;
  relatedProject: string;
  projectUrl: string;
  badge: string;
}

export const CALENDAR_YEARS = [2026, 2025, 2024, 2023] as const;

export const CALENDAR_MILESTONES: CalendarMilestone[] = [
  {
    id: 'cal-2026-salvus',
    date: '2026.09',
    displayDate: 'SEPTEMBER 2026',
    year: 2026,
    monthIndex: 9,
    monthLabel: 'SEP',
    moonPhase: 'FULL MOON',
    moonIcon: '🌕',
    title: 'SALVUS Emergency Architecture Finalized (SIH 2026)',
    category: 'HACKATHON',
    categoryLabel: 'Hackathon Leadership',
    summary: 'Lead Systems Architect on AI-assisted disaster response platform for real-time dispatch and casualty triage.',
    technicalDetails: 'Devised real-time distance and severity weighting algorithm for emergency vehicle dispatch, dynamic routing calculations, and decoupled React 19 incident queues.',
    relatedProject: 'SIH-2026---SALVUS',
    projectUrl: 'https://sih-2026-salvus.vercel.app/',
    badge: 'LEAD SYSTEMS ARCHITECT'
  },
  {
    id: 'cal-2026-aethon',
    date: '2026.08',
    displayDate: 'AUGUST 2026',
    year: 2026,
    monthIndex: 8,
    monthLabel: 'AUG',
    moonPhase: 'HALF MOON',
    moonIcon: '🌓',
    title: 'Project AETHON Anomaly Detection Specification',
    category: 'RESEARCH',
    categoryLabel: 'Multimodal Research Prototype',
    summary: 'Formulated research prototype specs for multimodal deep learning time-frequency sensor anomaly detection.',
    technicalDetails: 'Authored technical architecture combining ResNet-50 and BiLSTM feature encoders with an interactive high-contrast telemetry dashboard.',
    relatedProject: 'Project_Aethon',
    projectUrl: 'https://aethon-eight-chi.vercel.app/',
    badge: 'RESEARCH PROTOTYPE'
  },
  {
    id: 'cal-2025-zogan',
    date: '2025.10',
    displayDate: 'OCTOBER 2025',
    year: 2025,
    monthIndex: 10,
    monthLabel: 'OCT',
    moonPhase: 'DARK HOUR',
    moonIcon: '⏳',
    title: 'Project Zogan YOLOv8 Edge Vision Model Trained',
    category: 'AI_MODEL',
    categoryLabel: 'Computer Vision & Edge ML',
    summary: 'Trained custom YOLOv8 model reaching 88.2% mAP@50 on 456 annotated training images for wildlife monitoring.',
    technicalDetails: 'Integrated ByteTrack multi-object tracking with Kalman filter velocity prediction and real-time bounding box HUD rendering.',
    relatedProject: 'Project_Zogan',
    projectUrl: 'https://github.com/pritesh-4/Project_Zogan',
    badge: '88.2% mAP@50 ACCURACY'
  },
  {
    id: 'cal-2025-friday',
    date: '2025.08',
    displayDate: 'AUGUST 2025',
    year: 2025,
    monthIndex: 8,
    monthLabel: 'AUG',
    moonPhase: 'CRESCENT',
    moonIcon: '🌙',
    title: 'F.R.I.D.A.Y. Voice Assistant & WebGL Shader Orb',
    category: 'PRODUCTION',
    categoryLabel: 'Conversational AI Systems',
    summary: 'Constructed personal virtual assistant exploring voice-first interaction and cognitive workflow memory.',
    technicalDetails: 'Developed 4-state audio-reactive WebGL fragment shader Orb and ChromaDB vector store for conversational message recall.',
    relatedProject: 'Project-FRIDAY',
    projectUrl: 'https://friday-assistant-lake.vercel.app/',
    badge: 'WEBGL SHADER ENGINE'
  },
  {
    id: 'cal-2025-routemind',
    date: '2025.07',
    displayDate: 'JULY 2025',
    year: 2025,
    monthIndex: 7,
    monthLabel: 'JUL',
    moonPhase: 'FULL MOON',
    moonIcon: '🌕',
    title: 'RouteMind Intelligent AI Model Router Live Deployment',
    category: 'PRODUCTION',
    categoryLabel: 'Full-Stack AI Integration',
    summary: 'Built and deployed real-time query analyzer routing prompts across OpenAI and Google Gemini APIs.',
    technicalDetails: 'Implemented token-cost optimization algorithms, intent classification heuristics, and latency benchmarking telemetry.',
    relatedProject: 'Project_RouteMind',
    projectUrl: 'https://routemind-ai-app.vercel.app/',
    badge: 'DUAL LLM DISPATCH'
  },
  {
    id: 'cal-2025-chronicle',
    date: '2025.06',
    displayDate: 'JUNE 2025',
    year: 2025,
    monthIndex: 6,
    monthLabel: 'JUN',
    moonPhase: 'NEW MOON',
    moonIcon: '🌑',
    title: 'The Last Chronicle Narrative Portfolio Launched',
    category: 'CREATIVE',
    categoryLabel: 'Creative Web Development',
    summary: 'Created story-driven interactive developer portfolio inspired by Omniscient Reader\'s Viewpoint.',
    technicalDetails: 'Implemented scenario milestones, interactive character dialogues, and kinetic Framer Motion transitions deployed on Vercel.',
    relatedProject: 'Project_Yumei',
    projectUrl: 'https://pritesh-jena-portfolio.vercel.app/',
    badge: 'NARRATIVE PORTFOLIO'
  },
  {
    id: 'cal-2024-devlore',
    date: '2024.06',
    displayDate: 'JUNE 2024',
    year: 2024,
    monthIndex: 6,
    monthLabel: 'JUN',
    moonPhase: 'HALF MOON',
    moonIcon: '🌓',
    title: 'DevLore Gamified Knowledge Platform Released',
    category: 'PRODUCTION',
    categoryLabel: 'Full-Stack Web App',
    summary: 'Developed customizable developer quiz platform with live score analytics and dynamic category filtering.',
    technicalDetails: 'Consumed Open Trivia DB REST endpoints, built local session analytics in localStorage, and established clean reactive state.',
    relatedProject: 'Project_DevLore',
    projectUrl: 'https://devlore-ebon.vercel.app/',
    badge: 'INTERACTIVE QUIZ ENGINE'
  },
  {
    id: 'cal-2023-nit',
    date: '2023.08',
    displayDate: 'AUGUST 2023',
    year: 2023,
    monthIndex: 8,
    monthLabel: 'AUG',
    moonPhase: 'NEW MOON',
    moonIcon: '🌑',
    title: 'Commenced Undergraduate Studies at NIT Rourkela',
    category: 'ACADEMIC',
    categoryLabel: 'Academic Foundation',
    summary: 'Enrolled in engineering undergraduate program at National Institute of Technology, Rourkela.',
    technicalDetails: 'Immersed in computer science theory, discrete mathematics, algorithmic complexity analysis, and C/C++ memory management.',
    relatedProject: 'NIT Rourkela Academics',
    projectUrl: 'https://www.nitrkl.ac.in/',
    badge: 'CAMPUS ENROLLMENT'
  },
  {
    id: 'cal-2023-codegeass',
    date: '2023.01',
    displayDate: 'JANUARY 2023',
    year: 2023,
    monthIndex: 1,
    monthLabel: 'JAN',
    moonPhase: 'CRESCENT',
    moonIcon: '🌙',
    title: 'Code Geass Web Tribute & CSS3 Animation Study',
    category: 'CREATIVE',
    categoryLabel: 'Early Exploratory Development',
    summary: 'Early interactive HTML5 and CSS3 keyframe experiment paying homage to Code Geass.',
    technicalDetails: 'Explored CSS pseudo-elements, transform matrix calculations, and responsive layouts without modern utility frameworks.',
    relatedProject: 'code-Geass-fan-page-',
    projectUrl: 'https://github.com/pritesh-4/code-Geass-fan-page-',
    badge: 'EARLY CODEBASE'
  }
];
