const express = require("express");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  checkAvailability,
  updateBookingStatus,
  getBookingCount,
} = require("../controllers/bookingController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getUserBookings);
router.get("/all", protect, adminOnly, getAllBookings);
router.get("/availability", protect, checkAvailability);
router.get("/count", protect, adminOnly, getBookingCount);
router.patch("/:id", protect, adminOnly, updateBookingStatus);

module.exports = router;
