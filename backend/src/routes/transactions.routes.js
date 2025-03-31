const express = require('express');
const { createTransaction, getTransactions } = require('../controllers/transactions.controller');
const router = express.Router();
router.post('/create', createTransaction);
router.get('/list', getTransactions);
module.exports = router;