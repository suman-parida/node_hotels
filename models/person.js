const mongoose = require('mongoose');

//create a schema
const personSchem = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true


    },
    work: {
        type: String,
        enum: ['Chef', 'waiter', 'manager'],
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,

    },
    address: {
        type: String,
        require: true
    },
    salary: {
        type: String,
        require: true
    },





})

//create a model

const Person = mongoose.model('Person', personSchem);
module.exports = Person;