# FoodBridge Deployment Guide

Complete step-by-step production deployment instructions for Vercel, Render, MySQL Cloud, Cloudinary, Razorpay, and Google Maps.

---

## 1. Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. Select root directory: `frontend`.
3. Set build configuration:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Environment Variables in Vercel settings:
   ```env
   VITE_API_BASE_URL=https://foodbridge-backend.onrender.com/api/v1
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   VITE_RAZORPAY_KEY_ID=rzp_live_your_key_id
   ```
5. Click **Deploy**.

---

## 2. Backend Deployment (Render)

1. Create a **Web Service** on [Render](https://render.com).
2. Connect your repository and select directory: `backend`.
3. Build Command: `./mvnw clean package -DskipTests` (or `mvn clean package`).
4. Start Command: `java -jar target/foodbridge-backend-1.0.0.jar`.
5. Set Environment Variables in Render:
   ```env
   SPRING_DATASOURCE_URL=jdbc:mysql://<your-db-host>:3306/foodbridge_db?useSSL=true
   SPRING_DATASOURCE_USERNAME=<db_user>
   SPRING_DATASOURCE_PASSWORD=<db_password>
   APP_JWT_SECRET=your_super_secret_64_char_key
   ```

---

## 3. Database Setup (PlanetScale / Aiven / AWS RDS)

1. Create a MySQL 8.0+ instance.
2. Run `database/schema.sql` to instantiate the 20 tables.
3. Run `database/seed.sql` to populate initial seed records.

---

## 4. Third-Party Integrations Setup

- **Cloudinary**: Create free account, copy Cloud Name & Upload Preset for image uploads.
- **Razorpay**: Generate Live API keys in Razorpay Dashboard -> API Keys.
- **Google Maps**: Enable Maps JavaScript API, Places API, and Directions API in Google Cloud Console.
