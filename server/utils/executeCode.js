const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const { v4: uuid } = require('uuid');

const TIMEOUT = 3000; // 3 seconds max run time

function executeCpp(code, input) {
  return new Promise((resolve, reject) => {
    const jobId = uuid();
    const sourceFile = path.join(__dirname, `${jobId}.cpp`);
    const inputFile = path.join(__dirname, `${jobId}.txt`);
    const outputFile = path.join(__dirname, `${jobId}_out.txt`);

    // write code & input to file
    fs.writeFileSync(sourceFile, code);
    fs.writeFileSync(inputFile, input);

    const compileCmd = `g++ ${sourceFile} -o ${outputFile.replace('.txt', '')}`;
    const runCmd = `${outputFile.replace('.txt', '')} < ${inputFile}`;

    exec(compileCmd, (compileErr) => {
      if (compileErr) {
        cleanup();
        return resolve({ error: "Compilation Error" });
      }

      exec(runCmd, { timeout: TIMEOUT }, (runErr, stdout, stderr) => {
        cleanup();
        if (runErr) return resolve({ error: "Error occurred" });
        return resolve({ output: stdout.trim() });
      });
    });

    function cleanup() {
      fs.unlinkSync(sourceFile);
      fs.unlinkSync(inputFile);
      if (fs.existsSync(outputFile.replace('.txt', ''))) {
        fs.unlinkSync(outputFile.replace('.txt', ''));
      }
    }
  });
}

module.exports = executeCpp;
