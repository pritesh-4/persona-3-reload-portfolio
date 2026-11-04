import { useEffect, useCallback, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type MenuItemConfig } from '../../data/menuConfig';
import '../../styles/hud.css';

interface SelectionModalProps {
  item: MenuItemConfig | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SelectionModal: FC<SelectionModalProps> = ({ item, isOpen, onClose }) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, handleKey]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="p3r-selection-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="p3r-selection-modal"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="p3r-modal-title"
          >
            <div className="p3r-selection-modal-content">
              <span className="p3r-modal-badge">{item.sublabel}</span>
              <h3 id="p3r-modal-title" className="p3r-modal-title">
                {item.label}
              </h3>
              <p className="p3r-modal-desc">{item.description}</p>
              <div className="p3r-modal-notice">
                <strong>PHASE 1 COMPLETE:</strong> The opening sequence and curved arc menu navigation are fully operational. Full portfolio page sections will be populated in subsequent phases.
              </div>
              <button
                type="button"
                className="p3r-modal-close-btn"
                onClick={onClose}
              >
                RETURN TO MENU [ESC]
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

