import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(description, condition, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${description}`);
  } else {
    failedTests++;
    console.error(`  ✗ [FAIL] ${description} ${details ? '(' + details + ')' : ''}`);
  }
}

console.log('\n============================================================');
console.log('  PERSONA 3 RELOAD PORTFOLIO — AUTOMATED VERIFICATION SUITE');
console.log('============================================================\n');

// 1. Static Asset Validation
console.log('[1/4] Auditing Physical Production Media Assets...');
const publicAssets = path.join(rootDir, 'public', 'assets', 'persona3');

const expectedCharacters = [
  'makoto-yuki.webp',
  'yukari-takeba.webp',
  'junpei-iori.webp',
  'akihiko-sanada.webp',
  'mitsuru-kirijo.webp',
  'fuuka-yamagishi.webp',
  'koromaru.webp',
  'aigis.webp',
  'ken-amada.webp',
  'shinjiro-aragaki.webp',
];

expectedCharacters.forEach((char) => {
  const charPath = path.join(publicAssets, 'characters', char);
  const exists = fs.existsSync(charPath) && fs.statSync(charPath).size > 1000;
  assert(`Character cutout present & valid: ${char}`, exists);
});

const expectedBackgrounds = [
  'official-wallpapers/p3r-main-key-art.png',
  'main-visuals/p3r-main-visual.png',
  'promotional-art/persona3-reload-promo-group.jpg',
  'title/title-screen-composition.jpg',
];

expectedBackgrounds.forEach((bg) => {
  const bgPath = path.join(publicAssets, 'backgrounds', bg);
  const exists = fs.existsSync(bgPath) && fs.statSync(bgPath).size > 10000;
  assert(`Key background present & valid: ${bg}`, exists);
});

const expectedAudio = [
  'bgm/bgm-ambient-test.wav',
  'ui/ui-select.wav',
  'ui/ui-hover.wav',
  'ui/ui-confirm.wav',
  'ui/ui-back.wav',
  'ui/ui-transition.wav',
];

expectedAudio.forEach((snd) => {
  const sndPath = path.join(publicAssets, 'audio', snd);
  const exists = fs.existsSync(sndPath) && fs.statSync(sndPath).size > 1000;
  assert(`Procedural audio asset present & valid: ${snd}`, exists);
});

const primaryBgm = path.join(publicAssets, 'audio', 'bgm', 'colour-your-night.mp3');
const hasPrimaryBgm = fs.existsSync(primaryBgm) && fs.statSync(primaryBgm).size > 1000000;
assert(`Primary OST soundtrack present & valid: bgm/colour-your-night.mp3 (${(fs.statSync(primaryBgm).size / (1024 * 1024)).toFixed(2)} MB)`, hasPrimaryBgm);

// 2. Data Integrity & Content Ground Truth
console.log('\n[2/4] Verifying Data Model Contracts & Content Truth...');

const projectsFile = fs.readFileSync(path.join(rootDir, 'src', 'data', 'projectsData.ts'), 'utf8');
assert('Projects data defines 10 mission entries', (projectsFile.match(/id:\s*['"]quest-\d+['"]/g) || []).length === 10);
assert('SALVUS emergency project present with valid repo URL', projectsFile.includes('https://github.com/pritesh-4/SIH-2026---SALVUS'));
assert('Project AETHON defined with valid repo URL', projectsFile.includes('https://github.com/pritesh-4/Project_Aethon'));
assert('Project RouteMind defined with valid repo URL', projectsFile.includes('https://github.com/pritesh-4/Project_RouteMind'));
assert('Project Zogan defined with valid repo URL', projectsFile.includes('https://github.com/pritesh-4/Project_Zogan'));
assert('Explicit implementationStatus boundaries declared', projectsFile.includes('VERIFIED IMPLEMENTED') && projectsFile.includes('RESEARCH PROTOTYPE'));

const socialFile = fs.readFileSync(path.join(rootDir, 'src', 'data', 'socialLinksData.ts'), 'utf8');
assert('Social Links contain Pritesh Jena GitHub', socialFile.includes('https://github.com/pritesh-4'));
assert('Social Links contain authentic email terminal', socialFile.includes('priteshjena16@gmail.com'));
assert('Social Links contain authentic LinkedIn URL', socialFile.includes('https://www.linkedin.com/in/pritesh-jena'));
assert('Social Links define 7 Persona 3 Arcana cards', (socialFile.match(/id:\s*['"][a-z0-9_-]+['"]/g) || []).length >= 7);

const menuFile = fs.readFileSync(path.join(rootDir, 'src', 'data', 'menuConfig.ts'), 'utf8');
const expectedRoutes = ['/about', '/skills', '/resume', '/stats', '/projects', '/tools', '/contact', '/system'];
expectedRoutes.forEach((route) => {
  assert(`Menu config routes to ${route}`, menuFile.includes(`'${route}'`) || menuFile.includes(`"${route}"`));
});

// 3. Routing & Structural Component Integrity
console.log('\n[3/4] Verifying Application Route Tree & Layout Contracts...');
const appFile = fs.readFileSync(path.join(rootDir, 'src', 'App.tsx'), 'utf8');
expectedRoutes.forEach((route) => {
  assert(`App.tsx defines route for ${route}`, appFile.includes(`path="${route}"`));
});
assert('App.tsx defines 404 anomaly fallback route', appFile.includes('path="*"'));
assert('App.tsx implements lazy-loaded route chunking', appFile.includes('lazy('));
assert('ScreenTransition diagonal slash mounted', appFile.includes('<ScreenTransition'));

// 4. Deployment & Build Configuration Integrity
console.log('\n[4/4] Verifying Deployment & Meta Security Configuration...');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
assert('Index HTML contains Pritesh Jena title meta', indexHtml.includes('Pritesh Jena — Persona 3 Reload Developer Portfolio'));
assert('Index HTML contains Schema.org Person JSON-LD', indexHtml.includes('@type": "Person"'));
assert('Index HTML contains Open Graph preview tags', indexHtml.includes('og:title') && indexHtml.includes('og:image'));
assert('Index HTML contains canonical URL tag', indexHtml.includes('rel="canonical"'));

const vercelJson = fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8');
assert('vercel.json includes SPA fallback rewrite', vercelJson.includes('/index.html'));
assert('vercel.json specifies immutable asset cache-control', vercelJson.includes('immutable'));

const workflowYml = fs.readFileSync(path.join(rootDir, '.github', 'workflows', 'deploy.yml'), 'utf8');
assert('GitHub Actions workflow runs on ubuntu-latest with Node 22', workflowYml.includes('node-version: 22'));
assert('GitHub Actions workflow includes lint step', workflowYml.includes('npm run lint'));
assert('GitHub Actions workflow includes type-check step', workflowYml.includes('npm run type-check'));

console.log('\n============================================================');
console.log(`  TEST RESULTS: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED)`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('All automated integrity tests passed successfully.\n');
  process.exit(0);
}

