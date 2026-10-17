/**
 * ============================================================================
 * 9LMNTS STUDIO — GOOGLE DOCS / DRIVE <-> PC MIDDLEMAN BRIDGE (Google Apps Script)
 * ============================================================================
 * HOW TO DEPLOY (Takes 60 seconds, 100% Free):
 * 1. Go to https://script.google.com and click "New Project".
 * 2. Paste this entire file into Code.gs and click Save.
 * 3. Click "Deploy" -> "New deployment" -> Select type: "Web app".
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (secured by your SECRET_KEY below)
 * 4. Copy the Web App URL and set it when running `node remote-bridge.js` on your PC:
 *    $env:GOOGLE_SCRIPT_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
 *    node remote-bridge.js
 *
 * HOW IT WORKS WITH YOUR GEMINI PHONE APP:
 * - This script creates a Google Doc in your Google Drive named:
 *   "9LMNTS_GEMINI_LIVE_BRAIN"
 * - The Gemini Mobile App on your phone can natively read this Doc anytime when you ask:
 *   "@Google Drive read 9LMNTS_GEMINI_LIVE_BRAIN"
 * - To run a command from your phone:
 *   Option A: Open the "9LMNTS_GEMINI_LIVE_BRAIN" Google Doc on your phone and type on Line 1:
 *             RUN_CMD: npm run build
 *   Option B: Open the Web App URL on your phone with ?key=9999&cmd=npm%20run%20build
 *   Your PC polls this bridge every 10 seconds, runs the command locally, and writes the
 *   terminal output directly back into the Google Doc so the Gemini app can read it!
 * ============================================================================
 */

const DOC_NAME = '9LMNTS_GEMINI_LIVE_BRAIN';
const ARGON_SALES_DOC_ID = '1pJ7A3exVPTqEcrganOWzoJaTGCZzcjVHt8K_M4DX_tA'; // ARGON_AUTONOMOUS_SALES_ENGINE.md
const OUTBOUND_ARCH_DOC_ID = '1xZo1_QRkBbflrLX8mpjSkSh3M9s_OP6EzhI8PI9vcYI'; // 9LMNTS_STUDIO_OUTBOUND_SALES_ARCHITECTURE.md
const SECRET_KEY = '9999'; // Change this to your preferred PIN/token


function getOrCreateBrainDoc() {
  const files = DriveApp.getFilesByName(DOC_NAME);
  if (files.hasNext()) {
    return DocumentApp.openById(files.next().getId());
  }
  const doc = DocumentApp.create(DOC_NAME);
  const body = doc.getBody();
  body.setText(
    'RUN_CMD: NONE\n' +
    '====================================================================\n' +
    '9LMNTS STUDIO V5 — GEMINI MOBILE APP LIVE BRAIN & TERMINAL TELEMETRY\n' +
    '====================================================================\n' +
    'Status: Waiting for initial sync from PC (remote-bridge.js)...\n'
  );
  doc.saveAndClose();
  return DocumentApp.openById(doc.getId());
}

/**
 * GET Handler:
 * - Used by PC daemon (`remote-bridge.js`) to poll for pending commands (`?action=poll&key=9999`)
 * - Used by Phone / Gemini / Browser to queue a command (`?action=cmd&key=9999&cmd=node%20build.js`)
 */
function doGet(e) {
  const params = (e && e.parameter) || {};
  if (params.key !== SECRET_KEY) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized key' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const doc = getOrCreateBrainDoc();
  const body = doc.getBody();
  const fullText = body.getText();

  // Phone / Webhook queueing a command via GET URL
  if (params.cmd) {
    const updated = fullText.replace(/^RUN_CMD:.*$/m, 'RUN_CMD: ' + params.cmd);
    if (updated === fullText) {
      body.insertParagraph(0, 'RUN_CMD: ' + params.cmd);
    } else {
      body.setText(updated);
    }
    doc.saveAndClose();
    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      queuedCommand: params.cmd,
      docUrl: doc.getUrl()
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // PC Polling for any `RUN_CMD: <command>` written at top of Google Doc
  const match = fullText.match(/^RUN_CMD:\s*(.+)$/m);
  let pendingCommand = null;
  if (match && match[1] && match[1].trim() !== 'NONE') {
    pendingCommand = match[1].trim();
    // Reset RUN_CMD to RUNNING so it only runs once
    body.setText(fullText.replace(/^RUN_CMD:\s*(.+)$/m, 'RUN_CMD: NONE (Executing: ' + pendingCommand + ')'));
    doc.saveAndClose();
  }

  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    pendingCommand: pendingCommand,
    docUrl: doc.getUrl()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST Handler:
 * - Used by PC daemon (`remote-bridge.js`) to push workspace state, upgrade reports,
 *   and terminal command outputs straight into the Google Doc so the Gemini Phone App can read it.
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.key !== SECRET_KEY) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized key' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const doc = getOrCreateBrainDoc();
    const body = doc.getBody();
    const existingText = body.getText();
    const cmdLineMatch = existingText.match(/^RUN_CMD:\s*(.+)$/m);
    const firstLine = (cmdLineMatch && !payload.clearCommand) ? cmdLineMatch[0] : 'RUN_CMD: NONE';

    const newDocContent = [
      firstLine,
      '====================================================================',
      '9LMNTS STUDIO V5 — GEMINI MOBILE LIVE BRAIN & COMMAND OUTPUT',
      'Last Synced from PC: ' + new Date().toISOString(),
      'To execute a command from your phone, change Line 1 above to:',
      'RUN_CMD: build | status | read <filepath> | deploy | <shell command>',
      '====================================================================',
      '',
      '--- LATEST TERMINAL / COMMAND EXECUTION OUTPUT ---',
      payload.lastCommandOutput || 'No commands executed yet in this session.',
      '',
      '--- LIVE WORKSPACE & V5 UPGRADE BRAIN ---',
      payload.brainMarkdown || ''
    ].join('\n');

    body.setText(newDocContent);
    doc.saveAndClose();

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      docId: doc.getId(),
      docUrl: doc.getUrl(),
      syncedAt: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
