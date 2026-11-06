import { useState, useCallback, useMemo, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  INVENTORY_ITEMS,
  INVENTORY_CATEGORIES,
  type InventoryItem,
} from '../data/inventoryData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/item.css';

interface ItemPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const ItemPage: FC<ItemPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<InventoryItem>(INVENTORY_ITEMS[0]);

  const filteredItems = useMemo(() => {
    if (selectedCat === 'ALL') return INVENTORY_ITEMS;
    return INVENTORY_ITEMS.filter((item) => item.category === selectedCat);
  }, [selectedCat]);

  const handleSelectItem = useCallback(
    (item: InventoryItem, isPreview = false) => {
      if (isPreview) {
        if (selectedItem.id !== item.id) {
          playSfx('hover');
          setSelectedItem(item);
        }
        return;
      }
      playSfx('select');
      setSelectedItem(item);
    },
    [selectedItem.id, playSfx]
  );

  const handleSelectCategory = useCallback(
    (catId: string) => {
      playSfx('select');
      setSelectedCat(catId);
      const first =
        catId === 'ALL'
          ? INVENTORY_ITEMS[0]
          : INVENTORY_ITEMS.find((i) => i.category === catId) || INVENTORY_ITEMS[0];
      setSelectedItem(first);
    },
    [playSfx]
  );

  return (
    <InternalPageLayout
      title="SKILL"
      sublabel="TECHNICAL ABILITY & COMPETENCY INDEX"
      sectionId="002"
      characterId="aigis"
      backgroundPath="/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png"
      currentRoute="/tools"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="HOVER OR SELECT ANY SKILL TO INSPECT ARCHITECTURAL NOTES & PROJECTS"
    >
      <div className="p3r-skill-screen">
        {/* ================================================================
            3-COLUMN ABILITY SELECTION INTERFACE
            Left: Category Index | Centre: Skill Rows | Right: Live Inspector
            ================================================================ */}
        <div className="p3r-skill-tri-layout">
          {/* COLUMN 1: CATEGORY INDEX */}
          <nav className="p3r-skill-cat-column" aria-label="Skill Categories">
            <div className="p3r-cat-col-header">
              <span className="p3r-cat-col-tag">CATEGORY INDEX</span>
              <span className="p3r-cat-col-count">{filteredItems.length} SKILLS</span>
            </div>

            <div className="p3r-cat-btn-list" role="tablist">
              {INVENTORY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCat === cat.id}
                  className={`p3r-cat-tab-row ${selectedCat === cat.id ? 'active' : ''}`}
                  onClick={() => handleSelectCategory(cat.id)}
                  onMouseEnter={() => playSfx('hover')}
                >
                  <span className="p3r-cat-indicator" />
                  <span className="p3r-cat-name">{cat.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* COLUMN 2: SKILLS AND TECHNOLOGY LIST */}
          <section className="p3r-skill-list-column" aria-label="Technologies List">
            <div className="p3r-skill-list-header">
              <span className="p3r-skill-list-title">REGISTERED COMPETENCIES</span>
              <span className="p3r-skill-list-sub">HOVER TO PREVIEW</span>
            </div>

            <div
              className="p3r-skill-rows-container"
              role="listbox"
              aria-label="Skill list"
              aria-live="polite"
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={selectedItem.id === item.id}
                  tabIndex={0}
                  className={`p3r-skill-item-row ${selectedItem.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => handleSelectItem(item, true)}
                  onFocus={() => handleSelectItem(item, true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectItem(item);
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                      next?.focus();
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      const prev = e.currentTarget.previousElementSibling as HTMLElement | null;
                      prev?.focus();
                    }
                  }}
                >
                  <span className="p3r-skill-row-icon" aria-hidden="true">{item.icon}</span>
                  <div className="p3r-skill-row-info">
                    <div className="p3r-skill-row-main">
                      <span className="p3r-skill-row-name">{item.name}</span>
                      <span className="p3r-skill-row-cat">{item.categoryLabel}</span>
                    </div>
                    <span className="p3r-skill-row-desc">
                      {item.whatItIsUsedFor.slice(0, 75)}...
                    </span>
                  </div>
                  <span className="p3r-skill-row-arrow">▸</span>
                </div>
              ))}
            </div>
          </section>

          {/* COLUMN 3: LIVE ABILITY INSPECTOR */}
          <aside className="p3r-skill-inspector-column" aria-label="Live Ability Inspector" aria-live="polite">
            <div className="p3r-inspector-plate">
              {/* Header Box */}
              <div className="p3r-inspector-head">
                <div className="p3r-inspector-meta-row">
                  <span className="p3r-inspector-cat-tag">{selectedItem.categoryLabel}</span>
                  <span className="p3r-inspector-verified-tag">VERIFIED PRODUCTION STACK</span>
                </div>
                <div className="p3r-inspector-title-row">
                  <span className="p3r-inspector-hero-icon" aria-hidden="true">{selectedItem.icon}</span>
                  <h2 className="p3r-inspector-title">{selectedItem.name}</h2>
                </div>
              </div>

              {/* Inspector Content Sections */}
              <div className="p3r-inspector-body">
                {/* 1. ACTUAL PURPOSE */}
                <div className="p3r-inspector-section">
                  <h3 className="p3r-inspector-sec-label">ACTUAL PURPOSE &amp; UTILITY</h3>
                  <p className="p3r-inspector-text">{selectedItem.whatItIsUsedFor}</p>
                </div>

                {/* 2. HOW IT HAS BEEN USED */}
                <div className="p3r-inspector-section">
                  <h3 className="p3r-inspector-sec-label">ENGINEERING IMPLEMENTATION NOTES</h3>
                  <p className="p3r-inspector-quote">&ldquo;{selectedItem.flavorText}&rdquo;</p>
                </div>

                {/* 3. RELEVANT PROJECTS */}
                <div className="p3r-inspector-section">
                  <h3 className="p3r-inspector-sec-label">SHIPPED PROJECT DEPLOYMENTS</h3>
                  <div className="p3r-inspector-projects-wrap">
                    {selectedItem.relevantProjects.map((proj, pIdx) => (
                      <span key={pIdx} className="p3r-inspector-project-badge">
                        ◈ {proj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. DOCUMENTATION LINK */}
                {selectedItem.docsUrl && selectedItem.docsUrl !== '#' && (
                  <div className="p3r-inspector-actions">
                    <a
                      href={selectedItem.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p3r-inspector-doc-btn"
                      onClick={() => playSfx('confirm')}
                    >
                      <span>OFFICIAL DOCUMENTATION ↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </InternalPageLayout>
  );
};
