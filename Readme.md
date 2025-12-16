# 📝 Medium-Style Blogging Platform

A full-stack blogging platform inspired by Medium, built with a modern **edge-first architecture**.  
Users can sign up, write blogs, publish content, and manage their profiles using a clean, responsive UI.

---

## 🚀 Live Demo

- **Frontend:** https://mediumpl.vercel.app/
- **Backend API:** https://backend.princelohmod21.workers.dev/

---

## 🧠 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- React Router
- Axios
- Vite

### Backend
- Hono (Cloudflare Workers)
- Prisma (Edge Client + Accelerate)
- JWT Authentication

### Database
- Neon (Serverless PostgreSQL)

### Deployment
- **Frontend:** Vercel
- **Backend:** Cloudflare Workers
- **Database:** Neon

---

## ✨ Features

- User authentication (Sign up / Sign in)
- JWT-based authorization
- Protected routes
- Create & publish blog posts
- Read full blog articles
- Responsive design (mobile & desktop)
- Sticky appbar with avatar dropdown
- Profile page
- Edge-optimized backend
- Clean error handling & loaders

---

## 📂 Project Structure

```text
.
├── frontend/        # React frontend
├── backend/         # Hono + Prisma backend (Cloudflare Workers)
├── common/          # Shared types (build-time only)
└── README.md
