const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET all comments
router.get('/', commentController.getComments);

// POST new comment
router.post('/', commentController.createComment);

// PATCH toggle pin status
router.patch('/:id/pin', commentController.togglePin);

// DELETE comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;
