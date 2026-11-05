import { useState, useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import { VERIFIED_CHANNELS } from '../data/socialLinksData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/social.css';

interface SocialLinkPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

// Clean, lightweight inline SVG brand marks with correct proportions
const PlatformLogos = {
  github: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64 1.64 1.64 0 1 0-1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

const CONTACT_EMAIL = 'priteshjena16@gmail.com';
const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=Portfolio%20Inquiry%20%E2%80%94%20Pritesh%20Jena`;

export const SocialLinkPage: FC<SocialLinkPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopyEmail = useCallback(() => {
    playSfx('confirm');
    navigator.clipboard
      .writeText(CONTACT_EMAIL)
      .then(() => {
        setCopyFeedback(`COPIED TO CLIPBOARD: ${CONTACT_EMAIL}`);
        setTimeout(() => setCopyFeedback(null), 3500);
      })
      .catch(() => {
        setCopyFeedback(`PRESS CTRL+C TO COPY: ${CONTACT_EMAIL}`);
        setTimeout(() => setCopyFeedback(null), 4000);
      });
  }, [playSfx]);

  return (
    <InternalPageLayout
      title="SOCIAL LINK"
      sublabel="COMMUNICATION HUB & DIRECT CHANNELS"
      sectionId="005"
      characterId="yukari"
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/contact"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="CONNECT VIA GITHUB, LINKEDIN, X OR DIRECT EMAIL"
    >
      <div className="p3r-social-screen">
        {/* ================================================================
            1. EDITORIAL HERO SECTION
            ================================================================ */}
        <header className="p3r-social-hero-plate">
          <div className="p3r-social-hero-content">
            <div className="p3r-social-hero-meta">
              <span className="p3r-social-hero-tag">COMMUNICATION TERMINAL // ACTIVE</span>
              <span className="p3r-social-verified-badge">VERIFIED CHANNELS</span>
            </div>

            <h1 className="p3r-social-hero-heading">LET&apos;S CONNECT.</h1>

            <p className="p3r-social-hero-statement">
              Have an interesting idea, a project or an opportunity? Find me through these channels.
            </p>
          </div>

          <div className="p3r-social-hero-badge-col" aria-hidden="true">
            <div className="p3r-hero-badge-box">
              <span className="p3r-badge-sub">DIRECT FREQUENCY</span>
              <span className="p3r-badge-bold">OPEN CHANNELS</span>
            </div>
          </div>
        </header>

        {/* ================================================================
            2. FOUR VERIFIED SOCIAL CHANNEL TILES (2-Column Grid on Desktop)
            ================================================================ */}
        <section className="p3r-social-channels-grid" aria-label="Verified Communication Channels">
          {VERIFIED_CHANNELS.map((channel) => {
            const isExternal = channel.id !== 'email';
            const isFeatured = channel.id === 'github';

            return (
              <a
                key={channel.id}
                href={channel.url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`p3r-channel-tile ${isFeatured ? 'featured' : ''} tile-${channel.id}`}
                onMouseEnter={() => playSfx('hover')}
                onClick={() => playSfx('confirm')}
                aria-label={`${channel.name}: ${channel.handle}`}
              >
                {/* Tile Header: Logo + Badge */}
                <div className="p3r-tile-head">
                  <div className="p3r-tile-logo-box" style={{ color: channel.brandColor }}>
                    {PlatformLogos[channel.id]}
                  </div>
                  <span className="p3r-tile-badge">{channel.badge}</span>
                </div>

                {/* Tile Body: Name & Handle */}
                <div className="p3r-tile-body">
                  <div className="p3r-tile-title-row">
                    <h2 className="p3r-tile-name">{channel.name}</h2>
                    <span className="p3r-tile-arrow">↗</span>
                  </div>

                  <span className="p3r-tile-handle">{channel.handle}</span>
                  <p className="p3r-tile-purpose">{channel.purpose}</p>
                </div>

                {/* Tile Footer Action Button */}
                <div className="p3r-tile-foot">
                  <span className="p3r-tile-action-pill">
                    <span>{channel.actionLabel}</span>
                    <span className="p3r-pill-arrow">▸</span>
                  </span>
                </div>
              </a>
            );
          })}
        </section>

        {/* ================================================================
            3. PROMINENT DEDICATED EMAIL CONTACT SECTION
            ================================================================ */}
        <section className="p3r-email-contact-plate" aria-labelledby="email-contact-heading">
          <div className="p3r-email-text-col">
            <div className="p3r-email-tag-row">
              <span className="p3r-email-tag">DIRECT TRANSMISSION // 1-ON-1</span>
              <span className="p3r-email-status-pill">AVAILABLE FOR INQUIRIES</span>
            </div>

            <h2 id="email-contact-heading" className="p3r-email-heading">
              HAVE SOMETHING IN MIND?
            </h2>

            <p className="p3r-email-subcopy">
              Open to interesting projects, collaborations and conversations.
            </p>

            <div className="p3r-email-address-plate">
              <span className="p3r-email-plate-icon">{PlatformLogos.email}</span>
              <span className="p3r-email-plate-addr">{CONTACT_EMAIL}</span>
            </div>
          </div>

          <div className="p3r-email-actions-col">
            <a
              href={MAILTO_URL}
              className="p3r-send-email-cta-btn"
              onMouseEnter={() => playSfx('hover')}
              onClick={() => playSfx('confirm')}
            >
              <span className="p3r-cta-icon">{PlatformLogos.email}</span>
              <span>SEND ME AN EMAIL</span>
              <span className="p3r-cta-arrow">✉</span>
            </a>

            <button
              type="button"
              className="p3r-copy-email-sub-btn"
              onClick={handleCopyEmail}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>📋 COPY EMAIL ADDRESS</span>
            </button>

            {copyFeedback && (
              <div className="p3r-copy-toast" role="status">
                <span>✓ {copyFeedback}</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </InternalPageLayout>
  );
};
