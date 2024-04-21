import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Validation from './SignupValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [values, setValues] = useState({
        std_name: '',
        std_id: '',
        password: '',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.std_name === '' && errors.std_id === '' && errors.password === '') {
            axios
                .post('http://localhost:8081/signup', values)
                .then((res) => {
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-md-4">
                    <div className="card p-3 shadow">
                        <h2 className="mb-4 text-center">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    <strong>Name</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    name="std_name"
                                    onChange={handleInput}
                                    className={`form-control ${errors.std_name ? 'is-invalid' : ''}`}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
                                    className={`form-control ${errors.std_id ? 'is-invalid' : ''}`}
                                />
                                {errors.std_id && <div className="invalid-feedback">{errors.std_id}</div>}
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
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-success w-100">
                                Sign up
                            </button>
                            <p className="mt-3 text-center">You agree to our terms and policies</p>
                            <Link
                                to="/"
                                className="btn btn-light w-100 border rounded-0 text-decoration-none"
                            >
                                Login
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
