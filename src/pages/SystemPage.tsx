import { useCallback, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import { SYSTEM_INFO } from '../data/systemConfig';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/system.css';

interface SystemPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const SystemPage: FC<SystemPageProps> = ({ onNavigate, onBackToMenu }) => {
  const {
    bgmPlaying,
    bgmVolume,
    sfxEnabled,
    sfxVolume,
    muted,
    reducedMotion,
    artworkIntensity,
    toggleBgm,
    setBgmVolume,
    toggleSfx,
    setSfxVolume,
    toggleMute,
    setReducedMotion,
    setArtworkIntensity,
    resetAllSettings,
    playSfx,
  } = useAudioContext();

  const handleReset = useCallback(() => {
    playSfx('confirm');
    resetAllSettings();
  }, [resetAllSettings, playSfx]);

  return (
    <InternalPageLayout
      title="SYSTEM"
      sublabel="SYSTEM CONFIGURATION & OPERATIONAL PREFERENCES"
      sectionId="008"
      characterId="koromaru"
      backgroundPath="/assets/persona3/backgrounds/title/persona3-reload-title.jpg"
      currentRoute="/system"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="REAL PREFERENCES ARE PERSISTED IN LOCAL BROWSER STORAGE"
    >
      <div className="p3r-system-screen">
        <div className="p3r-system-grid">
          {/* Controls Column */}
          <div className="p3r-settings-column">
            {/* Audio Settings Group */}
            <section className="p3r-settings-group" aria-labelledby="audio-settings-title">
              <h2 id="audio-settings-title" className="p3r-settings-group-title">
                <span>🔊 AUDIO CALIBRATION</span>
              </h2>

              {/* Master Mute */}
              <div className="p3r-setting-row">
                <div className="p3r-setting-meta">
                  <span className="p3r-setting-name">MASTER AUDIO MUTE</span>
                  <span className="p3r-setting-desc">Mutes all BGM and sound effect channels (Key: M)</span>
                </div>
                <button
                  type="button"
                  className={`p3r-toggle-btn ${muted ? 'on' : 'off'}`}
                  onClick={() => {
                    toggleMute();
                    playSfx('select');
                  }}
                >
                  <span>{muted ? 'MUTED' : 'UNMUTED'}</span>
                </button>
              </div>

              {/* BGM Toggle */}
              <div className="p3r-setting-row">
                <div className="p3r-setting-meta">
                  <span className="p3r-setting-name">BACKGROUND MUSIC (BGM)</span>
                  <span className="p3r-setting-desc">Ambient soundtrack loop during portfolio exploration</span>
                </div>
                <button
                  type="button"
                  className={`p3r-toggle-btn ${bgmPlaying ? 'on' : 'off'}`}
                  onClick={() => {
                    toggleBgm();
                    playSfx('select');
                  }}
                >
                  <span>{bgmPlaying ? 'ACTIVE' : 'PAUSED'}</span>
                </button>
              </div>

              {/* BGM Volume Slider */}
              <div className="p3r-setting-row">
                <div className="p3r-setting-meta">
                  <span className="p3r-setting-name">BGM VOLUME LEVEL</span>
                  <span className="p3r-setting-desc">Soundtrack amplitude gain</span>
                </div>
                <div className="p3r-slider-wrap">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={bgmVolume}
                    onChange={e => setBgmVolume(parseFloat(e.target.value))}
                    className="p3r-range-slider"
                    aria-label="BGM Volume"
                  />
                  <span className="p3r-slider-val">{Math.round(bgmVolume * 100)}%</span>
                </div>
              </div>

              {/* SFX Toggle */}
              <div className="p3r-setting-row">
                <div className="p3r-setting-meta">
                  <span className="p3r-setting-name">UI SOUND EFFECTS (SFX)</span>
                  <span className="p3r-setting-desc">Tactile audio feedback on selection and confirm</span>
                </div>
                <button
                  type="button"
                  className={`p3r-toggle-btn ${sfxEnabled ? 'on' : 'off'}`}
                  onClick={() => {
                    toggleSfx();
                    playSfx('select');
                  }}
                >
                  <span>{sfxEnabled ? 'ENABLED' : 'DISABLED'}</span>
                </button>
              </div>

              {/* SFX Volume Slider */}
              <div className="p3r-setting-row">
                <div className="p3r-setting-meta">
                  <span className="p3r-setting-name">SFX VOLUME LEVEL</span>
                  <span className="p3r-setting-desc">UI sound cue amplitude gain</span>
                </div>
                <div className="p3r-slider-wrap">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={sfxVolume}
                    onChange={e => {
                      setSfxVolume(parseFloat(e.target.value));
                      playSfx('hover');
                    }}
                    className="p3r-range-slider"
                    aria-label="SFX Volume"
                  />
                  <span className="p3r-slider-val">{Math.round(sfxVolume * 100)}%</span>
                </div>
              </div>
            </section>

            {/* Display & Visual Preferences */}
            <section className="p3r-settings-group" aria-labelledby="display-settings-title">
              <h2 id="display-settings-title" className="p3r-settings-group-title">
                <span>🖥 DISPLAY & MOTION PREFERENCES</span>
              </h2>

              {/* Reduced Motion */}
              <div className="p3r-setting-row">
                <div className="p3r-setting-meta">
                  <span className="p3r-setting-name">REDUCED MOTION</span>
                  <span className="p3r-setting-desc">Disables heavy layout rotations and transforms</span>
                </div>
                <button
                  type="button"
                  className={`p3r-toggle-btn ${reducedMotion ? 'on' : 'off'}`}
                  onClick={() => {
                    setReducedMotion(!reducedMotion);
                    playSfx('select');
                  }}
                >
                  <span>{reducedMotion ? 'ACTIVE' : 'OFF'}</span>
                </button>
              </div>

              {/* Artwork Intensity Slider */}
              <div className="p3r-setting-row">
                <div className="p3r-setting-meta">
                  <span className="p3r-setting-name">BACKGROUND ARTWORK INTENSITY</span>
                  <span className="p3r-setting-desc">Brightness and opacity of wallpapers</span>
                </div>
                <div className="p3r-slider-wrap">
                  <input
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.05"
                    value={artworkIntensity}
                    onChange={e => setArtworkIntensity(parseFloat(e.target.value))}
                    className="p3r-range-slider"
                    aria-label="Artwork Intensity"
                  />
                  <span className="p3r-slider-val">{Math.round(artworkIntensity * 100)}%</span>
                </div>
              </div>
            </section>

            {/* Reset to Factory Defaults */}
            <button
              type="button"
              className="p3r-reset-defaults-btn"
              onClick={handleReset}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>↺ RESTORE FACTORY CONFIGURATION</span>
            </button>
          </div>

          {/* Info & Keybindings Column */}
          <div className="p3r-info-column">
            {/* Keybindings Guide */}
            <div className="p3r-keys-guide-card">
              <h2 className="p3r-card-heading">
                <span>KEYBOARD SHORTCUTS</span>
                <span>//</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>GUIDE</span>
              </h2>

              <div className="p3r-keys-list">
                <div className="p3r-key-row">
                  <span className="p3r-key-badge">ESC</span>
                  <span className="p3r-key-purpose">Return to Main Menu / Close Dialog</span>
                </div>
                <div className="p3r-key-row">
                  <span className="p3r-key-badge">ENTER / SPACE</span>
                  <span className="p3r-key-purpose">Confirm Selection / Open Item</span>
                </div>
                <div className="p3r-key-row">
                  <span className="p3r-key-badge">↑ / ↓ / ← / →</span>
                  <span className="p3r-key-purpose">Navigate Options in Menu Arc</span>
                </div>
                <div className="p3r-key-row">
                  <span className="p3r-key-badge">M</span>
                  <span className="p3r-key-purpose">Toggle Master Audio Mute</span>
                </div>
              </div>
            </div>

            {/* System Info & Legal Attribution */}
            <div className="p3r-sys-about-card">
              <h2 className="p3r-card-heading">
                <span>SYSTEM ARCHITECTURE</span>
                <span>//</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--p3r-ice)' }}>ABOUT</span>
              </h2>

              <div className="p3r-sys-item-row">
                <span className="p3r-sys-item-lbl">PORTFOLIO VERSION:</span>
                <span className="p3r-sys-item-val">{SYSTEM_INFO.version}</span>
              </div>
              <div className="p3r-sys-item-row">
                <span className="p3r-sys-item-lbl">ENGINE:</span>
                <span className="p3r-sys-item-val">{SYSTEM_INFO.engine}</span>
              </div>
              <div className="p3r-sys-item-row">
                <span className="p3r-sys-item-lbl">DEVELOPER:</span>
                <span className="p3r-sys-item-val">{SYSTEM_INFO.developer}</span>
              </div>
              <div className="p3r-sys-item-row">
                <span className="p3r-sys-item-lbl">AUDIO SPEC:</span>
                <span className="p3r-sys-item-val">{SYSTEM_INFO.audioSpecs}</span>
              </div>

              <p className="p3r-sys-legal-notice">
                {SYSTEM_INFO.legalNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
