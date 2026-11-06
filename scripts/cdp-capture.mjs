import { preview } from 'vite';
import { spawn } from 'node:child_process';
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
const tempProfile = path.join(os.tmpdir(), 'edge_cdp_profile_' + Date.now());
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

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.callbacks = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
    });
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  async send(method, params = {}) {
    await this.ready;
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  console.log('Starting preview server on port 5196...');
  const server = await preview({
    root: rootDir,
    preview: {
      port: 5196,
    },
  });

  console.log('Launching Edge headless with remote debugging port 9222...');
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`,
    'about:blank',
  ]);

  edgeProc.on('error', (err) => console.error('Edge error:', err));

  // Wait for debugging port to be ready
  let target = null;
  for (let i = 0; i < 20; i++) {
    await delay(300);
    try {
      const res = await fetch('http://127.0.0.1:9222/json');
      const list = await res.json();
      if (list && list.length > 0) {
        target = list.find((t) => t.type === 'page') || list[0];
        if (target && target.webSocketDebuggerUrl) break;
      }
    } catch (_) {}
  }

  if (!target || !target.webSocketDebuggerUrl) {
    throw new Error('Failed to connect to Edge DevTools port');
  }

  console.log('Connected to Edge target:', target.webSocketDebuggerUrl);
  const client = new CDPClient(target.webSocketDebuggerUrl);

  await client.send('Page.enable');
  await client.send('Runtime.enable');

  // Test Skill page at all viewports
  for (const vp of viewports) {
    console.log(`Setting viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 768,
    });

    await client.send('Page.navigate', { url: 'http://localhost:5196/tools' });

    // Wait until .p3r-inspector-plate is mounted in DOM
    let mounted = false;
    for (let j = 0; j < 30; j++) {
      await delay(200);
      const evalRes = await client.send('Runtime.evaluate', {
        expression: '!!document.querySelector(".p3r-inspector-plate")',
      });
      if (evalRes?.result?.value === true) {
        mounted = true;
        break;
      }
    }

    if (!mounted) {
      console.warn(`  Warning: .p3r-inspector-plate not mounted within 6s on ${vp.name}`);
    }

    // Give 300ms for animations and layout
    await delay(350);

    const screenshotData = await client.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const buffer = Buffer.from(screenshotData.data, 'base64');
    const outFile = path.join(outDir, `skill-${vp.name}.png`);
    fs.writeFileSync(outFile, buffer);
    console.log(`  ✓ Saved ${outFile} (${buffer.length} bytes)`);

    if (fs.existsSync(artifactDir)) {
      fs.writeFileSync(path.join(artifactDir, `skill-${vp.name}.png`), buffer);
    }
  }

  // Capture Persona page at 1440x900
  console.log('Capturing Persona page at 1440x900...');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await client.send('Page.navigate', { url: 'http://localhost:5196/about' });

  for (let j = 0; j < 30; j++) {
    await delay(200);
    const evalRes = await client.send('Runtime.evaluate', {
      expression: '!!document.querySelector(".p3r-persona-screen")',
    });
    if (evalRes?.result?.value === true) break;
  }
  await delay(350);

  const personaData = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });

  const personaBuffer = Buffer.from(personaData.data, 'base64');
  const personaOutFile = path.join(outDir, 'persona-1440x900.png');
  fs.writeFileSync(personaOutFile, personaBuffer);
  console.log(`  ✓ Saved ${personaOutFile} (${personaBuffer.length} bytes)`);
  if (fs.existsSync(artifactDir)) {
    fs.writeFileSync(path.join(artifactDir, 'persona-1440x900.png'), personaBuffer);
  }

  client.close();
  edgeProc.kill();
  await server.close();

  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch (_) {}

  console.log('All captures and visual verification complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

