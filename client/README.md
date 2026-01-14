# Portfolio Client (Frontend)

React + TypeScript + Vite frontend for the portfolio website.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Icons** - Icon library

## 🎯 Features

- ✅ Responsive design
- ✅ Smooth animations
- ✅ Interactive contact form
- ✅ Project showcase
- ✅ Experience timeline
- ✅ Dark theme

## 📁 Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── projectDetail.tsx
│   │   └── homeutils/
│   │       ├── ContactForm.tsx
│   │       ├── Experience.tsx
│   │       ├── Projects.tsx
│   │       └── BottomNav.tsx
│   ├── utils/
│   │   ├── AppConstants.ts
│   │   ├── projectData.ts
│   │   ├── NavBar.tsx
│   │   └── ExpertiseCard.tsx
│   ├── hooks/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
└── package.json
```

## 🔧 Configuration

### Environment Variables
Create `.env` file if needed:
```env
VITE_API_URL=http://localhost:5000
```

### API Integration
The contact form connects to the backend API at `http://localhost:5000/api/contact`

Update the API URL in `src/pages/homeutils/ContactForm.tsx` if your backend runs on a different port.

## 🎨 Customization

### Update Personal Information
- `src/utils/AppConstants.ts` - Name and tagline
- `src/utils/projectData.ts` - Your projects
- `src/pages/homeutils/Experience.tsx` - Your experience
- `src/pages/homeutils/BottomNav.tsx` - Contact information

### Styling
- `src/index.css` - Global styles and Tailwind configuration
- `tailwind.config.js` - Tailwind theme customization

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Port already in use
If port 5173 is busy, Vite will automatically use the next available port.

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

Part of the full-stack portfolio project. See main README for complete setup instructions.
