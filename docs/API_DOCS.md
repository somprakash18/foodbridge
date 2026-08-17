# FoodBridge REST API Specification

Base Endpoint: `/api/v1`

## 1. Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user (Restaurant, NGO, Buyer, Driver) | No |
| POST | `/auth/login` | Email + Password JWT Login | No |
| POST | `/auth/google` | Google OAuth2 Sign-In token verification | No |
| POST | `/auth/send-otp` | Send Email / Phone verification OTP | No |
| POST | `/auth/verify-otp` | Verify 6-digit OTP code | No |
| GET  | `/auth/me` | Fetch currently authenticated user profile | Yes (JWT) |

## 2. Food Listings (`/api/v1/listings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/listings` | List surplus food with filters (city, category, veg, free) | No |
| GET | `/listings/{id}` | Get detailed food listing info | No |
| POST | `/listings` | Upload surplus food (Restaurant role) | Yes |
| PUT | `/listings/{id}` | Update listing status or details | Yes |
| DELETE | `/listings/{id}` | Cancel/delete surplus listing | Yes |

## 3. Orders & Purchases (`/api/v1/orders`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create buyer purchase order | Yes |
| POST | `/orders/{id}/pay` | Confirm Razorpay payment verification | Yes |
| GET | `/orders/my-orders` | Fetch buyer order history | Yes |

## 4. NGO Donations (`/api/v1/donations`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/donations/claim` | NGO claims free surplus listing | Yes |
| POST | `/donations/{id}/assign-volunteer` | Assign volunteer to pickup | Yes |
| GET | `/donations/ngo-history` | NGO donation claim history | Yes |

## 5. Delivery & QR Verification (`/api/v1/delivery`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/delivery/available-requests` | List nearby unassigned pickup requests | Yes |
| POST | `/delivery/accept/{id}` | Accept pickup delivery request | Yes |
| POST | `/delivery/verify-qr` | Scan QR code & confirm pickup/dropoff | Yes |
| POST | `/delivery/upload-proof` | Upload proof of delivery photo | Yes |

## 6. AI Features (`/api/v1/ai`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/ai/safety-scan` | Evaluate food safety score & recommendation | Yes |
| POST | `/ai/match` | Match surplus food to optimal nearby NGO/buyer | Yes |
| POST | `/ai/route-optimize` | Calculate shortest delivery route | Yes |
| GET  | `/ai/waste-analytics` | Predict peak waste hours & recovery | Yes |

## 7. Wallet & Payments (`/api/v1/wallet`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/wallet/balance` | Fetch user wallet balance | Yes |
| POST | `/wallet/topup` | Add funds via Razorpay | Yes |
| POST | `/wallet/withdraw` | Request bank withdrawal | Yes |
| GET | `/wallet/transactions` | Transaction history ledger | Yes |
