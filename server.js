const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8888;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const VIDEO_DIRS = [
  path.join(PUBLIC_DIR, 'assets', 'videos'),
  'C:\\Users\\Darnl\\Downloads\\drive-download-20260823T020523Z-1-001',
  'C:\\Users\\Darnl\\Downloads',
  'C:\\Users\\Darnl\\the-clash-tickets',
  'C:\\Users\\Darnl\\Videos'
];

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Video Streaming Route (/videos/<filename>)
  if (pathname.startsWith('/videos/')) {
    const videoName = path.basename(pathname);
    let targetVideoPath = null;

    for (const vDir of VIDEO_DIRS) {
      const candidate = path.join(vDir, videoName);
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        targetVideoPath = candidate;
        break;
      }
    }

    if (targetVideoPath) {
      const stat = fs.statSync(targetVideoPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(targetVideoPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
          'Access-Control-Allow-Origin': '*'
        };
        res.writeHead(206, head);
        file.pipe(res);
        return;
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
          'Accept-Ranges': 'bytes',
          'Access-Control-Allow-Origin': '*'
        };
        res.writeHead(200, head);
        fs.createReadStream(targetVideoPath).pipe(res);
        return;
      }
    }
  }

  let filePath = path.join(PUBLIC_DIR, pathname);

  // If path is root or directory, serve index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Pretty URL support (e.g. /loa -> /loa.html)
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // SPA fallback
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`500 Server Error: ${err.message}`);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`⚡ 9LMNTS Studio Cyber Cypher Local Server Online`);
  console.log(`📡 Local:   http://localhost:${PORT}`);
  console.log(`📡 Loopback: http://127.0.0.1:${PORT}`);
  console.log(`📁 Root:     ${PUBLIC_DIR}`);
  console.log(`======================================================\n`);
});
