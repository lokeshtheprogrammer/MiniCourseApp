import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [promoCode, setPromoCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [isValidPromo, setIsValidPromo] = useState(false);
    const [subscriptionError, setSubscriptionError] = useState(null);
    const [subscribing, setSubscribing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${id}`);
                setCourse(data);
            } catch (err) {
                toast.error('Error loading course details');
                console.error('Error fetching course', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handlePromoCheck = () => {
        if (!promoCode.trim()) {
            toast.warning('Please enter a promo code');
            return;
        }
        if (promoCode === 'BFSALE25') {
            setDiscountedPrice(course.price * 0.5);
            setIsValidPromo(true);
            toast.success('🎉 Promo code applied! 50% discount unlocked!', {
                position: 'top-center',
                autoClose: 2000,
            });
        } else {
            setIsValidPromo(false);
            setDiscountedPrice(null);
            toast.error('❌ Invalid promo code. Try BFSALE25', {
                position: 'top-center',
            });
        }
    };

    const handleSubscribe = async () => {
        try {
            setSubscribing(true);
            await api.post('/subscribe', {
                courseId: id,
                promoCode: course.price > 0 ? promoCode : null,
            });
            toast.success(`✅ Successfully subscribed to "${course.title}"!`, {
                position: 'top-center',
                autoClose: 2000,
            });
            setTimeout(() => {
                navigate('/my-courses');
            }, 1000);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Subscription failed. Please try again.';
            setSubscriptionError(errorMsg);
            toast.error(errorMsg, {
                position: 'top-center',
            });
        } finally {
            setSubscribing(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading course details...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center" role="alert">
                    <h4>Course Not Found</h4>
                    <p>The course you're looking for doesn't exist.</p>
                    <a href="/" className="btn btn-primary rounded-pill">Go Back to Courses</a>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {course.image && (
                            <img src={course.image} className="card-img-top" alt={course.title} style={{ height: '350px', objectFit: 'cover' }} />
                        )}
                        <div className="card-body p-5">
                            <h2 className="card-title fw-bold mb-3">{course.title}</h2>
                            <p className="card-text text-muted mb-4 lead" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                {course.description}
                            </p>

                            <div className="d-flex align-items-center mb-4">
                                <h4 className="me-3 mb-0">Price:</h4>
                                {course.price === 0 ? (
                                    <span className="badge bg-success rounded-pill px-4 py-2 fs-5">FREE</span>
                                ) : (
                                    <div>
                                        {isValidPromo ? (
                                            <div>
                                                <span className="text-muted text-decoration-line-through me-2 fs-5">${course.price.toFixed(2)}</span>
                                                <span className="text-danger fw-bold fs-4">${discountedPrice.toFixed(2)}</span>
                                                <span className="badge bg-danger ms-2 rounded-pill animate__animated animate__bounce">50% OFF</span>
                                            </div>
                                        ) : (
                                            <span className="fw-bold fs-4 text-primary">${course.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {course.price > 0 && (
                                <div className="mb-4 bg-light p-4 rounded-3 border border-info">
                                    <label htmlFor="promoCode" className="form-label fw-bold text-uppercase small letter-spacing-1">
                                        <i className="bi bi-tag-fill text-info me-1"></i>Have a Promo Code?
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg border-0 shadow-sm"
                                            id="promoCode"
                                            placeholder="Enter code (e.g. BFSALE25)"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                            disabled={subscribing}
                                        />
                                        <button
                                            className="btn btn-dark px-4 fw-bold"
                                            onClick={handlePromoCheck}
                                            disabled={!promoCode || subscribing}
                                        >
                                            APPLY
                                        </button>
                                    </div>
                                    <small className="text-muted mt-2 d-block">
                                        <i className="bi bi-lightbulb-fill me-1"></i>
                                        Hint: Use <strong>BFSALE25</strong> for 50% off!
                                    </small>
                                </div>
                            )}

                            {subscriptionError && <div className="alert alert-danger rounded-3">{subscriptionError}</div>}

                            <button
                                className={`btn btn-lg w-100 py-3 rounded-pill fw-bold text-uppercase letter-spacing-1 ${
                                    course.price > 0 && !isValidPromo ? 'btn-secondary' : 'btn-success subscription-btn'
                                }`}
                                onClick={handleSubscribe}
                            disabled={((course.price > 0) && (!isValidPromo)) || subscribing}

                            >
                                {subscribing ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : (
                                    course.price === 0 ? 'Subscribe for Free' : 'Subscribe Now'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
