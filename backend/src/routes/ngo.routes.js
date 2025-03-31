import express from 'express';
import { claimDonation } from '../controllers/ngo.controller.js';  // Updated to ES module import
import { authMiddleware } from '../middleware/authMiddleware.js';  // Updated to ES module import

const router = express.Router();

router.post('/claim/:id', authMiddleware, claimDonation);

export default router;  // Export as default
