import { useState, useEffect, useMemo, useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  CHARACTER_PROFILE,
  CHARACTER_ATTRIBUTES,
  type CharacterAttribute,
} from '../data/characterStatusData';
import {
  CALENDAR_MILESTONES,
  CALENDAR_YEARS,
  type CalendarMilestone,
} from '../data/calendarData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/stats.css';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork?: boolean;
  updated_at: string;
}

interface StatsState {
  loading: boolean;
  publicRepos: number;
  followers: number;
  following: number;
  starsCount: number;
  repos: GitHubRepo[];
  languages: { name: string; percentage: number }[];
  isCached: boolean;
}

const FALLBACK_STATS: StatsState = {
  loading: false,
  publicRepos: 19,
  followers: 8,
  following: 6,
  starsCount: 9,
  isCached: true,
  repos: [
    {
      id: 1,
      name: 'SIH-2026---SALVUS',
      description: 'AI-assisted disaster intelligence and responder dispatch coordination platform.',
      html_url: 'https://github.com/pritesh-4/SIH-2026---SALVUS',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-09-02',
    },
    {
      id: 2,
      name: 'Project_RouteMind',
      description: 'Intelligent AI model routing platform analyzing query intent to dispatch requests across best-fit LLMs.',
      html_url: 'https://github.com/pritesh-4/Project_RouteMind',
      language: 'JavaScript',
      stargazers_count: 4,
      forks_count: 0,
      updated_at: '2026-07-22',
    },
    {
      id: 3,
      name: 'Project_DevLore',
      description: 'Interactive developer quiz platform featuring customizable trivia, performance tracking, and analytics.',
      html_url: 'https://github.com/pritesh-4/Project_DevLore',
      language: 'CSS',
      stargazers_count: 3,
      forks_count: 0,
      updated_at: '2026-06-10',
    },
    {
      id: 4,
      name: 'Project_Aethon',
      description: 'AI-driven astronomical signal discovery using time-frequency analysis and unsupervised anomaly detection.',
      html_url: 'https://github.com/pritesh-4/Project_Aethon',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-10-12',
    },
    {
      id: 5,
      name: 'Project_Zogan',
      description: 'AI-assisted wildlife monitoring prototype for elephant detection, ByteTrack tracking, and geofenced risk modeling.',
      html_url: 'https://github.com/pritesh-4/Project_Zogan',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-10-04',
    },
    {
      id: 6,
      name: 'Project-FRIDAY',
      description: 'Personal virtual assistant exploring voice-first interaction, cognitive memory, and WebGL shader orb.',
      html_url: 'https://github.com/pritesh-4/Project-FRIDAY',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2026-08-20',
    },
  ],
  languages: [
    { name: 'Python', percentage: 42 },
    { name: 'JavaScript / TypeScript', percentage: 36 },
    { name: 'HTML / CSS', percentage: 16 },
    { name: 'C / C++', percentage: 6 },
  ],
};

type StatsTab = 'STATUS' | 'CALENDAR' | 'RADAR';

interface StatsPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const StatsPage: FC<StatsPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [activeTab, setActiveTab] = useState<StatsTab>('STATUS');

  // Character Status State
  const [selectedAttribute, setSelectedAttribute] = useState<CharacterAttribute>(CHARACTER_ATTRIBUTES[0]);

  // Calendar State
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [selectedMilestone, setSelectedMilestone] = useState<CalendarMilestone | null>(CALENDAR_MILESTONES[0]);

  // GitHub Live Telemetry State
  const [stats, setStats] = useState<StatsState>({
    loading: true,
    publicRepos: 0,
    followers: 0,
    following: 0,
    starsCount: 0,
    repos: [],
    languages: [],
    isCached: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const headers: HeadersInit = {
          Accept: 'application/vnd.github.v3+json',
        };
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const userRes = await fetch('https://api.github.com/users/pritesh-4', { headers });
        if (!userRes.ok) throw new Error('User API limited');
        const userData = await userRes.json();

        const reposRes = await fetch(
          'https://api.github.com/users/pritesh-4/repos?sort=updated&per_page=10',
          { headers }
        );
        if (!reposRes.ok) throw new Error('Repos API limited');
        const reposData: GitHubRepo[] = await reposRes.json();

        if (!isMounted) return;

        // Calculate language counts and total stars (filtering out forks)
        const originalRepos = reposData.filter((repo) => !repo.fork);
        const activeReposList = originalRepos.length > 0 ? originalRepos : reposData;

        const langMap: Record<string, number> = {};
        let totalStars = 0;

        activeReposList.forEach((repo) => {
          totalStars += repo.stargazers_count;
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });

        const totalLangs = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;
        const languages = Object.entries(langMap).map(([name, count]) => ({
          name,
          percentage: Math.round((count / totalLangs) * 100),
        }));

        setStats({
          loading: false,
          publicRepos: userData.public_repos || activeReposList.length,
          followers: userData.followers || 0,
          following: userData.following || 0,
          starsCount: totalStars,
          repos: activeReposList,
          languages: languages.length > 0 ? languages : FALLBACK_STATS.languages,
          isCached: false,
        });
      } catch {
        if (!isMounted) return;
        setStats(FALLBACK_STATS);
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMilestones = useMemo(() => {
    if (selectedYear === 'ALL') return CALENDAR_MILESTONES;
    return CALENDAR_MILESTONES.filter((m) => m.year === selectedYear);
  }, [selectedYear]);

  const handleTabSwitch = useCallback(
    (tab: StatsTab) => {
      playSfx('select');
      setActiveTab(tab);
    },
    [playSfx]
  );

  return (
    <InternalPageLayout
      title="STATUS & CALENDAR"
      sublabel="CHARACTER ATTRIBUTES, DEVELOPMENT JOURNEY & TELEMETRY"
      sectionId="004"
      characterId="fuuka"
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/stats"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="SWITCH BETWEEN CHARACTER STATUS, DARK HOUR CALENDAR & GITHUB TELEMETRY"
    >
      <div className="p3r-stats-screen">
        {/* Top Subview Switcher Tabs */}
        <div className="p3r-stats-subview-nav" role="tablist" aria-label="Status Sections">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'STATUS'}
            className={`p3r-subview-btn ${activeTab === 'STATUS' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('STATUS')}
            onMouseEnter={() => playSfx('hover')}
          >
            <span>[01] CHARACTER STATUS & ATTRIBUTES</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'CALENDAR'}
            className={`p3r-subview-btn ${activeTab === 'CALENDAR' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('CALENDAR')}
            onMouseEnter={() => playSfx('hover')}
          >
            <span>[02] DARK HOUR CALENDAR & TIMELINE</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'RADAR'}
            className={`p3r-subview-btn ${activeTab === 'RADAR' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('RADAR')}
            onMouseEnter={() => playSfx('hover')}
          >
            <span>[03] GITHUB SATELLITE RADAR</span>
          </button>
        </div>

        {/* ==============================================================
            TAB 1: CHARACTER STATUS SCREEN (EXPERIENCE 2)
            ============================================================== */}
        {activeTab === 'STATUS' && (
          <div className="p3r-status-view-stage" role="tabpanel" aria-label="Character Status" aria-live="polite">
            {/* Profile Overview Card */}
            <div className="p3r-char-profile-card">
              <div className="p3r-char-profile-left">
                <div className="p3r-char-avatar-frame">
                  <img
                    src={CHARACTER_PROFILE.portraitThumb}
                    alt={CHARACTER_PROFILE.name}
                    className="p3r-char-avatar-img"
                  />
                  <div className="p3r-char-lvl-tag">LV. {CHARACTER_PROFILE.level}</div>
                </div>

                <div className="p3r-char-name-block">
                  <span className="p3r-char-arcana-badge">{CHARACTER_PROFILE.personaArcana}</span>
                  <h1 className="p3r-char-name">{CHARACTER_PROFILE.name}</h1>
                  <span className="p3r-char-role">{CHARACTER_PROFILE.role}</span>
                  <span className="p3r-char-affiliation">🏛 {CHARACTER_PROFILE.affiliation}</span>
                </div>
              </div>

              <div className="p3r-char-profile-right">
                <p className="p3r-char-intro">{CHARACTER_PROFILE.introduction}</p>

                <div className="p3r-char-interests-box">
                  <span className="p3r-interests-label">CURRENT AREAS OF EXPLORATION:</span>
                  <div className="p3r-interests-chips">
                    {CHARACTER_PROFILE.currentInterests.map((interest, idx) => (
                      <span key={idx} className="p3r-interest-chip">
                        &bull; {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Teleport Links */}
                <div className="p3r-char-teleport-links">
                  <a
                    href={CHARACTER_PROFILE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-status-link-btn"
                  >
                    <span>GITHUB ARCHIVE ↗</span>
                  </a>
                  <a
                    href={CHARACTER_PROFILE.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-status-link-btn"
                  >
                    <span>LINKEDIN NODE ↗</span>
                  </a>
                  <a
                    href={CHARACTER_PROFILE.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-status-link-btn"
                  >
                    <span>SISTER PORTFOLIO ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Core Attributes & Interactive Inspection Stage */}
            <div className="p3r-attributes-split-stage">
              {/* Left Column: Attribute Selector Cards */}
              <div className="p3r-attributes-selector-col" role="listbox" aria-label="Attributes">
                <h2 className="p3r-column-heading">
                  <span>CORE ATTRIBUTES</span>
                  <span>//</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>SELECT TO INSPECT EVIDENCE</span>
                </h2>

                <div className="p3r-attributes-cards-list">
                  {CHARACTER_ATTRIBUTES.map((attr) => (
                    <button
                      key={attr.id}
                      type="button"
                      role="option"
                      aria-selected={selectedAttribute.id === attr.id}
                      className={`p3r-attr-card-btn ${selectedAttribute.id === attr.id ? 'active' : ''}`}
                      onClick={() => {
                        playSfx('select');
                        setSelectedAttribute(attr);
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <div className="p3r-attr-card-top">
                        <span className="p3r-attr-card-name">{attr.name}</span>
                        <span className="p3r-attr-card-grade">{attr.rankGrade}</span>
                      </div>
                      <span className="p3r-attr-card-label">{attr.experienceLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Attribute Detail Evidence Panel */}
              <div className="p3r-attribute-detail-panel">
                <div className="p3r-attr-panel-header">
                  <div className="p3r-attr-panel-title-group">
                    <span className="p3r-attr-panel-category">ATTRIBUTE DOSSIER // S.E.E.S. ARCHIVE</span>
                    <h3 className="p3r-attr-panel-title">{selectedAttribute.name}</h3>
                    <span className="p3r-attr-panel-tagline">{selectedAttribute.experienceLabel}</span>
                  </div>

                  <div className="p3r-attr-panel-badge-box">
                    <span className="p3r-attr-big-grade">{selectedAttribute.rankGrade}</span>
                    <span className="p3r-attr-verified-tag">VERIFIED PROFICIENCY</span>
                  </div>
                </div>

                <div className="p3r-attr-panel-body">
                  <div className="p3r-attr-body-block">
                    <h4 className="p3r-attr-section-hdr">EVIDENCE-BACKED PROFICIENCY SUMMARY</h4>
                    <p className="p3r-attr-p">{selectedAttribute.evidenceSummary}</p>
                  </div>

                  <div className="p3r-attr-body-block">
                    <h4 className="p3r-attr-section-hdr">SUPPORTING TECHNICAL CAPABILITIES</h4>
                    <div className="p3r-attr-skills-grid">
                      {selectedAttribute.supportingSkills.map((skill, sIdx) => (
                        <div key={sIdx} className="p3r-attr-skill-pill">
                          <span className="p3r-skill-bullet">◆</span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p3r-attr-body-block">
                    <h4 className="p3r-attr-section-hdr">RELEVANT IMPLEMENTATION PROVENANCE</h4>
                    <div className="p3r-attr-projects-stack">
                      {selectedAttribute.relevantProjects.map((proj, pIdx) => (
                        <div key={pIdx} className="p3r-attr-project-row">
                          <div className="p3r-attr-proj-top">
                            <span className="p3r-attr-proj-name">{proj.name}</span>
                            <span className="p3r-attr-proj-role">{proj.role}</span>
                          </div>
                          <p className="p3r-attr-proj-evidence">{proj.evidence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Achievements Ribbon */}
            <div className="p3r-achievements-ribbon">
              <h2 className="p3r-ribbon-heading">
                <span>VERIFIED SYSTEM ACHIEVEMENTS</span>
                <span>//</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>GROUND TRUTH</span>
              </h2>

              <div className="p3r-achievements-grid">
                {CHARACTER_PROFILE.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="p3r-achievement-tile" onMouseEnter={() => playSfx('hover')}>
                    <span className="p3r-achievement-tag">{ach.tag}</span>
                    <h3 className="p3r-achievement-title">{ach.title}</h3>
                    <p className="p3r-achievement-desc">{ach.context}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 2: CALENDAR & DEVELOPMENT TIMELINE (EXPERIENCE 3)
            ============================================================== */}
        {activeTab === 'CALENDAR' && (
          <div className="p3r-calendar-view-stage" role="tabpanel" aria-label="Dark Hour Calendar" aria-live="polite">
            {/* Calendar Year Navigation */}
            <div className="p3r-calendar-year-bar">
              <span className="p3r-cal-filter-label">TIMELINE CYCLE:</span>
              <button
                type="button"
                className={`p3r-cal-year-btn ${selectedYear === 'ALL' ? 'active' : ''}`}
                onClick={() => {
                  playSfx('select');
                  setSelectedYear('ALL');
                }}
                onMouseEnter={() => playSfx('hover')}
              >
                <span>ALL CYCLES</span>
              </button>
              {CALENDAR_YEARS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  className={`p3r-cal-year-btn ${selectedYear === yr ? 'active' : ''}`}
                  onClick={() => {
                    playSfx('select');
                    setSelectedYear(yr);
                  }}
                  onMouseEnter={() => playSfx('hover')}
                >
                  <span>{yr}</span>
                </button>
              ))}
            </div>

            {/* Calendar Main Grid & Selected Event Split */}
            <div className="p3r-calendar-stage-split">
              {/* Chronological Milestone Cards List */}
              <div className="p3r-calendar-events-col">
                <div className="p3r-calendar-track-list">
                  {filteredMilestones.map((m) => (
                    <div
                      key={m.id}
                      className={`p3r-calendar-event-card ${selectedMilestone?.id === m.id ? 'selected' : ''}`}
                      onClick={() => {
                        playSfx('select');
                        setSelectedMilestone(m);
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <div className="p3r-cal-card-left">
                        <span className="p3r-cal-moon-icon" title={`Phase: ${m.moonPhase}`}>
                          {m.moonIcon}
                        </span>
                        <div className="p3r-cal-date-block">
                          <span className="p3r-cal-date-str">{m.date}</span>
                          <span className="p3r-cal-phase-str">{m.moonPhase}</span>
                        </div>
                      </div>

                      <div className="p3r-cal-card-right">
                        <div className="p3r-cal-card-topline">
                          <span className="p3r-cal-category-badge">{m.categoryLabel}</span>
                          <span className="p3r-cal-badge">{m.badge}</span>
                        </div>
                        <h3 className="p3r-cal-title">{m.title}</h3>
                        <p className="p3r-cal-summary">{m.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Detail Inspector Panel */}
              {selectedMilestone && (
                <div className="p3r-calendar-detail-panel">
                  <div className="p3r-cal-detail-header">
                    <div className="p3r-cal-header-phase">
                      <span className="p3r-cal-big-moon">{selectedMilestone.moonIcon}</span>
                      <div className="p3r-cal-header-dates">
                        <span className="p3r-cal-header-phase-name">{selectedMilestone.moonPhase} INCIDENT</span>
                        <h3 className="p3r-cal-header-date-title">{selectedMilestone.displayDate}</h3>
                      </div>
                    </div>

                    <span className="p3r-cal-detail-badge">{selectedMilestone.badge}</span>
                  </div>

                  <div className="p3r-cal-detail-body">
                    <h2 className="p3r-cal-detail-title">{selectedMilestone.title}</h2>

                    <div className="p3r-cal-detail-section">
                      <span className="p3r-cal-section-tag">MILESTONE CONTEXT & PURPOSE</span>
                      <p className="p3r-cal-detail-p">{selectedMilestone.summary}</p>
                    </div>

                    <div className="p3r-cal-detail-section">
                      <span className="p3r-cal-section-tag">TECHNICAL CHALLENGE & SOLVED ARCHITECTURE</span>
                      <p className="p3r-cal-detail-p">{selectedMilestone.technicalDetails}</p>
                    </div>

                    <div className="p3r-cal-detail-section">
                      <span className="p3r-cal-section-tag">ASSOCIATED REPOSITORY / PROJECT</span>
                      <div className="p3r-cal-project-box">
                        <span className="p3r-cal-project-name">📦 {selectedMilestone.relatedProject}</span>
                        <a
                          href={selectedMilestone.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p3r-cal-project-link"
                          onClick={() => playSfx('confirm')}
                        >
                          <span>VISIT TARGET REPO / DEMO ↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 3: GITHUB SATELLITE RADAR & TELEMETRY
            ============================================================== */}
        {activeTab === 'RADAR' && (
          <div className="p3r-radar-view-stage" role="tabpanel" aria-label="GitHub Satellite Radar" aria-live="polite">
            {/* Telemetry Status Banner */}
            <div className="p3r-stats-telemetry-banner">
              <div className="p3r-telemetry-signal">
                <span className="p3r-signal-radar-blip" />
                <span className="p3r-telemetry-channel">
                  RADAR LINK // USER: github.com/pritesh-4
                </span>
              </div>

              <span className="p3r-telemetry-mode-tag">
                {stats.isCached ? 'CACHED BACKUP TELEMETRY' : 'LIVE API TELEMETRY LINKED'}
              </span>
            </div>

            {stats.loading ? (
              <div className="p3r-stats-loading-box">
                <div className="p3r-radar-spinner" />
                <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--p3r-cyan)', letterSpacing: '0.15em' }}>
                  CALIBRATING S.E.E.S. NAVIGATIONAL RADAR...
                </span>
              </div>
            ) : (
              <>
                {/* 4 Stat Tiles */}
                <div className="p3r-stats-metrics-grid">
                  <div className="p3r-metric-tile" onMouseEnter={() => playSfx('hover')}>
                    <span className="p3r-metric-lbl">PUBLIC REPOSITORIES</span>
                    <span className="p3r-metric-num">{stats.publicRepos}</span>
                    <span className="p3r-metric-sub">VERIFIED CODE BASES</span>
                  </div>

                  <div className="p3r-metric-tile" onMouseEnter={() => playSfx('hover')}>
                    <span className="p3r-metric-lbl">TOTAL STARS EARNED</span>
                    <span className="p3r-metric-num">{stats.starsCount}</span>
                    <span className="p3r-metric-sub">COMMUNITY RECOGNITION</span>
                  </div>

                  <div className="p3r-metric-tile" onMouseEnter={() => playSfx('hover')}>
                    <span className="p3r-metric-lbl">FOLLOWERS</span>
                    <span className="p3r-metric-num">{stats.followers}</span>
                    <span className="p3r-metric-sub">NETWORK NODES</span>
                  </div>

                  <div className="p3r-metric-tile" onMouseEnter={() => playSfx('hover')}>
                    <span className="p3r-metric-lbl">FOLLOWING NODES</span>
                    <span className="p3r-metric-num">{stats.following}</span>
                    <span className="p3r-metric-sub">COLLABORATIVE PEERS</span>
                  </div>
                </div>

                {/* Repositories & Language Breakdown */}
                <div className="p3r-stats-two-col">
                  {/* Repositories List */}
                  <div className="p3r-repos-card">
                    <h2 className="p3r-card-heading">
                      <span>ACTIVE REPOSITORIES</span>
                      <span>//</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>RECENT COMMITS</span>
                    </h2>

                    <div className="p3r-repo-list">
                      {stats.repos.map((repo) => (
                        <a
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p3r-repo-item"
                          onMouseEnter={() => playSfx('hover')}
                        >
                          <div className="p3r-repo-item-left">
                            <span className="p3r-repo-item-name">{repo.name}</span>
                            {repo.description && (
                              <span className="p3r-repo-item-desc">{repo.description}</span>
                            )}
                          </div>

                          <div className="p3r-repo-item-right">
                            {repo.language && (
                              <span className="p3r-repo-lang-tag">{repo.language}</span>
                            )}
                            <span className="p3r-repo-star-tag">★ {repo.stargazers_count}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Language Distribution Breakdown */}
                  <div className="p3r-languages-card">
                    <h2 className="p3r-card-heading">
                      <span>LANGUAGE MATRIX</span>
                      <span>//</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>DISTRIBUTION</span>
                    </h2>

                    <div className="p3r-lang-bar-list">
                      {stats.languages.map((lang, idx) => (
                        <div key={idx} className="p3r-lang-row">
                          <div className="p3r-lang-row-head">
                            <span>{lang.name}</span>
                            <span style={{ color: 'var(--p3r-cyan)' }}>{lang.percentage}%</span>
                          </div>
                          <div className="p3r-lang-progress-track">
                            <div
                              className="p3r-lang-progress-fill"
                              style={{ width: `${lang.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </InternalPageLayout>
  );
};
