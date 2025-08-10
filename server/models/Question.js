const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: String,
  topic: String,
  level: Number,
  description: String,
  testCases: [
    {
      input: String,
      output: String
    }
  ],
  sampleSolution: String // used for validation
});

module.exports = mongoose.model('Question', questionSchema);
