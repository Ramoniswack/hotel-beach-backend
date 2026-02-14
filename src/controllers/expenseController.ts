import { Response } from 'express';
import Expense from '../models/Expense';
import { AuthRequest } from '../middleware/auth';

// GET /api/expenses - Get all expenses with filters
export const getAllExpenses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { category, status, startDate, endDate } = req.query;
    
    const query: any = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate as string);
      if (endDate) query.date.$lte = new Date(endDate as string);
    }

    const expenses = await Expense.find(query)
      .populate('createdBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ date: -1 });

    // Calculate totals
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const byCategory = expenses.reduce((acc: any, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    res.json({
      success: true,
      count: expenses.length,
      total,
      byCategory,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// GET /api/expenses/:id - Get single expense
export const getExpenseById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('approvedBy', 'name email');

    if (!expense) {
      res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
      return;
    }

    res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expense',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// POST /api/expenses - Create new expense
export const createExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('=== Create Expense Request ===');
    console.log('User:', req.user);
    console.log('Body:', req.body);

    if (!req.user?.userId && !req.user?.id) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const expenseData = {
      ...req.body,
      createdBy: req.user?.userId || req.user?.id,
    };

    console.log('Creating expense with data:', expenseData);

    const expense = new Expense(expenseData);
    await expense.save();

    console.log('Expense created:', expense._id);

    const populatedExpense = await Expense.findById(expense._id)
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: populatedExpense,
    });
  } catch (error) {
    console.error('=== Create Expense Error ===');
    console.error('Error:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating expense',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined,
    });
  }
};

// PUT /api/expenses/:id - Update expense
export const updateExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
      return;
    }

    // If approving/rejecting, add approvedBy
    if (req.body.status && req.body.status !== 'pending') {
      req.body.approvedBy = req.user?.userId || req.user?.id;
    }

    Object.assign(expense, req.body);
    await expense.save();

    const updatedExpense = await Expense.findById(expense._id)
      .populate('createdBy', 'name email')
      .populate('approvedBy', 'name email');

    res.json({
      success: true,
      message: 'Expense updated successfully',
      data: updatedExpense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating expense',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// DELETE /api/expenses/:id - Delete expense
export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting expense',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// GET /api/expenses/stats/summary - Get expense statistics
export const getExpenseStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    
    const query: any = {};
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate as string);
      if (endDate) query.date.$lte = new Date(endDate as string);
    }

    const expenses = await Expense.find(query);

    const stats = {
      total: expenses.reduce((sum, exp) => sum + exp.amount, 0),
      count: expenses.length,
      byCategory: expenses.reduce((acc: any, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {}),
      byStatus: expenses.reduce((acc: any, exp) => {
        acc[exp.status] = (acc[exp.status] || 0) + 1;
        return acc;
      }, {}),
      byPaymentMethod: expenses.reduce((acc: any, exp) => {
        acc[exp.paymentMethod] = (acc[exp.paymentMethod] || 0) + exp.amount;
        return acc;
      }, {}),
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expense statistics',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
