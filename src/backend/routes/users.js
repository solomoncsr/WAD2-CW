const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usersDb } = require('../db.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

// Grant or revoke admin access, only for super admin account
router.post('/admin', authMiddleware, (req, res) => {
    const superAdminTag = req.user.superAdminTag;
    const { userEmail } = req.body;

    console.log('Received data:', req.body);
    
    if (!superAdminTag) {
        return res.status(403).json({ error: 'Access denied' });
    }
    if (!userEmail) {
        return res.status(400).json({ error: 'User email is required' });
    }

    // Find user in database
    usersDb.findOne({ email: userEmail }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Toggle admin access
        user.adminTag = !user.adminTag;
        usersDb.update({ _id: user._id }, { $set: { adminTag: user.adminTag } }, {}, (err, numUpdated) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            return res.status(200).json({ message: `User ${user.adminTag ? 'granted' : 'revoked'} admin access successfully`, user });
        });
    });
});

// Get all users
router.get('/users', authMiddleware, (req, res) => {
    const adminTag = req.user.adminTag;
    
    if (!adminTag) {
        return res.status(403).json({ error: 'Access denied' });
    }

    // Get all users from the database
    usersDb.find({}, (err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        return res.status(200).json({ message: 'Users retrieved successfully', users });
    });
});

// Delete a user
router.post('/delete', authMiddleware, (req, res) => {
    const superAdminTag = req.user.superAdminTag;
    const { userEmail } = req.body;

    console.log('Received data:', req.body);
    
    if (!superAdminTag) {
        return res.status(403).json({ error: 'Access denied' });
    }
    if (!userEmail) {
        return res.status(400).json({ error: 'User email is required' });
    }

    usersDb.findOne({ email: userEmail }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete user from the database
        usersDb.remove({ _id: user._id }, {}, (err, numRemoved) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        });
    });
});

// Fetch user profile
router.get('/profile', authMiddleware, (req, res) => {
    // Retrieve user ID from request object
    const userId = req.user._id;

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

// Register new user
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
            superAdminTag: false,
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

// Login user
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

        return res.status(200).json({ message: 'Login successful', token}); // Exclude password from user data
    });
});

module.exports = router;