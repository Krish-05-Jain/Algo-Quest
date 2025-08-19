const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/userProfile');
const verifyToken = require('../middleware/verifyTokens'); 

// GET /api/questions/random
// GET /api/questions/random
router.get('/random', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const userLevel = user.level || 1;

    const questions = await Question.find({ level: userLevel });
    if (questions.length === 0)
      return res.status(404).json({ msg: 'No questions found for your level' });

    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    res.json({
      _id: randomQuestion._id,
      title: randomQuestion.title,
      topic: randomQuestion.topic,
      level: randomQuestion.level,
      description: randomQuestion.description,
      testCases: randomQuestion.testCases,
      hint: randomQuestion.hint
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error occurred' });
  }
});


router.get('/level/:level', verifyToken, async (req, res) => {
  const questions = await Question.find({ level: req.params.level });
  res.json(questions);
});

router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;
