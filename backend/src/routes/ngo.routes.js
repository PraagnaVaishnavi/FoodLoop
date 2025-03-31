const express = require('express');
const { claimDonation } = require('../controllers/ngo.controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/claim/:id', authMiddleware, claimDonation);
module.exports = router;