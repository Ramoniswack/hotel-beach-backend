import mongoose, { Document, Schema } from 'mongoose';

export interface IContactSettings extends Document {
  phone: string;
  email: string;
  location: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  serviceHours: {
    frontDesk: string;
    roomService: string;
    concierge: string;
    spa: string;
    restaurant: string;
  };
  emergencyHotline: string;
  updatedAt: Date;
}

const ContactSettingsSchema = new Schema<IContactSettings>(
  {
    phone: {
      type: String,
      required: true,
      default: '+30 228 601 2345',
    },
    email: {
      type: String,
      required: true,
      default: 'concierge@hotelbeach.com',
    },
    location: {
      address: {
        type: String,
        required: true,
        default: 'Perissa Beach',
      },
      city: {
        type: String,
        required: true,
        default: 'Santorini',
      },
      country: {
        type: String,
        required: true,
        default: 'Greece',
      },
      postalCode: {
        type: String,
        required: true,
        default: '84703',
      },
    },
    serviceHours: {
      frontDesk: {
        type: String,
        required: true,
        default: '24/7',
      },
      roomService: {
        type: String,
        required: true,
        default: '24/7',
      },
      concierge: {
        type: String,
        required: true,
        default: '7am - 11pm',
      },
      spa: {
        type: String,
        required: true,
        default: '9am - 8pm',
      },
      restaurant: {
        type: String,
        required: true,
        default: '7am - 10pm',
      },
    },
    emergencyHotline: {
      type: String,
      required: true,
      default: '+30 228 601 2345',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IContactSettings>('ContactSettings', ContactSettingsSchema);
