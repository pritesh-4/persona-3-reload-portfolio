import { useState, useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import { VERIFIED_CHANNELS, PRIMARY_CONTACT } from '../data/socialLinksData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/social.css';

interface SocialLinkPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

// Clean, lightweight inline SVG brand marks with correct proportions
const PlatformLogos = {
  github: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64 1.64 1.64 0 1 0-1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

const CONTACT_EMAIL = PRIMARY_CONTACT.email;
const MAILTO_URL = PRIMARY_CONTACT.mailtoUrl;

// External profiles (excluding direct email to prevent repetitive cards)
const EXTERNAL_PROFILES = VERIFIED_CHANNELS.filter((c) => c.id !== 'email');

export const SocialLinkPage: FC<SocialLinkPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopyEmail = useCallback(() => {
    playSfx('confirm');
    navigator.clipboard
      .writeText(CONTACT_EMAIL)
      .then(() => {
        setCopyFeedback(`COPIED: ${CONTACT_EMAIL}`);
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
      sectionId="007"
      characterId="yukari"
      currentRoute="/contact"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="DIRECT EMAIL OR VERIFIED PROFILES // YUKARI TAKEBA ARCHIVE"
    >
      <div className="p3r-social-screen">
        <div className="p3r-social-main-column">
          {/* ================================================================
              1. EDITORIAL HERO SECTION
              ================================================================ */}
          <header className="p3r-social-hero-plate">
            <div className="p3r-social-hero-meta">
              <span className="p3r-sec-num">007</span>
              <span className="p3r-social-hero-tag">COMMUNICATION TERMINAL // ACTIVE</span>
            </div>

            <h1 className="p3r-social-hero-heading">LET&apos;S CONNECT.</h1>

            <p className="p3r-social-hero-statement">
              Have an interesting idea, a project, or an engineering opportunity? Reach out directly via email or explore my verified profiles.
            </p>
          </header>

          {/* ================================================================
              2. DOMINANT EMAIL ACTION (Single Primary Channel)
              ================================================================ */}
          <section className="p3r-email-dominant-card" aria-labelledby="email-dominant-heading">
            <div className="p3r-email-card-header">
              <span className="p3r-email-card-tag" id="email-dominant-heading">
                PRIMARY DIRECT CHANNEL // 1-ON-1
              </span>
              <span className="p3r-email-card-status">
                <span className="p3r-status-dot active" aria-hidden="true" />
                <span>ACTIVE TRANSMISSION</span>
              </span>
            </div>

            <div className="p3r-email-address-row">
              <span className="p3r-email-address-icon" aria-hidden="true">
                {PlatformLogos.email}
              </span>
              <span className="p3r-email-address-text">{CONTACT_EMAIL}</span>
            </div>

            <div className="p3r-email-actions-bar">
              <a
                href={MAILTO_URL}
                className="p3r-email-send-button"
                onMouseEnter={() => playSfx('hover')}
                onClick={() => playSfx('confirm')}
              >
                <span>SEND DIRECT EMAIL</span>
                <span className="p3r-button-arrow">↗</span>
              </a>

              <button
                type="button"
                className="p3r-email-copy-button"
                onClick={handleCopyEmail}
                onMouseEnter={() => playSfx('hover')}
                aria-label="Copy email address to clipboard"
              >
                <span>COPY EMAIL</span>
                <span className="p3r-button-arrow">⎘</span>
              </button>
            </div>

            {copyFeedback && (
              <div className="p3r-social-copy-toast" role="status" aria-live="polite">
                <span>◈ {copyFeedback}</span>
              </div>
            )}
          </section>

          {/* ================================================================
              3. MINIMAL SECONDARY PROFILES (GitHub, LinkedIn, X)
              ================================================================ */}
          <section className="p3r-social-minimal-channels" aria-label="Verified Profiles">
            <div className="p3r-channels-header">
              <span className="p3r-channels-section-label">VERIFIED PROFILES &amp; ARCHIVES</span>
            </div>

            <div className="p3r-minimal-links-list">
              {EXTERNAL_PROFILES.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p3r-minimal-channel-link channel-${channel.id}`}
                  onMouseEnter={() => playSfx('hover')}
                  onClick={() => playSfx('confirm')}
                  aria-label={`${channel.name}: ${channel.handle}`}
                >
                  <div className="p3r-channel-link-left">
                    <span className="p3r-channel-link-icon">{PlatformLogos[channel.id]}</span>
                    <div className="p3r-channel-link-title-block">
                      <div className="p3r-channel-link-name-row">
                        <span className="p3r-channel-link-name">{channel.name}</span>
                        <span className="p3r-channel-link-handle">{channel.handle}</span>
                      </div>
                      <span className="p3r-channel-link-purpose">{channel.purpose}</span>
                    </div>
                  </div>

                  <span className="p3r-channel-link-arrow">↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Dedicated Right Character Card */}
        <div className="p3r-social-portrait-card" aria-label="Communication Officer Card">
          <div className="p3r-social-portrait-art-wrap">
            <img
              src="/assets/persona3/characters/yukari-takeba.webp"
              alt="Yukari Takeba — Communication Link"
              className="p3r-social-portrait-img"
            />
          </div>
          <div className="p3r-social-portrait-footer">
            <span className="p3r-social-portrait-tag">COMMUNICATION // LINK</span>
            <span className="p3r-social-portrait-arcana">LOVERS [006]</span>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
