import { useState, useCallback, useEffect } from 'react';
import { MENU_ITEMS } from '../data/menuConfig';

export function useMenuNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  const confirm = useCallback(() => {
    setIsConfirmed(true);
    // Reset after animation
    setTimeout(() => setIsConfirmed(false), 800);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          navigate('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          navigate('down');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          confirm();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, confirm]);

  return {
    activeIndex,
    activeItem: MENU_ITEMS[activeIndex],
    isConfirmed,
    navigate,
    selectIndex,
    confirm,
    totalItems: MENU_ITEMS.length,
  };
}
