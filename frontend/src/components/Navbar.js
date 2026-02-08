import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated, getCurrentUser } from '../utils/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold fst-italic mx-3 text-uppercase letter-spacing-2" to="/">
                    <i className="bi bi-book-half me-2"></i>MiniCourseApp
                </Link>
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link px-3 active fw-semibold" to="/">
                                <i className="bi bi-house-door-fill me-1"></i>Home
                            </Link>
                        </li>
                        {isAuthenticated() ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 fw-semibold" to="/my-courses">
                                        <i className="bi bi-person-video3 me-1"></i>My Courses
                                    </Link>
                                </li>
                                <li className="nav-item dropdown px-3">
                                    <a className="nav-link dropdown-toggle fw-bold text-warning" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user?.name || 'User'}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="navbarDropdown">
                                        <li><button className="dropdown-item text-danger fw-bold" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link px-3 btn btn-outline-light rounded-pill ms-2 fw-bold" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
