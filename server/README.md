# Portfolio Backend API

Backend server for Alex Chen's portfolio website with contact form functionality.

## 🚀 Features

- ✅ Contact form submission with validation
- ✅ MongoDB database storage
- ✅ Email notifications (optional)
- ✅ Message statistics API
- ✅ CRUD operations for messages
- ✅ CORS enabled for frontend integration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

## 🛠️ Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio

# Optional: Email configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-receiving-email@gmail.com
```

## 🏃 Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### Contact Form

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

#### Get All Messages (Admin)
```http
GET /api/contact?page=1&limit=10&isRead=false
```

#### Mark Message as Read
```http
PATCH /api/contact/:id/read
```

#### Delete Message
```http
DELETE /api/contact/:id
```

### Statistics

#### Get Message Stats
```http
GET /api/messages/stats
```

Response:
```json
{
  "success": true,
  "data": {
    "total": 25,
    "unread": 5,
    "read": 20,
    "recentWeek": 3
  }
}
```

### Health Check
```http
GET /api/health
```

## 🗄️ Database Schema

### Contact Model
```javascript
{
  name: String (required, 2-100 chars),
  email: String (required, valid email),
  subject: String (required, 5-200 chars),
  message: String (required, 10-2000 chars),
  isRead: Boolean (default: false),
  createdAt: Date (auto-generated)
}
```

## 📧 Email Configuration (Optional)

To enable email notifications:

1. For Gmail, create an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password

2. Update `.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
EMAIL_TO=where-to-receive@gmail.com
```

## 🔒 Security Notes

⚠️ **Important for Production:**

1. Add authentication middleware for admin routes
2. Implement rate limiting
3. Add input sanitization
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Add CSRF protection

## 🧪 Testing

Test the API using:
- Postman
- Thunder Client (VS Code extension)
- cURL

Example cURL:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## 📝 License

MIT
