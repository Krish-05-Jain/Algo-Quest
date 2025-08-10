import React from 'react';

const Dashboard = ({ progress }) => (
  <div>
    <h2>Your Progress</h2>
    <p>Level Unlocked: {progress.level}</p>
    <p>Total Questions Solved: {progress.solved}</p>
  </div>
);

export default Dashboard;
