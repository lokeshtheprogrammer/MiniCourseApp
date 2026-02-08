const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        pricePaid: {
            type: Number,
            required: true,
        },
        subscribedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
