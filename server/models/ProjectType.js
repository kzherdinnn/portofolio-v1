const mongoose = require('mongoose');

const ProjectTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // e.g., "FULLSTACK"
  },
  label: {
    type: String,
    required: true // e.g., "Full-Stack Development"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProjectType', ProjectTypeSchema);
