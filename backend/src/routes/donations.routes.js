import express from 'express';
import { createDonation, getDonations } from '../controllers/donations.controller.js';  // Updated to ES module import
import { authMiddleware } from '../middleware/authMiddleware.js';  // Updated to ES module import

const router = express.Router();

router.post('/create', authMiddleware, createDonation);
router.get('/list', getDonations);

export default router;  // Export as
