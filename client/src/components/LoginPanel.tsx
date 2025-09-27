import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import '../cyberpunk.css';

const LoginPanel: React.FC = () => {
  const { login, logout, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      setError('');
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (user) {
    return (
      <div className="cyberpunk-content">
        <h2>Welcome, {user.name}</h2>
        <button className="control-button" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="cyberpunk-content">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="control-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="control-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="control-button" type="submit">Login</button>
      </form>
      {error && <p className="debug-log error">{error}</p>}
      <p>Demo: user@example.com / password</p>
    </div>
  );
};

export default LoginPanel;