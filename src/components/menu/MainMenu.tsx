import { useState, useCallback, useEffect, type FC } from 'react';
import { MENU_ITEMS } from '../../data/menuConfig';
import { useMenuNavigation } from '../../hooks/useMenuNavigation';
import { useAudioContext } from '../../hooks/useAudioContext';
import { ArcNavigation } from './ArcNavigation';
import { MenuSectionIndicator } from './MenuSectionIndicator';
import { MenuStatusHud } from './MenuStatusHud';
import { ControlHints } from '../hud/ControlHints';
import { ThemeIndicator } from '../hud/ThemeIndicator';
import { MusicControl } from '../hud/MusicControl';
import { CharacterBackdrop } from '../shared/CharacterBackdrop';
import { MENU_SECTION_ART_CONFIG, DARK_HOUR_THEME_OVERRIDE } from '../../config/menuArtConfig';
import '../../styles/menu.css';

interface MainMenuProps {
  onBackToTitle: () => void;
  onNavigate?: (route: string) => void;
}

const PRELOAD_ASSETS = [
  '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
  '/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png',
  '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
  '/assets/persona3/backgrounds/title/title-screen-composition.jpg',
  '/assets/persona3/characters/makoto-yuki.webp',
  '/assets/persona3/characters/aigis.webp',
  '/assets/persona3/characters/akihiko-sanada.webp',
  '/assets/persona3/characters/mitsuru-kirijo.webp',
  '/assets/persona3/characters/fuuka-yamagishi.webp',
  '/assets/persona3/characters/yukari-takeba.webp',
  '/assets/persona3/characters/koromaru.webp',
];

export const MainMenu: FC<MainMenuProps> = ({
  onBackToTitle,
  onNavigate,
}) => {
  const { playSfx, toggleBgm } = useAudioContext();
  const { activeIndex, activeItem, selectIndex } = useMenuNavigation();
  const [isDarkHour, setIsDarkHour] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('darkHour') === 'true' || params.get('darkhour') === '1';
    } catch {
      return false;
    }
  });

  // Preload all high-res background images and character cutouts on mount
  useEffect(() => {
    PRELOAD_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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

  const handleToggleDarkHour = useCallback(() => {
    setIsDarkHour((prev) => {
      const next = !prev;
      playSfx(next ? 'confirm' : 'back');
      return next;
    });
  }, [playSfx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isDarkHour) {
          playSfx('back');
          setIsDarkHour(false);
        } else {
          playSfx('back');
          onBackToTitle();
        }
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
  }, [onBackToTitle, toggleBgm, handleConfirm, playSfx, isDarkHour]);

  // Determine current art direction configuration based on active section and Dark Hour state
  const artConfig =
    MENU_SECTION_ART_CONFIG[activeItem.id] || MENU_SECTION_ART_CONFIG.persona;

  const effectiveBgPath = isDarkHour
    ? DARK_HOUR_THEME_OVERRIDE.bgPath
    : artConfig.bgPath;

  const effectiveBgPosDesktop = isDarkHour
    ? DARK_HOUR_THEME_OVERRIDE.bgPositionDesktop
    : artConfig.bgPositionDesktop;

  const effectiveBgPosMobile = isDarkHour
    ? DARK_HOUR_THEME_OVERRIDE.bgPositionMobile
    : artConfig.bgPositionMobile;

  const effectiveBgScale = isDarkHour
    ? DARK_HOUR_THEME_OVERRIDE.bgScale
    : artConfig.bgScale;

  const effectiveBgFilter = isDarkHour
    ? DARK_HOUR_THEME_OVERRIDE.bgFilter
    : artConfig.bgFilter;

  const effectiveGradientOverlay = isDarkHour
    ? DARK_HOUR_THEME_OVERRIDE.gradientOverlay
    : artConfig.gradientOverlay;

  return (
    <div
      className={`p3r-main-menu-container ${isDarkHour ? 'p3r-dark-hour-active' : ''}`}
      role="main"
      aria-label="Main Portfolio Menu"
    >
      <CharacterBackdrop
        characterId={activeItem.characterId}
        selectionId={isDarkHour ? 'dark-hour' : activeItem.id}
        backgroundPath={effectiveBgPath}
        bgPositionDesktop={effectiveBgPosDesktop}
        bgPositionMobile={effectiveBgPosMobile}
        bgFilter={effectiveBgFilter}
        bgScale={effectiveBgScale}
        gradientOverlay={effectiveGradientOverlay}
      />

      <MusicControl />

      <MenuStatusHud
        isDarkHour={isDarkHour}
        onToggleDarkHour={handleToggleDarkHour}
      />

      <MenuSectionIndicator
        item={activeItem}
        index={activeIndex}
        total={MENU_ITEMS.length}
        isDarkHour={isDarkHour}
      />

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
