import { type FC, useEffect, useState } from 'react';
import { InternalPageLayout } from '../components/layout/InternalPageLayout';
import { useAudioContext } from '../hooks/useAudioContext';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
  onBackToMenu: () => void;
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ onNavigate, onBackToMenu }) => {
  const { playSfx } = useAudioContext();
  const [showDetails, setShowDetails] = useState(false);

  // Log the 404 error for debugging
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.warn(`[P3R Navigation] 404 Dark Hour Anomaly: ${currentPath} is unmapped`);
  }, []);

  return (
    <InternalPageLayout
      title="404 ANOMALY"
      sublabel="NAVIGATION ERROR // SECTOR NOT FOUND"
      sectionId="ERR"
      characterId="makoto"
      backgroundPath="/assets/persona3/backgrounds/official-wallpapers/p3r-main-key-art.png"
      currentRoute="/404"
      onNavigate={onNavigate}
      onBackToMenu={onBackToMenu}
      customHint="INVALID ROUTE DETECTED. RETURN TO HUB VIA ESC"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60%',
          textAlign: 'center',
          gap: '24px',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(6, 19, 33, 0.95) 0%, rgba(10, 30, 56, 0.92) 100%)',
            border: '1px solid var(--p3r-red)',
            borderLeft: '6px solid var(--p3r-red)',
            padding: '36px 48px',
            maxWidth: '640px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
            transform: 'skewX(-4deg)',
          }}
        >
          <div style={{ transform: 'skewX(4deg)' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.1rem',
                letterSpacing: '0.2em',
                color: 'var(--p3r-red)',
              }}
            >
              ⚠ DARK HOUR INTERFERENCE
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontStyle: 'italic',
                color: 'var(--p3r-snow)',
                margin: '8px 0',
                lineHeight: 1,
              }}
            >
              SECTOR NOT FOUND
            </h1>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'rgba(240, 246, 255, 0.8)',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              The requested navigation coordinate does not exist or has been warped by Tartarus shadows.
            </p>
            <button
              type="button"
              className="p3r-back-btn"
              style={{ margin: '0 auto', fontSize: '1.2rem', padding: '10px 24px' }}
              onClick={() => {
                playSfx('confirm');
                onBackToMenu();
              }}
            >
              <span>&lt; RETREAT TO MAIN MENU</span>
            </button>

            {/* Additional Navigation Options */}
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  playSfx('hover');
                  setShowDetails(!showDetails);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--p3r-cyan)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  opacity: 0.8,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={() => playSfx('hover')}
              >
                {showDetails ? 'HIDE NAVIGATION OPTIONS' : 'SHOW AVAILABLE SECTIONS'}
              </button>
            </div>

            {/* Available Navigation Options */}
            {showDetails && (
              <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '500px' }}>
                <div style={{ background: 'rgba(0, 210, 255, 0.05)', border: '1px solid rgba(0, 210, 255, 0.2)', borderRadius: '6px', padding: '16px' }}>
                  <h4 style={{ color: 'var(--p3r-cyan)', fontSize: '1.1rem', marginBottom: '12px' }}>AVAILABLE PORTFOLIO SECTIONS</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.85rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        playSfx('confirm');
                        onNavigate('/about');
                      }}
                      style={{
                        background: 'rgba(0, 210, 255, 0.1)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: 'var(--p3r-ice)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>♠ PERSONA (Profile)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSfx('confirm');
                        onNavigate('/skills');
                      }}
                      style={{
                        background: 'rgba(0, 210, 255, 0.1)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: 'var(--p3r-ice)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>⚔ SKILL (Abilities)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSfx('confirm');
                        onNavigate('/resume');
                      }}
                      style={{
                        background: 'rgba(0, 210, 255, 0.1)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: 'var(--p3r-ice)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>★ EQUIP (Resume)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSfx('confirm');
                        onNavigate('/stats');
                      }}
                      style={{
                        background: 'rgba(0, 210, 255, 0.1)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: 'var(--p3r-ice)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>◆ STATS (Telemetry)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSfx('confirm');
                        onNavigate('/projects');
                      }}
                      style={{
                        background: 'rgba(0, 210, 255, 0.1)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: 'var(--p3r-ice)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>✦ QUEST (Projects)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSfx('confirm');
                        onNavigate('/tools');
                      }}
                      style={{
                        background: 'rgba(0, 210, 255, 0.1)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: 'var(--p3r-ice)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>♥ ITEM (Tools)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSfx('confirm');
                        onNavigate('/contact');
                      }}
                      style={{
                        background: 'rgba(0, 210, 255, 0.1)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: 'var(--p3r-ice)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>◈ SOCIAL LINK (Contact)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSfx('confirm');
                        onNavigate('/system');
                      }}
                      style={{
                        background: 'rgba(0, 210, 255, 0.1)',
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: 'var(--p3r-ice)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={() => playSfx('hover')}
                    >
                      <span>⚙ SYSTEM (Config)</span>
                    </button>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    <p>Use navigation buttons above to return to any available portfolio section.</p>
                    <p style={{ marginTop: '4px' }}>The curved arc menu provides the full navigation experience at the main hub.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
