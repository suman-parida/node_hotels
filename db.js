const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection - you can switch between local and Atlas
const useLocal = true; // Set to false to use MongoDB Atlas

let mongoURL;
if (useLocal) {
    // Local MongoDB connection
    mongoURL = 'mongodb://127.0.0.1:27017/hotels';
} else {
    // MongoDB Atlas connection
    mongoURL = process.env.MONGODB_URI || 'mongodb+srv://helloworld:suman1234@cluster0.zjtvplw.mongodb.net/hotels?retryWrites=true&w=majority';
}

// Connection options for Mongoose 9.x
const connectionOptions = {
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    maxPoolSize: 10, // Maintain up to 10 socket connections
};

// Connect to MongoDB
mongoose.connect(mongoURL, connectionOptions)
    .then(() => {
        console.log(`Connected to MongoDB ${useLocal ? 'locally' : 'Atlas'} successfully`);
        console.log('Database:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        console.log('Port:', mongoose.connection.port);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        if (useLocal) {
            console.error('\nLocal MongoDB connection failed. Please check:');
            console.error('1. MongoDB is installed and running locally');
            console.error('2. MongoDB service is started');
            console.error('3. Default port 27017 is available');
            console.error('\nTo start MongoDB locally:');
            console.error('- Windows: net start MongoDB (as administrator)');
            console.error('- macOS/Linux: sudo systemctl start mongod');
            console.error('- Or try: mongod --dbpath /path/to/your/db');
        } else {
            console.error('\nMongoDB Atlas connection failed. Please check:');
            console.error('1. Your internet connection');
            console.error('2. MongoDB Atlas cluster is running');
            console.error('3. IP address is whitelisted in MongoDB Atlas');
            console.error('4. Username and password are correct');
        }
        process.exit(1);
    });

// Connection object
const db = mongoose.connection;

// Connection events
db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;