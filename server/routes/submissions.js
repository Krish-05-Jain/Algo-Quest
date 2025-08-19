const express = require('express');
const router = express.Router();
const fs = require('fs');
const { exec, spawn } = require('child_process');
const path = require('path');
const Question = require('../models/Question');
const User = require('../models/userProfile');
const verifyToken = require('../middleware/verifyTokens');

// Helper function to run compiled program with test case input
function runTestCase(exePath, input) {
  return new Promise((resolve, reject) => {
    const process = spawn(exePath);

    let output = "";
    let error = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      error += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(error);
      } else {
        resolve(output.trim());
      }
    });

    // Send input to program
    process.stdin.write(input);
    process.stdin.end();
  });
}

router.post('/submit', verifyToken, async (req, res) => {
  const { questionId, userCode } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ msg: 'Question not found' });

    const testCases = question.testCases;
    const tempPath = path.join(__dirname, 'temp.cpp');
    const exePath = path.join(__dirname, 'temp.exe');

    // Save submitted code
    fs.writeFileSync(tempPath, userCode);

    // Compile code
    exec(`g++ "${tempPath}" -o "${exePath}"`, async (compileErr) => {
      if (compileErr) {
        return res.status(400).json({ msg: 'Compilation error', error: compileErr.message });
      }

      let results = [];
      let passedAll = true;

      for (const tc of testCases) {
        try {
          const actualOutput = await runTestCase(exePath, tc.input);

          const status = actualOutput.trim() === tc.output.trim() ? "Passed" : "Failed";
          if (status === "Failed") passedAll = false;

          results.push({
            input: tc.input,
            expected: tc.output,
            got: actualOutput,
            status
          });

        } catch (err) {
          passedAll = false;
          results.push({
            input: tc.input,
            expected: tc.output,
            got: err,
            status: "Error"
          });
        }
      }

      if (passedAll) {
        User.findByIdAndUpdate(
          req.userId,
          {
            $addToSet: { progress: questionId }, // add solved question
            $inc: { level: 1 } // level up
          },
          { new: true }
        ).then((updatedUser) => {
          return res.json({
            msg: 'Level up! ✅',
            results,
            user: updatedUser
          });
        });
      }

    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;

