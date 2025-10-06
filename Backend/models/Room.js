const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, default: 1 },
  equipment: [String],
  status: { type: String, enum: ["available", "maintenance", "closed"], default: "available" }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
