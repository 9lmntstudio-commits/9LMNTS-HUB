# 9LMNTS STUDIO V5 — GEMINI MOBILE APP LIVE BRAIN & REMOTE COMMAND PROTOCOL

**Workspace Path**: `c:\Users\Darnl\Downloads\9LMNTS Studio cyber V2`  
**Production Domain**: `https://9lmntsstudio.com`  
**Architecture Standard**: Master Redesign & Interactive Architecture Specification V5  
**Security Pin / Token**: `9999` (Configurable via `BRIDGE_SECRET`)

---

## 1. HOW TO USE THIS FILE IN THE GEMINI PHONE APP
When this file is saved or auto-synced to your Google Drive as **`9LMNTS_GEMINI_LIVE_BRAIN`**, open the **Gemini Mobile App** on your phone and type:

- **To read your workspace & latest terminal output**:
  > `@Google Drive read 9LMNTS_GEMINI_LIVE_BRAIN and summarize the current status and last command output.`
- **To read a specific file from your PC**:
  > Set Line 1 of `9LMNTS_GEMINI_LIVE_BRAIN` to `RUN_CMD: read services.html` (or tap **Read File** in `/remote-cockpit.html` on your phone), wait 10 seconds, then ask Gemini:  
  > `@Google Drive read 9LMNTS_GEMINI_LIVE_BRAIN and analyze the file output.`
- **To run a build or command from your phone**:
  > Set Line 1 of `9LMNTS_GEMINI_LIVE_BRAIN` to `RUN_CMD: build` (or `RUN_CMD: status`, `RUN_CMD: dir`, `RUN_CMD: git status`), and your PC's `remote-bridge.js` daemon will execute it and write the full output back into the Google Doc automatically.

---

## 2. V5 UPGRADE AUDIT & WORKSPACE STATUS (29 GOOGLE DOCS + DRIVE)

All **29 Google Docs (`.docx`)** and **Google Drive asset archives** have been audited and reconciled into the active production codebase (`dist/`):

1. **All 25 Competition OS Arenas + `clash.html` Fixed & Bundled**:
   - Fixed the missing `openPayPalCheckout()`, `closePayPalModal()`, and `executePayPalOrder()` JavaScript functions across all 26 arena files (`01_Sound_Clash_OS.html` through `25_Illusion_Clash_OS_Magic_Arena.html` + `clash.html`).
   - Updated `build.js` and `sitemap.xml` to bundle and index all 25 Competition OS arenas instead of only 5.
2. **Station 02 (`loa.html`) — 5-Tier Backer Matrix & PayPal E-Commerce Modal**:
   - Replaced placeholder `paypal.com` links with the interactive PayPal E-Commerce + Pay in 4 checkout modal.
   - Added Tier 05 (`$2,500 CAD — Ptah Executive Patron / Vault 9 Immortal`) to complete the 5-tier reward matrix (`$25`, `$75`, `$150`, `$500`, `$2,500 CAD`).
3. **Station 05 (`ai-voice.html`) — Day-1 Zero-State Telemetry & ManyChat Matrix**:
   - Added Day-1 Zero-State Production Mode (`$0.00 CAD` active revenue, `0 Leads`, and 3 actionable Commercial Sponsorship Slots: Title Arena Sponsor `$2,500`, Prize Pot Partner `$1,000`, WebAR Brand Activation `$1,500`) alongside a toggleable Client Sandbox Demo.
   - Added the 6 ManyChat & Supabase Edge Keyword Triggers (`CLASH`, `COMEDY`, `ARTIST`, `BALLER`, `DEV`, `SPONSOR`) and interactive AI Voice & Text Operator Drawer.
4. **Station 06 (`services.html`) — Promo Reel Player & 25-Arena Launcher Grid**:
   - Imported `assets/videos/9LMNTS_Artist_OS_Reel.mp4` and added a dual-reel switcher (`Artist OS & Studio Reel` + `Event OS Arena Reel`).
   - Added the **Engine 2: All 25 Live Competition OS Verticals** launcher grid.
5. **Station 08 (`merch.html`) & `04_Runway_OS_Fashion_Battle.html` — Darnley 2027 Lookbook & 18-Product Phygital Matrix**:
   - Imported October 6, 2026 Drive Runway & Kemet Gold lookbook plates into `assets/images/`.
   - Added the 18-product Phygital Merch & Wearable Advertising catalog (`350 GSM` tees, `450 GSM` hoodies, NFC/QR sleeve badges) and interactive PayPal + Pay in 4 pre-order checkout modal.

---

## 3. REMOTE COMMAND ALIASES SUPPORTED BY `remote-bridge.js`

| Command String (`RUN_CMD: ...`) | Action Executed on PC |
| :--- | :--- |
| `build` | Runs `node build.js` and returns full production bundle log |
| `status` | Returns workspace file count, `dist/` status, git status, and active ports |
| `list` | Lists all files in `c:\Users\Darnl\Downloads\9LMNTS Studio cyber V2` |
| `read <filepath>` | Reads the first 400 lines of any workspace file (e.g. `read ai-voice.html`) |
| `sync` | Forces an immediate push of the workspace brain to Google Docs / Drive |
| `exec <command>` | Runs a shell command inside the workspace directory (when `ALLOW_SHELL=true`) |

---

## 4. ARGON AUTONOMOUS OUTBOUND ENGINE STATUS

- **Master Docs Synchronized**:
  - `ARGON_AUTONOMOUS_SALES_ENGINE.md` (Doc ID: `1pJ7A3exVPTqEcrganOWzoJaTGCZzcjVHt8K_M4DX_tA`)
  - `9LMNTS_STUDIO_OUTBOUND_SALES_ARCHITECTURE.md` (Doc ID: `1xZo1_QRkBbflrLX8mpjSkSh3M9s_OP6EzhI8PI9vcYI`)
- **Target 01 (Margo Caribbean & Canadian Restaurant)**:
  - Live Staging Demo: `https://9lmntsstudio.com/margo` (`margo.html`)
  - Features: Rideau St (`606 Rideau`) vs. Bank St (`1563 Bank`) Hub Switcher, Griot & Diri Djon Djon Signatures, Dynamic Catering Deposit Slider (15–300+ guests, 25% deposit + PayPal Pay in 4), EN/FR/Kreyòl toggle.
- **Ottawa Hospitality Lead Sweep**:
  - 50 Independent & Caribbean Restaurants exported to `data/ottawa_hospitality_leads.csv`.
- **Active Listener**:
  - `9lmnts-lead-engine.js --watch` daemon + 5-minute standing schedule polling `INCOMING LEAD QUEUE` for automatic Phase 1–3 execution.

