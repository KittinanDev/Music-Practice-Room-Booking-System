const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.createRoom = async (req, res) => {
  const { name, capacity, equipment } = req.body;
  const exists = await Room.findOne({ name });
  if (exists) return res.status(400).json({ message: "ชื่อห้องซ้ำ" });
  const room = await Room.create({ name, capacity, equipment });
  res.json(room);
};

exports.deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "ลบห้องแล้ว" });
};
