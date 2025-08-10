const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/userProfile');
const executeCpp = require('../utils/executeCode');
const verifyToken = require('../middleware/verifyTokens');

router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { questionId, userCode, customInput } = req.body;
    const question = await Question.findById(questionId);
    const user = await User.findById(req.userId);

    if (!question) return res.status(404).json({ msg: 'Question not found' });

    let passedCount = 0;

    for (let testCase of question.testCases) {
      const result = await executeCpp(userCode, testCase.input);

      if (result.error) {
        return res.json({ success: false, error: result.error });
      }

      if (result.output === testCase.output.trim()) {
        passedCount++;
      }
    }

    const allPassed = passedCount === question.testCases.length;

    // Handle level unlocking logic
    if (allPassed) {
      if (!user.progress.includes(questionId)) {
        user.progress.push(questionId);

        const levelQuestions = await Question.find({ level: user.level });
        const totalInLevel = levelQuestions.length;
        const solvedInLevel = levelQuestions.filter(q => user.progress.includes(q._id.toString())).length;

        if (solvedInLevel >= Math.ceil(totalInLevel * 0.6)) {
          user.level += 1;
        }

        await user.save();
      }
    }

    // ✅ If user gave a custom input, run that too
    let customResult = null;
    if (customInput && customInput.trim() !== '') {
      customResult = await executeCpp(userCode, customInput);
    }

    res.json({
      success: allPassed,
      passedCount,
      total: question.testCases.length,
      customOutput: customResult?.output || null,
      customError: customResult?.error || null
    });

  } catch (err) {
    res.status(500).json({ msg: 'Error occurred' });
  }
});


module.exports = router;
