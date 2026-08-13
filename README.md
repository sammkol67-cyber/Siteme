# Manga Platform (Scaffold)

This repository scaffold contains a full-stack Manga & Manhwa platform starter:
- Frontend: Next.js + TypeScript + Tailwind, PWA-ready, bilingual (Persian default + English), RTL support
- Backend: NestJS + TypeScript + Prisma, JWT auth (access & refresh), Swagger
- Database: PostgreSQL (Prisma)
- Local object storage: MinIO (S3-compatible)
- Docker compose for local development (Postgres + MinIO)

This scaffold provides:
- Authentication (register/login/logout/refresh)
- Users with roles (user/moderator/admin/superadmin)
- Seed script to create roles and a superadmin account (with forced password change)
- i18n and RTL/LTR handling on the frontend
- Docker compose, .env.example, and scripts to run migrations and seed

Important: This scaffold includes no production secrets. Fill .env from .env.example.

Temporary seeded superadmin (via scripts/seed.ts):
- username: superadmin
- email: admin@example.com
- temporary password: R!9vXq#7bP4mZf2K
- Note: force_password_change flag set. Change the password on first login.

Quickstart (local, with Docker)
1. Install Docker & docker-compose
2. Copy .env.example to .env and fill values.
3. Start DB and MinIO:
   docker-compose up -d
4. Install backend deps and run migrations & seed:
   cd backend
   npm install
   npx prisma migrate dev --name init
   npm run seed
   npm run start:dev
5. Install frontend deps and run:
   cd ../frontend
   npm install
   npm run dev
6. Open http://localhost:3000

See detailed instructions below.
