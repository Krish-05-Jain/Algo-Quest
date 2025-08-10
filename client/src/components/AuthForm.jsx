import React, { useState } from 'react';

const AuthForm = ({ isLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:5000/api/auth/${isLogin ? 'login' : 'signup'}`;
      const body = isLogin
        ? { email, password }
        : { username, email, password }; // signup also sends username

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        localStorage.setItem('token', data.token); // store JWT
        alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
      } else {
        alert(data.msg || 'Something went wrong');
      }
    } catch (err) {
      console.error('Auth error:', err);
      alert('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>

      {!isLogin && (
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      )}

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
    </form>
  );
};

export default AuthForm;
