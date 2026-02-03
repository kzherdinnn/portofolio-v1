const express = require('express');
const router = express.Router();
const projectTypeController = require('../controllers/projectTypeController');

router.get('/', projectTypeController.getProjectTypes);
router.post('/', projectTypeController.createProjectType);
router.delete('/:id', projectTypeController.deleteProjectType); // Protected?
router.put('/:id', projectTypeController.updateProjectType); // Protected?

module.exports = router;
