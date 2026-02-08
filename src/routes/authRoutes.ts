import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  createUser,
  getAllUsers,
  updateUser,
} from '../controllers/authController';
import { authenticate, isAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/change-password', authenticate, changePassword);

// Admin only routes
router.post('/users', authenticate, isAdmin, createUser);
router.get('/users', authenticate, isAdmin, getAllUsers);
router.put('/users/:userId', authenticate, isAdmin, updateUser);

export default router;
