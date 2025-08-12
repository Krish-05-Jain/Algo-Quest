// src/pages/SignupPage.jsx
import React from 'react';
import AuthForm from '../components/AuthForm';

const SignupPage = () => {
  return (
    <div>
      <AuthForm isLogin={false} />
    </div>
  );
};

export default SignupPage;
