export interface ProfileData {
  name: string;
  codename: string;
  role: string;
  headline: string;
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
  codename: 'AI BUILDER // S.E.E.S. ARCHIVE',
  role: 'Full-Stack Developer & AI Builder',
  headline: 'Undergraduate at NIT Rourkela',
  level: 99,
  hp: 999,
  sp: 999,
  arcana: 'THE FOOL // 0',
  affiliation: 'NIT ROURKELA // S.E.E.S. OPERATIVE',
  location: 'Rourkela, India',
  status: 'SHIPPING AFTER DARK // ACTIVE BUILDER',
  summary:
    "I'm Pritesh Jena, an undergraduate at NIT Rourkela. I enjoy building software that turns ambitious ideas into usable systems—from AI-assisted scientific discovery and intelligent model routing to computer vision, emergency disaster intelligence, and full-stack products.",
  biography: [
    'Undergraduate engineering student at the National Institute of Technology, Rourkela (NIT Rourkela), building across the intersection of intelligent systems, machine learning, and full-stack product engineering.',
    'Lead Systems Architect, Full-Stack & AI Integration Engineer for SALVUS (Smart India Hackathon 2026), architecting mission-critical emergency coordination pipelines, FastAPI microservices, and 3-tier AI triage waterfalls with human-authorized safety locks.',
    'Author of Project AETHON, an independent scientific research prototype investigating unsupervised anomaly detection and spectrotemporal normality modeling to surface uncatalogued astronomical radio transients.',
    'Creator of RouteMind (an intelligent multi-model LLM router evaluating query intent across speed, cost, and quality trade-offs) and Project Zogan (YOLO-based elephant detection, ByteTrack tracking, and geofenced risk heuristics for wildlife conservation).',
    'Passionate about sci-fi inspired interfaces, developer orchestration tooling, and turning complex computational systems into memorable, interactive software experiences.'
  ],
  philosophy: [
    {
      title: 'OPEN DISCOVERY & SYSTEMS CURIOSITY',
      statement: 'Software reaches its peak when tackling difficult, open-ended discovery problems—whether routing between AI model trade-offs or finding unknown spectral anomalies in radio astronomy.'
    },
    {
      title: 'HUMAN-CENTERED COGNITIVE ARCHITECTURE',
      statement: 'AI should empower human agency rather than replace it. From human-authorized emergency response in SALVUS to explainable model routing in RouteMind, intelligent systems must be transparent and auditable.'
    },
    {
      title: 'NARRATIVE & INTERACTIVE CRAFTSMANSHIP',
      statement: 'Code and design are two halves of the same story. Interfaces should feel alive, atmospheric, and deliberate—transforming technical utility into an unforgettable journey.'
    }
  ],
  attributes: [
    { label: 'PRIMARY DISCIPLINE', value: 'FULL-STACK & AI SYSTEMS', rating: 'S-RANK' },
    { label: 'CORE WEAPON', value: 'FASTAPI + PYTHON + REACT 19', rating: 'MASTER' },
    { label: 'MACHINE LEARNING', value: 'YOLO + PYTORCH + ANOMALY ML', rating: 'ACTIVE' },
    { label: 'INTELLIGENT ROUTING', value: 'LLM ORCHESTRATION & AGENTS', rating: 'EXPERT' },
    { label: 'INSTITUTION', value: 'NIT ROURKELA (UNDERGRADUATE)', rating: 'VERIFIED' }
  ]
};
