import { useState, useEffect, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
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
  publicRepos: 14,
  followers: 8,
  following: 12,
  starsCount: 16,
  isCached: true,
  repos: [
    {
      id: 1,
      name: 'DevLore',
      description: 'An advanced stateful quiz platform with custom React hooks and REST connectors.',
      html_url: 'https://github.com/pritesh-4/DevLore',
      language: 'JavaScript',
      stargazers_count: 5,
      forks_count: 1,
      updated_at: '2026-03-12',
    },
    {
      id: 2,
      name: 'AI-Impact-Predictor',
      description: 'Supervised predictive machine learning layer analyzing code alterations.',
      html_url: 'https://github.com/pritesh-4/AI-Impact-Predictor',
      language: 'Python',
      stargazers_count: 4,
      forks_count: 0,
      updated_at: '2026-03-05',
    },
    {
      id: 3,
      name: 'Chronicles-of-Fate',
      description: 'An interactive narrative developer portfolio inspired by Omniscient Reader.',
      html_url: 'https://github.com/pritesh-4/Chronicles-of-Fate',
      language: 'JavaScript',
      stargazers_count: 6,
      forks_count: 2,
      updated_at: '2026-02-28',
    },
    {
      id: 4,
      name: 'Elephant_detector',
      description: 'Computer vision deep learning detection pipeline using YOLO and OpenCV.',
      html_url: 'https://github.com/pritesh-4/Elephant_detector',
      language: 'Python',
      stargazers_count: 3,
      forks_count: 0,
      updated_at: '2026-01-15',
    },
    {
      id: 5,
      name: 'Friday',
      description: 'Personal voice assistant and workflow automation engine in Python.',
      html_url: 'https://github.com/pritesh-4/Friday',
      language: 'Python',
      stargazers_count: 2,
      forks_count: 0,
      updated_at: '2025-11-20',
    },
  ],
  languages: [
    { name: 'JavaScript / TypeScript', percentage: 48 },
    { name: 'Python', percentage: 34 },
    { name: 'CSS / Styling', percentage: 12 },
    { name: 'C / C++', percentage: 6 },
  ],
};

interface StatsPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const StatsPage: FC<StatsPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
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

        // Calculate language counts and total stars
        const langMap: Record<string, number> = {};
        let totalStars = 0;

        reposData.forEach((repo) => {
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
          publicRepos: userData.public_repos || reposData.length,
          followers: userData.followers || 0,
          following: userData.following || 0,
          starsCount: totalStars,
          repos: reposData,
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

  return (
    <InternalPageLayout
      title="STATS"
      sublabel="DEVELOPER TELEMETRY & GITHUB ACTIVITY"
      sectionId="004"
      characterId="fuuka"
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/stats"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="REAL-TIME GITHUB TELEMETRY LINKED VIA S.E.E.S. SATELLITE"
    >
      <div className="p3r-stats-screen">
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

        {/* Loading Spinner or Active Stats Grid */}
        {stats.loading ? (
          <div className="p3r-stats-loading-box">
            <div className="p3r-radar-spinner" />
            <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--p3r-cyan)', letterSpacing: '0.15em' }}>
              CALIBRATING S.E.E.S. NAVIGATIONAL RADAR...
            </span>
          </div>
        ) : (
          <>
            {/* Stat Tiles */}
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
                <span className="p3r-metric-lbl">GSSOC MERGED PRS</span>
                <span className="p3r-metric-num">10+</span>
                <span className="p3r-metric-sub">PRODUCTION CONTRIBUTIONS</span>
              </div>
            </div>

            {/* Repositories & Language Breakdown */}
            <div className="p3r-stats-two-col">
              {/* Repositories List */}
              <div className="p3r-repos-card">
                <h2 className="p3r-card-heading">
                  <span>ACTIVE REPOSITORIES</span>
                  <span>//</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>
                    RECENT COMMITS
                  </span>
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
                  <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>
                    DISTRIBUTION
                  </span>
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
    </InternalPageLayout>
  );
};
