// Example shape for src/data/audioConfig.js.
// Keep bgm.src null until a direct licence for web playback + synchronisation exists.
export const audioConfig = {
  enabled: false,
  bgm: {
    src: null,
    title: "Background music unavailable",
    artist: null,
    loop: false,
    rightsStatus: "not-cleared",
  },
  sfx: {
    hover: "/assets/audio/sfx/ui-hover.ogg", // original/licensed asset only
    confirm: "/assets/audio/sfx/ui-confirm.ogg", // original/licensed asset only
    back: "/assets/audio/sfx/ui-back.ogg", // original/licensed asset only
  },
};
