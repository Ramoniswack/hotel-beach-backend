import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';
import { upload } from '../config/cloudinary';
import { uploadSingle, uploadMultiple, deleteImage } from '../controllers/uploadController';

const router = express.Router();

// Single image upload
router.post(
  '/single',
  authenticate,
  authorize([UserRole.ADMIN, UserRole.STAFF]),
  upload.single('image'),
  uploadSingle
);

// Multiple images upload
router.post(
  '/multiple',
  authenticate,
  authorize([UserRole.ADMIN, UserRole.STAFF]),
  upload.array('images', 10),
  uploadMultiple
);

// Delete image
router.delete(
  '/',
  authenticate,
  authorize([UserRole.ADMIN, UserRole.STAFF]),
  deleteImage
);

export default router;
