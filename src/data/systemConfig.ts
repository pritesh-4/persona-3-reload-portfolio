export interface SystemSettings {
  bgmEnabled: boolean;
  bgmVolume: number;
  sfxEnabled: boolean;
  sfxVolume: number;
  reducedMotion: boolean;
  artworkIntensity: number;
  keyboardHints: boolean;
}

export const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  bgmEnabled: true,
  bgmVolume: 0.35,
  sfxEnabled: true,
  sfxVolume: 0.4,
  reducedMotion: false,
  artworkIntensity: 0.85,
  keyboardHints: true,
};

const STORAGE_KEY = 'p3r_portfolio_system_settings';

export function loadStoredSettings(): SystemSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SYSTEM_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SYSTEM_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SYSTEM_SETTINGS;
  }
}

export function saveStoredSettings(settings: SystemSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Fail silently
  }
}

export const SYSTEM_INFO = {
  version: '2.0.0-RELOAD',
  engine: 'React 19 + Vite 8 + Framer Motion',
  developer: 'Pritesh Kumar Jena',
  repository: 'https://github.com/pritesh-4',
  legalNotice: 'Persona 3 Reload and related trademarks, artwork, and audio cues are intellectual property of SEGA / ATLUS. This portfolio is an independent non-commercial personal tribute demonstrating frontend engineering capabilities.',
  audioSpecs: '16-bit 44.1kHz Stereo PCM'
};

