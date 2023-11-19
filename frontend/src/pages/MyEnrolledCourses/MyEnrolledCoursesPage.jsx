// MyEnrolledCourses.js

import React, { useState, useEffect, useContext } from 'react';
import './MyEnrolledCourses.css';

import AppContext from '../../Context/AppContext';
import client from '../../APIs/client';

const MyEnrolledCoursesPage = () => {
    const { user } = useContext(AppContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coursesData, setCoursesData] = useState([]);

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
            const { data } = await client.get(`/enrolled-courses/${user.email}`, true);
            const arr=[];
            data.map(course=>{
                arr.push({ ...course,courseName:course.courseId.courseName,courseDuration:course.courseId.duration})
            })
            setCoursesData( arr)
        } catch (err) {
            console.log(err)
            // console.log(err?.response?.data?.message || err.message)
            setError(` ${err?.response?.data?.message || err.message}`)
        }
        setLoading(false);
    };

    return (
        <div className="enrolled-courses-container">
            <h2>My Enrolled Courses</h2>

            {loading && (
                <div className="loading-container">
                    <p>Fetching enrolled courses...</p>
                </div>
            )}

            {error && (
                <div className="error-container">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="courses-list">
                    {coursesData.map((course, index) => (
                        <div
                            key={index}
                            className={`course-item ${course.status === 'Active' ? 'active' : 'completed'}`}
                        >
                            <p>SRN: {course.SRN}</p>
                            <p>Course Name: {course.courseName}</p>
                            <p>Course Duration: {course.courseDuration}</p>
                            <p>Status: {course.status}</p>
                            {course.status === 'Active' && <p>CGPA: {course.CGPA}</p>}
                            <p>SEM: {course.SEM}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEnrolledCoursesPage;
