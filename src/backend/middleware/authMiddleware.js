const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Remove "Bearer " prefix if present
    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        jwt.verify(actualToken, process.env.VITE_JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err); // Log the error for debugging
                return res.status(401).json({ error: 'Failed to authenticate token' });
            }

            // Save user info from token to request object for further use
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('JWT Error:', error); // Log the error for debugging
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;