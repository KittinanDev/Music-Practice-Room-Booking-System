const express = require("express");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  checkAvailability,
  cancelBooking,
  updateBookingStatus,
  getStats,
} = require("../controllers/bookingController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getUserBookings);
router.get("/all", protect, adminOnly, getAllBookings);
router.get("/availability", protect, checkAvailability);
router.delete("/:id", protect, cancelBooking);
router.patch("/:id", protect, adminOnly, updateBookingStatus);
router.get("/stats", protect, adminOnly, getStats);

module.exports = router;
