import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import QuestionPage from './pages/QuestionPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
