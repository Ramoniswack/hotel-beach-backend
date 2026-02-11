import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import PageContent from '../models/Theme';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const bookingSettingsData = {
  pageName: 'booking-settings',
  sections: [
    {
      sectionId: 'check-times',
      sectionName: 'Check-in/Check-out Times',
      title: 'from 11:00 am',
      subtitle: 'until 10:00 am',
      isVisible: true,
      order: 1
    },
    {
      sectionId: 'policies',
      sectionName: 'Booking Policies',
      items: [
        {
          title: 'Confirmations',
          content: 'Confirmations that are received by email or fax will be processed and confirmed by our reservation office within 24 hours. A reservation is considered provisional until the hotel confirms acceptance of the reservation.'
        },
        {
          title: 'Cancellations',
          content: 'Cancellations and changes must be done in writing (e.g. email or fax). A confirmed reservation can be cancelled or changed until 3 full days prior scheduled arrival date. In case of non-arrival on the day (no-show) or cancellation less than 3 full days prior to arrival, the amount of the first night will be charged.'
        }
      ],
      isVisible: true,
      order: 2
    },
    {
      sectionId: 'sidebar-contact',
      sectionName: 'Sidebar Contact Info',
      title: 'Questions About Booking?',
      items: [
        { label: 'Tel', value: '+41 (0)54 2344 00' },
        { label: 'Fax', value: '+41 (0)542344 99' },
        { label: 'Email', value: 'reservations@hoteliercity.com' }
      ],
      isVisible: true,
      order: 3
    },
    {
      sectionId: 'sidebar-address',
      sectionName: 'Sidebar Address',
      title: 'Our Address',
      items: [
        { label: 'Hotel Name', value: 'Hotel Beach' },
        { label: 'Address Line 1', value: '45 Santorini Beach' },
        { label: 'Address Line 2', value: 'Santorini 847 00' },
        { label: 'Tel', value: '+41 (0)54 2344 00' },
        { label: 'Fax', value: '+41 (0)542344 99' },
        { label: 'Email', value: 'reservations@hotelbeach.com' }
      ],
      isVisible: true,
      order: 4
    }
  ],
  metadata: {
    pageTitle: 'Booking Confirmation Settings',
    pageDescription: 'Manage booking confirmation page content'
  }
};

async function seedBookingSettings() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if booking-settings already exists
    const existing = await PageContent.findOne({ pageName: 'booking-settings' });
    
    if (existing) {
      console.log('Booking settings already exist. Updating...');
      await PageContent.findOneAndUpdate(
        { pageName: 'booking-settings' },
        bookingSettingsData,
        { new: true }
      );
      console.log('Booking settings updated successfully!');
    } else {
      console.log('Creating new booking settings...');
      await PageContent.create(bookingSettingsData);
      console.log('Booking settings created successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding booking settings:', error);
    process.exit(1);
  }
}

seedBookingSettings();
