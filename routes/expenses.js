const express = require('express');
const controller = require('../controllers/expenses');
const router = express.Router();

//localhost:5002/api/expenses/get-records
router.get('/:id', controller.getById);
router.get('/get-records', controller.getRecords);
router.post('/', controller.addRecord);
router.patch('/', controller.updateRecord);
router.delete('/:id', controller.removeRecord);

module.exports = router;