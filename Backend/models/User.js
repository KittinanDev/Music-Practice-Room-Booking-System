// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // 🔹 ใส่ตรงนี้ 🔹
  role: {
    type: String,
    enum: ["user", "admin"], // จำกัดให้มีเฉพาะ 2 ค่า
    default: "user"          // ถ้าไม่ระบุ จะเป็น user โดยอัตโนมัติ
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
