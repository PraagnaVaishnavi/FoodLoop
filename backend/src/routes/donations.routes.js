const express = require('express');
const { createDonation, getDonations } = require('../controllers/donations.controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/create', authMiddleware, createDonation);
router.get('/list', getDonations);
module.exports = router;