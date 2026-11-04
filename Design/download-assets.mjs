import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(await readFile(path.join(here, 'assets.json'), 'utf8'));

async function downloadGroup(items, folder) {
  const outDir = path.join(here, folder);
  await mkdir(outDir, { recursive: true });
  for (const asset of items ?? []) {
    const target = path.join(outDir, asset.file);
    try {
      const response = await fetch(asset.url, {
        headers: { 'User-Agent': 'P3R-portfolio-local-asset-review/1.0' },
        redirect: 'follow',
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const type = response.headers.get('content-type') || '';
      if (!type.includes('image/')) throw new Error(`Unexpected content type: ${type}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 1000) throw new Error('Response unexpectedly small');
      await writeFile(target, bytes);
      console.log(`Downloaded ${asset.name}: ${folder}/${asset.file} (${bytes.length.toLocaleString()} bytes)`);
    } catch (error) {
      console.error(`Failed ${asset.name}: ${error.message}`);
    }
  }
}

// Fetches copies for local design review only. This script does not grant rights to publish.
await downloadGroup(manifest.characters, 'characters');
await downloadGroup(manifest.wallpapers.filter((asset) => asset.url && asset.file), 'wallpaper-references');
console.log('UI reference screenshots are intentionally not downloaded; open their source pages manually.');
