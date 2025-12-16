📝 Medium-Style Blogging Platform

A full-stack blogging platform inspired by Medium, built with a modern Edge-first architecture.
Users can sign up, write blogs, publish content, and manage their profiles with a clean, responsive UI.

🚀 Live Demo

Frontend: https://mediumpl.vercel.app/

Backend API: https://backend.princelohmod21.workers.dev/

🧠 Tech Stack
Frontend

React + TypeScript

Tailwind CSS

React Router

Axios

Vite

Backend

Hono (Cloudflare Workers)

Prisma (Edge Client + Accelerate)

JWT Authentication

Database

Neon (Serverless PostgreSQL)

Deployment

Frontend: Vercel

Backend: Cloudflare Workers

Database: Neon

✨ Features

User authentication (Sign up / Sign in)

JWT-based authorization

Protected routes

Create & publish blog posts

Read full blog articles

Responsive design (mobile & desktop)

Sticky appbar with avatar dropdown

Profile page

Edge-optimized backend

Clean error handling & loaders

📂 Project Structure
.
├── frontend/        # React frontend
├── backend/         # Hono + Prisma backend (Cloudflare Workers)
├── common/          # Shared types (build-time only)
└── README.md


common is a shared package used during development/build time and is not deployed as a service.

🔐 Environment Variables
Backend (Cloudflare Workers)

Set using Wrangler secrets:

wrangler secret put DATABASE_URL
wrangler secret put JWT_SECRET


DATABASE_URL → Prisma Accelerate / Neon connection

JWT_SECRET → JWT signing secret

Frontend (Vercel)
VITE_BACKEND_URL=https://your-backend.workers.dev

🛠️ Local Development
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

2️⃣ Backend setup
cd backend
npm install
wrangler dev


Prisma migrations should already be applied to Neon.

3️⃣ Frontend setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔒 Authentication Flow

JWT issued on successful sign in

Token stored in localStorage

Protected routes guarded on frontend

Backend validates JWT for every protected API call

🌍 Deployment
Backend
cd backend
wrangler deploy

Frontend

Import GitHub repo into Vercel

Set root directory to frontend

Add environment variables

Deploy

🧪 API Overview
Method	Endpoint	Description
POST	/api/v1/user/signup	Create user
POST	/api/v1/user/signin	Login
GET	/api/v1/user/me	Get current user
POST	/api/v1/blog	Create blog
GET	/api/v1/blog/bulk	Get all blogs
GET	/api/v1/blog/:id	Get single blog
🧩 Design Philosophy

Simple over clever

Edge-first backend

Clear separation of concerns

Mobile-first responsive UI

No unnecessary abstractions

📌 Future Improvements

Edit & delete blogs

User profile editing

Blog drafts

Pagination & infinite scroll

Comments system

Markdown editor

OAuth (Google/GitHub)

📄 License

This project is for learning and portfolio purposes.

👤 Author

Built by Prince
Final-semester BCA student exploring modern full-stack & edge architectures.
