// AddStudentForm.js

import React, { useState, useEffect } from 'react';
import './AddStudentInfo.css';
import client from '../../APIs/client';

const AddStudentInfoPage = () => {
    const [SRN, setSRN] = useState('');
    const [email, setEmail] = useState('');
    const [name,setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [residencyStatus, setResidencyStatus] = useState('dayscholar');
    const [programId, setProgramId] = useState('');
    const [currentSem, setCurrentSem] = useState('');

    const [errMessage, setErrMessage] = useState('');
    const [errStatusCode, setErrStatusCode] = useState('');

    // Mock data for program options (replace with actual data fetched from the server)
    const [programOptions, setProgramOptions] = useState([]);
    
    const fetchProgramOptions = async () => {
        setErrMessage('')
        try {
          const {data} = await client.get('/program-detail',true);
          console.log(data)
          setProgramOptions(data)
        } catch (err) { 
          console.log(err)
          // console.log(err?.response?.data?.message || err.message)
          setErrMessage( ` ${err?.response?.data?.message || err.message}`)
          setErrStatusCode(`(${err?.response?.status})`);
        }
    }
    useEffect(() => {
        fetchProgramOptions();
    }, []);

    const handleResidencyStatusChange = (e) => {
        setResidencyStatus(e.target.value);
    };

    const handleProgramIdChange = (e) => {
        setProgramId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setErrMessage('')
        try {
          const {data} = await client.post('/student-detail', { SRN,email,phone,address,residencyStatus,programID:programId,currentSemester:currentSem,name },true);
          alert("student-detail Added Successfully")
        } catch (err) { 
          console.log(err)
          // console.log(err?.response?.data?.message || err.message)
          setErrMessage( ` ${err?.response?.data?.message || err.message}`)
          setErrStatusCode(`(${err?.response?.status})`);
        }
    };

    return (
        <div className="add-student-container">
            <form onSubmit={handleSubmit} className="add-student-form">
                <h2>Add Student Information</h2>

                <label htmlFor="SRN">SRN:</label>
                <input
                    type="text"
                    id="SRN"
                    value={SRN}
                    onChange={(e) => setSRN(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                 <label htmlFor="email">Name:</label>
                <input
                    type="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                <label>Residency Status:</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="dayscholar"
                            checked={residencyStatus === 'dayscholar'}
                            onChange={handleResidencyStatusChange}
                        />
                        Day Scholar
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="pg"
                            checked={residencyStatus === 'pg'}
                            onChange={handleResidencyStatusChange}
                        />
                        PG
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="hostel"
                            checked={residencyStatus === 'hostel'}
                            onChange={handleResidencyStatusChange}
                        />
                        Hostel
                    </label>
                </div>

                <label htmlFor="programId">Program:</label>
                <select
                    id="programId"
                    value={programId}
                    onChange={handleProgramIdChange}
                    required
                >
                    <option value="" disabled>Select a program</option>
                    {programOptions.map((option) => (
                        <option key={option._id} value={option._id}>
                            {option.programName}
                        </option>
                    ))}
                </select>

                <label htmlFor="currentSem">Current Semester:</label>
                <input
                    type="text"
                    id="currentSem"
                    value={currentSem}
                    onChange={(e) => setCurrentSem(e.target.value)}
                    required
                />

                {errMessage && (
                    <div className="error-message">
                        Error ({errStatusCode}): {errMessage}
                    </div>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddStudentInfoPage;
