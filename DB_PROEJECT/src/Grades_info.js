// Grades_info.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Grades_info.css'; // Import your CSS file

function GradesInfo() {
  const [semester, setSemester] = useState(1);
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState({
    course_gpa: 0,
    course_grade: '',
  });

  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();

  const handleGradeChange = (field, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
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
        grades: grades,
        semester: semester,
      };

      await axios.post('http://localhost:8081/submitGrades', dataToSend);

      // Use navigate to refresh the page
      navigate('/grades_info', { replace: true });
      alert(`Grades for Course ID ${selectedCourse} submitted successfully!`);
        // Reload the page to reflect the changes
        window.location.reload();
    } catch (error) {
      console.error('Error Response:', error.response);
      console.error(error);
      alert('An error occurred while submitting grades');
    }
  };

  useEffect(() => {
    // Fetch courses based on the selected semester
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
    <div className="grades-info-container">
      <h2 className="grades-info-heading">Select Semester</h2>
      <select
        className="grades-info-select"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <option key={num} value={num}>
            Semester {num}
          </option>
        ))}
      </select>

      {courses.length > 0 && (
        <>
          <h4 className="grades-info-heading">Select Course</h4>
          <select
            className="grades-info-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name} {course.credits}
              </option>
            ))}
          </select>

          <form onSubmit={handleSubmit} className="grades-info-form">
            <div>
              <h5 className="grades-info-heading">Enter Grades for {selectedCourse}</h5>

              <div className="grades-info-label">
                <label htmlFor="courseGPA">Course GPA</label>
                <input
                  type="number"
                  step="0.01"
                  id="courseGPA"
                  className="grades-info-input"
                  placeholder="Enter course GPA"
                  value={grades.course_gpa}
                  onChange={(e) => handleGradeChange('course_gpa', e.target.value)}
                />
              </div>

              {/* Uncomment the following section if you want to include Course Grade input */}
              {/* <div className="grades-info-label">
                <label htmlFor="courseGrade">Course Grade</label>
                <input
                  type="text"
                  id="courseGrade"
                  className="grades-info-input"
                  placeholder="Enter course grade"
                  value={grades.course_grade}
                  onChange={(e) => handleGradeChange('course_grade', e.target.value)}
                />
              </div> */}

              <button type="submit" className="grades-info-button">
                Submit
              </button>
              <Link to="/delete_grade" className="grades-info-link">
                Delete
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default GradesInfo;
