import { useState, useCallback, useEffect, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import { PROGRESSION_TIMELINE, type ProgressionMilestone } from '../data/experienceData';
import { useAudioContext } from '../hooks/useAudioContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import '../styles/pages/equip.css';

interface EquipPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const EquipPage: FC<EquipPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const modalRef = useFocusTrap<HTMLDivElement>(showResumeModal);

  // Filter project experiences for the timeline, placing education as the prominent top anchor
  const projectMilestones: ProgressionMilestone[] = PROGRESSION_TIMELINE.filter(
    (m) => m.category !== 'EDUCATION'
  );

  const handleOpenResume = useCallback(() => {
    playSfx('confirm');
    setShowResumeModal(true);
  }, [playSfx]);

  const handleCloseResume = useCallback(() => {
    playSfx('back');
    setShowResumeModal(false);
  }, [playSfx]);

  useEffect(() => {
    if (!showResumeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleCloseResume();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [showResumeModal, handleCloseResume]);

  return (
    <InternalPageLayout
      title="EQUIP"
      sublabel="EDUCATION & DEVELOPMENT PROGRESSION"
      sectionId="003"
      characterId="akihiko"
      backgroundPath="/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png"
      currentRoute="/resume"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="EDUCATION & PROJECT ENGINEERING PROGRESSION TIMELINE"
    >
      <div className="p3r-equip-screen">
        {/* ================================================================
            PRIMARY SECTION: EDUCATION & CREDENTIALS HERO PLATE
            ================================================================ */}
        <section className="p3r-education-anchor-plate">
          <div className="p3r-edu-content-col">
            <div className="p3r-edu-tag-row">
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
          </div>

          <div className="p3r-edu-action-col">
            <button
              type="button"
              className="p3r-resume-dispatch-btn"
              onClick={handleOpenResume}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>DISPATCH DOSSIER [RESUME]</span>
              <span className="p3r-resume-arrow">↗</span>
            </button>
            <span className="p3r-resume-note">VERIFIED CREDENTIALS ARCHIVE</span>
          </div>
        </section>

        {/* ================================================================
            PRIMARY SECTION: PROJECT EXPERIENCE VERTICAL TIMELINE
            ================================================================ */}
        <section className="p3r-journey-section">
          <div className="p3r-journey-header">
            <div className="p3r-journey-title-wrap">
              <span className="p3r-journey-sec-num">02</span>
              <h2>PROJECT EXPERIENCE &amp; ENGINEERING JOURNEY</h2>
            </div>
            <span className="p3r-journey-count">{projectMilestones.length} CHRONICLES RECORDED</span>
          </div>

          <div className="p3r-vertical-timeline">
            {/* Blue Central Guide Line */}
            <div className="p3r-timeline-spine" aria-hidden="true" />

            {projectMilestones.map((item, idx) => (
              <article
                key={item.id}
                className="p3r-timeline-entry"
                onMouseEnter={() => playSfx('hover')}
              >
                {/* Large Timeline Numeral & Marker */}
                <div className="p3r-entry-marker-col">
                  <span className="p3r-entry-numeral">0{idx + 1}</span>
                  <div className="p3r-entry-node" />
                </div>

                {/* Asymmetric Content Plate */}
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
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================================================================
            RESUME DOSSIER MODAL
            ================================================================ */}
        {showResumeModal && (
          <div
            className="p3r-resume-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
          >
            <div
              ref={modalRef}
              className="p3r-resume-modal-plate"
              tabIndex={-1}
            >
              <div className="p3r-resume-modal-head">
                <div className="p3r-resume-modal-title-box">
                  <span className="p3r-resume-modal-tag">PERSONNEL DOCUMENT</span>
                  <h2 id="resume-modal-title" className="p3r-resume-modal-title">
                    PRITESH KUMAR JENA — ENGINEERING DOSSIER
                  </h2>
                </div>
                <button
                  type="button"
                  className="p3r-modal-close-btn"
                  onClick={handleCloseResume}
                  aria-label="Close Resume Modal"
                >
                  ✕ CLOSE
                </button>
              </div>

              <div className="p3r-resume-modal-body">
                <div className="p3r-resume-section">
                  <h3 className="p3r-resume-sec-title">EDUCATION</h3>
                  <div className="p3r-resume-record">
                    <div className="p3r-resume-row">
                      <span className="p3r-resume-bold">National Institute of Technology, Rourkela</span>
                      <span className="p3r-resume-dim">Rourkela, Odisha, India</span>
                    </div>
                    <div className="p3r-resume-row">
                      <span>Bachelor of Technology in Mining Engineering</span>
                      <span className="p3r-resume-accent">Second-Year Undergraduate</span>
                    </div>
                  </div>
                </div>

                <div className="p3r-resume-section">
                  <h3 className="p3r-resume-sec-title">CORE TECHNICAL COMPETENCIES</h3>
                  <p className="p3r-resume-p">
                    <b>Languages:</b> Python, JavaScript (ES6+), TypeScript, C/C++, SQL, HTML5, CSS3<br />
                    <b>Backend &amp; APIs:</b> FastAPI, Node.js, Express, REST APIs, WebSockets (Socket.IO), SQLAlchemy<br />
                    <b>Frontend:</b> React 19, Vite, Tailwind CSS, Framer Motion, Vanilla CSS Architecture<br />
                    <b>AI &amp; Heuristics:</b> PyTorch, Ultralytics YOLO, ByteTrack, Gemini API, Groq Llama, Vector DBs
                  </p>
                </div>

                <div className="p3r-resume-section">
                  <h3 className="p3r-resume-sec-title">NOTABLE ARCHITECTURAL HIGHLIGHTS</h3>
                  <ul className="p3r-resume-bullets">
                    <li><b>SALVUS (SIH 2026):</b> Lead Systems Architect &amp; AI Integration Engineer for emergency disaster coordination platform with 3-tier AI triage and human command safety locks.</li>
                    <li><b>Project AETHON:</b> Independent scientific computing research prototype investigating unsupervised anomaly detection to surface uncatalogued astronomical radio transients.</li>
                    <li><b>Project RouteMind:</b> Intelligent multi-model LLM router classifying query intent across cost, speed, and quality trade-offs.</li>
                    <li><b>Project Zogan:</b> AI-assisted wildlife detection and tracking prototype using fine-tuned YOLO and ByteTrack.</li>
                  </ul>
                </div>
              </div>

              <div className="p3r-resume-modal-foot">
                <a
                  href="https://github.com/pritesh-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3r-resume-external-btn"
                  onClick={() => playSfx('confirm')}
                >
                  <span>GITHUB PROFILE ↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/pritesh-jena-8980a6373"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3r-resume-external-btn"
                  onClick={() => playSfx('confirm')}
                >
                  <span>LINKEDIN PROFILE ↗</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </InternalPageLayout>
  );
};
