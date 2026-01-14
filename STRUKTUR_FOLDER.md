# 📁 Struktur Folder Portfolio

## Struktur Lengkap

```
C:\Users\herdinkz\Downloads\portfolio\
│
├── 📁 client/                          # FRONTEND
│   │
│   ├── 📁 src/                         # Source code React
│   │   ├── 📁 pages/
│   │   │   ├── Home.tsx
│   │   │   ├── projectDetail.tsx
│   │   │   └── 📁 homeutils/
│   │   │       ├── ContactForm.tsx     # ✨ Form kontak dengan backend
│   │   │       ├── Experience.tsx      # Pengalaman kerja
│   │   │       ├── Projects.tsx        # Daftar project
│   │   │       ├── ProjectCard.tsx
│   │   │       └── BottomNav.tsx       # Footer & contact
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── AppConstants.ts         # Nama & tagline
│   │   │   ├── projectData.ts          # Data project
│   │   │   ├── AppContext.tsx
│   │   │   ├── NavBar.tsx
│   │   │   ├── ExpertiseCard.tsx
│   │   │   └── animations/
│   │   │       └── Animate.tsx
│   │   │
│   │   ├── 📁 hooks/
│   │   │   └── appHooks.ts
│   │   │
│   │   ├── App.tsx                     # Main app component
│   │   ├── main.tsx                    # Entry point
│   │   └── index.css                   # Global styles
│   │
│   ├── 📁 public/                      # Static files
│   │   ├── favicon.ico
│   │   ├── images/
│   │   └── Alex_Chen_Resume.pdf        # Resume (tambahkan sendiri)
│   │
│   ├── 📁 node_modules/                # Dependencies (auto-generated)
│   │
│   ├── index.html                      # HTML template
│   ├── package.json                    # Dependencies & scripts
│   ├── package-lock.json
│   ├── vite.config.ts                  # Vite configuration
│   ├── tsconfig.json                   # TypeScript config
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── tailwind.config.js              # Tailwind CSS config
│   ├── postcss.config.js
│   ├── eslint.config.js                # ESLint config
│   ├── vercel.json                     # Vercel deployment
│   └── README.md                       # Client documentation
│
├── 📁 server/                          # BACKEND
│   │
│   ├── 📁 models/                      # MongoDB schemas
│   │   └── Contact.js                  # Contact message model
│   │
│   ├── 📁 routes/                      # API routes
│   │   ├── contact.js                  # Contact endpoints
│   │   └── messages.js                 # Statistics endpoint
│   │
│   ├── 📁 controllers/                 # Business logic
│   │   └── contactController.js        # Contact form handler
│   │
│   ├── 📁 node_modules/                # Dependencies (auto-generated)
│   │
│   ├── index.js                        # Server entry point
│   ├── .env                            # Environment variables (JANGAN DI-COMMIT!)
│   ├── package.json                    # Dependencies & scripts
│   ├── package-lock.json
│   └── README.md                       # Server documentation
│
├── 📁 .git/                            # Git repository
│
├── .gitignore                          # Files to ignore in git
├── package.json                        # Root helper scripts
├── README.md                           # Main documentation
└── LICENSE                             # MIT License
```

---

## 🎯 Penjelasan Folder

### 📁 client/ (Frontend)
**Teknologi:** React + TypeScript + Vite + Tailwind CSS

**Fungsi:**
- User interface portfolio
- Animasi dan interaksi
- Contact form yang terhubung ke backend
- Responsive design

**Port:** `http://localhost:5173` (atau 5174 jika 5173 terpakai)

---

### 📁 server/ (Backend)
**Teknologi:** Node.js + Express + MongoDB + Mongoose

**Fungsi:**
- REST API untuk contact form
- Menyimpan pesan ke database
- Mengirim email notifikasi (optional)
- Manajemen pesan (CRUD operations)

**Port:** `http://localhost:5000`

---

## 🚀 Cara Kerja

```
User mengisi form
      ↓
Frontend (React)
      ↓
HTTP POST ke Backend
      ↓
Express API Handler
      ↓
Validasi Data
      ↓
Simpan ke MongoDB
      ↓
Kirim Email (optional)
      ↓
Response ke Frontend
      ↓
Tampilkan success message
```

---

## 📝 File Penting untuk Dikustomisasi

### Frontend (client/)
1. `src/utils/AppConstants.ts` → Nama & tagline Anda
2. `src/utils/projectData.ts` → Project-project Anda
3. `src/pages/homeutils/Experience.tsx` → Pengalaman kerja Anda
4. `src/pages/homeutils/BottomNav.tsx` → Email & social media Anda
5. `public/Alex_Chen_Resume.pdf` → Resume Anda (PDF)

### Backend (server/)
1. `.env` → MongoDB URI & email configuration
2. `models/Contact.js` → Schema database (jika perlu modifikasi)

---

## ⚙️ Environment Variables

### server/.env
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio

# Optional: Email notifications
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=receiving-email@gmail.com
```

---

## 🔒 File yang TIDAK boleh di-commit ke Git

✅ Sudah ada di `.gitignore`:
- `node_modules/`
- `.env`
- `dist/`
- `.vite/`
- Log files

---

## 📊 Ukuran Folder (Estimasi)

```
client/
├── node_modules/  ~200-300 MB
├── src/           ~1-2 MB
└── public/        ~1-5 MB (tergantung gambar)

server/
├── node_modules/  ~50-100 MB
└── source files   ~100 KB
```

**Total:** ~250-400 MB (kebanyakan dari node_modules)

---

## 🧹 Cara Membersihkan

Jika ingin menghapus semua dependencies dan build files:

```bash
# Hapus node_modules di client
cd client
rm -rf node_modules

# Hapus node_modules di server
cd ../server
rm -rf node_modules

# Hapus build files
cd ../client
rm -rf dist .vite
```

Kemudian install ulang:
```bash
npm run install-all
```

---

Struktur ini mengikuti best practice untuk **monorepo** dengan client dan server terpisah! 🎉
