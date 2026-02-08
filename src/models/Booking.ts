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
  status: 'pending' | 'confirmed' | 'cancelled';
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
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
