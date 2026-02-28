const express = require('express');
const router = express.Router();
const projectTypeController = require('../controllers/projectTypeController');

router.get('/', projectTypeController.getProjectTypes);
router.post('/', projectTypeController.createProjectType);
router.post('/reorder', projectTypeController.reorderProjectTypes);
router.delete('/:id', projectTypeController.deleteProjectType);
router.put('/:id', projectTypeController.updateProjectType);

module.exports = router;
