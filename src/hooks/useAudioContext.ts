import { useContext } from 'react';
import { AudioContext, type AudioContextType } from '../context/AudioContextValue';

export function useAudioContext(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
}

