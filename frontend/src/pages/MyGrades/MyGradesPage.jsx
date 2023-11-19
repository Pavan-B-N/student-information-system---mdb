// MyGrades.js

import React, { useState, useEffect, useContext } from 'react';
import './MyGrades.css';

import AppContext from '../../Context/AppContext';
import client from '../../APIs/client';
const MyGradesPage = () => {
    const { user } = useContext(AppContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gradesData, setGradesData] = useState([
        {
            SRN: '',
            SEM: '',
            details: [],
            result: '',
            numOfBacklogs: 0,
        }
    ]);

    useEffect(() => {
        if (user && user.email) {
            fetchStudentDetails()
        }
    }, [user]);

    const fetchStudentDetails = async () => {
        setLoading(true);
        setError('')
        try {
            console.log(`/enrolled-courses/${user.email}`)
            const { data } = await client.get(`/grade-detail/${user.email}`, true);
            console.log(data)
            const arr = [];
            data.map(semGrade => {
                arr.push(semGrade)
            })
            setGradesData(arr)
        } catch (err) {
            console.log(err)
            // console.log(err?.response?.data?.message || err.message)
            setError(` ${err?.response?.data?.message || err.message}`)
        }
        setLoading(false);
    };

    return (
        <div className="grades-container">
            <h2>My Grades</h2>

            {loading && (
                <div className="loading-container">
                    <p>Fetching grades data...</p>
                </div>
            )}

            {error && (
                <div className="error-container">
                    <p>{error}</p>
                </div>
            )}


            <div className="mygrade-container">
                {!loading && !error && (
                    gradesData.map((semGrade, index) => {
                        return (
                            <div className={`grades-details ${semGrade.result.toLowerCase()}`} key={semGrade._id} >
                                <p>SRN: {semGrade.SRN}</p>
                                <p>SEM: {semGrade.SEM}</p>
                                <div className="details">
                                    <h3>Details:</h3>
                                    {semGrade.details.map((detail, index) => (
                                        <p key={index} className='course-detail'>
                                           {detail?.courseId.courseName}, CGPA: {detail.CGPA}
                                        </p>
                                    ))}
                                </div>
                                <p>Result: {semGrade.result}</p>
                                <p>Number of Backlogs: {semGrade.numOfBacklogs}</p>
                            </div>
                        )
                    })
                )}
            </div>

        </div>
    );
};

export default MyGradesPage;
