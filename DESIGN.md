---
brand_system: "9LMNTS Studio — Master Multi-Vertical Design System (v2.0)"
stitch_compatible: true
active_profile: "CHEF_OS_CATERIX_BON_APPETIT"
tokens:
  colors:
    espresso_bg: "#171310"
    espresso_elevated: "#221C17"
    espresso_card: "#2A221C"
    ivory_bg: "#FAF6F0"
    ivory_card: "#FFFFFF"
    ivory_warm_tint: "#F3ECE1"
    bronze_primary: "#C69C6D"
    bronze_light: "#DFB78C"
    bronze_deep: "#9E7348"
    gold_squircle: "#D99B26"
    stripe_indigo: "#635BFF"
    emerald_verified: "#4ADE80"
    text_cream: "#F7F3EE"
    text_warm_muted: "#B8ACA0"
    text_ivory_dark: "#1E1915"
    text_ivory_muted: "#655B50"
  typography:
    font_display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif"
    font_serif: "'Playfair Display', Georgia, serif"
    font_script: "'Alex Brush', cursive"
    font_sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    numeric_variant: "tabular-nums"
  radii:
    pill: "999px"
    card_lg: "24px"
    card_md: "18px"
    squircle_btn: "18px"
    phone_frame: "46px"
  shadows:
    editorial_card: "0 18px 40px rgba(24, 19, 15, 0.08)"
    phone_mockup: "0 35px 80px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
    stripe_cta: "0 10px 25px rgba(99, 91, 255, 0.35)"
---

# `DESIGN.md` — 9LMNTS Studio Brand & UI/UX Specification

> **Single Source of Truth for AI Coding Agents & Google Stitch MCP**  
> Reverse-engineered from Darnley Sanon's curated reference pins (`Pin 1: Bon Appétit Mobile Plate Carousel` + `Pin 2: Caterix Luxury Event Catering`) and Apple Human Interface Guidelines (HIG).

---

## 1. Visual Architecture & Contrast Rhythm (60-30-10 Rule)

1. **Dual-Surface Editorial Rhythm**:
   - **Dark Espresso Sections (`#171310`)**: Used for high-drama hero introductions, the interactive mobile app showcase, and the bespoke catering deposit configurator.
   - **Warm Ivory Editorial Sections (`#FAF6F0`)**: Used for menu exploration (*"Explore Our Delicious Menus"*), signature dish cards, the Culinary Host biography (*"Meet Your Culinary Host"*), and 5-star client testimonials.
2. **Camel-Bronze & Amber-Gold Accents (`#C69C6D` & `#D99B26`)**:
   - Used for circular cloche brand crests, pill CTAs, range slider thumbs, and the `+` quick-order squircle dock button.
3. **Stripe Online Checkout Trust Layer (`#635BFF` & `#4ADE80`)**:
   - Used inside the deposit & checkout modal for 1-Tap Apple Pay, Google Pay, Credit/Debit Card inputs, and 4× installment splits.

---

## 2. Component & Asset Integrity Rules

- **3-Plate Overhead Circular Matte-Black Carousel (`Bon Appétit` Pattern)**:
  - Must display overhead bird's-eye food photography on circular matte-black stoneware plates (`griot_royal.jpg`, `diri_djon_djon.jpg`, `tassot_cabrit.jpg`) with a warm golden sunrise arc (`#D99B26`) behind the header.
- **4-Card Event Category Showcase (`Caterix` Pattern)**:
  - Rounded `20px` cards on `#FAF6F0` Warm Ivory with hover elevation and 1-click preset triggers into the catering calculator.
- **Culinary Host Story Card (`Caterix` Pattern)**:
  - 2-column Warm Ivory card pairing an authentic kitchen portrait (`haitian_chef_host.jpg` with clean unbranded espresso chef coat) with the cursive signature (`Alex Brush` in `#9E7348`) and 4 checkmarked trust pillars.
- **Zero-Slop Imagery Law**:
  - Never use generic stock photos that contradict dish descriptions. Every Haitian/Caribbean dish (*Griot*, *Diri Djon Djon*, *Tassot Cabrit*, *Grand Fritaille*, *Légume Haïtien*, *Griot Poutine*) must show its exact real-world ingredients.
