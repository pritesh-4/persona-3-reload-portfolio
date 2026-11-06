import { useState, useCallback, useEffect, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  HOARDSPACE_EXPERIENCE,
  GSSOC_EXPERIENCE,
  HACKNITR_EXPERIENCE,
  SPONSORSHIP_EXPERIENCE,
  ASTROPHYSICS_RESEARCH,
  IASC_EXPERIENCE,
  CHESS_EXPERIENCE,
} from '../data/experienceAchievementsData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/experience.css';

interface ExperiencePageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

const SECTION_NAV = [
  { id: 'sec-industry', label: 'INDUSTRY', code: '01' },
  { id: 'sec-opensource', label: 'OPEN SOURCE', code: '02' },
  { id: 'sec-leadership', label: 'LEADERSHIP', code: '03' },
  { id: 'sec-sponsorship', label: 'PARTNERSHIPS', code: '04' },
  { id: 'sec-research', label: 'RESEARCH', code: '05' },
  { id: 'sec-beyond', label: 'BEYOND ENGINEERING', code: '06' },
] as const;

export const ExperiencePage: FC<ExperiencePageProps> = ({
  onNavigate,
  onBackToMenu,
}) => {
  const { playSfx } = useAudioContext();
  const [activeSection, setActiveSection] = useState<string>('sec-industry');
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = useCallback(
    (key: string) => {
      playSfx('select');
      setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    [playSfx]
  );

  const handleSectionJump = useCallback(
    (secId: string) => {
      playSfx('select');
      setActiveSection(secId);
      const el = document.getElementById(secId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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

  // Update active section on scroll using IntersectionObserver
  useEffect(() => {
    const sectionIds = SECTION_NAV.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const pipelineStages = HOARDSPACE_EXPERIENCE.pipelineStages ?? [];
  const currentStage = pipelineStages[selectedStageIdx];

  return (
    <InternalPageLayout
      title="EXPERIENCE"
      sublabel="FIELD OPERATIONS & ARCHIVE"
      sectionId="004"
      characterId="mitsuru"
      backgroundPath="/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png"
      currentRoute="/experience"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="FIELD OPERATIONS ARCHIVE // HOARDSPACE AI PIPELINE • OPEN SOURCE • RESEARCH"
    >
      <div
        className="p3r-experience-screen"
        role="region"
        aria-label="Field Record and Professional Experience Archive"
      >
        {/* ================================================================
            1. COMPACT EDITORIAL OPENING HERO
            ================================================================ */}
        <header className="p3r-exp-hero-compact">
          <div className="p3r-exp-hero-top">
            <span className="p3r-exp-hero-tag">FIELD RECORD / 004</span>
            <div className="p3r-exp-hero-rule" />
          </div>

          <div className="p3r-exp-hero-title-row">
            <h1 className="p3r-exp-hero-title">EXPERIENCE</h1>
            <span className="p3r-exp-hero-sub">
              WORK • COMMUNITY • RESEARCH • ACHIEVEMENTS
            </span>
          </div>

          <p className="p3r-exp-hero-summary">
            A record of the roles, communities and pursuits shaping my journey beyond the code.
          </p>

          {/* Section Jump Index (Non-destructive smooth anchor navigation) */}
          <nav className="p3r-exp-section-index" aria-label="Experience Archive Navigation">
            {SECTION_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`p3r-exp-nav-anchor ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleSectionJump(item.id)}
                onMouseEnter={() => playSfx('hover')}
              >
                <span className="p3r-exp-nav-num">{item.code}</span>
                <span className="p3r-exp-nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </header>

        {/* ================================================================
            2. FEATURED PROFESSIONAL EXPERIENCE — HOARDSPACE
            Priority 1: Core AI Engineering & Analytics Pipeline
            ================================================================ */}
        <section
          id="sec-industry"
          className="p3r-exp-section-block featured-industry"
          aria-labelledby="heading-hoardspace"
        >
          <div className="p3r-section-marker">
            <span className="p3r-sec-code">01 // PRODUCTION AI EXPERIENCE</span>
            <span className="p3r-sec-badge primary">FEATURED ENGAGEMENT</span>
          </div>

          <article className="p3r-hoardspace-card">
            {/* Header Plate */}
            <div className="p3r-hoardspace-header-grid">
              <div className="p3r-hoardspace-main-col">
                <span className="p3r-role-kicker">LEVEL 1 — ROLE &amp; SCOPE</span>
                <h2 id="heading-hoardspace" className="p3r-entry-role">
                  {HOARDSPACE_EXPERIENCE.role}
                </h2>
                <div className="p3r-entry-org-row">
                  <span className="p3r-entry-org">{HOARDSPACE_EXPERIENCE.organization}</span>
                  <span className="p3r-entry-divider">•</span>
                  <span className="p3r-entry-industry">{HOARDSPACE_EXPERIENCE.subOrganization}</span>
                </div>
                <div className="p3r-entry-spec-row">
                  <span className="p3r-entry-spec-badge">SPECIALISATION</span>
                  <span className="p3r-entry-spec-text">{HOARDSPACE_EXPERIENCE.headline}</span>
                  <span className="p3r-entry-loc">◈ {HOARDSPACE_EXPERIENCE.location}</span>
                </div>
                <p className="p3r-entry-summary">{HOARDSPACE_EXPERIENCE.summary}</p>
              </div>

              {/* Direct Organisation Links */}
              <div className="p3r-hoardspace-actions-col">
                <span className="p3r-actions-label">OFFICIAL PORTALS</span>
                <div className="p3r-actions-btn-stack">
                  {HOARDSPACE_EXPERIENCE.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-exp-portal-btn"
                      onClick={() => playSfx('confirm')}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>{link.label} ↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Centerpiece: 5-Stage Connected Analytics Pipeline Flow */}
            <div className="p3r-pipeline-centerpiece">
              <div className="p3r-pipeline-bar-header">
                <div className="p3r-pipeline-title-group">
                  <span className="p3r-pipeline-num">FLOW ARCHITECTURE</span>
                  <h3 className="p3r-pipeline-main-heading">
                    AUDIENCE ANALYTICS PIPELINE // CCTV OBSERVATIONS TO BUYER DOSSIER
                  </h3>
                </div>
                <span className="p3r-pipeline-interaction-hint">
                  INTERACTIVE // SELECT ANY STAGE TO INSPECT ARCHITECTURAL LOGIC
                </span>
              </div>

              {/* Connected Flow Track */}
              <div className="p3r-pipeline-ribbon" role="tablist" aria-label="5-Stage Processing Pipeline">
                {pipelineStages.map((stage, idx) => {
                  const isSelected = idx === selectedStageIdx;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      tabIndex={0}
                      className={`p3r-pipeline-ribbon-node ${isSelected ? 'active' : ''}`}
                      onClick={() => handleStageSelect(idx)}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <div className="p3r-node-top">
                        <span className="p3r-node-step">{stage.step}</span>
                        {idx < pipelineStages.length - 1 && (
                          <span className="p3r-node-arrow" aria-hidden="true">→</span>
                        )}
                      </div>
                      <span className="p3r-node-title">{stage.title}</span>
                      <span className="p3r-node-subtitle">{stage.subtitle}</span>
                    </button>
                  );
                })}
              </div>

              {/* Focused Stage Detail Inspector */}
              {currentStage && (
                <div className="p3r-pipeline-focus-plate" role="tabpanel" aria-live="polite">
                  <div className="p3r-focus-header">
                    <span className="p3r-focus-tag">STAGE {currentStage.step} DETAIL</span>
                    <h4 className="p3r-focus-title">
                      {currentStage.title} — {currentStage.subtitle}
                    </h4>
                  </div>
                  <p className="p3r-focus-desc">{currentStage.description}</p>
                  <div className="p3r-focus-footer">
                    <span className="p3r-focus-tech-label">CORE ENGINEERING FOCUS:</span>
                    <span className="p3r-focus-tech-value">{currentStage.techFocus}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Technical Contributions Summary Index with Expandable Disclosure */}
            <div className="p3r-contributions-container">
              <div className="p3r-contrib-overview-header">
                <h4 className="p3r-contrib-heading">CORE TECHNICAL CONTRIBUTION DOMAINS</h4>
                <span className="p3r-contrib-sub">ENGINEERING FOCUS AREAS &amp; PIPELINES</span>
              </div>

              <div className="p3r-contrib-summary-cards">
                <div className="p3r-contrib-quad-card">
                  <span className="p3r-quad-num">01</span>
                  <div className="p3r-quad-body">
                    <h5 className="p3r-quad-title">Camera Ingestion &amp; Video Streams</h5>
                    <p className="p3r-quad-desc">
                      Stream acquisition and frame preprocessing pipelines from high-visibility advertising locations.
                    </p>
                  </div>
                </div>
                <div className="p3r-contrib-quad-card">
                  <span className="p3r-quad-num">02</span>
                  <div className="p3r-quad-body">
                    <h5 className="p3r-quad-title">Pedestrian Detection &amp; Counting</h5>
                    <p className="p3r-quad-desc">
                      Computer vision algorithms for real-time pedestrian bounding and cross-line traversal tracking.
                    </p>
                  </div>
                </div>
                <div className="p3r-contrib-quad-card">
                  <span className="p3r-quad-num">03</span>
                  <div className="p3r-quad-body">
                    <h5 className="p3r-quad-title">Temporal &amp; Demographic Analytics</h5>
                    <p className="p3r-quad-desc">
                      Associating footfall with time-window metadata and aggregate demographic distribution models.
                    </p>
                  </div>
                </div>
                <div className="p3r-contrib-quad-card">
                  <span className="p3r-quad-num">04</span>
                  <div className="p3r-quad-body">
                    <h5 className="p3r-quad-title">Structured Buyer Intelligence</h5>
                    <p className="p3r-quad-desc">
                      Synthesizing observational telemetry into structured exposure dossiers for hoarding media buyers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclosure Toggle 1: Full Technical Responsibilities */}
              <div className="p3r-disclosure-unit">
                <button
                  type="button"
                  className="p3r-disclosure-btn"
                  onClick={() => toggleExpand('hoardspace-tech')}
                  aria-expanded={Boolean(expanded['hoardspace-tech'])}
                  aria-controls="hoardspace-tech-content"
                >
                  <span className="p3r-btn-arrow">
                    {expanded['hoardspace-tech'] ? '▲' : '▼'}
                  </span>
                  <span>
                    {expanded['hoardspace-tech']
                      ? 'COLLAPSE DETAILED TECHNICAL RESPONSIBILITIES'
                      : 'VIEW DETAILED TECHNICAL RESPONSIBILITIES & SKILLS'}
                  </span>
                </button>

                {expanded['hoardspace-tech'] && (
                  <div id="hoardspace-tech-content" className="p3r-disclosure-drawer">
                    <ul className="p3r-drawer-checklist">
                      {HOARDSPACE_EXPERIENCE.responsibilities.map((resp, i) => (
                        <li key={i}>
                          <span className="p3r-list-bullet">▸</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p3r-drawer-tags-wrap" aria-label="Skills & Practices">
                      {HOARDSPACE_EXPERIENCE.skillsAndPractices?.map((tag) => (
                        <span key={tag} className="p3r-exp-pill-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Disclosure Toggle 2: Privacy Safeguards */}
              <div className="p3r-disclosure-unit">
                <button
                  type="button"
                  className="p3r-disclosure-btn secondary"
                  onClick={() => toggleExpand('hoardspace-privacy')}
                  aria-expanded={Boolean(expanded['hoardspace-privacy'])}
                  aria-controls="hoardspace-privacy-content"
                >
                  <span className="p3r-btn-arrow">
                    {expanded['hoardspace-privacy'] ? '▲' : '▼'}
                  </span>
                  <span>
                    {expanded['hoardspace-privacy']
                      ? 'COLLAPSE ARCHITECTURE & PRIVACY SAFEGUARDS'
                      : 'ARCHITECTURE & PRIVACY SAFEGUARDS'}
                  </span>
                </button>

                {expanded['hoardspace-privacy'] && (
                  <div id="hoardspace-privacy-content" className="p3r-disclosure-drawer privacy">
                    <ul className="p3r-drawer-checklist">
                      {HOARDSPACE_EXPERIENCE.privacySafeguards?.map((safe, i) => (
                        <li key={i}>
                          <span className="p3r-list-bullet shield">◈</span>
                          <span>{safe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </article>
        </section>

        {/* ================================================================
            3. OPEN SOURCE & LEADERSHIP — EDITORIAL ACTIVITY RAILS
            Priority 2: GSSoC & HackNITR
            ================================================================ */}
        <section
          id="sec-opensource"
          className="p3r-exp-section-block"
          aria-labelledby="heading-opensource"
        >
          <div className="p3r-section-marker">
            <span className="p3r-sec-code">02 // OPEN SOURCE ECOSYSTEM</span>
            <span className="p3r-sec-badge">COLLABORATIVE DEVELOPMENT</span>
          </div>

          <article className="p3r-record-rail-card">
            <div className="p3r-rail-main-row">
              <div className="p3r-rail-left">
                <span className="p3r-role-kicker">ROLE // OPEN SOURCE</span>
                <h2 id="heading-opensource" className="p3r-entry-role">
                  {GSSOC_EXPERIENCE.role}
                </h2>
                <div className="p3r-entry-org-row">
                  <span className="p3r-entry-org">{GSSOC_EXPERIENCE.organization}</span>
                  <span className="p3r-entry-divider">•</span>
                  <span className="p3r-entry-industry">{GSSOC_EXPERIENCE.subOrganization}</span>
                </div>
                <p className="p3r-entry-summary">{GSSOC_EXPERIENCE.summary}</p>

                {/* Visible contribution keywords */}
                <div className="p3r-keyword-strip">
                  <span className="p3r-keyword-pill">Codebase Exploration</span>
                  <span className="p3r-keyword-pill">Issue Investigation</span>
                  <span className="p3r-keyword-pill">Bug Fixes &amp; Feature Work</span>
                  <span className="p3r-keyword-pill">Pull-Request Collaboration</span>
                </div>
              </div>

              <div className="p3r-rail-right">
                <div className="p3r-actions-btn-stack">
                  {GSSOC_EXPERIENCE.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-exp-portal-btn"
                      onClick={() => playSfx('confirm')}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>{link.label} ↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Expandable Disclosure: Full Contribution Record */}
            <div className="p3r-disclosure-unit">
              <button
                type="button"
                className="p3r-disclosure-btn"
                onClick={() => toggleExpand('gssoc-record')}
                aria-expanded={Boolean(expanded['gssoc-record'])}
                aria-controls="gssoc-record-content"
              >
                <span className="p3r-btn-arrow">
                  {expanded['gssoc-record'] ? '▲' : '▼'}
                </span>
                <span>
                  {expanded['gssoc-record']
                    ? 'COLLAPSE CONTRIBUTION RECORD'
                    : 'EXPAND CONTRIBUTION RECORD'}
                </span>
              </button>

              {expanded['gssoc-record'] && (
                <div id="gssoc-record-content" className="p3r-disclosure-drawer">
                  <h4 className="p3r-drawer-subtitle">✦ COLLABORATIVE CONTRIBUTIONS &amp; PRACTICES</h4>
                  <ul className="p3r-drawer-checklist">
                    {GSSOC_EXPERIENCE.responsibilities.map((item, idx) => (
                      <li key={idx}>
                        <span className="p3r-list-bullet">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p3r-drawer-tags-wrap">
                    {GSSOC_EXPERIENCE.skillsAndPractices?.map((tag) => (
                      <span key={tag} className="p3r-exp-pill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </section>

        {/* 4. LEADERSHIP — HACKNITR */}
        <section
          id="sec-leadership"
          className="p3r-exp-section-block"
          aria-labelledby="heading-leadership"
        >
          <div className="p3r-section-marker">
            <span className="p3r-sec-code">03 // STUDENT LEADERSHIP &amp; EVENTS</span>
            <span className="p3r-sec-badge highlight">FLAGSHIP HACKATHON</span>
          </div>

          <article className="p3r-record-rail-card leadership-card">
            <div className="p3r-rail-main-row">
              <div className="p3r-rail-left">
                <span className="p3r-role-kicker">ROLE // EVENT LEADERSHIP</span>
                <h2 id="heading-leadership" className="p3r-entry-role">
                  {HACKNITR_EXPERIENCE.role}
                </h2>
                <div className="p3r-entry-org-row">
                  <span className="p3r-entry-org">{HACKNITR_EXPERIENCE.organization}</span>
                  <span className="p3r-entry-divider">•</span>
                  <span className="p3r-entry-industry">{HACKNITR_EXPERIENCE.subOrganization}</span>
                </div>

                {/* Verified Flagship Metric Badge */}
                <div className="p3r-verified-metric-bar">
                  <span className="p3r-metric-number">6,200+</span>
                  <span className="p3r-metric-desc">
                    OFFICIALLY REPORTED REGISTRATIONS (SPECIFICALLY HACKNITR 7.0)
                  </span>
                </div>

                <p className="p3r-entry-summary">{HACKNITR_EXPERIENCE.summary}</p>

                {/* Scannable Responsibility Labels */}
                <div className="p3r-keyword-strip">
                  <span className="p3r-keyword-pill">Event Coordination</span>
                  <span className="p3r-keyword-pill">Sponsor Outreach</span>
                  <span className="p3r-keyword-pill">Partnership Communication</span>
                  <span className="p3r-keyword-pill">Cross-Team Execution</span>
                </div>
              </div>

              <div className="p3r-rail-right">
                <div className="p3r-actions-btn-stack">
                  {HACKNITR_EXPERIENCE.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-exp-portal-btn pink"
                      onClick={() => playSfx('confirm')}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>{link.label} ↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Expandable Disclosure: Organising Record */}
            <div className="p3r-disclosure-unit">
              <button
                type="button"
                className="p3r-disclosure-btn"
                onClick={() => toggleExpand('hacknitr-record')}
                aria-expanded={Boolean(expanded['hacknitr-record'])}
                aria-controls="hacknitr-record-content"
              >
                <span className="p3r-btn-arrow">
                  {expanded['hacknitr-record'] ? '▲' : '▼'}
                </span>
                <span>
                  {expanded['hacknitr-record']
                    ? 'COLLAPSE ORGANISING RECORD'
                    : 'EXPAND ORGANISING RECORD'}
                </span>
              </button>

              {expanded['hacknitr-record'] && (
                <div id="hacknitr-record-content" className="p3r-disclosure-drawer">
                  <h4 className="p3r-drawer-subtitle">✦ KEY ORGANISING RESPONSIBILITIES &amp; LOGISTICS</h4>
                  <ul className="p3r-drawer-checklist">
                    {HACKNITR_EXPERIENCE.responsibilities.map((item, idx) => (
                      <li key={idx}>
                        <span className="p3r-list-bullet">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p3r-drawer-tags-wrap">
                    {HACKNITR_EXPERIENCE.skillsAndPractices?.map((tag) => (
                      <span key={tag} className="p3r-exp-pill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </section>

        {/* ================================================================
            4. SPONSORSHIP & PARTNERSHIPS — COMPACT ACTIVITY STRIP
            Priority 3: Outreach & Resource Mobilization
            ================================================================ */}
        <section
          id="sec-sponsorship"
          className="p3r-exp-section-block"
          aria-labelledby="heading-sponsorship"
        >
          <div className="p3r-section-marker">
            <span className="p3r-sec-code">04 // CORPORATE ALLIANCES</span>
            <span className="p3r-sec-badge">RESOURCE MOBILIZATION</span>
          </div>

          <article className="p3r-sponsorship-strip-card">
            <div className="p3r-strip-top">
              <div className="p3r-strip-info">
                <span className="p3r-role-kicker">ACTIVITY // OUTREACH</span>
                <h2 id="heading-sponsorship" className="p3r-entry-role compact">
                  SPONSORSHIP &amp; PARTNERSHIPS
                </h2>
                <div className="p3r-entry-org-row">
                  <span className="p3r-entry-org">{SPONSORSHIP_EXPERIENCE.organization}</span>
                  <span className="p3r-entry-divider">•</span>
                  <span className="p3r-entry-industry">{SPONSORSHIP_EXPERIENCE.subOrganization}</span>
                </div>
                <p className="p3r-entry-summary">{SPONSORSHIP_EXPERIENCE.summary}</p>
              </div>

              {/* Scannable Responsibility Labels */}
              <div className="p3r-strip-labels">
                <span className="p3r-keyword-pill">Market &amp; Tech Partner Research</span>
                <span className="p3r-keyword-pill">Proposal &amp; Pitch Drafting</span>
                <span className="p3r-keyword-pill">Corporate Outreach &amp; Calls</span>
                <span className="p3r-keyword-pill">In-Kind Deliverable Coordination</span>
              </div>
            </div>

            {/* Expandable Disclosure */}
            <div className="p3r-disclosure-unit">
              <button
                type="button"
                className="p3r-disclosure-btn"
                onClick={() => toggleExpand('sponsorship-record')}
                aria-expanded={Boolean(expanded['sponsorship-record'])}
                aria-controls="sponsorship-record-content"
              >
                <span className="p3r-btn-arrow">
                  {expanded['sponsorship-record'] ? '▲' : '▼'}
                </span>
                <span>
                  {expanded['sponsorship-record']
                    ? 'COLLAPSE PARTNERSHIP CONTRIBUTIONS'
                    : 'VIEW PARTNERSHIP CONTRIBUTIONS'}
                </span>
              </button>

              {expanded['sponsorship-record'] && (
                <div id="sponsorship-record-content" className="p3r-disclosure-drawer">
                  <h4 className="p3r-drawer-subtitle">✦ OUTREACH EXECUTION &amp; PARTNER FULFILLMENT</h4>
                  <ul className="p3r-drawer-checklist">
                    {SPONSORSHIP_EXPERIENCE.responsibilities.map((resp, i) => (
                      <li key={i}>
                        <span className="p3r-list-bullet">▸</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p3r-drawer-tags-wrap">
                    {SPONSORSHIP_EXPERIENCE.skillsAndPractices?.map((tag) => (
                      <span key={tag} className="p3r-exp-pill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </section>

        {/* ================================================================
            5. SCIENTIFIC RESEARCH & CITIZEN SCIENCE — FIELD NOTES
            Priority 4: Astrophysics & IASC Observational Campaign
            Distinctive Cosmic-Blue Astrometric Atmosphere
            ================================================================ */}
        <section
          id="sec-research"
          className="p3r-exp-section-block cosmic-atmosphere"
          aria-labelledby="heading-research"
        >
          <div className="p3r-section-marker cosmic">
            <span className="p3r-sec-code">05 // SCIENTIFIC INQUIRY &amp; ASTRONOMY</span>
            <span className="p3r-sec-badge cosmic">ASTROPHYSICAL FIELD NOTES</span>
          </div>

          <div className="p3r-science-editorial-grid">
            {/* A. Astrophysics Independent Research */}
            <article className="p3r-science-note-card">
              <div className="p3r-science-card-head">
                <span className="p3r-role-kicker cosmic">RESEARCH INQUIRY</span>
                <h2 id="heading-research" className="p3r-entry-role science">
                  ASTROPHYSICS
                </h2>
                <div className="p3r-entry-org-row">
                  <span className="p3r-entry-org">INDEPENDENT STUDENT RESEARCHER</span>
                  <span className="p3r-entry-divider">•</span>
                  <span className="p3r-entry-industry">COMPUTATIONAL RADIO ASTRONOMY</span>
                </div>
                <p className="p3r-entry-summary">{ASTROPHYSICS_RESEARCH.summary}</p>
              </div>

              {/* Research Themes */}
              <div className="p3r-science-themes">
                <div className="p3r-theme-badge">
                  <span className="p3r-theme-dot" />
                  <span>Astronomical Radio Signals</span>
                </div>
                <div className="p3r-theme-badge">
                  <span className="p3r-theme-dot" />
                  <span>Time-Frequency Analysis</span>
                </div>
                <div className="p3r-theme-badge">
                  <span className="p3r-theme-dot" />
                  <span>Scientific Data Exploration</span>
                </div>
                <div className="p3r-theme-badge">
                  <span className="p3r-theme-dot" />
                  <span>Anomaly Detection</span>
                </div>
              </div>

              {/* Canonical Project AETHON Cross-Link to EQUIP */}
              <div className="p3r-aethon-portal-plate">
                <div className="p3r-aethon-text-group">
                  <span className="p3r-aethon-label">RELATED SCIENTIFIC SOFTWARE LOADOUT</span>
                  <span className="p3r-aethon-title">PROJECT AETHON (ASTRONOMICAL TRANSIENT DETECTOR)</span>
                </div>
                <button
                  type="button"
                  className="p3r-exp-portal-btn cosmic"
                  onClick={() => {
                    playSfx('confirm');
                    onNavigate('/resume');
                  }}
                  onMouseEnter={() => playSfx('hover')}
                >
                  <span>EXPLORE PROJECT AETHON ↗</span>
                </button>
              </div>

              {/* Expandable Field Notes */}
              <div className="p3r-disclosure-unit">
                <button
                  type="button"
                  className="p3r-disclosure-btn cosmic"
                  onClick={() => toggleExpand('astrophysics-notes')}
                  aria-expanded={Boolean(expanded['astrophysics-notes'])}
                  aria-controls="astrophysics-notes-content"
                >
                  <span className="p3r-btn-arrow">
                    {expanded['astrophysics-notes'] ? '▲' : '▼'}
                  </span>
                  <span>
                    {expanded['astrophysics-notes']
                      ? 'COLLAPSE ASTROPHYSICS FIELD NOTES'
                      : 'VIEW ASTROPHYSICS FIELD NOTES'}
                  </span>
                </button>

                {expanded['astrophysics-notes'] && (
                  <div id="astrophysics-notes-content" className="p3r-disclosure-drawer cosmic">
                    <h4 className="p3r-drawer-subtitle">✦ RESEARCH METHODOLOGIES &amp; SIGNAL PIPELINES</h4>
                    <ul className="p3r-drawer-checklist">
                      {ASTROPHYSICS_RESEARCH.responsibilities.map((item, idx) => (
                        <li key={idx}>
                          <span className="p3r-list-bullet cosmic">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p3r-drawer-tags-wrap">
                      {ASTROPHYSICS_RESEARCH.skillsAndPractices?.map((tag) => (
                        <span key={tag} className="p3r-exp-pill-tag cosmic">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* B. IASC Asteroid Search Campaign */}
            <article className="p3r-science-note-card iasc">
              <div className="p3r-science-card-head">
                <span className="p3r-role-kicker cosmic">CITIZEN SCIENCE</span>
                <h2 className="p3r-entry-role science">
                  ASTEROID SEARCH PARTICIPANT
                </h2>
                <div className="p3r-entry-org-row">
                  <span className="p3r-entry-org">
                    INTERNATIONAL ASTRONOMICAL SEARCH COLLABORATION
                  </span>
                  <span className="p3r-entry-divider">•</span>
                  <span className="p3r-entry-industry">
                    CITIZEN SCIENCE INITIATIVE FEATURED BY NASA SCIENCE
                  </span>
                </div>
                <p className="p3r-entry-summary">{IASC_EXPERIENCE.summary}</p>
              </div>

              {/* Compact Process Steps */}
              <div className="p3r-science-themes">
                <div className="p3r-theme-badge">
                  <span className="p3r-theme-dot" />
                  <span>Telescope Image Sets</span>
                </div>
                <div className="p3r-theme-badge">
                  <span className="p3r-theme-dot" />
                  <span>Moving-Object Inspection</span>
                </div>
                <div className="p3r-theme-badge">
                  <span className="p3r-theme-dot" />
                  <span>Asteroid Candidate Analysis</span>
                </div>
                <div className="p3r-theme-badge">
                  <span className="p3r-theme-dot" />
                  <span>Campaign Participation</span>
                </div>
              </div>

              {/* Direct Official Programme Links */}
              <div className="p3r-iasc-portals-row">
                {IASC_EXPERIENCE.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-exp-portal-btn cosmic"
                    onClick={() => playSfx('confirm')}
                    onMouseEnter={() => playSfx('hover')}
                  >
                    <span>{link.label} ↗</span>
                  </a>
                ))}
              </div>

              {/* Expandable Disclosure */}
              <div className="p3r-disclosure-unit">
                <button
                  type="button"
                  className="p3r-disclosure-btn cosmic"
                  onClick={() => toggleExpand('iasc-notes')}
                  aria-expanded={Boolean(expanded['iasc-notes'])}
                  aria-controls="iasc-notes-content"
                >
                  <span className="p3r-btn-arrow">
                    {expanded['iasc-notes'] ? '▲' : '▼'}
                  </span>
                  <span>
                    {expanded['iasc-notes']
                      ? 'COLLAPSE OBSERVATIONAL CAMPAIGN NOTES'
                      : 'VIEW OBSERVATIONAL CAMPAIGN NOTES'}
                  </span>
                </button>

                {expanded['iasc-notes'] && (
                  <div id="iasc-notes-content" className="p3r-disclosure-drawer cosmic">
                    <h4 className="p3r-drawer-subtitle">✦ ASTROMETRICA WORKFLOW &amp; MPC REPORTING</h4>
                    <ul className="p3r-drawer-checklist">
                      {IASC_EXPERIENCE.responsibilities.map((item, idx) => (
                        <li key={idx}>
                          <span className="p3r-list-bullet cosmic">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p3r-drawer-tags-wrap">
                      {IASC_EXPERIENCE.skillsAndPractices?.map((tag) => (
                        <span key={tag} className="p3r-exp-pill-tag cosmic">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>

        {/* ================================================================
            6. BEYOND ENGINEERING — CHESS
            Priority 5: Compact Personal Pursuit Element
            ================================================================ */}
        <section
          id="sec-beyond"
          className="p3r-exp-section-block chess-closing"
          aria-labelledby="heading-beyond"
        >
          <div className="p3r-section-marker">
            <span className="p3r-sec-code">06 // COGNITIVE DISCIPLINES</span>
            <span className="p3r-sec-badge">PERSONAL PURSUIT</span>
          </div>

          <article className="p3r-chess-compact-strip">
            {/* Rating Metric Column */}
            <div className="p3r-chess-rating-box">
              <span className="p3r-chess-crown" aria-hidden="true">♚</span>
              <span className="p3r-chess-val">~1350</span>
              <span className="p3r-chess-label">CHESS.COM RATING</span>
            </div>

            {/* Description & Strategic Insight */}
            <div className="p3r-chess-text-box">
              <span className="p3r-role-kicker">STRATEGIC CALCULATION</span>
              <h2 id="heading-beyond" className="p3r-entry-role chess">
                BEYOND ENGINEERING
              </h2>
              <p className="p3r-chess-subline">
                A personal pursuit of strategic thinking, calculation and long-term decision making.
              </p>
              <blockquote className="p3r-chess-quote-line">
                &ldquo;{CHESS_EXPERIENCE.supportingQuote}&rdquo;
              </blockquote>
              <p className="p3r-entry-summary">{CHESS_EXPERIENCE.summary}</p>

              <div className="p3r-chess-tags">
                {CHESS_EXPERIENCE.skillsAndPractices?.map((tag) => (
                  <span key={tag} className="p3r-exp-pill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>
      </div>
    </InternalPageLayout>
  );
};
