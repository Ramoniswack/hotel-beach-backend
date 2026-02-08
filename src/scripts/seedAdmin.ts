import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, { UserRole } from '../models/User';

dotenv.config();

const createAdminUser = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@hotel.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      mongoose.connection.close();
      return;
    }

    // Create admin user
    const admin = new User({
      email: 'admin@hotel.com',
      password: 'admin123',
      name: 'Admin User',
      role: UserRole.ADMIN,
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@hotel.com');
    console.log('Password: admin123');
    console.log('⚠️  Please change the password after first login!');

    // Create staff user
    const staff = new User({
      email: 'staff@hotel.com',
      password: 'staff123',
      name: 'Staff User',
      role: UserRole.STAFF,
    });

    await staff.save();
    console.log('\nStaff user created successfully');
    console.log('Email: staff@hotel.com');
    console.log('Password: staff123');

    // Create guest user
    const guest = new User({
      email: 'guest@hotel.com',
      password: 'guest123',
      name: 'Guest User',
      role: UserRole.GUEST,
    });

    await guest.save();
    console.log('\nGuest user created successfully');
    console.log('Email: guest@hotel.com');
    console.log('Password: guest123');

    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error creating users:', error);
    process.exit(1);
  }
};

createAdminUser();
