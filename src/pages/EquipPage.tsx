import { useState, useCallback, useEffect, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import { PROGRESSION_TIMELINE, type ProgressionMilestone } from '../data/experienceData';
import { PROJECTS_DATA, type ProjectMission, getImplementationBadge } from '../data/projectsData';
import { useAudioContext } from '../hooks/useAudioContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import '../styles/pages/equip.css';

interface EquipPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const EquipPage: FC<EquipPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();

  // Modal dialog states
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const projectModalRef = useFocusTrap<HTMLDivElement>(Boolean(activeProjectId));

  // Resolved active project record
  const activeProject: ProjectMission | undefined = activeProjectId
    ? PROJECTS_DATA.find((p) => p.id === activeProjectId)
    : undefined;

  // Filter project experiences for the timeline, placing education as the prominent top anchor
  const projectMilestones: ProgressionMilestone[] = PROGRESSION_TIMELINE.filter(
    (m) => m.category !== 'EDUCATION'
  );

  // Project Dossier Handlers
  const handleOpenProjectDossier = useCallback(
    (projId: string) => {
      playSfx('confirm');
      setActiveProjectId(projId);
    },
    [playSfx]
  );

  const handleCloseProjectDossier = useCallback(() => {
    playSfx('back');
    setActiveProjectId(null);
  }, [playSfx]);

  // Lock background scroll when project dossier modal is active
  useEffect(() => {
    if (activeProjectId) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeProjectId]);

  // Escape key handling for Project Dossier modal
  useEffect(() => {
    if (!activeProjectId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleCloseProjectDossier();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [activeProjectId, handleCloseProjectDossier]);

  return (
    <InternalPageLayout
      title="EQUIP"
      sublabel="EDUCATION & DEVELOPMENT PROGRESSION"
      sectionId="003"
      characterId="akihiko"
      currentRoute="/resume"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="EDUCATION & PROJECT ENGINEERING PROGRESSION TIMELINE"
    >
      <div className="p3r-equip-screen">
        {/* ================================================================
            1. EDUCATION & RESUME HERO: Clean Scannable Academic Foundation
            ================================================================ */}
        <header className="p3r-education-anchor-plate">
          <div className="p3r-edu-content-col">
            <div className="p3r-edu-tag-row">
              <span className="p3r-sec-num">01</span>
              <span className="p3r-edu-tag">ACADEMIC FOUNDATION // FORMAL DEGREE</span>
              <span className="p3r-edu-status-badge">CURRENTLY ENROLLED</span>
            </div>

            <div className="p3r-edu-title-row">
              <h1 className="p3r-edu-degree">MINING ENGINEERING</h1>
              <span className="p3r-edu-tier-pill">SECOND-YEAR UNDERGRADUATE</span>
            </div>

            <div className="p3r-edu-institution">
              <span>National Institute of Technology, Rourkela (NIT Rourkela)</span>
              <span className="p3r-edu-loc">• Rourkela, Odisha, India</span>
            </div>

            <p className="p3r-edu-summary">
              Pursuing undergraduate studies at NIT Rourkela, bridging fundamental physical engineering
              rigour with independent systems architecture, machine learning research, and full-stack software development.
            </p>

            {/* Resume action cleanly integrated with education metadata */}
            <div className="p3r-edu-resume-row">
              <a
                href="https://drive.google.com/file/d/1GmxHQImCLP-AZtlD72_Ex-XqxM6zu1T3/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="p3r-resume-dispatch-btn"
                onClick={() => playSfx('confirm')}
                onMouseEnter={() => playSfx('hover')}
                aria-label="RESUME (opens Google Drive document in new tab)"
              >
                <span>RESUME</span>
                <span className="p3r-resume-arrow">↗</span>
              </a>
              <span className="p3r-resume-note">VERIFIED CREDENTIALS // OFFICIAL DOSSIER</span>
            </div>
          </div>

          {/* Dedicated Right Character Visual Element */}
          <div className="p3r-edu-portrait-card" aria-label="Progression Personnel Record">
            <div className="p3r-edu-portrait-art-wrap">
              <img
                src="/assets/persona3/characters/shinjiro-aragaki.webp"
                alt="Shinjiro Aragaki — Progression Archetype"
                className="p3r-edu-portrait-img"
              />
            </div>
            <div className="p3r-edu-portrait-footer">
              <span className="p3r-edu-portrait-tag">EQUIP // LOADOUT</span>
              <span className="p3r-edu-portrait-arcana">HIEROPHANT [005]</span>
            </div>
          </div>
        </header>

        {/* ================================================================
            2. PROJECT EXPERIENCE VERTICAL TIMELINE
            ================================================================ */}
        <section className="p3r-journey-section" aria-labelledby="journey-heading">
          <div className="p3r-journey-header">
            <div className="p3r-journey-title-wrap">
              <span className="p3r-journey-sec-num">02</span>
              <h2 id="journey-heading">PROJECT EXPERIENCE &amp; ENGINEERING JOURNEY</h2>
            </div>
            <span className="p3r-journey-count">{projectMilestones.length} CHRONICLES RECORDED</span>
          </div>

          <div className="p3r-vertical-timeline">
            {/* Guide line spine */}
            <div className="p3r-timeline-spine" aria-hidden="true" />

            {projectMilestones.map((item, idx) => {
              const displayNumeral = String(idx + 1).padStart(2, '0');
              return (
                <article
                  key={item.id}
                  className="p3r-timeline-entry"
                  onMouseEnter={() => playSfx('hover')}
                >
                  {/* Large Timeline Numeral & Marker */}
                  <div className="p3r-entry-marker-col">
                    <span className="p3r-entry-numeral">{displayNumeral}</span>
                    <div className="p3r-entry-node" />
                  </div>

                  {/* Text-led Content Plate */}
                  <div className="p3r-entry-content-plate">
                    <div className="p3r-entry-meta-row">
                      <span className="p3r-entry-period">{item.period}</span>
                      <span className="p3r-entry-role">{item.role}</span>
                      <span className="p3r-entry-loc">{item.location}</span>
                    </div>

                    <h3 className="p3r-entry-title">{item.organization}</h3>
                    <p className="p3r-entry-summary">{item.summary}</p>

                    {/* Key Engineering Contributions */}
                    <div className="p3r-entry-contributions">
                      <span className="p3r-contrib-heading">KEY CONTRIBUTIONS &amp; ARCHITECTURAL IMPACT:</span>
                      <ul className="p3r-contrib-list">
                        {item.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="p3r-contrib-item">
                            <span className="p3r-contrib-bullet">✦</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Used */}
                    <div className="p3r-entry-tech-row">
                      {item.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="p3r-tech-tag">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Explore Project Action Button */}
                    {item.projectId && (
                      <div className="p3r-entry-actions">
                        <button
                          type="button"
                          className="p3r-explore-project-btn"
                          onClick={() => handleOpenProjectDossier(item.projectId!)}
                          onMouseEnter={() => playSfx('hover')}
                          aria-label={`Explore technical dossier for ${item.organization}`}
                        >
                          <span>EXPLORE PROJECT</span>
                          <span className="p3r-explore-arrow" aria-hidden="true">↗</span>
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ================================================================
            3. PROJECT DETAIL DOSSIER MODAL
            ================================================================ */}
        {activeProject && (
          <div
            className="p3r-dossier-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dossier-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCloseProjectDossier();
              }
            }}
          >
            <div
              className="p3r-dossier-modal-window"
              ref={projectModalRef}
              tabIndex={-1}
            >
              {/* Modal Header */}
              <div className="p3r-dossier-modal-head">
                <div className="p3r-dossier-head-meta">
                  <span className="p3r-dossier-code">{activeProject.code}</span>
                  <span className="p3r-dossier-badge">
                    {getImplementationBadge(activeProject.implementationStatus).label}
                  </span>
                </div>
                <button
                  type="button"
                  className="p3r-dossier-close-btn"
                  onClick={handleCloseProjectDossier}
                  aria-label="Close Project Dossier"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p3r-dossier-modal-body">
                <h2 id="project-dossier-title" className="p3r-dossier-modal-title">
                  {activeProject.title}
                </h2>
                <div className="p3r-dossier-modal-subtitle">{activeProject.subtitle}</div>

                <p className="p3r-dossier-modal-description">{activeProject.summary}</p>

                {/* Architecture & Solution */}
                <div className="p3r-dossier-modal-section">
                  <h3>SYSTEM ARCHITECTURE &amp; SOLUTION</h3>
                  <p>{activeProject.solution}</p>
                </div>

                {/* Tech Stack */}
                <div className="p3r-dossier-modal-section">
                  <h3>TECHNOLOGY STACK</h3>
                  <div className="p3r-modal-tech-grid">
                    {activeProject.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="p3r-modal-tech-item">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External links */}
                <div className="p3r-dossier-modal-actions">
                  {activeProject.repoUrl && (
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-dossier-action-btn"
                    >
                      <span>VIEW CODEBASE</span>
                      <span>↗</span>
                    </a>
                  )}
                  {activeProject.demoUrl && (
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-dossier-action-btn live"
                    >
                      <span>LIVE DEMO</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </InternalPageLayout>
  );
};
