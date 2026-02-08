const mongoose = require('mongoose');
const dns = require('dns');

// Force DNS resolution to Google Public DNS to bypass local DNS issues with SRV records
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
    console.warn("Could not set custom DNS servers:", e.message);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // These options help with some connection issues in older Mongoose/Node versions
            serverSelectionTimeoutMS: 10000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
