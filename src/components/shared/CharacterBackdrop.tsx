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

  return (
    <div className="p3r-character-backdrop" aria-hidden="true">
      {/* Background Wallpaper Layer */}
      <div className="p3r-backdrop-wallpaper-wrap">
        <img
          src={effectiveBgPath}
          alt=""
          className="p3r-backdrop-wallpaper"
          loading="eager"
        />
        <div
          className="p3r-backdrop-gradient"
          style={config?.gradientOverlay ? { background: config.gradientOverlay } : undefined}
        />
        <div className="p3r-backdrop-vignette" />
        <div className="p3r-backdrop-grid-overlay" />
      </div>

      {/* Featured Character Render Layer */}
      <div
        className="p3r-backdrop-char-stage"
        style={
          config
            ? {
                right: config.characterRightDesktop,
                bottom: config.characterBottomDesktop,
              }
            : undefined
        }
      >
        <div className="p3r-char-glow" />
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
        <div className="p3r-char-shadow" />
      </div>
    </div>
  );
};
