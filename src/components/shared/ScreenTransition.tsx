import { motion, AnimatePresence } from 'framer-motion';
import { type FC } from 'react';
import '../../styles/boot.css';

interface ScreenTransitionProps {
  active: boolean;
  onComplete?: () => void;
}

export const ScreenTransition: FC<ScreenTransitionProps> = ({ active, onComplete }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="screen-transition"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <motion.div
            className="transition-slash-bar"
            initial={{ x: '-120%' }}
            animate={{ x: '120%' }}
            transition={{
              duration: 0.65,
              ease: [0.87, 0, 0.13, 1],
            }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

