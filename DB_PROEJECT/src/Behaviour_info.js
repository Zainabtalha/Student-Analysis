// BehaviourInfo.js

import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import './Behaviour_info.css'; // Import your custom CSS file
import { Link, useNavigate } from 'react-router-dom';


function BehaviourInfo() {
    const [studyHours, setStudyHours] = useState(0);
    const [wayOfStudy, setWayOfStudy] = useState('');
    const [classParticipation, setClassParticipation] = useState('');
    const [extracurricular, setExtracurricular] = useState('');
    const navigate = useNavigate();

    const handleStudyHoursChange = (e) => {
        setStudyHours(parseInt(e.target.value, 10));
    };

    const handleWayOfStudyChange = (e) => {
        setWayOfStudy(e.target.value);
    };

    const handleClassParticipationChange = (e) => {
        setClassParticipation(e.target.value);
    };

    const handleExtracurricularChange = (e) => {
        setExtracurricular(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const studentId = localStorage.getItem('loggedInID');

            const dataToSend = {
                std_id: studentId,
                study_hours: studyHours,
                way_of_study: wayOfStudy,
                class_participation: classParticipation,
                extracurricular: extracurricular
            };

            await axios.post('http://localhost:8081/submitBehaviour', dataToSend);

            // Use navigate to refresh the page
            navigate('/semester_info', { replace: true });
            alert('Behaviour information submitted successfully!');
        } catch (error) {
            console.error('Error Response:', error.response);
            console.error(error);
            alert('An error occurred while submitting behaviour information');
        }
    };

    return (
        <div className="container mt-5">
            <div className="behaviour-form  behaviour-form-container">
                <h2>Enter Behaviour Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="studyHours">Study Hours</label>
                        <input
                            type="number"
                            id="studyHours"
                            className="form-control"
                            placeholder="Enter study hours"
                            value={studyHours}
                            onChange={handleStudyHoursChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="wayOfStudy">Way of Study</label>
                        <select
                            className="form-control"
                            id="wayOfStudy"
                            value={wayOfStudy}
                            onChange={handleWayOfStudyChange}
                        >
                            <option value="">Select a way of study</option>
                            <option value="Self-Study">Self-Study</option>
                            <option value="Group-Study">Group Study</option>
                            <option value="Online-Courses">Online Courses</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="classParticipation">Class Participation</label>
                        <select
                            className="form-control"
                            id="classParticipation"
                            value={classParticipation}
                            onChange={handleClassParticipationChange}
                        >
                            <option value="">Select class participation level</option>
                            <option value="Highly-Active-Participation">Highly Active Participation</option>
                            <option value="Moderate-Participation">Moderate Participation</option>
                            <option value="Limited-Participation">Limited Participation</option>
                            <option value="Passive-Participation">Passive Participation</option>
                            <option value="Initiation-and-Discussion">Initiation and Discussion</option>
                            <option value="Asking-Advanced-Questions">Active questioning during lectures</option>
                        
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="extracurricular">Extracurricular Activities</label>
                        <select
                            className="form-control"
                            id="extracurricular"
                            value={extracurricular}
                            onChange={handleExtracurricularChange}
                        >
                            <option value="">Select an extracurricular activity</option>
                            <option value="Coding-Competitions">Coding Competitions</option>
                            <option value="Sports">Sports</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                            <option value="Leadership">Leadership</option>
                            <option value="Volunteering">Volunteering</option>
                            <option value="Open-source-contributions">Open source contributions</option>
                            <option value="Hackathons-and-coding-marathons">Hackathons and coding marathons</option>
                            <option value="Online-courses-and-certifications">Online courses and certifications</option>
                            <option value="AI-and-machine-learning-projects">AI and machine learning projects</option>
                            <option value="Debate-and-public-speaking-literary-clubs">Debate, public speaking and literary clubs</option>
                            <option value="App-and-software-development">App and software development</option>
                            <option value="Photography-or-media-related-activities">Photography or media-related activities</option>
                            <option value="Outdoor-activities-hiking-or-adventure-clubs">Outdoor activities, hiking, or adventure clubs</option>
                            <option value="Tech-meetups-and-networking-events">Tech meetups and networking events</option>
                            <option value="other">other</option>
                            

                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                </form>
                <p>
                   <Link to="/behaviouranalysis" className="link-as-button">View Behavior Analysis</Link>
                </p>
            </div>
        </div>
    );
}

export default BehaviourInfo;
