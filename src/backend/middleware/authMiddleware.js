const jwt = require('jsonwebtoken');
const { usersDb } = require('../db.js');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Remove "Bearer " prefix if present
    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        const decoded = jwt.verify(actualToken, process.env.VITE_JWT_SECRET);
        usersDb.findOne({ _id: decoded.id }, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ error: 'Unauthorised' });
            }
            req.user = user; // Attach the user to the request object
            next(); // Proceed to the next middleware or route handler
        });
    } catch (error) {
        console.error('JWT Error:', error); // Log the error for debugging
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;