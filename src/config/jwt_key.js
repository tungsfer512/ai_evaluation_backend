const crypto = require('crypto');
console.log('JWT_ACCESS_KEY=' + crypto.randomBytes(64).toString('hex'));
console.log('JWT_REFRESH_KEY=' + crypto.randomBytes(64).toString('hex'));
