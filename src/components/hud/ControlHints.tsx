import { type FC } from 'react';
import '../../styles/hud.css';

export const ControlHints: FC = () => {
  return (
    <footer className="p3r-control-hints" aria-label="Keyboard Controls">
      <div className="p3r-hint-item">
        <span className="p3r-keycap">
          <span className="p3r-keycap-inner">ENTER</span>
        </span>
        <span className="p3r-hint-text">CONFIRM</span>
      </div>

      <div className="p3r-hint-item">
        <span className="p3r-keycap">
          <span className="p3r-keycap-inner">&uarr; &darr; / W S</span>
        </span>
        <span className="p3r-hint-text">NAVIGATE</span>
      </div>

      <div className="p3r-hint-item">
        <span className="p3r-keycap">
          <span className="p3r-keycap-inner">ESC</span>
        </span>
        <span className="p3r-hint-text">TITLE</span>
      </div>

      <div className="p3r-hint-item">
        <span className="p3r-keycap">
          <span className="p3r-keycap-inner">M</span>
        </span>
        <span className="p3r-hint-text">MUSIC ON/OFF</span>
      </div>
    </footer>
  );
};

