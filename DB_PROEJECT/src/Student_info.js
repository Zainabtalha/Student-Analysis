// Import necessary libraries and styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './student_info.css'; // Import your CSS file for local styling

function Student_info() {

    useEffect(() => {
        // Add a class to the body element when the component mounts
        document.body.classList.add('student-info-page-background');

        // Remove the added class when the component unmounts
        return () => {
            document.body.classList.remove('student-info-page-background');
        };
    }, []);

    const [student, setStudent] = useState({
        std_name: '',
        std_dob: '',
        std_email: '',
        std_phone_no: '',
        gender: '',
        degree: '',
        batch: '',
        semester: '',
    });
    const navigate = useNavigate();
    const student_id = localStorage.getItem('loggedInID');
    const [submitted, setSubmitted] = useState(false);

    const handleInput = (event) => {
        setStudent((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    useEffect(() => {
        const storedID = localStorage.getItem('loggedInID');
        if (storedID) {
            axios
                .get(`http://localhost:8081/getUserDetailsByID/${storedID}`)
                .then((response) => {
                    if (response.data) {
                        setStudent(response.data);
                        setSubmitted(true);
                    } else {
                        setSubmitted(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const studentId = localStorage.getItem('loggedInID');

        const dataToSend = {
            std_id: studentId,
            student: student,
        };

        axios
            .post('http://localhost:8081/addStudent', dataToSend)
            .then((res) => {
                if (res.data && res.data.std_id) {
                    localStorage.setItem('studentID', res.data.std_id);
                }
                setSubmitted(true);
            })
            .catch((error) => {
                console.error(error);
                alert('No record existed');
            });
    };

    // const handleDelete = async () => {
    //     try {
    //         // Display a confirmation dialog
    //         const userConfirmed = window.confirm('Are you sure you want to delete your information?');

    //         if (userConfirmed) {
    //             const student_id = localStorage.getItem('loggedInID');
    //             console.log('Deleting student with ID:', typeof student_id);
    //             //User confirmed, proceed with deletion
    //             const response = await axios.delete(`http://localhost:8081/deleteStudent/${student_id}`);
    //             const { data } = response;

    //             //Display another dialog for rollback confirmation
    //             const rollbackConfirmed = window.confirm('Do you want to rollback the deletion?');

    //             if (rollbackConfirmed) {
    //                 // Perform rollback logic here
    //                 const rollbackResponse = await axios.post(`http://localhost:8081/rollbackTransaction/${student_id}`);
    //                 const { message } = rollbackResponse.data;
    //                 alert(message);
    //             } else {
    //                 // Deletion confirmed, no rollback
    //                 alert(data.message);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error during delete operation:', error);
    //         alert('An error occurred while deleting student information');
    //     }
    // };
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete your information?')) {
            axios
                .delete(`http://localhost:8081/deleteStudent/${student_id}`)
                .then(() => {
                    alert('Student information deleted successfully');
                    navigate('/delete_student');
                    // if (window.confirm('Do you want to rollback the deletion?')) {
                    //     axios.post(`http://localhost:8081/rollbackTransaction/${student_id}`);
                    //     //const { message } = rollbackResponse.data;
                    //     alert('Student information roll backed successfully');
                    // } else {
                    //     // Deletion confirmed, no rollback
                    //     alert('Student information error rollbacked');
                    // }

                })
                .catch((error) => {
                    console.error('Error deleting student information:', error);
                    alert('An error occurred while deleting student information');
                });
        }
    };



    return (
        <div className="student-info-container">
            <h2 className="student-info-heading">Student Information</h2>

            {submitted ? (
                <div className="student-info-card submitted">
                    <h4 className="student-info-card-heading text-success">Submitted Information:</h4>
                    <ul className="list-group">
                        <li className="list-group-item">Student ID: {student_id}</li>
                        <li className="list-group-item">Name: {student.std_name}</li>
                        <li className="list-group-item">Date of Birth: {student.std_dob}</li>
                        <li className="list-group-item">Email: {student.std_email}</li>
                        <li className="list-group-item">Phone No: {student.std_phone_no}</li>
                        <li className="list-group-item">Gender: {student.gender}</li>
                        <li className="list-group-item">Degree: {student.degree}</li>
                        <li className="list-group-item">Batch: {student.batch}</li>
                        <li className="list-group-item">Semester: {student.semester}</li>
                    </ul>
                    <button type="button" className="btn-delete" onClick={() => handleDelete()}>
                        Delete
                    </button>
                    <Link to="/update_info" className="btn-update">
                        Update
                    </Link>
                    <Link to="/home" className="btn-back">
                        Back to home &larr;
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="student-info-card">
                    <div className="form-group">
                        <label htmlFor="std_name">Name:</label>
                        <input type="text" className="form-control" name="std_name" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="std_dob">Date of Birth:</label>
                        <input type="date" className="form-control" name="std_dob" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="std_email">Email:</label>
                        <input type="email" className="form-control" name="std_email" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="std_phone_no">Phone No:</label>
                        <input type="tel" className="form-control" name="std_phone_no" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select className="form-control" name="gender" onChange={handleInput} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="degree">Degree:</label>
                        <input type="text" className="form-control" name="degree" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="batch">Batch:</label>
                        <input type="text" className="form-control" name="batch" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="semester">Semester:</label>
                        <input type="text" className="form-control" name="semester" onChange={handleInput} required />
                    </div>
                    <button type="submit" className="student-info-button">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default Student_info;
