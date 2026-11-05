import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { PERSONA_AUDIO } from '../config/personaAssets';
import {
  loadStoredSettings,
  saveStoredSettings,
  DEFAULT_SYSTEM_SETTINGS,
  type SystemSettings,
} from '../data/systemConfig';
import { AudioContext } from './AudioContextValue';

// Audio pool for SFX with reusable elements
const sfxPool: Record<string, HTMLAudioElement> = {};

function getSfxAudio(key: string, path: string): HTMLAudioElement {
  if (!sfxPool[key]) {
    const audio = new Audio(path);
    audio.preload = 'auto';
    sfxPool[key] = audio;
  }
  return sfxPool[key];
}

export const AudioProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>(() => loadStoredSettings());
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const lastSfxTimeRef = useRef<Record<string, number>>({});

  // Initialize BGM audio element once
  useEffect(() => {
    const audio = new Audio(PERSONA_AUDIO.bgm.testBed.path);
    audio.loop = true;
    audio.preload = 'auto';
    bgmRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      bgmRef.current = null;
    };
  }, []);

  // Sync BGM volume & mute changes
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = muted || !settings.bgmEnabled ? 0 : settings.bgmVolume;
    }
  }, [settings.bgmVolume, settings.bgmEnabled, muted]);

  // Persist settings changes
  useEffect(() => {
    saveStoredSettings(settings);
    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion-active');
    } else {
      document.body.classList.remove('reduced-motion-active');
    }
    document.documentElement.style.setProperty(
      '--p3r-artwork-intensity',
      String(settings.artworkIntensity)
    );
  }, [settings]);

  const playBgm = useCallback(() => {
    if (!bgmRef.current) return;
    bgmRef.current.play().then(() => {
      setBgmPlaying(true);
    }).catch(() => {
      // Browser autoplay policy prevents immediate playback until user interaction
    });
  }, []);

  const pauseBgm = useCallback(() => {
    if (!bgmRef.current) return;
    bgmRef.current.pause();
    setBgmPlaying(false);
  }, []);

  const toggleBgm = useCallback(() => {
    if (!bgmRef.current) return;
    if (bgmRef.current.paused) {
      playBgm();
    } else {
      pauseBgm();
    }
  }, [playBgm, pauseBgm]);

  const setBgmVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setSettings(prev => ({ ...prev, bgmVolume: clamped }));
  }, []);

  const setSfxVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setSettings(prev => ({ ...prev, sfxVolume: clamped }));
  }, []);

  // Toggle BGM mute independently of UI sound effects
  const toggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  // Toggle UI sound effects independently of BGM
  const toggleSfx = useCallback(() => {
    setSettings(prev => ({ ...prev, sfxEnabled: !prev.sfxEnabled }));
  }, []);

  const setReducedMotion = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, reducedMotion: enabled }));
  }, []);

  const setArtworkIntensity = useCallback((intensity: number) => {
    const clamped = Math.max(0.1, Math.min(1, intensity));
    setSettings(prev => ({ ...prev, artworkIntensity: clamped }));
  }, []);

  const resetAllSettings = useCallback(() => {
    setSettings(DEFAULT_SYSTEM_SETTINGS);
    setMuted(false);
    if (bgmRef.current) {
      bgmRef.current.volume = DEFAULT_SYSTEM_SETTINGS.bgmVolume;
    }
  }, []);

  // Play short UI sound cues with throttle protection against buffer distortion
  const playSfx = useCallback(
    (cue: 'select' | 'hover' | 'confirm' | 'back' | 'transition') => {
      if (!settings.sfxEnabled) return;

      const now = performance.now();
      const lastTime = lastSfxTimeRef.current[cue] || 0;

      // Throttle hover to max 1 per 70ms and select to max 1 per 45ms
      if (cue === 'hover' && now - lastTime < 70) return;
      if (cue === 'select' && now - lastTime < 45) return;
      lastSfxTimeRef.current[cue] = now;

      try {
        const sfxConfig = PERSONA_AUDIO.sfx[cue];
        if (!sfxConfig) return;
        const audio = getSfxAudio(cue, sfxConfig.path);
        audio.currentTime = 0;
        audio.volume = settings.sfxVolume;
        audio.play().catch(() => {});
      } catch {
        // Silently handle audio play restriction
      }
    },
    [settings.sfxEnabled, settings.sfxVolume]
  );

  return (
    <AudioContext.Provider
      value={{
        bgmPlaying,
        bgmVolume: settings.bgmVolume,
        sfxEnabled: settings.sfxEnabled,
        sfxVolume: settings.sfxVolume,
        muted,
        reducedMotion: settings.reducedMotion,
        artworkIntensity: settings.artworkIntensity,
        playBgm,
        pauseBgm,
        toggleBgm,
        setBgmVolume,
        toggleMute,
        toggleSfx,
        setSfxVolume,
        setReducedMotion,
        setArtworkIntensity,
        resetAllSettings,
        playSfx,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
