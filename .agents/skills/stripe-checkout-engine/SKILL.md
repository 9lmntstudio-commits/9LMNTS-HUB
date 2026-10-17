---
name: stripe-checkout-engine
description: Automates Stripe customer checkouts, deposit payment links, Apple Pay / Google Pay setup, and Stripe webhook handling for 9LMNTS Studio client platforms and tournament contender registrations.
---

# Stripe Checkout Engine Skill (`stripe-checkout-engine`)

This skill interfaces directly with the official Stripe API via the registered `stripe` MCP server (`stripe-mcp`) and custom Stripe web components.

---

## 1. Registered MCP Server

In `C:\Users\Darnl\.gemini\config\mcp_config.json`:
- **Server Name**: `stripe`
- **Command**: `npx.cmd -y stripe-mcp`
- **Env**: `STRIPE_SECRET_KEY` (Supports test keys `sk_test_...` and live keys `sk_live_...`)

---

## 2. Core Capabilities

1. **Payment Links & Direct Checkout**:
   - Generate instant checkout links for client deposits (`$1,100 CAD` sprint kickoff).
   - Generate contender registration links for Competition OS arenas (`$50 - $250`).
   - Create 50% catering deposit checkouts for restaurant platforms (`Island Flava`, `Margo`, `Rozo`, `Baccanalle`).

2. **Customer & Card Vaulting**:
   - Create and query Stripe Customer objects.
   - Attach payment methods (Apple Pay, Google Pay, Credit/Debit cards).

3. **Webhook Verification**:
   - Handle `checkout.session.completed` events to automatically unlock tournament contender passes or confirm catering bookings.

---

## 3. Two-Layer Payment Rule Compliance

- **Agency Fee**: 9LMNTS Studio B2B sprint fees (`$1,100 CAD` deposit on `$2,200 CAD`) are collected via signed contract + Interac e-Transfer to `9lmntsstudio@gmail.com`.
- **Client Website Revenue**: All customer online orders, catering bookings, ticket sales, and merchandise are processed directly via Stripe on the client's own accounts with 0% agency commission.
