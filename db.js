const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas connection string from environment variables
//const mongoURL = process.env.MONGODB_URI || 'mongodb+srv://helloworld:suman1234@cluster0.zjtvplw.mongodb.net/hotels?retryWrites=true&w=majority';

// Connection options for Mongoose 9.x (removed deprecated options)
const connectionOptions = {
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    maxPoolSize: 10, // Maintain up to 10 socket connections
};

// Connect to MongoDB
mongoose.connect(mongoURL, connectionOptions)
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully');
        console.log('Database:', mongoose.connection.name);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        console.error('Please check:');
        console.error('1. Your internet connection');
        console.error('2. MongoDB Atlas cluster is running');
        console.error('3. IP address is whitelisted in MongoDB Atlas');
        console.error('4. Username and password are correct');
        console.error('5. Database name exists');
        process.exit(1);
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


// const mongoose = require('mongoose');

// const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

// // Connect to MongoDB
// mongoose.connect(mongoURL)
//     .then(() => {
//         console.log('Connected to MongoDB server');
//     })
//     .catch((err) => {
//         console.log('MongoDB connection error:', err);
//     });

// // Connection object
// const db = mongoose.connection;

// // Connection events
// db.on('connected', () => {
//     console.log('MongoDB connected');
// });

// db.on('error', (err) => {
//     console.log('MongoDB connection error:', err);
// });

// db.on('disconnected', () => {
//     console.log('MongoDB disconnected');
// });

// module.exports = db;