const crypto = require('crypto');

// Generate a 32-byte secret key
const secretKey = crypto.randomBytes(64).toString('hex');

console.log(secretKey);
