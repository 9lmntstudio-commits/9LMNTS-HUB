/**
 * 9LMNTS STUDIO // ARGON AUTONOMOUS FULFILLMENT FACTORY
 * TARGET 02: BUSINESS METER (HANSU) - businessmeter.ca
 * MODULE: Pitch OS Real-Time Voting WebSocket & Webhook Dispatch Handler
 * PATH: /boilerplates/pitch-os/api/vote/route.js
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const N8N_PITCH_WEBHOOK_URL = process.env.N8N_PITCH_OS_WEBHOOK;

/**
 * Real-Time Supabase WebSocket Subscription Initializer (Client/Edge Helper)
 * Streams live 8-contender duel meter deltas & pinned $1,000 sponsor impressions.
 */
export function subscribeToLiveDuelMeter(duelId, onMeterUpdate) {
  return supabase
    .channel(`businessmeter-duel-${duelId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'telemetry_and_intake',
        filter: `id=eq.${duelId}`
      },
      (payload) => {
        const { votes_a, votes_b, sponsor_impressions, duel_round } = payload.new;
        const total = votes_a + votes_b || 1;
        onMeterUpdate({
          duel_round,
          votes_a,
          votes_b,
          pct_a: Math.round((votes_a / total) * 100),
          pct_b: Math.round((votes_b / total) * 100),
          sponsor_impressions
        });
      }
    )
    .subscribe();
}

/**
 * POST /api/vote
 * Casts verified audience vote (80-seat room cap telemetry), increments pinned
 * $1,000 category sponsor impression counter, and broadcasts via Supabase Realtime.
 */
export async function POST(request) {
  try {
    const { duel_id, vote_target, voter_device_hash } = await request.json();

    if (!duel_id || !['A', 'B'].includes(vote_target)) {
      return Response.json(
        { error: 'Invalid duel vote payload. Specify duel_id and vote_target ("A" or "B").' },
        { status: 400 }
      );
    }

    // 1. Fetch current duel state
    const { data: duel, error: fetchErr } = await supabase
      .from('telemetry_and_intake')
      .select('*')
      .eq('id', duel_id)
      .single();

    if (fetchErr || !duel) {
      return Response.json({ error: 'Active duel round not found.' }, { status: 404 });
    }

    // Prevent duplicate device voting in the 80-seat arena
    const fingerprints = Array.isArray(duel.voter_fingerprints) ? duel.voter_fingerprints : [];
    if (voter_device_hash && fingerprints.includes(voter_device_hash)) {
      return Response.json({ error: 'Vote already locked for this duel round.' }, { status: 409 });
    }

    const updatedVotesA = vote_target === 'A' ? duel.votes_a + 1 : duel.votes_a;
    const updatedVotesB = vote_target === 'B' ? duel.votes_b + 1 : duel.votes_b;
    const updatedSponsorImpressions = duel.sponsor_impressions + 1;

    // 2. Atomic update triggers Supabase Realtime WebSocket broadcast to all screens
    const { data: updatedDuel, error: updateErr } = await supabase
      .from('telemetry_and_intake')
      .update({
        votes_a: updatedVotesA,
        votes_b: updatedVotesB,
        sponsor_impressions: updatedSponsorImpressions,
        voter_fingerprints: voter_device_hash ? [...fingerprints, voter_device_hash] : fingerprints
      })
      .eq('id', duel_id)
      .select()
      .single();

    if (updateErr) throw updateErr;

    // 3. Fire n8n telemetry webhook when room saturation hits 80-seat capacity threshold
    const totalRoomVotes = updatedVotesA + updatedVotesB;
    if (N8N_PITCH_WEBHOOK_URL && totalRoomVotes >= 80) {
      await fetch(N8N_PITCH_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          engine: 'PITCH_OS',
          client: 'Business Meter (Hansu)',
          domain: 'businessmeter.ca',
          alert: '80_SEAT_ARENA_CAPACITY_VOTES_REACHED',
          duel_round: updatedDuel.duel_round,
          votes_a: updatedVotesA,
          votes_b: updatedVotesB,
          sponsor_impressions: updatedSponsorImpressions
        })
      });
    }

    return Response.json(
      {
        status: 'VOTE_LOCKED_AND_BROADCASTED',
        duel_id: updatedDuel.id,
        telemetry: {
          votes_a: updatedVotesA,
          votes_b: updatedVotesB,
          total_votes: totalRoomVotes,
          arena_seat_cap: 80,
          pinned_sponsor_impressions: updatedSponsorImpressions
        }
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { error: 'Pitch OS Real-Time Voting Engine Error', details: err.message },
      { status: 500 }
    );
  }
}
