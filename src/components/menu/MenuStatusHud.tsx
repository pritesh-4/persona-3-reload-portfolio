import { useState, useEffect, type FC } from 'react';

interface MenuStatusHudProps {
  isDarkHour: boolean;
  onToggleDarkHour: () => void;
}

export const MenuStatusHud: FC<MenuStatusHudProps> = ({
  isDarkHour,
  onToggleDarkHour,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');
  const timeStr = `${hours}:${minutes}:${seconds}`;

  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, '0');
  const day = String(currentTime.getDate()).padStart(2, '0');
  const dateStr = `${year}.${month}.${day}`;

  return (
    <aside
      className={`p3r-menu-status-hud ${isDarkHour ? 'is-dark-hour' : ''}`}
      aria-label="Portfolio Archive Telemetry and Status"
    >
      <div className="p3r-hud-container">
        {/* Left Telemetry Cluster: Status & Records */}
        <div className="p3r-hud-cell p3r-hud-cell--status">
          <span className="p3r-hud-indicator-dot" aria-hidden="true" />
          <span className="p3r-hud-status-label">
            {isDarkHour ? 'DARK HOUR // ACTIVE' : 'S.E.E.S. ARCHIVE // ONLINE'}
          </span>
        </div>

        <div className="p3r-hud-divider" aria-hidden="true" />

        <div className="p3r-hud-cell p3r-hud-cell--records">
          <span className="p3r-hud-records-count">07</span>
          <span className="p3r-hud-records-label">SECTIONS</span>
        </div>

        <div className="p3r-hud-divider" aria-hidden="true" />

        {/* Real-time Clock & Date Cluster */}
        <div className="p3r-hud-cell p3r-hud-cell--clock">
          <time className="p3r-hud-time" dateTime={currentTime.toISOString()}>
            {isDarkHour ? '12:00:00' : timeStr}
          </time>
          <span className="p3r-hud-date">{dateStr}</span>
        </div>

        <div className="p3r-hud-divider" aria-hidden="true" />

        {/* Interactive Crescent Moon Insignia (Easter Egg Trigger) */}
        <button
          type="button"
          className={`p3r-hud-moon-btn ${isDarkHour ? 'is-active' : ''}`}
          onClick={onToggleDarkHour}
          aria-label={
            isDarkHour
              ? 'Dark Hour active. Click to restore normal midnight time'
              : 'Dark Hour Protocol. Click to access hidden Tartarus atmosphere'
          }
          title={
            isDarkHour
              ? 'Dark Hour Active: Click to return to normal time'
              : 'Dark Hour Protocol: Click to trigger secret atmosphere'
          }
        >
          <svg
            className="p3r-hud-moon-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span className="p3r-hud-moon-label">
            {isDarkHour ? '25TH HR' : 'MOON'}
          </span>
        </button>
      </div>
    </aside>
  );
};
