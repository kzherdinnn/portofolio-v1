const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  markAsRead,
  deleteContact
} = require('../controllers/contactController');

// Public route - Submit contact form
router.post('/', submitContact);

// Admin routes - Should add authentication middleware in production
router.get('/', getAllContacts);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteContact);

module.exports = router;
