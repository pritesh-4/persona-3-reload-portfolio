import { useEffect, useCallback, type FC } from 'react';
import { useAudioContext } from '../../hooks/useAudioContext';

/**
 * Fullscreen inspection overlay for QUEST dossier capture galleries.
 * Keyboard: Escape closes, ArrowLeft/ArrowRight navigate. Backdrop click
 * closes. Images are always the real captures declared in projectsData.
 */

interface CaptureLightboxProps {
  captures: Array<{ src: string; alt: string }>;
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const CaptureLightbox: FC<CaptureLightboxProps> = ({
  captures,
  index,
  onClose,
  onNavigate,
}) => {
  const { playSfx } = useAudioContext();
  const isOpen = index !== null && captures.length > 0;

  const goPrev = useCallback(() => {
    if (index === null) return;
    playSfx('select');
    onNavigate((index - 1 + captures.length) % captures.length);
  }, [index, captures.length, onNavigate, playSfx]);

  const goNext = useCallback(() => {
    if (index === null) return;
    playSfx('select');
    onNavigate((index + 1) % captures.length);
  }, [index, captures.length, onNavigate, playSfx]);

  useEffect(() => {
    if (!isOpen) return;
    // Capture-phase listener: closes the lightbox and swallows the keydown so
    // InternalPageLayout's global Escape handler cannot also fire back-to-menu.
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        playSfx('back');
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [isOpen, onClose, goPrev, goNext, playSfx]);

  if (!isOpen || index === null) return null;

  const capture = captures[index];

  return (
    <div
      className="p3r-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Capture inspection: ${capture.alt}`}
      onClick={() => {
        playSfx('back');
        onClose();
      }}
    >
      <div className="p3r-lightbox-stage" onClick={e => e.stopPropagation()}>
        <div className="p3r-lightbox-head">
          <span className="p3r-lightbox-counter">
            CAPTURE {String(index + 1).padStart(2, '0')} / {String(captures.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="p3r-lightbox-close"
            aria-label="Close capture inspection"
            onClick={() => {
              playSfx('back');
              onClose();
            }}
          >
            ✕ ESC
          </button>
        </div>

        <figure className="p3r-lightbox-figure">
          <img src={capture.src} alt={capture.alt} />
          <figcaption className="p3r-lightbox-caption">{capture.alt}</figcaption>
        </figure>

        {captures.length > 1 && (
          <div className="p3r-lightbox-nav">
            <button
              type="button"
              className="p3r-quest-action-btn"
              aria-label="Previous capture"
              onClick={goPrev}
            >
              <span>◀ PREV</span>
            </button>
            <button
              type="button"
              className="p3r-quest-action-btn"
              aria-label="Next capture"
              onClick={goNext}
            >
              <span>NEXT ▶</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
