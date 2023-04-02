const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtTokens = require('../helpers/jwt-helper');
const environment = require('../environment');

const router = express.Router();

//http://localhost:5002/api/auth/login
// LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [ email ]
        );
        if (!users.rows.length) {
            res.status(401).json({ error: 'Email is incorrect' })
        }

        const validPassword = await bcrypt.compare(password, users.rows[0].user_password);
        if (!validPassword) {
            res.status(401).json({ error: 'Password is incorrect' })
        }

        let tokens = jwtTokens(users.rows[0]);
        // return res.status(200).json('Success' );
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });

        res.json(tokens);
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
});

//REFRESH TOKEN
router.get('/refreshToken', (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        console.log(refreshToken);
        if (refreshToken === null) return res.sendStatus(401);

        jwt.verify(refreshToken, environment.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let tokens = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, {
                ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
                httpOnly: true,
                sameSite: 'none',
                secure: true
            });
            return res.json(tokens);
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//DELETE TOKEN
router.delete('/refreshToken', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'Refresh token deleted.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});


module.exports = router;