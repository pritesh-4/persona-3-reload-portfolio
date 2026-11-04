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
      sublabel="IDENTITY & ARCHIVE"
      sectionId="001"
      characterId="makoto"
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/about"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="PRESS ESC TO RETURN TO HUB"
    >
      <div className="p3r-persona-screen">
        {/* Personnel Hero Dossier */}
        <div className="p3r-dossier-hero">
          <div className="p3r-dossier-meta-row">
            <span className="p3r-dossier-tag">
              <span>PERSONNEL RECORD</span>
              <span>//</span>
              <span>FILE: 001</span>
            </span>
            <span className="p3r-dossier-badge">IDENTITY CONFIRMED</span>
          </div>

          <h1 className="p3r-dossier-name">{PROFILE_DATA.name}</h1>
          <p className="p3r-dossier-role">{PROFILE_DATA.role}</p>

          <div className="p3r-dossier-stats-strip">
            <div className="p3r-dossier-stat-chip">
              <span className="p3r-stat-chip-label">ARCANA</span>
              <span className="p3r-stat-chip-value">{PROFILE_DATA.arcana}</span>
            </div>
            <div className="p3r-dossier-stat-chip">
              <span className="p3r-stat-chip-label">LEVEL</span>
              <span className="p3r-stat-chip-value">LV. {PROFILE_DATA.level}</span>
            </div>
            <div className="p3r-dossier-stat-chip">
              <span className="p3r-stat-chip-label">AFFILIATION</span>
              <span className="p3r-stat-chip-value">{PROFILE_DATA.affiliation}</span>
            </div>
            <div className="p3r-dossier-stat-chip">
              <span className="p3r-stat-chip-label">LOCATION</span>
              <span className="p3r-stat-chip-value">{PROFILE_DATA.location}</span>
            </div>
            <div className="p3r-dossier-stat-chip">
              <span className="p3r-stat-chip-label">STATUS</span>
              <span className="p3r-stat-chip-value">{PROFILE_DATA.status}</span>
            </div>
          </div>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="p3r-persona-grid">
          {/* Biography & Mission */}
          <div className="p3r-dossier-bio-card">
            <h2 className="p3r-card-heading">
              <span>SUBJECT SUMMARY</span>
              <span>//</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>DOSSIER 001</span>
            </h2>

            <p className="p3r-bio-lead">{PROFILE_DATA.summary}</p>

            <div className="p3r-bio-paragraphs">
              {PROFILE_DATA.biography.map((p, idx) => (
                <p key={idx} className="p3r-bio-p">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Core Directives / Philosophy */}
          <div className="p3r-directives-card">
            <h2 className="p3r-card-heading">
              <span>CORE DIRECTIVES</span>
              <span>//</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>PHILOSOPHY</span>
            </h2>

            {PROFILE_DATA.philosophy.map((item, idx) => (
              <div
                key={idx}
                className="p3r-directive-item"
                onMouseEnter={() => playSfx('hover')}
              >
                <h3 className="p3r-directive-title">{item.title}</h3>
                <p className="p3r-directive-desc">{item.statement}</p>
              </div>
            ))}
          </div>

          {/* Combat / Technical Attributes */}
          <div className="p3r-attributes-card">
            <h2 className="p3r-card-heading">
              <span>OPERATIONAL ATTRIBUTES</span>
              <span>//</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>STATUS MATRIX</span>
            </h2>

            <div className="p3r-attrs-list">
              {PROFILE_DATA.attributes.map((attr, idx) => (
                <div
                  key={idx}
                  className="p3r-attr-slot"
                  onMouseEnter={() => playSfx('hover')}
                >
                  <div className="p3r-attr-label-box">
                    <span className="p3r-attr-label">{attr.label}</span>
                    <span className="p3r-attr-val">{attr.value}</span>
                  </div>
                  <span className="p3r-attr-rating">{attr.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
