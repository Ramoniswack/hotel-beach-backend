import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../models/User';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blogController';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', authenticate, authorize([UserRole.ADMIN]), createPost);
router.put('/:id', authenticate, authorize([UserRole.ADMIN]), updatePost);
router.delete('/:id', authenticate, authorize([UserRole.ADMIN]), deletePost);

export default router;
