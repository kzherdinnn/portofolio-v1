const Experience = require('../models/Experience');

const experienceData = [
  {
    role: 'Full Stack Developer',
    company: 'Tech Innovators Inc.',
    period: 'Jan 2023 - Present',
    location: 'Jakarta, Indonesia',
    description: 'Memimpin pengembangan aplikasi web full-stack menggunakan MERN stack. Bertanggung jawab atas arsitektur sistem, implementasi fitur baru, dan optimasi performa aplikasi. Berkolaborasi dengan tim desain dan product manager untuk menghasilkan solusi yang user-friendly.',
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
    description: 'Mengembangkan dan memelihara aplikasi web responsif menggunakan React dan Vue.js. Mengimplementasikan design system dan component library untuk konsistensi UI/UX. Meningkatkan performa aplikasi dengan code splitting dan lazy loading.',
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
    description: 'Membantu tim backend dalam pengembangan RESTful API menggunakan Node.js dan Express. Melakukan integrasi dengan database MongoDB dan PostgreSQL. Menulis unit test dan dokumentasi API menggunakan Swagger.',
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
    description: 'Mengerjakan berbagai proyek freelance untuk klien lokal dan internasional. Membuat website company profile, e-commerce, dan landing page. Mengelola hosting dan deployment menggunakan Vercel dan Netlify.',
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
  { name: 'MOBILE', label: 'Pengembangan Seluler' },
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
    title: 'Aritmatika Solver',
    slug: 'aritmatika-solver',
    category: 'AI/ML',
    type: 'AI',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80',
    description: 'Program ini dirancang untuk mempermudah pengguna dalam menyelesaikan soal-soal Aritmatika secara otomatis dengan menggunakan bahasa pemrograman Python. Tujuan utama dari program ini adalah untuk membantu pengguna, terutama pelajar, dalam menyelesaikan soal-soal Aritmatika dengan lebih cepat dan mudah.',
    technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'Tkinter'],
    features: [
      'Menghitung suku tertentu dari barisan aritmatika dengan rumus suku ke-n.',
      'Menentukan suku pertama atau beda jika hanya dua suku diketahui.',
      'Menghitung jumlah n suku pertama dengan langkah perhitungan yang jelas.',
      'Antarmuka pengguna yang sederhana dan mudah digunakan.'
    ],
    link: 'https://example.com/aritmatika',
    github: 'https://github.com/example/aritmatika'
  },
  {
    title: 'AutoChat-Discord',
    slug: 'autochat-discord',
    category: 'Full-Stack Development',
    type: 'FULLSTACK',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=900&q=80',
    description: 'AutoChat adalah solusi otomatisasi untuk mengirim pesan ke saluran Discord secara terjadwal. Dibangun dengan Node.js dan Discord.js, alat ini memungkinkan komunitas untuk tetap aktif dengan pesan otomatis yang dapat disesuaikan sepenuhnya.',
    technologies: ['Node.js', 'Discord.js', 'MongoDB', 'Cron Jobs'],
    features: [
      'Pengiriman pesan otomatis terjadwal (interval waktu kustom).',
      'Dukungan multi-channel dan multi-server.',
      'Dashboard admin berbasis web untuk mengelola pesan.',
      'Log aktivitas real-time.'
    ],
    link: 'https://example.com/autochat',
    github: 'https://github.com/example/autochat'
  },
  {
    title: 'Buku Catatan',
    slug: 'buku-catatan',
    category: 'Full-Stack Development',
    type: 'FULLSTACK',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=80',
    description: 'Buku Catatan adalah website yang memungkinkan pengguna untuk membuat, menyimpan, dan mengelola catatan secara digital. Dibuat dengan React dan Firebase, aplikasi ini menawarkan sinkronisasi real-time dan akses offline untuk produktivitas maksimal.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
    features: [
      'CRUD Catatan (Create, Read, Update, Delete).',
      'Kategorisasi catatan dengan label warna.',
      'Pencarian catatan instan.',
      'Mode gelap dan terang.'
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
