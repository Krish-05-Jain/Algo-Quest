// models/userProfile.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: Number, default: 0 },  
  progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] 
});

module.exports = mongoose.model('User', userSchema);
