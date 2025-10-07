const Booking = require("../models/Booking");
const Room = require("../models/Room");
const { validateBookingOverlap } = require("../utils/validateBooking");
const DEFAULT_ROOM_ID = process.env.DEFAULT_ROOM_ID;

// ✅ ตรวจ input เวลาก่อนบันทึก
function isValidTime(start, end) {
  return start < end;
}

// ✅ สร้างการจอง
exports.createBooking = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime)
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });

    if (!isValidTime(startTime, endTime))
      return res.status(400).json({ message: "เวลาสิ้นสุดต้องมากกว่าเวลาเริ่ม" });

    const today = new Date().toISOString().split("T")[0];
    if (date < today)
      return res.status(400).json({ message: "ไม่สามารถจองย้อนหลังได้" });

    const overlap = await validateBookingOverlap(DEFAULT_ROOM_ID, date, startTime, endTime);
    if (overlap)
      return res.status(400).json({ message: "ช่วงเวลานี้ถูกจองแล้ว" });

    const booking = await Booking.create({
      user: req.user._id,
      room: DEFAULT_ROOM_ID,
      date,
      startTime,
      endTime,
      status: "pending",
      actionLog: [{ user: req.user._id, action: "created", timestamp: new Date() }]
    });

    res.json({ message: "จองสำเร็จ", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการจอง" });
  }
};

// ✅ การจองของฉัน
exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("room", "name")
    .sort({ date: -1, startTime: 1 });
  res.json(bookings);
};

// ✅ การจองทั้งหมด (admin) + Pagination + Filter
exports.getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    const bookings = await Booking.find(query)
      .populate("user", "name email")
      .populate("room", "name")
      .sort({ date: -1, startTime: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Booking.countDocuments(query);
    res.json({
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      bookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

// ✅ ยกเลิกการจอง (user หรือ admin)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "ไม่พบการจอง" });

    // ตรวจสิทธิ์: ต้องเป็นเจ้าของหรือ admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "ไม่มีสิทธิ์ยกเลิกการจองนี้" });
    }

    booking.status = "cancelled";
    booking.actionLog.push({ user: req.user._id, action: "cancelled", timestamp: new Date() });
    await booking.save();

    res.json({ message: "ยกเลิกการจองเรียบร้อย", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ อนุมัติ / ปฏิเสธ (admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "สถานะไม่ถูกต้อง" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { actionLog: { user: req.user._id, action: status, timestamp: new Date() } }
      },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "ไม่พบข้อมูล" });
    res.json({ message: `อัปเดตสถานะเป็น ${status}`, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Count / Summary
exports.getStats = async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const approved = await Booking.countDocuments({ status: "approved" });
    const pending = await Booking.countDocuments({ status: "pending" });
    const rejected = await Booking.countDocuments({ status: "rejected" });
    const cancelled = await Booking.countDocuments({ status: "cancelled" });
    res.json({ total, approved, pending, rejected, cancelled });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
