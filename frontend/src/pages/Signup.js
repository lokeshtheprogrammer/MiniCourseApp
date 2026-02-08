import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { login } from '../utils/auth';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!name.trim()) {
            setError('Name is required');
            return false;
        }
        if (!email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!password) {
            setError('Password is required');
            return false;
        }
        if (password.length < 3) {
            setError('Password should be at least 3 characters');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const { data } = await api.post('/auth/signup', { name, email, password });
            login(data);
            toast.success('Signup successful! Welcome 👋', { position: 'top-center', autoClose: 2000 });
            setTimeout(() => navigate('/'), 500);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage, { position: 'top-center' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4 logo-text">MiniCourse<span className="text-primary">App</span></h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                                    <input
                                        type="text"
                                        className={`form-control rounded-3 ${error ? 'is-invalid' : ''}`}
                                        id="name"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value); setError(null); }}
                                        disabled={loading}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        className={`form-control rounded-3 ${error ? 'is-invalid' : ''}`}
                                        id="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                        disabled={loading}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control rounded-3 ${error ? 'is-invalid' : ''}`}
                                        id="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setError(null); }}
                                        disabled={loading}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                                    <input
                                        type="password"
                                        className={`form-control rounded-3 ${error ? 'is-invalid' : ''}`}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
                                        disabled={loading}
                                        placeholder="Confirm your password"
                                    />
                                </div>
                                {error && <div className="alert alert-danger rounded-3 small">{error}</div>}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 rounded-3 py-2 fw-bold login-btn"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Signing Up...
                                        </>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </form>
                            <div className="mt-4 text-center">
                                <p className="text-muted mt-3">
                                    Already have an account? 
                                    <Link to="/login" className="text-primary fw-bold">Sign in here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
