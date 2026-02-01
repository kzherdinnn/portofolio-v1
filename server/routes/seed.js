const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController');

// Seed experience data
router.post('/experience', seedController.seedExperience);

module.exports = router;
