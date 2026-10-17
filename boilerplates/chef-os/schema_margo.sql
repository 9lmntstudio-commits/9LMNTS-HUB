-- ============================================================================
-- 9LMNTS STUDIO // ARGON AUTONOMOUS FULFILLMENT FACTORY
-- TARGET 01: MARGO CARIBBEAN & CANADIAN RESTAURANT
-- ENGINE: Chef OS & Catering Engine (Boilerplate Clone: /boilerplates/chef-os/)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Location Branches Table (Rideau St & Bank St)
CREATE TABLE IF NOT EXISTS margo_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_code VARCHAR(32) UNIQUE NOT NULL,
    branch_name VARCHAR(128) NOT NULL,
    street_address TEXT NOT NULL,
    city VARCHAR(64) DEFAULT 'Ottawa',
    province VARCHAR(32) DEFAULT 'ON',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO margo_locations (branch_code, branch_name, street_address) VALUES
    ('OTT-RIDEAU', 'Margo Rideau Street', 'Rideau St, Ottawa, ON'),
    ('OTT-BANK',   'Margo Bank Street',   'Bank St, Ottawa, ON')
ON CONFLICT (branch_code) DO NOTHING;

-- 2. Catering Platter & Menu Catalog Models
CREATE TABLE IF NOT EXISTS margo_catering_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(64) UNIQUE NOT NULL,
    item_name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'Signature Platter', 'Rice Base', 'Side'
    description TEXT,
    tier_rate_per_person NUMERIC(10, 2) NOT NULL CHECK (tier_rate_per_person BETWEEN 18.00 AND 24.00),
    min_guests INT DEFAULT 15,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO margo_catering_catalog (sku, item_name, category, description, tier_rate_per_person, min_guests) VALUES
    ('PLT-GRIOT-DJON', 'Royal Griot & Djon Djon Platter', 'Signature Platter', 'Slow-marinated crispy Haitian pork griot paired with aromatic black mushroom Djon Djon rice, pikliz, and fried plantains.', 24.00, 20),
    ('PLT-GRIOT-STD',  'Classic Griot & Pikliz Platter',  'Signature Platter', 'Traditional citrus-marinated pork griot with banan peze and house spicy pikliz.', 20.00, 15),
    ('PLT-DJON-VEG',   'Djon Djon & Caribbean Fusion',    'Signature Platter', 'Haitian black mushroom rice medley with roasted jerk chicken or island legumes.', 18.00, 15)
ON CONFLICT (sku) DO NOTHING;

-- 3. Core Factory Table: orders_and_bookings
CREATE TABLE IF NOT EXISTS orders_and_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id VARCHAR(64) NOT NULL DEFAULT 'MARGO-CARIBBEAN-01',
    location_branch VARCHAR(32) NOT NULL REFERENCES margo_locations(branch_code),
    customer_name VARCHAR(128) NOT NULL,
    customer_phone VARCHAR(32) NOT NULL,
    customer_email VARCHAR(128),
    event_date DATE NOT NULL,
    guest_count INT NOT NULL CHECK (guest_count >= 15),
    rate_per_person NUMERIC(10, 2) NOT NULL CHECK (rate_per_person >= 18.00 AND rate_per_person <= 24.00),
    items JSONB NOT NULL DEFAULT '[]'::JSONB,
    subtotal NUMERIC(10, 2) GENERATED ALWAYS AS (guest_count * rate_per_person) STORED,
    deposit_due_50 NUMERIC(10, 2) GENERATED ALWAYS AS (ROUND((guest_count * rate_per_person) * 0.50, 2)) STORED,
    platform_build_deposit_lock NUMERIC(10, 2) DEFAULT 1100.00, -- 50% of $2,200 Chef OS Build ($1,100 CAD Lock)
    interac_status VARCHAR(32) NOT NULL DEFAULT 'PENDING_ETRANSFER'
        CHECK (interac_status IN ('PENDING_ETRANSFER', 'VERIFIED_50_DEPOSIT', 'PAID_IN_FULL', 'CANCELLED')),
    interac_reference_code VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Core Factory Table: telemetry_and_intake
CREATE TABLE IF NOT EXISTS telemetry_and_intake (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name VARCHAR(128) NOT NULL,
    votes_a INT DEFAULT 0, -- e.g., Rideau St branch traffic / Griot preference
    votes_b INT DEFAULT 0, -- e.g., Bank St branch traffic / Djon Djon preference
    sponsor_impressions INT DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_margo_orders_branch ON orders_and_bookings(location_branch);
CREATE INDEX IF NOT EXISTS idx_margo_orders_status ON orders_and_bookings(interac_status);
