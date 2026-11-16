/**
 * Persona 3 Reload Portfolio Asset Configuration & Service
 * 
 * Centralised asset registry referencing local media in /assets/persona3/
 * All assets comply with project IP guidelines (official characters kept reference-only;
 * procedural audio approved for website testing; licensing tracked in manifests).
 */

export interface PersonaCharacter {
  id: string;
  name: string;
  role: string;
  arcana: string;
  path: string;
  width: number;
  height: number;
  objectPosition: string;
  rightsStatus: string;
  source: string;
}

export interface PersonaBackground {
  id: string;
  name: string;
  path: string;
  width: number;
  height: number;
  role: string;
  rightsStatus: string;
}

export interface PersonaAudioCue {
  id: string;
  name: string;
  path: string;
  durationSeconds: number;
  rightsStatus: string;
}

export const PERSONA_CHARACTERS: Record<string, PersonaCharacter> = {
  makoto: {
    id: 'makoto',
    name: 'Makoto Yuki',
    role: 'Protagonist / S.E.E.S. Leader',
    arcana: 'Fool / Death',
    path: '/assets/persona3/characters/makoto-yuki.webp',
    width: 570,
    height: 760,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  yukari: {
    id: 'yukari',
    name: 'Yukari Takeba',
    role: 'S.E.E.S. Member / Archer',
    arcana: 'Lovers',
    path: '/assets/persona3/characters/yukari-takeba.webp',
    width: 570,
    height: 760,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  junpei: {
    id: 'junpei',
    name: 'Junpei Iori',
    role: 'S.E.E.S. Member / Two-Handed Sword',
    arcana: 'Magician',
    path: '/assets/persona3/characters/junpei-iori.webp',
    width: 630,
    height: 840,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  akihiko: {
    id: 'akihiko',
    name: 'Akihiko Sanada',
    role: 'S.E.E.S. Senior / Boxer',
    arcana: 'Emperor',
    path: '/assets/persona3/characters/akihiko-sanada.webp',
    width: 630,
    height: 840,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  mitsuru: {
    id: 'mitsuru',
    name: 'Mitsuru Kirijo',
    role: 'S.E.E.S. Founder / Fencer',
    arcana: 'Empress',
    path: '/assets/persona3/characters/mitsuru-kirijo.webp',
    width: 630,
    height: 840,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  fuuka: {
    id: 'fuuka',
    name: 'Fuuka Yamagishi',
    role: 'S.E.E.S. Navigator / Support',
    arcana: 'Priestess',
    path: '/assets/persona3/characters/fuuka-yamagishi.webp',
    width: 630,
    height: 840,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  koromaru: {
    id: 'koromaru',
    name: 'Koromaru',
    role: 'S.E.E.S. Canine Member / Dagger',
    arcana: 'Strength',
    path: '/assets/persona3/characters/koromaru.webp',
    width: 630,
    height: 840,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  aigis: {
    id: 'aigis',
    name: 'Aigis',
    role: 'Anti-Shadow Weapon',
    arcana: 'Chariot / Aeon',
    path: '/assets/persona3/characters/aigis.webp',
    width: 630,
    height: 840,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  shinjiro: {
    id: 'shinjiro',
    name: 'Shinjiro Aragaki',
    role: 'Former S.E.E.S. Member / Heavy Axe',
    arcana: 'Hierophant',
    path: '/assets/persona3/characters/shinjiro-aragaki.webp',
    width: 630,
    height: 840,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  }
};

export const PERSONA_BACKGROUNDS: Record<string, PersonaBackground> = {
  keyArt: {
    id: 'keyArt',
    name: 'Persona 3 Reload Promotional Key Art',
    path: '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
    width: 1920,
    height: 1080,
    role: 'Home Hero Anchor Composition',
    rightsStatus: 'permission-required'
  },
  mainVisual: {
    id: 'mainVisual',
    name: 'Persona 3 Reload Main Visual Wallpaper',
    path: '/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png',
    width: 1920,
    height: 1080,
    role: 'Desktop Wallpaper Composition',
    rightsStatus: 'permission-required'
  },
  promoGroup: {
    id: 'promoGroup',
    name: 'Persona 3 Reload Cast Group Promo Art',
    path: '/assets/persona3/backgrounds/promotional-art/persona3-reload-promo-group.jpg',
    width: 1280,
    height: 720,
    role: 'Cast Overview Backdrop',
    rightsStatus: 'reference-only'
  }
};

export interface PersonaBgmTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  path: string;
  fallbackPath: string;
  durationSeconds: number;
  loop: boolean;
  rightsStatus: string;
  note: string;
}

export const PERSONA_AUDIO = {
  bgm: {
    primary: {
      id: 'colour-your-night',
      name: 'Colour Your Night',
      artist: 'Atlus Sound Team (feat. Azumi Takahashi & Lotus Juice)',
      album: 'Persona 3 Reload Original Soundtrack',
      path: '/assets/persona3/audio/bgm/colour-your-night.mp3',
      fallbackPath: '/assets/persona3/audio/bgm/bgm-ambient-test.wav',
      durationSeconds: 228,
      loop: true,
      rightsStatus: 'local-asset-required',
      note: 'Primary startup soundtrack. Requires locally hosted authorized MP3 at public/assets/persona3/audio/bgm/colour-your-night.mp3'
    } as PersonaBgmTrack
  },
  sfx: {
    select: {
      name: 'UI Select',
      path: '/assets/persona3/audio/ui/ui-select.wav',
      durationSeconds: 0.11,
      rightsStatus: 'approved-for-website-use'
    },
    hover: {
      name: 'UI Hover',
      path: '/assets/persona3/audio/ui/ui-hover.wav',
      durationSeconds: 0.11,
      rightsStatus: 'approved-for-website-use'
    },
    confirm: {
      name: 'UI Confirm',
      path: '/assets/persona3/audio/ui/ui-confirm.wav',
      durationSeconds: 0.30,
      rightsStatus: 'approved-for-website-use'
    },
    back: {
      name: 'UI Back',
      path: '/assets/persona3/audio/ui/ui-back.wav',
      durationSeconds: 0.19,
      rightsStatus: 'approved-for-website-use'
    },
    transition: {
      name: 'UI Transition Sweep',
      path: '/assets/persona3/audio/ui/ui-transition.wav',
      durationSeconds: 0.48,
      rightsStatus: 'approved-for-website-use'
    }
  }
};


