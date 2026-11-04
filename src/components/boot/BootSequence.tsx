import { useState, useEffect, useCallback, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/boot.css';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  'INITIALIZING SYSTEM',
  'LOADING PERSONNEL DATABASE',
  'ESTABLISHING CONNECTION',
  'LOADING PERSONNEL RECORD',
  'SYSTEM READY',
];

export const BootSequence: FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');

  // Preload critical assets
  useEffect(() => {
    const imagesToPreload = [
      '/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png',
      '/assets/persona3/characters/makoto-yuki.webp',
      '/assets/persona3/characters/thumbnails/makoto-yuki-thumb.webp',
    ];

    let loaded = 0;
    const total = imagesToPreload.length;

    const onLoad = () => {
      loaded++;
      const assetProgress = (loaded / total) * 60;
      setProgress(prev => Math.max(prev, assetProgress));
    };

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = src;
    });

    const stages = [
      { delay: 350, progress: 70, message: 1 },
      { delay: 700, progress: 85, message: 2 },
      { delay: 1100, progress: 95, message: 3 },
      { delay: 1500, progress: 100, message: 4 },
    ];

    const timers = stages.map(stage =>
      setTimeout(() => {
        setProgress(prev => Math.max(prev, stage.progress));
        setMessageIndex(stage.message);
      }, stage.delay)
    );

    const completeTimer = setTimeout(() => {
      setPhase('reveal');
      setTimeout(() => setPhase('done'), 500);
    }, 2000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      onComplete();
    }
  }, [phase, onComplete]);

  const handleSkip = useCallback(() => {
    setPhase('done');
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleSkip]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label="System Initializing"
        >
          <div className="boot-scanlines" />

          <motion.div
            className="boot-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="boot-system-label">
              PERSONNEL DATABASE
            </span>

            <div className="boot-title-group">
              <p className="boot-pre-title">
                DEVELOPER ARCHIVE &bull; SYSTEM LINK
              </p>
              <h1 className="boot-title">
                PERSONA 3 RELOAD
              </h1>
            </div>

            <div className="boot-progress-container">
              <div
                className="boot-progress-bar"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="boot-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="boot-status-text">
                {BOOT_MESSAGES[messageIndex]}
              </span>
            </div>
          </motion.div>

          <button
            type="button"
            className="boot-skip"
            onClick={handleSkip}
            aria-label="Skip initialization"
          >
            PRESS [SPACE / ESC] TO SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

