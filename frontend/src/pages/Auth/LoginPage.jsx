// Signup.js

import React, { useState } from 'react';
import './Signup.css';
import client from '../../APIs/client';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrMessage('')
    try {
      const {data} = await client.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      window.location.href = "/"
    } catch (err) {
      console.log(err)
      // console.log(err?.response?.data?.message || err.message)
      setErrMessage( `(${err?.response?.status}) ${err?.response?.data?.message || err.message}`)
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form" autoComplete={"off"}>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          
        />
                {errMessage && (
          <div className="error-message">{errMessage}</div>
        )}
        <Link to="/signup" className='link'>Don't have an account? Sign up here</Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
