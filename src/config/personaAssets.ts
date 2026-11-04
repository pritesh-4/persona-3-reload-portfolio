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
  thumbnailPath: string;
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/makoto-yuki-thumb.webp',
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/yukari-takeba-thumb.webp',
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/junpei-iori-thumb.webp',
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/akihiko-sanada-thumb.webp',
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/mitsuru-kirijo-thumb.webp',
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/fuuka-yamagishi-thumb.webp',
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/koromaru-thumb.webp',
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/aigis-thumb.webp',
    width: 630,
    height: 840,
    objectPosition: 'center top',
    rightsStatus: 'reference-only',
    source: 'https://asia.sega.com/p3r/en/'
  },
  ken: {
    id: 'ken',
    name: 'Ken Amada',
    role: 'S.E.E.S. Member / Spear',
    arcana: 'Justice',
    path: '/assets/persona3/characters/ken-amada.webp',
    thumbnailPath: '/assets/persona3/characters/thumbnails/ken-amada-thumb.webp',
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
    thumbnailPath: '/assets/persona3/characters/thumbnails/shinjiro-aragaki-thumb.webp',
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
  },
  titleScreen: {
    id: 'titleScreen',
    name: 'Title Screen Moonlit Window Composition',
    path: '/assets/persona3/backgrounds/title/title-screen-composition.jpg',
    width: 1280,
    height: 720,
    role: 'Title UI Layout Reference',
    rightsStatus: 'reference-only'
  },
  menuHierarchy: {
    id: 'menuHierarchy',
    name: 'Title Menu Hierarchy Reference',
    path: '/assets/persona3/backgrounds/menu-references/title-menu-hierarchy.jpeg',
    width: 2000,
    height: 1125,
    role: 'Typographic Layout Reference',
    rightsStatus: 'reference-only'
  }
};

export const PERSONA_AUDIO = {
  bgm: {
    testBed: {
      name: 'Ambient Bed Test Loop (Original Synthesized)',
      path: '/assets/persona3/audio/bgm/bgm-ambient-test.wav',
      durationSeconds: 24.0,
      loop: true,
      rightsStatus: 'approved-for-website-use'
    }
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

export const PERSONA_REFERENCES = {
  curvedMenu: {
    name: 'Curved Arc Menu Navigation Blueprint',
    path: '/assets/persona3/references/curved-menu-reference.png',
    width: 1095,
    height: 862,
    rightsStatus: 'user-provided'
  }
};

// Global audio playback cache / pool
const audioPool: Record<string, HTMLAudioElement> = {};

export function playUiSound(cue: 'select' | 'hover' | 'confirm' | 'back' | 'transition', volume = 0.4): void {
  try {
    const sfx = PERSONA_AUDIO.sfx[cue];
    if (!sfx) return;

    let sound = audioPool[cue];
    if (!sound) {
      sound = new Audio(sfx.path);
      audioPool[cue] = sound;
    }
    sound.currentTime = 0;
    sound.volume = volume;
    sound.play().catch(() => {
      // Audio playback might be restricted prior to initial user interaction
    });
  } catch {
    // Fail gracefully
  }
}

