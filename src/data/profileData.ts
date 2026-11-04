export interface ProfileData {
  name: string;
  codename: string;
  role: string;
  level: number;
  hp: number;
  sp: number;
  arcana: string;
  affiliation: string;
  location: string;
  status: string;
  summary: string;
  biography: string[];
  philosophy: {
    title: string;
    statement: string;
  }[];
  attributes: {
    label: string;
    value: string;
    rating: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  name: 'PRITESH JENA',
  codename: 'INCARNATION // DEV',
  role: 'Full-Stack Developer & Software Engineering Student',
  level: 99,
  hp: 999,
  sp: 999,
  arcana: 'THE FOOL // 0',
  affiliation: 'S.E.E.S. // OPEN SOURCE OPERATIVE',
  location: 'India',
  status: 'ACTIVE CONTRIBUTOR',
  summary:
    'Engineering student, open-source builder, and creative technologist. Specializing in high-performance frontend interfaces, responsive design architectures, and intelligent software tooling. Translates complex system requirements into fluid, cinematic digital experiences.',
  biography: [
    'Embarked on the engineering path with a fascination for algorithmic execution, component-driven UI architectures, and interactive storytelling.',
    'Selected as an open-source contributor in GirlScript Summer of Code (GSSoC 2026), collaborating with engineers globally and securing over 10 merged production pull requests.',
    'Engineered full-stack and machine-learning projects including DevLore (a stateful developer quiz platform) and AI Impact Predictor (predictive code risk analysis).',
    'Driven by an obsession for design authenticity, micro-interactions, and creating software that feels like an unforgettable journey rather than a sterile interface.'
  ],
  philosophy: [
    {
      title: 'DESIGN AS NARRATIVE',
      statement: 'Every interface is a story. User journeys should evoke atmosphere, clarity, and deliberate momentum rather than passive consumption.'
    },
    {
      title: 'ZERO-COMPROMISE PERFORMANCE',
      statement: 'Aesthetic complexity must never sacrifice runtime speed. Fluid 60+ FPS animations, modular architecture, and lean asset delivery are baseline necessities.'
    },
    {
      title: 'OPEN SOURCE ETHOS',
      statement: 'Software reaches its true potential through community collaboration, transparent codebases, and rigorous peer review.'
    }
  ],
  attributes: [
    { label: 'DISCIPLINE', value: 'FULL-STACK DEVELOPMENT', rating: 'S-RANK' },
    { label: 'CORE WEAPON', value: 'REACT 19 + TYPESCRIPT + VITE', rating: 'MASTER' },
    { label: 'SECONDARY', value: 'PYTHON + FLASK + ML HEURISTICS', rating: 'EXPERT' },
    { label: 'PASSIVE', value: 'PIXEL-PERFECT UI / ANIMATION', rating: 'FABLE' },
    { label: 'TACTICAL', value: 'SYSTEM DESIGN & OPEN SOURCE', rating: 'ACTIVE' }
  ]
};

