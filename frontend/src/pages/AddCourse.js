import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { isAdmin, isAuthenticated } from '../utils/auth';

const AddCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated() || !isAdmin()) {
            toast.error('Access denied. Admin privileges required.');
            navigate('/');
        }
    }, [navigate]);

    const validate = () => {
        if (!title.trim()) return 'Title is required';
        if (!description.trim()) return 'Description is required';
        if (isNaN(price) || Number(price) < 0) return 'Price must be a non-negative number';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            toast.error(err, { position: 'top-center' });
            return;
        }
        setLoading(true);
        try {
            const payload = { title, description, price: Number(price), image };
            await api.post('/courses', payload);
            toast.success('Course created successfully', { position: 'top-center' });
            setTimeout(() => navigate('/'), 800);
        } catch (error) {
            console.error('Create course failed', error);
            const msg = error.response?.data?.message || 'Failed to create course';
            toast.error(msg, { position: 'top-center' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <h3 className="mb-4 fw-bold">Add New Course</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Course title" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="5" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Full description"></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Price (0 = free)</label>
                                        <input type="number" min="0" step="0.01" className="form-control" value={price} onChange={(e)=>setPrice(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Image URL</label>
                                        <input className="form-control" value={image} onChange={(e)=>setImage(e.target.value)} placeholder="https://..." />
                                    </div>
                                </div>

                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary rounded-pill px-4" type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" /> Creating...
                                            </>
                                        ) : (
                                            'Create Course'
                                        )}
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={()=>navigate(-1)} disabled={loading}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;
