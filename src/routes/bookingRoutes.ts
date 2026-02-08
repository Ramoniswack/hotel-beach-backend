import express from 'express';
import Booking from '../models/Booking';
import Room from '../models/Room';

const router = express.Router();

// Check room availability
router.post('/check-availability', async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    // Check if room exists
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check for overlapping bookings
    const overlappingBookings = await Booking.find({
      roomId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkInDate: { $lte: new Date(checkOutDate) },
          checkOutDate: { $gte: new Date(checkInDate) },
        },
      ],
    });

    const isAvailable = overlappingBookings.length === 0;

    res.json({
      available: isAvailable,
      room: {
        id: room.id,
        title: room.title,
        price: room.price,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking availability', error });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, adults, children, guestInfo } = req.body;

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (checkIn >= checkOut) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    if (checkIn < new Date()) {
      return res.status(400).json({ message: 'Check-in date cannot be in the past' });
    }

    // Get room details
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check availability
    const overlappingBookings = await Booking.find({
      roomId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkInDate: { $lte: checkOut },
          checkOutDate: { $gte: checkIn },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ message: 'Room is not available for selected dates' });
    }

    // Calculate total price
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;

    // Create booking
    const booking = new Booking({
      roomId,
      roomTitle: room.title,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults,
      children,
      totalPrice,
      guestInfo,
      status: 'pending',
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error updating booking', error });
  }
});

// Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error });
  }
});

export default router;
