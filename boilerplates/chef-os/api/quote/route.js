/**
 * 9LMNTS STUDIO // ARGON AUTONOMOUS FULFILLMENT FACTORY
 * TARGET 01: MARGO CARIBBEAN & CANADIAN RESTAURANT
 * MODULE: Chef OS Catering Quote Router & Interac 50% Deposit Webhook Handler
 * PATH: /boilerplates/chef-os/api/quote/route.js
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const N8N_WEBHOOK_URL = process.env.N8N_MARGO_DISPATCH_WEBHOOK;
const INTERAC_RECIPIENT_EMAIL = process.env.MARGO_INTERAC_EMAIL || 'payments@9lmntsstudio.com';

const VALID_BRANCHES = ['OTT-RIDEAU', 'OTT-BANK'];
const MIN_RATE = 18.0;
const MAX_RATE = 24.0;

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      location_branch = 'OTT-RIDEAU',
      customer_name,
      customer_phone,
      customer_email,
      event_date,
      guest_count,
      selected_tier_rate = 24.0,
      items = ['PLT-GRIOT-DJON']
    } = payload;

    // 1. Validate Branch & Guest Slider Bounds ($18-$24/person)
    if (!VALID_BRANCHES.includes(location_branch)) {
      return Response.json(
        { error: 'Invalid Ottawa branch selected. Choose OTT-RIDEAU or OTT-BANK.' },
        { status: 400 }
      );
    }

    const guests = Math.max(15, parseInt(guest_count, 10) || 15);
    const rate = Math.min(MAX_RATE, Math.max(MIN_RATE, parseFloat(selected_tier_rate) || 24.0));

    // 2. Dynamic Calculation Engine (50% Non-Refundable Interac e-Transfer Lock)
    const subtotal = Number((guests * rate).toFixed(2));
    const deposit_due_50 = Number((subtotal * 0.5).toFixed(2));

    // 3. Persist Quote & Deposit Lock in Supabase
    const { data: booking, error: dbError } = await supabase
      .from('orders_and_bookings')
      .insert([
        {
          client_id: 'MARGO-CARIBBEAN-01',
          location_branch,
          customer_name,
          customer_phone,
          customer_email,
          event_date,
          guest_count: guests,
          rate_per_person: rate,
          items,
          interac_status: 'PENDING_ETRANSFER'
        }
      ])
      .select()
      .single();

    if (dbError) throw dbError;

    // 4. Headless Webhook Offload to n8n / SMS Dispatch
    if (N8N_WEBHOOK_URL) {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          engine: 'CHEF_OS',
          client: 'Margo Caribbean & Canadian Restaurant',
          booking_id: booking.id,
          branch: location_branch,
          customer: { name: customer_name, phone: customer_phone, email: customer_email },
          financials: {
            guest_count: guests,
            rate_per_person: rate,
            subtotal_cad: subtotal,
            deposit_due_50_cad: deposit_due_50,
            interac_recipient: INTERAC_RECIPIENT_EMAIL,
            interac_memo: `MARGO-${booking.id.slice(0, 8).toUpperCase()}`
          },
          timestamp: new Date().toISOString()
        })
      });
    }

    return Response.json(
      {
        status: 'QUOTE_LOCKED_PENDING_DEPOSIT',
        booking_id: booking.id,
        branch: location_branch,
        quote: {
          guest_count: guests,
          rate_per_person: `$${rate.toFixed(2)} CAD`,
          subtotal: `$${subtotal.toFixed(2)} CAD`,
          deposit_due_50: `$${deposit_due_50.toFixed(2)} CAD`,
          interac_instructions: {
            send_to: INTERAC_RECIPIENT_EMAIL,
            amount: `$${deposit_due_50.toFixed(2)} CAD`,
            security_memo: `MARGO-${booking.id.slice(0, 8).toUpperCase()}`,
            policy: '50% non-refundable Interac e-Transfer required to lock catering kitchen calendar.'
          }
        }
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { error: 'Chef OS Quote Router Failure', details: err.message },
      { status: 500 }
    );
  }
}
