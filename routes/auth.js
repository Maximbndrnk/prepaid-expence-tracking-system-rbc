const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtTokens = require('../helpers/jwt-helper');

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


module.exports = router;