const Booking = require("../models/Booking");
const { validateBookingOverlap } = require("../utils/validateBooking");

// ✅ Create booking
exports.createBooking = async (req, res) => {
  try {
    const { room, date, startTime, endTime } = req.body;
    const overlap = await validateBookingOverlap(room, date, startTime, endTime);
    if (overlap) return res.status(400).json({ message: "ช่วงเวลานี้ถูกจองแล้ว" });

    const booking = await Booking.create({
      user: req.user._id,
      room,
      date,
      startTime,
      endTime,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ My Bookings
exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("room");
  res.json(bookings);
};

// ✅ All bookings (admin)
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user room");
  res.json(bookings);
};

// ✅ Availability Check
exports.checkAvailability = async (req, res) => {
  try {
    const { roomId, date, start, end } = req.query;
    const overlap = await validateBookingOverlap(roomId, date, start, end);
    res.json({
      available: !overlap,
      message: overlap ? "ห้องนี้ถูกจองแล้ว" : "ห้องนี้ว่างในช่วงเวลาดังกล่าว",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(booking);
};
