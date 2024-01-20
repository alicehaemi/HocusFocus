const jwt = require('jsonwebtoken');

function JWTAuthenticate(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWTOKEN);
        return decoded.id;
    } catch (error) {
        return null;
    }
}

module.exports = JWTAuthenticate;