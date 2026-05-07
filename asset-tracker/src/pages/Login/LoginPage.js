import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../api/financialApi';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  // Toggle between Login and Register
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isRegister) {
        // ── Register ──────────────────────────────────────────────────────
        const result = await registerUser({ name, email, password });
        if (result.success) {
          setSuccess('Account created! You can now log in.');
          setIsRegister(false);
          setName('');
          setEmail('');
          setPassword('');
        }
      } else {
        // ── Login ─────────────────────────────────────────────────────────
        const result = await loginUser({ email, password });
        if (result.success) {
          // Save user info to localStorage so Dashboard can read user_id
          localStorage.setItem('user', JSON.stringify(result.user));
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Is the backend running?';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">{isRegister ? 'Create Account' : 'Sign In'}</h1>
        <p className="login-subtitle">
          {isRegister
            ? 'Fill in the details below to create your account'
            : 'Enter your credentials to access your dashboard'}
        </p>

        {error   && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className="login-toggle">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess(''); }}>
            {isRegister ? 'Login here' : 'Register here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
