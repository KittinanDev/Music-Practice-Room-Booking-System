const Booking = require("../models/Booking");

exports.validateBookingOverlap = async (roomId, date, start, end) => {
  const overlap = await Booking.find({
    room: roomId,
    date,
    $or: [
      { startTime: { $lt: end }, endTime: { $gt: start } }
    ],
  });
  return overlap.length > 0;
};
