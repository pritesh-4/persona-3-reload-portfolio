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
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem>(INVENTORY_ITEMS[0]);

  const filteredItems = useMemo(() => {
    if (selectedCat === 'all') return INVENTORY_ITEMS;
    return INVENTORY_ITEMS.filter(item => item.category === selectedCat);
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
        catId === 'all'
          ? INVENTORY_ITEMS[0]
          : INVENTORY_ITEMS.find(i => i.category === catId) || INVENTORY_ITEMS[0];
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
      customHint="SELECT ITEM SLOT TO INSPECT ARTIFACT METRICS"
    >
      <div className="p3r-item-screen">
        {/* Category Filter Tabs */}
        <div className="p3r-item-tabs-bar">
          {INVENTORY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
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
          {/* Slot Grid */}
          <div className="p3r-inventory-slot-grid" role="listbox" aria-label="Inventory Slots">
            {filteredItems.map(item => (
              <div
                key={item.id}
                role="option"
                aria-selected={selectedItem.id === item.id}
                tabIndex={0}
                className={`p3r-inv-slot ${selectedItem.id === item.id ? 'selected' : ''}`}
                onClick={() => handleSelectItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectItem(item);
                  }
                }}
                onMouseEnter={() => playSfx('hover')}
              >
                <span className="p3r-inv-icon">{item.icon}</span>
                <span className="p3r-inv-slot-name">{item.name}</span>
                <span className="p3r-inv-quantity">{item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Item Inspection Panel */}
          <aside className="p3r-item-inspection-panel" aria-live="polite">
            <div className="p3r-item-head-box">
              <span className="p3r-item-huge-icon">{selectedItem.icon}</span>
              <div className="p3r-item-head-text">
                <span className="p3r-item-cat-sub">{selectedItem.categoryLabel}</span>
                <h2 className="p3r-item-title">{selectedItem.name}</h2>
              </div>
            </div>

            <div className="p3r-item-section">
              <h3 className="p3r-item-sec-heading">FUNCTIONAL EFFECT</h3>
              <p className="p3r-item-effect-text">{selectedItem.effect}</p>
            </div>

            <div className="p3r-item-section">
              <h3 className="p3r-item-sec-heading">ARTIFACT LORE</h3>
              <p className="p3r-item-flavor-text">{selectedItem.flavorText}</p>
            </div>

            <div className="p3r-item-proj-box">
              <span className="p3r-item-proj-label">FIELD APPARATUS PROVENANCE</span>
              <p className="p3r-item-proj-val">{selectedItem.associatedProject}</p>
            </div>
          </aside>
        </div>
      </div>
    </InternalPageLayout>
  );
};
