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
  isPlaying: propIsPlaying,
  isMuted: propIsMuted,
  onTogglePlay: propOnTogglePlay,
  onToggleMute: propOnToggleMute,
  variant = 'full',
  className = '',
}) => {
  const context = useAudioContext();

  const isPlaying = propIsPlaying !== undefined ? propIsPlaying : context.bgmPlaying;
  const isMuted = propIsMuted !== undefined ? propIsMuted : context.muted;
  const onTogglePlay = propOnTogglePlay || context.toggleBgm;
  const onToggleMute = propOnToggleMute || context.toggleMute;
  const { bgmVolume, setBgmVolume, trackInfo, reducedMotion } = context;

  const handleContainerClick = useCallback((e: MouseEvent) => {
    // Prevent clicking inside music control from triggering parent container clicks (e.g. TitleScreen enter)
    e.stopPropagation();
  }, []);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      setBgmVolume(parseFloat(e.target.value));
    },
    [setBgmVolume]
  );

  const isAudioActive = isPlaying && !isMuted;

  return (
    <div
      className={`p3r-hud-music p3r-hud-music--${variant} ${isAudioActive ? 'is-active' : 'is-idle'} ${className}`}
      onClick={handleContainerClick}
      role="region"
      aria-label="Background Music Control — Colour Your Night"
    >
      <div className="p3r-hud-music-content">
        {/* Rotating Persona 3 Mini-CD disc */}
        <div
          className={`p3r-cd-disc ${isAudioActive && !reducedMotion ? 'spinning' : ''}`}
          aria-hidden="true"
          title={isAudioActive ? 'Now Playing: Colour Your Night' : 'Soundtrack Paused'}
        >
          <div className="p3r-cd-outer-rim" />
          <div className="p3r-cd-grooves" />
          <div className="p3r-cd-rainbow-reflection" />
          <div className="p3r-cd-spindle">
            <div className="p3r-cd-center-dot" />
          </div>
        </div>

        {/* Track Typography & State */}
        <div className="p3r-cd-meta">
          <div className="p3r-cd-topline">
            <span className={`p3r-cd-badge ${isAudioActive ? 'active' : 'idle'}`}>
              {isAudioActive ? '♪ NOW PLAYING' : isMuted ? '🔇 MUTED' : '⏸ PAUSED'}
            </span>
            {trackInfo.isFallback && (
              <span
                className="p3r-cd-fallback-tag"
                title="Local file public/assets/persona3/audio/bgm/colour-your-night.mp3 is required. Streaming procedural ambient bed fallback."
              >
                FALLBACK
              </span>
            )}
          </div>

          <div className="p3r-cd-title" title="Track: Colour Your Night (Persona 3 Reload OST)">
            COLOUR YOUR NIGHT
          </div>

          {variant !== 'title' && (
            <div className="p3r-cd-artist">
              {trackInfo.isFallback ? 'PROCEDURAL AMBIENT BED' : 'PERSONA 3 RELOAD OST'}
            </div>
          )}
        </div>

        {/* Buttons & Activity Indicator */}
        <div className="p3r-cd-actions">
          <button
            type="button"
            className={`p3r-music-btn p3r-cd-play-btn ${isAudioActive ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
            title={isPlaying ? 'Pause Background Music (BGM)' : 'Play Background Music (BGM)'}
            aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
          >
            {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
          </button>

          <button
            type="button"
            className={`p3r-music-btn p3r-cd-mute-btn ${isMuted ? 'active-mute' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            title={isMuted ? 'Unmute Audio (Key: M)' : 'Mute Audio (Key: M)'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? '🔇 MUTED' : '🔊 VOL'}
          </button>

          {/* Inline Volume Control */}
          {variant !== 'title' && (
            <div className="p3r-cd-vol-box" title={`BGM Volume: ${Math.round((isMuted ? 0 : bgmVolume) * 100)}%`}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : bgmVolume}
                onChange={handleVolumeChange}
                className="p3r-cd-volume-slider"
                aria-label="Background Music Volume"
              />
              <span className="p3r-cd-vol-readout">
                {Math.round((isMuted ? 0 : bgmVolume) * 100)}%
              </span>
            </div>
          )}

          {/* Equalizer Sound Waves */}
          <div className="p3r-audio-waves" aria-hidden="true">
            <div className={`p3r-wave-bar ${isAudioActive ? 'playing' : ''}`} />
            <div className={`p3r-wave-bar ${isAudioActive ? 'playing' : ''}`} />
            <div className={`p3r-wave-bar ${isAudioActive ? 'playing' : ''}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
