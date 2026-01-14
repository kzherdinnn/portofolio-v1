const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Projects Routes
router.get('/projects', portfolioController.getProjects);
router.post('/projects', portfolioController.createProject);
router.put('/projects/:id', portfolioController.updateProject);
router.delete('/projects/:id', portfolioController.deleteProject);

// Expertise Routes
router.get('/expertise', portfolioController.getExpertise);
router.post('/expertise', portfolioController.createExpertise);
router.put('/expertise/:id', portfolioController.updateExpertise);
router.delete('/expertise/:id', portfolioController.deleteExpertise);

// Experience Routes
router.get('/experience', portfolioController.getExperience);
router.post('/experience', portfolioController.createExperience);
router.put('/experience/:id', portfolioController.updateExperience);
router.delete('/experience/:id', portfolioController.deleteExperience);

module.exports = router;
