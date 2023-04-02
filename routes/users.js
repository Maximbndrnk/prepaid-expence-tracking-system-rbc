const express = require('express');
const router = express.Router();
const pool = require('../db/index');

// GET USERS
router.get('/', async (req, res) => {
    try {
        // console.log(req.cookies);
        const users = await pool.query('SELECT * FROM users;');
        res.json({users : users.rows});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router;