import User from "../models/User.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

// ดึงข้อมูลทั้งหมด
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user room");
  res.json(bookings);
};

// ลบข้อมูล
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
};
