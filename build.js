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
    copyDirRecursive(src, path.join(dist, d));
    console.log(`Copied ${d}/ -> dist/${d}/`);
  }
});

console.log('✓ Production dist bundle created successfully.');
