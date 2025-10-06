const Booking = require("../models/Booking");

exports.validateBookingOverlap = async (room, date, startTime, endTime) => {
  const overlap = await Booking.findOne({
    room,
    date,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
    ],
  });
  return !!overlap;
};
