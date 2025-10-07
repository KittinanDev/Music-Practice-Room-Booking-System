const Booking = require("../models/Booking");

exports.validateBookingOverlap = async (roomId, date, start, end) => {
  const overlap = await Booking.findOne({
    room: roomId,
    date,
    status: { $ne: "cancelled" },
    $or: [
      { startTime: { $lt: end, $gte: start } },
      { endTime: { $gt: start, $lte: end } },
      { startTime: { $lte: start }, endTime: { $gte: end } },
    ],
  });
  return !!overlap;
};
