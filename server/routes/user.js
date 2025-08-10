const express = require('express');
const User = require('../models/userProfile');
const verifyToken = require('../middleware/verifyTokens');

const router = express.Router();

// GET /api/user/profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // exclude password
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
