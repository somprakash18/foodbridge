-- ============================================================================
-- FoodBridge Seed Data
-- Description: Realistic initial seed records for restaurants, NGOs, buyers,
-- delivery partners, surplus food listings, wallet balances, and analytics.
-- ============================================================================

USE foodbridge_db;

-- ----------------------------------------------------------------------------
-- USERS SEED
-- Password hash is dummy bcrypt for 'Password@123'
-- ----------------------------------------------------------------------------
INSERT INTO users (id, name, email, phone, password_hash, role, avatar_url, is_verified, verification_badge, referral_code) VALUES
(1, 'Domino\'s Pizza Center', 'partner@dominos.com', '+919876543210', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'RESTAURANT', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80', TRUE, 'GOLD_PARTNER', 'DOMINOS2026'),
(2, 'Haldiram Sweets & Dining', 'surplus@haldiram.com', '+919876543211', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'RESTAURANT', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80', TRUE, 'GOLD_PARTNER', 'HALDIRAM2026'),
(3, 'The Grand Palace Hotel', 'kitchen@grandpalace.com', '+919876543212', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'RESTAURANT', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80', TRUE, 'PLATINUM_PARTNER', 'GRANDPALACE2026'),
(4, 'BakeHouse Artisanal Bakery', 'hello@bakehouse.com', '+919876543213', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'RESTAURANT', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80', TRUE, 'VERIFIED_PARTNER', 'BAKEHOUSE2026'),
(5, 'Food Relief Foundation NGO', 'contact@foodrelief.org', '+919876543220', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'NGO', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=80', TRUE, 'VERIFIED_NGO', 'FOODRELIEF2026'),
(6, 'Community Hunger Kitchen', 'info@communitykitchen.org', '+919876543221', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'NGO', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=200&q=80', TRUE, 'VERIFIED_NGO', 'COMMUNITY2026'),
(7, 'Aarav Mehta', 'aarav.buyer@gmail.com', '+919876543230', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'BUYER', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', TRUE, 'GOLD_SAVER', 'AARAV2026'),
(8, 'Ananya Sharma', 'ananya.buyer@gmail.com', '+919876543231', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'BUYER', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', TRUE, 'SILVER_SAVER', 'ANANYA2026'),
(9, 'Vikram Singh (Express Fleet)', 'vikram.delivery@gmail.com', '+919876543240', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'DELIVERY_PARTNER', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80', TRUE, 'TOP_RIDER', 'VIKRAM2026'),
(10, 'FoodBridge Admin Owner', 'admin@foodbridge.org', '+919876543200', '$2a$10$w3gP1M/u.49QvD3GvjM1z.43d04Z2vYn/1o123', 'OWNER_ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', TRUE, 'ADMIN', 'ADMIN2026');

-- ----------------------------------------------------------------------------
-- RESTAURANTS SEED
-- ----------------------------------------------------------------------------
INSERT INTO restaurants (id, user_id, business_name, license_number, address, latitude, longitude, city, pincode, contact_person, rating, total_listings, total_donated_kg, co2_saved_kg) VALUES
(1, 1, 'Domino\'s Pizza Express', 'FSSAI-10019011000123', 'Connaught Place, Block B, New Delhi', 28.6315, 77.2167, 'New Delhi', '110001', 'Rajesh Kumar', 4.85, 48, 120.50, 301.25),
(2, 2, 'Haldiram Sweets & Dining', 'FSSAI-10019011000456', 'Chandni Chowk Main Rd, Delhi', 28.6506, 77.2303, 'New Delhi', '110006', 'Sanjay Haldiram', 4.90, 85, 340.00, 850.00),
(3, 3, 'The Grand Palace Hotel', 'FSSAI-10019011000789', 'Diplomatic Enclave, Chanakyapuri', 28.5910, 77.1925, 'New Delhi', '110021', 'Chef Maria D\'Souza', 4.95, 110, 520.00, 1300.00),
(4, 4, 'BakeHouse Artisanal Bakery', 'FSSAI-10019011000999', 'Khan Market, New Delhi', 28.6000, 77.2270, 'New Delhi', '110003', 'Rohan Verma', 4.80, 62, 180.00, 450.00);

-- ----------------------------------------------------------------------------
-- NGOS SEED
-- ----------------------------------------------------------------------------
INSERT INTO ngos (id, user_id, organization_name, registration_number, capacity_per_day, address, latitude, longitude, city, volunteers_count, meals_distributed, families_served) VALUES
(1, 5, 'Food Relief Foundation', 'NGO-REG-2021-987', 1200, 'Lodhi Road Community Center, New Delhi', 28.5918, 77.2274, 'New Delhi', 45, 14200, 3550),
(2, 6, 'Community Hunger Kitchen', 'NGO-REG-2020-456', 800, 'Paharganj Welfare Hub, New Delhi', 28.6429, 77.2140, 'New Delhi', 30, 9800, 2450);

-- ----------------------------------------------------------------------------
-- BUYERS SEED
-- ----------------------------------------------------------------------------
INSERT INTO buyers (id, user_id, preferred_category, saved_meals_count, money_saved_inr, address, city) VALUES
(1, 7, 'MEALS', 24, 3800.00, 'Vasant Kunj Sector C, New Delhi', 'New Delhi'),
(2, 8, 'BAKERY', 18, 2450.00, 'South Extension Part 2, New Delhi', 'New Delhi');

-- ----------------------------------------------------------------------------
-- DELIVERY PARTNERS SEED
-- ----------------------------------------------------------------------------
INSERT INTO delivery_partners (id, user_id, vehicle_type, vehicle_number, current_latitude, current_longitude, is_available, status, total_deliveries, rating, total_earnings_inr) VALUES
(1, 9, 'ELECTRIC_SCOOTER', 'DL-01-EV-4092', 28.6250, 77.2180, TRUE, 'AVAILABLE', 312, 4.92, 12480.00);

-- ----------------------------------------------------------------------------
-- FOOD LISTINGS SEED
-- ----------------------------------------------------------------------------
INSERT INTO food_listings (id, restaurant_id, title, description, category, dietary_type, quantity_kg, servings, original_price, discounted_price, is_free_donation, preparation_time, expiry_time, pickup_deadline, storage_temp, packaging_status, ai_safety_score, ai_recommendation, status, qr_code_hash) VALUES
(1, 1, 'Fresh Surplus Veg Supreme Pizza & Garlic Bread', 'Freshly baked pizzas from surplus evening batch. Sealed in thermal boxes.', 'MEALS', 'VEG', 4.50, 12, 1200.00, 350.00, FALSE, DATE_SUB(NOW(), INTERVAL 2 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 'HOT', 'PACKED_BOX', 0.98, 'SELL_NOW', 'AVAILABLE', 'QR_LISTING_001'),
(2, 2, 'Authentic Shahi Paneer & Jeera Rice Bulk Meal', 'Fresh buffet surplus prepared in hygienic ghee kitchen. Ideal for distribution.', 'MEALS', 'VEG', 12.00, 30, 3000.00, 0.00, TRUE, DATE_SUB(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 4 HOUR), DATE_ADD(NOW(), INTERVAL 2.5 HOUR), 'HOT', 'SEALED_CONTAINER', 0.96, 'DONATE_NOW', 'AVAILABLE', 'QR_LISTING_002'),
(3, 3, 'Royal Hyderabadi Chicken Biryani Pot', 'Premium hotel buffet surplus cooked with basmati rice and aromatic spices.', 'MEALS', 'NON_VEG', 15.00, 35, 5200.00, 1250.00, FALSE, DATE_SUB(NOW(), INTERVAL 2.5 HOUR), DATE_ADD(NOW(), INTERVAL 3.5 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 'HOT', 'SEALED_CONTAINER', 0.94, 'SELL_NOW', 'AVAILABLE', 'QR_LISTING_003'),
(4, 4, 'Assorted Artisanal Sourdough & Croissant Box', 'Crispy sourdough loaves, butter croissants, and blueberry muffins baked this morning.', 'BAKERY', 'EGG', 5.00, 20, 1800.00, 450.00, FALSE, DATE_SUB(NOW(), INTERVAL 5 HOUR), DATE_ADD(NOW(), INTERVAL 12 HOUR), DATE_ADD(NOW(), INTERVAL 6 HOUR), 'ROOM_TEMP', 'PACKED_BOX', 0.99, 'SELL_NOW', 'AVAILABLE', 'QR_LISTING_004'),
(5, 2, 'Fresh Cottage Cheese & Dry Fruit Mithai Pack', 'Assorted Indian sweets from today\'s fresh batch. High nutritional energy.', 'BAKERY', 'VEG', 6.00, 25, 2400.00, 0.00, TRUE, DATE_SUB(NOW(), INTERVAL 3 HOUR), DATE_ADD(NOW(), INTERVAL 18 HOUR), DATE_ADD(NOW(), INTERVAL 5 HOUR), 'ROOM_TEMP', 'PACKED_BOX', 0.97, 'DONATE_NOW', 'AVAILABLE', 'QR_LISTING_005');

-- ----------------------------------------------------------------------------
-- FOOD IMAGES SEED
-- ----------------------------------------------------------------------------
INSERT INTO food_images (id, food_listing_id, image_url, is_primary) VALUES
(1, 1, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', TRUE),
(2, 2, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80', TRUE),
(3, 3, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', TRUE),
(4, 4, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', TRUE),
(5, 5, 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80', TRUE);

-- ----------------------------------------------------------------------------
-- WALLET & TRANSACTIONS SEED
-- ----------------------------------------------------------------------------
INSERT INTO wallet (id, user_id, balance) VALUES
(1, 1, 14250.00),
(2, 2, 8500.00),
(3, 5, 5000.00),
(4, 7, 1250.00),
(5, 9, 3400.00);

INSERT INTO transactions (id, wallet_id, type, amount, category, reference_id, description, status) VALUES
(1, 1, 'CREDIT', 14250.00, 'FOOD_RECOVERY', 'TXN_1001', 'Surplus food sales recovery payout', 'SUCCESS'),
(2, 4, 'DEBIT', 350.00, 'PURCHASE', 'TXN_1002', 'Payment for Veg Supreme Pizza listing #1', 'SUCCESS'),
(3, 5, 'CREDIT', 120.00, 'DELIVERY_EARNING', 'TXN_1003', 'Completed 3 pickup deliveries reward', 'SUCCESS');

-- ----------------------------------------------------------------------------
-- ANALYTICS SEED
-- ----------------------------------------------------------------------------
INSERT INTO analytics (id, metric_date, total_meals_saved, total_co2_saved_kg, total_donations_count, total_buyer_orders, total_revenue_recovered, active_users) VALUES
(1, CURRENT_DATE(), 18450, 46125.00, 1280, 3420, 684000.00, 2450);
