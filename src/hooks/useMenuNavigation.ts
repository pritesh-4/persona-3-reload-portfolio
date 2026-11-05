import { useState, useCallback, useEffect } from 'react';
import { MENU_ITEMS } from '../data/menuConfig';

let lastMenuIndex = 0;

export function useMenuNavigation() {
  const [activeIndex, setActiveIndex] = useState(lastMenuIndex);

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
      lastMenuIndex = next;
      return next;
    });
  }, []);

  const selectIndex = useCallback((index: number) => {
    lastMenuIndex = index;
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
