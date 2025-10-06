const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  checkAvailability,
} = require("../controllers/bookingController");

router.post("/", protect, createBooking);
router.get("/my", protect, getUserBookings);
router.get("/all", protect, adminOnly, getAllBookings);

// ✅ เพิ่ม endpoint นี้
/**
 * @swagger
 * /api/bookings/availability:
 *   get:
 *     summary: ตรวจสอบว่าห้องว่างหรือไม่ในช่วงเวลาที่ระบุ
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roomId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: รหัสห้อง
 *       - name: date
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-10-07"
 *       - name: start
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "10:00"
 *       - name: end
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "12:00"
 *     responses:
 *       200:
 *         description: แสดงผลว่าว่างหรือไม่
 */
router.get("/availability", protect, checkAvailability);
