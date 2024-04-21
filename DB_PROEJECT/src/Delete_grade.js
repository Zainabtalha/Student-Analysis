import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Deletegrades.css'; // Import your CSS file

function DeleteCourse() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(''); // Changed to an empty string

  const navigate = useNavigate();
  const studentId = localStorage.getItem('loggedInID');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/coursesfetchgrades/${studentId}`);
        setCourses(response.data);
        setSelectedCourse(response.data[0].course_id);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, [studentId]);


  useEffect(() => {
    document.body.classList.add('delete-course-component');
    return () => {
      document.body.classList.remove('delete-course-component');
    };
  }, []);

  const handleDelete = async () => {
    try {
      // Ensure selectedCourse is truthy before making the delete request
      if (!selectedCourse) {
        alert('Please select a course to delete.');
        return;
      }
      await axios.delete(`http://localhost:8081/deleteCourse/${studentId}/${selectedCourse}`);
      //console.log(selectedCourse);
      // Redirect to the original page after deletion
      navigate(`/semester_info`);
      alert(`Course ID ${selectedCourse} deleted successfully!`);
    } catch (error) {
      console.error('Error Response:', error.response);
      console.error(error);
      alert('An error occurred while deleting the course.');
    }
  };

  return (
    <div className="delete-course-container mt-5 ">
      <h2 className="delete-course-heading">Select Course to Delete</h2>
      <select
        className="delete-course-input form-control mb-4"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        {courses.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.course_name} {course.credits}
          </option>
        ))}
      </select>

      <button onClick={handleDelete} className="delete-course-btn-danger btn">
        Delete Course
      </button>

      <Link to={`/semester_info`} className="delete-course-btn-primary btn mt-3">
        Back to Semester Info
      </Link>
    </div>
  );
}


export default DeleteCourse;
