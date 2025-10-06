const Booking = require("../models/Booking");
const { validateBookingOverlap } = require("../utils/validateBooking");

const DEFAULT_ROOM_ID = process.env.DEFAULT_ROOM_ID;

// ✅ สร้างการจอง
exports.createBooking = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    const overlap = await validateBookingOverlap(DEFAULT_ROOM_ID, date, startTime, endTime);
    if (overlap)
      return res.status(400).json({ message: "ช่วงเวลานี้ถูกจองแล้ว" });

    const booking = await Booking.create({
      user: req.user._id,
      room: DEFAULT_ROOM_ID,
      date,
      startTime,
      endTime,
    });

    res.json({ message: "จองสำเร็จ", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ การจองของฉัน
exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
};

// ✅ การจองทั้งหมด (admin)
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user");
  res.json(bookings);
};

// ✅ ตรวจสอบเวลาว่าง
exports.checkAvailability = async (req, res) => {
  const { date, start, end } = req.query;
  const overlap = await validateBookingOverlap(DEFAULT_ROOM_ID, date, start, end);
  res.json({
    available: !overlap,
    message: overlap ? "ถูกจองแล้ว" : "ว่าง",
  });
};

// ✅ อัปเดตสถานะการจอง (admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: "ไม่พบข้อมูล" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
