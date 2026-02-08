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
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>('Room', RoomSchema);
