-- ============================================================================
-- FoodBridge Production Seed Data (2026)
-- ============================================================================

USE foodbridge_db;

-- Seed Owner User
INSERT INTO users (id, name, email, phone, role, is_verified, verification_badge, google_id)
VALUES (1, 'Som Prakash', 'somprakash@foodbridge.org', '+919876543210', 'OWNER_ADMIN', TRUE, 'VERIFIED BUSINESS OWNER', 'GOOG_9041')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Owner Business Record
INSERT INTO businesses (id, owner_id, business_name, establishment_type, fssai_license, address, latitude, longitude, city, verification_status, total_donations, total_tax_saved_inr, shelters_helped_count)
VALUES (1, 1, 'Som Prakash Restaurant & Dining', 'RESTAURANT', '10019011006542', 'Connaught Place B-Block, New Delhi', 28.6315, 77.2167, 'New Delhi', 'VERIFIED', 26, 8750.00, 18)
ON DUPLICATE KEY UPDATE business_name=VALUES(business_name);

-- Seed Normal Donor User
INSERT INTO users (id, name, email, phone, role, is_verified, verification_badge)
VALUES (2, 'Ananya Sharma', 'ananya@gmail.com', '+919811122334', 'DONOR', TRUE, 'COMMUNITY DONOR')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed NGO User
INSERT INTO users (id, name, email, phone, role, is_verified, verification_badge)
VALUES (3, 'Food Relief Foundation', 'contact@foodrelief.org', '+919822233445', 'NGO', TRUE, 'VERIFIED NGO 80G')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Initial Donations
INSERT INTO donations (id, business_id, title, quantity, category, expiry_hours, status, tax_benefit_inr, qr_code_token)
VALUES 
(1, 1, 'Shahi Paneer & Garlic Naan Bulk Meal', '25 kg', 'VEG', 3.5, 'COMPLETED', 2850.00, 'QR_DON_901'),
(2, 1, 'Artisanal Sourdough & Pastry Assortment', '15 kg', 'BAKERY', 5.0, 'COMPLETED', 1400.00, 'QR_DON_902'),
(3, 1, 'Hyderabadi Chicken Biryani Surplus', '40 kg', 'NON_VEG', 2.0, 'COMPLETED', 4500.00, 'QR_DON_903')
ON DUPLICATE KEY UPDATE title=VALUES(title);
