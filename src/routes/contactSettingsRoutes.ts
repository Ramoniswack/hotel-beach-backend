import express from 'express';
import { getContactSettings, updateContactSettings } from '../controllers/contactSettingsController';
import { authenticate, isAdmin } from '../middleware/auth';

const router = express.Router();

// Public route - anyone can view contact settings
router.get('/', getContactSettings);

// Admin only route - update contact settings
router.put('/', authenticate, isAdmin, updateContactSettings);

export default router;
