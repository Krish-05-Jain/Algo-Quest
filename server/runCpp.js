const { exec } = require("child_process");
const path = require("path");

// Path to your C++ file
// const cppFile = path.join('__dirname', 'test.cpp');
// const exeFile = path.join('__dirname', 'test.exe');

// Step 1: Compile the C++ file
exec(`g++ test.cpp -o test.exe
`, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Compilation error:", stderr);
    return;
  }
  console.log("✅ Compilation successful!");

  // Step 2: Run the compiled program
  exec(`test.exe`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Runtime error:", stderr);
      return;
    }
    console.log("📢 Output from C++:", stdout.trim());
  });
});
