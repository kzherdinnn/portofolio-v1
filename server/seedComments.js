const mongoose = require('mongoose');
const Comment = require('./models/Comment');
const dotenv = require('dotenv');

dotenv.config();

const dummyComments = [
    {
        name: "Alex Thompson",
        message: "Great portfolio! I really like the clean design and the smooth animations. Keep it up! 🔥",
        isPinned: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
        name: "Sarah Jenkins",
        message: "Impressive work on the backend projects. The architecture seems very solid.",
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    },
    {
        name: "Michael Chen",
        message: "Hey, would love to connect and discuss a potential collaboration. Your skills match what we're looking for.",
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
        name: "David Park",
        message: "The dark mode implementation is flawless. Did you use Tailwind for this?",
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
    },
    {
        name: "Emily Wilson",
        message: "Love the interactive elements! very engaging user experience.",
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
    },
    {
        name: "Ryan Cooper",
        message: "Clean code structure. Checked your GitHub, good job man!",
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
    },
    {
        name: "Jessica Lee",
        message: "Just passing by to say hi! 👋",
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) // 1 week ago
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        console.log('✅ Connected to MongoDB');

        // Clear existing comments (optional, comment out if you want to keep existing)
        // await Comment.deleteMany({});
        // console.log('🗑️ Cleared existing comments');

        await Comment.insertMany(dummyComments);
        console.log('🌱 Added dummy comments!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
