import React from 'react';

export default function Navbar({ setView }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand d-flex align-items-center">
          <img
            src="./smsfavicon.jpg"
            alt="Logo"
            style={{ height: '35px', marginRight: '10px' }}
          />
          School Management
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => setView('students')}>
                <i className="bi bi-people-fill me-1"></i> Students
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => setView('teachers')}>
                <i className="bi bi-person-badge-fill me-1"></i> Teachers
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => setView('marks')}>
                <i className="bi bi-journal-check me-1"></i> Marks
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
