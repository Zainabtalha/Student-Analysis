import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Marks_info.css'; // Import the CSS file

function MarksInfo() {
    const [semester, setSemester] = useState(1);
    const [courses, setCourses] = useState([]);
    const [marks, setMarks] = useState({
        mid_term_obtained: 0,
        mid_term_total: 0,
        quiz_obtained: 0,
        quiz_total: 0,
        assignments_obtained: 0,
        assignments_total: 0,
        projects_obtained: 0,
        projects_total: 0,
        class_participation_obtained: 0,
        class_participation_total: 0
    });

    const [selectedCourse, setSelectedCourse] = useState('');
    const navigate = useNavigate();

    const handleMarkChange = (field, value) => {
        setMarks((prevMarks) => ({
            ...prevMarks,
            [field]: value || '',
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const studentId = localStorage.getItem('loggedInID');

            const dataToSend = {
                std_id: studentId,
                course_id: selectedCourse,
                marks: marks,
                semester: semester,
            };

            await axios.post('http://localhost:8081/submitMarks', dataToSend);

            alert(`Marks for Course ID ${selectedCourse} submitted successfully!`);
            // Reload the page to reflect the changes
            window.location.reload();
        } catch (error) {
            console.error('Error Response:', error.response);
            console.error(error);
            alert('An error occurred while submitting marks');
        }
    };

    const handleUpdate = () => {
        // Navigate to the UpdateMarks page with the selected course
        navigate(`/updatemarks/${selectedCourse}`);
    };

    const handleDelete = async () => {
        try {
            const studentId = localStorage.getItem('loggedInID');
            await axios.delete(`http://localhost:8081/deleteMarks/${studentId}/${selectedCourse}`);
            alert(`Marks for Course ID ${selectedCourse} deleted successfully!`);
            // Reload the page to reflect the changes
            window.location.reload();
        } catch (error) {
            console.error('Error Response:', error.response);
            console.error(error);
            alert('An error occurred while deleting marks');
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/courses/${semester}`);
                setCourses(response.data);
                if (response.data.length > 0) {
                    setSelectedCourse(response.data[0].course_id);
                }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };

        fetchCourses();
    }, [semester]);

    return (
        <div className="marks-info-container marks-info-page">
            <div className="form-container">
                <h2>Select Semester</h2>
                <select className="semester-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                            Semester {num}
                        </option>
                    ))}
                </select>

                {courses.length > 0 && (
                    <>
                        <h4>Select Course</h4>
                        <select
                            className="course-select"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            {courses.map((course) => (
                                <option key={course.course_id} value={course.course_id}>
                                    {course.course_name} {course.credits}
                                </option>
                            ))}
                        </select>

                        <form onSubmit={handleSubmit} className="marks-form">
                            <div>
                                <h5>Enter Marks for {selectedCourse}</h5>

                                <div className="mb-2">
                                    <label htmlFor="midTermMarks">Mid Term Marks</label>
                                    <input
                                        type="number"
                                        id="midTermMarks"
                                        className="form-control"
                                        placeholder="Enter obtained marks"
                                        value={marks.mid_term_obtained}
                                        onChange={(e) => handleMarkChange('mid_term_obtained', e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        className="form-control mt-2"
                                        placeholder="Enter total marks"
                                        value={marks.mid_term_total}
                                        onChange={(e) => handleMarkChange('mid_term_total', e.target.value)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="quizMarks">Quiz Marks</label>
                                    <input
                                        type="number"
                                        id="quizMarks"
                                        className="form-control"
                                        placeholder="Enter obtained marks"
                                        value={marks.quiz_obtained}
                                        onChange={(e) => handleMarkChange('quiz_obtained', e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        className="form-control mt-2"
                                        placeholder="Enter total marks"
                                        value={marks.quiz_total}
                                        onChange={(e) => handleMarkChange('quiz_total', e.target.value)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="assignmentsMarks">Assignment Marks</label>
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter assignments obtained marks"
                                        value={marks.assignments_obtained}
                                        onChange={(e) => handleMarkChange('assignments_obtained', e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter assignments total marks"
                                        value={marks.assignments_total}
                                        onChange={(e) => handleMarkChange('assignments_total', e.target.value)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="projectsMarks">Projects Marks</label>
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter projects obtained marks"
                                        value={marks.projects_obtained}
                                        onChange={(e) => handleMarkChange('projects_obtained', e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter projects total marks"
                                        value={marks.projects_total}
                                        onChange={(e) => handleMarkChange('projects_total', e.target.value)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="classParticipationMarks">Class Participation Marks</label>
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter class participation obtained marks"
                                        value={marks.class_participation_obtained}
                                        onChange={(e) =>
                                            handleMarkChange('class_participation_obtained', e.target.value)
                                        }
                                    />

                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter class participation total marks"
                                        value={marks.class_participation_total}
                                        onChange={(e) =>
                                            handleMarkChange('class_participation_total', e.target.value)
                                        }
                                    />
                                </div>

                                <div className="btn-container">
                                    <div className="button-row">
                                        <button type="submit" className="submit-btn">
                                            Submit
                                        </button>
                                        <Link to="/finalprediction" className="predict-btn">
                                            Predict Final Marks
                                        </Link>
                                    </div>
                                    <div className="button-row">
                                        <Link to="/semester_info" className="back-btn">
                                            Back to Semester Info &larr;
                                        </Link>
                                        <Link to="/updatemarks" className="update-btn">
                                            Update Marks
                                        </Link>
                                        <Link to="/delete_marks" className="delete-btn">
                                            Delete Marks
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
export default MarksInfo