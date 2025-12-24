const express = require('express');
const router = express.Router();
const Person = require('./../models/person');



router.get('/', async(req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/', async(req, res) => {
    try {
        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/:worktype', async(req, res) => {
    try {
        const workType = req.params.worktype; // Extract the work type
        if (workType == 'Chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid work type' })
        }
    } catch (error) {

        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/person/:id', async(req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        const updatedPersonData = req.body; // Updated data for the person

        // Assuming you have a Person model
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        });
        if (!response) {
            return res.status(404).json({
                error: 'Person not found'
            });
        }

        console.log("data updated")
            // Send the updated person data as a JSON response
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;