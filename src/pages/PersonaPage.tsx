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
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/about"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="PERSONNEL IDENTITY & RESEARCH INQUIRY DOSSIER"
    >
      <div className="p3r-persona-screen">
        {/* ================================================================
            EDITORIAL HERO DOSSIER COMPOSITION
            ================================================================ */}
        <section className="p3r-persona-hero-plate">
          <div className="p3r-hero-content-col">
            <div className="p3r-hero-tag-row">
              <span className="p3r-hero-tag-text">PERSONNEL FILE // 001</span>
              <span className="p3r-hero-status-pill">IDENTITY CONFIRMED</span>
            </div>

            <h1 className="p3r-persona-hero-name">{PROFILE_DATA.name}</h1>
            <div className="p3r-persona-hero-headline">{PROFILE_DATA.headline}</div>
            
            <p className="p3r-persona-hero-statement">
              {PROFILE_DATA.summary}
            </p>

            <div className="p3r-hero-meta-badges">
              <div className="p3r-meta-badge-item">
                <span className="p3r-meta-badge-label">EDUCATION</span>
                <span className="p3r-meta-badge-val">MINING ENGINEERING</span>
              </div>
              <div className="p3r-meta-badge-item">
                <span className="p3r-meta-badge-label">INSTITUTION</span>
                <span className="p3r-meta-badge-val">NIT ROURKELA</span>
              </div>
              <div className="p3r-meta-badge-item">
                <span className="p3r-meta-badge-label">LOCATION</span>
                <span className="p3r-meta-badge-val">ROURKELA, ODISHA, INDIA</span>
              </div>
              <div className="p3r-meta-badge-item">
                <span className="p3r-meta-badge-label">ACADEMIC STATUS</span>
                <span className="p3r-meta-badge-val">2ND YEAR UNDERGRADUATE</span>
              </div>
            </div>
          </div>

          {/* Graphic Asymmetrical Accent Slabs */}
          <div className="p3r-hero-accent-block" aria-hidden="true">
            <div className="p3r-accent-slant-bg" />
            <div className="p3r-hero-art-window">
              <img
                src="/assets/persona3/characters/makoto-yuki.webp"
                alt=""
                className="p3r-hero-art-img"
              />
            </div>
            <div className="p3r-hero-stamp-tag">P3R // PROTAGONIST ARCHETYPE</div>
          </div>
        </section>

        {/* ================================================================
            TWO-COLUMN EDITORIAL SPREAD
            ================================================================ */}
        <div className="p3r-persona-editorial-grid">
          {/* LEFT: Biography & Architectural Philosophy */}
          <div className="p3r-editorial-col-main">
            {/* Biography Section */}
            <section className="p3r-editorial-section">
              <div className="p3r-editorial-section-title">
                <span className="p3r-sec-num">01</span>
                <h2>PROFILE &amp; RESEARCH INQUIRY</h2>
              </div>

              <div className="p3r-bio-text-block">
                {PROFILE_DATA.biography.map((para, idx) => (
                  <p key={idx} className="p3r-bio-paragraph">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* Directives / Philosophy Section */}
            <section className="p3r-editorial-section">
              <div className="p3r-editorial-section-title">
                <span className="p3r-sec-num">02</span>
                <h2>ENGINEERING DIRECTIVES &amp; PHILOSOPHY</h2>
              </div>

              <div className="p3r-directives-numbered-list">
                {PROFILE_DATA.philosophy.map((item, idx) => (
                  <div
                    key={idx}
                    className="p3r-directive-row"
                    onMouseEnter={() => playSfx('hover')}
                  >
                    <span className="p3r-directive-index">0{idx + 1}</span>
                    <div className="p3r-directive-body">
                      <h3 className="p3r-directive-title">{item.title}</h3>
                      <p className="p3r-directive-statement">{item.statement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Verified Domains & Technical Interests Index */}
          <aside className="p3r-editorial-col-sidebar">
            <div className="p3r-editorial-section-title">
              <span className="p3r-sec-num">03</span>
              <h2>TECHNICAL INTERESTS &amp; DOMAINS</h2>
            </div>

            <div className="p3r-interests-stack">
              {PROFILE_DATA.cards.map((card) => (
                <div
                  key={card.id}
                  className="p3r-interest-plate"
                  onMouseEnter={() => playSfx('hover')}
                >
                  <div className="p3r-interest-plate-head">
                    <span className="p3r-interest-plate-label">{card.label}</span>
                    <span className="p3r-interest-plate-tag">CONFIRMED</span>
                  </div>
                  <h4 className="p3r-interest-plate-val">{card.primaryValue}</h4>
                  <ul className="p3r-interest-list">
                    {card.supportingInfo.map((info, idx) => (
                      <li key={idx} className="p3r-interest-item">
                        <span className="p3r-interest-bullet">▸</span>
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </InternalPageLayout>
  );
};
