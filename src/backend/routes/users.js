const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usersDb } = require('../db.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
    // Retrieve user ID from request object
    const userId = req.user.id;

    // Find user in database
    usersDb.findOne({ _id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User profile retrieved successfully', user });
    });
});

router.post('/register', (req, res) => {
    // Retrieve data from request body
    const {firstName, lastName, email, password} = req.body;
    
    console.log('Received data:', req.body);

    // Validate request body
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    usersDb.findOne({ email: email }, async (err, existingUser) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const newUser = { 
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: await bcrypt.hash(password, 10), // Hash the password
            adminTag: false,
            createdAt: new Date()
        };
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
    usersDb.findOne({ email: email }, async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({id: user._id, email: user.email}, process.env.VITE_JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });
    });
});

module.exports = router;