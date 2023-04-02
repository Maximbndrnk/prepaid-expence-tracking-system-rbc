const jwt = require('jsonwebtoken');
const environment =require('../environment')

function jwtTokens({ user_id, user_name, user_email }) {
    const user = { user_id, user_name, user_email };
    const accessToken = jwt.sign(
        user,
        environment.ACCESS_TOKEN_SECRET,
        { expiresIn: '20s' }
    );
    const refreshToken = jwt.sign(
        user,
        environment.REFRESH_TOKEN_SECRET,
        { expiresIn: '5m' }
    );
    return { refreshToken, accessToken };
}

module.exports = jwtTokens;