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
  const [dimensions, setDimensions] = useState({ width: 1000, height: 240 });
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
        const width = Math.round(entry.contentRect.width) || el.clientWidth || window.innerWidth || 1000;
        const height = Math.round(entry.contentRect.height) || el.clientHeight || 240;
        setDimensions({ width, height });
      }
    });

    observer.observe(el);

    // Initial measurement
    const initialWidth = el.clientWidth || window.innerWidth || 1000;
    const initialHeight = el.clientHeight || 240;
    setDimensions({ width: initialWidth, height: initialHeight });

    return () => observer.disconnect();
  }, []);

  const total = items.length;

  // Normalized responsive threshold: viewport >= 1024px is desktop full-arc; below is partial-arc
  const isDesktop = windowWidth >= 1024;

  // Touch gesture handlers for mobile & tablet arc sweeping
  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - (touchStartYRef.current ?? touchEndY);
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Trigger only if horizontal swipe dominates and exceeds threshold
    if (Math.abs(deltaX) > 28 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swipe left -> advance to next item
        const next = (activeIndex + 1) % total;
        onSelectIndex(next);
        onHover();
      } else {
        // Swipe right -> return to previous item
        const prev = (activeIndex - 1 + total) % total;
        onSelectIndex(prev);
        onHover();
      }
    }
  };

  /**
   * Quadratic Bézier curve math:
   * Control points in 1000 x 240 coordinate space:
   * P0 = (65, 190) — Left anchor
   * P1 = (500, 28) — Apex control point
   * P2 = (935, 190) — Right anchor
   */
  const computeBezierPoint = (t: number) => {
    const clampedT = Math.max(0, Math.min(1, t));
    const inv = 1 - clampedT;

    // Position on curve
    const vx = inv * inv * 65 + 2 * inv * clampedT * 500 + clampedT * clampedT * 935;
    const vy = inv * inv * 190 + 2 * inv * clampedT * 28 + clampedT * clampedT * 190;

    // Tangent derivative for subtle authentic game tilt
    const dx = 870;
    const dy = 324 * (2 * clampedT - 1);
    const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const angle = Math.max(-8, Math.min(8, rawAngle * 0.42));

    return { vx, vy, angle };
  };

  const positions = useMemo(() => {
    const scaleX = dimensions.width / 1000;
    const scaleY = dimensions.height / 240;

    return items.map((_, i) => {
      let t: number;
      let opacity: number;
      let scale: number;
      let isVisible = true;

      if (!isDesktop) {
        // Partial-Arc Carousel mode: active item anchored at apex (t = 0.5)
        let offset = (i - activeIndex + total) % total;
        if (offset > total / 2) offset -= total;

        // Viewports < 900px (including 687x950 and phones): exactly 3 clear plates
        const isNarrow = windowWidth < 900;
        const maxOffset = isNarrow ? 1 : 2;

        if (Math.abs(offset) > maxOffset) {
          isVisible = false;
          opacity = 0;
          scale = 0.5;
          t = offset < 0 ? 0.04 : 0.96;
        } else if (offset === 0) {
          // Active item at the apex
          t = 0.5;
          scale = windowWidth < 420 ? 1.08 : 1.12;
          opacity = 1;
        } else if (Math.abs(offset) === 1) {
          // Immediate left / right flank plates
          // On small phones (< 420px), pull outward (t=0.12) to ensure clean separation
          const flankT = windowWidth < 420 ? 0.12 : 0.16;
          t = offset < 0 ? flankT : 1 - flankT;
          scale = windowWidth < 420 ? 0.82 : 0.86;
          opacity = 0.8;
        } else {
          // For wider tablets (>= 900px): secondary flank plates
          t = offset < 0 ? 0.06 : 0.94;
          scale = 0.72;
          opacity = 0.45;
        }
      } else {
        // Desktop: full distribution across the arc for all 7 items
        t = total > 1 ? i / (total - 1) : 0.5;
        const isActive = i === activeIndex;
        scale = isActive ? (windowWidth < 1280 ? 1.08 : 1.12) : 1;
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

  // Active marker position on the SVG curve follows the active plate's position along the path
  const markerVx = positions[activeIndex]?.rawVx ?? 500;
  const markerVy = positions[activeIndex]?.rawVy ?? 109;

  return (
    <nav
      className="p3r-arc-nav-stage"
      ref={containerRef}
      role="navigation"
      aria-label="Main Portfolio Arc Navigation"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* SVG Arc Guide Track - Signature P3R dashed cyan track with glowing underlay */}
      <svg
        className="p3r-arc-svg-guide"
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="p3r-arc-track-glow"
          d="M 65 190 Q 500 28 935 190"
        />
        <path
          className="p3r-arc-track"
          d="M 65 190 Q 500 28 935 190"
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
      <div className="p3r-arc-items-layer" role="menubar">
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
