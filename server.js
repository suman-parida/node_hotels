const express = require('express');
const app = express();
require('dotenv').config();

// Import database connection
require('./db');

// Middleware
app.use(express.json()); // Parse JSON bodies

// Import models
const Person = require('./models/person');

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to my hotel management system');
});

// Import and use person routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// Get port from environment or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});