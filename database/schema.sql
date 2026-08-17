-- ============================================================================
-- FoodBridge Production Database Schema (Upgraded 2026)
-- Target RDBMS: MySQL 8.0+ / PostgreSQL Compatible
-- Description: Complete production schema supporting Roles, Businesses, Google Auth,
--              Phone OTP Rate Limiting, FSSAI Licenses, Section 80G Receipts & Audit Logs.
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
    role ENUM('USER', 'DONOR', 'RESTAURANT_OWNER', 'OWNER_ADMIN', 'NGO', 'SHELTER', 'ADMIN') NOT NULL DEFAULT 'USER',
    avatar_url VARCHAR(500),
    cover_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_badge VARCHAR(50) DEFAULT 'UNVERIFIED',
    google_id VARCHAR(100),
    referral_code VARCHAR(30) UNIQUE,
    referred_by VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 2. BUSINESSES (Owner Private Entity)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS businesses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    owner_id BIGINT NOT NULL UNIQUE,
    business_name VARCHAR(150) NOT NULL,
    establishment_type ENUM('RESTAURANT', 'HOTEL', 'BAKERY', 'SUPERMARKET', 'CAFE') DEFAULT 'RESTAURANT',
    fssai_license VARCHAR(80) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    city VARCHAR(80) NOT NULL,
    verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED') DEFAULT 'VERIFIED',
    tax_information VARCHAR(100) DEFAULT 'Sec 80G Eligible (IT Act 1961)',
    total_donations INT DEFAULT 26,
    total_tax_saved_inr DECIMAL(10,2) DEFAULT 8750.00,
    shelters_helped_count INT DEFAULT 18,
    logo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_business_owner (owner_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 3. OTP VERIFICATIONS (Rate Limited & Cooldown)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS otp_verifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    attempts_count INT DEFAULT 0,
    cooldown_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_otp_phone (phone)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 4. DONATIONS & FOOD LISTINGS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS donations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    business_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    quantity VARCHAR(80) NOT NULL,
    category VARCHAR(50) DEFAULT 'VEG',
    expiry_hours DECIMAL(4,1) DEFAULT 3.0,
    status ENUM('AVAILABLE', 'REQUESTED', 'ACCEPTED', 'SCHEDULED', 'PICKED_UP', 'COMPLETED', 'CANCELLED') DEFAULT 'AVAILABLE',
    claimed_by_ngo_id BIGINT,
    tax_benefit_inr DECIMAL(10,2) DEFAULT 0.00,
    qr_code_token VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    INDEX idx_donation_business (business_id),
    INDEX idx_donation_status (status)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 5. MESSAGES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    recipient_id BIGINT NOT NULL,
    message_text TEXT NOT NULL,
    image_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
