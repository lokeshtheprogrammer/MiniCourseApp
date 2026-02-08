import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const { data } = await api.get('/my-courses');
                setCourses(data);
                if (data.length === 0) {
                    toast.info('You haven\'t subscribed to any courses yet!', {
                        position: 'top-center',
                        autoClose: 2000,
                    });
                }
            } catch (err) {
                toast.error('Error loading your courses');
                console.error('Error fetching my courses', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading your courses...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-5 fw-bold display-4">
                <i className="bi bi-bookmark-fill text-success me-2"></i>
                My Learning Dashboard
            </h2>
            
            {courses.length === 0 ? (
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mt-5">
                        <div className="mb-4">
                            <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                        </div>
                        <h4 className="text-muted mb-3">No Courses Yet</h4>
                        <p className="text-muted mb-4">
                            You haven't subscribed to any courses yet. Start learning today!
                        </p>
                        <a href="/" className="btn btn-primary rounded-pill px-4 fw-bold">
                            <i className="bi bi-search me-2"></i>Browse Courses
                        </a>
                    </div>
                </div>
            ) : (
                <div className="row g-4 justify-content-center">
                    {courses.map((sub) => (
                        <div key={sub._id} className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100 shadow border-0 rounded-4 overflow-hidden course-card">
                                {sub.courseId.image && (
                                    <div style={{ position: 'relative', overflow: 'hidden', height: '180px' }}>
                                        <img 
                                            src={sub.courseId.image} 
                                            className="card-img-top" 
                                            alt={sub.courseId.title} 
                                            style={{ height: '100%', objectFit: 'cover', width: '100%' }} 
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            backgroundColor: 'rgba(40, 167, 69, 0.9)',
                                            color: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0 0 0 8px',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold'
                                        }}>
                                            ✓ Enrolled
                                        </div>
                                    </div>
                                )}
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-3 text-dark">{sub.courseId.title}</h5>
                                    <div className="d-flex justify-content-between text-muted small mb-3">
                                        <span>
                                            <i className="bi bi-tag-fill me-1 text-info"></i> 
                                            Paid: <strong>${(sub.pricePaid || 0).toFixed(2)}</strong>
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small mb-3">
                                        <span>
                                            <i className="bi bi-calendar-event me-1 text-danger"></i>
                                            {new Date(sub.subscribedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="progress mb-3" style={{ height: '8px' }}>
                                        <div 
                                            className="progress-bar bg-success rounded-pill" 
                                            role="progressbar" 
                                            style={{ width: '45%' }} 
                                            aria-valuenow="45" 
                                            aria-valuemin="0" 
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                    <p className="card-text small text-muted text-center mb-3">
                                        <span className="badge bg-success rounded-pill me-2">In Progress</span>
                                        45% Complete
                                    </p>
                                    <button className="btn btn-outline-primary btn-sm w-100 rounded-pill fw-bold">
                                        <i className="bi bi-play-fill me-1"></i>Continue Learning
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCourses;
