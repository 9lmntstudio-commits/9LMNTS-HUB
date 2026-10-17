const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');

const WORKSPACE_DIR = __dirname;
const CONFIG_FILE = path.join(WORKSPACE_DIR, '.bridge-config.json');
const BRAIN_MD_FILE = path.join(WORKSPACE_DIR, '9LMNTS_GEMINI_MOBILE_BRAIN_SYNC.md');

function loadConfig() {
  let saved = {};
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      saved = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    } catch (e) {}
  }
  return {
    secretKey: process.env.BRIDGE_SECRET || saved.secretKey || '9999',
    googleScriptUrl: process.env.GOOGLE_SCRIPT_WEBHOOK_URL || saved.googleScriptUrl || '',
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || saved.telegramBotToken || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || saved.telegramChatId || '',
    allowShell: process.env.ALLOW_SHELL === 'true' || saved.allowShell !== false,
    pollIntervalMs: Number(saved.pollIntervalMs) || 10000
  };
}

function saveConfig(newValues) {
  const current = loadConfig();
  const merged = { ...current, ...newValues };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2), 'utf8');
  return merged;
}

const commandHistory = [];
let lastCommandOutput = 'System Online. Waiting for mobile or Google Docs command...';
let lastSyncStatus = { syncedAt: null, docUrl: null, error: null };

function getBrainSummary() {
  const allFiles = fs.readdirSync(WORKSPACE_DIR);
  const htmlFiles = allFiles.filter(f => f.endsWith('.html'));
  const distExists = fs.existsSync(path.join(WORKSPACE_DIR, 'dist'));
  const distCount = distExists ? fs.readdirSync(path.join(WORKSPACE_DIR, 'dist')).length : 0;
  const baseBrain = fs.existsSync(BRAIN_MD_FILE)
    ? fs.readFileSync(BRAIN_MD_FILE, 'utf8')
    : '# 9LMNTS Studio Live Brain';

  return {
    timestamp: new Date().toISOString(),
    workspace: WORKSPACE_DIR,
    totalRootFiles: allFiles.length,
    htmlPagesCount: htmlFiles.length,
    distBundleReady: distExists,
    distFilesCount: distCount,
    lastCommandOutput,
    lastSyncStatus,
    commandHistory: commandHistory.slice(-10),
    markdown: `${baseBrain}\n\n---\n## LIVE TELEMETRY SNAPSHOT (${new Date().toISOString()})\n- **Root Files**: ${allFiles.length} (${htmlFiles.length} HTML stations/arenas)\n- **Production dist/ Ready**: ${distExists ? 'YES (' + distCount + ' items)' : 'NO'}\n- **Last Command Output**:\n\`\`\`\n${lastCommandOutput}\n\`\`\`\n`
  };
}

function safeResolveWorkspaceFile(relPath) {
  const cleaned = String(relPath || '').replace(/^["']|["']$/g, '').trim();
  const resolved = path.resolve(WORKSPACE_DIR, cleaned);
  if (!resolved.toLowerCase().startsWith(WORKSPACE_DIR.toLowerCase())) {
    throw new Error('Access denied: Path is outside the 9LMNTS workspace.');
  }
  return resolved;
}

function runCommandAction(rawCommand) {
  return new Promise((resolve) => {
    const cmd = String(rawCommand || '').trim();
    if (!cmd || cmd.toUpperCase() === 'NONE') {
      return resolve({ ok: true, command: 'NONE', output: 'No command specified.' });
    }

    const startTime = Date.now();
    const finish = (ok, output) => {
      const entry = {
        id: Date.now(),
        command: cmd,
        ok,
        durationMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        output: String(output).slice(0, 12000)
      };
      lastCommandOutput = `[${entry.timestamp}] $ ${cmd}\n${entry.output}`;
      commandHistory.push(entry);
      // Automatically sync updated output to Google Docs if configured
      syncToGoogleDocs(true).catch(() => {});
      resolve(entry);
    };

    const lower = cmd.toLowerCase();

    if (lower === 'build' || lower === 'npm run build') {
      exec('node build.js', { cwd: WORKSPACE_DIR, timeout: 30000 }, (err, stdout, stderr) => {
        finish(!err, (stdout || '') + (stderr ? '\nSTDERR:\n' + stderr : '') + (err ? '\nERROR: ' + err.message : ''));
      });
      return;
    }

    if (lower === 'status') {
      const summary = getBrainSummary();
      const out = [
        `Workspace: ${summary.workspace}`,
        `HTML Stations & Arenas: ${summary.htmlPagesCount}`,
        `Dist Bundle Ready: ${summary.distBundleReady} (${summary.distFilesCount} items)`,
        `Google Docs Last Sync: ${summary.lastSyncStatus.syncedAt || 'Not synced yet'}`
      ].join('\n');
      finish(true, out);
      return;
    }

    if (lower === 'list' || lower === 'ls' || lower === 'dir') {
      const files = fs.readdirSync(WORKSPACE_DIR);
      finish(true, files.join('\n'));
      return;
    }

    if (lower.startsWith('read ')) {
      try {
        const target = cmd.slice(5).trim();
        const fullPath = safeResolveWorkspaceFile(target);
        if (!fs.existsSync(fullPath)) {
          return finish(false, `File not found: ${target}`);
        }
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split(/\r?\n/).slice(0, 300).join('\n');
        finish(true, `=== FILE: ${target} (First 300 lines) ===\n${lines}`);
      } catch (e) {
        finish(false, e.message);
      }
      return;
    }

    if (lower === 'sync') {
      syncToGoogleDocs(true)
        .then((res) => finish(res.ok, JSON.stringify(res, null, 2)))
        .catch((err) => finish(false, err.message));
      return;
    }

    // Custom shell command execution inside workspace
    const cfg = loadConfig();
    const shellCmd = lower.startsWith('exec ') ? cmd.slice(5).trim() : cmd;
    if (!cfg.allowShell) {
      return finish(false, 'Custom shell commands are disabled. Use build, status, list, or read <file>.');
    }

    exec(shellCmd, { cwd: WORKSPACE_DIR, timeout: 30000 }, (err, stdout, stderr) => {
      const combined = (stdout || '') + (stderr ? '\n' + stderr : '') + (err ? '\nExit Error: ' + err.message : '');
      finish(!err, combined.trim() || '(Command completed with no output)');
    });
  });
}

function httpsRequestJson(urlStr, method = 'GET', bodyObj = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const bodyData = bodyObj ? JSON.stringify(bodyObj) : null;
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method,
      headers: {
        'Accept': 'application/json',
        ...(bodyData ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(bodyData)
        } : {})
      }
    };

    const req = https.request(options, (res) => {
      // Follow 302 redirects from Google Apps Script Web Apps
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) && res.headers.location) {
        return httpsRequestJson(res.headers.location, 'GET', null).then(resolve).catch(reject);
      }
      let raw = '';
      res.on('data', chunk => (raw += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(raw));
        } catch (e) {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, raw: raw.slice(0, 500) });
        }
      });
    });
    req.on('error', reject);
    if (bodyData) req.write(bodyData);
    req.end();
  });
}

async function syncToGoogleDocs(clearCommand = false) {
  const cfg = loadConfig();
  if (!cfg.googleScriptUrl) {
    return { ok: false, error: 'No GOOGLE_SCRIPT_WEBHOOK_URL configured yet.' };
  }
  try {
    const summary = getBrainSummary();
    const res = await httpsRequestJson(cfg.googleScriptUrl, 'POST', {
      key: cfg.secretKey,
      clearCommand,
      lastCommandOutput,
      brainMarkdown: summary.markdown
    });
    lastSyncStatus = {
      syncedAt: new Date().toISOString(),
      docUrl: res.docUrl || lastSyncStatus.docUrl,
      error: res.ok === false ? res.error : null
    };
    return res;
  } catch (err) {
    lastSyncStatus.error = err.message;
    return { ok: false, error: err.message };
  }
}

async function pollGoogleDocsForCommand() {
  const cfg = loadConfig();
  if (!cfg.googleScriptUrl) return;
  try {
    const pollUrl = `${cfg.googleScriptUrl}${cfg.googleScriptUrl.includes('?') ? '&' : '?'}action=poll&key=${encodeURIComponent(cfg.secretKey)}`;
    const res = await httpsRequestJson(pollUrl, 'GET');
    if (res && res.docUrl) {
      lastSyncStatus.docUrl = res.docUrl;
    }
    if (res && res.pendingCommand && res.pendingCommand !== 'NONE') {
      console.log(`⚡ [Google Docs Bridge] Executing mobile command: ${res.pendingCommand}`);
      await runCommandAction(res.pendingCommand);
    }
  } catch (err) {
    // Non-fatal polling error
  }
}

function attachBridgeRoutes(req, res, pathname, parsedUrl) {
  if (!pathname.startsWith('/api/remote/')) return false;

  const corsHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-9LMNTS-Token'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return true;
  }

  const cfg = loadConfig();
  const providedKey = req.headers['x-9lmnts-token'] || parsedUrl.searchParams.get('key') || '';

  // Public/Token-checked Brain endpoint (for Gemini / mobile / n8n)
  if (pathname === '/api/remote/brain' && req.method === 'GET') {
    const format = parsedUrl.searchParams.get('format');
    const summary = getBrainSummary();
    if (format === 'md' || format === 'text') {
      res.writeHead(200, { ...corsHeaders, 'Content-Type': 'text/markdown; charset=utf-8' });
      res.end(summary.markdown);
      return true;
    }
    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({ ok: true, ...summary, hasGoogleScriptUrl: Boolean(cfg.googleScriptUrl) }));
    return true;
  }

  // Verify secret key for mutating or file-reading operations
  if (providedKey !== cfg.secretKey) {
    res.writeHead(401, corsHeaders);
    res.end(JSON.stringify({ ok: false, error: 'Invalid Security Pin (Default is 9999)' }));
    return true;
  }

  if (pathname === '/api/remote/exec' && (req.method === 'POST' || req.method === 'GET')) {
    if (req.method === 'GET') {
      const cmd = parsedUrl.searchParams.get('cmd') || 'status';
      runCommandAction(cmd).then((result) => {
        res.writeHead(200, corsHeaders);
        res.end(JSON.stringify(result));
      });
      return true;
    }

    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body); } catch (e) {}
      const cmd = parsed.command || parsed.cmd || 'status';
      runCommandAction(cmd).then((result) => {
        res.writeHead(200, corsHeaders);
        res.end(JSON.stringify(result));
      });
    });
    return true;
  }

  if (pathname === '/api/remote/config' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const updated = saveConfig({
          googleScriptUrl: parsed.googleScriptUrl !== undefined ? parsed.googleScriptUrl.trim() : cfg.googleScriptUrl,
          telegramBotToken: parsed.telegramBotToken !== undefined ? parsed.telegramBotToken.trim() : cfg.telegramBotToken
        });
        syncToGoogleDocs(false).then((syncRes) => {
          res.writeHead(200, corsHeaders);
          res.end(JSON.stringify({ ok: true, configSaved: true, hasGoogleScriptUrl: Boolean(updated.googleScriptUrl), syncRes }));
        });
      } catch (e) {
        res.writeHead(400, corsHeaders);
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return true;
  }

  return false;
}

function startBackgroundPoller() {
  const cfg = loadConfig();
  let leadEngine = null;
  try {
    leadEngine = require('./9lmnts-lead-engine');
  } catch (e) {}

  setInterval(() => {
    pollGoogleDocsForCommand();
    if (leadEngine && typeof leadEngine.processIncomingLeadQueue === 'function') {
      try {
        leadEngine.processIncomingLeadQueue();
      } catch (err) {}
    }
  }, cfg.pollIntervalMs || 10000);
}

module.exports = {
  attachBridgeRoutes,
  startBackgroundPoller,
  runCommandAction,
  syncToGoogleDocs,
  getBrainSummary
};

// If executed directly (`node remote-bridge.js [cmd]`), run command or start standalone listener
if (require.main === module) {
  const argCmd = process.argv.slice(2).join(' ');
  if (argCmd) {
    runCommandAction(argCmd).then((res) => {
      console.log(res.output);
      process.exit(res.ok ? 0 : 1);
    });
  } else {
    console.log('⚡ 9LMNTS Remote Bridge Polling Daemon Active (Polling Google Docs every 10s)...');
    syncToGoogleDocs(false).then((r) => {
      if (r.ok) console.log('✅ Initial Brain Synced to Google Docs:', r.docUrl);
    });
    startBackgroundPoller();
  }
}
