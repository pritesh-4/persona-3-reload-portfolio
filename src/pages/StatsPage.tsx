import { useState, useEffect, useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
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
  cachedTimestamp?: string;
}

const BENCHMARK_FALLBACK_STATS: StatsState = {
  loading: false,
  publicRepos: 19,
  followers: 8,
  following: 6,
  starsCount: 9,
  isCached: true,
  cachedTimestamp: 'OCTOBER 2026 (BENCHMARK ARCHIVE)',
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

type StatsTab = 'TELEMETRY' | 'CALENDAR';

interface StatsPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const StatsPage: FC<StatsPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [activeTab, setActiveTab] = useState<StatsTab>('TELEMETRY');

  // Selected Technical Focus Area
  const [selectedFocus, setSelectedFocus] = useState<CharacterAttribute>(CHARACTER_ATTRIBUTES[0]);

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
          languages: languages.length > 0 ? languages : BENCHMARK_FALLBACK_STATS.languages,
          isCached: false,
        });
      } catch {
        if (!isMounted) return;
        setStats(BENCHMARK_FALLBACK_STATS);
      }
    }

    fetchGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleTabChange = useCallback(
    (tab: StatsTab) => {
      playSfx('select');
      setActiveTab(tab);
    },
    [playSfx]
  );

  const filteredMilestones =
    selectedYear === 'ALL'
      ? CALENDAR_MILESTONES
      : CALENDAR_MILESTONES.filter((m) => m.year === selectedYear);

  return (
    <InternalPageLayout
      title="STATS"
      sublabel="DEVELOPER TELEMETRY & CHRONOLOGICAL CALENDAR"
      sectionId="005"
      characterId="fuuka"
      backgroundPath="/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png"
      currentRoute="/stats"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="INSPECT LIVE REPOSITORY METRICS & DEVELOPMENT CHRONICLES"
    >
      <div className="p3r-stats-screen">
        {/* Navigation Mode Switcher */}
        <div className="p3r-stats-toolbar">
          <div className="p3r-stats-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'TELEMETRY'}
              className={`p3r-stats-tab-btn ${activeTab === 'TELEMETRY' ? 'active' : ''}`}
              onClick={() => handleTabChange('TELEMETRY')}
            >
              <span>TELEMETRY &amp; GITHUB STATUS</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'CALENDAR'}
              className={`p3r-stats-tab-btn ${activeTab === 'CALENDAR' ? 'active' : ''}`}
              onClick={() => handleTabChange('CALENDAR')}
            >
              <span>DEVELOPMENT CALENDAR</span>
            </button>
          </div>

          {/* Data Authenticity / Integrity Status Pill */}
          <div className="p3r-telemetry-badge-box">
            {stats.loading ? (
              <span className="p3r-stat-status-pill loading">
                <span className="p3r-status-dot pulsing" aria-hidden="true" /> CONNECTING TO GITHUB...
              </span>
            ) : stats.isCached ? (
              <span className="p3r-stat-status-pill cached">
                <span className="p3r-status-dot warning" aria-hidden="true" /> CACHED ARCHIVE ({stats.cachedTimestamp || 'FALLBACK'})
              </span>
            ) : (
              <span className="p3r-stat-status-pill live">
                <span className="p3r-status-dot active" aria-hidden="true" /> LIVE TELEMETRY // @pritesh-4
              </span>
            )}
          </div>
        </div>

        {/* ================================================================
            VIEW 1: TELEMETRY & GITHUB STATUS
            ================================================================ */}
        {activeTab === 'TELEMETRY' && (
          <div className="p3r-telemetry-view">
            {/* Top Stat Numerals Bar */}
            <div className="p3r-metric-numerals-strip">
              <div className="p3r-numeral-plate">
                <span className="p3r-numeral-tag">PUBLIC REPOSITORIES</span>
                <span className="p3r-numeral-val">{stats.publicRepos}</span>
                <span className="p3r-numeral-sub">VERIFIED PUBLIC REPOS</span>
              </div>
              <div className="p3r-numeral-plate">
                <span className="p3r-numeral-tag">FOLLOWERS</span>
                <span className="p3r-numeral-val">{stats.followers}</span>
                <span className="p3r-numeral-sub">OPEN SOURCE NETWORK</span>
              </div>
              <div className="p3r-numeral-plate">
                <span className="p3r-numeral-tag">STARS COLLECTED</span>
                <span className="p3r-numeral-val">{stats.starsCount}</span>
                <span className="p3r-numeral-sub">COMMUNITY APPRECIATION</span>
              </div>
              <div className="p3r-numeral-plate">
                <span className="p3r-numeral-tag">CORE LANGUAGES</span>
                <span className="p3r-numeral-val">{stats.languages.length}</span>
                <span className="p3r-numeral-sub">POLYGLOT STACK</span>
              </div>
            </div>

            {/* Language Distribution Bar */}
            <div className="p3r-lang-distribution-plate">
              <div className="p3r-lang-head">
                <span className="p3r-lang-label">LANGUAGE DISTRIBUTION PROFILE</span>
                <span className="p3r-lang-meta">DERIVED FROM REPOSITORY CODEBASE</span>
              </div>

              <div className="p3r-lang-bar-track">
                {stats.languages.map((lang, idx) => (
                  <div
                    key={lang.name}
                    className={`p3r-lang-bar-segment seg-${idx % 4}`}
                    style={{ width: `${lang.percentage}%` }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              <div className="p3r-lang-legend-row">
                {stats.languages.map((lang, idx) => (
                  <div key={lang.name} className="p3r-lang-legend-item">
                    <span className={`p3r-lang-legend-dot seg-${idx % 4}`} />
                    <span className="p3r-lang-name">{lang.name}</span>
                    <span className="p3r-lang-pct">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Asymmetrical Lower Spread: Recent Repositories + Technical Focus Areas */}
            <div className="p3r-telemetry-lower-grid">
              {/* Repositories Activity Index */}
              <section className="p3r-repos-column">
                <div className="p3r-section-header-row">
                  <h3 className="p3r-sec-title">ACTIVE REPOSITORY ARCHIVE</h3>
                  <a
                    href="https://github.com/pritesh-4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p3r-gh-profile-link"
                  >
                    VIEW ALL ON GITHUB ↗
                  </a>
                </div>

                <div className="p3r-repos-list">
                  {stats.repos.slice(0, 6).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-repo-item-card"
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <div className="p3r-repo-card-head">
                        <span className="p3r-repo-name">{repo.name}</span>
                        {repo.language && (
                          <span className="p3r-repo-lang-tag">{repo.language}</span>
                        )}
                      </div>
                      <p className="p3r-repo-desc">
                        {repo.description || 'Public software engineering repository.'}
                      </p>
                      <div className="p3r-repo-meta">
                        <span>★ {repo.stargazers_count}</span>
                        <span>UPDATED: {repo.updated_at.slice(0, 10)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* Technical Domain Focus Areas (Evidence-based, no fake S-rank) */}
              <aside className="p3r-focus-column">
                <div className="p3r-section-header-row">
                  <h3 className="p3r-sec-title">TECHNICAL DOMAIN FOCUS</h3>
                  <span className="p3r-sec-sub">EVIDENCE-BACKED COMPETENCIES</span>
                </div>

                <div className="p3r-focus-tabs-row">
                  {CHARACTER_ATTRIBUTES.map((attr) => (
                    <button
                      key={attr.id}
                      type="button"
                      className={`p3r-focus-tab ${selectedFocus.id === attr.id ? 'active' : ''}`}
                      onClick={() => {
                        playSfx('select');
                        setSelectedFocus(attr);
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>{attr.name}</span>
                    </button>
                  ))}
                </div>

                <div className="p3r-focus-detail-plate">
                  <div className="p3r-focus-head">
                    <span className="p3r-focus-cat">{selectedFocus.category}</span>
                    <h4 className="p3r-focus-title">{selectedFocus.name}</h4>
                    <span className="p3r-focus-exp">{selectedFocus.experienceLabel}</span>
                  </div>

                  <p className="p3r-focus-summary">{selectedFocus.evidenceSummary}</p>

                  <div className="p3r-focus-section">
                    <span className="p3r-focus-label">CORE SKILLS IN PRACTICE:</span>
                    <div className="p3r-focus-skills-wrap">
                      {selectedFocus.supportingSkills.map((sk, idx) => (
                        <span key={idx} className="p3r-focus-skill-tag">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p3r-focus-section">
                    <span className="p3r-focus-label">CORRESPONDING REAL-WORLD EVIDENCE:</span>
                    <div className="p3r-focus-evidence-list">
                      {selectedFocus.relevantProjects.map((proj, pIdx) => (
                        <div key={pIdx} className="p3r-focus-evidence-item">
                          <span className="p3r-evidence-proj-name">{proj.name} ({proj.role})</span>
                          <span className="p3r-evidence-text">{proj.evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 2: DEVELOPMENT CALENDAR
            ================================================================ */}
        {activeTab === 'CALENDAR' && (
          <div className="p3r-calendar-view">
            <div className="p3r-cal-filter-bar">
              <span className="p3r-cal-filter-label">YEAR FILTER:</span>
              <button
                type="button"
                className={`p3r-cal-year-btn ${selectedYear === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedYear('ALL')}
              >
                <span>ALL TIME</span>
              </button>
              {CALENDAR_YEARS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  className={`p3r-cal-year-btn ${selectedYear === yr ? 'active' : ''}`}
                  onClick={() => setSelectedYear(yr)}
                >
                  <span>{yr}</span>
                </button>
              ))}
            </div>

            <div className="p3r-cal-grid">
              <div className="p3r-cal-milestones-list">
                {filteredMilestones.map((m) => (
                  <div
                    key={m.id}
                    className={`p3r-cal-milestone-card ${selectedMilestone?.id === m.id ? 'selected' : ''}`}
                    onClick={() => {
                      playSfx('select');
                      setSelectedMilestone(m);
                    }}
                    onMouseEnter={() => playSfx('hover')}
                  >
                    <div className="p3r-cal-card-head">
                      <span className="p3r-cal-date">{m.displayDate || m.date}</span>
                      <span className="p3r-cal-cat">{m.categoryLabel || m.category}</span>
                    </div>
                    <h4 className="p3r-cal-card-title">{m.title}</h4>
                    <p className="p3r-cal-card-desc">{m.summary.slice(0, 90)}...</p>
                  </div>
                ))}
              </div>

              {selectedMilestone && (
                <aside className="p3r-cal-inspector">
                  <div className="p3r-cal-inspector-head">
                    <span className="p3r-cal-inspector-date">{selectedMilestone.displayDate} // {selectedMilestone.categoryLabel}</span>
                    <h3 className="p3r-cal-inspector-title">{selectedMilestone.title}</h3>
                  </div>
                  <p className="p3r-cal-inspector-text">{selectedMilestone.summary}</p>
                  {selectedMilestone.technicalDetails && (
                    <p className="p3r-cal-inspector-details">{selectedMilestone.technicalDetails}</p>
                  )}
                  {selectedMilestone.relatedProject && (
                    <div className="p3r-cal-tags-row">
                      <span className="p3r-cal-tag">
                        PROJECT: {selectedMilestone.relatedProject}
                      </span>
                    </div>
                  )}
                </aside>
              )}
            </div>
          </div>
        )}
      </div>
    </InternalPageLayout>
  );
};
