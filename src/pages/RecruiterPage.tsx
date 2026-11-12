import { useState, useCallback, type FC } from 'react';
import { PROFILE_DATA } from '../data/profileData';
import { PROJECTS_DATA, type ProjectMission } from '../data/projectsData';
import { INVENTORY_ITEMS } from '../data/inventoryData';
import { ALL_EXPERIENCE_ITEMS } from '../data/experienceAchievementsData';
import { VERIFIED_CHANNELS } from '../data/socialLinksData';
import { DEVELOPER_STATUS } from '../data/developerStatusData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/recruiter.css';

interface RecruiterPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const RecruiterPage: FC<RecruiterPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Filter 5 strongest flagship projects for quick recruiter scanning
  const featuredProjects = PROJECTS_DATA.slice(0, 5);

  // Group top inventory skills by category
  const skillsByCategory = {
    languages: INVENTORY_ITEMS.filter(i => i.category === 'LANGUAGES').slice(0, 6),
    aiMl: INVENTORY_ITEMS.filter(i => i.category === 'AI_ML').slice(0, 6),
    frameworks: INVENTORY_ITEMS.filter(i => i.category === 'FRAMEWORKS').slice(0, 6),
    infraTools: INVENTORY_ITEMS.filter(i => i.category === 'DEV_TOOLS' || i.category === 'INFRASTRUCTURE').slice(0, 6),
  };

  const handleCopyEmail = useCallback(() => {
    playSfx('select');
    navigator.clipboard.writeText('priteshjena16@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  }, [playSfx]);

  const handlePrintResume = useCallback(() => {
    playSfx('confirm');
    window.print();
  }, [playSfx]);

  const handleOpenDossier = useCallback(
    (missionId: string) => {
      playSfx('select');
      onNavigate(`/projects?mission=${missionId}`);
    },
    [playSfx, onNavigate]
  );

  const getStatusBadgeClass = (status: ProjectMission['implementationStatus']) => {
    switch (status) {
      case 'VERIFIED IMPLEMENTED': return 'badge-implemented';
      case 'RESEARCH PROTOTYPE': return 'badge-prototype';
      case 'EXPERIMENTAL CONCEPT': return 'badge-concept';
      default: return 'badge-early';
    }
  };

  return (
    <div className="p3r-recruiter-page" role="region" aria-label="Recruiter Quick Profile">
      {/* Top Banner Navigation Bar */}
      <header className="p3r-recruiter-header no-print">
        <div className="p3r-recruiter-brand">
          <button
            type="button"
            className="p3r-recruiter-back-btn"
            onClick={() => {
              playSfx('back');
              onBackToMenu();
            }}
            title="Return to Main Menu (ESC)"
          >
            <span>&lt; MAIN MENU</span>
          </button>
          <div className="p3r-recruiter-header-title">
            <span className="p3r-recruiter-sys-code">S.E.E.S. EXECUTIVE BRIEFING // FILE 001</span>
            <h1 className="p3r-recruiter-headline">RECRUITER &amp; TECHNICAL SUMMARY</h1>
          </div>
        </div>

        <div className="p3r-recruiter-top-actions">
          <button
            type="button"
            className="p3r-recruiter-action-btn primary"
            onClick={handlePrintResume}
            title="Export or Print this Summary Dossier as PDF"
          >
            <span>🖨 EXPORT / PRINT PDF</span>
          </button>
          <button
            type="button"
            className="p3r-recruiter-action-btn"
            onClick={() => {
              playSfx('confirm');
              onNavigate('/menu');
            }}
          >
            <span>ENTER FULL P3R EXPERIENCE ↗</span>
          </button>
        </div>
      </header>

      {/* Main Dossier Container */}
      <main className="p3r-recruiter-container">
        {/* Candidate Summary Hero */}
        <section className="p3r-recruiter-hero-plate">
          <div className="p3r-recruiter-hero-left">
            <div className="p3r-recruiter-status-pill">
              <span className="p3r-pulse-dot" />
              <span>{DEVELOPER_STATUS.availability.label}</span>
            </div>
            <h2 className="p3r-recruiter-name">{PROFILE_DATA.name}</h2>
            <div className="p3r-recruiter-role-title">
              Mining Engineering Undergraduate • Full-Stack &amp; AI Systems Builder
            </div>
            <p className="p3r-recruiter-bio-summary">
              Second-year undergraduate at <b>National Institute of Technology, Rourkela (NIT Rourkela)</b>.
              Lead Systems Architect for <b>SALVUS</b> (Smart India Hackathon 2026), building mission-critical disaster
              intelligence with FastAPI and 3-tier AI triage. Independent researcher in computational radio astronomy
              (Project AETHON) and creator of RouteMind and Project Zogan.
            </p>
          </div>

          <div className="p3r-recruiter-hero-right">
            <div className="p3r-recruiter-contact-card">
              <span className="p3r-contact-card-title">VERIFIED CONTACT CHANNELS</span>
              <div className="p3r-contact-item">
                <span className="p3r-contact-key">EMAIL</span>
                <div className="p3r-contact-val-row">
                  <a href="mailto:priteshjena16@gmail.com" className="p3r-contact-link">
                    priteshjena16@gmail.com
                  </a>
                  <button
                    type="button"
                    className="p3r-copy-btn no-print"
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                  >
                    {copiedEmail ? 'COPIED ✓' : 'COPY'}
                  </button>
                </div>
              </div>

              <div className="p3r-contact-item">
                <span className="p3r-contact-key">GITHUB</span>
                <a
                  href="https://github.com/pritesh-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3r-contact-link"
                >
                  github.com/pritesh-4 ↗
                </a>
              </div>

              <div className="p3r-contact-item">
                <span className="p3r-contact-key">LINKEDIN</span>
                <a
                  href="https://www.linkedin.com/in/pritesh-jena-8980a6373/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3r-contact-link"
                >
                  linkedin.com/in/pritesh-jena-8980a6373 ↗
                </a>
              </div>

              <div className="p3r-contact-item">
                <span className="p3r-contact-key">LOCATION</span>
                <span className="p3r-contact-text">Rourkela, Odisha, India</span>
              </div>
            </div>
          </div>
        </section>

        {/* Current Personnel Status Panel */}
        <section className="p3r-recruiter-status-grid">
          <div className="p3r-recruiter-status-card">
            <span className="p3r-rstatus-tag">CURRENTLY BUILDING</span>
            <span className="p3r-rstatus-val">{DEVELOPER_STATUS.currentlyBuilding.project}</span>
            <p className="p3r-rstatus-desc">{DEVELOPER_STATUS.currentlyBuilding.description}</p>
          </div>
          <div className="p3r-recruiter-status-card">
            <span className="p3r-rstatus-tag">CURRENTLY EXPLORING</span>
            <span className="p3r-rstatus-val">Computational Radio Astronomy &amp; Transient Surfacing</span>
            <p className="p3r-rstatus-desc">Unsupervised anomaly detection on gigahertz spectrotemporal telemetry.</p>
          </div>
          <div className="p3r-recruiter-status-card">
            <span className="p3r-rstatus-tag">AVAILABILITY WINDOW</span>
            <span className="p3r-rstatus-val">{DEVELOPER_STATUS.availability.status}</span>
            <p className="p3r-rstatus-desc">{DEVELOPER_STATUS.availability.notes}</p>
          </div>
        </section>

        {/* Education & Academic Background */}
        <section className="p3r-recruiter-sec">
          <div className="p3r-recruiter-sec-head">
            <h3 className="p3r-recruiter-sec-title">EDUCATION &amp; ACADEMIC RECORD</h3>
            <span className="p3r-recruiter-sec-sub">NATIONAL INSTITUTE OF TECHNOLOGY, ROURKELA</span>
          </div>
          <div className="p3r-recruiter-edu-box">
            <div className="p3r-edu-row-top">
              <span className="p3r-edu-inst">National Institute of Technology, Rourkela (NIT Rourkela)</span>
              <span className="p3r-edu-period">2024 – 2028 (Expected)</span>
            </div>
            <div className="p3r-edu-row-sub">
              <span className="p3r-edu-degree">Bachelor of Technology (B.Tech) in Mining Engineering</span>
              <span className="p3r-edu-badge">Second-Year Undergraduate</span>
            </div>
            <p className="p3r-edu-notes">
              Focusing on computational engineering, physical systems, and applying computer vision and
              autonomous decision support to complex industrial and spatial domains.
            </p>
          </div>
        </section>

        {/* Featured Projects (3 to 5 strongest) */}
        <section className="p3r-recruiter-sec">
          <div className="p3r-recruiter-sec-head">
            <h3 className="p3r-recruiter-sec-title">KEY ENGINEERING PROJECTS</h3>
            <span className="p3r-recruiter-sec-sub">VERIFIED TECHNICAL CAPABILITIES &amp; ARCHITECTURE</span>
          </div>

          <div className="p3r-recruiter-projects-list">
            {featuredProjects.map((project) => (
              <article key={project.id} className="p3r-recruiter-project-card">
                <div className="p3r-rproject-head">
                  <div className="p3r-rproject-title-group">
                    <span className="p3r-rproject-code">{project.code}</span>
                    <h4 className="p3r-rproject-title">{project.title}</h4>
                    <span className={`p3r-rproject-status ${getStatusBadgeClass(project.implementationStatus)}`}>
                      {project.implementationStatus}
                    </span>
                  </div>
                  <span className="p3r-rproject-role">{project.role}</span>
                </div>

                <div className="p3r-rproject-subtitle">{project.subtitle}</div>
                <p className="p3r-rproject-summary">{project.summary}</p>

                <div className="p3r-rproject-problem-solution">
                  <div className="p3r-ps-block">
                    <span className="p3r-ps-label">THE PROBLEM:</span>
                    <p>{project.problem}</p>
                  </div>
                  <div className="p3r-ps-block">
                    <span className="p3r-ps-label">ARCHITECTURAL SOLUTION:</span>
                    <p>{project.solution}</p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="p3r-rproject-tech-row">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="p3r-rproject-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="p3r-rproject-actions no-print">
                  <button
                    type="button"
                    className="p3r-raction-btn primary"
                    onClick={() => handleOpenDossier(project.id)}
                  >
                    <span>OPEN FULL DOSSIER &amp; ARCHITECTURE ↗</span>
                  </button>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-raction-btn"
                  >
                    <span>SOURCE REPO ↗</span>
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-raction-btn"
                    >
                      <span>LIVE DEMO ↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Technical Competencies Matrix */}
        <section className="p3r-recruiter-sec">
          <div className="p3r-recruiter-sec-head">
            <h3 className="p3r-recruiter-sec-title">CORE TECHNICAL COMPETENCIES</h3>
            <span className="p3r-recruiter-sec-sub">PRACTICAL DEVELOPMENT TOOLKIT</span>
          </div>

          <div className="p3r-skills-grid">
            <div className="p3r-skill-cat-card">
              <span className="p3r-scat-title">PROGRAMMING LANGUAGES</span>
              <div className="p3r-scat-pills">
                {skillsByCategory.languages.map(s => (
                  <span key={s.id} className="p3r-scat-pill" title={s.whatItIsUsedFor}>{s.name}</span>
                ))}
              </div>
            </div>

            <div className="p3r-skill-cat-card">
              <span className="p3r-scat-title">AI &amp; MACHINE LEARNING</span>
              <div className="p3r-scat-pills">
                {skillsByCategory.aiMl.map(s => (
                  <span key={s.id} className="p3r-scat-pill" title={s.whatItIsUsedFor}>{s.name}</span>
                ))}
              </div>
            </div>

            <div className="p3r-skill-cat-card">
              <span className="p3r-scat-title">FRAMEWORKS &amp; LIBRARIES</span>
              <div className="p3r-scat-pills">
                {skillsByCategory.frameworks.map(s => (
                  <span key={s.id} className="p3r-scat-pill" title={s.whatItIsUsedFor}>{s.name}</span>
                ))}
              </div>
            </div>

            <div className="p3r-skill-cat-card">
              <span className="p3r-scat-title">SYSTEMS &amp; INFRASTRUCTURE</span>
              <div className="p3r-scat-pills">
                {skillsByCategory.infraTools.map(s => (
                  <span key={s.id} className="p3r-scat-pill" title={s.whatItIsUsedFor}>{s.name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience & Leadership */}
        <section className="p3r-recruiter-sec">
          <div className="p3r-recruiter-sec-head">
            <h3 className="p3r-recruiter-sec-title">EXPERIENCE &amp; ACHIEVEMENTS</h3>
            <span className="p3r-recruiter-sec-sub">FIELD ROLES &amp; COMMUNITY LEADERSHIP</span>
          </div>

          <div className="p3r-experience-cards-grid">
            {ALL_EXPERIENCE_ITEMS.slice(0, 4).map((exp) => (
              <div key={exp.id} className="p3r-exp-summary-card">
                <div className="p3r-exp-head-row">
                  <span className="p3r-exp-role">{exp.role}</span>
                  <span className="p3r-exp-badge">{exp.category}</span>
                </div>
                <div className="p3r-exp-org">{exp.organization}</div>
                <div className="p3r-exp-headline">{exp.headline}</div>
                <p className="p3r-exp-summary">{exp.summary}</p>
                <ul className="p3r-exp-bullet-points">
                  {exp.responsibilities.slice(0, 2).map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer / Contact Sign-off */}
        <footer className="p3r-recruiter-footer">
          <div className="p3r-rfooter-left">
            <span className="p3r-rfoot-name">{PROFILE_DATA.name}</span>
            <span className="p3r-rfoot-meta">NIT Rourkela • Mining Engineering Undergraduate</span>
          </div>
          <div className="p3r-rfooter-channels">
            {VERIFIED_CHANNELS.map((ch) => (
              <a
                key={ch.id}
                href={ch.url}
                target={ch.id === 'email' ? undefined : '_blank'}
                rel={ch.id === 'email' ? undefined : 'noopener noreferrer'}
                className="p3r-rfooter-link"
              >
                {ch.name} ↗
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

