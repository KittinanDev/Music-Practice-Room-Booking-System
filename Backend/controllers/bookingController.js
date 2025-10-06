const Booking = require("../models/Booking");
const Room = require("../models/Room");
const { validateBookingOverlap } = require("../utils/validateBooking");

// ✅ สร้างการจอง
exports.createBooking = async (req, res) => {
  const { room, date, startTime, endTime } = req.body;
  const user = req.user._id;

  // ตรวจสอบเวลาทับซ้อน
  const overlap = await validateBookingOverlap(room, date, startTime, endTime);
  if (overlap)
    return res.status(400).json({ message: "ช่วงเวลานี้ถูกจองแล้ว" });

  const booking = await Booking.create({ user, room, date, startTime, endTime });
  res.json(booking);
};

// ✅ ดูการจองทั้งหมด (admin)
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user room");
  res.json(bookings);
};

// ✅ ดูการจองของผู้ใช้
exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("room");
  res.json(bookings);
};

// ✅ ตรวจสอบเวลาว่างของห้อง
exports.checkAvailability = async (req, res) => {
  try {
    const { roomId, date, start, end } = req.query;

    if (!roomId || !date || !start || !end) {
      return res.status(400).json({ message: "กรุณาระบุ roomId, date, start, end" });
    }

    const bookings = await Booking.find({
      room: roomId,
      date,
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } } // ช่วงเวลาทับกัน
      ],
    });

    const available = bookings.length === 0;
    res.json({
      roomId,
      date,
      start,
      end,
      available,
      message: available ? "ห้องนี้ว่างในช่วงเวลาดังกล่าว" : "ห้องนี้ถูกจองแล้ว",
    });
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการตรวจสอบ" });
  }
};
