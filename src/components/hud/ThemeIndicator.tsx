import { type FC } from 'react';
import '../../styles/hud.css';

export const ThemeIndicator: FC = () => {
  return (
    <div className="p3r-theme-indicator" aria-label="Active Interface Theme">
      <span>SYSTEM</span>
      <span className="p3r-theme-badge">THEME: P3R</span>
    </div>
  );
};

