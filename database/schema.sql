-- ============================================================================
-- FoodBridge Production Database Schema (Upgraded)
-- Target RDBMS: MySQL 8.0+ / PostgreSQL Compatible
-- Description: Complete production schema supporting Geocoding, Places, Phone Auth,
--              FSSAI Licenses, NGO Registrations, Subscriptions, PDF Receipts & Analytics.
-- ============================================================================

CREATE DATABASE IF NOT EXISTS foodbridge_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE foodbridge_db;

-- ----------------------------------------------------------------------------
-- 1. USERS & ROLES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255),
    role ENUM('RESTAURANT', 'NGO', 'BUYER', 'DELIVERY_PARTNER', 'OWNER_ADMIN') NOT NULL,
    avatar_url VARCHAR(500),
    cover_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_badge VARCHAR(50) DEFAULT 'UNVERIFIED',
    google_id VARCHAR(100),
    stripe_customer_id VARCHAR(100),
    referral_code VARCHAR(30) UNIQUE,
    referred_by VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 2. RESTAURANTS & HOTELS & BAKERIES & SUPERMARKETS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS restaurants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    business_name VARCHAR(150) NOT NULL,
    establishment_type ENUM('RESTAURANT', 'HOTEL', 'BAKERY', 'SUPERMARKET', 'CAFE') DEFAULT 'RESTAURANT',
    fssai_license VARCHAR(80) NOT NULL,
    google_place_id VARCHAR(150),
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    city VARCHAR(80) NOT NULL,
    pincode VARCHAR(15) NOT NULL,
    contact_person VARCHAR(100),
    opening_hours VARCHAR(100) DEFAULT '09:00 AM - 11:00 PM',
    rating DECIMAL(3,2) DEFAULT 4.80,
    total_listings INT DEFAULT 0,
    total_donated_kg DECIMAL(10,2) DEFAULT 0.00,
    co2_saved_kg DECIMAL(10,2) DEFAULT 0.00,
    logo_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_restaurant_geo (latitude, longitude),
    INDEX idx_restaurant_city (city)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 3. NGOS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ngos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    organization_name VARCHAR(150) NOT NULL,
    registration_number VARCHAR(80) NOT NULL,
    capacity_per_day INT DEFAULT 500,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    city VARCHAR(80) NOT NULL,
    contact_person VARCHAR(100),
    volunteers_count INT DEFAULT 10,
    has_vehicle_availability BOOLEAN DEFAULT TRUE,
    meals_distributed INT DEFAULT 0,
    families_served INT DEFAULT 0,
    is_verified_ngo BOOLEAN DEFAULT FALSE, -- Requires Admin Verification
    approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ngo_geo (latitude, longitude)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 4. BUYERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS buyers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    preferred_category VARCHAR(50) DEFAULT 'ALL',
    saved_meals_count INT DEFAULT 0,
    money_saved_inr DECIMAL(10,2) DEFAULT 0.00,
    address TEXT,
    city VARCHAR(80),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 5. DELIVERY PARTNERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS delivery_partners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    vehicle_type ENUM('BICYCLE', 'ELECTRIC_SCOOTER', 'MOTORCYCLE', 'VAN') NOT NULL,
    vehicle_number VARCHAR(30),
    driving_license VARCHAR(50),
    aadhaar_url VARCHAR(500),
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8),
    is_available BOOLEAN DEFAULT TRUE,
    status ENUM('OFFLINE', 'AVAILABLE', 'ON_DELIVERY') DEFAULT 'AVAILABLE',
    total_deliveries INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 4.90,
    total_earnings_inr DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 6. FOOD LISTINGS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS food_listings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    category ENUM('MEALS', 'BAKERY', 'FRUITS_VEG', 'DAIRY', 'BEVERAGES', 'PACKAGED') NOT NULL,
    dietary_type ENUM('VEG', 'NON_VEG', 'VEGAN', 'EGG') NOT NULL,
    quantity_kg DECIMAL(8,2) NOT NULL,
    servings INT NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    is_free_donation BOOLEAN DEFAULT FALSE,
    preparation_time TIMESTAMP NOT NULL,
    expiry_time TIMESTAMP NOT NULL,
    pickup_deadline TIMESTAMP NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    storage_temp ENUM('HOT', 'COLD', 'ROOM_TEMP', 'FROZEN') DEFAULT 'ROOM_TEMP',
    packaging_status ENUM('SEALED_CONTAINER', 'PACKED_BOX', 'LOOSE_FOIL') DEFAULT 'PACKED_BOX',
    ai_safety_score DECIMAL(3,2) DEFAULT 0.95,
    ai_recommendation ENUM('DONATE_NOW', 'SELL_NOW', 'UNSAFE') DEFAULT 'SELL_NOW',
    status ENUM('AVAILABLE', 'RESERVED', 'PICKED_UP', 'EXPIRED', 'CANCELLED') DEFAULT 'AVAILABLE',
    qr_code_hash VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    INDEX idx_food_status (status),
    INDEX idx_food_expiry (expiry_time)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 7. STRIPE SUBSCRIPTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT NOT NULL,
    plan ENUM('STARTER', 'GROWTH', 'ENTERPRISE') NOT NULL,
    stripe_subscription_id VARCHAR(120),
    stripe_customer_id VARCHAR(120),
    price_monthly DECIMAL(10,2) NOT NULL,
    status ENUM('ACTIVE', 'CANCELED', 'PAST_DUE', 'TRIALING') DEFAULT 'ACTIVE',
    current_period_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 8. TAX DEDUCTION RECEIPTS (PDF)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS receipts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    claim_id BIGINT,
    donation_number VARCHAR(80) NOT NULL UNIQUE,
    restaurant_id BIGINT NOT NULL,
    ngo_id BIGINT NOT NULL,
    pdf_url VARCHAR(500) NOT NULL,
    fmv_valuation_inr DECIMAL(10,2) NOT NULL,
    tax_deduction_cert_no VARCHAR(100) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (ngo_id) REFERENCES ngos(id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 9. ORDERS & CLAIMS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(40) UNIQUE NOT NULL,
    buyer_id BIGINT NOT NULL,
    food_listing_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 25.00,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    payment_gateway ENUM('RAZORPAY', 'STRIPE', 'WALLET') DEFAULT 'STRIPE',
    razorpay_payment_id VARCHAR(100),
    order_status ENUM('PLACED', 'CONFIRMED', 'OUT_FOR_PICKUP', 'DELIVERED', 'CANCELLED') DEFAULT 'PLACED',
    pickup_otp VARCHAR(6),
    delivery_otp VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES buyers(id),
    FOREIGN KEY (food_listing_id) REFERENCES food_listings(id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 10. DONATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS donations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    donation_number VARCHAR(40) UNIQUE NOT NULL,
    ngo_id BIGINT NOT NULL,
    food_listing_id BIGINT NOT NULL,
    assigned_volunteer_name VARCHAR(100),
    volunteer_phone VARCHAR(20),
    status ENUM('CLAIMED', 'VERIFIED', 'IN_TRANSIT', 'DISTRIBUTED', 'CANCELLED') DEFAULT 'CLAIMED',
    pickup_verification_code VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ngo_id) REFERENCES ngos(id),
    FOREIGN KEY (food_listing_id) REFERENCES food_listings(id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 11. OTP VERIFICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS otp_verifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    identifier VARCHAR(150) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    type ENUM('EMAIL_OTP', 'PHONE_OTP') NOT NULL,
    attempts INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_otp_ident (identifier)
) ENGINE=InnoDB;
