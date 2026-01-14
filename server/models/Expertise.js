const mongoose = require('mongoose');

const ExpertiseSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  headingContent: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Expertise', ExpertiseSchema);
