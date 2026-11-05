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
import { AudioContext, type AudioTrackInfo } from './AudioContextValue';

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
  const [trackInfo, setTrackInfo] = useState<AudioTrackInfo>({
    id: PERSONA_AUDIO.bgm.primary.id,
    name: PERSONA_AUDIO.bgm.primary.name,
    artist: PERSONA_AUDIO.bgm.primary.artist,
    album: PERSONA_AUDIO.bgm.primary.album,
    path: PERSONA_AUDIO.bgm.primary.path,
    fallbackPath: PERSONA_AUDIO.bgm.primary.fallbackPath,
    isFallback: false,
    isMissing: false,
  });

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);
  const lastSfxTimeRef = useRef<Record<string, number>>({});

  // Initialize single persistent BGM audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata'; // Use preload="metadata" to avoid unnecessary buffering
    audio.loop = true;
    audio.src = PERSONA_AUDIO.bgm.primary.path;
    bgmRef.current = audio;

    const handlePlay = () => setBgmPlaying(true);
    const handlePause = () => setBgmPlaying(false);

    const handleLoadedMetadata = () => {
      if (audio.src.includes('colour-your-night.mp3')) {
        setTrackInfo(prev => ({
          ...prev,
          isMissing: false,
          isFallback: false,
          errorMessage: undefined,
        }));
      }
    };

    const handleError = () => {
      // If primary track (colour-your-night.mp3) is not present locally,
      // gracefully failover to the procedural ambient test bed without crashing
      if (audio.src.includes('colour-your-night.mp3')) {
        console.info(
          '[AudioProvider] Primary track "Colour Your Night" not found on local path. Engaging verified procedural ambient fallback.'
        );
        setTrackInfo(prev => ({
          ...prev,
          isMissing: true,
          isFallback: true,
          errorMessage:
            'Local file public/assets/persona3/audio/bgm/colour-your-night.mp3 required; using ambient test bed.',
        }));
        audio.src = PERSONA_AUDIO.bgm.primary.fallbackPath;
        audio.load();
        if (wasPlayingRef.current) {
          audio.play().catch(() => {});
        }
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
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

  // Direct user-gesture initiated playback
  const playBgm = useCallback(async (): Promise<boolean> => {
    if (!bgmRef.current || !settings.bgmEnabled) return false;
    wasPlayingRef.current = true;
    try {
      await bgmRef.current.play();
      setBgmPlaying(true);
      return true;
    } catch (err) {
      console.warn('[AudioProvider] Playback suspended by browser autoplay policy pending interaction', err);
      return false;
    }
  }, [settings.bgmEnabled]);

  const pauseBgm = useCallback(() => {
    if (!bgmRef.current) return;
    wasPlayingRef.current = false;
    bgmRef.current.pause();
    setBgmPlaying(false);
  }, []);

  // Canonical BGM ON/OFF toggle: updates persistent setting and pauses/plays immediately
  const toggleBgm = useCallback(() => {
    setSettings(prev => {
      const nextEnabled = !prev.bgmEnabled;
      if (!nextEnabled) {
        if (bgmRef.current) {
          bgmRef.current.pause();
          setBgmPlaying(false);
        }
      } else {
        if (bgmRef.current) {
          bgmRef.current.volume = prev.bgmVolume;
          bgmRef.current.play().then(() => setBgmPlaying(true)).catch((err) => {
            console.warn('[AudioProvider] Playback suspended by browser autoplay policy pending interaction', err);
          });
        }
      }
      return { ...prev, bgmEnabled: nextEnabled };
    });
  }, []);

  const setBgmVolume = useCallback(
    (vol: number) => {
      const clamped = Math.max(0, Math.min(1, vol));
      setSettings(prev => ({ ...prev, bgmVolume: clamped }));
      if (bgmRef.current && settings.bgmEnabled) {
        bgmRef.current.volume = clamped;
      }
    },
    [settings.bgmEnabled]
  );

  const setSfxVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setSettings(prev => ({ ...prev, sfxVolume: clamped }));
  }, []);

  // Keyboard 'M' / Master mute controls the canonical BGM setting
  const toggleMute = useCallback(() => {
    toggleBgm();
  }, [toggleBgm]);

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
        bgmEnabled: settings.bgmEnabled,
        bgmPlaying,
        bgmVolume: settings.bgmVolume,
        sfxEnabled: settings.sfxEnabled,
        sfxVolume: settings.sfxVolume,
        muted: !settings.bgmEnabled,
        trackInfo,
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
