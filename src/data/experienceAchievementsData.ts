/**
 * Persona 3 Reload Portfolio — Experience & Achievements Data Model
 * 
 * FIELD RECORD: Professional experience, open-source participation,
 * leadership, sponsorship outreach, astrophysics exploration, and pursuits.
 * 
 * Truth & Integrity Guidelines:
 * - Second-year Mining Engineering Undergraduate at NIT Rourkela.
 * - Genuine roles, qualitative accuracy, no fabricated metrics or titles.
 * - Distinct from EQUIP (which showcases engineering software projects).
 */

export interface PipelineStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  techFocus: string;
}

export interface ExperienceLink {
  label: string;
  url: string;
  isExternal?: boolean;
  type?: 'website' | 'linkedin' | 'github' | 'reference' | 'internal';
}

export interface ExperienceItem {
  id: string;
  category: 'INDUSTRY EXPERIENCE' | 'OPEN SOURCE' | 'LEADERSHIP & EVENTS' | 'SPONSORSHIP & PARTNERSHIPS' | 'SCIENTIFIC RESEARCH' | 'CITIZEN SCIENCE' | 'BEYOND ENGINEERING';
  categoryCode: string;
  role: string;
  organization: string;
  subOrganization?: string;
  location?: string;
  period?: string;
  statusBadge: string;
  headline: string;
  summary: string;
  responsibilities: string[];
  keyHighlights?: string[];
  pipelineStages?: PipelineStage[];
  privacySafeguards?: string[];
  skillsAndPractices?: string[];
  links: ExperienceLink[];
  ratingBadge?: string;
  supportingQuote?: string;
}

export const HOARDSPACE_EXPERIENCE: ExperienceItem = {
  id: 'exp-hoardspace',
  category: 'INDUSTRY EXPERIENCE',
  categoryCode: 'FIELD-01 // PRODUCTION AI',
  role: 'AI ENGINEER',
  organization: 'HoardSpace Bookings Pvt. Ltd.',
  subOrganization: 'OOH / DOOH Advertising Technology Marketplace',
  location: 'Rourkela, Odisha, India',
  period: 'ACTIVE ENGAGEMENT',
  statusBadge: 'USER-CONFIRMED ROLE',
  headline: 'CCTV-Based Computer Vision & Audience Footfall Analytics',
  summary:
    'Developing a computer-vision-based audience analytics system that transforms CCTV observations into structured footfall insights for outdoor advertising. The system analyses pedestrian movement, captures time-based traffic patterns and generates audience reports to help hoarding buyers better understand location performance and potential campaign exposure.',
  responsibilities: [
    'Designing end-to-end computer vision pipelines to ingest camera streams from physical advertising hoarding locations.',
    'Implementing pedestrian detection and spatial counting algorithms from continuous video frames.',
    'Associating detections with temporal metadata to aggregate footfall counts by hour, date, and peak traffic windows.',
    'Generating aggregated audience demographic estimates, including gender presentation where supported by the validated model.',
    'Structuring multi-dimensional telemetry into clear, digestible analytical reports for out-of-home advertising buyers.',
  ],
  pipelineStages: [
    {
      step: '01',
      title: 'VISUAL INPUT',
      subtitle: 'CCTV Stream Acquisition',
      description: 'Acquisition and video frame ingestion from camera feeds positioned at high-visibility outdoor advertising locations.',
      techFocus: 'Stream Ingestion & Frame Preprocessing',
    },
    {
      step: '02',
      title: 'COMPUTER VISION',
      subtitle: 'Pedestrian Detection & Counting',
      description: 'Real-time pedestrian detection, bounding, and cross-line traversal counting across observed frames.',
      techFocus: 'Object Detection & Motion Counting',
    },
    {
      step: '03',
      title: 'TEMPORAL ANALYTICS',
      subtitle: 'Time-Window Traffic Patterns',
      description: 'Aggregation of pedestrian traffic volume indexed by hour, day of week, and seasonal exposure windows.',
      techFocus: 'Time-Series Aggregation & Windowing',
    },
    {
      step: '04',
      title: 'AUDIENCE INSIGHTS',
      subtitle: 'Demographic Distribution Estimates',
      description: 'Statistical estimation of aggregate audience demographic patterns, including gender distribution where supported.',
      techFocus: 'Aggregate Demographic Estimation',
    },
    {
      step: '05',
      title: 'REPORTING PIPELINE',
      subtitle: 'Structured Buyer Intelligence',
      description: 'Synthesis of raw observational metrics into executive footfall dossiers and exposure potential reports for campaign buyers.',
      techFocus: 'Automated Intelligence Dossiers',
    },
  ],
  privacySafeguards: [
    'Aggregate Statistics Only: The system produces statistical counts and aggregate distributions rather than individual identities.',
    'Zero Biometric Identification: No facial recognition, identity matching, or personal identifiable information (PII) is captured or retained.',
    'No Video Retention: Designed to process visual feeds in-memory and discard raw frames after feature extraction.',
    'Objective Exposure Metrics: Measures passing footfall traffic volume without making unsubstantiated ROI or conversion claims.',
  ],
  skillsAndPractices: [
    'Computer Vision',
    'Video Stream Processing',
    'Pedestrian Detection',
    'Temporal Footfall Analytics',
    'Aggregate Demographics',
    'OOH / DOOH AdTech',
  ],
  links: [
    {
      label: 'VISIT HOARDSPACE.IN',
      url: 'https://www.hoardspace.in/',
      isExternal: true,
      type: 'website',
    },
    {
      label: 'COMPANY LINKEDIN',
      url: 'https://www.linkedin.com/company/hoardspace-bookings-private-limited/',
      isExternal: true,
      type: 'linkedin',
    },
  ],
};

export const GSSOC_EXPERIENCE: ExperienceItem = {
  id: 'exp-gssoc',
  category: 'OPEN SOURCE',
  categoryCode: 'FIELD-02 // OPEN SOURCE ECOSYSTEM',
  role: 'OPEN-SOURCE CONTRIBUTOR',
  organization: 'GirlScript Summer of Code (GSSoC)',
  subOrganization: 'National Open-Source Development Programme',
  statusBadge: 'OPEN SOURCE PARTICIPATION',
  headline: 'Collaborative Open-Source Development & Repository Contributions',
  summary:
    'Participated in GirlScript Summer of Code (GSSoC), engaging with public repositories, collaborative developer workflows, issue investigation, feature enhancement and structured code reviews within an open-source ecosystem.',
  responsibilities: [
    'Navigating and analyzing unfamiliar, large-scale open-source codebases across diverse engineering stacks.',
    'Investigating issue trackers, reproducing reported bugs, and diagnosing root-cause implementation anomalies.',
    'Authoring modular patches, bug fixes, and feature enhancements adhering strictly to project contribution guidelines.',
    'Participating in peer pull request reviews, iterating on maintainer feedback, and aligning code with production standards.',
    'Practicing disciplined version control, semantic commit hygiene, and branch isolation.',
  ],
  skillsAndPractices: [
    'Git & GitHub Workflows',
    'Issue Triage & Diagnosis',
    'Pull Request Review Cycles',
    'Modular Code Architecture',
    'Open-Source Collaboration',
  ],
  links: [
    {
      label: 'GSSOC OFFICIAL WEBSITE',
      url: 'https://gssoc.girlscript.org/',
      isExternal: true,
      type: 'website',
    },
    {
      label: 'VIEW GITHUB PROFILE',
      url: 'https://github.com/pritesh-4',
      isExternal: true,
      type: 'github',
    },
  ],
};

export const HACKNITR_EXPERIENCE: ExperienceItem = {
  id: 'exp-hacknitr',
  category: 'LEADERSHIP & EVENTS',
  categoryCode: 'FIELD-03 // FLAGSHIP STUDENT HACKATHON',
  role: 'ORGANISING MEMBER',
  organization: 'HackNITR — National Institute of Technology, Rourkela',
  subOrganization: 'OpenCode NIT Rourkela • Developer Student Club (GDSC)',
  statusBadge: 'EVENT ORGANISING TEAM',
  headline: 'Hackathon Operations, Community Coordination & Sponsorship Outreach',
  summary:
    'Core organising team member for HackNITR, Eastern India’s flagship student-run hackathon hosted at NIT Rourkela. Contributed to event coordination, industry communication, sponsorship outreach and cross-team execution for a massive multi-track developer gathering.',
  responsibilities: [
    'Collaborating with organising leads on event strategy, scheduling, and developer community outreach.',
    'Drafting tailored sponsorship decks and outreach communications for prospective tech partners and developer platforms.',
    'Coordinating communication channels between external sponsors, student teams, and internal organising squads.',
    'Supporting operational execution during multi-day hackathon phases, ensuring smooth developer and mentor experience.',
  ],
  keyHighlights: [
    'Flagship hackathon of NIT Rourkela organized under OpenCode and Google Developer Student Clubs.',
    'HackNITR 7.0 officially reported 6,200+ registrations, attracting builders from colleges across India.',
  ],
  skillsAndPractices: [
    'Event Operations',
    'Sponsorship Communication',
    'Proposal Drafting',
    'Developer Community Engagement',
    'Cross-Team Logistics',
  ],
  links: [
    {
      label: 'HACKNITR OFFICIAL WEBSITE',
      url: 'https://hacknitr.com/',
      isExternal: true,
      type: 'website',
    },
  ],
};

export const SPONSORSHIP_EXPERIENCE: ExperienceItem = {
  id: 'exp-sponsorship',
  category: 'SPONSORSHIP & PARTNERSHIPS',
  categoryCode: 'FIELD-04 // CORPORATE OUTREACH & ALLIANCES',
  role: 'SPONSORSHIP COORDINATION & OUTREACH',
  organization: 'Campus Technical Societies & Student Initiatives',
  subOrganization: 'National Institute of Technology, Rourkela',
  statusBadge: 'CAMPUS OUTREACH EXPOSURE',
  headline: 'Industry Engagement, Value Propositions & In-Kind Resource Mobilization',
  summary:
    'Participated in sponsorship outreach and partnership coordination across multiple college events, engaging with companies and potential partners to support student-led technical and campus initiatives.',
  responsibilities: [
    'Conducting market research to identify tech companies, developer toolmakers, and educational platforms matching student initiatives.',
    'Developing tailored pitch proposals detailing audience demographics, branding tiers, and developer touchpoints.',
    'Managing professional email outreach, scheduling introductory discovery calls, and executing persistent follow-ups.',
    'Negotiating and coordinating both financial sponsorships and in-kind deliverables (cloud credits, software subscriptions, API licenses).',
    'Ensuring sponsor branding fulfillment across printed collaterals, digital banners, and presentation stages.',
  ],
  skillsAndPractices: [
    'Corporate Outreach',
    'Proposal & Deck Writing',
    'Partner Relationship Management',
    'In-Kind Negotiation',
    'Fulfillment Tracking',
  ],
  links: [],
};

export const ASTROPHYSICS_RESEARCH: ExperienceItem = {
  id: 'exp-astrophysics',
  category: 'SCIENTIFIC RESEARCH',
  categoryCode: 'FIELD-05 // COMPUTATIONAL ASTROPHYSICS',
  role: 'INDEPENDENT STUDENT RESEARCHER — ASTROPHYSICS',
  organization: 'Independent Scientific Exploration',
  subOrganization: 'Computational Radio Astronomy & Signal Processing',
  statusBadge: 'INDEPENDENT RESEARCH',
  headline: 'Time-Frequency Analysis, Radio Signal Processing & Anomaly Detection',
  summary:
    'Pursuing independent computational research and mathematical signal processing focused on astronomical radio signals, time-frequency spectrogram analysis, and signal anomaly detection algorithms for observational astrophysics.',
  responsibilities: [
    'Investigating mathematical techniques for time-frequency analysis (STFT, Wavelet transforms) applied to cosmic radio signals.',
    'Exploring algorithmic approaches to differentiate transient astrophysical phenomena from terrestrial Radio Frequency Interference (RFI).',
    'Prototyping data processing pipelines that consume synthetic and public radio astronomy survey datasets.',
    'Evaluating the application of lightweight neural architectures and statistical filters for real-time anomaly flagging.',
  ],
  keyHighlights: [
    'Directly connected to the architectural design of Project AETHON (featured in the EQUIP project loadout).',
    'Explores computational pipelines capable of high-throughput spectral analysis for modern interferometer arrays.',
  ],
  skillsAndPractices: [
    'Radio Signal Processing',
    'Time-Frequency Analysis',
    'RFI Mitigation Concepts',
    'Scientific Computing (NumPy / SciPy)',
    'Spectral Anomaly Detection',
  ],
  links: [
    {
      label: 'EXPLORE PROJECT AETHON IN EQUIP ↗',
      url: '/resume',
      isExternal: false,
      type: 'internal',
    },
  ],
};

export const IASC_EXPERIENCE: ExperienceItem = {
  id: 'exp-iasc',
  category: 'CITIZEN SCIENCE',
  categoryCode: 'FIELD-06 // OBSERVATIONAL ASTRONOMY',
  role: 'ASTEROID SEARCH CAMPAIGN PARTICIPANT',
  organization: 'International Astronomical Search Collaboration (IASC)',
  subOrganization: 'Citizen Science Initiative Featured by NASA Science',
  statusBadge: 'CITIZEN SCIENCE PARTICIPANT',
  headline: 'Observational Image Analysis & Asteroid Motion Candidate Detection',
  summary:
    'Participant in the International Astronomical Search Collaboration (IASC), an international citizen-science initiative featured by NASA Science. Conducted observational analysis of astronomical survey images to detect moving celestial objects such as Near-Earth Objects (NEOs) and Main Belt asteroids.',
  responsibilities: [
    'Acquiring and reviewing multi-epoch CCD astronomical survey image sets captured by partner observatories (such as Pan-STARRS).',
    'Utilizing specialized astronomical image processing software (Astrometrica) to calibrate coordinates against stellar catalogs.',
    'Performing blink comparison and visual tracking across time-sequenced image frames to identify moving celestial candidates.',
    'Evaluating candidate motion vectors, consistency, and brightness to distinguish genuine solar system bodies from imaging artifacts.',
    'Submitting standardized candidate observational reports adhering strictly to Minor Planet Center (MPC) format specifications.',
  ],
  keyHighlights: [
    'Participated in genuine observational campaigns providing real-world training in astronomical image processing.',
    'International citizen-science collaboration featured on the official NASA Science portal.',
  ],
  skillsAndPractices: [
    'Astrometrica Image Analysis',
    'Blink Comparison Workflow',
    'Astrometric Coordinate Calibration',
    'Minor Planet Center (MPC) Standards',
    'Observational Astronomy',
  ],
  links: [
    {
      label: 'NASA SCIENCE CITIZEN SCIENCE IASC',
      url: 'https://science.nasa.gov/citizen-science/international-astronomical-search-collaboration/',
      isExternal: true,
      type: 'reference',
    },
    {
      label: 'IASC OFFICIAL PROJECT',
      url: 'https://iasc.cosmosearch.org/',
      isExternal: true,
      type: 'website',
    },
  ],
};

export const CHESS_EXPERIENCE: ExperienceItem = {
  id: 'exp-chess',
  category: 'BEYOND ENGINEERING',
  categoryCode: 'FIELD-07 // COGNITIVE STRATEGY & PURSUITS',
  role: 'CHESS ENTHUSIAST',
  organization: 'Chess.com Platform',
  subOrganization: 'Rapid & Tactical Decision-Making',
  statusBadge: 'PERSONAL PURSUIT',
  headline: 'Strategic Thinking, Pattern Recognition & Clock Decision-Making',
  ratingBadge: 'CHESS.COM RATING — ~1350',
  supportingQuote: 'An ongoing pursuit of strategic thinking, calculation and decision-making.',
  summary:
    'An ongoing pursuit of strategic thinking, tactical pattern recognition and resilient decision-making under strict clock constraints. Chess serves as a mental gym for calculation discipline, risk management, and adaptability.',
  responsibilities: [
    'Studying positional concepts, pawn structure dynamics, and tactical motif pattern recognition.',
    'Practicing disciplined calculation trees and candidate move evaluation under time pressure.',
    'Reviewing and analyzing post-game inaccuracies to systematically improve decision hygiene.',
  ],
  skillsAndPractices: [
    'Tactical Pattern Recognition',
    'Deep Calculation Trees',
    'Risk & Position Evaluation',
    'Resilience Under Clock Pressure',
  ],
  links: [],
};

export const ALL_EXPERIENCE_ITEMS: ExperienceItem[] = [
  HOARDSPACE_EXPERIENCE,
  GSSOC_EXPERIENCE,
  HACKNITR_EXPERIENCE,
  SPONSORSHIP_EXPERIENCE,
  ASTROPHYSICS_RESEARCH,
  IASC_EXPERIENCE,
  CHESS_EXPERIENCE,
];
