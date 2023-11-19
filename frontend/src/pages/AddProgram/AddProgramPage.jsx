// ProgramDetailForm.js

import React, { useState } from 'react';
import './AddProgram.css';
import client from '../../APIs/client';

const ProgramDetailPage = () => {
  const [programName, setProgramName] = useState('');
  const [duration, setDuration] = useState('');
  const [fee, setFee] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const handleProgramNameChange = (e) => {
    setProgramName(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleFeeChange = (e) => {
    setFee(e.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    setErrMessage('')
    try {
      const {data} = await client.post('/program-detail', { programName,duration,fee },true);
      alert("Program Added Successfully")
    } catch (err) { 
      console.log(err)
      // console.log(err?.response?.data?.message || err.message)
      setErrMessage( `(${err?.response?.status}) ${err?.response?.data?.message || err.message}`)
    }
  };

  return (
    <div className="program-detail-container">
      <form onSubmit={handleSubmit} className="program-detail-form">
        <h2>Add New Program</h2>
        <label htmlFor="programName">Program Name:</label>
        <input
          type="text"
          id="programName"
          value={programName}
          onChange={handleProgramNameChange}
          required
        />
        <label htmlFor="duration">Duration In Years:</label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={handleDurationChange}
          required
        />
        <label htmlFor="fee">Fee:</label>
        <input
          type="text"
          id="fee"
          value={fee}
          onChange={handleFeeChange}
          required
        />
                {errMessage && (
          <div className="error-message">{errMessage}</div>
        )}

        <button type="submit">Add New Program</button>
      </form>
    </div>
  );
};

export default ProgramDetailPage;
