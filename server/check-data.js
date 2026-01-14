const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Project = require('./models/Project');

async function checkProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const projects = await Project.find();
    
    console.log(`Found ${projects.length} projects:\n`);
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Image: ${project.image}`);
      console.log(`   Type: ${project.type}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkProjects();
