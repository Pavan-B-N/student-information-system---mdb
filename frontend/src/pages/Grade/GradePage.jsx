// AddStudentGradesForm.js

import React, { useEffect, useState } from 'react';
import './Grade.css';
import client from '../../APIs/client';

const GradePage = () => {
    const [SRN, setSRN] = useState('');
    const [SEM, setSEM] = useState('');
    const [details, setDetails] = useState([{ courseId: '', CGPA: '' }]);
    const [error, setError] = useState('');

    const [courseOptions, setCourseOptions] = useState([]);


    const fetchCourseOptions = async () => {
        setError('')
        try {
            const { data } = await client.get('/course-detail', true);
            console.log(data)
            setCourseOptions(data)
        } catch (err) {
            console.log(err)
            // console.log(err?.response?.data?.message || err.message)
            setError(` ${err?.response?.data?.message || err.message}`)
        }
    }
    useEffect(() => {
        fetchCourseOptions();
    }, []);

    const handleInputChange = (index, field, value) => {
        const newDetails = [...details];
        newDetails[index][field] = value;
        setDetails(newDetails);
    };

    const handleAddDetails = () => {
        setDetails([...details, { courseId: '', CGPA: '' }]);
    };

    const handleRemoveDetails = (index) => {
        const newDetails = [...details];
        newDetails.splice(index, 1);
        setDetails(newDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input before submission
        if (SRN.trim() === '' || SEM.trim() === '') {
            setError('Please fill in all the required fields.');
            return;
        }

        // Other validation logic can be added here

        // Prepare the final details object
        const formattedDetails = details.filter(
            (detail) => detail.courseId.trim() !== '' && detail.CGPA.trim() !== ''
        );

        setError('')
        try {
            const { data } = await client.post('/grade-detail', { SRN, details, SEM }, true);
            alert("grade Added Successfully")
        } catch (err) {
            console.log(err)
            // console.log(err?.response?.data?.message || err.message)
            setError(`(${err?.response?.status}) ${err?.response?.data?.message || err.message}`)
        }
    };

    return (
        <div className="add-student-grades-container">
            <form onSubmit={handleSubmit} className="add-student-grades-form">
                <h2>Add Student Grades</h2>

                <label htmlFor="SRN">SRN:</label>
                <input
                    type="text"
                    id="SRN"
                    value={SRN}
                    onChange={(e) => setSRN(e.target.value)}
                    required
                />

                <label htmlFor="SEM">SEM:</label>
                <input
                    type="text"
                    id="SEM"
                    value={SEM}
                    onChange={(e) => setSEM(e.target.value)}
                    required
                />

                {details.map((detail, index) => (
                    <div key={index} className="details-row">
                        <div>
                            <label htmlFor={`courseId${index}`}>Course ID:</label>

                            <select
                                id={`courseId${index}`}
                                value={detail.courseId}
                                onChange={(e) => handleInputChange(index, 'courseId', e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Select Course
                                </option>
                                {courseOptions.map((option) => (
                                    <option key={option._id} value={option._id} >
                                        {option.courseName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor={`CGPA${index}`}>CGPA:</label>
                            <input
                                type="text"
                                id={`CGPA${index}`}
                                value={detail.CGPA}
                                onChange={(e) => handleInputChange(index, 'CGPA', e.target.value)}
                                required
                            />
                        </div>

                        {index > 0 && (
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() => handleRemoveDetails(index)}
                            >
                                X
                            </button>
                        )}
                    </div>
                ))}

                <button type="button" className='add-btn' onClick={handleAddDetails}>
                    New Course
                </button>

                {error && <div className="error-message">{error}</div>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default GradePage;
