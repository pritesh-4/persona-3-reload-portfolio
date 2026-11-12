import { useEffect, useCallback, type FC } from 'react';
import { DEVELOPER_STATUS } from '../../data/developerStatusData';
import { useAudioContext } from '../../hooks/useAudioContext';
import '../../styles/hud.css';

interface DeveloperStatusPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
}

export const DeveloperStatusPanel: FC<DeveloperStatusPanelProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { playSfx } = useAudioContext();

  const handleClose = useCallback(() => {
    playSfx('back');
    onClose();
  }, [playSfx, onClose]);

  const handleNavigateProject = useCallback(
    (missionId: string) => {
      playSfx('select');
      onClose();
      if (onNavigate) {
        onNavigate(`/projects?mission=${missionId}`);
      }
    },
    [playSfx, onClose, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="p3r-status-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dev-status-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="p3r-status-panel-plate">
        {/* Terminal Header */}
        <div className="p3r-status-panel-head">
          <div className="p3r-status-head-left">
            <span className="p3r-status-sys-tag">S.E.E.S. PERSONNEL ARCHIVE // STATUS</span>
            <h2 id="dev-status-title" className="p3r-status-panel-title">
              DEVELOPER OPERATIONS TELEMETRY
            </h2>
          </div>
          <button
            type="button"
            className="p3r-status-close-btn"
            onClick={handleClose}
            aria-label="Close Developer Status Terminal"
          >
            ✕ ESC
          </button>
        </div>

        {/* Verification Strip */}
        <div className="p3r-status-verify-strip">
          <span className="p3r-status-indicator-dot" />
          <span className="p3r-status-verify-label">RECORD VERIFIED:</span>
          <span className="p3r-status-verify-val">{DEVELOPER_STATUS.verifiedSource}</span>
          <span className="p3r-status-verify-date">UPDATED: {DEVELOPER_STATUS.lastUpdated}</span>
        </div>

        {/* Status Content Sections */}
        <div className="p3r-status-panel-body">
          {/* Currently Building */}
          <section className="p3r-status-section">
            <div className="p3r-status-sec-badge">CURRENTLY BUILDING</div>
            <div className="p3r-status-active-project">
              <div className="p3r-status-proj-header">
                <span className="p3r-status-proj-name">{DEVELOPER_STATUS.currentlyBuilding.project}</span>
                {onNavigate && (
                  <button
                    type="button"
                    className="p3r-status-proj-link"
                    onClick={() => handleNavigateProject(DEVELOPER_STATUS.currentlyBuilding.missionId)}
                  >
                    OPEN MISSION DOSSIER ↗
                  </button>
                )}
              </div>
              <p className="p3r-status-proj-desc">{DEVELOPER_STATUS.currentlyBuilding.description}</p>
            </div>
          </section>

          {/* Currently Exploring */}
          <section className="p3r-status-section">
            <div className="p3r-status-sec-badge">CURRENTLY EXPLORING &amp; RESEARCHING</div>
            <ul className="p3r-status-bullet-list">
              {DEVELOPER_STATUS.currentlyExploring.map((item, idx) => (
                <li key={idx} className="p3r-status-bullet-item">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technical Focus */}
          <section className="p3r-status-section">
            <div className="p3r-status-sec-badge">TECHNICAL FOCUS AREAS</div>
            <div className="p3r-status-tags-grid">
              {DEVELOPER_STATUS.technicalFocus.map((tech, idx) => (
                <span key={idx} className="p3r-status-tag">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Availability */}
          <section className="p3r-status-section p3r-status-avail-box">
            <div className="p3r-status-sec-badge">AVAILABILITY &amp; OPPORTUNITIES</div>
            <div className="p3r-status-avail-head">
              <span className="p3r-avail-status-tag">{DEVELOPER_STATUS.availability.status}</span>
              <span className="p3r-avail-label">{DEVELOPER_STATUS.availability.label}</span>
            </div>
            <p className="p3r-avail-notes">{DEVELOPER_STATUS.availability.notes}</p>
          </section>
        </div>

        {/* Terminal Footer */}
        <div className="p3r-status-panel-foot">
          <span className="p3r-status-foot-info">NATIONAL INSTITUTE OF TECHNOLOGY, ROURKELA • 2ND YEAR</span>
          <button
            type="button"
            className="p3r-status-action-btn"
            onClick={handleClose}
          >
            <span>RETURN TO INTERFACE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

