import { type FC } from 'react';
import { type MenuItemConfig } from '../../data/menuConfig';
import '../../styles/menu.css';

interface MenuItemProps {
  item: MenuItemConfig;
  index: number;
  isActive: boolean;
  position: {
    x: number;
    y: number;
    angle: number;
    opacity?: number;
    scale?: number;
    isVisible?: boolean;
  };
  isPartialArc?: boolean;
  onSelect: () => void;
  onConfirm: () => void;
  onHover: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
  item,
  index,
  isActive,
  position,
  isPartialArc = false,
  onSelect,
  onConfirm,
  onHover,
}) => {
  const indexStr = String(index + 1).padStart(2, '0');
  const opacity = position.opacity !== undefined ? position.opacity : 1;
  const scale = position.scale !== undefined ? position.scale : 1;
  const isVisible = position.isVisible !== undefined ? position.isVisible : true;

  return (
    <button
      type="button"
      className={`p3r-menu-item-btn ${isActive ? 'active' : ''} ${!isVisible ? 'is-hidden-slot' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${position.angle}deg) scale(${scale})`,
        opacity,
        pointerEvents: !isVisible || opacity < 0.2 ? 'none' : 'auto',
        visibility: opacity === 0 ? 'hidden' : 'visible',
      }}
      tabIndex={!isVisible ? -1 : 0}
      aria-hidden={!isVisible ? 'true' : undefined}
      onClick={() => {
        if (isPartialArc) {
          if (isActive) {
            onConfirm();
          } else {
            onSelect();
          }
        } else {
          onSelect();
          onConfirm();
        }
      }}
      onMouseEnter={() => {
        if (isVisible) {
          onHover();
          onSelect();
        }
      }}
      role="menuitem"
      aria-label={`${item.label} - ${item.sublabel}`}
      aria-current={isActive ? 'true' : undefined}
    >
      <div className="p3r-menu-plate">
        <div className="p3r-menu-plate-content">
          <span className="p3r-item-icon">{item.icon}</span>
          <span className="p3r-item-label">{item.label}</span>
          <span className="p3r-item-index">{indexStr}</span>
        </div>
      </div>
    </button>
  );
};
