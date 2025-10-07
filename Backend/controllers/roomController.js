const Room = require("../models/Room");

// ✅ ดึงรายชื่อห้อง
exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

// ✅ สร้างห้อง (admin)
exports.createRoom = async (req, res) => {
  const room = await Room.create(req.body);
  res.json(room);
};
