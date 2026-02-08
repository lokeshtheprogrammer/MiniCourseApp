const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');
const Subscription = require('./models/Subscription');
const connectDB = require('./config/db');

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
    },
];

const courses = [
    {
        title: 'Modern JavaScript (ES6+)',
        description: 'Learn the latest features of JavaScript including arrow functions, destructuring, and more.',
        price: 0,
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=400',
    },
    {
        title: 'React for Beginners',
        description: 'A complete guide to building interactive user interfaces with React.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
    },
    {
        title: 'Node.js Backend Mastery',
        description: 'Master the art of building scalable backends using Node.js and Express.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400',
    },
    {
        title: 'Fullstack Web Development',
        description: 'Learn MERN stack from scratch and build real-world applications.',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400',
    },
    {
        title: 'Intro to UI/UX Design',
        description: 'Fundamentals of design, wireframing, and prototyping for modern web apps.',
        price: 0,
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=400',
    },
];

const importData = async () => {
    try {
        await Subscription.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        // Use create instead of insertMany to trigger pre-save middleware for password hashing
        for (const user of users) {
            await User.create(user);
        }
        console.log('Users Imported!');

        await Course.insertMany(courses);
        console.log('Courses Imported!');

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Import Error: ${error.message}`);
        process.exit(1);
    }
};

const startSeeding = async () => {
    try {
        await connectDB();
        await importData();
    } catch (error) {
        console.error('Failed to connect for seeding');
        process.exit(1);
    }
};

startSeeding();
