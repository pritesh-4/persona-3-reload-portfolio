import { type FC } from 'react';
import '../../styles/hud.css';

interface MusicControlProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export const MusicControl: FC<MusicControlProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => {
  return (
    <div className="p3r-hud-music" aria-label="Background Music Control">
      <div className="p3r-hud-music-content">
        <button
          type="button"
          className={`p3r-music-btn ${isPlaying && !isMuted ? 'active' : ''}`}
          onClick={onTogglePlay}
          title={isPlaying ? 'Pause BGM' : 'Play BGM'}
        >
          {isPlaying ? '♫ BGM: ON' : '♫ BGM: OFF'}
        </button>

        <button
          type="button"
          className="p3r-music-btn"
          onClick={onToggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? 'MUTED' : 'VOL'}
        </button>

        <div className="p3r-audio-waves" aria-hidden="true">
          <div className={`p3r-wave-bar ${isPlaying && !isMuted ? 'playing' : ''}`} />
          <div className={`p3r-wave-bar ${isPlaying && !isMuted ? 'playing' : ''}`} />
          <div className={`p3r-wave-bar ${isPlaying && !isMuted ? 'playing' : ''}`} />
        </div>
      </div>
    </div>
  );
};

