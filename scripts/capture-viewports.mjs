import { preview } from 'vite';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'screenshots');
const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\09cbefe8-2b9e-4930-b56e-7959481f00ac';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempProfile = path.join(os.tmpdir(), 'edge_p3r_profile_' + Date.now());
fs.mkdirSync(tempProfile, { recursive: true });

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1600x900', width: 1600, height: 900 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
];

async function run() {
  console.log('Starting preview server...');
  const server = await preview({
    root: rootDir,
    preview: {
      port: 5198,
    },
  });

  const url = 'http://localhost:5198/tools';
  console.log(`Preview server running at ${url}`);

  for (const vp of viewports) {
    const screenshotPath = path.join(outDir, `skill-${vp.name}.png`);
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);

    const args = [
      '--headless',
      '--disable-gpu',
      `--user-data-dir=${tempProfile}`,
      `--window-size=${vp.width},${vp.height}`,
      '--virtual-time-budget=2000',
      `--screenshot=${screenshotPath}`,
      url,
    ];

    try {
      execFileSync(edgePath, args, { stdio: 'ignore', timeout: 15000 });
      console.log(`  ✓ Saved ${screenshotPath} (${fs.statSync(screenshotPath).size} bytes)`);
      if (fs.existsSync(artifactDir)) {
        fs.copyFileSync(screenshotPath, path.join(artifactDir, `skill-${vp.name}.png`));
      }
    } catch (err) {
      console.error(`  ✗ Failed ${vp.name}:`, err.message);
    }
  }

  // Also capture persona page
  const personaScreenshotPath = path.join(outDir, 'persona-1440x900.png');
  try {
    execFileSync(edgePath, [
      '--headless',
      '--disable-gpu',
      `--user-data-dir=${tempProfile}`,
      '--window-size=1440,900',
      '--virtual-time-budget=2000',
      `--screenshot=${personaScreenshotPath}`,
      'http://localhost:5198/about',
    ], { stdio: 'ignore', timeout: 15000 });
    console.log(`  ✓ Saved ${personaScreenshotPath} (${fs.statSync(personaScreenshotPath).size} bytes)`);
    if (fs.existsSync(artifactDir)) {
      fs.copyFileSync(personaScreenshotPath, path.join(artifactDir, 'persona-1440x900.png'));
    }
  } catch (err) {
    console.error(`  ✗ Failed persona screenshot:`, err.message);
  }

  await server.close();
  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch (_) {}
  console.log('All captures done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
