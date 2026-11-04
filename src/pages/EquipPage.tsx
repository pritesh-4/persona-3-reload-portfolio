import { useState, useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  PROGRESSION_TIMELINE,
  EQUIPMENT_LOADOUT,
} from '../data/experienceData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/equip.css';

interface EquipPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const EquipPage: FC<EquipPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [viewMode, setViewMode] = useState<'timeline' | 'loadout'>('timeline');
  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleModeChange = useCallback(
    (mode: 'timeline' | 'loadout') => {
      playSfx('select');
      setViewMode(mode);
    },
    [playSfx]
  );

  const handleOpenResume = useCallback(() => {
    playSfx('confirm');
    setShowResumeModal(true);
  }, [playSfx]);

  const handleCloseResume = useCallback(() => {
    playSfx('back');
    setShowResumeModal(false);
  }, [playSfx]);

  return (
    <InternalPageLayout
      title="EQUIP"
      sublabel="DEVELOPER PROGRESSION, GEAR & CREDENTIALS"
      sectionId="003"
      characterId="akihiko"
      backgroundPath="/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png"
      currentRoute="/resume"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
    >
      <div className="p3r-equip-screen">
        {/* Top Control Bar: Mode Toggle + Resume Dispatch */}
        <div className="p3r-equip-toolbar">
          <div className="p3r-equip-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'timeline'}
              className={`p3r-equip-mode-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => handleModeChange('timeline')}
            >
              <span>EXPERIENCE TIMELINE</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'loadout'}
              className={`p3r-equip-mode-btn ${viewMode === 'loadout' ? 'active' : ''}`}
              onClick={() => handleModeChange('loadout')}
            >
              <span>EQUIPMENT LOADOUT</span>
            </button>
          </div>

          <button
            type="button"
            className="p3r-resume-dispatch-btn"
            onClick={handleOpenResume}
          >
            <span>DISPATCH DOSSIER [RESUME]</span>
          </button>
        </div>

        {/* View Mode 1: Progression Timeline */}
        {viewMode === 'timeline' && (
          <div className="p3r-timeline-container" role="tabpanel">
            <div className="p3r-timeline-track">
              {PROGRESSION_TIMELINE.map((item, idx) => (
                <div key={item.id} className="p3r-timeline-entry">
                  <div className="p3r-timeline-marker">
                    <div className="p3r-marker-dot" />
                    <span className="p3r-marker-index">{String(idx + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="p3r-timeline-card">
                    <div className="p3r-entry-header">
                      <div className="p3r-entry-title-wrap">
                        <span className="p3r-entry-period">{item.period}</span>
                        <h3 className="p3r-entry-role">{item.role || item.title}</h3>
                        <span className="p3r-entry-org">{item.organization}</span>
                      </div>
                      <span className="p3r-entry-type-badge">{item.category}</span>
                    </div>

                    <p className="p3r-entry-desc">{item.summary}</p>

                    <div className="p3r-entry-highlights">
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="p3r-highlight-item">
                          <span className="p3r-bullet">▸</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p3r-entry-tags">
                      {item.skills.map(skill => (
                        <span key={skill} className="p3r-skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Mode 2: RPG Equipment Loadout */}
        {viewMode === 'loadout' && (
          <div className="p3r-loadout-grid" role="tabpanel">
            {EQUIPMENT_LOADOUT.map(slot => (
              <div key={slot.slotName} className="p3r-loadout-card">
                <div className="p3r-loadout-header">
                  <span className="p3r-loadout-slot-name">{slot.slotName}</span>
                  <span className="p3r-loadout-tier">{slot.rarity}</span>
                </div>

                <div className="p3r-loadout-item-name">{slot.itemName}</div>
                <div className="p3r-loadout-spec">{slot.powerStat} &bull; {slot.defenseStat}</div>
                <p className="p3r-loadout-desc">{slot.description}</p>

                <div className="p3r-loadout-perks">
                  {slot.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="p3r-perk-line">
                      <span className="p3r-perk-arrow">✦</span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resume Dispatch Modal */}
        {showResumeModal && (
          <div
            className="p3r-resume-modal-overlay"
            onClick={handleCloseResume}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="p3r-resume-modal-card"
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--p3r-snow)' }}>
                PERSONNEL DOSSIER VERIFICATION
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(240, 246, 255, 0.85)', lineHeight: 1.6 }}>
                The official credentials and curriculum vitae for <strong>Pritesh Jena</strong> are cataloged within the live repository and LinkedIn verification channels.
              </p>
              <div style={{ background: 'rgba(3, 8, 20, 0.7)', padding: '14px', borderLeft: '4px solid var(--p3r-cyan)', margin: '14px 0' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--p3r-ice)', fontWeight: 600 }}>
                  CURRENT STATUS: Active B.Tech Student & GSSoC 2026 Contributor
                </p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(240, 246, 255, 0.7)', marginTop: '4px' }}>
                  Direct PDF dossier can be requested directly via email: <strong>priteshjena16@gmail.com</strong>
                </p>
              </div>

              <div className="p3r-modal-actions">
                <a
                  href="https://www.linkedin.com/in/pritesh-jena-8980a6373"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3r-resume-download-btn"
                  style={{ textDecoration: 'none', display: 'inline-flex' }}
                >
                  <span>VIEW LINKEDIN</span>
                </a>
                <a
                  href="mailto:priteshjena16@gmail.com?subject=Dossier%20Request%20-%20Pritesh%20Jena"
                  className="p3r-resume-download-btn"
                  style={{ textDecoration: 'none', display: 'inline-flex' }}
                >
                  <span>REQUEST VIA EMAIL</span>
                </a>
                <button
                  type="button"
                  className="p3r-back-btn"
                  onClick={handleCloseResume}
                >
                  <span>CLOSE [ESC]</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InternalPageLayout>
  );
};
