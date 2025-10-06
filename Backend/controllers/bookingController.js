const Booking = require("../models/Booking");
const { validateBookingOverlap } = require("../utils/validateBooking");

// ✅ ดึงจาก .env โดยตรง
const DEFAULT_ROOM_ID = process.env.DEFAULT_ROOM_ID;

exports.createBooking = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const room = DEFAULT_ROOM_ID;

    const overlap = await validateBookingOverlap(room, date, startTime, endTime);
    if (overlap) {
      return res.status(400).json({ message: "ช่วงเวลานี้ถูกจองแล้ว" });
    }

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
  const bookings = await Booking.find({ user: req.user._id })
    .populate("room")
    .sort({ date: -1, startTime: -1 });
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
    const { date, start, end } = req.query;
    if (!date || !start || !end) {
      return res.status(400).json({ message: "ข้อมูลไม่ครบ" });
    }

    const room = DEFAULT_ROOM_ID;
    const overlap = await validateBookingOverlap(room, date, start, end);
    res.json({
      available: !overlap,
      message: overlap ? "ถูกจองแล้ว" : "ว่าง",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate("user room");

  res.json(booking);
};

