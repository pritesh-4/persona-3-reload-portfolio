import { useState, useEffect, useRef, type FC, type TouchEvent } from 'react';
import { type MenuItemConfig } from '../../data/menuConfig';
import { MenuItem } from './MenuItem';
import '../../styles/menu.css';

interface ArcNavigationProps {
  items: MenuItemConfig[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onConfirm: () => void;
  onHover: () => void;
}

export const ArcNavigation: FC<ArcNavigationProps> = ({
  items,
  activeIndex,
  onSelectIndex,
  onConfirm,
  onHover,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 240 });
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const width = clientWidth || window.innerWidth || 1000;
        const height = clientHeight || 240;
        setDimensions({ width, height });
        setIsMobile(width < 768);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const total = items.length;

  // Touch gesture handlers for mobile arc sweeping
  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (deltaX < -35) {
      // Swipe left -> next item
      const next = (activeIndex + 1) % total;
      onSelectIndex(next);
      onHover();
    } else if (deltaX > 35) {
      // Swipe right -> previous item
      const prev = (activeIndex - 1 + total) % total;
      onSelectIndex(prev);
      onHover();
    }
  };

  // Compute quadratic Bézier curve coordinates: P0=(65, 188), P1=(500, 30), P2=(935, 188) in 1000x240
  const positions = items.map((_, i) => {
    let t: number;
    let opacity = 1;
    let scale = 1;
    let isVisible = true;

    if (isMobile) {
      // Mobile adaptive focused arc: activeItem at apex (t = 0.5)
      let offset = (i - activeIndex + total) % total;
      if (offset > total / 2) offset -= total;

      // Allow 5 visible slots: -2, -1, 0, 1, 2
      if (Math.abs(offset) > 2) {
        isVisible = false;
        opacity = 0;
        t = offset < 0 ? 0.04 : 0.96;
        scale = 0.6;
      } else {
        // Map offset [-2, 2] to curve parameter [0.08, 0.92]
        t = 0.5 + offset * 0.21;
        t = Math.max(0.06, Math.min(0.94, t));

        if (offset === 0) {
          scale = 1.14;
          opacity = 1;
        } else if (Math.abs(offset) === 1) {
          scale = 0.9;
          opacity = 0.85;
        } else {
          scale = 0.74;
          opacity = 0.45;
        }
      }
    } else {
      // Desktop full distribution across the arc
      t = total > 1 ? i / (total - 1) : 0.5;
    }

    const inv = 1 - t;

    // Coordinate in viewBox (1000 x 240)
    const vx = inv * inv * 65 + 2 * inv * t * 500 + t * t * 935;
    const vy = inv * inv * 188 + 2 * inv * t * 30 + t * t * 188;

    // Tangent derivative for tilt
    const dx = 870;
    const dy = 316 * (2 * t - 1);
    const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const angle = Math.max(-8, Math.min(8, rawAngle * 0.4));

    const scaleX = dimensions.width / 1000;
    const scaleY = dimensions.height / 240;

    return {
      x: vx * scaleX,
      y: vy * scaleY,
      angle,
      rawVx: vx,
      rawVy: vy,
      opacity,
      scale,
      isVisible,
    };
  });

  const activePos = positions[activeIndex] || positions[0];

  return (
    <nav
      className="p3r-arc-nav-stage"
      ref={containerRef}
      role="navigation"
      aria-label="Main Portfolio Arc Navigation"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* SVG Arc Guide Track - Remains visible on all viewports */}
      <svg
        className="p3r-arc-svg-guide"
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="p3r-arc-track-glow"
          d="M 65 188 Q 500 30 935 188"
        />
        <path
          className="p3r-arc-track"
          d="M 65 188 Q 500 30 935 188"
        />
        {/* Travelling active marker on curve */}
        <circle
          className="p3r-arc-marker"
          cx={activePos.rawVx}
          cy={activePos.rawVy}
          r="7"
        />
      </svg>

      {/* Interactive Placed Items Layer */}
      <div className="p3r-arc-items-layer" role="menubar">
        {items.map((item, index) => {
          const pos = positions[index];
          return (
            <MenuItem
              key={item.id}
              item={item}
              index={index}
              isActive={index === activeIndex}
              position={{
                x: pos.x,
                y: pos.y,
                angle: pos.angle,
                opacity: pos.opacity,
                scale: pos.scale,
                isVisible: pos.isVisible,
              }}
              onSelect={() => onSelectIndex(index)}
              onConfirm={onConfirm}
              onHover={onHover}
            />
          );
        })}
      </div>
    </nav>
  );
};
