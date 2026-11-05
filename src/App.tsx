import { useState, useCallback, lazy, Suspense, type FC } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { BootSequence } from './components/boot/BootSequence';
import { TitleScreen } from './components/title/TitleScreen';
import { MainMenu } from './components/menu/MainMenu';
import { ScreenTransition } from './components/shared/ScreenTransition';
import { P3RLoader } from './components/shared/P3RLoader';
import { useAudioContext } from './hooks/useAudioContext';
import './styles/theme.css';
import './App.css';

// Lazy-loaded route chunks for optimized initial bundle performance
const PersonaPage = lazy(() =>
  import('./pages/PersonaPage').then(m => ({ default: m.PersonaPage }))
);
const EquipPage = lazy(() =>
  import('./pages/EquipPage').then(m => ({ default: m.EquipPage }))
);
const StatsPage = lazy(() =>
  import('./pages/StatsPage').then(m => ({ default: m.StatsPage }))
);
const ItemPage = lazy(() =>
  import('./pages/ItemPage').then(m => ({ default: m.ItemPage }))
);
const SocialLinkPage = lazy(() =>
  import('./pages/SocialLinkPage').then(m => ({ default: m.SocialLinkPage }))
);
const SystemPage = lazy(() =>
  import('./pages/SystemPage').then(m => ({ default: m.SystemPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage }))
);

export const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If visitor arrives directly at a deep link (/about, /skills, etc.), skip boot sequence
  const isDirectInternal = location.pathname !== '/' && location.pathname !== '/menu';
  const [bootCompleted, setBootCompleted] = useState<boolean>(() => isDirectInternal);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    bgmPlaying,
    muted,
    playBgm,
    toggleBgm,
    toggleMute,
    playSfx,
  } = useAudioContext();

  // Navigation transition helper
  const navigateWithTransition = useCallback(
    (targetPath: string) => {
      setIsTransitioning(true);
      setTimeout(() => {
        navigate(targetPath);
        setTimeout(() => setIsTransitioning(false), 260);
      }, 300);
    },
    [navigate]
  );

  // Complete Boot Sequence -> Ready for Title Screen
  const handleBootComplete = useCallback(() => {
    setBootCompleted(true);
  }, []);

  // Enter from Title Screen -> Main Menu
  const handleTitleEnter = useCallback(() => {
    playSfx('confirm');
    playSfx('transition');
    playBgm();
    navigateWithTransition('/menu');
  }, [playBgm, playSfx, navigateWithTransition]);

  // Return to Title Screen from Main Menu
  const handleBackToTitle = useCallback(() => {
    playSfx('back');
    playSfx('transition');
    navigateWithTransition('/');
  }, [playSfx, navigateWithTransition]);

  // Return to Main Menu from any internal page
  const handleBackToMenu = useCallback(() => {
    playSfx('back');
    playSfx('transition');
    navigateWithTransition('/menu');
  }, [playSfx, navigateWithTransition]);

  // Navigate to internal screen
  const handleNavigateTo = useCallback(
    (route: string) => {
      playSfx('confirm');
      playSfx('transition');
      navigateWithTransition(route);
    },
    [playSfx, navigateWithTransition]
  );

  return (
    <div className="p3r-root-viewport">
      <Suspense fallback={<P3RLoader />}>
        <Routes>
          {/* Root Route: Boot Sequence & Title Screen */}
          <Route
            path="/"
            element={
              !bootCompleted ? (
                <BootSequence onComplete={handleBootComplete} />
              ) : (
                <TitleScreen
                  visible={!isTransitioning}
                  onEnter={handleTitleEnter}
                />
              )
            }
          />

          {/* Main Menu with Curved Arc Navigation */}
          <Route
            path="/menu"
            element={
              <MainMenu
                onBackToTitle={handleBackToTitle}
                onNavigate={handleNavigateTo}
                playSfx={playSfx}
                isPlayingBgm={bgmPlaying}
                isMuted={muted}
                onTogglePlayBgm={toggleBgm}
                onToggleMute={toggleMute}
              />
            }
          />

          {/* 1. PERSONA: Character Profile / Personnel Dossier */}
          <Route
            path="/about"
            element={
              <PersonaPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          {/* Legacy route compatibility: redirect /skills to /tools */}
          <Route
            path="/skills"
            element={<Navigate to="/tools" replace />}
          />

          {/* 2. SKILL: Technical Toolkit & Competencies */}
          <Route
            path="/tools"
            element={
              <ItemPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          {/* 3. EQUIP: Resume, Progression & Equipment */}
          <Route
            path="/resume"
            element={
              <EquipPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          {/* 4. STATS: GitHub Activity & Telemetry */}
          <Route
            path="/stats"
            element={
              <StatsPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          {/* 5. Legacy route compatibility: redirect /projects to /resume (EQUIP) */}
          <Route
            path="/projects"
            element={<Navigate to="/resume" replace />}
          />

          {/* 7. SOCIAL LINK: Communication Terminal */}
          <Route
            path="/contact"
            element={
              <SocialLinkPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          {/* 8. SYSTEM: In-game Configuration & Audio Settings */}
          <Route
            path="/system"
            element={
              <SystemPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          {/* Fallback 404 Anomaly Route */}
          <Route
            path="*"
            element={
              <NotFoundPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />
        </Routes>
      </Suspense>

      {/* Cinematic Diagonal Slash Screen Transition */}
      <ScreenTransition active={isTransitioning} />
    </div>
  );
};

export default App;
