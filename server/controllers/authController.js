const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            // Set cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict', // or 'none' if cross-site but we are using cors with credentials
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            res.json({
                success: true,
                _id: user._id,
                username: user.username,
                // token: token, // Optional: No longer needed on client if using cookies
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
exports.logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// @desc    Check auth status
// @route   GET /api/auth/check
// @access  Private
exports.checkAuth = async (req, res) => {
    // If middleware passes, user is authenticated
    res.status(200).json({ success: true, user: req.user });
};

// @desc    Register admin (Run once manually or via Postman to create admin)
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            username,
            password,
        });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
