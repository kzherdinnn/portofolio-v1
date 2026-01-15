const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        console.log('✅ Connected to MongoDB');

        const adminExists = await User.findOne({ username: 'admin' });

        if (adminExists) {
            console.log('⚠️ Admin user already exists');
            process.exit(0);
        }

        const user = await User.create({
            username: 'admin',
            password: 'admin123' 
        });

        console.log('✅ Admin user created successfully!');
        console.log('Username: admin');
        console.log('Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
