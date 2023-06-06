const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtTokens = require('../helpers/jwt-helper');
const environment = require('../environment');
const url = require('url');

const router = express.Router();

//http://localhost:5002/api/transactions/add

const FIELD_MAPPER = {
    userName: 'submitted_user',
    currency: 'currency',
    amount: 'amount',
    closedDate: 'submitted_date_time',
    type: 't_type',
    category: 'category',
    subcategory: 'subcategory',
    dateFrom: 'record_date',
    dateTo: 'record_date',
    deleted: 'deleted',
}

// GET TRANSACTIONS
router.get('/', async (req, res) => {
// router.get('/', authenticateToken, async (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    console.log('parsedUrl:', parsedUrl);
    let {
        pageIndex,
        pageSize,
        sortBy,
    } = parsedUrl.query;

    if (!pageIndex) {
        pageIndex = 0;
    }

    if (!pageSize) {
        pageSize = 10;
    }
    // const values = [offset, pageSize];
    // let paramCount = 3;

    let whereQuery = 'WHERE ';
    let whereQueryLen = whereQuery.length;


    if (parsedUrl.query.userName) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `submitted_user = '${parsedUrl.query.userName}'`;
    }
    if (parsedUrl.query.amount) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `amount = '${parsedUrl.query.amount}'`;
    }
    if (parsedUrl.query.currency) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `currency = '${parsedUrl.query.currency}'`;
    }
    if (parsedUrl.query.closedDate) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `submitted_date_time = '${parsedUrl.query.closedDate}'`;
    }
    if (parsedUrl.query.type) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `t_type = '${parsedUrl.query.type}'`;
    }
    if (parsedUrl.query.category) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `category = '${parsedUrl.query.category}'`;
    }
    if (parsedUrl.query.subcategory) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `subcategory = '${parsedUrl.query.subcategory}'`;
    }
    if (parsedUrl.query.dateFrom) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `record_date >= '${parsedUrl.query.dateFrom}'`;
    }
    if (parsedUrl.query.dateTo) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `record_date <= '${parsedUrl.query.dateTo}'`;
    }
    if (parsedUrl.query.deleted) {
        whereQuery += (whereQuery.length > whereQueryLen ? ` AND ` : ``)
            + `deleted = ${parsedUrl.query.deleted}`;
    }

    let q = `SELECT * FROM transactions 
             ${whereQuery.length > whereQueryLen ? whereQuery : ''} 
             ORDER BY ${sortBy} ASC 
             OFFSET ${pageIndex} 
             LIMIT ${pageSize}`;
    const values = [];


    console.log('query', q);
    try {
        // console.log(req.cookies);
        const transactions = await pool.query(q, values);
        res.json({transactions: transactions.rows});
    } catch (e) {
        res.status(500).json({error: e.message});
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