import React from 'react';
//import { useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';

function Login() {

    const handleRollback = () => {
        // Implement rollback functionality here
        axios
          .post('http://localhost:8081/rollback')
          .then((res) => {
            if (res.data === 'Success') {
              alert('Rollback successful');
            } else {
              alert('Error in rollback');
            }
          })
          .catch((err) => console.log(err));
      };
    const [values, setValues] = useState({
        std_id: '',
        password: '',
    });


    useEffect(() => {
        const disableBackNavigation = () => {
          window.history.pushState(null, document.title, window.location.href);
          window.addEventListener('popstate', function () {
            window.history.pushState(null, document.title, window.location.href);
          });
        };
    
        disableBackNavigation();
    
        return () => {
          window.removeEventListener('popstate', disableBackNavigation);
        };
      }, []);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.std_id === '' && errors.password === '') {
            axios
                .post('http://localhost:8081/login', values)
                .then((res) => {
                    if (res.data === 'Success') {
                        localStorage.setItem('loggedInID', values.std_id);
                        navigate('/home');
                    } else {
                        alert('No record existed');
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-md-4">
                    <div className="card p-3 shadow">
                        <h2 className="mb-4 text-center">Sign In</h2>
                        <form onSubmit={handleSubmit}>
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
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-success w-100">
                                Log In
                            </button>
                            <p className="mt-3 text-center">
                                You agree to our terms and policies
                            </p>
                            <Link
                                to="/signup1"
                                className="btn btn-light w-100 border rounded-0 text-decoration-none"
                            >
                                Create Account
                            </Link>

                            <Link to="/delete_login" className="btn btn-danger w-100 mt-3">
                              Delete Account
                            </Link>

                             {/* Add the rollback button */}
                             <button onClick={handleRollback} className="btn btn-warning w-100 mt-3">
                              Rollback
                             </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
