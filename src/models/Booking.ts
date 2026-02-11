import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  roomId: string;
  roomTitle: string;
  checkInDate: Date;
  checkOutDate: Date;
  adults: number;
  children: number;
  totalPrice: number;
  guestInfo: {
    name: string;
    email: string;
    phone: string;
  };
  additionalServices?: Array<{
    name: string;
    price: number;
    quantity?: number;
  }>;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  invoiceNumber?: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    roomId: { type: String, required: true },
    roomTitle: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    adults: { type: Number, required: true, min: 1, max: 4 },
    children: { type: Number, required: true, min: 0, max: 2 },
    totalPrice: { type: Number, required: true },
    guestInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    additionalServices: [{
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
    }],
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    invoiceNumber: { type: String },
    specialRequests: { type: String },
  },
  { timestamps: true }
);

// Generate invoice number before saving
BookingSchema.pre('save', async function () {
  if (!this.invoiceNumber) {
    this.invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
