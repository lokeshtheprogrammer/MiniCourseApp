import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated, getCurrentUser, isAdmin } from '../utils/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated());
        setUser(getCurrentUser());
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setAuthenticated(isAuthenticated());
            setUser(getCurrentUser());
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChange', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
        setUser(null);
        window.dispatchEvent(new Event('authChange'));
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
                        {authenticated ? (
                            <>
                                {isAdmin() && (
                                    <li className="nav-item">
                                        <Link className="nav-link px-3 fw-semibold" to="/add-course">
                                            <i className="bi bi-plus-circle me-1"></i>Add Course
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link className="nav-link px-3 fw-semibold" to="/my-courses">
                                        <i className="bi bi-person-video3 me-1"></i>My Courses
                                    </Link>
                                </li>
                                <li className="nav-item px-3 d-flex align-items-center">
                                    <span className="nav-link fw-bold text-warning m-0">{user?.name || 'User'}</span>
                                    <button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-1"></i>Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 btn btn-outline-light rounded-pill ms-2 fw-bold" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link px-3 btn btn-outline-light rounded-pill ms-2 fw-bold" to="/signup">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
