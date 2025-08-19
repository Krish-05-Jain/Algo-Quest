// models/userProfile.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ✅ new fields
  level: { type: Number, default: 0 },  // current level of the user
  progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] // solved questions
});

module.exports = mongoose.model('User', userSchema);
