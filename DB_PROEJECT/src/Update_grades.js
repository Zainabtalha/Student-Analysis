import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function UpdateGradeInfo() {
    const { courseId } = useParams();
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [courses, setCourses] = useState([]);
    const [newGPA, setNewGPA] = useState('');
    const [currentGPA, setCurrentGPA] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch available semesters
        const fetchSemesters = async () => {
            try {
                const response = await axios.get('http://localhost:8081/semesters');
                setSemesters(response.data);
            } catch (error) {
                console.error('Failed to fetch semesters:', error);
            }
        };

        fetchSemesters();
    }, []);

    useEffect(() => {
        // Fetch the current GPA for the selected course
        const fetchCurrentGPA = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/getCourseGPA/${courseId}/${selectedSemester}`);
                setCurrentGPA(response.data.course_gpa);
                setNewGPA(response.data.course_gpa); // Set newGPA to the current GPA initially
            } catch (error) {
                console.error('Failed to fetch current GPA:', error);
            }
        };

        fetchCurrentGPA();
    }, [courseId, selectedSemester]);

    useEffect(() => {
        // Fetch courses based on the selected semester
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/courses/${selectedSemester}`);
                setCourses(response.data);
                if (response.data.length > 0) {
                    setSelectedSemester(response.data[0].semester);
                }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };

        fetchCourses();
    }, [selectedSemester]);

    const handleUpdate = async () => {
        try {
            const studentId = localStorage.getItem('loggedInID');

            // Check if the GPA has been updated
            if (newGPA === currentGPA) {
                alert('Please enter a new GPA value to update.');
                return;
            }

            // Send a request to update the GPA for the selected course and semester
            await axios.post(`http://localhost:8081/updateCourseGPA/${studentId}/${courseId}/${selectedSemester}`, { newGPA });

            // Optionally, you can redirect the user to a different page or perform other actions
            alert(`Course GPA for ${courseId} (Semester ${selectedSemester}) updated successfully!`);
            navigate('/grades_info'); // Redirect to the grades_info page
        } catch (error) {
            console.error('Failed to update GPA:', error);

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            alert('An error occurred while updating the GPA');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update GPA for Course: {courseId}</h2>

            {/* Select Semester */}
            <div className="mb-2">
                <label htmlFor="semesterSelect">Select Semester</label>
                <select
                    id="semesterSelect"
                    className="form-control"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                >
                    {semesters.map((semester) => (
                        <option key={semester} value={semester}>
                            Semester {semester}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select Course */}
            <div className="mb-2">
                <label htmlFor="courseSelect">Select Course</label>
                <select
                    id="courseSelect"
                    className="form-control"
                    value={courseId}
                    onChange={(e) => navigate(`/update_grade_info/${e.target.value}`)}
                >
                    {courses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                            {course.course_name} {course.credits}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display Current GPA */}
            <p>Current GPA: {currentGPA}</p>

            {/* Enter New GPA */}
            <div className="mb-2">
                <label htmlFor="newGPA">New Course GPA</label>
                <input
                    type="number"
                    step="0.01"
                    id="newGPA"
                    className="form-control"
                    placeholder="Enter new course GPA"
                    value={newGPA}
                    onChange={(e) => setNewGPA(e.target.value)}
                />
            </div>

            {/* Update GPA Button */}
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                Update GPA
            </button>
        </div>
    );
}

export default UpdateGradeInfo;