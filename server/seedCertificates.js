const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const Certificate = require('./models/Certificate');

// Load .env from the same directory as this script
dotenv.config({ path: path.join(__dirname, '.env') });

const certificateData = [
    {
        title: 'Belajar Fundamental Aplikasi Android',
        issuer: 'Dicoding Indonesia',
        issueDate: 'Juni 2025',
        expirationDate: 'Juni 2028',
        credentialId: '4EXGVMGLQXRL',
        credentialUrl: 'https://www.dicoding.com/certificates/4EXGVMGLQXRL',
        image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070&auto=format&fit=crop',
        skills: ['Kotlin', 'Android Development', 'Mobile App Development'],
        displayOrder: 1
    },
    {
        title: 'Full Stack Web Development Professional Certificate',
        issuer: 'Meta',
        issueDate: 'December 2023',
        credentialId: 'META-FS-123456',
        credentialUrl: 'https://coursera.org/verify/meta-full-stack',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
        skills: ['React', 'Node.js', 'Django', 'API Design'],
        displayOrder: 1
    },
    {
        title: 'Advanced React and Redux',
        issuer: 'Udemy',
        issueDate: 'October 2023',
        credentialId: 'UC-RE-789012',
        credentialUrl: 'https://udemy.com/certificate/react-redux',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
        skills: ['React', 'Redux', 'Middleware', 'Testing'],
        displayOrder: 2
    },
    {
        title: 'Node.js Developer Course',
        issuer: 'Andrew Mead (Udemy)',
        issueDate: 'August 2023',
        credentialId: 'UC-NODE-345678',
        credentialUrl: 'https://udemy.com/certificate/node-developer',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
        skills: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
        displayOrder: 3
    },
    {
        title: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        issueDate: 'June 2023',
        credentialId: 'FCC-JS-901234',
        credentialUrl: 'https://www.freecodecamp.org/certification/js-algorithms',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop',
        skills: ['JavaScript', 'Algorithms', 'ES6', 'Functional Programming'],
        displayOrder: 4
    },
    {
        title: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        issueDate: 'April 2023',
        credentialId: 'FCC-RWD-567890',
        credentialUrl: 'https://www.freecodecamp.org/certification/responsive-web-design',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2051&auto=format&fit=crop',
        skills: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid'],
        displayOrder: 5
    },
    {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        issueDate: 'February 2023',
        credentialId: 'AWS-CP-112233',
        credentialUrl: 'https://aws.amazon.com/verification',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        skills: ['Cloud Computing', 'AWS Services', 'Security', 'Architecture'],
        displayOrder: 6
    }
];

const seedCertificates = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        console.log('✅ MongoDB Connected');

        // Clear existing certificate data
        await Certificate.deleteMany({});
        console.log('🗑️  Cleared existing certificate data');

        // Insert new certificate data
        const certificates = await Certificate.insertMany(certificateData);
        console.log(`✅ Successfully added ${certificates.length} certificate entries:`);
        
        certificates.forEach((cert, index) => {
            console.log(`   ${index + 1}. ${cert.title} by ${cert.issuer}`);
        });

        console.log('\n🎉 Certificate data seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding certificate data:', error);
        process.exit(1);
    }
};

seedCertificates();
