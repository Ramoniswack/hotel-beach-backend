import express from 'express';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { UserRole } from '../models/User';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  addComment,
  getComments,
  likeComment,
  addReply,
  deleteComment,
  deleteReply
} from '../controllers/blogController';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', authenticate, authorize([UserRole.ADMIN]), createPost);
router.put('/:id', authenticate, authorize([UserRole.ADMIN]), updatePost);
router.delete('/:id', authenticate, authorize([UserRole.ADMIN]), deletePost);

// Comment routes (public with optional auth)
router.post('/:slug/comments', optionalAuth, addComment);
router.get('/:slug/comments', getComments);
router.post('/:slug/comments/:commentId/like', authenticate, likeComment);
router.post('/:slug/comments/:commentId/reply', optionalAuth, addReply);

// Admin comment management routes
router.delete('/:id/comments/:commentId', authenticate, authorize([UserRole.ADMIN, UserRole.STAFF]), deleteComment);
router.delete('/:id/comments/:commentId/replies/:replyId', authenticate, authorize([UserRole.ADMIN, UserRole.STAFF]), deleteReply);

export default router;
