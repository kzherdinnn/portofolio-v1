const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', certificateController.getCertificates);
router.post('/', protect, certificateController.createCertificate);
router.put('/:id', protect, certificateController.updateCertificate);
router.delete('/:id', protect, certificateController.deleteCertificate);

module.exports = router;
