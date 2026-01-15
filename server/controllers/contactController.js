const Contact = require('../models/Contact');
// const sendEmail = require('../utils/sendEmail');
const axios = require('axios');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        // Email notification is now handled in frontend to better manage delivery

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get all messages (for admin)
// @route   GET /api/contact
// @access  Private (TODO: Add auth middleware)
exports.getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
