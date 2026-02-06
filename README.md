# 🚀 Cyber-Tech Portfolio - Herdin

A modern, high-performance portfolio website built with a **Full-Stack Architecture**. This project features a distinctive cyber/tech aesthetic with dynamic content management, an admin dashboard, and immersive user experiences.

## ✨ Key Features

### 🎨 Frontend (Client)
- **Cyber/Tech Aesthetic:** "Matrix" rain, glitch effects, neon glows, and terminal-style layouts.
- **Dynamic Routing:** Individual project pages with slug-based routing (`/project/:slug`).
- **Responsive Design:** Optimized for all devices with unique "Mobile Terminal" vibes.
- **Interactive UI:** Smooth animations, custom cursors, and 3D card effects.
- **Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite, Framer Motion.

### 🛠 Backend (Server)
- **RESTful API:** Built with Node.js and Express.
- **MongoDB Database:** Stores Projects, Experience, Certificates, and Messages.
- **Admin Dashboard:** Secure interface to manage all portfolio content (CRUD operations).
- **Data Seeding:** Scripts to populate the database with dummy data for testing.
- **Security:** Standard security practices with CORS and environment variable protection.

## 📂 Project Structure

```bash
portfolio/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── pages/          # Home, ProjectDetail, AdminDashboard, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Helper functions and API services
│   └── ...
├── server/                 # Backend Application
│   ├── models/             # Mongoose Schemas (Project, Experience, etc.)
│   ├── routes/             # API Routes
│   ├── controllers/        # Business logic
│   └── ...
└── ...
```

## 🚀 Quick Start

### 1. clone the repository
```bash
git clone https://github.com/kzherdinnn/portofolio-v1.git
cd portofolio-v1
```

### 2. Install Dependencies
Quickly install dependencies for both client and server:
```bash
# Root directory
npm run install-all
```
*Or manually:*
```bash
cd client && npm install
cd ../server && npm install
```

### 3. Environment Setup
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
# Add other necessary keys if any
```

### 4. Run Development Servers
You can run both client and server concurrently (if configured) or in separate terminals.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.

## 🛡️ Admin Dashboard
Access the endpoint `/admin` to manage your content.
*Note: Ensure you have authentication set up or allow-list your IP in production if strictly internal.*

## 💾 Data Seeding
To populate your database with initial data (Projects, etc.):
```bash
# Make a POST request to the seed endpoint (dev mode only recommended)
curl -X POST http://localhost:5000/api/seed/projects
```

## 🚢 Deployment

**Frontend:** Deployed on **Vercel** for optimal performance and CD.
**Backend:** Can be deployed on **Render**, **Railway**, or **Vercel** (as serverless functions if adapted).

## 👨‍💻 Author

**Herdin**
- **GitHub:** [@kzherdinnn](https://github.com/kzherdinnn)
- **Portfolio:** [https://kzherdin.onesite.my.id/](https://kzherdin.onesite.my.id/)

---
*Built with ❤️ and ☕ by Herdin*
