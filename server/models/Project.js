const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  category: {
    type: String,
    enum: ['Full-Stack Development', 'AI/Machine Learning', 'Mobile Development', 'Blockchain Development'],
    required: true
  },
  type: {
    type: String,
    enum: ['FULLSTACK', 'AI', 'MOBILE', 'BLOCKCHAIN'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: String,
  technologies: [String],
  link: String,
  github: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
