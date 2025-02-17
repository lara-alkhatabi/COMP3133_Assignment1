const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const connectDB = async () => {
    try {
        console.log("🔹 MONGO_URI from .env:", process.env.MONGO_URI); // Debugging
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
