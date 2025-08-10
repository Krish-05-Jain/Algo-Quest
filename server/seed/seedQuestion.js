const mongoose = require('mongoose');
const Question = require('../models/Question');

mongoose.connect('mongodb://localhost:27017/algoquest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const questions = [
  {
    title: "Sum of Two Numbers",
    topic: "Basics",
    level: 1,
    description: `Given two integers a and b, output their sum.

**Input:** Two space-separated integers  
**Output:** Their sum`,
    testCases: [
      { input: "2 3", output: "5" },
      { input: "10 15", output: "25" },
      { input: "0 0", output: "0" }
    ],
    sampleSolution: `
#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`
  },
  {
    title: "Check Even or Odd",
    topic: "Conditionals",
    level: 1,
    description: `Check whether the given integer is even or odd.

**Input:** An integer n  
**Output:** "Even" or "Odd"`,
    testCases: [
      { input: "2", output: "Even" },
      { input: "7", output: "Odd" },
      { input: "0", output: "Even" }
    ],
    sampleSolution: `
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) cout << "Even";
    else cout << "Odd";
    return 0;
}`
  }
  // Add more questions later...
];

async function seedDB() {
  await Question.deleteMany({});
  await Question.insertMany(questions);
  console.log("✅ Questions seeded successfully");
  mongoose.disconnect();
}

seedDB();
