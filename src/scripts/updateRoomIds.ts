import mongoose from 'mongoose';
import Room from '../models/Room';
import dotenv from 'dotenv';

dotenv.config();

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const updateRoomIds = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel');
    console.log('Connected to MongoDB');

    // Find all rooms with timestamp-based IDs (room-XXXXXXXXXX format)
    const rooms = await Room.find({ id: /^room-\d+$/ });
    
    console.log(`Found ${rooms.length} rooms with timestamp-based IDs`);

    for (const room of rooms) {
      const oldId = room.id;
      const newId = generateSlug(room.title);
      
      console.log(`Updating: "${room.title}"`);
      console.log(`  Old ID: ${oldId}`);
      console.log(`  New ID: ${newId}`);

      // Check if new ID already exists
      const existingRoom = await Room.findOne({ id: newId, _id: { $ne: room._id } });
      
      if (existingRoom) {
        console.log(`  ⚠️  Skipped - ID "${newId}" already exists`);
        continue;
      }

      // Update the room ID
      room.id = newId;
      await room.save();
      
      console.log(`  ✓ Updated successfully\n`);
    }

    console.log('All room IDs updated!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating room IDs:', error);
    process.exit(1);
  }
};

updateRoomIds();
