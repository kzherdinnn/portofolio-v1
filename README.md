# 🚀 Cyber-Tech Portfolio - Herdin

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

---

## 📝 Description
A modern, high-performance portfolio website built with a **MERN Stack Architecture**. This project features a distinctive cyber/tech aesthetic with dynamic content management, an integrated admin dashboard, and immersive user experiences. It is designed to be fully responsive, lightning-fast, and easy to maintain.

### 📅 Last Update
> **February 13, 2026**
> - Project Cleanup: Removed unused models, routes, and controllers.
> - Database Optimization: Cleaned up legacy collections (`logs`, `contacts`, `expertise`).
> - Frontend Refactoring: Optimized API utilities and removed dead code.
> - Color Scheme: Finalized Cyan Accent Theme across all components.

---

## ✨ Key Features

### 🖥️ Frontend (Client)
- **Cyber-Tech Aesthetic:** Matrix rain effects, glitch transitions, neon glows, and terminal-inspired layouts.
- **Dynamic Content:** Individual project pages with slug-based routing (`/project/:slug`).
- **Responsive Layout:** Mobile-first approach with a unique "Mobile Terminal" vibe.
- **Micro-interactions:** Custom cursors, smooth Framer Motion animations, and 3D card effects.
- **Modern Stack:** Built with **React 18**, **TypeScript**, and **Vite** for blistering speed.

### ⚙️ Backend (Server)
- **RESTful API:** Robust Node.js/Express backend following clean architecture.
- **Persistence:** MongoDB integration via Mongoose for Projects, Experience, and Certificates.
- **Admin Command Center:** Secure dashboard for full CRUD operations on portfolio content.
- **Cloud Media:** Integrated with **Cloudinary** for seamless image hosting.
- **Security:** JWT authentication, Bcrypt encryption, and CORS protection.

---

## 🛠️ Tech Stack

| Frontend | Backend | DevOps / Tools |
| :--- | :--- | :--- |
| React 18 & TypeScript | Node.js & Express | Vercel (Frontend Hosting) |
| Tailwind CSS | MongoDB & Mongoose | Cloudinary (Assets) |
| Framer Motion | JSON Web Token (JWT) | Web3Forms (Contact) |
| React Router 7 | Bcrypt.js | Vite & PostCSS |

---

## 📂 Project Structure

```bash
portfolio/
├── client/              # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── pages/       # Page components (Home, Admin, etc.)
│   │   ├── components/  # Reusable UI Blocks
│   │   ├── hooks/       # Custom React logic
│   │   └── utils/       # API services & Helpers
│   └── ...
├── server/              # Backend Application (Express)
│   ├── models/          # Database Schemas
│   ├── routes/          # Express Route definitions
│   ├── controllers/     # Business Logic
│   └── ...
└── api/                 # Vercel Serverless entry points
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/kzherdinnn/portofolio-v1.git
cd portofolio-v1
```

### 2. Install Dependencies
Install all dependencies for both client and server:
```bash
# From root directory
npm run install-all
```

### 3. Environment Configuration
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. Running Locally
**Backend:**
```bash
cd server && npm run dev
```

**Frontend:**
```bash
cd client && npm run dev
```

---

## � Author

**Herdin**
- **GitHub:** [@kzherdinnn](https://github.com/kzherdinnn)
- **Portfolio:** [kzherdin.my.id](https://kzherdin.my.id/)
- **LinkedIn:** [kzherdin](https://linkedin.com/in/kzherdin)

---
<div align="center">
  Built with 💙, ☕, and a lot of debugging.
</div>
