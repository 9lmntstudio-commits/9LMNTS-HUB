#!/usr/bin/env node
/**
 * ============================================================================
 * 9LMNTS-LEAD-ENGINE & ARGON DEPOSIT-FIRST OUTBOUND GENERATOR
 * ============================================================================
 * Enforces the 9LMNTS Studio Operating Constitution (.agents/rules/AGENTS.md):
 *   1. ZERO FREE WORK: Never generates public live staging links prior to deposit.
 *   2. B2B STUDIO PAYMENT: Signed 1-Page Sprint Contract Agreement + 50% Interac
 *      e-Transfer Deposit ($1,100 CAD to 9lmntsstudio@gmail.com).
 *   3. B2C WEBSITE CHECKOUT: Pitches built-in Stripe Online Checkout (Card, Apple
 *      Pay, Google Pay, 4x Split) so the client's customers can pay online.
 *
 * CLI Usage:
 *   node 9lmnts-lead-engine.js --once
 *   node 9lmnts-lead-engine.js --watch
 *   node 9lmnts-lead-engine.js --dossier --name "Island Flava" --owner "Lennox Antoine" --locations "412 Dalhousie St, Ottawa" --phone "(613) 321-4198" --handle "@islandflavaottawa" --output "data/island_flava_outreach_copy.md"
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const ENGINE_MD_PATH = path.join(ROOT_DIR, 'ARGON_AUTONOMOUS_SALES_ENGINE.md');
const LEADS_CSV_PATH = path.join(ROOT_DIR, 'data', 'ottawa_hospitality_leads.csv');
const OUTREACH_LOG_PATH = path.join(ROOT_DIR, 'data', 'argon_outreach_ready.json');

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 32);
}

function generateDepositFirstDossier({ businessName, ownerName, locations, phone, handle, vertical = 'Chef OS & Catering Engine', packagePriceCad = 2200 }) {
  const slug = slugify(businessName.split(' ').slice(0, 2).join('_') || 'client');
  const codeSlug = slug.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
  const firstName = (ownerName || 'Chef').split(' ')[0];
  const depositCad = (packagePriceCad * 0.5).toFixed(2);
  const balanceCad = (packagePriceCad * 0.5).toFixed(2);

  const markdown = `# TARGET DOSSIER: ${businessName.toUpperCase()} — DEPOSIT-FIRST OUTBOUND DOSSIER (\`${vertical}\`)

> **OPERATIONAL RULE — ZERO FREE WORK + DUAL PAYMENT SEPARATION:**  
> 1. **${businessName} Paying 9LMNTS Studio (B2B Project Deposit)**: **Signed 7-Day Sprint Contract Agreement + 50% Interac e-Transfer Deposit (\`$${depositCad} CAD\` to \`9lmntsstudio@gmail.com\`)** required before build handoff/deployment.  
> 2. **${businessName}'s Customers Ordering Online (B2C Website Checkout)**: **Stripe Online Checkout** (Visa, Mastercard, Amex, 1-Tap Apple Pay, Google Pay & 4× Installment Split) built into the website for direct dish orders and 50% catering deposits.

- **Target**: ${businessName} (\`${locations}\`)
- **Decision Maker / Owner**: ${ownerName || 'Owner / Executive Chef'} (\`${handle || 'Direct'}\`)
- **Phone**: \`${phone || 'Ottawa'}\`
- **In-House Concept Visuals**: Attach the 6 approved Unified Dark Mode concept slides (\`assets/${slug}/outreach_slides/\` or \`assets/margo/outreach_slides/\`)
- **Production Package**: \`$${packagePriceCad.toLocaleString()} CAD\` (\`Signed Sprint Contract Agreement + 50% Interac e-Transfer Deposit = $${depositCad} CAD\` to \`9lmntsstudio@gmail.com\` before build execution)

---

## 1. 30-SECOND VOICE SCRIPT (CONTRACT + 50% E-TRANSFER TO 9LMNTS / STRIPE FOR CUSTOMERS)

> **[0:00 – Hook (EN / FR / Kreyòl)]**  
> *"Sak pase ${firstName}! Respect to you and the whole team at ${businessName} (${locations}). My name is Darnley from 9LMNTS Studio here in Ottawa — huge fan of what you're building."*
>
> **[0:09 – The Revenue Friction & Stripe Website Solution]**  
> *"Right now, when someone wants ${businessName} to cater an office lunch for 30 people or a wedding for 200, or order direct without paying 30% UberEats fees, there’s no instant online catering checkout on your site. At 9LMNTS Studio, we built our **Chef OS & Automated Catering Engine** specifically for Ottawa hospitality leaders."*
>
> **[0:24 – How Customers Pay ${businessName} vs. How We Kick Off]**  
> *"On your website, your customers can slide their guest count from **15 to 300+ guests ($18–$24/person)** and pay ${businessName} a **50% catering deposit online instantly via Stripe, Credit Card, or Apple Pay**. I attached the dark-mode visual blueprint right below — if you want us to launch this for ${businessName} in a 7-day sprint, we just send over our **1-Page Sprint Contract Agreement + 50% Interac e-Transfer deposit ($${depositCad} CAD)** to lock in your build. Let me know if you have 5 minutes today!"*

---

## 2. 1-TAP DM / WHATSAPP COPY (ATTACH THE 6 DARK MODE SLIDES)

**🇬🇧 ENGLISH VERSION:**
> Respect ${firstName}! 🔥 Put together the architectural blueprint for a custom **${businessName} Chef OS & Catering Engine** for \`${locations}\` (see the 6 dark-mode concept previews attached):
>
> **What we deploy for ${businessName}'s customers in a 7-Day Sprint:**
> ✅ **Built-in Stripe Online Checkout for Your Customers** — Your guests can order signature plates or book catering (\`15–300+ guests, $18–$24/person\`) and pay ${businessName} a **50% catering deposit online instantly via Stripe (Visa, Mastercard, Apple Pay, Google Pay, or 4× installments)** with 0% UberEats commission
> ✅ **1-Tap EN / FR / Kreyòl Toggle** for Ottawa–Gatineau bilingual guests
>
> **How we work together:** Our turnkey 7-day Chef OS sprint is **$${packagePriceCad.toLocaleString()} CAD**. To kick off your build, we sign a simple **1-Page Sprint Contract Agreement + 50% Interac e-Transfer deposit ($${depositCad} CAD)**, with the remaining 50% due only once your new system is live.
>
> Free for a quick 5-minute call today so I can walk you through the blueprint and send over the agreement?
> — **Darnley | 9LMNTS Studio (Ottawa)**

---

**🇫🇷 VERSION FRANÇAISE / BILINGUE (OTTAWA–GATINEAU):**
> Salut ${firstName} ! 🔥 J'ai préparé le plan architectural (voir les 6 maquettes ci-jointes) pour déployer le système **${businessName} Chef OS & Calculateur Traiteur** (\`${locations}\`) :
>
> ✅ **Paiement en ligne Stripe intégré pour TES clients (0% commission)** : Tes clients commandent leurs plats ou réservent un service traiteur (\`15 à 300+ invités, 18$ à 24$/pers.\`) et paient ${businessName} directement en ligne par **Stripe (Carte de crédit, Apple Pay, Google Pay ou 4 versements)**
> ✅ **Bascule EN / FR / Kreyòl** instantanée
>
> **Modalités de démarrage :** Le déploiement clé en main en 7 jours est de **${packagePriceCad.toLocaleString()} $ CAD**. On démarre avec un **Contrat de Sprint signé + dépôt de 50% (${depositCad} $ CAD) par Virement Interac (e-Transfer)**, et le solde à la mise en ligne.
>
> Dis-moi quand tu as 5 minutes aujourd'hui pour qu'on regarde ça ensemble !
> — **Darnley | 9LMNTS Studio**

---

## 3. SPRINT CONTRACT & 50% INTERAC E-TRANSFER DEPOSIT BLOCK (\`INV-9LMNTS-${codeSlug}-50LOCK\`)

\`\`\`text
===================================================================
9LMNTS STUDIO // 7-DAY SPRINT CONTRACT & 50% DEPOSIT SUMMARY
===================================================================
Agreement & Invoice Ref : INV-9LMNTS-${codeSlug}-50LOCK
Client                  : ${businessName}
Authorized Signatory    : ${ownerName || 'Authorized Owner'} (${locations})
Deliverable System      : ${vertical} (Unified Dark Mode + Stripe
                          Customer Online Ordering & Catering Engine)
Build Policy            : SIGNED CONTRACT + 50% DEPOSIT PRIOR TO BUILD
-------------------------------------------------------------------
1. WEBSITE CUSTOMER PAYMENTS (BUILT FOR CLIENT'S GUESTS):
   - Gateway            : Stripe Online Checkout (Direct to Client Bank)
   - Accepted Methods   : Visa, Mastercard, Amex, Apple Pay, Google Pay
   - Catering Flow      : Auto-collects 50% customer deposit online

2. PROJECT FEE & STUDIO PAYMENT TERMS (CLIENT -> 9LMNTS STUDIO):
   - Total Sprint Fee   : $${packagePriceCad.toFixed(2)} CAD
   - 50% Kickoff Deposit: $${depositCad} CAD (Required w/ Signed Contract)
   - 50% Launch Balance : $${balanceCad} CAD (Due on Live Cutover)
   - Payment Method     : Interac e-Transfer (Auto-Deposit Enabled)
   - e-Transfer Email   : 9lmntsstudio@gmail.com
   - Message / Memo     : ${codeSlug}-CHEF-OS-50
===================================================================
\`\`\`
`;

  return { slug, codeSlug, markdown };
}

function parseCliArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

function processIncomingLeadQueue() {
  if (!fs.existsSync(ENGINE_MD_PATH)) return { processed: 0 };

  const content = fs.readFileSync(ENGINE_MD_PATH, 'utf8');
  const lines = content.split(/\r?\n/);
  let updated = false;
  let processedCount = 0;

  let outreachQueue = [];
  if (fs.existsSync(OUTREACH_LOG_PATH)) {
    try {
      outreachQueue = JSON.parse(fs.readFileSync(OUTREACH_LOG_PATH, 'utf8'));
    } catch (e) {
      outreachQueue = [];
    }
  }

  const newLines = lines.map((line) => {
    if (line.trim().startsWith('|') && /`(?:PROCESS|NEW|AUTO)`/i.test(line)) {
      const cols = line.split('|').map((c) => c.trim());
      if (cols.length >= 8) {
        const targetId = cols[1].replace(/`/g, '');
        const businessName = cols[2].replace(/\*\*/g, '');
        const ownerName = cols[3];
        const locations = cols[4];
        const vertical = cols[5];

        const { slug, codeSlug, markdown } = generateDepositFirstDossier({
          businessName,
          ownerName,
          locations,
          vertical
        });

        const dossierFile = path.join(ROOT_DIR, 'data', `${slug}_outreach_copy.md`);
        fs.writeFileSync(dossierFile, markdown, 'utf8');

        outreachQueue.push({
          timestamp: new Date().toISOString(),
          targetId,
          businessName,
          ownerName,
          locations,
          vertical,
          invoiceRef: `INV-9LMNTS-${codeSlug}-50LOCK`,
          dossierFile: `data/${slug}_outreach_copy.md`,
          depositTerms: 'Signed 1-Page Sprint Contract + $1,100 CAD Interac e-Transfer to 9lmntsstudio@gmail.com',
          websiteCustomerGateway: 'Stripe Online Checkout (Card, Apple Pay, Google Pay, 4x Split)'
        });

        cols[6] = '`DOSSIER_READY (CONTRACT + $1,100 E-TRANSFER)`';
        cols[7] = '`LOCKED IN LOCAL VAULT (NO FREE DEPLOY)`';
        updated = true;
        processedCount++;
        return '| ' + cols.slice(1, -1).join(' | ') + ' |';
      }
    }
    return line;
  });

  if (updated) {
    fs.writeFileSync(ENGINE_MD_PATH, newLines.join('\n'), 'utf8');
    fs.writeFileSync(OUTREACH_LOG_PATH, JSON.stringify(outreachQueue, null, 2), 'utf8');
  }

  return { processed: processedCount };
}

if (require.main === module) {
  const cli = parseCliArgs(process.argv.slice(2));

  if (cli.dossier) {
    const { markdown, slug } = generateDepositFirstDossier({
      businessName: cli.name || 'Prospect Restaurant',
      ownerName: cli.owner || 'Owner & Executive Chef',
      locations: cli.locations || 'Ottawa, ON',
      phone: cli.phone || '(613) 000-0000',
      handle: cli.handle || '@prospect',
      vertical: cli.vertical || 'Chef OS & Catering Engine',
      packagePriceCad: Number(cli.price || 2200)
    });
    const outPath = path.resolve(ROOT_DIR, cli.output || path.join('data', `${slug}_outreach_copy.md`));
    fs.writeFileSync(outPath, markdown, 'utf8');
    console.log(`Success! Deposit-First Dossier written to: ${outPath}`);
    process.exit(0);
  }

  const watchMode = Boolean(cli.watch);
  const res = processIncomingLeadQueue();
  console.log(`[9LMNTS-LEAD-ENGINE] Initial pass complete. Processed: ${res.processed} lead(s).`);

  if (watchMode) {
    console.log('[9LMNTS-LEAD-ENGINE] Watching ARGON_AUTONOMOUS_SALES_ENGINE.md every 10s...');
    setInterval(() => {
      try {
        const r = processIncomingLeadQueue();
        if (r.processed > 0) {
          console.log(`[9LMNTS-LEAD-ENGINE] Processed ${r.processed} new lead(s) at ${new Date().toISOString()}`);
        }
      } catch (err) {
        console.error('[9LMNTS-LEAD-ENGINE] Poll error:', err.message);
      }
    }, 10000);
  }
}

module.exports = { processIncomingLeadQueue, generateDepositFirstDossier };
