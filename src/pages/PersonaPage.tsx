import { type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import { PROFILE_DATA } from '../data/profileData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/persona.css';

interface PersonaPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const PersonaPage: FC<PersonaPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();

  return (
    <InternalPageLayout
      title="PERSONA"
      sublabel="IDENTITY DOSSIER & ARCHIVE"
      sectionId="001"
      characterId="makoto"
      currentRoute="/about"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="PERSONNEL IDENTITY & RESEARCH INQUIRY DOSSIER"
    >
      <div className="p3r-persona-screen">
        {/* ================================================================
            1. EDITORIAL HERO: Left Identity Dossier + Right Dedicated Portrait
            ================================================================ */}
        <header className="p3r-persona-editorial-hero">
          <div className="p3r-persona-hero-main">
            <div className="p3r-persona-tag-row">
              <span className="p3r-sec-num">001</span>
              <span className="p3r-persona-tag">PERSONNEL FILE // ARCHIVE RECORD</span>
            </div>

            <h1 className="p3r-persona-hero-name">{PROFILE_DATA.name}</h1>
            <div className="p3r-persona-hero-headline">{PROFILE_DATA.headline}</div>

            <p className="p3r-persona-hero-statement">{PROFILE_DATA.summary}</p>

            <div className="p3r-persona-identity-grid">
              <div className="p3r-identity-cell">
                <span className="p3r-identity-label">EDUCATION</span>
                <span className="p3r-identity-value">MINING ENGINEERING</span>
              </div>
              <div className="p3r-identity-cell">
                <span className="p3r-identity-label">INSTITUTION</span>
                <span className="p3r-identity-value">NIT ROURKELA</span>
              </div>
              <div className="p3r-identity-cell">
                <span className="p3r-identity-label">LOCATION</span>
                <span className="p3r-identity-value">ROURKELA, ODISHA, INDIA</span>
              </div>
              <div className="p3r-identity-cell">
                <span className="p3r-identity-label">ACADEMIC STATUS</span>
                <span className="p3r-identity-value">2ND YEAR UNDERGRADUATE</span>
              </div>
            </div>
          </div>

          {/* Dedicated Right Portrait Composition */}
          <div className="p3r-persona-hero-portrait-card" aria-label="Personnel Portrait Composition">
            <div className="p3r-portrait-frame">
              <img
                src="/assets/persona3/characters/makoto-yuki.webp"
                alt="Makoto Yuki — S.E.E.S. Leader"
                className="p3r-portrait-char-art"
              />
              <div className="p3r-portrait-inset-badge">
                <img
                  src="/assets/profile/pritesh-profile.webp"
                  alt="Pritesh Kumar Jena"
                  className="p3r-portrait-inset-photo"
                />
                <div className="p3r-portrait-inset-meta">
                  <span className="p3r-portrait-inset-tag">VERIFIED RECORD</span>
                  <span className="p3r-portrait-inset-name">PRITESH JENA</span>
                </div>
              </div>
            </div>
            <div className="p3r-portrait-card-footer">
              <span className="p3r-portrait-footer-code">ARCANA // FOOL [000]</span>
              <span className="p3r-portrait-footer-sub">S.E.E.S. ARCHIVE FILE</span>
            </div>
          </div>
        </header>

        {/* ================================================================
            2. BELOW HERO: Clean Editorial Reading Sections
            ================================================================ */}
        <div className="p3r-persona-content-body">
          {/* Section 01: Biography & Research Narrative */}
          <section className="p3r-editorial-narrative-section" aria-labelledby="bio-heading">
            <div className="p3r-section-heading-bar">
              <span className="p3r-sec-num">01</span>
              <h2 id="bio-heading">PROFILE &amp; RESEARCH INQUIRY</h2>
            </div>

            <div className="p3r-narrative-paragraphs">
              {PROFILE_DATA.biography.map((para, idx) => (
                <p key={idx} className="p3r-narrative-p">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Section 02: Engineering Directives & Philosophy */}
          <section className="p3r-editorial-philosophy-section" aria-labelledby="philosophy-heading">
            <div className="p3r-section-heading-bar">
              <span className="p3r-sec-num">02</span>
              <h2 id="philosophy-heading">ENGINEERING DIRECTIVES &amp; PHILOSOPHY</h2>
            </div>

            <div className="p3r-philosophy-list">
              {PROFILE_DATA.philosophy.map((item, idx) => (
                <div
                  key={idx}
                  className="p3r-philosophy-row"
                  onMouseEnter={() => playSfx('hover')}
                >
                  <span className="p3r-philosophy-num">0{idx + 1}</span>
                  <div className="p3r-philosophy-content">
                    <h3 className="p3r-philosophy-title">{item.title}</h3>
                    <p className="p3r-philosophy-statement">{item.statement}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 03: Compact Technical-Interest Index */}
          <section className="p3r-editorial-interests-section" aria-labelledby="interests-heading">
            <div className="p3r-section-heading-bar">
              <span className="p3r-sec-num">03</span>
              <h2 id="interests-heading">TECHNICAL INTERESTS &amp; DOMAINS</h2>
            </div>

            <div className="p3r-interests-grid">
              {PROFILE_DATA.cards.map((card) => (
                <article
                  key={card.id}
                  className="p3r-interest-card"
                  onMouseEnter={() => playSfx('hover')}
                >
                  <div className="p3r-interest-card-head">
                    <span className="p3r-interest-label">{card.label}</span>
                    <h3 className="p3r-interest-val">{card.primaryValue}</h3>
                  </div>
                  <ul className="p3r-interest-items">
                    {card.supportingInfo.map((info, iIdx) => (
                      <li key={iIdx} className="p3r-interest-item">
                        <span className="p3r-interest-bullet">✦</span>
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </InternalPageLayout>
  );
};
