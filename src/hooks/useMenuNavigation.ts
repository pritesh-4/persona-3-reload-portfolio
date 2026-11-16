import { useState, useCallback, useEffect } from 'react';
import { MENU_ITEMS } from '../data/menuConfig';

const SESSION_MENU_KEY = 'p3r_active_menu_index';

function getInitialMenuIndex(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const params = new URLSearchParams(window.location.search);
    const paramIdx = params.get('index') || params.get('tab');
    if (paramIdx !== null) {
      const parsed = parseInt(paramIdx, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < MENU_ITEMS.length) {
        return parsed;
      }
      const found = MENU_ITEMS.findIndex(
        (m) =>
          m.id.toLowerCase() === paramIdx.toLowerCase() ||
          m.label.toLowerCase() === paramIdx.toLowerCase()
      );
      if (found !== -1) return found;
    }

    const stored = sessionStorage.getItem(SESSION_MENU_KEY);
    const parsed = stored ? parseInt(stored, 10) : 0;
    return !isNaN(parsed) && parsed >= 0 && parsed < MENU_ITEMS.length ? parsed : 0;
  } catch {
    return 0;
  }
}

function persistMenuIndex(index: number): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_MENU_KEY, String(index));
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export function useMenuNavigation() {
  const [activeIndex, setActiveIndex] = useState(getInitialMenuIndex);

  const navigate = useCallback((direction: 'up' | 'down') => {
    setActiveIndex(prev => {
      const next =
        direction === 'up'
          ? prev <= 0
            ? MENU_ITEMS.length - 1
            : prev - 1
          : prev >= MENU_ITEMS.length - 1
          ? 0
          : prev + 1;
      persistMenuIndex(next);
      return next;
    });
  }, []);

  const selectIndex = useCallback((index: number) => {
    persistMenuIndex(index);
    setActiveIndex(index);
  }, []);

  // Keyboard navigation supporting both vertical (W/S, Up/Down) and horizontal curved arc (A/D, Left/Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is inside an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'w':
        case 'W':
        case 'a':
        case 'A':
          e.preventDefault();
          navigate('up');
          break;
        case 'ArrowDown':
        case 'ArrowRight':
        case 's':
        case 'S':
        case 'd':
        case 'D':
          e.preventDefault();
          navigate('down');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return {
    activeIndex,
    activeItem: MENU_ITEMS[activeIndex],
    navigate,
    selectIndex,
  };
}
