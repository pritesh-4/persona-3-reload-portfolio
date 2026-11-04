import { createContext } from 'react';

export interface AudioContextType {
  // Audio state
  bgmPlaying: boolean;
  bgmVolume: number;
  sfxEnabled: boolean;
  sfxVolume: number;
  muted: boolean;
  // System display state
  reducedMotion: boolean;
  artworkIntensity: number;
  // Controls
  playBgm: () => void;
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

