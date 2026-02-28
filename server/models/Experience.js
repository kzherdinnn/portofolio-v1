const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String, // 'Internship', 'Full-time', etc. optional
    default: 'Full-time'
  },
  logo: {
    type: String // URL or path to logo
  },
  backgroundColor: {
    type: String,
    default: '#1d4ed8' // Default blue-700
  },
  skills: [String],
  displayOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Experience', ExperienceSchema);
