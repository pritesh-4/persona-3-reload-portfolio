import { useState, useEffect, useRef, useMemo, type FC, type TouchEvent } from 'react';
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
  const [dimensions, setDimensions] = useState({ width: 420, height: 700 });
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = Math.round(entry.contentRect.width) || el.clientWidth || 420;
        const height = Math.round(entry.contentRect.height) || el.clientHeight || 700;
        setDimensions({ width, height });
      }
    });

    observer.observe(el);

    const initialWidth = el.clientWidth || 420;
    const initialHeight = el.clientHeight || 700;
    setDimensions({ width: initialWidth, height: initialHeight });

    return () => observer.disconnect();
  }, []);

  const total = items.length;

  // Normalized responsive threshold: viewport >= 900px is desktop full vertical arc; below is partial-arc
  const isDesktop = windowWidth >= 900;

  // Touch gesture handlers for mobile & tablet vertical arc sweeping
  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Trigger on vertical swipe
    if (Math.abs(deltaY) > 28) {
      if (deltaY < 0) {
        // Swipe up -> advance to next item
        const next = (activeIndex + 1) % total;
        onSelectIndex(next);
        onHover();
      } else {
        // Swipe down -> return to previous item
        const prev = (activeIndex - 1 + total) % total;
        onSelectIndex(prev);
        onHover();
      }
    }
  };

  /**
   * Vertical Quadratic Bézier curve math:
   * Control points in 420 x 700 coordinate space:
   * P0 = (110, 40) — Upper-left anchor (PERSONA)
   * P1 = (330, 350) — Right apex control point (gently bows rightward toward center)
   * P2 = (110, 660) — Lower-left anchor (SYSTEM)
   */
  const computeBezierPoint = (t: number) => {
    const clampedT = Math.max(0, Math.min(1, t));
    const inv = 1 - clampedT;

    // Position on curve
    const vx = inv * inv * 110 + 2 * inv * clampedT * 330 + clampedT * clampedT * 110;
    const vy = inv * inv * 40 + 2 * inv * clampedT * 350 + clampedT * clampedT * 660;

    // All plates remain strictly horizontal (angle = 0)
    return { vx, vy, angle: 0 };
  };

  const positions = useMemo(() => {
    const scaleX = dimensions.width / 420;
    const scaleY = dimensions.height / 700;

    return items.map((_, i) => {
      let t: number;
      let opacity: number;
      let scale: number;
      let isVisible = true;

      if (!isDesktop) {
        // Partial-Arc Carousel mode: active item anchored at apex (t = 0.5)
        let offset = (i - activeIndex + total) % total;
        if (offset > total / 2) offset -= total;

        const isNarrow = windowWidth < 600;
        const maxOffset = isNarrow ? 1 : 2;

        if (Math.abs(offset) > maxOffset) {
          isVisible = false;
          opacity = 0;
          scale = 0.5;
          t = offset < 0 ? 0.04 : 0.96;
        } else if (offset === 0) {
          // Active item at the apex
          t = 0.5;
          scale = 1.12;
          opacity = 1;
        } else if (Math.abs(offset) === 1) {
          // Immediate flank plates
          const flankT = 0.22;
          t = offset < 0 ? flankT : 1 - flankT;
          scale = 0.88;
          opacity = 0.85;
        } else {
          // Secondary flank plates
          t = offset < 0 ? 0.08 : 0.92;
          scale = 0.75;
          opacity = 0.5;
        }
      } else {
        // Desktop: full distribution across the vertical curve for all 7 items
        t = total > 1 ? i / (total - 1) : 0.5;
        const isActive = i === activeIndex;
        scale = isActive ? 1.12 : 1;
        opacity = 1;
      }

      const { vx, vy, angle } = computeBezierPoint(t);

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
  }, [items, activeIndex, total, isDesktop, windowWidth, dimensions.width, dimensions.height]);

  // Active marker position on the SVG curve follows the active plate
  const markerVx = positions[activeIndex]?.rawVx ?? 110;
  const markerVy = positions[activeIndex]?.rawVy ?? 40;

  return (
    <nav
      className="p3r-arc-nav-stage"
      ref={containerRef}
      role="navigation"
      aria-label="Main Portfolio Vertical Arc Navigation"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* SVG Arc Guide Track - Signature P3R dashed cyan track with glowing underlay */}
      <svg
        className="p3r-arc-svg-guide"
        viewBox="0 0 420 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="p3r-arc-track-glow"
          d="M 110 40 Q 330 350 110 660"
        />
        <path
          className="p3r-arc-track"
          d="M 110 40 Q 330 350 110 660"
        />
        {/* Travelling red active marker on the curve */}
        <circle
          className="p3r-arc-marker"
          cx={markerVx}
          cy={markerVy}
          r="7"
        />
      </svg>

      {/* Interactive Placed Items Layer */}
      <div className="p3r-arc-items-layer" role="menubar" aria-orientation="vertical">
        {items.map((item, index) => {
          const pos = positions[index];
          return (
            <MenuItem
              key={item.id}
              item={item}
              index={index}
              isActive={index === activeIndex}
              isPartialArc={!isDesktop}
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
