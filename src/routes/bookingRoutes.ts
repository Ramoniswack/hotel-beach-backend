import express from 'express';
import Booking from '../models/Booking';
import Room from '../models/Room';

const router = express.Router();

// POST /api/bookings/check-availability - Check room availability
router.post('/check-availability', async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    // Validate required fields
    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'roomId, checkInDate, and checkOutDate are required',
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Validate dates
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format',
      });
    }

    if (checkIn >= checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date',
      });
    }

    if (checkIn < new Date(new Date().setHours(0, 0, 0, 0))) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past',
      });
    }

    // Check if room exists
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    if (!room.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available',
      });
    }

    // Check for overlapping bookings
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

    const isAvailable = overlappingBookings.length === 0;

    // Calculate nights and total price
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;

    res.json({
      success: true,
      available: isAvailable,
      room: {
        id: room.id,
        title: room.title,
        price: room.price,
      },
      nights,
      totalPrice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking availability',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/bookings - Create new booking with robust validation
router.post('/', async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, adults, children, guestInfo } = req.body;

    // Validate required fields
    if (!roomId || !checkInDate || !checkOutDate || !adults || !guestInfo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: roomId, checkInDate, checkOutDate, adults, guestInfo',
      });
    }

    // Validate guest info
    if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) {
      return res.status(400).json({
        success: false,
        message: 'Guest info must include name, email, and phone',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestInfo.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Parse and validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format',
      });
    }

    // Validate date logic
    if (checkIn >= checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date',
      });
    }

    // No past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkIn < today) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past',
      });
    }

    // Validate adults and children
    const adultsNum = Number(adults);
    const childrenNum = Number(children) || 0;

    if (adultsNum < 1 || adultsNum > 4) {
      return res.status(400).json({
        success: false,
        message: 'Adults must be between 1 and 4',
      });
    }

    if (childrenNum < 0 || childrenNum > 2) {
      return res.status(400).json({
        success: false,
        message: 'Children must be between 0 and 2',
      });
    }

    // Get room details
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    if (!room.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available for booking',
      });
    }

    // RE-CHECK AVAILABILITY at the moment of booking to prevent double-booking
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
      return res.status(400).json({
        success: false,
        message: 'Room is not available for the selected dates. Please choose different dates.',
      });
    }

    // Calculate total price based on nightly rate
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;

    // Create booking
    const booking = new Booking({
      roomId,
      roomTitle: room.title,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: adultsNum,
      children: childrenNum,
      totalPrice,
      guestInfo: {
        name: guestInfo.name.trim(),
        email: guestInfo.email.toLowerCase().trim(),
        phone: guestInfo.phone.trim(),
      },
      status: 'pending',
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
      summary: {
        roomTitle: room.title,
        nights,
        pricePerNight: room.price,
        totalPrice,
        checkIn: checkIn.toISOString().split('T')[0],
        checkOut: checkOut.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating booking',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/bookings - Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/bookings/user/:email - Get bookings by guest email
router.get('/user/:email', async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    const bookings = await Booking.find({
      'guestInfo.email': email,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      email,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user bookings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PATCH /api/bookings/:id/status - Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: pending, confirmed, or cancelled',
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating booking status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DELETE /api/bookings/:id - Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
