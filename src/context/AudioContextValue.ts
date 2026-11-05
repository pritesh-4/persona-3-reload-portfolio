import { createContext } from 'react';

export interface AudioTrackInfo {
  id: string;
  name: string;
  artist: string;
  album: string;
  path: string;
  fallbackPath: string;
  isFallback: boolean;
  isMissing: boolean;
  errorMessage?: string;
}

export interface AudioContextType {
  // Audio state
  bgmEnabled: boolean;
  bgmPlaying: boolean;
  bgmVolume: number;
  sfxEnabled: boolean;
  sfxVolume: number;
  muted: boolean;
  trackInfo: AudioTrackInfo;

  // System display state
  reducedMotion: boolean;
  artworkIntensity: number;

  // Controls
  playBgm: () => Promise<boolean>;
  pauseBgm: () => void;
  toggleBgm: () => void;
  setBgmVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleSfx: () => void;
  setSfxVolume: (vol: number) => void;
  setReducedMotion: (enabled: boolean) => void;
  setArtworkIntensity: (intensity: number) => void;
  resetAllSettings: () => void;
  playSfx: (cue: 'select' | 'hover' | 'confirm' | 'back' | 'transition') => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);
