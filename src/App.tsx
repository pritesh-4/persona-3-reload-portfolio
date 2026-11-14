import { useState, useCallback, useEffect, lazy, Suspense, type FC } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { BootSequence } from './components/boot/BootSequence';
import { TitleScreen } from './components/title/TitleScreen';
import { MainMenu } from './components/menu/MainMenu';
import { CommandTerminal } from './components/terminal/CommandTerminal';
import { DeveloperStatusPanel } from './components/hud/DeveloperStatusPanel';
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
const QuestPage = lazy(() =>
  import('./pages/QuestPage').then(m => ({ default: m.QuestPage }))
);
const ExperiencePage = lazy(() =>
  import('./pages/ExperiencePage').then(m => ({ default: m.ExperiencePage }))
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
const RecruiterPage = lazy(() =>
  import('./pages/RecruiterPage').then(m => ({ default: m.RecruiterPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage }))
);

export const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If visitor arrives directly at a deep link (/about, /skills, /recruiter, etc.), skip boot sequence
  const isDirectInternal = location.pathname !== '/' && location.pathname !== '/menu';
  const [bootCompleted, setBootCompleted] = useState<boolean>(() => isDirectInternal);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const { playBgm, playSfx } = useAudioContext();

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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

  const handleBootComplete = useCallback(() => {
    setBootCompleted(true);
  }, []);

  const handleTitleEnter = useCallback(() => {
    playSfx('confirm');
    playSfx('transition');
    playBgm();
    navigateWithTransition('/menu');
  }, [playBgm, playSfx, navigateWithTransition]);

  const handleBackToTitle = useCallback(() => {
    playSfx('back');
    playSfx('transition');
    navigateWithTransition('/');
  }, [playSfx, navigateWithTransition]);

  const handleBackToMenu = useCallback(() => {
    playSfx('back');
    playSfx('transition');
    navigateWithTransition('/menu');
  }, [playSfx, navigateWithTransition]);

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

          <Route
            path="/menu"
            element={
              <MainMenu
                onBackToTitle={handleBackToTitle}
                onNavigate={handleNavigateTo}
              />
            }
          />

          <Route
            path="/about"
            element={
              <PersonaPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          <Route
            path="/skills"
            element={<Navigate to="/tools" replace />}
          />
          <Route
            path="/tools"
            element={
              <ItemPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          <Route
            path="/resume"
            element={
              <EquipPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          <Route
            path="/experience"
            element={
              <ExperiencePage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          <Route
            path="/stats"
            element={
              <StatsPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          <Route
            path="/projects"
            element={
              <QuestPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          <Route
            path="/contact"
            element={
              <SocialLinkPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          <Route
            path="/system"
            element={
              <SystemPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />

          <Route
            path="/recruiter"
            element={
              <RecruiterPage
                onNavigate={handleNavigateTo}
                onBackToMenu={handleBackToMenu}
              />
            }
          />
          <Route
            path="/quick-profile"
            element={<Navigate to="/recruiter" replace />}
          />

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

      <ScreenTransition active={isTransitioning} />

      <CommandTerminal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={handleNavigateTo}
        onOpenStatusPanel={() => setIsStatusOpen(true)}
      />

      <DeveloperStatusPanel
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        onNavigate={handleNavigateTo}
      />
    </div>
  );
};

export default App;
