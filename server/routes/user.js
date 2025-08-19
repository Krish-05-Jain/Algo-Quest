const express = require('express');
const router = express.Router();
const User = require('../models/userProfile');
const verifyToken = require('../middleware/verifyTokens');

// GET user profile
// router.get('/profile', verifyToken, async (req, res) => {
//   try {
//     console.log("Decoded userId from token:", req.userId); // ✅ Debug log

//     const user = await User.findById(req.userId).select('-password');
//     console.log("User found in DB:", user); // ✅ Debug log

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     res.json(user);
//     console.log("Profile data sent successfully",user); // ✅ Debug log
//   } catch (err) {
//     console.error("Error in /profile route:", err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });
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
