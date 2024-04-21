import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Update_info() {
    const [updateOption, setUpdateOption] = useState('');
    const [updatedValue, setUpdatedValue] = useState('');
    const navigate = useNavigate();

    const handleUpdate = async (event) => {
        event.preventDefault();

        const studentId = localStorage.getItem('loggedInID');
        const dataToSend = {
            std_id: studentId,
            updateOption: updateOption,
            updatedValue: updatedValue,
        };

        try {
            await axios.post('http://localhost:8081/updateStudentInfo', dataToSend);
            alert('Information updated successfully!');
            navigate('/student_info');
        } catch (error) {
            console.error('Error updating student information:', error.response);
            alert('An error occurred while updating student information');
        }
    };

    return (
        <div className="update-info-body mt-5">
            <h2 className="update-info-page-heading text-center mb-5">Update Information</h2>
            <form onSubmit={handleUpdate} className="update-info-card p-3">
                <div className="form-group">
                    <label htmlFor="updateOption">Select what to update:</label>
                    <select
                        className="form-control"
                        id="updateOption"
                        value={updateOption}
                        onChange={(e) => setUpdateOption(e.target.value)}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="std_email">Email</option>
                        <option value="std_phone_no">Phone No</option>
                        <option value="semester">Semester</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="updatedValue">Enter the updated value:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="updatedValue"
                        value={updatedValue}
                        onChange={(e) => setUpdatedValue(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block mt-3">
                    Update
                </button>
            </form>
        </div>
    );
}

export default Update_info;