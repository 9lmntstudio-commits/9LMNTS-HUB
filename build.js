const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');

console.log('--- 9LMNTS Studio Production Build Engine ---');

function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.readdirSync(srcDir).forEach(item => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

// Files to copy (all core station pages + all 25 in-house Competition OS Arena showcases)
// ZERO FREE WORK RULE: Custom client builds (margo.html, businessmeter.html) stay locked in local vault until 50% Stripe deposit is paid.
const coreFiles = [
  'index.html', 'code.html', 'mobile.html', 'remote-cockpit.html',
  '9LMNTS_GEMINI_MOBILE_BRAIN_SYNC.md', 'ARGON_AUTONOMOUS_SALES_ENGINE.md', '9LMNTS_STUDIO_OUTBOUND_SALES_ARCHITECTURE.md',
  'google-apps-script-bridge.gs',
  '_redirects', 'netlify.toml', 'package.json', 'robots.txt', 'sitemap.xml', 'llms.txt',
  'loa.html', 'vault.html', 'core.html', 'ai-voice.html', 'services.html', 'the-helm.html', 'clash.html', 'merch.html', 'pricing.html'
];
const arenaFiles = fs.readdirSync(root).filter(f => /^\d{2}_.*\.html$/i.test(f)).sort();
const filesToCopy = [...new Set([...coreFiles, ...arenaFiles])];

filesToCopy.forEach(f => {
  const src = path.join(root, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dist, f));
    console.log(`Copied ${f} -> dist/${f}`);
  }
});

// Directories to copy
const dirsToCopy = ['assets', 'styles', 'components', 'data', 'boilerplates'];
dirsToCopy.forEach(d => {
  const src = path.join(root, d);
  if (fs.existsSync(src)) {
    copyDirRecursive(src, path.join(dist, d));
    console.log(`Copied ${d}/ -> dist/${d}/`);
  }
});

// Ensure dist/netlify.toml and dist/package.json work when deploying dist/ directly
const distTomlPath = path.join(dist, 'netlify.toml');
if (fs.existsSync(distTomlPath)) {
  const toml = fs.readFileSync(distTomlPath, 'utf8')
    .replace('command = "npm run build"', 'command = "echo \'Static dist bundle ready\'"')
    .replace('publish = "dist"', 'publish = "."');
  fs.writeFileSync(distTomlPath, toml, 'utf8');
}
const distPkgPath = path.join(dist, 'package.json');
if (fs.existsSync(distPkgPath)) {
  fs.writeFileSync(distPkgPath, JSON.stringify({
    name: 'immersive-9lmnts-studio-dist',
    version: '1.0.0',
    private: true,
    scripts: { build: "echo 'Prebuilt static bundle ready'" }
  }, null, 2), 'utf8');
}

console.log('✓ Production dist bundle created successfully.');
