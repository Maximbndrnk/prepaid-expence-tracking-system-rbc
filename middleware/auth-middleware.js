const jwt = require('jsonwebtoken');
const environment = require('../environment')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Bearer token
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ error: 'Null token' });
    }

    jwt.verify(
        token,
        environment.ACCESS_TOKEN_SECRET,
        (error, user) => {
            if (error) {
                return res.status(403).json({ error: error.message });
            }

            req.user = user;
            next();
        }
    );


}

module.exports = authenticateToken;