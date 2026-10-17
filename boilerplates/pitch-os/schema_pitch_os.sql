-- ============================================================================
-- 9LMNTS STUDIO // ARGON AUTONOMOUS FULFILLMENT FACTORY
-- TARGET 02: BUSINESS METER (HANSU) - businessmeter.ca
-- ENGINE: Pitch OS / Corporate Clash (Boilerplate Clone: /boilerplates/pitch-os/)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 8-Contender Founder Roster & $250 Ticketing Underwrite ($2,000 CAD Total)
CREATE TABLE IF NOT EXISTS pitch_os_contenders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(64) NOT NULL DEFAULT 'BM-CLASH-01',
    slot_number INT NOT NULL CHECK (slot_number BETWEEN 1 AND 8),
    founder_name VARCHAR(128) NOT NULL,
    company_name VARCHAR(128) NOT NULL,
    pitch_category VARCHAR(64) DEFAULT 'General Venture',
    underwrite_fee_cad NUMERIC(10, 2) NOT NULL DEFAULT 250.00,
    interac_underwrite_status VARCHAR(32) NOT NULL DEFAULT 'PENDING_ETRANSFER'
        CHECK (interac_underwrite_status IN ('PENDING_ETRANSFER', 'VERIFIED_PAID', 'ELIMINATED', 'CHAMPION')),
    live_vote_score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, slot_number)
);

-- Seed 8-Contender Bracket Slots ($250 x 8 = $2,000 CAD Underwrite)
INSERT INTO pitch_os_contenders (slot_number, founder_name, company_name, underwrite_fee_cad) VALUES
    (1, 'Contender Slot 01', 'Venture Alpha',   250.00),
    (2, 'Contender Slot 02', 'Venture Beta',    250.00),
    (3, 'Contender Slot 03', 'Venture Gamma',   250.00),
    (4, 'Contender Slot 04', 'Venture Delta',   250.00),
    (5, 'Contender Slot 05', 'Venture Epsilon', 250.00),
    (6, 'Contender Slot 06', 'Venture Zeta',    250.00),
    (7, 'Contender Slot 07', 'Venture Eta',     250.00),
    (8, 'Contender Slot 08', 'Venture Theta',   250.00)
ON CONFLICT (event_id, slot_number) DO NOTHING;

-- 2. Pinned Category Sponsor Banner ($1,000 CAD Anchor Slot)
CREATE TABLE IF NOT EXISTS pitch_os_sponsors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(64) NOT NULL DEFAULT 'BM-CLASH-01',
    sponsor_name VARCHAR(128) NOT NULL,
    domain_target VARCHAR(128) DEFAULT 'businessmeter.ca',
    banner_cta_url TEXT NOT NULL,
    sponsorship_fee_cad NUMERIC(10, 2) NOT NULL DEFAULT 1000.00,
    is_pinned BOOLEAN DEFAULT TRUE,
    interac_status VARCHAR(32) NOT NULL DEFAULT 'PENDING_ETRANSFER',
    impressions_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Core Factory Table: orders_and_bookings (Ticketing, Underwrites & 50% Factory Deposit)
CREATE TABLE IF NOT EXISTS orders_and_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id VARCHAR(64) NOT NULL DEFAULT 'BUSINESS-METER-HANSU',
    order_type VARCHAR(64) NOT NULL CHECK (order_type IN ('PLATFORM_DEPLOYMENT', 'FOUNDER_UNDERWRITE_250', 'CATEGORY_SPONSOR_1000', 'AUDIENCE_SEAT_80CAP')),
    guest_count INT NOT NULL DEFAULT 1, -- Seat count (capped at 80 total venue seats) or package units
    items JSONB NOT NULL DEFAULT '[]'::JSONB,
    subtotal NUMERIC(10, 2) NOT NULL,
    deposit_due_50 NUMERIC(10, 2) GENERATED ALWAYS AS (ROUND(subtotal * 0.50, 2)) STORED,
    interac_status VARCHAR(32) NOT NULL DEFAULT 'PENDING_ETRANSFER'
        CHECK (interac_status IN ('PENDING_ETRANSFER', 'VERIFIED_50_DEPOSIT', 'PAID_IN_FULL', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Core Factory Table: telemetry_and_intake (Real-Time Duel Voting Meter & Sponsor Telemetry)
CREATE TABLE IF NOT EXISTS telemetry_and_intake (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name VARCHAR(128) NOT NULL DEFAULT 'BUSINESS_METER_LIVE_CLASH',
    duel_round VARCHAR(32) NOT NULL DEFAULT 'QUARTERFINAL_1',
    contender_a_slot INT REFERENCES pitch_os_contenders(slot_number),
    contender_b_slot INT REFERENCES pitch_os_contenders(slot_number),
    votes_a INT NOT NULL DEFAULT 0,
    votes_b INT NOT NULL DEFAULT 0,
    sponsor_impressions INT NOT NULL DEFAULT 0,
    voter_fingerprints JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Supabase Realtime for instant WebSocket Duel Meter updates
ALTER PUBLICATION supabase_realtime ADD TABLE telemetry_and_intake;
ALTER PUBLICATION supabase_realtime ADD TABLE pitch_os_contenders;
