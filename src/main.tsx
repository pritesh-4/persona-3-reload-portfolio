import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AudioProvider } from './context/AudioProvider';
import './index.css';
import App from './App';

// Dynamically determine basename to support GitHub Pages subpath (/persona-3-reload-portfolio),
// casing variations, and root domain deployments (localhost, Vercel, Netlify).
const getBasename = (): string => {
  if (typeof window !== 'undefined') {
    const match = window.location.pathname.match(/^(\/[^/]*(?:persona|person)-3-reload-portfolio[^/]*)/i);
    if (match) return match[1];
  }
  return '/';
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <AudioProvider>
        <App />
      </AudioProvider>
    </BrowserRouter>
  </StrictMode>
);
