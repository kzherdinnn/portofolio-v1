const Comment = require('../models/Comment');

// Get all comments
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .sort({ isPinned: -1, createdAt: -1 })
            .limit(50);
        
        res.json({ success: true, data: comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: 'Error fetching comments' });
    }
};

// Create new comment
exports.createComment = async (req, res) => {
    try {
        const { name, message, profilePhoto } = req.body;

        if (!name || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and message are required' 
            });
        }

        const newComment = new Comment({
            name,
            message,
            profilePhoto: profilePhoto || null
        });

        await newComment.save();

        res.json({ 
            success: true, 
            message: 'Comment posted successfully!',
            data: newComment 
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ success: false, message: 'Error posting comment' });
    }
};

// Toggle pin status
exports.togglePin = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ 
                success: false, 
                message: 'Comment not found' 
            });
        }

        comment.isPinned = !comment.isPinned;
        await comment.save();

        res.json({ 
            success: true, 
            message: `Comment ${comment.isPinned ? 'pinned' : 'unpinned'} successfully!`,
            data: comment 
        });
    } catch (error) {
        console.error('Error toggling pin:', error);
        res.status(500).json({ success: false, message: 'Error toggling pin status' });
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ 
                success: false, 
                message: 'Comment not found' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Comment deleted successfully!' 
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ success: false, message: 'Error deleting comment' });
    }
};
