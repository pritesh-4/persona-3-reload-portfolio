import { useState, useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  HOARDSPACE_EXPERIENCE,
  GSSOC_EXPERIENCE,
  HACKNITR_EXPERIENCE,
  SPONSORSHIP_EXPERIENCE,
  ASTROPHYSICS_RESEARCH,
  IASC_EXPERIENCE,
  CHESS_EXPERIENCE,
  type PipelineStage,
} from '../data/experienceAchievementsData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/experience.css';

interface ExperiencePageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

type FilterCategory = 'ALL' | 'AI' | 'COMMUNITY' | 'SPONSORSHIP' | 'RESEARCH' | 'CHESS';

export const ExperiencePage: FC<ExperiencePageProps> = ({
  onNavigate,
  onBackToMenu,
}) => {
  const { playSfx } = useAudioContext();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  const handleFilterClick = useCallback(
    (category: FilterCategory) => {
      playSfx('select');
      setActiveFilter(category);
    },
    [playSfx]
  );

  const handleStageSelect = useCallback(
    (idx: number) => {
      playSfx('select');
      setSelectedStageIdx(idx);
    },
    [playSfx]
  );

  const currentPipelineStages = HOARDSPACE_EXPERIENCE.pipelineStages ?? [];
  const currentStage: PipelineStage | undefined = currentPipelineStages[selectedStageIdx];

  const showAi = activeFilter === 'ALL' || activeFilter === 'AI';
  const showCommunity = activeFilter === 'ALL' || activeFilter === 'COMMUNITY';
  const showSponsorship = activeFilter === 'ALL' || activeFilter === 'SPONSORSHIP';
  const showResearch = activeFilter === 'ALL' || activeFilter === 'RESEARCH';
  const showChess = activeFilter === 'ALL' || activeFilter === 'CHESS';

  return (
    <InternalPageLayout
      title="EXPERIENCE"
      sublabel="PROFESSIONAL EXPERIENCE & ACHIEVEMENTS"
      sectionId="004"
      characterId="mitsuru"
      backgroundPath="/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png"
      currentRoute="/experience"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="INSPECT FIELD RECORD • HOARDSPACE AI PIPELINE • OPEN SOURCE & RESEARCH"
    >
      <div className="p3r-experience-screen" role="region" aria-label="Field Record and Professional Experience">
        {/* ================================================================
            1. EDITORIAL OPENING HERO PLATE
            ================================================================ */}
        <section className="p3r-exp-hero-plate" aria-label="Experience Archive Header">
          <div className="p3r-exp-hero-meta">
            <span className="p3r-exp-hero-code">ARCHIVE // PERSONNEL DOSSIER</span>
            <div className="p3r-exp-hero-badge">
              <span>STATUS // ACTIVE FIELD OPERATIVE</span>
            </div>
          </div>

          <h1 className="p3r-exp-hero-heading">FIELD RECORD</h1>
          <p className="p3r-exp-hero-subline">
            EXPERIENCE • CONTRIBUTIONS • RESEARCH • ACHIEVEMENTS
          </p>

          <p className="p3r-exp-hero-intro">
            A record of the work, communities and interests that shape my journey as an engineer and technology enthusiast.
          </p>

          {/* Quick Filter Jump Bar */}
          <nav className="p3r-exp-category-bar" aria-label="Category Filter">
            <button
              type="button"
              className={`p3r-exp-filter-pill ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => handleFilterClick('ALL')}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>[ALL RECORDS]</span>
            </button>
            <button
              type="button"
              className={`p3r-exp-filter-pill ${activeFilter === 'AI' ? 'active' : ''}`}
              onClick={() => handleFilterClick('AI')}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>[AI / INDUSTRY]</span>
            </button>
            <button
              type="button"
              className={`p3r-exp-filter-pill ${activeFilter === 'COMMUNITY' ? 'active' : ''}`}
              onClick={() => handleFilterClick('COMMUNITY')}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>[OPEN SOURCE & LEADERSHIP]</span>
            </button>
            <button
              type="button"
              className={`p3r-exp-filter-pill ${activeFilter === 'SPONSORSHIP' ? 'active' : ''}`}
              onClick={() => handleFilterClick('SPONSORSHIP')}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>[SPONSORSHIP]</span>
            </button>
            <button
              type="button"
              className={`p3r-exp-filter-pill ${activeFilter === 'RESEARCH' ? 'active' : ''}`}
              onClick={() => handleFilterClick('RESEARCH')}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>[RESEARCH & ASTRONOMY]</span>
            </button>
            <button
              type="button"
              className={`p3r-exp-filter-pill ${activeFilter === 'CHESS' ? 'active' : ''}`}
              onClick={() => handleFilterClick('CHESS')}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>[CHESS]</span>
            </button>
          </nav>
        </section>

        {/* ================================================================
            2. FEATURED PROFESSIONAL EXPERIENCE — HOARDSPACE
            ================================================================ */}
        {showAi && (
          <article className="p3r-exp-hoardspace-plate" aria-labelledby="hoardspace-role-title">
            <header className="p3r-hoardspace-header">
              <div className="p3r-hoardspace-meta-row">
                <div className="p3r-hoardspace-tags-group">
                  <div className="p3r-badge-primary">
                    <span>{HOARDSPACE_EXPERIENCE.statusBadge}</span>
                  </div>
                  <span className="p3r-badge-industry">
                    {HOARDSPACE_EXPERIENCE.subOrganization}
                  </span>
                  <span className="p3r-badge-location">
                    📍 {HOARDSPACE_EXPERIENCE.location}
                  </span>
                </div>

                <div className="p3r-hoardspace-links">
                  {HOARDSPACE_EXPERIENCE.links.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-exp-action-btn"
                      onClick={() => playSfx('confirm')}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>{link.label} ↗</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p3r-hoardspace-title-block">
                <h2 id="hoardspace-role-title" className="p3r-hoardspace-role">
                  {HOARDSPACE_EXPERIENCE.role}
                </h2>
                <h3 className="p3r-hoardspace-org">
                  {HOARDSPACE_EXPERIENCE.organization}
                </h3>
                <p className="p3r-hoardspace-headline">
                  {HOARDSPACE_EXPERIENCE.headline}
                </p>
              </div>

              <p className="p3r-hoardspace-summary">
                {HOARDSPACE_EXPERIENCE.summary}
              </p>
            </header>

            {/* 5-Stage Interactive Pipeline Flow */}
            <div className="p3r-pipeline-stage-box" aria-label="Computer Vision Audience Analytics Pipeline">
              <div className="p3r-pipeline-header-row">
                <h4 className="p3r-pipeline-title">
                  AUDIENCE ANALYTICS PIPELINE // CCTV OBSERVATIONS TO BUYER DOSSIER
                </h4>
                <span className="p3r-pipeline-hint">SELECT STAGE TO INSPECT ARCHITECTURAL BREAKDOWN</span>
              </div>

              <div className="p3r-pipeline-track" role="tablist">
                {currentPipelineStages.map((stage, idx) => {
                  const isActive = idx === selectedStageIdx;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`p3r-pipeline-node ${isActive ? 'active' : ''}`}
                      onClick={() => handleStageSelect(idx)}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span className="p3r-pipeline-step-badge">{stage.step}</span>
                      <span className="p3r-pipeline-node-title">{stage.title}</span>
                      <span className="p3r-pipeline-node-sub">{stage.subtitle}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Stage Detail Inspector */}
              {currentStage && (
                <div className="p3r-pipeline-inspector" role="tabpanel" aria-live="polite">
                  <div className="p3r-inspector-step-col">
                    <span className="p3r-inspector-step-big">{currentStage.step}</span>
                    <span className="p3r-inspector-step-lbl">STAGE</span>
                  </div>
                  <div className="p3r-inspector-desc-col">
                    <h5 className="p3r-inspector-title">
                      {currentStage.title} — {currentStage.subtitle}
                    </h5>
                    <p className="p3r-inspector-desc">
                      {currentStage.description}
                    </p>
                    <span className="p3r-inspector-tech">
                      ENGINEERING FOCUS: {currentStage.techFocus}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Responsibilities and Privacy Safeguards */}
            <div className="p3r-hoardspace-details-grid">
              {/* Responsibilities */}
              <div className="p3r-exp-dossier-card">
                <h4 className="p3r-exp-card-header">
                  ✦ CORE TECHNICAL CONTRIBUTIONS
                </h4>
                <ul className="p3r-exp-checklist">
                  {HOARDSPACE_EXPERIENCE.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
                <div className="p3r-exp-tech-row" aria-label="Skills & Practices">
                  {HOARDSPACE_EXPERIENCE.skillsAndPractices?.map(tag => (
                    <span key={tag} className="p3r-exp-tag">
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Privacy Safeguards */}
              <div className="p3r-exp-dossier-card p3r-exp-safeguards-card">
                <h4 className="p3r-exp-card-header">
                  🛡 ARCHITECTURAL & PRIVACY SAFEGUARDS
                </h4>
                <ul className="p3r-exp-safeguard-list">
                  {HOARDSPACE_EXPERIENCE.privacySafeguards?.map((safe, i) => (
                    <li key={i}>{safe}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        )}

        {/* ================================================================
            3. OPEN SOURCE & LEADERSHIP (ASYMMETRIC DUAL LAYOUT)
            ================================================================ */}
        {showCommunity && (
          <div className="p3r-exp-dual-grid">
            {/* GirlScript Summer of Code */}
            <article className="p3r-exp-module-card" aria-labelledby="gssoc-title">
              <div className="p3r-module-top-row">
                <span className="p3r-module-cat">{GSSOC_EXPERIENCE.categoryCode}</span>
                <span className="p3r-badge-primary">
                  <span>{GSSOC_EXPERIENCE.statusBadge}</span>
                </span>
              </div>

              <div>
                <h2 id="gssoc-title" className="p3r-module-role">
                  {GSSOC_EXPERIENCE.role}
                </h2>
                <h3 className="p3r-module-org">
                  {GSSOC_EXPERIENCE.organization}
                </h3>
                <p className="p3r-module-suborg">
                  {GSSOC_EXPERIENCE.subOrganization}
                </p>
              </div>

              <p className="p3r-module-summary">
                {GSSOC_EXPERIENCE.summary}
              </p>

              <div className="p3r-exp-dossier-card">
                <h4 className="p3r-exp-card-header">✦ COLLABORATIVE CONTRIBUTIONS</h4>
                <ul className="p3r-exp-checklist">
                  {GSSOC_EXPERIENCE.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p3r-exp-tech-row">
                {GSSOC_EXPERIENCE.skillsAndPractices?.map(tag => (
                  <span key={tag} className="p3r-exp-tag">
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              <div className="p3r-module-actions">
                {GSSOC_EXPERIENCE.links.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-exp-action-btn"
                    onClick={() => playSfx('confirm')}
                    onMouseEnter={() => playSfx('hover')}
                  >
                    <span>{link.label} ↗</span>
                  </a>
                ))}
              </div>
            </article>

            {/* HackNITR */}
            <article className="p3r-exp-module-card hacknitr" aria-labelledby="hacknitr-title">
              <div className="p3r-module-top-row">
                <span className="p3r-module-cat">{HACKNITR_EXPERIENCE.categoryCode}</span>
                <span className="p3r-badge-primary">
                  <span>{HACKNITR_EXPERIENCE.statusBadge}</span>
                </span>
              </div>

              <div>
                <h2 id="hacknitr-title" className="p3r-module-role">
                  {HACKNITR_EXPERIENCE.role}
                </h2>
                <h3 className="p3r-module-org">
                  {HACKNITR_EXPERIENCE.organization}
                </h3>
                <p className="p3r-module-suborg">
                  {HACKNITR_EXPERIENCE.subOrganization}
                </p>
              </div>

              {/* Flagship Scale Metric */}
              <div className="p3r-module-metric-pill">
                <span className="p3r-module-metric-val">6,200+</span>
                <span className="p3r-module-metric-lbl">
                  OFFICIALLY REPORTED REGISTRATIONS (HACKNITR 7.0)
                </span>
              </div>

              <p className="p3r-module-summary">
                {HACKNITR_EXPERIENCE.summary}
              </p>

              <div className="p3r-exp-dossier-card">
                <h4 className="p3r-exp-card-header">✦ KEY ORGANISING RESPONSIBILITIES</h4>
                <ul className="p3r-exp-checklist">
                  {HACKNITR_EXPERIENCE.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p3r-exp-tech-row">
                {HACKNITR_EXPERIENCE.skillsAndPractices?.map(tag => (
                  <span key={tag} className="p3r-exp-tag">
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              <div className="p3r-module-actions">
                {HACKNITR_EXPERIENCE.links.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-exp-action-btn pink"
                    onClick={() => playSfx('confirm')}
                    onMouseEnter={() => playSfx('hover')}
                  >
                    <span>{link.label} ↗</span>
                  </a>
                ))}
              </div>
            </article>
          </div>
        )}

        {/* ================================================================
            4. SPONSORSHIP & PARTNERSHIPS STRIP
            ================================================================ */}
        {showSponsorship && (
          <article className="p3r-exp-sponsorship-plate" aria-labelledby="sponsorship-title">
            <div className="p3r-sponsorship-left">
              <span className="p3r-module-cat">{SPONSORSHIP_EXPERIENCE.categoryCode}</span>
              <h2 id="sponsorship-title" className="p3r-module-role">
                {SPONSORSHIP_EXPERIENCE.role}
              </h2>
              <h3 className="p3r-module-org">
                {SPONSORSHIP_EXPERIENCE.organization}
              </h3>
              <p className="p3r-module-suborg">
                {SPONSORSHIP_EXPERIENCE.subOrganization}
              </p>
              <p className="p3r-module-summary">
                {SPONSORSHIP_EXPERIENCE.summary}
              </p>
              <div className="p3r-exp-tech-row">
                {SPONSORSHIP_EXPERIENCE.skillsAndPractices?.map(tag => (
                  <span key={tag} className="p3r-exp-tag">
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="p3r-sponsorship-right">
              <div className="p3r-exp-dossier-card">
                <h4 className="p3r-exp-card-header">
                  ✦ OUTREACH EXECUTION & RESOURCE MOBILIZATION
                </h4>
                <ul className="p3r-exp-checklist">
                  {SPONSORSHIP_EXPERIENCE.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        )}

        {/* ================================================================
            5. SCIENTIFIC RESEARCH & CITIZEN SCIENCE (COSMIC BLUE THEME)
            ================================================================ */}
        {showResearch && (
          <section className="p3r-exp-science-section" aria-labelledby="science-banner-title">
            <div className="p3r-science-banner">
              <h2 id="science-banner-title" className="p3r-science-banner-title">
                SCIENTIFIC RESEARCH & OBSERVATIONAL EXPLORATION
              </h2>
              <span className="p3r-science-banner-tag">
                ASTROPHYSICS • SIGNAL PROCESSING • CITIZEN SCIENCE
              </span>
            </div>

            <div className="p3r-exp-science-grid">
              {/* Independent Student Research — Astrophysics */}
              <article className="p3r-exp-science-card" aria-labelledby="astrophysics-title">
                <div className="p3r-module-top-row">
                  <span className="p3r-module-cat">{ASTROPHYSICS_RESEARCH.categoryCode}</span>
                  <span className="p3r-badge-primary">
                    <span>{ASTROPHYSICS_RESEARCH.statusBadge}</span>
                  </span>
                </div>

                <div>
                  <h3 id="astrophysics-title" className="p3r-module-role">
                    {ASTROPHYSICS_RESEARCH.role}
                  </h3>
                  <h4 className="p3r-module-org">
                    {ASTROPHYSICS_RESEARCH.organization}
                  </h4>
                  <p className="p3r-module-suborg">
                    {ASTROPHYSICS_RESEARCH.subOrganization}
                  </p>
                </div>

                <p className="p3r-module-summary">
                  {ASTROPHYSICS_RESEARCH.summary}
                </p>

                <div className="p3r-exp-dossier-card">
                  <h5 className="p3r-exp-card-header">✦ RESEARCH & COMPUTATIONAL PURSUITS</h5>
                  <ul className="p3r-exp-checklist">
                    {ASTROPHYSICS_RESEARCH.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p3r-exp-tech-row">
                  {ASTROPHYSICS_RESEARCH.skillsAndPractices?.map(tag => (
                    <span key={tag} className="p3r-exp-tag">
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Cross-link to Project AETHON */}
                <div className="p3r-aethon-crosslink-card">
                  <div className="p3r-crosslink-info">
                    <span className="p3r-crosslink-tag">RELATED PROJECT LOADOUT</span>
                    <span className="p3r-crosslink-name">PROJECT AETHON (RADIO STREAM PROCESSOR)</span>
                  </div>
                  <button
                    type="button"
                    className="p3r-exp-action-btn"
                    onClick={() => {
                      playSfx('confirm');
                      onNavigate('/resume');
                    }}
                    onMouseEnter={() => playSfx('hover')}
                  >
                    <span>VIEW IN EQUIP ↗</span>
                  </button>
                </div>
              </article>

              {/* IASC Asteroid Search Campaign */}
              <article className="p3r-exp-science-card" aria-labelledby="iasc-title">
                <div className="p3r-module-top-row">
                  <span className="p3r-module-cat">{IASC_EXPERIENCE.categoryCode}</span>
                  <span className="p3r-badge-primary">
                    <span>{IASC_EXPERIENCE.statusBadge}</span>
                  </span>
                </div>

                <div>
                  <h3 id="iasc-title" className="p3r-module-role">
                    {IASC_EXPERIENCE.role}
                  </h3>
                  <h4 className="p3r-module-org">
                    {IASC_EXPERIENCE.organization}
                  </h4>
                  <p className="p3r-module-suborg">
                    {IASC_EXPERIENCE.subOrganization}
                  </p>
                </div>

                <p className="p3r-module-summary">
                  {IASC_EXPERIENCE.summary}
                </p>

                <div className="p3r-exp-dossier-card">
                  <h5 className="p3r-exp-card-header">✦ OBSERVATIONAL WORKFLOW & REPORTING</h5>
                  <ul className="p3r-exp-checklist">
                    {IASC_EXPERIENCE.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p3r-exp-tech-row">
                  {IASC_EXPERIENCE.skillsAndPractices?.map(tag => (
                    <span key={tag} className="p3r-exp-tag">
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                <div className="p3r-module-actions">
                  {IASC_EXPERIENCE.links.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-exp-action-btn"
                      onClick={() => playSfx('confirm')}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>{link.label} ↗</span>
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </section>
        )}

        {/* ================================================================
            6. BEYOND ENGINEERING — CHESS
            ================================================================ */}
        {showChess && (
          <article className="p3r-exp-chess-plate" aria-labelledby="chess-title">
            <div className="p3r-chess-badge-col">
              <span className="p3r-chess-icon-crown" aria-hidden="true">♚</span>
              <span className="p3r-chess-rating-val">~1350</span>
              <span className="p3r-chess-rating-platform">CHESS.COM RATING</span>
            </div>

            <div className="p3r-chess-content-col">
              <span className="p3r-module-cat">{CHESS_EXPERIENCE.categoryCode}</span>
              <h2 id="chess-title" className="p3r-chess-heading">
                BEYOND ENGINEERING — STRATEGIC CALCULATION & CHESS
              </h2>
              <blockquote className="p3r-chess-quote">
                "{CHESS_EXPERIENCE.supportingQuote}"
              </blockquote>
              <p className="p3r-chess-desc">
                {CHESS_EXPERIENCE.summary}
              </p>
              <div className="p3r-exp-tech-row">
                {CHESS_EXPERIENCE.skillsAndPractices?.map(tag => (
                  <span key={tag} className="p3r-exp-tag">
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </article>
        )}
      </div>
    </InternalPageLayout>
  );
};
