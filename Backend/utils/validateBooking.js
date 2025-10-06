const Booking = require("../models/Booking");

exports.validateBookingOverlap = async (roomId, date, start, end) => {
  const existing = await Booking.find({
    room: roomId,
    date: date,
    $or: [
      { startTime: { $lt: end }, endTime: { $gt: start } } // ถ้ามีช่วงเวลาทับกัน
    ],
  });
  return existing.length > 0;
};
