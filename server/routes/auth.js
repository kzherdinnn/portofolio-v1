const express = require('express');
const router = express.Router();
const { loginUser, registerUser, logoutUser, checkAuth } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check', protect, checkAuth);
router.post('/register', registerUser);

module.exports = router;
