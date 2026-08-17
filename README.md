# FoodBridge – Save Food. Feed People. Reduce Waste.

**FoodBridge** is a production-ready surplus food marketplace connecting restaurants, hotels, bakeries, supermarkets, NGOs, delivery partners, and discount buyers.

---

## Startup Highlights & Tech Stack

- **Frontend**: React 18 (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Canvas QR Code, Google Maps.
- **Backend**: Java 17 + Spring Boot 3.2, Spring Security, JWT Authentication, WebSocket STOMP, OpenAPI / Swagger.
- **Database**: MySQL 8.0 with 20 relational tables, foreign key constraints, indexes, and full seed dataset (`database/schema.sql` and `database/seed.sql`).
- **AI Features**: OpenAI Food Safety Assistant, AI Matching Engine, AI Route Optimizer, AI Waste Analytics.
- **Interactive Core**:
  - 5 Distinct Role Portals: Restaurant/Hotel, NGO, Buyer Marketplace, Delivery Partner, Platform Admin Owner.
  - Live Google Maps API integration with pinpoint markers & route lines.
  - QR Code pickup verification system with scanner & generator.
  - Simulated Razorpay Payment Gateway (UPI, Cards, NetBanking, Wallet).
  - Digital Wallet with deposit, withdrawal, and transaction ledger.
  - Referral program with code generation & top referrers leaderboard.
  - Real-time WebSocket Chat with image file attachments & typing indicators.
  - Light Mode & Dark Mode with high-contrast accessibility controls.

---

## Quick Start (Frontend)

1. Open terminal in `frontend/`:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open `http://localhost:5173` in your browser.

---

## Quick Start (Backend & Database)

1. Import `database/schema.sql` and `database/seed.sql` into MySQL 8.0+.
2. Configure `backend/src/main/resources/application.yml`.
3. Build and launch Spring Boot backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. Access Swagger UI at `http://localhost:8080/api/v1/swagger-ui.html`.

---

## Project Structure

```
foodbridge/
├── frontend/        # React 18 + Vite + Tailwind CSS + Framer Motion
├── backend/         # Java 17 Spring Boot Backend API Service
├── database/        # MySQL schema.sql (20 tables) and seed.sql
└── docs/            # Production API, Deployment & Environment Docs
```
