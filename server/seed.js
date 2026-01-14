const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Expertise = require('./models/Expertise');
const Project = require('./models/Project');
const Experience = require('./models/Experience');

const expertiseData = [
  {
    icon: "SUBSTATION",
    heading: "Frontend",
    headingContent: "Development",
    description: "Proficient in React, Vue.js, Next.js, and modern CSS frameworks. Building responsive, accessible, and performant web applications with clean UI/UX.",
    displayOrder: 1
  },
  {
    icon: "MATLAB",
    heading: "Backend",
    headingContent: "Development",
    description: "Expert in Node.js, Express, Django, and Spring Boot. RESTful API design, microservices architecture, and database optimization.",
    displayOrder: 2
  },
  {
    icon: "AI",
    heading: "AI/Machine",
    headingContent: "Learning",
    description: "Experience with TensorFlow, PyTorch, and scikit-learn. Building CNN, RNN, and transformer models for computer vision and NLP tasks.",
    displayOrder: 3
  },
  {
    icon: "RENEWABLE",
    heading: "Database",
    headingContent: "Management",
    description: "Skilled in MySQL, PostgreSQL, MongoDB, and Redis. Database design, query optimization, and data modeling for scalable applications.",
    displayOrder: 4
  },
  {
    icon: "SAFETY",
    heading: "Cloud &",
    headingContent: "DevOps",
    description: "Hands-on experience with AWS, Docker, Kubernetes, and CI/CD pipelines. Infrastructure as Code and automated deployment strategies.",
    displayOrder: 5
  },
  {
    icon: "CONTROL",
    heading: "UI/UX",
    headingContent: "Design",
    description: "Creating intuitive user interfaces with Figma and Adobe XD. User research, wireframing, prototyping, and usability testing.",
    displayOrder: 6
  }
];

const projectsData = [
  {
    title: "E-Commerce Platform",
    slug: "ECOMMERCE",
    category: "Full-Stack Development",
    type: "FULLSTACK",
    image: "/projects/ecommerce-home.png",
    description: "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard."
  },
  {
    title: "Social Media Analytics",
    slug: "SOCIAL_MEDIA",
    category: "Full-Stack Development",
    type: "FULLSTACK",
    image: "/projects/analytics-overview.png",
    description: "Analytics dashboard for social media metrics and insights."
  },
  {
    title: "AI Customer Service Bot",
    slug: "AI_CHATBOT",
    category: "AI/Machine Learning",
    type: "AI",
    image: "/projects/chatbot-interface.png",
    description: "Intelligent chatbot using NLP for customer support automation."
  },
  {
    title: "Medical Image Classifier",
    slug: "IMAGE_CLASSIFIER",
    category: "AI/Machine Learning",
    type: "AI",
    image: "/projects/medical-upload.png",
    description: "Deep learning model for medical image classification and diagnosis."
  },
  {
    title: "Fitness Tracking App",
    slug: "MOBILE_FITNESS",
    category: "Mobile Development",
    type: "MOBILE",
    image: "/projects/fitness-dashboard.png",
    description: "Cross-platform mobile app for fitness tracking and workout planning."
  },
  {
    title: "Crypto Wallet App",
    slug: "BLOCKCHAIN_WALLET",
    category: "Blockchain Development",
    type: "BLOCKCHAIN",
    image: "/projects/wallet-dashboard.png",
    description: "Secure cryptocurrency wallet with multi-chain support."
  }
];

const experienceData = [
  {
    role: "Software Engineering Intern",
    company: "Tech Innovators Inc.",
    period: "Jun 2025 - Present",
    location: "Jakarta, Indonesia",
    description: "Developed and maintained full-stack web applications using React and Node.js. Collaborated with cross-functional teams to implement new features and optimize application performance. Reduced API response time by 40% through database query optimization.",
    backgroundColor: "#1d4ed8",
    logo: "tech-company.png",
    skills: ["React.js", "Node.js", "MongoDB", "REST API", "Git"]
  },
  {
    role: "AI Research Assistant",
    company: "University AI Lab",
    period: "Jan 2025 - May 2025",
    location: "Bandung, Indonesia",
    description: "Conducted research on deep learning models for computer vision tasks. Implemented CNN and transformer architectures for image classification, achieving 95%+ accuracy on benchmark datasets. Published findings in university journal.",
    backgroundColor: "#15803d",
    logo: "university-logo.png",
    skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "Research"]
  },
  {
    role: "Mobile Developer Intern",
    company: "StartupHub Indonesia",
    period: "Aug 2024 - Dec 2024",
    location: "Surabaya, Indonesia",
    description: "Developed cross-platform mobile applications using React Native and Flutter. Implemented features including user authentication, real-time notifications, and offline data synchronization. Collaborated with UI/UX team to create intuitive interfaces.",
    backgroundColor: "#740cdc",
    logo: "startup-logo.png",
    skills: ["React Native", "Flutter", "Firebase", "Redux", "UI/UX"]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Expertise.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert Expertise
    await Expertise.insertMany(expertiseData);
    console.log('✅ Inserted Expertise data');

    // Insert Projects
    await Project.insertMany(projectsData);
    console.log('✅ Inserted Projects data');

    // Insert Experience
    await Experience.insertMany(experienceData);
    console.log('✅ Inserted Experience data');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
