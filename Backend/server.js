// ✅ เริ่มต้นไฟล์ server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ✅ สร้าง app ก่อน
const app = express();

// ✅ ใช้งาน Middleware
app.use(cors());
app.use(express.json());

// ✅ เชื่อมต่อฐานข้อมูล
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err.message));

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes"); // ถ้ามี

// ✅ ใช้งาน Routes หลังสร้าง app แล้ว
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes); // ถ้ามีระบบหลายห้อง

// ✅ หน้าหลัก (ทดสอบ)
app.get("/", (req, res) => {
  res.send("Music Practice Room Booking API running ✅");
});

// ✅ เริ่ม Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
