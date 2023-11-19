// AddNewCourseForm.js

import React, { useState } from 'react';
import './AddCourse.css';
import client from '../../APIs/client';

const AddNewCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [duration, setDuration] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    setErrMessage('')
    try {
      const {data} = await client.post('/course-detail', { courseName,duration },true);
      alert("Course Added Successfully")
    } catch (err) { 
      console.log(err)
      // console.log(err?.response?.data?.message || err.message)
      setErrMessage( `(${err?.response?.status}) ${err?.response?.data?.message || err.message}`)
    }
  };

  return (
    <div className="add-new-course-container">
      <form onSubmit={handleSubmit} className="add-new-course-form">
        <h2>Add New Course</h2>
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={handleCourseNameChange}
          required
        />
        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={handleDurationChange}
          required
        />
                        {errMessage && (
          <div className="error-message">{errMessage}</div>
        )}
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddNewCourse;
