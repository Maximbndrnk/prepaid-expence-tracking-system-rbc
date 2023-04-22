const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtTokens = require('../helpers/jwt-helper');
const environment = require('../environment');

const router = express.Router();

//http://localhost:5002/api/transactions/add
// LOGIN USER
router.post('/add', async (req, res) => {
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
        let user = users.rows[0];
        console.log(user);
        let tokens = jwtTokens(user);
        // return res.status(200).json('Success' );
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });

        res.json({
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            userName: user.user_name,
            userEmail: user.user_email,
        });
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
});


//DELETE TRANSACTION
router.delete('/delete', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'Refresh token deleted.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});


module.exports = router;