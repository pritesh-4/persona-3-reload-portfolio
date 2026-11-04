import { type FC } from 'react';
import { type MenuItemConfig } from '../../data/menuConfig';
import '../../styles/hud.css';

interface ContextPanelProps {
  item: MenuItemConfig;
}

export const ContextPanel: FC<ContextPanelProps> = ({ item }) => {
  return (
    <section className="p3r-context-panel" aria-live="polite">
      <div className="p3r-context-content">
        <div className="p3r-context-tag">COMMAND SELECTION</div>
        <h2 className="p3r-context-title">{item.label}</h2>
        <div className="p3r-context-sublabel">{item.sublabel}</div>
        <p className="p3r-context-desc">{item.description}</p>
      </div>
    </section>
  );
};

