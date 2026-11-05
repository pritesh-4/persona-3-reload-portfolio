import { useCallback, type FC, type MouseEvent } from 'react';
import { useAudioContext } from '../../hooks/useAudioContext';
import '../../styles/hud.css';

export interface MusicControlProps {
  isPlaying?: boolean;
  isMuted?: boolean;
  onTogglePlay?: () => void;
  onToggleMute?: () => void;
  variant?: 'full' | 'compact' | 'title';
  className?: string;
}

export const MusicControl: FC<MusicControlProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { bgmEnabled, bgmPlaying, toggleBgm } = useAudioContext();

  const isMusicActive = bgmEnabled && bgmPlaying;

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      toggleBgm();
    },
    [toggleBgm]
  );

  return (
    <div
      className={`p3r-music-toggle-wrap p3r-music-toggle--${variant} ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={`p3r-music-toggle-btn ${bgmEnabled ? 'is-enabled' : 'is-disabled'} ${isMusicActive ? 'is-playing' : ''}`}
        onClick={handleClick}
        aria-label={bgmEnabled ? 'Disable Background Music (Key: M)' : 'Enable Background Music (Key: M)'}
        title={bgmEnabled ? '♪ MUSIC ON (Press M to toggle)' : '♪ MUSIC OFF (Press M to toggle)'}
      >
        <span className="p3r-music-toggle-icon" aria-hidden="true">♪</span>
        <span className="p3r-music-toggle-label">
          MUSIC {bgmEnabled ? 'ON' : 'OFF'}
        </span>
        <span className="p3r-music-toggle-dot" aria-hidden="true" />
      </button>
    </div>
  );
};
