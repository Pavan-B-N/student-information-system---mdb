// Signup.js

import React, { useState } from 'react';
import './Signup.css';
import client from "../../APIs/client"
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMessage('')
    try {
      const {data} = await client.post('/auth/signup', { email, password });
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
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errMessage && (
          <div className="error-message">{errMessage}</div>
        )}
        <Link to="/login" className='link'>Already have an account? Login here</Link>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
