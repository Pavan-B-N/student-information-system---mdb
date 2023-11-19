// HomePage.js

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

import AppContext from '../../Context/AppContext';
import client from '../../APIs/client';
const HomePage = () => {
    const { user } = useContext(AppContext)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentDetails, setStudentDetails] = useState({
        SRN: '',
        email: '',
        phone: '',
        address: '',
        residencyStatus: '',
        programName: '',
        programDuration: '',
        currentSemester: '',
    });
    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }
    useEffect(() => {
        if (user && user.email) {
            fetchStudentDetails()
        }
    }, [user]);

    const fetchStudentDetails = async () => {
        setLoading(true);
        setError('')
        try {
            console.log(`/student-detail/${user.email}`)
            const { data } = await client.get(`/student-detail/${user.email}`, true);
            // console.log(data)
            setStudentDetails({ ...data, programName: data.programID.programName, programDuration: data.programID.duration })
        } catch (err) {
            console.log(err)
            // console.log(err?.response?.data?.message || err.message)
            setError(` ${err?.response?.data?.message || err.message}`)
        }
        setLoading(false);
    };

    return (
        <div className="home-page-container">
            <nav className="navbar">
                <h1>Student Portal</h1>
                <ul>
                    <li>
                        <Link to="/my-grades">Grades</Link>
                    </li>
                    <li>
                        <Link to="/enrolled-courses">Enrolled Courses</Link>
                    </li>
                </ul>
            </nav>

            <main className="main-content">
                {loading && (
                    <div className="loading-container">
                        <p>Fetching your details...</p>
                    </div>
                )}

                {error && (
                    <div className="error-container">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="student-details">
                        <h2>Student Details</h2>
                        <p>SRN: {studentDetails.SRN}</p>
                        <p>Email: {studentDetails.email}</p>
                        <p>Phone: {studentDetails.phone}</p>
                        <p>Address: {studentDetails.address}</p>
                        <p>Residency Status: {studentDetails.residencyStatus}</p>
                        <p>Program Name: {studentDetails.programName}</p>
                        <p>Program Duration: {studentDetails.programDuration}</p>
                        <p>Current Semester: {studentDetails.currentSemester}</p>
                    </div>
                )}


                <button className='logout' onClick={logout} >logout</button>
            </main>
        </div>
    );
};

export default HomePage;
