// Semester_info.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Semester_info.css'; // Import the CSS file

function SemesterInfo() {
    const navigate = useNavigate();
    const [selectedRecord, setSelectedRecord] = useState('');

    const handleRecordSelection = (recordType) => {
        setSelectedRecord(recordType);
        if (recordType === 'current') {
            navigate('/marks_info');
        } else if (recordType === 'previous') {
            navigate('/grades_info');
        }
    };

    return (
        <div className="semester-info-container">
            <h1>Welcome to Your Academic Journey</h1>

            <div className="options-container">
                <div className={`option ${selectedRecord === 'current' ? 'active' : ''}`}>
                    <h2>Enter Current Semester Record</h2>
                    <p>Ready to record your latest achievements?</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleRecordSelection('current')}
                    >
                        Enter Now
                    </button>
                </div>

                <div className={`option ${selectedRecord === 'previous' ? 'active' : ''}`}>
                    <h2>Explore Previous Semester Records</h2>
                    <p>Looking to reflect on your past successes? Dive into your academic history.</p>
                    <button
                        className="btn btn-success"
                        onClick={() => handleRecordSelection('previous')}
                    >
                        Enter Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SemesterInfo;
