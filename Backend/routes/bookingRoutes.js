import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ ดึงรายการจองทั้งหมด
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// ✅ ดึงรายการจองของวันใดวันหนึ่ง
router.get("/check", async (req, res) => {
  const { date } = req.query;
  const bookings = await Booking.find({ date });
  res.json(bookings);
});

// ✅ เพิ่มการจอง
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "✅ จองสำเร็จ", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ยกเลิกการจอง
router.delete("/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "❌ ยกเลิกการจองเรียบร้อย" });
});

export default router;
