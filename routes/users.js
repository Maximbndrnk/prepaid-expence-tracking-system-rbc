const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/index');

const router = express.Router();

// GET USERS
router.get('/', async (req, res) => {
    try {
        // console.log(req.cookies);
        const users = await pool.query('SELECT * FROM users;');
        res.json({ users: users.rows });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// CREATE USER
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(
            `INSERT INTO users (user_name, user_email, user_password) 
             VALUES ($1, $2, $3) RETURNING *`,
            [
                req.body.name,
                req.body.email,
                hashedPassword
            ]
        );
        res.json({ users: newUser.rows[0] });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = router;