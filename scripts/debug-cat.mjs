import { preview } from 'vite';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function test() {
  const server = await preview({ root: rootDir, preview: { port: 5193 } });
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    `--user-data-dir=${process.env.TEMP}\\edge_debug_profile_${Date.now()}`,
    'about:blank',
  ]);

  await new Promise((r) => setTimeout(r, 1200));
  const res = await fetch('http://127.0.0.1:9225/json');
  const list = await res.json();
  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 1;
  const send = (m, p) =>
    new Promise((r) => {
      const cur = id++;
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === cur) {
          ws.removeEventListener('message', handler);
          r(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: cur, method: m, params: p }));
    });

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await send('Page.navigate', { url: 'http://localhost:5193/tools' });

  // Poll until element exists
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    const check = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: '!!document.querySelector(".p3r-skill-cat-column")',
    });
    if (check?.result?.value === true) break;
  }

  await new Promise((r) => setTimeout(r, 400));

  const debug = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const cat = document.querySelector(".p3r-skill-cat-column");
      const list = document.querySelector(".p3r-cat-btn-list");
      const buttons = Array.from(document.querySelectorAll(".p3r-cat-tab-row")).map(b => ({
        text: b.innerText.trim(),
        rect: {
          top: b.getBoundingClientRect().top,
          bottom: b.getBoundingClientRect().bottom,
          left: b.getBoundingClientRect().left,
          right: b.getBoundingClientRect().right,
          height: b.getBoundingClientRect().height,
        }
      }));
      return {
        catRect: {
          top: cat?.getBoundingClientRect().top,
          bottom: cat?.getBoundingClientRect().bottom,
          height: cat?.getBoundingClientRect().height,
        },
        listRect: {
          top: list?.getBoundingClientRect().top,
          bottom: list?.getBoundingClientRect().bottom,
          height: list?.getBoundingClientRect().height,
        },
        catComputed: {
          height: getComputedStyle(cat).height,
          maxHeight: getComputedStyle(cat).maxHeight,
          overflow: getComputedStyle(cat).overflow,
          display: getComputedStyle(cat).display,
          flexDirection: getComputedStyle(cat).flexDirection,
        },
        buttons
      };
    })()`,
  });

  console.log('RESULT:', JSON.stringify(debug.result.value, null, 2));

  ws.close();
  edge.kill();
  await server.close();
}

test().catch(console.error);
