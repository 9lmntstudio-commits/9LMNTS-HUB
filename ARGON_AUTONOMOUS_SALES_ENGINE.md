# ARGON AUTONOMOUS SALES ENGINE — MASTER COMMAND & QUEUE LEDGER

**Google Drive Master Doc ID**: `1pJ7A3exVPTqEcrganOWzoJaTGCZzcjVHt8K_M4DX_tA`  
**Architecture Spec Doc ID**: `1xZo1_QRkBbflrLX8mpjSkSh3M9s_OP6EzhI8PI9vcYI`  
**Engine Operator**: Argon (9LMNTS Studio Autonomous Outbound Engine)  
**Active Polling Daemon**: `node 9lmnts-lead-engine.js --watch` (Polls every 10s via Local FS + Google Docs Bridge)

---

## 1. DEPOSIT-FIRST AUTONOMOUS PIPELINE (ZERO FREE WORK LAW)

> **HARD OPERATIONAL LAW — NO MORE FREE WORK & PAYMENT SEPARATION:**  
> 1. **How Clients Pay 9LMNTS Studio (B2B Sprint Kickoff)**: Custom client builds and staging deployments are **strictly forbidden** before a **Signed Sprint Contract Agreement + verified 50% non-refundable Interac e-Transfer deposit (`$1,100 CAD` to `9lmntsstudio@gmail.com`)** is received.  
> 2. **How Customers Pay on the Client's Website (B2C Website Checkout)**: Every `Chef OS` website we build features integrated **Stripe Online Checkout** (Visa, Mastercard, Amex, 1-Tap Apple Pay, Google Pay, and 4× installments) so the restaurant's customers can pay online for direct food orders and 50% catering deposits.

Every lead in the **INCOMING LEAD QUEUE** is processed strictly through this **Deposit-First** sequence:

- **PHASE 1 — FRICTION AUDIT & ARCHITECTURAL PROPOSAL (ZERO CODE)**:
  - Extract Business Name, Decision Maker / Owner, Locations, Phone Numbers, Instagram Handle, and Revenue Friction Points.
  - Prepare the **6 Unified Dark Mode Concept Slides + 1-Page Sprint Contract Agreement + 50% Interac e-Transfer Deposit Invoice (`$1,100 CAD` to `9lmntsstudio@gmail.com`)**.
- **PHASE 2 — OUTREACH & CONTRACT + 50% E-TRANSFER DEPOSIT GATE (HARD LOCK)**:
  - Send the personalized 30-second Voice Note + Concept Previews + Sprint Contract & 50% Interac e-Transfer Invoice.
  - **STOP GATE**: Do **not** hand over or deploy any custom client code until the **Contract is signed and the 50% Interac e-Transfer deposit (`$1,100 CAD`)** is received.
- **PHASE 3 — POST-DEPOSIT FULFILLMENT SPRINT (ONLY AFTER PAYMENT)**:
  - Once the 50% Interac e-Transfer deposit is verified (`PAID`), unlock the local boilerplate vault, connect the client's Stripe merchant account for their website customers, and deploy to production upon final 50% balance completion.

---

## 2. INCOMING LEAD QUEUE (DEPOSIT-GATED)

| Target_ID | Business_Name | Decision_Maker | Locations | Vertical | Deposit_Status | Build_Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TARGET-01` | **Margo Caribbean & Canadian Restaurant** | Kivenson Augustin | 606 Rideau St & 1563 Bank St, Ottawa | Chef OS & Catering Engine | `SCHEDULED_MONDAY_930AM (CONTRACT + $1,100 E-TRANSFER)` | `LOCKED IN LOCAL VAULT (NO FREE DEPLOY)` |
| `TARGET-02` | **Island Flava** | Lennox Antoine | 412 Dalhousie St, Ottawa | Chef OS & Catering Engine | `DOSSIER_READY (CONTRACT + $1,100 E-TRANSFER)` | `data/island_flava_outreach_copy.md` |
| `TARGET-03` | **Baccanalle** | Chef Resa Solomon-St. Lewis | 595 Montreal Rd, Ottawa | Chef OS & Catering Engine | `DOSSIER_READY (CONTRACT + $1,100 E-TRANSFER)` | `data/baccanalle_outreach_copy.md` |
| `TARGET-04` | **Tipikliz Caribbean Restaurant** | Head Chef / Owner | 4025 Innes Rd #10, Orléans | Chef OS & Catering Engine | `DOSSIER_READY (CONTRACT + $1,100 E-TRANSFER)` | `data/tipikliz_outreach_copy.md` |
| `TARGET-05` | **Rozo Caribbean Restaurant** | Head Chef / Management | 253 St. Patrick St, ByWard Market | Chef OS & Sound Clash OS | `DOSSIER_READY (CONTRACT + $1,100 E-TRANSFER)` | `data/rozo_outreach_copy.md` |

---

## 3. TARGET-01 DOSSIER: MARGO CARIBBEAN & CANADIAN RESTAURANT (`DEPOSIT-FIRST`)
- **Owner / Decision Maker**: Kivenson Augustin (`@margocaribbean`)
- **Locations**:
  - Hub 01: 606 Rideau St, Ottawa, ON — `(613) 241-1400`
  - Hub 02: 1563 Bank St, Ottawa, ON — `(613) 421-4005`
- **Website Features for Margo's Customers (Stripe B2C Checkout)**:
  - Dual-Hub Kitchen Switcher (`606 Rideau St` vs. `1563 Bank St`)
  - 0%-Commission Direct Online Menu (*Griot Royal, Diri Djon Djon, Tassot Cabrit, Grand Fritaille, Griot Poutine*)
  - Automated Catering Quote Slider (`15–300+ guests`, `$18–$24/person`) with **50% Stripe Online Catering Deposit Checkout** paid directly by Margo's customers
- **Studio Financial Gate (Margo -> 9LMNTS Studio)**: `$2,200 CAD` Total Sprint (**Signed Sprint Contract Agreement + `$1,100 CAD` 50% Interac e-Transfer Deposit to `9lmntsstudio@gmail.com`** required before custom build delivery).
