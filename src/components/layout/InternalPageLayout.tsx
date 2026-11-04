import { useEffect, useCallback, type FC, type ReactNode } from 'react';
import { MENU_ITEMS } from '../../data/menuConfig';
import { CharacterBackdrop } from '../shared/CharacterBackdrop';
import { MusicControl } from '../hud/MusicControl';
import { useAudioContext } from '../../hooks/useAudioContext';
import '../../styles/layout/internalLayout.css';

interface InternalPageLayoutProps {
  title: string;
  sublabel: string;
  sectionId: string;
  characterId: string;
  backgroundPath?: string;
  screenId?: string;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
  children: ReactNode;
  customHint?: string;
}

export const InternalPageLayout: FC<InternalPageLayoutProps> = ({
  title,
  sublabel,
  sectionId,
  characterId,
  backgroundPath = '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
  screenId,
  currentRoute,
  onNavigate,
  onBackToMenu,
  children,
  customHint,
}) => {
  const {
    bgmPlaying,
    muted,
    toggleBgm,
    toggleMute,
    playSfx,
  } = useAudioContext();

  const deducedScreenId =
    screenId ||
    (currentRoute === '/about'
      ? 'persona'
      : currentRoute === '/skills'
      ? 'skill'
      : currentRoute === '/resume'
      ? 'equip'
      : currentRoute === '/stats'
      ? 'stats'
      : currentRoute === '/projects'
      ? 'quest'
      : currentRoute === '/tools'
      ? 'item'
      : currentRoute === '/contact'
      ? 'social'
      : currentRoute === '/system'
      ? 'system'
      : undefined);

  const handleBack = useCallback(() => {
    playSfx('back');
    onBackToMenu();
  }, [playSfx, onBackToMenu]);

  const handlePillClick = useCallback(
    (route: string) => {
      if (route !== currentRoute) {
        playSfx('select');
        onNavigate(route);
      }
    },
    [currentRoute, playSfx, onNavigate]
  );

  // Global keybindings on internal pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handleBack();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, toggleMute]);

  return (
    <div className="p3r-internal-page" role="region" aria-label={`${title} Screen`}>
      {/* Dynamic Official Artwork Stage */}
      <CharacterBackdrop
        characterId={characterId}
        backgroundPath={backgroundPath}
        screenId={deducedScreenId}
      />

      {/* Top Header HUD */}
      <header className="p3r-internal-header">
        <div className="p3r-header-left">
          <button
            type="button"
            className="p3r-back-btn"
            onClick={handleBack}
            onMouseEnter={() => playSfx('hover')}
            title="Return to Main Menu (ESC)"
          >
            <span>&lt; MENU</span>
            <span className="p3r-back-key-tag">ESC</span>
          </button>

          <div className="p3r-header-title-box">
            <span className="p3r-header-sublabel">{sublabel}</span>
            <div className="p3r-header-title-row">
              <h1 className="p3r-header-title">{title}</h1>
              <span className="p3r-header-id-tag">[{sectionId}]</span>
            </div>
          </div>
        </div>

        {/* Quick Section Switcher Pills */}
        <nav className="p3r-header-nav-pills" aria-label="Section Selector">
          {MENU_ITEMS.map(item => (
            <button
              key={item.id}
              type="button"
              className={`p3r-nav-pill ${item.route === currentRoute ? 'active' : ''}`}
              onClick={() => handlePillClick(item.route)}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Corner Music Control */}
        <div className="p3r-header-right">
          <MusicControl
            isPlaying={bgmPlaying}
            isMuted={muted}
            onTogglePlay={toggleBgm}
            onToggleMute={toggleMute}
          />
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="p3r-internal-stage">
        {children}
      </main>

      {/* Bottom Status Bar HUD */}
      <footer className="p3r-internal-footer">
        <div className="p3r-footer-hints">
          <div className="p3r-hint-item">
            <span className="p3r-hint-key">ESC</span>
            <span>RETURN TO MENU</span>
          </div>
          <div className="p3r-hint-item">
            <span className="p3r-hint-key">M</span>
            <span>MUTE AUDIO</span>
          </div>
          {customHint && (
            <div className="p3r-hint-item">
              <span className="p3r-hint-key">INFO</span>
              <span>{customHint}</span>
            </div>
          )}
        </div>

        <div className="p3r-footer-sys-info">
          <span className="p3r-sys-status-dot" />
          <span>S.E.E.S. ARCHIVE PROTOCOL // OPERATIONAL</span>
        </div>
      </footer>
    </div>
  );
};
