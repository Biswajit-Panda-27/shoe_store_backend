require('dotenv').config();

const mongoConfig = {
    mongoURL: process.env.MONGO_URL,
};

module.exports = mongoConfig;