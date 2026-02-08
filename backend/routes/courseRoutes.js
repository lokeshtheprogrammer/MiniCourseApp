const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

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

module.exports = router;
