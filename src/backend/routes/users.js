const express = require('express');
const { usersDb } = require('../app.cjs');

const router = express.Router();

router.post('/register', (req, res) => {
    // Retrieve data from request body
    const {firstName, lastName, email, password} = req.body;
    
    // Validate request body    
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    usersDb.findOne({ email }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const newUser = { firstName, lastName, email, password };
        usersDb.insert(newUser, (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            return res.status(201).json({ message: 'User registered successfully', user });
        });
    });
});

module.exports = router;