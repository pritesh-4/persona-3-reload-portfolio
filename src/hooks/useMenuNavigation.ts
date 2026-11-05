import { useState, useCallback, useEffect } from 'react';
import { MENU_ITEMS } from '../data/menuConfig';

export function useMenuNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useCallback((direction: 'up' | 'down') => {
    setActiveIndex(prev => {
      if (direction === 'up') {
        return prev <= 0 ? MENU_ITEMS.length - 1 : prev - 1;
      }
      return prev >= MENU_ITEMS.length - 1 ? 0 : prev + 1;
    });
  }, []);

  const selectIndex = useCallback((index: number) => {
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
