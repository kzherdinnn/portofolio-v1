# 🚀 Full-Stack Portfolio - Alex Chen

Modern portfolio website with **separate client and server architecture**.

## 📁 Project Structure

```
portfolio/
│
├── client/                 # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── projectDetail.tsx
│   │   │   └── homeutils/
│   │   │       ├── ContactForm.tsx      # ✨ Interactive contact form
│   │   │       ├── Experience.tsx
│   │   │       ├── Projects.tsx
│   │   │       └── BottomNav.tsx
│   │   ├── utils/
│   │   │   ├── AppConstants.ts
│   │   │   ├── projectData.ts
│   │   │   └── ...
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── server/                 # Backend (Node.js + Express + MongoDB)
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   ├── contact.js
│   │   └── messages.js
│   ├── controllers/
│   │   └── contactController.js
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── package.json            # Root package with helper scripts
└── README.md
```

---

## 🚀 Quick Start

### 1️⃣ Install Dependencies

**Option A: Install All at Once (from root)**
```bash
npm run install-all
```

**Option B: Install Separately**
```bash
# Client
cd client
npm install

# Server
cd server
npm install
```

### 2️⃣ Configure Environment

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio

# Optional: Email notifications
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=receiving-email@gmail.com
```

### 3️⃣ Run Development Servers

**You need 2 separate terminals:**

**Terminal 1 - Frontend:**
```bash
cd client
npm run dev
```
🌐 Frontend: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```
🔌 Backend API: `http://localhost:5000`

---

## 🎯 Features

### Frontend
- ✅ Modern React 18 + TypeScript
- ✅ Tailwind CSS styling
- ✅ Smooth animations
- ✅ Fully responsive design
- ✅ **Interactive contact form with backend integration**
- ✅ Project showcase with filtering
- ✅ Experience timeline
- ✅ SEO optimized

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database integration
- ✅ Contact form submission handler
- ✅ Email notifications (optional)
- ✅ Message management (CRUD)
- ✅ Statistics endpoint
- ✅ Input validation & error handling
- ✅ CORS enabled

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/contact` | Submit contact form |
| **GET** | `/api/contact` | Get all messages (admin) |
| **PATCH** | `/api/contact/:id/read` | Mark message as read |
| **DELETE** | `/api/contact/:id` | Delete message |
| **GET** | `/api/messages/stats` | Get statistics |
| **GET** | `/api/health` | Health check |

### Example: Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a project..."
  }'
```

---

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. **Install MongoDB:**
   - Windows: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
   - Mac: `brew install mongodb-community`
   - Linux: Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

3. **Use default connection in `.env`:**
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. Create free account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Get connection string
4. Update `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

---

## 📦 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

---

## 🎨 Customization

### Update Personal Information

1. **Name & Tagline**
   - `client/src/utils/AppConstants.ts`

2. **Projects**
   - `client/src/utils/projectData.ts`

3. **Experience**
   - `client/src/pages/homeutils/Experience.tsx`

4. **Contact Info**
   - `client/src/pages/homeutils/BottomNav.tsx`

5. **Resume**
   - Add your PDF to `client/public/` as `Alex_Chen_Resume.pdf`

---

## 🚢 Deployment

### Frontend (Vercel - Recommended)

1. **Build the client:**
```bash
cd client
npm run build
```

2. **Deploy to Vercel:**
   - Connect your GitHub repo
   - Set build command: `cd client && npm run build`
   - Set output directory: `client/dist`
   - Deploy!

### Backend (Render / Railway / Heroku)

1. **Render.com (Free tier):**
   - Create new Web Service
   - Connect GitHub repo
   - Set build command: `cd server && npm install`
   - Set start command: `cd server && npm start`
   - Add environment variables

2. **Railway.app:**
   - Connect GitHub repo
   - Railway auto-detects Node.js
   - Add environment variables
   - Deploy!

### Environment Variables for Production

Don't forget to set these in your deployment platform:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=receiving-email@gmail.com
```

---

## 🧪 Testing

### Test Contact Form

1. Start both servers (client & server)
2. Navigate to `http://localhost:5173`
3. Scroll to "Get In Touch" section
4. Fill out the form and submit
5. Check MongoDB for the saved message
6. Check your email if notifications are configured

### Test API Directly

```bash
# Health check
curl http://localhost:5000/api/health

# Get statistics
curl http://localhost:5000/api/messages/stats
```

---

## 📝 Available Scripts

### Root Directory
- `npm run install-all` - Install dependencies for both client and server
- `npm run client` - Run client dev server
- `npm run server` - Run server dev server
- `npm run build` - Build client for production

### Client Directory
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Directory
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start production server

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend connection error
- ✅ Check if MongoDB is running
- ✅ Verify `MONGODB_URI` in `.env`
- ✅ Check firewall settings
- ✅ For Atlas: Check IP whitelist

### CORS errors
- ✅ Ensure backend is running on port 5000
- ✅ Check API URL in `ContactForm.tsx`
- ✅ Verify CORS is enabled in `server/index.js`

### Port already in use
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

---

## 📚 Documentation

- [Client README](./client/README.md) - Frontend documentation
- [Server README](./server/README.md) - Backend documentation

---

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file

---

## 👨‍💻 Author

**Alex Chen**
- Portfolio: [Your deployed URL]
- GitHub: [@alexchen](https://github.com/alexchen)
- LinkedIn: [Alex Chen](https://www.linkedin.com/in/alexchen)
- Email: alex.chen@example.com

---

Built with ❤️ using React, Node.js, and MongoDB
