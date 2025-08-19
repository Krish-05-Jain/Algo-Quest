const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  topic: { type: String, required: true, trim: true },
  level: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  testCases: [
    {
      input: { type: String, required: true, trim: true },
      output: { type: String, required: true, trim: true }
    }
  ],
  sampleSolution: { type: String, trim: true }
});

module.exports = mongoose.model('Question', questionSchema);
