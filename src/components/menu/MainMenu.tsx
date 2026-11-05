import { useCallback, useEffect, type FC } from 'react';
import { MENU_ITEMS } from '../../data/menuConfig';
import { useMenuNavigation } from '../../hooks/useMenuNavigation';
import { ArcNavigation } from './ArcNavigation';
import { ProfileStatus } from '../hud/ProfileStatus';
import { ContextPanel } from '../hud/ContextPanel';
import { ControlHints } from '../hud/ControlHints';
import { ThemeIndicator } from '../hud/ThemeIndicator';
import { MusicControl } from '../hud/MusicControl';
import { CharacterBackdrop } from '../shared/CharacterBackdrop';
import '../../styles/menu.css';

interface MainMenuProps {
  onBackToTitle: () => void;
  onNavigate?: (route: string) => void;
  playSfx: (cue: 'select' | 'hover' | 'confirm' | 'back' | 'transition') => void;
  isPlayingBgm: boolean;
  isMuted: boolean;
  onTogglePlayBgm: () => void;
  onToggleMute: () => void;
}

export const MainMenu: FC<MainMenuProps> = ({
  onBackToTitle,
  onNavigate,
  playSfx,
  isPlayingBgm,
  isMuted,
  onTogglePlayBgm,
  onToggleMute,
}) => {
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

  // Global keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        playSfx('back');
        onBackToTitle();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        onToggleMute();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBackToTitle, onToggleMute, handleConfirm, playSfx]);

  return (
    <div className="p3r-main-menu-container" role="main" aria-label="Main Portfolio Menu">
      {/* Dynamic Persona 3 Presentation Artwork Backdrop */}
      <CharacterBackdrop
        characterId={activeItem.characterId}
        backgroundPath={
          activeItem.bgKey === 'promoGroup'
            ? '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg'
            : '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png'
        }
      />

      {/* Top HUD: Music Control & Profile Status */}
      <MusicControl
        isPlaying={isPlayingBgm}
        isMuted={isMuted}
        onTogglePlay={onTogglePlayBgm}
        onToggleMute={onToggleMute}
      />

      <ProfileStatus
        portraitPath="/assets/persona3/characters/thumbnails/makoto-yuki-thumb.webp"
        name="PRITESH JENA"
        level={99}
        role="FULL-STACK // AI BUILDER"
      />

      {/* Center Left: Selected Command Context Info */}
      <ContextPanel item={activeItem} />

      {/* Lower Center: Curved Arc Navigation */}
      <ArcNavigation
        items={MENU_ITEMS}
        activeIndex={activeIndex}
        onSelectIndex={handleSelect}
        onConfirm={handleConfirm}
        onHover={handleHover}
      />

      {/* Bottom HUD: Keyboard Hints & Theme Status */}
      <ControlHints />
      <ThemeIndicator />
    </div>
  );
};
