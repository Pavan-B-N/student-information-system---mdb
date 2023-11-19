// StudentForm.js

import React, { useState, useEffect } from 'react';
import './EnrollCourse.css';
import client from '../../APIs/client';

const EnrollCoursePage = () => {
  const [SRN, setSRN] = useState('');
  const [courseId, setCourseId] = useState('');
  const [SEM, setSEM] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const [errMessage, setErrMessage] = useState('');

  const fetchCourseOptions = async () => {
    setErrMessage('')
    try {
      const { data } = await client.get('/course-detail', true);
      console.log(data)
      setCourseOptions(data)
    } catch (err) {
      console.log(err)
      // console.log(err?.response?.data?.message || err.message)
      setErrMessage(` ${err?.response?.data?.message || err.message}`)
      setErrStatusCode(`(${err?.response?.status})`);
    }
  }
  useEffect(() => {
    fetchCourseOptions();
  }, []);
  
  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrMessage('')
    try {
      console.log({ SRN, courseId, SEM })
      const { data } = await client.post('/enrolled-courses', { SRN, courseId, SEM:Number(SEM) }, true);
      alert("Course Added Successfully")
    } catch (err) {
      console.log(err)
      // console.log(err?.response?.data?.message || err.message)
      setErrMessage(`(${err?.response?.status}) ${err?.response?.data?.message || err.message}`)
    }
  };

  return (
    <div className="student-form-container">
      <form onSubmit={handleSubmit} className="student-form">
        <h2>Enroll New Course to a Student</h2>

        <label htmlFor="SRN">SRN:</label>
        <input
          type="text"
          id="SRN"
          value={SRN}
          onChange={(e) => setSRN(e.target.value)}
          required
        />

        <label htmlFor="courseId">Course:</label>
        <select
          id="courseId"
          value={courseId}
          onChange={handleCourseIdChange}
          required
        >
          <option value="" disabled>
            Select Course
          </option>
          {courseOptions.map((option) => (
            
            <option key={option._id} value={option._id}>
              {option.courseName}
            </option>
          ))}
        </select>

        <label htmlFor="SEM">SEM:</label>
        <input
          type="text"
          id="SEM"
          value={SEM}
          onChange={(e) => setSEM(e.target.value)}
          required
        />

        {errMessage && (
          <div className="error-message">{errMessage}</div>
        )}

        <button type="submit">Enroll</button>
      </form>
    </div>
  );
};

export default EnrollCoursePage;
