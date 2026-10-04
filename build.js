const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');

console.log('--- 9LMNTS Studio Production Build Engine ---');

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

// Files to copy
const filesToCopy = ['index.html', 'code.html', '_redirects', 'netlify.toml', 'package.json'];
filesToCopy.forEach(f => {
  const src = path.join(root, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dist, f));
    console.log(`Copied ${f} -> dist/${f}`);
  }
});

// Directories to copy
const dirsToCopy = ['assets', 'styles', 'components'];
dirsToCopy.forEach(d => {
  const src = path.join(root, d);
  if (fs.existsSync(src)) {
    fs.cpSync(src, path.join(dist, d), { recursive: true });
    console.log(`Copied ${d}/ -> dist/${d}/`);
  }
});

console.log('✓ Production dist bundle created successfully.');
