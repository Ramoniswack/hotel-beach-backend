import { Request, Response } from 'express';
import ContactSettings from '../models/ContactSettings';

// Get contact settings
export const getContactSettings = async (req: Request, res: Response) => {
  try {
    let settings = await ContactSettings.findOne();
    
    // If no settings exist, create default settings
    if (!settings) {
      settings = await ContactSettings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    console.error('Error fetching contact settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact settings',
      error: error.message,
    });
  }
};

// Update contact settings (Admin only)
export const updateContactSettings = async (req: Request, res: Response) => {
  try {
    const { phone, email, location, serviceHours, emergencyHotline } = req.body;

    let settings = await ContactSettings.findOne();

    if (!settings) {
      // Create new settings if none exist
      settings = await ContactSettings.create({
        phone,
        email,
        location,
        serviceHours,
        emergencyHotline,
      });
    } else {
      // Update existing settings
      settings.phone = phone || settings.phone;
      settings.email = email || settings.email;
      settings.location = location || settings.location;
      settings.serviceHours = serviceHours || settings.serviceHours;
      settings.emergencyHotline = emergencyHotline || settings.emergencyHotline;

      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: 'Contact settings updated successfully',
      data: settings,
    });
  } catch (error: any) {
    console.error('Error updating contact settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact settings',
      error: error.message,
    });
  }
};
