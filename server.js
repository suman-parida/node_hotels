const express = require('express');
const app = express();
require('./db'); // Just require it

app.use(express.json()); // Instead of body-parser

const Person = require('./models/person');
const { json } = require('body-parser');

app.get('/', (req, res) => {
    res.send('Welcome to my home');
});








//import the file
const personRoutes = require('./routes/personRoutes')
    // use the router
app.use('/person', personRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});