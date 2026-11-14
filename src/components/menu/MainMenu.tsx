import { useCallback, useEffect, type FC } from 'react';
import { MENU_ITEMS } from '../../data/menuConfig';
import { PERSONA_BACKGROUNDS } from '../../config/personaAssets';
import { useMenuNavigation } from '../../hooks/useMenuNavigation';
import { useAudioContext } from '../../hooks/useAudioContext';
import { ArcNavigation } from './ArcNavigation';
import { ControlHints } from '../hud/ControlHints';
import { ThemeIndicator } from '../hud/ThemeIndicator';
import { MusicControl } from '../hud/MusicControl';
import { CharacterBackdrop } from '../shared/CharacterBackdrop';
import '../../styles/menu.css';

interface MainMenuProps {
  onBackToTitle: () => void;
  onNavigate?: (route: string) => void;
}

export const MainMenu: FC<MainMenuProps> = ({
  onBackToTitle,
  onNavigate,
}) => {
  const { playSfx, toggleBgm } = useAudioContext();
  const { activeIndex, activeItem, selectIndex } = useMenuNavigation();

  const handleHover = useCallback(() => {
    playSfx('hover');
  }, [playSfx]);

  const handleSelect = useCallback(
    (index: number) => {
      if (index !== activeIndex) {
        playSfx('select');
        selectIndex(index);
      }
    },
    [activeIndex, selectIndex, playSfx]
  );

  const handleConfirm = useCallback(() => {
    playSfx('confirm');
    if (onNavigate) {
      onNavigate(activeItem.route);
    }
  }, [activeItem, onNavigate, playSfx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        playSfx('back');
        onBackToTitle();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleBgm();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBackToTitle, toggleBgm, handleConfirm, playSfx]);

  return (
    <div className="p3r-main-menu-container" role="main" aria-label="Main Portfolio Menu">
      <CharacterBackdrop
        characterId={activeItem.characterId}
        screenId="menu"
        backgroundPath={PERSONA_BACKGROUNDS[activeItem.bgKey]?.path}
      />

      <MusicControl />

      <ArcNavigation
        items={MENU_ITEMS}
        activeIndex={activeIndex}
        onSelectIndex={handleSelect}
        onConfirm={handleConfirm}
        onHover={handleHover}
      />

      <ControlHints />
      <ThemeIndicator />
    </div>
  );
};
