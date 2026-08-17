# FoodBridge 🍲— Autonomous Surplus Food Marketplace Platform

> **Transforming Food Surplus into Social Impact and Economic Recovery**

FoodBridge is a production-grade, two-sided marketplace connecting restaurants, bakeries, caterers, and grocery stores with surplus food directly to verified local shelters, NGOs, and budget buyers in real time.

---

## 🌟 Key Platform Features

### 🏢 For Restaurants & Commercial Donors
- **1-Tap Surplus Listing**: Upload photo, food category, quantity (kg/meals), storage temperature, and pickup window in under 60 seconds.
- **AI Food Freshness Predictor**: Autonomous safety scoring engine evaluating ambient temperature, prep time, and packaging type.
- **Section 80G Tax Certificates**: Automatic generation of compliant Section 80G tax-deduction PDF receipts for every completed donation.
- **Tiered Subscriptions & Wallet Payouts**: Integrated Stripe Checkout for business tiers (Starter, Growth, Enterprise) with instant wallet payouts.

### 🏠 For NGOs, Shelters & Community Kitchens
- **Live Interactive Surplus Map**: Real-time Google Maps interface showing nearby available food with distance calculations and live Directions API routing.
- **One-Tap Reservation**: Lock in donations instantly with dynamic QR code verification for pick-up.
- **Volunteer & Driver Dispatch**: Real-time rider tracking with WebSockets.

### 📱 Multi-Platform Experience
- **Progressive Web App**: Built with React (Vite), Tailwind CSS, and Leaflet / Google Maps SDK.
- **Native Android App (.APK)**: Standalone Capacitor/Flutter mobile app binary for on-the-go management.
- **Investor Pitch Deck (.PPTX)**: 10-slide PowerPoint presentation embedded for business showcases.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Web** | React 18 (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Leaflet / Google Maps API |
| **Mobile Native** | Capacitor JS, Android SDK (Platform 36), Flutter 3.x |
| **Backend API** | Spring Boot 3.2 (Java 17), Spring Security, JWT Auth, Google OAuth2, WebSockets |
| **Database** | MySQL 8.0 / PostgreSQL (23 relational tables with spatial indexing) |
| **Integrations** | Stripe Billing, Firebase Phone Auth OTP, Resend Email, Twilio SMS |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+
- **Java**: JDK 17+ (for Spring Boot backend)
- **MySQL**: 8.0+

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Database Migration
Import schema and seed data located in `database/schema.sql` and `database/seed.sql`.

---

## 📄 License & Contact

Developed with ❤️ by **somprakash18**  
GitHub: [https://github.com/somprakash18](https://github.com/somprakash18)
