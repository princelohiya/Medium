# Blogging App (Medium-Like) — Full Stack Project

A full-stack blogging platform inspired by Medium where users can sign up, log in, write posts, and read articles. The project is structured as a monorepo with separate frontend, backend, and shared code.

---

## 📁 Project Structure

```
blogging-app-like-medium/
│
├── backend/     → Cloudflare Workers API + Prisma
├── frontend/    → React + Vite client
├── common/      → Shared types and validation (Zod)
├── screenshots  → UI images
└── README.md
```

---

## 🚀 Features

* User authentication (Signup/Login)
* Create and publish blog posts
* View all published posts
* Shared validation using Zod
* Monorepo architecture
* Cloudflare Worker backend
* PostgreSQL database with Prisma ORM

---

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* TypeScript
* Axios

**Backend**

* Cloudflare Workers
* Node.js
* TypeScript
* Prisma ORM

**Database**

* PostgreSQL

**Shared**

* Zod (schema validation)

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/syedahmedullah14/blogging-app-like-medium.git
cd blogging-app-like-medium
```

---

### 2️⃣ Install Dependencies

Install packages inside each folder:

```bash
cd common
npm install

cd ../frontend
npm install

cd ../backend
npm install
```

---

### 3️⃣ Setup PostgreSQL

Create a database:

```sql
CREATE DATABASE blogapp;
```

---

### 4️⃣ Configure Environment Variables

Create `.env` inside **backend/**:

```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/blogapp"
JWT_SECRET="your_secret_key"
```

Also copy the same file inside:

```
backend/prisma/.env
```

---

### 5️⃣ Setup Prisma

Inside backend:

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

This will:

* Generate Prisma client
* Create database tables

---

### 6️⃣ Run Backend

```bash
wrangler dev --no-live-reload
```

Backend runs at:

```
http://127.0.0.1:8787
```

---

### 7️⃣ Run Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

| Variable     | Description                          |
| ------------ | ------------------------------------ |
| DATABASE_URL | PostgreSQL connection string         |
| JWT_SECRET   | Secret key for authentication tokens |

---

## 🧪 Development Notes

* The backend uses Cloudflare Workers and runs locally using Wrangler.
* Prisma handles database schema and queries.
* The `common` folder stores shared validation schemas used by both frontend and backend.
* Use PostgreSQL locally for development.

---

## 📦 Scripts

### Backend

```bash
wrangler dev
npx prisma generate
npx prisma migrate dev
```

### Frontend

```bash
npm run dev
npm run build
```

---

## 📸 Screenshots

Project includes UI previews:

### Home Page
![Home Page](screenshots/1.png)

### Create Post
![Create Post](screenshots/2.png)

### Blog List
![Blog List](screenshots/3.png)

### Login Page
![Login Page](screenshots/4.png)


## 📌 Future Improvements

* Comments system
* Like/Bookmark feature
* User profiles
* Rich text editor
* Image upload support

---

## 👨‍💻 Author

Built as a full-stack learning project demonstrating:

* Cloudflare Workers
* Prisma ORM
* PostgreSQL
* React + TypeScript
* Monorepo architecture

---

## 📄 License

This project is for educational purposes.
