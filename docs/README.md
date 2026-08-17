# FoodBridge Documentation Portal

Welcome to the production documentation for **FoodBridge** – A Production-Ready Food Surplus Marketplace Platform.

## Quick Index

- [API Specification](./API_DOCS.md) - Complete REST & WebSocket API endpoints reference.
- [Deployment Guide](./DEPLOYMENT.md) - Step-by-step production deployment for Vercel, Render, MySQL Cloud, Cloudinary, Razorpay, and Google Maps.
- [Swagger OpenAPI Docs](./SWAGGER.md) - OpenAPI 3.0 schema and interactive UI instructions.
- [Environment Configuration](./.env.example) - Complete list of environment variables.

---

## Architecture Overview

```
                        +----------------------------+
                        |  React + Vite + Tailwind   |
                        |      Frontend App          |
                        +--------------+-------------+
                                       |
                     REST APIs (Axios) | WebSockets (Stomp/SockJS)
                                       v
                        +----------------------------+
                        |    Java 17 Spring Boot     |
                        |     Production API         |
                        +--------------+-------------+
                                       |
            +--------------------------+--------------------------+
            |                          |                          |
            v                          v                          v
    +---------------+          +---------------+          +---------------+
    |  MySQL 8.0    |          |  Cloudinary   |          |   Razorpay    |
    |  Database     |          |  Image CDN    |          |   Payments    |
    +---------------+          +---------------+          +---------------+
```
