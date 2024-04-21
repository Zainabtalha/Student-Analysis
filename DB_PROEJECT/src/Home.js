import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for additional styling

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        <a href="#" className="logo">
        <div className="user-icon" />
         <h3 style={{ color: '#4a87dd' }}> Student <span style={{ color: '#5392a1' }}>Analysis</span> </h3>
         </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/student_info" className="nav-link">
                  Student Info
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/semester_info" target="_blank" className="nav-link">
                  Semester Info
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Behaviour_info" target="_blank" className="nav-link">
                  Behaviour Info
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Analysis" target="_blank" className="nav-link">
                Analysis
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/"  className="nav-link">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Landing Page Content */}
      <div className="landing-page">
        <div className="landing-content">
          <h1>Welcome to the Student Portal</h1>
          <p>Explore your student information and semester details with ease.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
