const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

// Connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB server');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });

// Connection object
const db = mongoose.connection;

// Connection events
db.on('connected', () => {
    console.log('MongoDB connected');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;