const express = require('express');
const router = express.Router();
const User = require('../models/userProfile');
const verifyToken = require('../middleware/verifyTokens');


router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('progress');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({
  username: user.username,
  email: user.email,
  level: user.level,
  progress: user.progress.map(q => q._id.toString()) // clean array of strings
});

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});



module.exports = router;
