import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
  category: string;
  subcategory?: string;
  amount: number;
  description: string;
  date: Date;
  paymentMethod: 'cash' | 'card' | 'bank-transfer' | 'check' | 'other';
  vendor?: string;
  receiptUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: mongoose.Types.ObjectId;
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        'utilities',
        'maintenance',
        'supplies',
        'food-beverage',
        'staff-salary',
        'marketing',
        'cleaning',
        'laundry',
        'technology',
        'insurance',
        'taxes',
        'other',
      ],
    },
    subcategory: { type: String },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['cash', 'card', 'bank-transfer', 'check', 'other'],
      default: 'cash',
    },
    vendor: { type: String },
    receiptUrl: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Index for faster queries
ExpenseSchema.index({ date: -1 });
ExpenseSchema.index({ category: 1 });
ExpenseSchema.index({ status: 1 });

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
