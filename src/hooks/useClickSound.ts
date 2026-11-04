import { useCallback } from 'react';
import { playUiSound } from '../config/personaAssets';

/**
 * useClickSound
 * React hook delivering snappy, reliable sound cue playback
 * using synthesized project sound effects.
 */
export function useClickSound() {
  const playSelect = useCallback(() => {
    playUiSound('select', 0.4);
  }, []);

  const playHover = useCallback(() => {
    playUiSound('hover', 0.25);
  }, []);

  const playConfirm = useCallback(() => {
    playUiSound('confirm', 0.45);
  }, []);

  const playBack = useCallback(() => {
    playUiSound('back', 0.4);
  }, []);

  const playTransition = useCallback(() => {
    playUiSound('transition', 0.35);
  }, []);

  return {
    playSelect,
    playHover,
    playConfirm,
    playBack,
    playTransition,
  };
}

