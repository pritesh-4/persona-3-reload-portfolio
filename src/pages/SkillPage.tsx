import { useState, useCallback, useMemo, type FC } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import {
  SKILLS_DATA,
  SKILL_CATEGORIES,
  type SkillItem,
} from '../data/skillsData';
import { useAudioContext } from '../hooks/useAudioContext';
import '../styles/pages/skill.css';

interface SkillPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const SkillPage: FC<SkillPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return SKILLS_DATA;
    return SKILLS_DATA.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectSkill = useCallback(
    (skill: SkillItem) => {
      playSfx('select');
      setSelectedSkill(skill);
    },
    [playSfx]
  );

  const handleSelectCategory = useCallback(
    (catId: string) => {
      playSfx('select');
      setSelectedCategory(catId);
      const firstInCat =
        catId === 'all'
          ? SKILLS_DATA[0]
          : SKILLS_DATA.find(s => s.category === catId) || SKILLS_DATA[0];
      setSelectedSkill(firstInCat);
    },
    [playSfx]
  );

  return (
    <InternalPageLayout
      title="SKILL"
      sublabel="COMPETENCIES & ABILITY TREE"
      sectionId="002"
      characterId="mitsuru"
      backgroundPath="/assets/persona3/backgrounds/main-visuals/p3r-main-visual.png"
      currentRoute="/skills"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="SELECT ABILITY TO INSPECT OPERATIONAL PROFILE"
    >
      <div className="p3r-skill-screen">
        {/* Category Filter Tabs */}
        <div className="p3r-skill-tabs-strip">
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`p3r-skill-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleSelectCategory(cat.id)}
              onMouseEnter={() => playSfx('hover')}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Two-Column Grid: Selectable Ability List & Inspection Panel */}
        <div className="p3r-skill-stage-grid">
          {/* List of Skills */}
          <div className="p3r-skill-list-container" role="listbox" aria-label="Skills List" aria-live="polite">
            {filteredSkills.map(skill => (
              <div
                key={skill.id}
                role="option"
                aria-selected={selectedSkill.id === skill.id}
                tabIndex={0}
                className={`p3r-skill-card-row ${selectedSkill.id === skill.id ? 'selected' : ''}`}
                onClick={() => handleSelectSkill(skill)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectSkill(skill);
                  }
                }}
                onMouseEnter={() => playSfx('hover')}
              >
                <div className="p3r-skill-info-left">
                  <span className={`p3r-skill-elem-badge p3r-elem-${skill.element}`}>
                    {skill.element}
                  </span>
                  <div className="p3r-skill-name-col">
                    <span className="p3r-skill-name">{skill.name}</span>
                    <span className="p3r-skill-cat-sub">{skill.categoryLabel}</span>
                  </div>
                </div>

                <div className="p3r-skill-metrics-right">
                  <span className="p3r-skill-cost-badge">SP {skill.spCost}</span>
                  <span className="p3r-skill-tier-badge">{skill.tier}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Skill Inspection Panel */}
          <aside className="p3r-skill-detail-panel" aria-live="polite">
            <div className="p3r-detail-header-row">
              <h2 className="p3r-detail-title">{selectedSkill.name}</h2>
              <div className="p3r-detail-rank-pill">
                <span>{selectedSkill.proficiency}</span>
              </div>
            </div>

            <div className="p3r-detail-attr-strip">
              <div className="p3r-detail-attr-box">
                <span className="p3r-detail-attr-lbl">ELEMENT</span>
                <span className="p3r-detail-attr-val">{selectedSkill.element}</span>
              </div>
              <div className="p3r-detail-attr-box">
                <span className="p3r-detail-attr-lbl">SP CONSUMPTION</span>
                <span className="p3r-detail-attr-val">{selectedSkill.spCost} SP</span>
              </div>
              <div className="p3r-detail-attr-box">
                <span className="p3r-detail-attr-lbl">ABILITY TIER</span>
                <span className="p3r-detail-attr-val">{selectedSkill.tier}</span>
              </div>
            </div>

            <div className="p3r-detail-desc-box">
              <h3 className="p3r-detail-desc-heading">ABILITY MANIFEST</h3>
              <p className="p3r-detail-desc-text">{selectedSkill.description}</p>
            </div>

            <div className="p3r-detail-context-box">
              <span className="p3r-detail-context-label">FIELD DEPLOYMENT APPLICATION</span>
              <p className="p3r-detail-context-p">{selectedSkill.usageContext}</p>
            </div>
          </aside>
        </div>
      </div>
    </InternalPageLayout>
  );
};
