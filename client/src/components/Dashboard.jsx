import React from 'react';
import '../styles/Dashboard.css';
const Dashboard = ({ progress }) => (
  <div className='progress-container'>
    <h2>Your Progress</h2>
    <p>Level Unlocked: {progress.level}</p>
    <p>Total Questions Solved: {progress.solved}</p>
  </div>
);

export default Dashboard;
