const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    profilePhoto: {
        type: String,
        default: null
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Sort by pinned first, then by newest
commentSchema.index({ isPinned: -1, createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);
