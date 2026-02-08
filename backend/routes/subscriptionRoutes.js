const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Course = require('../models/Course');
const { protect } = require('../middleware/authMiddleware');

// @desc Create a subscription
// @route POST /subscribe
router.post('/subscribe', protect, async (req, res) => {
    const { courseId, promoCode } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }

    // Check if already subscribed
    const alreadySubscribed = await Subscription.findOne({
        userId: req.user._id,
        courseId: courseId,
    });

    if (alreadySubscribed) {
        res.status(400).json({ message: 'Already subscribed to this course' });
        return;
    }

    let pricePaid = course.price;

    if (course.price > 0) {
        if (promoCode === 'BFSALE25') {
            pricePaid = course.price * 0.5;
        } else {
            res.status(400).json({ message: 'Invalid or missing promo code for paid course' });
            return;
        }
    }

    const subscription = new Subscription({
        userId: req.user._id,
        courseId: course._id,
        pricePaid,
    });

    const createdSubscription = await subscription.save();
    res.status(201).json(createdSubscription);
});

// @desc Get user's subscriptions
// @route GET /my-courses
router.get('/my-courses', protect, async (req, res) => {
    const subscriptions = await Subscription.find({ userId: req.user._id }).populate('courseId');
    res.json(subscriptions);
});

module.exports = router;
