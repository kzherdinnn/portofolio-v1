const Experience = require('../models/Experience');

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

exports.seedExperience = async (req, res) => {
  try {
    // Clear existing experience data
    await Experience.deleteMany({});
    
    // Insert new experience data
    const experiences = await Experience.insertMany(experienceData);
    
    res.json({
      success: true,
      message: `Successfully seeded ${experiences.length} experience entries`,
      data: experiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding experience data',
      error: error.message
    });
  }
};

const projectTypeData = [
  { name: 'FULLSTACK', label: 'Full-Stack' },
  { name: 'AI', label: 'AI/ML' },
  { name: 'MOBILE', label: 'Mobile Development' },
  { name: 'BLOCKCHAIN', label: 'Blockchain' }
];

const ProjectType = require('../models/ProjectType');

exports.seedProjectTypes = async (req, res) => {
  try {
    // Clear existing
    await ProjectType.deleteMany({});
    
    // Insert new
    const types = await ProjectType.insertMany(projectTypeData);
    
    res.json({
      success: true,
      message: `Successfully seeded ${types.length} project types`,
      data: types
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding project types',
      error: error.message
    });
  }
};


const Project = require('../models/Project');

const projectData = [
  {
    title: 'Arithmetic Solver',
    slug: 'arithmetic-solver',
    category: 'AI/ML',
    type: 'AI',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80',
    description: 'This program is designed to make it easier for users to solve Arithmetic problems automatically using the Python programming language. The main goal of this program is to help users, especially students, solve Arithmetic problems faster and more easily.',
    technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'Tkinter'],
    features: [
      'Calculating a specific term of an arithmetic sequence with the n-th term formula.',
      'Determining the first term or difference if only two terms are known.',
      'Calculating the sum of the first n terms with clear calculation steps.',
      'Simple and easy-to-use user interface.'
    ],
    link: 'https://example.com/arithmetic',
    github: 'https://github.com/example/arithmetic'
  },
  {
    title: 'AutoChat-Discord',
    slug: 'autochat-discord',
    category: 'Full-Stack Development',
    type: 'FULLSTACK',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=900&q=80',
    description: 'AutoChat is an automation solution for sending messages to Discord channels on a scheduled basis. Built with Node.js and Discord.js, this tool allows communities to stay active with fully customizable automated messages.',
    technologies: ['Node.js', 'Discord.js', 'MongoDB', 'Cron Jobs'],
    features: [
      'Scheduled automated message sending (custom time intervals).',
      'Multi-channel and multi-server support.',
      'Web-based admin dashboard to manage messages.',
      'Real-time activity logs.'
    ],
    link: 'https://example.com/autochat',
    github: 'https://github.com/example/autochat'
  },
  {
    title: 'Note Book',
    slug: 'note-book',
    category: 'Full-Stack Development',
    type: 'FULLSTACK',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=80',
    description: 'Note Book is a website that allows users to create, save, and manage notes digitally. Built with React and Firebase, this application offers real-time synchronization and offline access for maximum productivity.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
    features: [
      'CRUD Notes (Create, Read, Update, Delete).',
      'Categorize notes with color labels.',
      'Instant note search.',
      'Dark and light mode.'
    ],
    link: 'https://example.com/notes',
    github: 'https://github.com/example/notes'
  }
];

exports.seedProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    const projects = await Project.insertMany(projectData);
    res.json({
      success: true,
      message: `Successfully seeded ${projects.length} projects`,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding projects',
      error: error.message
    });
  }
};
