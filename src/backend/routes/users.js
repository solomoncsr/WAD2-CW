const express = require('express');
const { usersDb } = require('../db.js');

const router = express.Router();

router.post('/register', (req, res) => {
    // Retrieve data from request body
    const {firstName, lastName, email, password} = req.body;
    
    console.log('Received data:', req.body);

    // Validate request body
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    usersDb.findOne({ email: email }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const newUser = { firstName: firstName, lastName: lastName, email: email, password: password };
        usersDb.insert(newUser, (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            return res.status(201).json({ message: 'User registered successfully', user });
        });
    });
});

router.post('/login', (req, res) => {
    // Retrieve data from request body
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user exists
    usersDb.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful', user });
    });
});

module.exports = router;