import React, { useState } from 'react';
import axios from 'axios';

function DeleteLogin() {
  const [values, setValues] = useState({
    std_name: '',
    std_id: '',
    password: '',
  });

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8081/delete_login', values)
      .then((res) => {
        if (res.data === 'Success') {
          alert('Account deleted successfully');
        } else {
          alert('Error deleting account');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h2>Delete Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="std_name" className="form-label">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="std_name"
            onChange={handleInput}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="std_id" className="form-label">
            <strong>ID</strong>
          </label>
          <input
            type="text"
            placeholder="Enter ID"
            name="std_id"
            onChange={handleInput}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleInput}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Delete Account
        </button>
      </form>
    </div>
  );
}

export default DeleteLogin;
