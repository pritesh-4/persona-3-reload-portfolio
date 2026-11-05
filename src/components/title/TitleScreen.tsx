import { useEffect, useCallback, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/title.css';

interface TitleScreenProps {
  visible: boolean;
  onEnter: () => void;
}

export const TitleScreen: FC<TitleScreenProps> = ({ visible, onEnter }) => {
  const handleEnter = useCallback(() => {
    onEnter();
  }, [onEnter]);

  useEffect(() => {
    if (!visible) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [visible, handleEnter]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="title-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleEnter}
          role="button"
          tabIndex={0}
          aria-label="Press Enter or Click anywhere to initialize"
        >
          {/* Background image composition */}
          <div className="title-bg">
            <img
              className="title-bg-image"
              src="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
              alt="Persona 3 Reload Presentation Key Art"
              fetchPriority="high"
            />
            <div className="title-bg-overlay" />
            <div className="title-bg-vignette" />
            <div className="title-diagonal-slice" />
          </div>

          {/* Corner metadata */}
          <motion.div
            className="title-corner title-corner--tl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            PERSONAL ARCHIVE<br />
            <b>SYS.VER 3.0.1</b>
          </motion.div>

          <motion.div
            className="title-corner title-corner--tr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            THEME: <b>P3R</b><br />
            PORTFOLIO ACTIVE
          </motion.div>

          <motion.div
            className="title-corner title-corner--br"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            AUDIO: <b>SYNCHRONIZED</b><br />
            REACT 19 / VITE 8
          </motion.div>

          {/* Main title typography & prompt */}
          <div className="title-content">
            <motion.div
              className="title-metadata"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              PERSONNEL DATABASE &bull; S.E.E.S. ARCHIVE
            </motion.div>

            <div className="title-main-text">
              <motion.h1
                className="title-name"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                PRITESH JENA
              </motion.h1>
              <motion.p
                className="title-subtitle"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                FULL-STACK DEVELOPER &bull; AI BUILDER &bull; NIT ROURKELA
              </motion.p>
            </div>

            <motion.div
              className="title-prompt"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="title-prompt-box">
                <span className="title-prompt-text">
                  PRESS ENTER TO INITIALIZE
                </span>
              </div>
              <div className="title-prompt-line" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

