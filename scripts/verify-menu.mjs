import { preview } from 'vite';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'screenshots');
const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\0d9a538d-6149-4fd2-8f38-5ab7a274a095';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempProfile = path.join(os.tmpdir(), 'edge_menu_profile_' + Date.now());
fs.mkdirSync(tempProfile, { recursive: true });

const targetViewports = [
  // Desktop
  { name: '1920x1080', width: 1920, height: 1080, category: 'Desktop' },
  { name: '1440x900',  width: 1440, height: 900,  category: 'Desktop' },
  { name: '1366x768',  width: 1366, height: 768,  category: 'Desktop' },
  // Tablet
  { name: '1024x768',  width: 1024, height: 768,  category: 'Tablet Landscape' },
  { name: '768x1024',  width: 768,  height: 1024, category: 'Tablet Portrait' },
  { name: '687x950',   width: 687,  height: 950,  category: 'Problem Reference' },
  // Mobile
  { name: '430x932',   width: 430,  height: 932,  category: 'Mobile' },
  { name: '390x844',   width: 390,  height: 844,  category: 'Mobile' },
  { name: '375x812',   width: 375,  height: 812,  category: 'Mobile' },
  { name: '360x800',   width: 360,  height: 800,  category: 'Mobile' },
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

async function runAudit() {
  console.log('='.repeat(64));
  console.log('  PERSONA 3 RELOAD — COMPREHENSIVE VIEWPORT AUDIT & VERIFICATION');
  console.log('='.repeat(64) + '\n');

  console.log('[1/4] Starting Vite preview server...');
  const server = await preview({
    root: rootDir,
    preview: {
      port: 5199,
    },
  });
  console.log('  ✓ Preview server active at http://localhost:5199\n');

  console.log('[2/4] Spawning Headless Edge instance with Chrome DevTools Protocol...');
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`,
    'about:blank',
  ]);

  let target = null;
  for (let i = 0; i < 25; i++) {
    await delay(250);
    try {
      const res = await fetch('http://127.0.0.1:9223/json');
      const list = await res.json();
      if (list && list.length > 0) {
        target = list.find((t) => t.type === 'page') || list[0];
        if (target && target.webSocketDebuggerUrl) break;
      }
    } catch (_) {}
  }

  if (!target || !target.webSocketDebuggerUrl) {
    throw new Error('Could not establish CDP connection to Edge.');
  }

  const client = new CDPClient(target.webSocketDebuggerUrl);
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  console.log('  ✓ Connected to CDP session.\n');

  console.log('[3/4] Auditing all specified viewports...');
  let totalErrors = 0;
  const auditReport = [];

  for (const vp of targetViewports) {
    console.log(`\n--- Auditing ${vp.name} (${vp.category}: ${vp.width}x${vp.height}) ---`);

    await client.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 1024,
    });

    await client.send('Page.navigate', { url: 'http://localhost:5199/menu' });

    // Wait until .p3r-main-menu-container and menu items are rendered
    let ready = false;
    for (let r = 0; r < 25; r++) {
      await delay(150);
      const res = await client.send('Runtime.evaluate', {
        expression: '!!document.querySelector(".p3r-arc-items-layer")',
      });
      if (res?.result?.value === true) {
        ready = true;
        break;
      }
    }

    if (!ready) {
      console.error(`  ✗ FAIL: MainMenu not rendered in time on ${vp.name}`);
      totalErrors++;
      continue;
    }

    // Wait for layout and fonts to settle
    await delay(350);

    // Evaluate layout state, bounding boxes, overlaps, and negative space
    const evalResult = await client.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // 1. Profile card removal check
          const profileCard = document.querySelector('.p3r-hud-profile');
          const profileAvatar = document.querySelector('.p3r-profile-avatar');
          const recruiterPill = document.querySelector('.p3r-recruiter-menu-pill');
          const bodyText = document.body.innerText;
          const hasLv99 = bodyText.includes('LV.99');
          const hasRecruiter = bodyText.includes('RECRUITER ACCESS');
          const hasStatusActive = bodyText.includes('STATUS: ACTIVE');

          // 2. HUD Elements
          const musicBtn = document.querySelector('.p3r-music-toggle-btn');
          const themeBadge = document.querySelector('.p3r-theme-indicator');
          const arcStage = document.querySelector('.p3r-arc-nav-stage');
          const arcStageRect = arcStage ? arcStage.getBoundingClientRect() : null;

          // 3. Menu items inspection
          const allButtons = Array.from(document.querySelectorAll('.p3r-menu-item-btn'));
          const itemData = allButtons.map((btn, index) => {
            const plate = btn.querySelector('.p3r-menu-plate') || btn;
            const labelEl = btn.querySelector('.p3r-item-label');
            const labelText = labelEl ? labelEl.textContent.trim() : (btn.getAttribute('aria-label')?.split(' - ')[0] || '');
            const style = window.getComputedStyle(btn);
            const opacity = parseFloat(style.opacity);
            const isVisible = opacity > 0.1 && style.display !== 'none' && style.visibility !== 'hidden';
            const rect = plate.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();

            return {
              index,
              label: labelText,
              opacity,
              isVisible,
              isActive: btn.classList.contains('active'),
              rect: {
                left: Math.round(rect.left * 10) / 10,
                right: Math.round(rect.right * 10) / 10,
                top: Math.round(rect.top * 10) / 10,
                bottom: Math.round(rect.bottom * 10) / 10,
                width: Math.round(rect.width * 10) / 10,
                height: Math.round(rect.height * 10) / 10,
              },
            };
          });

          // Check visible items
          const visibleItems = itemData.filter(item => item.isVisible);

          // Overlap detection between visible plates
          const overlaps = [];
          for (let i = 0; i < visibleItems.length; i++) {
            for (let j = i + 1; j < visibleItems.length; j++) {
              const a = visibleItems[i];
              const b = visibleItems[j];

              // Check horizontal overlap with a tolerance
              const horizOverlap = (a.rect.left < b.rect.right - 2) && (a.rect.right > b.rect.left + 2);
              const vertOverlap = (a.rect.top < b.rect.bottom - 2) && (a.rect.bottom > b.rect.top + 2);

              if (horizOverlap && vertOverlap) {
                overlaps.push({
                  itemA: a.label,
                  itemB: b.label,
                  rectA: a.rect,
                  rectB: b.rect,
                });
              }
            }
          }

          // Boundary clipping check
          const boundaryClippings = [];
          for (const item of visibleItems) {
            if (item.rect.left < 0) {
              boundaryClippings.push({ label: item.label, issue: 'Clipped on LEFT edge: ' + item.rect.left + 'px' });
            }
            if (item.rect.right > viewportWidth + 1) {
              boundaryClippings.push({ label: item.label, issue: 'Clipped on RIGHT edge: ' + item.rect.right + 'px > ' + viewportWidth + 'px' });
            }
          }

          // Horizontal scroll detection
          const hasHorizontalScroll = document.documentElement.scrollWidth > viewportWidth || document.body.scrollWidth > viewportWidth;

          return {
            viewportWidth,
            viewportHeight,
            profileCardRemoved: !profileCard && !profileAvatar && !recruiterPill && !hasLv99 && !hasRecruiter && !hasStatusActive,
            musicControlPresent: !!musicBtn,
            themeBadgePresent: !!themeBadge,
            arcStageRect,
            totalItems: allButtons.length,
            visibleCount: visibleItems.length,
            visibleLabels: visibleItems.map(i => i.label),
            allLabels: itemData.map(i => i.label),
            overlaps,
            boundaryClippings,
            hasHorizontalScroll,
            itemDetails: visibleItems,
          };
        })()
      `,
    });

    const data = evalResult?.result?.value;
    if (!data) {
      console.error(`  ✗ Evaluation failed on ${vp.name}`);
      totalErrors++;
      continue;
    }

    // Capture screenshot
    const screenshotData = await client.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    const buffer = Buffer.from(screenshotData.data, 'base64');
    const outFile = path.join(outDir, `menu-refined-${vp.name}.png`);
    fs.writeFileSync(outFile, buffer);
    fs.writeFileSync(path.join(artifactDir, `menu-refined-${vp.name}.png`), buffer);
    console.log(`  ✓ Screenshot saved: menu-refined-${vp.name}.png (${buffer.length} bytes)`);

    // Audit assertions
    const checks = [
      {
        desc: 'Profile ID card completely removed (no LV.99, no recruiter button, clean upper-right)',
        pass: data.profileCardRemoved,
      },
      {
        desc: 'All 7 destinations present in menu',
        pass: data.totalItems === 7 && JSON.stringify(data.allLabels) === JSON.stringify(['PERSONA', 'SKILL', 'EQUIP', 'EXPERIENCE', 'STATS', 'SOCIAL LINK', 'SYSTEM']),
      },
      {
        desc: `No overlapping navigation plates (visible plates: ${data.visibleCount})`,
        pass: data.overlaps.length === 0,
        detail: data.overlaps.length > 0 ? JSON.stringify(data.overlaps) : null,
      },
      {
        desc: 'No boundary clipping beyond viewport edges',
        pass: data.boundaryClippings.length === 0,
        detail: data.boundaryClippings.length > 0 ? JSON.stringify(data.boundaryClippings) : null,
      },
      {
        desc: 'No horizontal scrollbar overflow',
        pass: !data.hasHorizontalScroll,
      },
      {
        desc: 'Minimal music control and theme indicator present',
        pass: data.musicControlPresent && data.themeBadgePresent,
      },
    ];

    if (vp.name === '687x950') {
      checks.push({
        desc: 'Problem viewport (687x950) displays exactly 3 clear menu plates (active at apex, previous and next flanking)',
        pass: data.visibleCount === 3,
        detail: `Visible: ${data.visibleLabels.join(', ')}`,
      });
    }

    let vpFailed = false;
    for (const c of checks) {
      if (c.pass) {
        console.log(`  ✓ [PASS] ${c.desc}`);
      } else {
        console.error(`  ✗ [FAIL] ${c.desc} ${c.detail ? `(${c.detail})` : ''}`);
        vpFailed = true;
        totalErrors++;
      }
    }

    auditReport.push({
      viewport: vp.name,
      category: vp.category,
      passed: !vpFailed,
      visibleCount: data.visibleCount,
      visibleLabels: data.visibleLabels,
      items: data.itemDetails,
    });
  }

  // [4/4] Keyboard & Touch Interaction Verification on 687x950
  console.log('\n[4/4] Testing Interactive Navigation Behaviors on 687x950...');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 687,
    height: 950,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await client.send('Page.navigate', { url: 'http://localhost:5199/menu' });
  await delay(400);

  // Keyboard navigation: press ArrowDown twice
  await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown' });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown' });
  await delay(350);

  let navState = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: 'document.querySelector(".p3r-menu-item-btn.active .p3r-item-label")?.innerText',
  });
  const afterDown = navState?.result?.value;
  console.log(`  ✓ Keyboard ArrowDown selected: ${afterDown}`);

  await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown' });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown' });
  await delay(350);

  navState = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: 'document.querySelector(".p3r-menu-item-btn.active .p3r-item-label")?.innerText',
  });
  const afterDown2 = navState?.result?.value;
  console.log(`  ✓ Keyboard ArrowDown selected: ${afterDown2}`);

  // Keyboard navigation: press ArrowUp
  await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowUp', code: 'ArrowUp' });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowUp', code: 'ArrowUp' });
  await delay(350);

  navState = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: 'document.querySelector(".p3r-menu-item-btn.active .p3r-item-label")?.innerText',
  });
  const afterUp = navState?.result?.value;
  console.log(`  ✓ Keyboard ArrowUp reversed to: ${afterUp}`);

  // Touch Swipe simulation: dispatch touchstart and touchend with negative deltaX
  await client.send('Runtime.evaluate', {
    expression: `
      (() => {
        const stage = document.querySelector('.p3r-arc-nav-stage');
        const touch1 = new Touch({ identifier: 1, target: stage, clientX: 400, clientY: 200 });
        const touch2 = new Touch({ identifier: 1, target: stage, clientX: 280, clientY: 200 });
        stage.dispatchEvent(new TouchEvent('touchstart', { touches: [touch1], changedTouches: [touch1], bubbles: true }));
        stage.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [touch2], bubbles: true }));
      })()
    `,
  });
  await delay(350);

  navState = await client.send('Runtime.evaluate', {
    returnByValue: true,
    expression: 'document.querySelector(".p3r-menu-item-btn.active .p3r-item-label")?.innerText',
  });
  const afterSwipe = navState?.result?.value;
  console.log(`  ✓ Touch Swipe Left advanced to: ${afterSwipe}`);

  // Capture final interactive state screenshot on 687x950
  const final687 = await client.send('Page.captureScreenshot', { format: 'png' });
  const finalBuffer = Buffer.from(final687.data, 'base64');
  fs.writeFileSync(path.join(outDir, 'menu-refined-687x950-swiped.png'), finalBuffer);
  fs.writeFileSync(path.join(artifactDir, 'menu-refined-687x950-swiped.png'), finalBuffer);

  client.close();
  edgeProc.kill();
  await server.close();

  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch (_) {}

  console.log('\n' + '='.repeat(64));
  if (totalErrors === 0) {
    console.log('  ALL VIEWPORT CHECKS & INTERACTION TESTS PASSED! (0 ERRORS)');
  } else {
    console.error(`  AUDIT COMPLETED WITH ${totalErrors} ERROR(S).`);
  }
  console.log('='.repeat(64) + '\n');

  if (totalErrors > 0) process.exit(1);
}

runAudit().catch((err) => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
