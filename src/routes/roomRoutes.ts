import express from 'express';
import Room from '../models/Room';
import Booking from '../models/Booking';
import { authenticate, isAdmin } from '../middleware/auth';

const router = express.Router();

// GET /api/rooms - Fetch all rooms
router.get('/', async (req, res) => {
  try {
    // If authenticated, return all rooms; otherwise only available ones
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const showAll = !!token; // If there's a token, show all rooms
    
    const query = showAll ? {} : { isAvailable: true };
    const rooms = await Room.find(query).sort({ price: 1 });
    
    res.json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/rooms/available - Fetch rooms available for specific date range (public)
router.get('/available', async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;

    // Validate query parameters
    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'checkIn and checkOut dates are required',
      });
    }

    const checkInDate = new Date(checkIn as string);
    const checkOutDate = new Date(checkOut as string);

    // Validate dates
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format',
      });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date',
      });
    }

    if (checkInDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past',
      });
    }

    // Find all rooms
    const allRooms = await Room.find({ isAvailable: true });

    // Find bookings that overlap with the requested date range
    const overlappingBookings = await Booking.find({
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate },
        },
      ],
    });

    // Get IDs of booked rooms
    const bookedRoomIds = overlappingBookings.map((booking) => booking.roomId);

    // Filter out booked rooms
    const availableRooms = allRooms.filter(
      (room) => !bookedRoomIds.includes(room.id)
    );

    res.json({
      success: true,
      count: availableRooms.length,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      data: availableRooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching available rooms',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/rooms/:id - Fetch single room by ID/slug (public)
router.get('/:id', async (req, res) => {
  try {
    // Try to find by MongoDB _id first, then by custom id (slug)
    let room = await Room.findById(req.params.id).catch(() => null);
    
    if (!room) {
      room = await Room.findOne({ id: req.params.id });
    }
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    res.json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching room',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/rooms - Create new room (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating room',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /api/rooms/:id - Update room (admin/staff)
router.put('/:id', authenticate, async (req, res) => {
  try {
    // Try to find by MongoDB _id first, then by custom id
    let room = await Room.findById(req.params.id);
    
    if (!room) {
      room = await Room.findOne({ id: req.params.id });
    }
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    // Update the room
    Object.assign(room, req.body);
    await room.save();

    res.json({
      success: true,
      message: 'Room updated successfully',
      data: room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating room',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DELETE /api/rooms/:id - Delete room (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ id: req.params.id });
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    res.json({
      success: true,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting room',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
