const jwt = require('jsonwebtoken');

function jwtTokens({ user_id, user_name, user_email }) {
    const user = { user_id, user_name, user_email };
    const accessToken = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET || 'w2eerwe',
        { expiresIn: '20s' }
    );
    const refreshToken = jwt.sign(
        user,
        process.env.REFRESH_TOKEN_SECRET || 'werwe',
        { expiresIn: '5m' }
    );
    return { refreshToken, accessToken };
}

module.exports = jwtTokens;