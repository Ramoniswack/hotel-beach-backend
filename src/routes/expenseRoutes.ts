import express, { RequestHandler } from 'express';
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
} from '../controllers/expenseController';
import { authenticate, isAdmin } from '../middleware/auth';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

// GET /api/expenses/stats/summary - Get expense statistics
router.get('/stats/summary', getExpenseStats as RequestHandler);

// GET /api/expenses - Get all expenses
router.get('/', getAllExpenses as RequestHandler);

// GET /api/expenses/:id - Get single expense
router.get('/:id', getExpenseById as RequestHandler);

// POST /api/expenses - Create new expense
router.post('/', createExpense as RequestHandler);

// PUT /api/expenses/:id - Update expense
router.put('/:id', updateExpense as RequestHandler);

// DELETE /api/expenses/:id - Delete expense
router.delete('/:id', deleteExpense as RequestHandler);

export default router;
