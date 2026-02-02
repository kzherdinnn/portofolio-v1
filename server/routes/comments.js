const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// GET all comments
router.get('/', commentController.getComments);

// POST new comment
router.post('/', commentController.createComment);

// PATCH toggle pin status
router.patch('/:id/pin', protect, commentController.togglePin);

// DELETE comment
router.delete('/:id', protect, commentController.deleteComment);

module.exports = router;
