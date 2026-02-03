const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController');

// Seed experience data
router.post('/experience', seedController.seedExperience);
router.post('/project-types', seedController.seedProjectTypes);
router.post('/projects', seedController.seedProjects);

module.exports = router;
