import { type FC } from 'react';
import { type MenuItemConfig } from '../../data/menuConfig';
import { MENU_SECTION_ART_CONFIG, DARK_HOUR_THEME_OVERRIDE } from '../../config/menuArtConfig';

interface MenuSectionIndicatorProps {
  item: MenuItemConfig;
  index: number;
  total: number;
  isDarkHour?: boolean;
}

export const MenuSectionIndicator: FC<MenuSectionIndicatorProps> = ({
  item,
  index,
  total,
  isDarkHour = false,
}) => {
  const artConfig = MENU_SECTION_ART_CONFIG[item.id] || MENU_SECTION_ART_CONFIG.persona;
  const currentAccent = isDarkHour ? DARK_HOUR_THEME_OVERRIDE.accentColor : artConfig.accentColor;
  const indexStr = String(index + 1).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');

  return (
    <div
      key={item.id}
      className={`p3r-section-indicator ${isDarkHour ? 'is-dark-hour' : ''}`}
      aria-live="polite"
      aria-label={`Selected section: ${item.label}`}
      style={{
        '--indicator-accent': currentAccent,
      } as React.CSSProperties}
    >
      {/* Index Counter & Archive Tag */}
      <div className="p3r-indicator-meta">
        <span className="p3r-indicator-index">{indexStr}</span>
        <span className="p3r-indicator-slash">/</span>
        <span className="p3r-indicator-total">{totalStr}</span>
        <span className="p3r-indicator-divider">//</span>
        <span className="p3r-indicator-tag">
          {isDarkHour ? 'DARK HOUR PHENOMENON' : 'ARCHIVE ENTRY'}
        </span>
      </div>

      {/* Main Section Title */}
      <h2 className="p3r-indicator-title">
        {item.label}
      </h2>

      {/* Thin Accent Rule */}
      <div className="p3r-indicator-rule" aria-hidden="true" />

      {/* Sublabel / Category */}
      <div className="p3r-indicator-sublabel">
        {item.sublabel}
      </div>
    </div>
  );
};
