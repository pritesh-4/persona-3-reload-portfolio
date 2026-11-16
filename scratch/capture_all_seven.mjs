import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\0d9a538d-6149-4fd2-8f38-5ab7a274a095';

const targets = [
  { url: 'http://localhost:5173/menu?index=0', w: 1728, h: 864, name: 'menu-01-persona-1728x864.png' },
  { url: 'http://localhost:5173/menu?index=1', w: 1728, h: 864, name: 'menu-02-skill-1728x864.png' },
  { url: 'http://localhost:5173/menu?index=2', w: 1728, h: 864, name: 'menu-03-equip-1728x864.png' },
  { url: 'http://localhost:5173/menu?index=3', w: 1728, h: 864, name: 'menu-04-experience-1728x864.png' },
  { url: 'http://localhost:5173/menu?index=4', w: 1728, h: 864, name: 'menu-05-stats-1728x864.png' },
  { url: 'http://localhost:5173/menu?index=5', w: 1728, h: 864, name: 'menu-06-social-1728x864.png' },
  { url: 'http://localhost:5173/menu?index=6', w: 1728, h: 864, name: 'menu-07-system-1728x864.png' },
  { url: 'http://localhost:5173/menu?index=0&darkHour=true', w: 1728, h: 864, name: 'menu-dark-hour-easter-egg-1728x864.png' },
  { url: 'http://localhost:5173/menu?index=0', w: 1920, h: 1080, name: 'menu-01-persona-1920x1080.png' },
  { url: 'http://localhost:5173/menu?index=3', w: 1920, h: 1080, name: 'menu-04-experience-1920x1080.png' },
  { url: 'http://localhost:5173/menu?index=0', w: 390, h: 844, name: 'menu-01-persona-390x844.png' },
];

for (const t of targets) {
  const outPath = path.join(artifactDir, t.name);
  const tempDir = path.join(os.tmpdir(), `edge-snap-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--virtual-time-budget=2000',
    '--run-all-compositor-stages-before-draw',
    `--window-size=${t.w},${t.h}`,
    `--user-data-dir="${tempDir}"`,
    `--screenshot="${outPath}"`,
    `"${t.url}"`
  ];

  try {
    console.log(`Capturing ${t.name} (${t.w}x${t.h})...`);
    execSync(`"${edgePath}" ${args.join(' ')}`, { stdio: 'inherit', timeout: 15000 });
    console.log(`Saved: ${outPath} (${fs.existsSync(outPath) ? fs.statSync(outPath).size : 0} bytes)`);
  } catch (e) {
    console.error(`Failed ${t.name}:`, e.message);
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  }
}
