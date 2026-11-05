import { useState, useCallback, useMemo, useEffect, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  SOCIAL_LINKS_DATA,
  SOCIAL_LINK_CATEGORIES,
  type SocialLinkCard,
} from '../data/socialLinksData';
import { useAudioContext } from '../hooks/useAudioContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import '../styles/pages/social.css';

interface SocialLinkPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const SocialLinkPage: FC<SocialLinkPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeCard, setActiveCard] = useState<SocialLinkCard | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const modalRef = useFocusTrap<HTMLDivElement>(Boolean(activeCard));

  const filteredLinks = useMemo(() => {
    if (selectedCategory === 'ALL') return SOCIAL_LINKS_DATA;
    return SOCIAL_LINKS_DATA.filter((link) => link.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenDetail = useCallback(
    (card: SocialLinkCard) => {
      playSfx('select');
      setActiveCard(card);
    },
    [playSfx]
  );

  const handleCloseDetail = useCallback(() => {
    playSfx('back');
    setActiveCard(null);
  }, [playSfx]);

  const handleCopyEmail = useCallback(
    (email: string) => {
      playSfx('confirm');
      navigator.clipboard.writeText(email);
      setCopyFeedback(`TRANSMISSION LOCKED: ${email} COPIED TO CLIPBOARD`);
      setTimeout(() => {
        setCopyFeedback(null);
      }, 3000);
    },
    [playSfx]
  );

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCard) {
        e.preventDefault();
        handleCloseDetail();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCard, handleCloseDetail]);

  return (
    <InternalPageLayout
      title="SOCIAL LINK"
      sublabel="ARCANA RELATIONSHIP & COMMUNICATION TERMINAL"
      sectionId="006"
      characterId="yukari"
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/contact"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="SELECT ANY SOCIAL LINK CARD TO INSPECT ARCANA PROFILE & CONNECTION DETAILS"
    >
      <div className="p3r-social-screen">
        {/* Terminal Status Hero Banner */}
        <div className="p3r-social-hero-box">
          <div className="p3r-social-hero-left">
            <span className="p3r-social-tag">COMMUNICATION FREQUENCY // S.E.E.S. ARCHIVE</span>
            <h1 className="p3r-social-hero-title">SOCIAL LINK TERMINAL</h1>
            <p className="p3r-social-hero-sub">
              Verified collaborative nodes, open-source communities, academic links, and direct developer transmission lines.
            </p>
          </div>

          <div className="p3r-social-status-indicator">
            <span className="p3r-social-dot" />
            <span className="p3r-social-status-txt">ARCANA NETWORK: SYNCHRONIZED</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="p3r-social-category-tabs" role="tablist" aria-label="Social Link Categories">
          {SOCIAL_LINK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`p3r-social-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                playSfx('select');
                setSelectedCategory(cat.id);
              }}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Arcana Social Link Cards Grid */}
        <div className="p3r-social-cards-grid" role="list" aria-live="polite">
          {filteredLinks.map((link) => (
            <article
              key={link.id}
              className="p3r-social-tarot-card"
              role="listitem"
              tabIndex={0}
              onClick={() => handleOpenDetail(link)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenDetail(link);
                }
              }}
              onMouseEnter={() => playSfx('hover')}
              aria-label={`${link.name} — ${link.arcanaRank}`}
            >
              {/* Slanted Card Header */}
              <div className="p3r-tarot-header">
                <div className="p3r-tarot-arcana-badge">
                  <span className="p3r-arcana-numeral">{link.arcanaNumber}</span>
                  <span className="p3r-arcana-name">{link.arcanaName}</span>
                </div>
                <div className="p3r-tarot-rank-indicator">
                  <span className="p3r-rank-text">{link.rankLevel === 10 ? 'MAX' : `RANK ${link.rankLevel}`}</span>
                </div>
              </div>

              {/* 10-Pip Rank Progress Bar */}
              <div className="p3r-rank-pip-track" aria-hidden="true" title={`Connection Rank: ${link.rankLevel}/10`}>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`p3r-rank-pip ${idx < link.rankLevel ? 'filled' : 'empty'} ${idx < link.rankLevel && link.rankLevel === 10 ? 'max' : ''}`}
                  />
                ))}
              </div>

              {/* Card Core Content */}
              <div className="p3r-tarot-body">
                <div className="p3r-tarot-title-row">
                  <span className="p3r-tarot-symbol" aria-hidden="true">{link.icon}</span>
                  <div className="p3r-tarot-titles">
                    <h2 className="p3r-tarot-title">{link.name}</h2>
                    <span className="p3r-tarot-category-tag">{link.categoryLabel}</span>
                  </div>
                </div>

                <div className="p3r-tarot-handle">{link.handle}</div>

                <p className="p3r-tarot-desc">{link.shortDescription}</p>
              </div>

              {/* Card Footer Actions */}
              <div className="p3r-tarot-footer">
                <span className="p3r-tarot-inspect-hint">INSPECT PROFILE &gt;</span>
                <span className="p3r-tarot-symbol-accent">{link.tarotSymbol}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Detailed Social Link Profile Modal */}
        {activeCard && (
          <div
            className="p3r-social-modal-overlay"
            onClick={handleCloseDetail}
            role="dialog"
            aria-modal="true"
            aria-labelledby="social-modal-title"
          >
            <div
              ref={modalRef}
              className="p3r-social-modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Slanted Top Banner */}
              <div className="p3r-social-modal-header">
                <div className="p3r-modal-arcana-meta">
                  <span className="p3r-modal-arcana-num">{activeCard.arcanaNumber}</span>
                  <div className="p3r-modal-arcana-titles">
                    <span className="p3r-modal-arcana-tag">PERSONA 3 ARCANA FREQUENCY</span>
                    <h2 id="social-modal-title" className="p3r-modal-arcana-name">
                      {activeCard.arcanaName} &bull; {activeCard.name}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  className="p3r-social-modal-close"
                  onClick={handleCloseDetail}
                  title="Close Profile (ESC)"
                  aria-label="Close Profile"
                >
                  ✕
                </button>
              </div>

              {/* Rank Progression Bar in Modal */}
              <div className="p3r-modal-rank-row">
                <div className="p3r-modal-rank-badge">
                  <span>RELATIONSHIP PROGRESSION:</span>
                  <b>{activeCard.rankLevel === 10 ? 'RANK 10 // MAX' : `RANK ${activeCard.rankLevel} / 10`}</b>
                </div>

                <div className="p3r-modal-pips-track" aria-hidden="true">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`p3r-modal-pip ${idx < activeCard.rankLevel ? 'filled' : 'empty'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p3r-social-modal-body">
                <div className="p3r-modal-info-block">
                  <h3 className="p3r-modal-section-title">OVERVIEW & BACKGROUND</h3>
                  <p className="p3r-modal-p">{activeCard.detailedProfile}</p>
                </div>

                <div className="p3r-modal-info-block">
                  <h3 className="p3r-modal-section-title">ARCANA SIGNIFICANCE</h3>
                  <p className="p3r-modal-p p3r-significance-quote">
                    &ldquo;{activeCard.connectionSignificance}&rdquo;
                  </p>
                </div>

                <div className="p3r-modal-info-block">
                  <h3 className="p3r-modal-section-title">ASSOCIATED INITIATIVES & REPOSITORIES</h3>
                  <div className="p3r-modal-projects-list">
                    {activeCard.associatedProjects.map((proj, pIdx) => (
                      <span key={pIdx} className="p3r-modal-project-badge">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="p3r-social-modal-footer">
                {activeCard.actionType === 'copy' ? (
                  <>
                    <button
                      type="button"
                      className="p3r-modal-btn p3r-btn-primary"
                      onClick={() => handleCopyEmail(activeCard.handle)}
                    >
                      <span>📋 COPY EMAIL ADDRESS</span>
                    </button>
                    <a
                      href={activeCard.url}
                      className="p3r-modal-btn p3r-btn-secondary"
                    >
                      <span>✉ OPEN MAIL CLIENT</span>
                    </a>
                  </>
                ) : (
                  <a
                    href={activeCard.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-modal-btn p3r-btn-primary"
                    onClick={() => playSfx('confirm')}
                  >
                    <span>🔗 {activeCard.actionLabel} &gt;</span>
                  </a>
                )}

                <button
                  type="button"
                  className="p3r-modal-btn p3r-btn-ghost"
                  onClick={handleCloseDetail}
                >
                  <span>RETURN [ESC]</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copy Notification Toast */}
        {copyFeedback && (
          <div className="p3r-copy-toast" role="alert">
            <span>{copyFeedback}</span>
          </div>
        )}
      </div>
    </InternalPageLayout>
  );
};
