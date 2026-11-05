import { useState, useCallback, useMemo, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  PROJECTS_DATA,
  type ProjectMission,
} from '../data/projectsData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/quest.css';

const CATEGORIES = [
  { id: 'ALL', label: 'ALL MISSIONS' },
  { id: 'AI / ML', label: 'AI & HEURISTICS' },
  { id: 'SYSTEMS', label: 'SYSTEMS & AGENTS' },
];

interface QuestPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const QuestPage: FC<QuestPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [selectedMission, setSelectedMission] = useState<ProjectMission>(PROJECTS_DATA[0]);

  const filteredMissions = useMemo(() => {
    if (selectedCat === 'ALL') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(m => m.category === selectedCat);
  }, [selectedCat]);

  const handleSelectMission = useCallback(
    (mission: ProjectMission, isPreview = false) => {
      if (isPreview) {
        if (selectedMission.id !== mission.id) {
          playSfx('hover');
          setSelectedMission(mission);
        }
        return;
      }
      playSfx('select');
      setSelectedMission(mission);
    },
    [selectedMission.id, playSfx]
  );

  const handleSelectCategory = useCallback(
    (catId: string) => {
      playSfx('select');
      setSelectedCat(catId);
      const first =
        catId === 'ALL'
          ? PROJECTS_DATA[0]
          : PROJECTS_DATA.find(m => m.category === catId) || PROJECTS_DATA[0];
      setSelectedMission(first);
    },
    [playSfx]
  );

  return (
    <InternalPageLayout
      title="QUEST"
      sublabel="FEATURED MISSIONS & SOFTWARE ARCHIVES"
      sectionId="005"
      characterId="junpei"
      backgroundPath="/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg"
      currentRoute="/projects"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="HOVER OR SELECT MISSION TO INSPECT ARCHITECTURAL DOSSIER"
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
        </div>

        {/* Two-Column Grid: Mission List + Detailed Mission Dossier */}
        <div className="p3r-quest-stage-grid">
          {/* Mission Archive Cards */}
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
                  <span className={`p3r-mission-status-badge ${
                    m.implementationStatus === 'VERIFIED IMPLEMENTED'
                      ? 'p3r-mstatus-implemented'
                      : m.implementationStatus === 'RESEARCH PROTOTYPE'
                      ? 'p3r-mstatus-prototype'
                      : m.implementationStatus === 'EXPERIMENTAL CONCEPT'
                      ? 'p3r-mstatus-concept'
                      : 'p3r-mstatus-early'
                  }`}>
                    {m.implementationStatus}
                  </span>
                </div>

                <h3 className="p3r-mission-title">{m.title}</h3>
                <span className="p3r-mission-role">{m.role}</span>
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
          <aside className="p3r-mission-dossier-panel" aria-live="polite">
            <div className="p3r-dossier-header-block">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <span className="p3r-dossier-code-tag">
                  {selectedMission.code} // {selectedMission.targetArcana}
                </span>
                <span className={`p3r-mission-status-badge ${
                  selectedMission.implementationStatus === 'VERIFIED IMPLEMENTED'
                    ? 'p3r-mstatus-implemented'
                    : selectedMission.implementationStatus === 'RESEARCH PROTOTYPE'
                    ? 'p3r-mstatus-prototype'
                    : selectedMission.implementationStatus === 'EXPERIMENTAL CONCEPT'
                    ? 'p3r-mstatus-concept'
                    : 'p3r-mstatus-early'
                }`}>
                  {selectedMission.implementationStatus}
                </span>
              </div>
              <h2 className="p3r-dossier-title">{selectedMission.title}</h2>
              <div className="p3r-dossier-subtitle">{selectedMission.subtitle}</div>
              <div className="p3r-dossier-role-tag">ROLE: {selectedMission.role}</div>
            </div>

            {selectedMission.screenshot && (
              <div className="p3r-dossier-screenshot-wrap">
                <img
                  src={selectedMission.screenshot}
                  alt={`${selectedMission.title} screenshot`}
                  className="p3r-dossier-screenshot"
                  loading="lazy"
                />
              </div>
            )}

            <div className="p3r-dossier-section">
              <h4 className="p3r-dossier-heading">THE CHALLENGE & PROBLEM</h4>
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

            {selectedMission.limitations && selectedMission.limitations.length > 0 && (
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
                <span>📂 SOURCE REPO</span>
              </a>
              {selectedMission.demoUrl && (
                <a
                  href={selectedMission.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3r-quest-action-btn"
                  style={{ background: 'var(--p3r-red)', borderColor: 'var(--p3r-magenta)' }}
                  onMouseEnter={() => playSfx('hover')}
                >
                  <span>🚀 LIVE DEPLOYMENT</span>
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </InternalPageLayout>
  );
};
