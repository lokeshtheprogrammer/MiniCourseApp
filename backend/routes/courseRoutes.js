const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect } = require('../middleware/authMiddleware');

// @desc Fetch all courses
// @route GET /courses
router.get('/', async (req, res) => {
    const courses = await Course.find({});
    res.json(courses);
});

// @desc Fetch single course
// @route GET /courses/:id
router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// @desc Create a new course (protected)
// @route POST /courses
router.post('/', protect, async (req, res) => {
    const { title, description, price = 0, image } = req.body;

    if (!title || !description) {
        res.status(400).json({ message: 'Title and description are required' });
        return;
    }

    try {
        const course = new Course({ title, description, price, image });
        const created = await course.save();
        res.status(201).json(created);
    } catch (error) {
        console.error('Error creating course:', error.message);
        res.status(500).json({ message: 'Failed to create course' });
    }
});

module.exports = router;
