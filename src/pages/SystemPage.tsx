import { useState, useCallback, type FC } from 'react';
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
    bgmEnabled,
    bgmVolume,
    sfxEnabled,
    sfxVolume,
    trackInfo,
    reducedMotion,
    artworkIntensity,
    toggleBgm,
    setBgmVolume,
    toggleSfx,
    setSfxVolume,
    setReducedMotion,
    setArtworkIntensity,
    resetAllSettings,
    playSfx,
  } = useAudioContext();

  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  const handleReset = useCallback(() => {
    if (!isConfirmingReset) {
      playSfx('select');
      setIsConfirmingReset(true);
      setTimeout(() => setIsConfirmingReset(false), 4000);
      return;
    }
    playSfx('confirm');
    resetAllSettings();
    setIsConfirmingReset(false);
  }, [isConfirmingReset, resetAllSettings, playSfx]);

  return (
    <InternalPageLayout
      title="SYSTEM"
      sublabel="SYSTEM CONFIGURATION & PREFERENCES"
      sectionId="007"
      characterId="koromaru"
      backgroundPath="/assets/persona3/backgrounds/title/persona3-reload-title.jpg"
      currentRoute="/system"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="REAL PREFERENCES ARE PERSISTED IN LOCAL BROWSER STORAGE"
    >
      <div className="p3r-system-screen">
        <div className="p3r-system-console-grid">
          {/* LEFT: FLAT CONFIGURATION ROWS */}
          <div className="p3r-config-column">
            {/* Audio Settings Group */}
            <section className="p3r-config-group" aria-labelledby="audio-settings-title">
              <h2 id="audio-settings-title" className="p3r-config-group-title">
                AUDIO CALIBRATION
              </h2>

              {/* Primary Soundtrack Status */}
              <div className="p3r-config-row">
                <div className="p3r-config-meta">
                  <span className="p3r-config-name">PRIMARY SOUNDTRACK</span>
                  <span className="p3r-config-desc">
                    <b>{trackInfo.name}</b> &bull; {trackInfo.artist}
                  </span>
                </div>
                <div className="p3r-config-control">
                  <span className={`p3r-audio-status-pill ${trackInfo.isFallback ? 'fallback' : 'verified'}`}>
                    {trackInfo.isFallback ? 'PROCEDURAL SYNTH' : 'OFFICIAL OST'}
                  </span>
                </div>
              </div>

              {/* BGM Switch */}
              <div className="p3r-config-row">
                <div className="p3r-config-meta">
                  <span className="p3r-config-name">BACKGROUND MUSIC (BGM)</span>
                  <span className="p3r-config-desc">Ambient soundtrack loop during exploration (Key: M)</span>
                </div>
                <div className="p3r-config-control">
                  <button
                    type="button"
                    className={`p3r-switch-btn ${bgmEnabled ? 'on' : 'off'}`}
                    onClick={() => {
                      toggleBgm();
                      playSfx('select');
                    }}
                    aria-label="Toggle Background Music"
                  >
                    <span>{bgmEnabled ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              {/* BGM Volume Slider */}
              <div className="p3r-config-row">
                <div className="p3r-config-meta">
                  <span className="p3r-config-name">BGM VOLUME</span>
                  <span className="p3r-config-desc">Soundtrack output gain</span>
                </div>
                <div className="p3r-config-control p3r-slider-box">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={bgmVolume}
                    onChange={(e) => setBgmVolume(parseFloat(e.target.value))}
                    className="p3r-flat-slider"
                    aria-label="BGM Volume"
                  />
                  <span className="p3r-slider-percent">{Math.round(bgmVolume * 100)}%</span>
                </div>
              </div>

              {/* SFX Switch */}
              <div className="p3r-config-row">
                <div className="p3r-config-meta">
                  <span className="p3r-config-name">SOUND EFFECTS (SFX)</span>
                  <span className="p3r-config-desc">Tactile audio feedback on selection and confirm</span>
                </div>
                <div className="p3r-config-control">
                  <button
                    type="button"
                    className={`p3r-switch-btn ${sfxEnabled ? 'on' : 'off'}`}
                    onClick={() => {
                      toggleSfx();
                      playSfx('select');
                    }}
                    aria-label="Toggle SFX"
                  >
                    <span>{sfxEnabled ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              {/* SFX Volume Slider */}
              <div className="p3r-config-row">
                <div className="p3r-config-meta">
                  <span className="p3r-config-name">SFX VOLUME</span>
                  <span className="p3r-config-desc">Interface cue output gain</span>
                </div>
                <div className="p3r-config-control p3r-slider-box">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={sfxVolume}
                    onChange={(e) => {
                      setSfxVolume(parseFloat(e.target.value));
                      playSfx('hover');
                    }}
                    className="p3r-flat-slider"
                    aria-label="SFX Volume"
                  />
                  <span className="p3r-slider-percent">{Math.round(sfxVolume * 100)}%</span>
                </div>
              </div>
            </section>

            {/* Display & Visual Preferences */}
            <section className="p3r-config-group" aria-labelledby="display-settings-title">
              <h2 id="display-settings-title" className="p3r-config-group-title">
                DISPLAY &amp; MOTION
              </h2>

              {/* Reduced Motion Switch */}
              <div className="p3r-config-row">
                <div className="p3r-config-meta">
                  <span className="p3r-config-name">REDUCED MOTION</span>
                  <span className="p3r-config-desc">Suppresses heavy transitions and rotational transforms</span>
                </div>
                <div className="p3r-config-control">
                  <button
                    type="button"
                    className={`p3r-switch-btn ${reducedMotion ? 'on' : 'off'}`}
                    onClick={() => {
                      setReducedMotion(!reducedMotion);
                      playSfx('select');
                    }}
                    aria-label="Toggle Reduced Motion"
                  >
                    <span>{reducedMotion ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              {/* Artwork Intensity Slider */}
              <div className="p3r-config-row">
                <div className="p3r-config-meta">
                  <span className="p3r-config-name">BACKGROUND ARTWORK INTENSITY</span>
                  <span className="p3r-config-desc">Opacity of atmospheric background wallpapers</span>
                </div>
                <div className="p3r-config-control p3r-slider-box">
                  <input
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.05"
                    value={artworkIntensity}
                    onChange={(e) => setArtworkIntensity(parseFloat(e.target.value))}
                    className="p3r-flat-slider"
                    aria-label="Artwork Intensity"
                  />
                  <span className="p3r-slider-percent">{Math.round(artworkIntensity * 100)}%</span>
                </div>
              </div>
            </section>

            {/* Reset Defaults Action Button */}
            <div className="p3r-reset-action-box">
              <button
                type="button"
                className={`p3r-reset-button ${isConfirmingReset ? 'confirming-danger' : ''}`}
                onClick={handleReset}
                onMouseEnter={() => playSfx('hover')}
              >
                <span>
                  {isConfirmingReset
                    ? '⚠ CLICK AGAIN TO CONFIRM RESTORE'
                    : '↺ RESTORE FACTORY CONFIGURATION'}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: SHORTCUTS REFERENCE & ARCHITECTURE NOTES */}
          <aside className="p3r-system-reference-column">
            {/* Keyboard Shortcuts Guide */}
            <div className="p3r-ref-card">
              <h3 className="p3r-ref-card-title">KEYBOARD CONTROLS</h3>
              <div className="p3r-shortcuts-list">
                <div className="p3r-shortcut-row">
                  <span className="p3r-key-badge">ESC</span>
                  <span className="p3r-key-desc">Return to Main Menu / Close Dialog</span>
                </div>
                <div className="p3r-shortcut-row">
                  <span className="p3r-key-badge">ENTER / SPACE</span>
                  <span className="p3r-key-desc">Confirm Selection / Open Item</span>
                </div>
                <div className="p3r-shortcut-row">
                  <span className="p3r-key-badge">W / S or ↑ / ↓</span>
                  <span className="p3r-key-desc">Traverse Options along Menu Arc</span>
                </div>
                <div className="p3r-shortcut-row">
                  <span className="p3r-key-badge">A / D or ← / →</span>
                  <span className="p3r-key-desc">Step Previous / Next in Arc &amp; Sliders</span>
                </div>
                <div className="p3r-shortcut-row">
                  <span className="p3r-key-badge">M</span>
                  <span className="p3r-key-desc">Toggle Background Music (ON / OFF)</span>
                </div>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="p3r-ref-card">
              <h3 className="p3r-ref-card-title">SYSTEM ARCHITECTURE</h3>
              <div className="p3r-arch-specs-list">
                <div className="p3r-spec-item">
                  <span className="p3r-spec-name">FRAMEWORK:</span>
                  <span className="p3r-spec-val">{SYSTEM_INFO.engine}</span>
                </div>
                <div className="p3r-spec-item">
                  <span className="p3r-spec-name">DEVELOPER:</span>
                  <span className="p3r-spec-val">{SYSTEM_INFO.developer}</span>
                </div>
                <div className="p3r-spec-item">
                  <span className="p3r-spec-name">AUDIO SUBSYSTEM:</span>
                  <span className="p3r-spec-val">{SYSTEM_INFO.audioSpecs}</span>
                </div>
              </div>
              <p className="p3r-legal-statement">
                {SYSTEM_INFO.legalNotice}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </InternalPageLayout>
  );
};
