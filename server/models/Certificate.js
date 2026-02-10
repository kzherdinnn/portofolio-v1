const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    issuer: {
        type: String,
        required: true,
        trim: true
    },
    issueDate: {
        type: String,
        required: true
    },
    expirationDate: {
        type: String,
        trim: true
    },
    credentialId: {
        type: String,
        trim: true
    },
    credentialUrl: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    skills: [{
        type: String,
        trim: true
    }],
    displayOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema);
