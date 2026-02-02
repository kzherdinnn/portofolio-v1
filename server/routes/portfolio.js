const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// Projects Routes
router.get('/projects', portfolioController.getProjects);
router.post('/projects', protect, portfolioController.createProject);
router.put('/projects/:id', protect, portfolioController.updateProject);
router.delete('/projects/:id', protect, portfolioController.deleteProject);

// Expertise Routes
router.get('/expertise', portfolioController.getExpertise);
router.post('/expertise', protect, portfolioController.createExpertise);
router.put('/expertise/:id', protect, portfolioController.updateExpertise);
router.delete('/expertise/:id', protect, portfolioController.deleteExpertise);

// Experience Routes
router.get('/experience', portfolioController.getExperience);
router.post('/experience', protect, portfolioController.createExperience);
router.put('/experience/:id', protect, portfolioController.updateExperience);
router.delete('/experience/:id', protect, portfolioController.deleteExperience);

module.exports = router;
