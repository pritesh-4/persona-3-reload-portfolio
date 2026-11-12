/**
 * Centralized Developer Status Configuration
 *
 * Truth & Integrity:
 * Explicit, manually maintained status information representing current
 * engineering activities, learning pursuits, and verified availability.
 * Never presented as fabricated dynamic telemetry.
 */

export interface DeveloperStatus {
  currentlyExploring: string[];
  currentlyBuilding: {
    project: string;
    description: string;
    missionId: string;
    repoUrl: string;
  };
  technicalFocus: string[];
  availability: {
    status: 'AVAILABLE' | 'LIMITED' | 'UNAVAILABLE';
    label: string;
    period: string;
    notes: string;
  };
  lastUpdated: string;
  verifiedSource: string;
}

export const DEVELOPER_STATUS: DeveloperStatus = {
  currentlyExploring: [
    'Computational radio astronomy and celestial radio-signal analysis (Project AETHON)',
    'Unsupervised anomaly detection on spectrotemporal radio telemetry',
    'Citizen-science asteroid search campaigns (NASA-affiliated IASC programme)',
    'Distributed systems architecture and deterministic state routing'
  ],
  currentlyBuilding: {
    project: 'SALVUS (SIH 2026)',
    description: 'AI-assisted disaster intelligence & emergency responder coordination platform with 3-tier triage and authority safety gates.',
    missionId: 'quest-01',
    repoUrl: 'https://github.com/pritesh-4/SIH-2026---SALVUS'
  },
  technicalFocus: [
    'FastAPI & Asynchronous Python Services',
    'Computer Vision & Object Tracking (YOLO, ByteTrack)',
    'Intelligent Model Routing & Heuristic LLM Orchestration (RouteMind)',
    'React 19 & High-Performance UI Architecture',
    'Real-Time WebSockets & Telemetry Pipelines'
  ],
  availability: {
    status: 'AVAILABLE',
    label: 'SUMMER 2025 / 2026 INTERNSHIPS & RESEARCH',
    period: 'Summer 2025 – 2026',
    notes: 'Open to software engineering internships, AI/ML engineering roles, and academic research collaborations.'
  },
  lastUpdated: 'NOVEMBER 2026',
  verifiedSource: 'MANUALLY VERIFIED PERSONNEL RECORD'
};

