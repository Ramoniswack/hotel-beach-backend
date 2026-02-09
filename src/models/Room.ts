import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  heroImage: string;
  description: string[];
  specs: {
    bed: string;
    capacity: string;
    size: string;
    view: string;
  };
  gallery: string[];
  amenities: string[];
  services: string[];
  isAvailable: boolean;
  roomNumber?: string;
  floor?: number;
  cleaningStatus: 'clean' | 'dirty' | 'in-progress';
  occupancyStatus: 'vacant' | 'occupied' | 'reserved';
  seasonalPricing?: {
    season: string;
    startDate: Date;
    endDate: Date;
    price: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    price: { type: Number, required: true },
    heroImage: { type: String, required: true },
    description: [{ type: String }],
    specs: {
      bed: { type: String, required: true },
      capacity: { type: String, required: true },
      size: { type: String, required: true },
      view: { type: String, required: true },
    },
    gallery: [{ type: String }],
    amenities: [{ type: String }],
    services: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    roomNumber: { type: String },
    floor: { type: Number },
    cleaningStatus: {
      type: String,
      enum: ['clean', 'dirty', 'in-progress'],
      default: 'clean',
    },
    occupancyStatus: {
      type: String,
      enum: ['vacant', 'occupied', 'reserved'],
      default: 'vacant',
    },
    seasonalPricing: [{
      season: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      price: { type: Number },
    }],
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>('Room', RoomSchema);
