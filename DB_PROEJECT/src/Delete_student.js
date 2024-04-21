import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function DeleteStudent() {
    const navigate = useNavigate();
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
    useEffect(() => {
        const storedID = localStorage.getItem('loggedInID');
        if (storedID) {
            axios
                .get(`http://localhost:8081/getUserDetailsByIDlogtable/${storedID}`)
                .then((response) => {
                    setStudent(response.data);
                    console.log(response.data);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);
    const student_ID = localStorage.getItem('loggedInID');
    const dataToSend = {
        std_id: student_ID,
        student: student,
    };
    const handleDelete = () => {
        try {
            // Ensure selectedCourse is truthy before making the delete request
            axios.post('http://localhost:8081/rollback1', dataToSend);
            //console.log(selectedCourse);
            // Redirect to the original page after deletion
            navigate(`/student_info`);
            alert(`Rollbacked successfully!`);
        } catch (error) {
            console.error('Error Response:', error.response);
            console.error(error);
            alert('An error occurred while Rollbacking.');
        }
    };

    // const handleNo = () => {
    //     //console.log()
    //     axios
    //         .delete(`http://localhost:8081/deletelogstudent/${student_ID}`)
    //         .then(() => {
    //             alert('Student information deleted successfully');
    //             navigate('/student_info');

    //         })
    //         .catch((error) => {
    //             console.error('Error deleting student information:', error);
    //             alert('An error occurred while deleting log student information');
    //         });
    // };
    return (
        <div className="container mt-5">
            <h2>Would you like to Roll Back</h2>

            <button onClick={handleDelete} className="btn btn-danger">
                Roll Back
            </button>
            <Link to={`/student_info`} className="btn btn-primary mt-3">
                  No
            </Link>
            {/* <button onClick={handleNo} className="btn btn-danger">
                No
            </button> */}
        </div>
    );
}

export default DeleteStudent;