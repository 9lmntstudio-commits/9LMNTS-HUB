# 9LMNTS Studio — Master Operating Constitution (`AGENTS.md`)

These rules apply unconditionally across the entire `9LMNTS Studio cyber V2` workspace (`9lmntsstudio.com` & Argon Autonomous Outbound Engine).

## 1. Zero Free Work Law (Local Vault Lock)
- **Never deploy unpaid client builds (`margo.html`, `businessmeter.html`, or any future `demo-*.html`) to the public `dist/` folder or Netlify production.**
- Unpaid prospect prototypes must remain strictly in the local studio workspace for internal screenshot capture (`chrome-devtools-mcp`) and visual concept packaging (`assets/<slug>/outreach_slides/`).
- Only add a client HTML file to `build.js` and `_redirects` after the user explicitly confirms that the **Signed 1-Page Sprint Contract Agreement + 50% Interac e-Transfer Deposit (`$1,100 CAD` to `9lmntsstudio@gmail.com`)** has been received.

## 2. Two-Layer Payment Architecture
Always maintain a strict separation between how clients pay **9LMNTS Studio** vs. how customers pay on the **client's website**:
1. **B2B Agency Kickoff (Client → 9LMNTS Studio)**:
   - **Method**: **Signed 1-Page Sprint Contract Agreement + 50% Interac e-Transfer Deposit (`$1,100 CAD` on a `$2,200 CAD` 7-day sprint)** sent to `9lmntsstudio@gmail.com` (`Memo: <CLIENT>-CHEF-OS-50`).
   - **Balance**: Remaining 50% (`$1,100 CAD`) via Interac e-Transfer prior to live DNS cutover.
2. **B2C Website Checkout (Client's Customers → Client)**:
   - **Method**: **Stripe Online Checkout** integrated directly into the client's website (`margo.html`, `boilerplates/chef-os/`) supporting **Visa, Mastercard, Amex, 1-Tap Apple Pay, Google Pay, and 4× Installment Split** for 0%-commission direct menu orders and automatic **50% customer catering deposits**.

## 3. Unified Slide 1 Dark Mode Aesthetic (`DESIGN.md`)
- All `Chef OS` and luxury hospitality builds must adhere to the **Unified Slide 1 Dark Mode** specification in [`DESIGN.md`](file:///c:/Users/Darnl/Downloads/9LMNTS%20Studio%20cyber%20V2/DESIGN.md):
  - **Primary Canvas**: `#130F0C` (`--espresso-deep`) & `#1E1814` (`--espresso-card`)
  - **Card Surface**: `#211A15` smoked espresso-obsidian with `1px solid rgba(198, 156, 109, 0.18)` hairline borders
  - **Accents & Pricing**: `#C69C6D` (`--camel-gold`) primary buttons/pills and `#E5C178` (`--gold-bright`) price tags & ratings
  - **Typography**: `Playfair Display` (headings), `Plus Jakarta Sans` (UI/body), `Alex Brush` (culinary host signature)

## 4. 100% Authentic Cultural Dish & Host Photography
- Never use generic stock placeholders or mismatched food photos for restaurant builds.
- Every menu card must use authentic, dish-accurate culinary photography on matte-black stoneware (`assets/<slug>/`), and every Culinary Host / Founder portrait must feature a **clean, unbranded espresso chef coat** (zero third-party logos or watermarks).

## 5. Visual Review Delivery Standard
- Never ask the user to copy/paste raw HTML code into a browser to preview UI/UX.
- Always render the local file in `chrome-devtools-mcp` at `1440×1020`, hide `.floating-dock` during section captures, use cache-busted filenames when updating screenshots, and present a clickable multi-slide ````carousel artifact.
