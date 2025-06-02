const jwt = require('jsonwebtoken');
const User = require('../models/User');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // Check for Bearer token
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = { verifyToken };