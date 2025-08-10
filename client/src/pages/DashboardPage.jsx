import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/user';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [user, setUser] = useState(null);
  const [levelQuestions, setLevelQuestions] = useState(0);
  const [solvedInLevel, setSolvedInLevel] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const profile = await getProfile(token);
      if (!profile) return;

      setUser(profile);

      const res = await axios.get(`http://localhost:5000/api/questions/level/${profile.level}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setLevelQuestions(res.data.length);
      const solved = res.data.filter(q =>
        profile.progress.includes(q._id)
      ).length;

      setSolvedInLevel(solved);
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Your Dashboard</h2>
      {user && (
        <>
          <p>👤 Username: {user.username}</p>
          <p>🏆 Current Level: {user.level}</p>
          <p>✅ Total Solved: {user.progress.length}</p>
          <p>📊 Progress in Level {user.level}: {solvedInLevel}/{levelQuestions}</p>
          <progress value={solvedInLevel} max={levelQuestions}></progress>
        </>
      )}
    </div>
  );
};

export default Dashboard;
