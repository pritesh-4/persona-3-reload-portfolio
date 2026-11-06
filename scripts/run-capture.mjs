import { preview } from 'vite';
import { exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function main() {
  console.log('Starting preview server on port 5197...');
  const server = await preview({
    root: rootDir,
    preview: {
      port: 5197,
    },
  });

  console.log('Preview server ready. Running screenshot capture script asynchronously...');
  
  const psScript = path.join(rootDir, 'scripts', 'take-screenshots.ps1');
  
  await new Promise((resolve, reject) => {
    const child = exec(`powershell -ExecutionPolicy Bypass -File "${psScript}"`, (err, stdout, stderr) => {
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });

    child.stdout?.on('data', (d) => process.stdout.write(d.toString()));
    child.stderr?.on('data', (d) => process.stderr.write(d.toString()));
  });

  await server.close();
  console.log('Preview server closed. Capture sequence complete.');
}

main().catch((err) => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
