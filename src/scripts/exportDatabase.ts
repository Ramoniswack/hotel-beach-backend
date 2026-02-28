import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import models
import User from '../models/User';
import Room from '../models/Room';
import Booking from '../models/Booking';
import Theme from '../models/Theme';
import BlogPost from '../models/BlogPost';
import ContactSettings from '../models/ContactSettings';
import Expense from '../models/Expense';

const exportDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✓ Connected to MongoDB');

    const dumpDir = path.join(__dirname, '../../dump');
    
    // Create dump directory if it doesn't exist
    if (!fs.existsSync(dumpDir)) {
      fs.mkdirSync(dumpDir, { recursive: true });
    }

    console.log('\nExporting collections...');

    // Export Users
    const users = await User.find({}).lean();
    fs.writeFileSync(
      path.join(dumpDir, 'users.json'),
      JSON.stringify(users, null, 2)
    );
    console.log(`✓ Exported ${users.length} users`);

    // Export Rooms
    const rooms = await Room.find({}).lean();
    fs.writeFileSync(
      path.join(dumpDir, 'rooms.json'),
      JSON.stringify(rooms, null, 2)
    );
    console.log(`✓ Exported ${rooms.length} rooms`);

    // Export Bookings
    const bookings = await Booking.find({}).lean();
    fs.writeFileSync(
      path.join(dumpDir, 'bookings.json'),
      JSON.stringify(bookings, null, 2)
    );
    console.log(`✓ Exported ${bookings.length} bookings`);

    // Export Themes
    const themes = await Theme.find({}).lean();
    fs.writeFileSync(
      path.join(dumpDir, 'themes.json'),
      JSON.stringify(themes, null, 2)
    );
    console.log(`✓ Exported ${themes.length} theme pages`);

    // Export Blog Posts
    const blogPosts = await BlogPost.find({}).lean();
    fs.writeFileSync(
      path.join(dumpDir, 'blogposts.json'),
      JSON.stringify(blogPosts, null, 2)
    );
    console.log(`✓ Exported ${blogPosts.length} blog posts`);

    // Export Contact Settings
    const contactSettings = await ContactSettings.find({}).lean();
    fs.writeFileSync(
      path.join(dumpDir, 'contactsettings.json'),
      JSON.stringify(contactSettings, null, 2)
    );
    console.log(`✓ Exported ${contactSettings.length} contact settings`);

    // Export Expenses
    const expenses = await Expense.find({}).lean();
    fs.writeFileSync(
      path.join(dumpDir, 'expenses.json'),
      JSON.stringify(expenses, null, 2)
    );
    console.log(`✓ Exported ${expenses.length} expenses`);

    // Create a metadata file
    const metadata = {
      exportDate: new Date().toISOString(),
      database: process.env.MONGODB_URI?.split('@')[1]?.split('/')[0] || 'unknown',
      collections: {
        users: users.length,
        rooms: rooms.length,
        bookings: bookings.length,
        themes: themes.length,
        blogPosts: blogPosts.length,
        contactSettings: contactSettings.length,
        expenses: expenses.length,
      },
      totalDocuments: users.length + rooms.length + bookings.length + themes.length + blogPosts.length + contactSettings.length + expenses.length,
    };

    fs.writeFileSync(
      path.join(dumpDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );
    console.log('\n✓ Export completed successfully!');
    console.log(`\nExport location: ${dumpDir}`);
    console.log(`Total documents exported: ${metadata.totalDocuments}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error exporting database:', error);
    process.exit(1);
  }
};

exportDatabase();
