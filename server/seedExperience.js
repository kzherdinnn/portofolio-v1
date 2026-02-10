const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Experience = require('./models/Experience');

dotenv.config();

const experienceData = [
  {
    role: 'Full Stack Developer',
    company: 'Tech Innovators Inc.',
    period: 'Jan 2023 - Present',
    location: 'Jakarta, Indonesia',
    description: 'Lead full-stack web application development using the MERN stack. Responsible for system architecture, implementing new features, and optimizing application performance. Collaborating with design teams and product managers to deliver user-friendly solutions.',
    type: 'Full-time',
    logo: 'https://via.placeholder.com/150/02ffff/000000?text=TI',
    backgroundColor: '#1d4ed8',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Docker', 'AWS']
  },
  {
    role: 'Frontend Developer',
    company: 'Digital Solutions Co.',
    period: 'Jun 2021 - Dec 2022',
    location: 'Bandung, Indonesia',
    description: 'Developing and maintaining responsive web applications using React and Vue.js. Implementing design systems and component libraries for UI/UX consistency. Improving application performance with code splitting and lazy loading.',
    type: 'Full-time',
    logo: 'https://via.placeholder.com/150/a855f7/ffffff?text=DSC',
    backgroundColor: '#7c3aed',
    skills: ['React', 'Vue.js', 'Tailwind CSS', 'JavaScript', 'Git', 'Figma']
  },
  {
    role: 'Backend Developer Intern',
    company: 'StartUp Ventures',
    period: 'Jan 2021 - May 2021',
    location: 'Yogyakarta, Indonesia',
    description: 'Assisting the backend team in developing RESTful APIs using Node.js and Express. Integrating with MongoDB and PostgreSQL databases. Writing unit tests and API documentation using Swagger.',
    type: 'Internship',
    logo: 'https://via.placeholder.com/150/10b981/ffffff?text=SV',
    backgroundColor: '#059669',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API', 'Jest']
  },
  {
    role: 'Web Developer',
    company: 'Freelance',
    period: 'Aug 2020 - Dec 2020',
    location: 'Remote',
    description: 'Working on various freelance projects for local and international clients. Creating company profile websites, e-commerce platforms, and landing pages. Managing hosting and deployment using Vercel and Netlify.',
    type: 'Freelance',
    logo: 'https://via.placeholder.com/150/f59e0b/000000?text=FL',
    backgroundColor: '#d97706',
    skills: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Vercel', 'Netlify']
  }
];

const seedExperience = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ MongoDB Connected');

    // Clear existing experience data
    await Experience.deleteMany({});
    console.log('🗑️  Cleared existing experience data');

    // Insert new experience data
    const experiences = await Experience.insertMany(experienceData);
    console.log(`✅ Successfully added ${experiences.length} experience entries:`);
    
    experiences.forEach((exp, index) => {
      console.log(`   ${index + 1}. ${exp.role} at ${exp.company}`);
    });

    console.log('\n🎉 Experience data seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding experience data:', error);
    process.exit(1);
  }
};

seedExperience();
