import { useEffect, useCallback, type FC, type ReactNode } from 'react';
import { MENU_ITEMS, ROUTE_TO_SCREEN_ID } from '../../data/menuConfig';
import { CharacterBackdrop } from '../shared/CharacterBackdrop';
import { MusicControl } from '../hud/MusicControl';
import { useAudioContext } from '../../hooks/useAudioContext';
import '../../styles/layout/internalLayout.css';
import '../../styles/editorial.css';

interface InternalPageLayoutProps {
  title: string;
  sublabel: string;
  sectionId: string;
  characterId?: string;
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
  backgroundPath,
  screenId,
  currentRoute,
  onNavigate,
  onBackToMenu,
  children,
  customHint,
}) => {
  const { toggleBgm, playSfx } = useAudioContext();

  const deducedScreenId = screenId || ROUTE_TO_SCREEN_ID[currentRoute] || 'persona';

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
        toggleBgm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, toggleBgm]);

  return (
    <div className="p3r-internal-page" role="region" aria-label={`${title} Screen`}>
      <CharacterBackdrop
        characterId={characterId}
        backgroundPath={backgroundPath}
        screenId={deducedScreenId}
      />

      {/* Compact, Unified Editorial Header */}
      <header className="p3r-internal-header">
        <div className="p3r-header-left">
          <button
            type="button"
            className="p3r-back-btn"
            onClick={handleBack}
            onMouseEnter={() => playSfx('hover')}
            title="Return to Main Menu (ESC)"
          >
            <span className="p3r-back-arrow">&lt;</span>
            <span className="p3r-back-label">MENU</span>
            <span className="p3r-back-key-tag">ESC</span>
          </button>

          <div className="p3r-header-divider" aria-hidden="true" />

          <div className="p3r-header-title-group">
            <h1 className="p3r-header-title">{title}</h1>
            <span className="p3r-header-id-tag">[{sectionId}]</span>
            <span className="p3r-header-sep" aria-hidden="true">//</span>
            <span className="p3r-header-sublabel">{sublabel}</span>
          </div>
        </div>

        <nav className="p3r-header-nav-pills" aria-label="Section Selector">
          {MENU_ITEMS.map((item) => (
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

        <div className="p3r-header-right">
          <MusicControl />
        </div>
      </header>

      <main className="p3r-internal-stage">
        {children}
      </main>

      <footer className="p3r-internal-footer">
        <div className="p3r-footer-hints">
          <div className="p3r-hint-item">
            <span className="p3r-hint-key">ESC</span>
            <span>RETURN TO MENU</span>
          </div>
          <div className="p3r-hint-item">
            <span className="p3r-hint-key">M</span>
            <span>MUSIC ON/OFF</span>
          </div>
          <div className="p3r-hint-item">
            <span className="p3r-hint-key">CTRL+K</span>
            <span>TERMINAL</span>
          </div>
          {customHint && (
            <div className="p3r-hint-item p3r-hint-custom">
              <span className="p3r-hint-key">ACTION</span>
              <span>{customHint}</span>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
