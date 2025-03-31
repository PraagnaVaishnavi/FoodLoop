import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactions.controller.js';  // Updated to ES module import

const router = express.Router();

router.post('/create', createTransaction);
router.get('/list', getTransactions);

export default router;  // Export as default
