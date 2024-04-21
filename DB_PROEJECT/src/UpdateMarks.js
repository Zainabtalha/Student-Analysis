import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './MarksForm.css'; // Import your CSS file

function UpdateMarks() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();
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
    class_participation_total: 0,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const studentId = localStorage.getItem('loggedInID');
        const response = await axios.get(`http://localhost:8081/coursesfetchmarks/${studentId}`);
        setCourses(response.data);
        if (response.data.length > 0) {
          setSelectedCourse(response.data[0].course_id);
          // setMarks(response.data[0].marks);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchMarksForCourse = async () => {
      try {
        const studentId = localStorage.getItem('loggedInID');
        const response = await axios.get(`http://localhost:8081/getMarks/${studentId}/${selectedCourse}`);

        // Set the marks state with the fetched values
        setMarks(response.data);
      } catch (error) {
        console.error('Failed to fetch marks:', error);
      }
    };

    if (selectedCourse) {
      fetchMarksForCourse();
    }
  }, [selectedCourse]);

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

      const dataToUpdate = {
        std_id: studentId,
        course_id: selectedCourse,
        marks: marks,
      };

      await axios.post('http://localhost:8081/updateMarks', dataToUpdate);
      alert(`Marks for Course ID ${selectedCourse} updated successfully!`);
      navigate('/marks_info', { replace: true });
    } catch (error) {
      console.error('Error Response:', error.response);
      console.error(error);
      alert('An error occurred while updating marks');
    }
  };

  return (
    <div className="update-marks-container container mt-5">
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

      <form onSubmit={handleSubmit} className="update-marks-form">
        <div>
          <h5>Update Marks for {selectedCourse}</h5>

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

          <button type="submit" className="update-marks-btn btn btn-primary mt-3">
            Update Marks
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateMarks;
