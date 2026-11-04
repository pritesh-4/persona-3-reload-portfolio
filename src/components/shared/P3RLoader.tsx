import { type FC } from 'react';

export const P3RLoader: FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--p3r-ink)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        gap: '20px',
      }}
      role="status"
      aria-label="Loading section"
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '3px solid rgba(0, 212, 255, 0.15)',
          borderTopColor: 'var(--p3r-cyan)',
          borderRightColor: 'var(--p3r-red)',
          animation: 'p3rSpin 800ms linear infinite',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.1rem',
            letterSpacing: '0.25em',
            color: 'var(--p3r-snow)',
          }}
        >
          S.E.E.S. ARCHIVE LINKING
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: 'var(--p3r-cyan)',
          }}
        >
          INITIALIZING SECTOR PROTOCOL...
        </span>
      </div>
      <style>{`
        @keyframes p3rSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

