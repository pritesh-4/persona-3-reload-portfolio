import { useState, useCallback, useMemo, useEffect, useRef, type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  PROJECTS_DATA,
  type ProjectMission,
  getImplementationBadge,
} from '../data/projectsData';
import { ArchitectureExplorer } from '../components/quest/ArchitectureExplorer';
import { CaptureLightbox } from '../components/quest/CaptureLightbox';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/quest.css';

const CATEGORIES = [
  { id: 'ALL', label: 'ALL MISSIONS' },
  { id: 'AI / ML', label: 'AI & HEURISTICS' },
  { id: 'SYSTEMS', label: 'SYSTEMS & AGENTS' },
];

/** Short category tag shown on archive entries. */
const CATEGORY_TAG: Record<ProjectMission['category'], string> = {
  'AI / ML': 'AI/ML',
  'SYSTEMS': 'SYSTEMS',
};

/**
 * Per-mission visual identity. Every dossier gets its own accent and a
 * technical motif strip that reflects the project's actual subject matter.
 * Pure CSS compositions — never presented as product screenshots.
 */
const DOSSIER_THEMES: Record<string, { motifClass: string; motifLabel: string }> = {
  'quest-01': { motifClass: 'theme-salvus', motifLabel: 'GEOSPATIAL OPERATIONS GRID' },
  'quest-02': { motifClass: 'theme-aethon', motifLabel: 'RADIO SPECTROGRAM FIELD' },
  'quest-03': { motifClass: 'theme-routemind', motifLabel: 'MODEL ROUTING PIPELINE' },
  'quest-04': { motifClass: 'theme-zogan', motifLabel: 'DETECTION BOX OVERLAY' },
  'quest-05': { motifClass: 'theme-friday', motifLabel: 'COGNITIVE ORB RESONANCE' },
  'quest-08': { motifClass: 'theme-holytrial', motifLabel: 'CASE FILE REGISTRY' },
  'quest-09': { motifClass: 'theme-orbit', motifLabel: 'DEVICE SCHEMATIC BLUEPRINT' },
};

const statusBadgeClass = (status: ProjectMission['implementationStatus']) =>
  getImplementationBadge(status).questClass;

interface QuestPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const QuestPage: FC<QuestPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [searchParams] = useSearchParams();
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dossierRef = useRef<HTMLElement | null>(null);
  // Deep-link support: /projects?mission=quest-02 or /projects?id=salvus
  const missionParam = searchParams.get('mission') || searchParams.get('id');

  const [selectedMission, setSelectedMission] = useState<ProjectMission>(() => {
    if (missionParam) {
      const match = PROJECTS_DATA.find(
        m =>
          m.id.toLowerCase() === missionParam.toLowerCase() ||
          m.code.toLowerCase() === missionParam.toLowerCase() ||
          m.title.toLowerCase() === missionParam.toLowerCase()
      );
      if (match) return match;
    }
    return PROJECTS_DATA[0];
  });

  const [prevParam, setPrevParam] = useState(missionParam);
  if (missionParam !== prevParam) {
    setPrevParam(missionParam);
    if (missionParam) {
      const target = PROJECTS_DATA.find(
        m =>
          m.id.toLowerCase() === missionParam.toLowerCase() ||
          m.code.toLowerCase() === missionParam.toLowerCase() ||
          m.title.toLowerCase() === missionParam.toLowerCase()
      );
      if (target) {
        setSelectedMission(target);
        if (selectedCat !== 'ALL' && target.category !== selectedCat) {
          setSelectedCat('ALL');
        }
      }
    }
  }

  const filteredMissions = useMemo(() => {
    if (selectedCat === 'ALL') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(m => m.category === selectedCat);
  }, [selectedCat]);

  // Keep the dossier scroll anchored to its newest content
  useEffect(() => {
    dossierRef.current?.scrollTo({ top: 0 });
  }, [selectedMission.id]);

  const handleSelectMission = useCallback(
    (mission: ProjectMission, isPreview = false) => {
      if (isPreview) {
        if (selectedMission.id !== mission.id) {
          playSfx('hover');
          setSelectedMission(mission);
          setLightboxIndex(null);
        }
        return;
      }
      playSfx('select');
      setSelectedMission(mission);
      setLightboxIndex(null);
    },
    [selectedMission.id, playSfx]
  );

  const handleSelectCategory = useCallback(
    (catId: string) => {
      playSfx('select');
      setSelectedCat(catId);
      // The dossier must never show a mission hidden by the active filter
      const nextPool =
        catId === 'ALL'
          ? PROJECTS_DATA
          : PROJECTS_DATA.filter(m => m.category === catId);
      if (!nextPool.some(m => m.id === selectedMission.id)) {
        setSelectedMission(nextPool[0]);
        setLightboxIndex(null);
      }
    },
    [selectedMission.id, playSfx]
  );

  const theme = DOSSIER_THEMES[selectedMission.id];
  const captures = selectedMission.screenshots ?? [];

  return (
    <InternalPageLayout
      title="QUEST"
      sublabel="PROJECT ARCHIVE & MISSION DOSSIERS"
      sectionId="005"
      characterId="junpei"
      currentRoute="/projects"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="SELECT MISSION TO OPEN TECHNICAL DOSSIER"
    >
      <div className="p3r-quest-screen">
        {/* Category Filters */}
        <div className="p3r-quest-filter-bar" role="tablist" aria-label="Mission Categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCat === cat.id}
              className={`p3r-quest-tab-btn ${selectedCat === cat.id ? 'active' : ''}`}
              onClick={() => handleSelectCategory(cat.id)}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>{cat.label}</span>
            </button>
          ))}
          <span className="p3r-quest-count">
            {filteredMissions.length} / {PROJECTS_DATA.length} MISSIONS
          </span>
        </div>

        {/* Two-Column Grid: Mission List + Detailed Mission Dossier */}
        <div className="p3r-quest-stage-grid">
          {/* Mission Archive Entries */}
          <div className="p3r-mission-list-container" role="listbox" aria-label="Missions Archive" aria-live="polite">
            {filteredMissions.map(m => (
              <div
                key={m.id}
                role="option"
                aria-selected={selectedMission.id === m.id}
                tabIndex={0}
                className={`p3r-mission-card ${selectedMission.id === m.id ? 'selected' : ''}`}
                onClick={() => handleSelectMission(m)}
                onMouseEnter={() => handleSelectMission(m, true)}
                onFocus={() => handleSelectMission(m, true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectMission(m);
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                    next?.focus();
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = e.currentTarget.previousElementSibling as HTMLElement | null;
                    prev?.focus();
                  }
                }}
              >
                <div className="p3r-mission-head-row">
                  <span className="p3r-mission-code">{m.code}</span>
                  <span className={`p3r-mission-status-badge ${statusBadgeClass(m.implementationStatus)}`}>
                    {m.implementationStatus}
                  </span>
                </div>

                <h3 className="p3r-mission-title">{m.title}</h3>
                <div className="p3r-mission-meta-row">
                  <span className="p3r-mission-cat">{CATEGORY_TAG[m.category]}</span>
                  <span className="p3r-mission-rank">{m.difficulty}</span>
                  <span className="p3r-mission-role">{m.role}</span>
                </div>
                <p className="p3r-mission-summary">{m.summary}</p>

                <div className="p3r-mission-tags-row">
                  {m.techStack.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="p3r-mission-tag">
                      {tech}
                    </span>
                  ))}
                  {m.techStack.length > 3 && (
                    <span className="p3r-mission-tag">+{m.techStack.length - 3}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mission Dossier Detail Panel */}
          <aside className="p3r-mission-dossier-panel" aria-live="polite" ref={dossierRef}>
            {/* Per-project technical motif — visual identity, not a screenshot */}
            <div className={`p3r-dossier-visual ${theme.motifClass}`} aria-hidden="true">
              <span className="p3r-dossier-visual-label">{theme.motifLabel}</span>
              <span className="p3r-dossier-visual-code">{selectedMission.code}</span>
            </div>

            <div className="p3r-dossier-header-block">
              <div className="p3r-dossier-badge-row">
                <span className={`p3r-mission-status-badge ${statusBadgeClass(selectedMission.implementationStatus)}`}>
                  {selectedMission.implementationStatus}
                </span>
                <span className="p3r-dossier-codename">{selectedMission.codename}</span>
              </div>
              <h2 className="p3r-dossier-title">{selectedMission.title}</h2>
              <div className="p3r-dossier-subtitle">{selectedMission.subtitle}</div>

              {/* Mission Identity Grid */}
              <dl className="p3r-dossier-identity-grid">
                <div className="p3r-dossier-identity-cell">
                  <dt>MISSION CODE</dt>
                  <dd>{selectedMission.code}</dd>
                </div>
                <div className="p3r-dossier-identity-cell">
                  <dt>CATEGORY</dt>
                  <dd>{CATEGORY_TAG[selectedMission.category]}</dd>
                </div>
                <div className="p3r-dossier-identity-cell">
                  <dt>DIFFICULTY</dt>
                  <dd>{selectedMission.difficulty}</dd>
                </div>
                <div className="p3r-dossier-identity-cell">
                  <dt>ARCANA</dt>
                  <dd>{selectedMission.targetArcana}</dd>
                </div>
              </dl>
              <div className="p3r-dossier-role-tag">ROLE: {selectedMission.role}</div>
            </div>

            {captures.length > 0 && (
              <div className="p3r-dossier-gallery" key={selectedMission.id}>
                {captures.map((capture, idx) => (
                  <figure key={capture.src} className="p3r-dossier-capture">
                    <button
                      type="button"
                      className="p3r-dossier-capture-btn"
                      aria-label={`Inspect capture: ${capture.alt}`}
                      onClick={() => {
                        playSfx('select');
                        setLightboxIndex(idx);
                      }}
                    >
                      <img
                        src={capture.src}
                        alt={capture.alt}
                        className="p3r-dossier-screenshot"
                        loading="lazy"
                      />
                      <span className="p3r-dossier-capture-hint" aria-hidden="true">
                        ⛶ INSPECT
                      </span>
                    </button>
                  </figure>
                ))}
              </div>
            )}

            {selectedMission.architecture && (
              <div className="p3r-dossier-arch-section" key={`arch-${selectedMission.id}`}>
                <ArchitectureExplorer
                  diagram={selectedMission.architecture}
                  systemName={selectedMission.title}
                />
              </div>
            )}

            <div className="p3r-dossier-section">
              <h4 className="p3r-dossier-heading">PROJECT BRIEFING</h4>
              <p className="p3r-dossier-text">{selectedMission.summary}</p>
            </div>

            <div className="p3r-dossier-section">
              <h4 className="p3r-dossier-heading">THE REAL PROBLEM</h4>
              <p className="p3r-dossier-text">{selectedMission.problem}</p>
            </div>

            <div className="p3r-dossier-section">
              <h4 className="p3r-dossier-heading">ENGINEERING ARCHITECTURE & APPROACH</h4>
              <p className="p3r-dossier-text">{selectedMission.solution}</p>
            </div>

            <div className="p3r-dossier-section">
              <h4 className="p3r-dossier-heading">CORE CAPABILITIES</h4>
              <div className="p3r-dossier-bullets">
                {selectedMission.features.map((feat, idx) => (
                  <div key={idx} className="p3r-dossier-bullet-item">
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedMission.limitations.length > 0 && (
              <div className="p3r-dossier-limitations-box">
                <div className="p3r-limitations-heading">
                  <span>TECHNICAL HONESTY & REAL-WORLD BOUNDARIES</span>
                </div>
                {selectedMission.limitations.map((lim, idx) => (
                  <div key={idx} className="p3r-limitation-item">
                    <span>{lim}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="p3r-dossier-section">
              <h4 className="p3r-dossier-heading">TECHNOLOGY SPECS</h4>
              <div className="p3r-mission-tags-row">
                {selectedMission.techStack.map((tech, idx) => (
                  <span key={idx} className="p3r-mission-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p3r-dossier-actions">
              <a
                href={selectedMission.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p3r-quest-action-btn"
                onMouseEnter={() => playSfx('hover')}
              >
                <span>SOURCE REPOSITORY ↗</span>
              </a>
              {selectedMission.demoUrl && (
                <a
                  href={selectedMission.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3r-quest-action-btn p3r-quest-action-live"
                  onMouseEnter={() => playSfx('hover')}
                >
                  <span>LIVE DEPLOYMENT ↗</span>
                </a>
              )}
            </div>
          </aside>
        </div>

        {/* Capture inspection overlay (QUEST dossiers with real screenshots) */}
        <CaptureLightbox
          captures={captures}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      </div>
    </InternalPageLayout>
  );
};
