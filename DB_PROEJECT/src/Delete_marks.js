import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './marksdelete.css'; // Import the CSS file

function DeleteMarks() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const studentId = localStorage.getItem('loggedInID');
        const response = await axios.get(`http://localhost:8081/coursesfetchmarks/${studentId}`);
        setCourses(response.data);
        if (response.data.length > 0) {
          setSelectedCourse(response.data[0].course_id);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const studentId = localStorage.getItem('loggedInID');

      await axios.delete(`http://localhost:8081/deleteCoursemarks/${studentId}/${selectedCourse}`);
      alert(`Marks for Course ID ${selectedCourse} deleted successfully!`);
      navigate('/marks_info', { replace: true });
    } catch (error) {
      console.error('Error Response:', error.response);
      console.error(error);
      alert('An error occurred while deleting marks');
    }
  };

  return (
    <div className="container mt-5">
      <h4>Select Course</h4>
      <select
        className="form-control mb-4"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        {courses.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.course_name} {course.credits}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>

          <button type="submit" className="btn btn-primary mt-3">
            Delete Marks
          </button>
      </form>
    </div>
  );
}

export default DeleteMarks;
