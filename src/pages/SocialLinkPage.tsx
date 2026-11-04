import { useState, useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import { SOCIAL_LINKS_DATA, type SocialLinkChannel } from '../data/socialLinksData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/social.css';

interface SocialLinkPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const SocialLinkPage: FC<SocialLinkPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

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

  return (
    <InternalPageLayout
      title="SOCIAL LINK"
      sublabel="COMMUNICATION TERMINAL & FREQUENCIES"
      sectionId="007"
      characterId="yukari"
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/contact"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="CONNECT VIA GITHUB, LINKEDIN, OR DIRECT ELECTRONIC DISPATCH"
    >
      <div className="p3r-social-screen">
        {/* Terminal Status Hero Banner */}
        <div className="p3r-social-hero-box">
          <div className="p3r-social-hero-left">
            <span className="p3r-social-tag">COMMUNICATION FREQUENCY // S.E.E.S. ARCHIVE</span>
            <h1 className="p3r-social-hero-title">DISPATCH TERMINAL</h1>
            <p className="p3r-social-hero-sub">
              Open channels for engineering collaborations, open source, and project inquiries.
            </p>
          </div>

          <div className="p3r-social-status-indicator">
            <span className="p3r-social-dot" />
            <span className="p3r-social-status-txt">TRANSMISSION CHANNELS: ACTIVE</span>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="p3r-social-channels-grid">
          {SOCIAL_LINKS_DATA.map((ch: SocialLinkChannel) => (
            <div
              key={ch.id}
              className="p3r-channel-card"
              onMouseEnter={() => playSfx('hover')}
            >
              <div className="p3r-channel-head">
                <div className="p3r-channel-icon-wrap">
                  <span className="p3r-channel-symbol">{ch.icon}</span>
                  <div className="p3r-channel-name-block">
                    <h2 className="p3r-channel-name">{ch.name}</h2>
                    <span className="p3r-channel-sublabel">{ch.sublabel}</span>
                  </div>
                </div>

                <span className="p3r-channel-rank-badge">{ch.arcanaRank}</span>
              </div>

              <div className="p3r-channel-handle">{ch.handle}</div>

              <p className="p3r-channel-desc">{ch.description}</p>

              <div className="p3r-channel-actions">
                {ch.actionType === 'copy' ? (
                  <>
                    <button
                      type="button"
                      className="p3r-channel-btn p3r-btn-primary"
                      onClick={() => handleCopyEmail(ch.handle)}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>📋 COPY ADDRESS</span>
                    </button>
                    <a
                      href={ch.url}
                      className="p3r-channel-btn p3r-btn-secondary"
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>✉ OPEN MAIL CLIENT</span>
                    </a>
                  </>
                ) : (
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-channel-btn p3r-btn-primary"
                    onMouseEnter={() => playSfx('hover')}
                  >
                    <span>🔗 OPEN FREQUENCY</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Copy Feedback Toast */}
        {copyFeedback && (
          <div className="p3r-copy-toast" role="status" aria-live="polite">
            <span>{copyFeedback}</span>
          </div>
        )}
      </div>
    </InternalPageLayout>
  );
};
