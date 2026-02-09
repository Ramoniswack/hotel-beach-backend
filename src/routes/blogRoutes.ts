import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
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
router.post('/', authenticate, authorize(['admin']), createPost);
router.put('/:id', authenticate, authorize(['admin']), updatePost);
router.delete('/:id', authenticate, authorize(['admin']), deletePost);

export default router;
