// AdminDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboardPage = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }
  return (
    <div className="admin-dashboard-container">
      <nav className="navbar">
        <h1>Student Portal</h1>
        <ul>
          <li>
            <Link to="/add-new-program">Add New Program</Link>
          </li>
          <li>
            <Link to="/add-new-course">Add New Course</Link>
          </li>
          <li>
            <Link to="/add-student-info">Add Student Info</Link>
          </li>
          <li>
            <Link to="/enroll-course">Enroll Course</Link>
          </li>
          <li>
            <Link to="/grades">Grades</Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        {/* Admin dashboard content goes here */}
        <h2>Welcome to the Admin Dashboard</h2>
        <p>Manage student information, courses, programs, and more!</p>

        <button className='logout' onClick={logout} >logout</button>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
