
const jwt = require('jsonwebtoken');

// Function to verify the JWT token
const verifyJWT = (req, res, next) => {
    // Get the token from the request headers
    const authHeader = req.headers.authorization;
    // console.log("authHeader",authHeader)
    // Check if the token exists
    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization header provided' });
    }

    // Split the token from the Bearer
    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Token Not Found' });
    }

    try {
        // Verify the token using the secret key
        const secretKey =process.env.SECRET_KEY
        const decoded = jwt.verify(token, secretKey);
        // console.log("decoded",decoded)
        // Attach the decoded token to the request object
        req.user = decoded;

        // Call the next middleware
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = verifyJWT;
