const mongoose = require('mongoose');
const { mongoURL } = require('../../config/mongo/mongoConfig');


const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectMongoDB;