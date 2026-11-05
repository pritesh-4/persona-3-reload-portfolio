import { useState, useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  SOCIAL_LINKS_DATA,
  type SocialLinkCard,
} from '../data/socialLinksData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/social.css';

interface SocialLinkPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const SocialLinkPage: FC<SocialLinkPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [selectedChannel, setSelectedChannel] = useState<SocialLinkCard>(SOCIAL_LINKS_DATA[0]);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleSelectChannel = useCallback(
    (channel: SocialLinkCard, isPreview = false) => {
      if (isPreview) {
        if (selectedChannel.id !== channel.id) {
          playSfx('hover');
          setSelectedChannel(channel);
        }
        return;
      }
      playSfx('select');
      setSelectedChannel(channel);
    },
    [selectedChannel.id, playSfx]
  );

  const handleCopyEmail = useCallback(
    (email: string) => {
      playSfx('confirm');
      navigator.clipboard.writeText(email);
      setCopyFeedback(`COPIED TO CLIPBOARD: ${email}`);
      setTimeout(() => {
        setCopyFeedback(null);
      }, 3000);
    },
    [playSfx]
  );

  return (
    <InternalPageLayout
      title="SOCIAL LINK"
      sublabel="OPEN COMMUNICATION CHANNELS & PROFILES"
      sectionId="006"
      characterId="yukari"
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/contact"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="HOVER OR SELECT CHANNEL TO PREVIEW DIRECT TRANSMISSION CODES"
    >
      <div className="p3r-social-screen">
        {/* ================================================================
            TWO-COLUMN OPEN CHANNELS COMPOSITION
            Left: Vertical Channel Directory | Right: Large Presentation Plate
            ================================================================ */}
        <div className="p3r-social-channels-layout">
          {/* LEFT: VERTICAL LIST OF COMMUNICATION CHANNELS */}
          <nav className="p3r-channels-directory-column" aria-label="Communication Channels">
            <div className="p3r-channels-col-head">
              <span className="p3r-channels-tag">VERIFIED CHANNELS</span>
              <span className="p3r-channels-count">{SOCIAL_LINKS_DATA.length} ACTIVE</span>
            </div>

            <div
              className="p3r-channels-list"
              role="listbox"
              aria-label="Communication channels"
              aria-live="polite"
            >
              {SOCIAL_LINKS_DATA.map((channel) => (
                <div
                  key={channel.id}
                  role="option"
                  aria-selected={selectedChannel.id === channel.id}
                  tabIndex={0}
                  className={`p3r-channel-item-row ${selectedChannel.id === channel.id ? 'selected' : ''}`}
                  onClick={() => handleSelectChannel(channel)}
                  onMouseEnter={() => handleSelectChannel(channel, true)}
                  onFocus={() => handleSelectChannel(channel, true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectChannel(channel);
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
                  <span className="p3r-channel-row-icon" aria-hidden="true">{channel.icon}</span>
                  <div className="p3r-channel-row-body">
                    <span className="p3r-channel-row-name">{channel.name}</span>
                    <span className="p3r-channel-row-handle">{channel.handle}</span>
                  </div>
                  <span className="p3r-channel-row-arrow">▸</span>
                </div>
              ))}
            </div>
          </nav>

          {/* RIGHT: LARGE PRESENTATION AREA */}
          <section className="p3r-channel-presentation-column" aria-live="polite">
            <div className="p3r-presentation-plate">
              {/* Header */}
              <div className="p3r-presentation-head">
                <div className="p3r-presentation-meta-row">
                  <span className="p3r-presentation-category-tag">{selectedChannel.categoryLabel}</span>
                  <span className="p3r-presentation-status-tag">VERIFIED PROFILE</span>
                </div>

                <h2 className="p3r-presentation-title">{selectedChannel.name}</h2>
                <div className="p3r-presentation-handle-badge">
                  <span>ACCOUNT / HANDLE:</span>
                  <b>{selectedChannel.handle}</b>
                </div>
              </div>

              {/* Body */}
              <div className="p3r-presentation-body">
                {/* Short Overview */}
                <div className="p3r-presentation-section">
                  <h3 className="p3r-presentation-sec-label">CHANNEL OVERVIEW</h3>
                  <p className="p3r-presentation-text">{selectedChannel.detailedProfile}</p>
                </div>

                {/* What Visitors Can Use This Channel For */}
                <div className="p3r-presentation-section">
                  <h3 className="p3r-presentation-sec-label">WHAT VISITORS CAN USE THIS CHANNEL FOR</h3>
                  <p className="p3r-presentation-usage">{selectedChannel.shortDescription}</p>
                </div>

                {/* Relevant Projects / Context */}
                {selectedChannel.associatedProjects.length > 0 && (
                  <div className="p3r-presentation-section">
                    <h3 className="p3r-presentation-sec-label">ASSOCIATED CONTEXTS &amp; INITIATIVES</h3>
                    <div className="p3r-presentation-projects-row">
                      {selectedChannel.associatedProjects.map((proj, idx) => (
                        <span key={idx} className="p3r-presentation-proj-tag">
                          ◈ {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Action Links */}
                <div className="p3r-presentation-actions">
                  {selectedChannel.id === 'email' ? (
                    <div className="p3r-email-actions-group">
                      <a
                        href={selectedChannel.url}
                        className="p3r-channel-action-btn primary"
                        onClick={() => playSfx('confirm')}
                      >
                        <span>✉ SEND DIRECT EMAIL</span>
                      </a>
                      <button
                        type="button"
                        className="p3r-channel-action-btn secondary"
                        onClick={() => handleCopyEmail(selectedChannel.handle)}
                      >
                        <span>📋 COPY EMAIL ADDRESS</span>
                      </button>
                    </div>
                  ) : (
                    <a
                      href={selectedChannel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-channel-action-btn primary"
                      onClick={() => playSfx('confirm')}
                    >
                      <span>{selectedChannel.actionLabel} ↗</span>
                    </a>
                  )}

                  {copyFeedback && (
                    <div className="p3r-copy-notification" role="status">
                      <span>✓ {copyFeedback}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </InternalPageLayout>
  );
};
