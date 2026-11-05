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
    (item: InventoryItem) => {
      playSfx('select');
      setSelectedItem(item);
    },
    [playSfx]
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
      title="ITEM"
      sublabel="DEVELOPER INVENTORY & TOOLING ARSENAL"
      sectionId="006"
      characterId="aigis"
      backgroundPath="/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png"
      currentRoute="/tools"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="SELECT ANY INVENTORY ITEM TO INSPECT PURPOSE, RELEVANT PROJECTS & DOCS"
    >
      <div className="p3r-item-screen">
        {/* Category Filter Tabs */}
        <div className="p3r-item-tabs-bar" role="tablist" aria-label="Inventory Categories">
          {INVENTORY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCat === cat.id}
              className={`p3r-item-tab-btn ${selectedCat === cat.id ? 'active' : ''}`}
              onClick={() => handleSelectCategory(cat.id)}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Two-Column Grid: Slot Grid + Item Inspection Panel */}
        <div className="p3r-item-stage-grid">
          {/* Collectible Slot Grid */}
          <div className="p3r-inventory-slot-grid" role="listbox" aria-label="Inventory Slots" aria-live="polite">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                role="option"
                aria-selected={selectedItem.id === item.id}
                tabIndex={0}
                className={`p3r-inv-slot rarity-${item.rarity.toLowerCase()} ${
                  selectedItem.id === item.id ? 'selected' : ''
                }`}
                onClick={() => handleSelectItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectItem(item);
                  }
                }}
                onMouseEnter={() => playSfx('hover')}
              >
                <div className="p3r-inv-slot-top">
                  <span className="p3r-inv-icon">{item.icon}</span>
                  <span className="p3r-inv-rarity-pill">{item.rarity}</span>
                </div>

                <div className="p3r-inv-slot-mid">
                  <span className="p3r-inv-slot-name">{item.name}</span>
                  <span className="p3r-inv-slot-cat">{item.categoryLabel}</span>
                </div>

                <div className="p3r-inv-slot-bottom">
                  <span className="p3r-inv-quantity">{item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Item Inspection Panel */}
          <aside className="p3r-item-inspection-panel" aria-live="polite">
            <div className="p3r-item-head-box">
              <span className="p3r-item-huge-icon" aria-hidden="true">{selectedItem.icon}</span>
              <div className="p3r-item-head-text">
                <div className="p3r-item-head-meta">
                  <span className="p3r-item-cat-sub">{selectedItem.categoryLabel}</span>
                  <span className={`p3r-item-rarity-tag rarity-${selectedItem.rarity.toLowerCase()}`}>
                    {selectedItem.rarity}
                  </span>
                </div>
                <h2 className="p3r-item-title">{selectedItem.name}</h2>
              </div>
            </div>

            {/* WHAT IT IS USED FOR */}
            <div className="p3r-item-section">
              <h3 className="p3r-item-sec-heading">WHAT IT IS USED FOR</h3>
              <p className="p3r-item-effect-text">{selectedItem.whatItIsUsedFor}</p>
            </div>

            {/* ARTIFACT LORE */}
            <div className="p3r-item-section">
              <h3 className="p3r-item-sec-heading">TACTICAL LORE</h3>
              <p className="p3r-item-flavor-text">&ldquo;{selectedItem.flavorText}&rdquo;</p>
            </div>

            {/* RELEVANT PROJECTS WHERE ACTUALLY USED */}
            <div className="p3r-item-section">
              <h3 className="p3r-item-sec-heading">RELEVANT PROJECTS WHERE ACTUALLY USED</h3>
              <div className="p3r-item-projects-list">
                {selectedItem.relevantProjects.map((proj, pIdx) => (
                  <span key={pIdx} className="p3r-item-project-pill">
                    📦 {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* DOCUMENTATION LINK */}
            {selectedItem.docsUrl && selectedItem.docsUrl !== '#' && (
              <div className="p3r-item-docs-box">
                <a
                  href={selectedItem.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p3r-item-docs-link"
                  onClick={() => playSfx('confirm')}
                >
                  <span>OFFICIAL DOCUMENTATION ↗</span>
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </InternalPageLayout>
  );
};
