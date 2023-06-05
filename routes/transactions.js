const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtTokens = require('../helpers/jwt-helper');
const environment = require('../environment');

const router = express.Router();

//http://localhost:5002/api/transactions/add

// GET TRANSACTIONS
router.get('/', async (req, res) => {
// router.get('/', authenticateToken, async (req, res) => {
    const {
        pageIndex,
        pageSize,
    } = req.body;
    try {
        // console.log(req.cookies);
        const transactions = await pool.query('SELECT * FROM transactions;');
        res.json({ transactions: transactions.rows });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ADD TRANSACTION
router.post('/', async (req, res) => {
    console.log('req', req.body);
    try {
        const {
            recordDate,
            tDescription,
            tType,
            category,
            subcategory,
            direction,
            amount,
            currency,
            submittedDateTime,
            submittedUser,
            deleted,
            parentRecordId
        } = req.body;

        const newTransaction = await pool.query(
            `INSERT INTO transactions (record_date, t_description, t_type, category, subcategory,
                direction, amount, currency, submitted_date_time, submitted_user, deleted, parent_record_id) 
             VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [
                recordDate,
                tDescription,
                tType,
                category,
                subcategory,
                direction,
                amount,
                currency,
                submittedDateTime,
                submittedUser,
                deleted,
                parentRecordId
            ]
        );

        res.status(200).json({
            status: 'Success',
        });
    } catch (e) {
        res.status(401).json({error: e.message});
    }
});


//DELETE TRANSACTION
router.delete('/delete', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({message: 'Refresh token deleted.'});
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});


module.exports = router;