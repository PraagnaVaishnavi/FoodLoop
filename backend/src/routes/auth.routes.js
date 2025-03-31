import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';  // Updated to ES module import
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;  // Export as default
