import { type FC } from 'react';
import { type PersonaCharacter, PERSONA_CHARACTERS } from '../../config/personaAssets';
import { SCREEN_ART_CONFIG, type ScreenArtConfig } from '../../config/screenArtConfig';

interface CharacterBackdropProps {
  characterId?: string;
  backgroundPath?: string;
  screenId?: string;
}

export const CharacterBackdrop: FC<CharacterBackdropProps> = ({
  characterId,
  backgroundPath,
  screenId,
}) => {
  const config: ScreenArtConfig | undefined = screenId ? SCREEN_ART_CONFIG[screenId] : undefined;

  const effectiveCharId = characterId || config?.characterId || 'makoto';
  const effectiveBgPath =
    backgroundPath ||
    config?.desktopBg ||
    '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png';

  const char: PersonaCharacter =
    PERSONA_CHARACTERS[effectiveCharId] || PERSONA_CHARACTERS.makoto;

  const charOpacityDesktop = config?.characterOpacityDesktop ?? 0.52;
  const charOpacityMobile = config?.characterOpacityMobile ?? 0.45;

  return (
    <div className="p3r-character-backdrop" aria-hidden="true">
      {/* 1. Background Wallpaper Layer */}
      <div className="p3r-backdrop-wallpaper-wrap">
        <img
          src={effectiveBgPath}
          alt=""
          className="p3r-backdrop-wallpaper"
          loading="eager"
        />
      </div>

      {/* 2. Atmospheric Gradient Overlay (Darkens left and bottom for UI text) */}
      <div
        className="p3r-backdrop-gradient"
        style={config?.gradientOverlay ? { background: config.gradientOverlay } : undefined}
      />

      {/* 3. Dark Tint Overlay (Deep P3R atmospheric tone) */}
      <div className="p3r-backdrop-tint-overlay" />

      {/* 4. Character Artwork Stage (Watermark multiplied onto composite background) */}
      <div
        className="p3r-backdrop-char-stage"
        style={{
          right: config?.characterRightDesktop,
          bottom: config?.characterBottomDesktop ?? '0',
          '--p3r-char-opacity-desktop': String(charOpacityDesktop),
          '--p3r-char-opacity-mobile': String(charOpacityMobile),
        } as React.CSSProperties}
      >
        <img
          key={char.id}
          src={char.path}
          alt={char.name}
          className="p3r-backdrop-char-img"
          style={{
            objectPosition: char.objectPosition,
            transform: config ? `scale(${config.characterScaleDesktop})` : undefined,
          }}
        />
      </div>

      {/* 5. Vignette Peripheral Shadow */}
      <div className="p3r-backdrop-vignette" />

      {/* 6. Subtle P3R Cyan Micro-Grid Texture */}
      <div className="p3r-backdrop-grid-overlay" />
    </div>
  );
};
