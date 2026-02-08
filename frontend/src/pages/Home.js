import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, free, paid

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');
                setCourses(data);
            } catch (err) {
                toast.error('Error loading courses');
                console.error('Error fetching courses', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const getFilteredCourses = () => {
        if (filter === 'free') return courses.filter(c => c.price === 0);
        if (filter === 'paid') return courses.filter(c => c.price > 0);
        return courses;
    };

    const filteredCourses = getFilteredCourses();

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading amazing courses for you...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="text-center mb-5">
                <h1 className="mb-3 fw-bold display-4">
                    <i className="bi bi-mortarboard-fill text-primary me-2"></i>
                    Explore Our Premium Courses
                </h1>
                <p className="text-muted mb-4 lead">Learn from the best. Subscribe today and start your learning journey!</p>
                
                {/* Filter Buttons */}
                <div className="d-flex justify-content-center gap-2 mb-4">
                    <button
                        className={`btn rounded-pill px-4 fw-bold ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFilter('all')}
                    >
                        <i className="bi bi-grid-3x3-gap-fill me-1"></i>All Courses
                    </button>
                    <button
                        className={`btn rounded-pill px-4 fw-bold ${filter === 'free' ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => setFilter('free')}
                    >
                        <i className="bi bi-gift-fill me-1"></i>Free
                    </button>
                    <button
                        className={`btn rounded-pill px-4 fw-bold ${filter === 'paid' ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => setFilter('paid')}
                    >
                        <i className="bi bi-cash-coin me-1"></i>Paid
                    </button>
                </div>
                
                <p className="text-muted small">
                    Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                </p>
            </div>

            {filteredCourses.length === 0 ? (
                <div className="text-center mt-5">
                    <i className="bi bi-search" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                    <h4 className="text-muted mt-3">No courses found</h4>
                    <button
                        className="btn btn-outline-primary rounded-pill mt-3"
                        onClick={() => setFilter('all')}
                    >
                        View All Courses
                    </button>
                </div>
            ) : (
                <div className="row g-4">
                    {filteredCourses.map((course) => (
                        <div key={course._id} className="col-md-4 col-sm-6">
                            <div className="card h-100 shadow-sm border-0 rounded-4 course-card">
                                {course.image && (
                                    <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                                        <img 
                                            src={course.image} 
                                            className="card-img-top" 
                                            alt={course.title} 
                                            style={{ height: '100%', objectFit: 'cover', width: '100%' }} 
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            backgroundColor: course.price === 0 ? 'rgba(40, 167, 69, 0.95)' : 'rgba(255, 193, 7, 0.95)',
                                            color: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {course.price === 0 ? '🎁 FREE' : `💰 $${course.price.toFixed(2)}`}
                                        </div>
                                    </div>
                                )}
                                <div className="card-body d-flex flex-column p-4">
                                    <h5 className="card-title fw-bold mb-3 text-dark">{course.title}</h5>
                                    <p className="card-text text-muted mb-4 flex-grow-1" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                        {course.description.substring(0, 100)}...
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                                        <span className={`badge rounded-pill px-3 py-2 ${course.price === 0 ? 'bg-success' : 'bg-warning'}`}>
                                            {course.price === 0 ? 'FREE' : `$${course.price.toFixed(2)}`}
                                        </span>
                                        <Link 
                                            to={`/courses/${course._id}`} 
                                            className="btn btn-outline-primary rounded-pill px-4 btn-sm fw-bold"
                                        >
                                            <i className="bi bi-arrow-right me-1"></i>View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
