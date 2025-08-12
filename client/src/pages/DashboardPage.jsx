import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/user';
import axios from 'axios';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [levelQuestions, setLevelQuestions] = useState(0);
  const [solvedInLevel, setSolvedInLevel] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setError("No token found. Please log in again.");
          return;
        }

        const profile = await getProfile(token);

        if (!profile || typeof profile !== 'object') {
          setError("Invalid profile data received from server.");
          return;
        }

        // If backend sends { user: { ... } } instead of plain object
        const userData = profile.user || profile;
        setUser(userData);

        const res = await axios.get(
          `http://localhost:5000/api/questions/level/${userData.level || 0}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!Array.isArray(res.data)) {
          setError("Invalid questions data received.");
          return;
        }

        setLevelQuestions(res.data.length);

        const solved = res.data.filter(q =>
          Array.isArray(userData.progress) && userData.progress.includes(q._id)
        ).length;

        setSolvedInLevel(solved);

      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Your Dashboard</h2>

      {error && <p style={{ color: "red" }}>⚠ {error}</p>}

      {!error && !user && <p>Loading your profile...</p>}

      {user && (
        <>
          <p>👤 Username: {user.username || "N/A"}</p>
          <p>🏆 Current Level: {user.level || 0}</p>
          <p>✅ Total Solved: {Array.isArray(user.progress) ? user.progress.length : 0}</p>
          <p>📊 Progress in Level {user.level || 0}: {solvedInLevel}/{levelQuestions}</p>
          <progress value={solvedInLevel} max={levelQuestions}></progress>
        </>
      )}
    </div>
  );
};

export default Dashboard;
