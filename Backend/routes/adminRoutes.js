import express from "express";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import { getAllUsers, getAllRooms, getAllBookings, deleteUser, deleteBooking } from "../controllers/adminController.js";

const router = express.Router();

// ดึงข้อมูลทั้งหมด
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.get("/rooms", verifyToken, isAdmin, getAllRooms);
router.get("/bookings", verifyToken, isAdmin, getAllBookings);

// ลบข้อมูล
router.delete("/user/:id", verifyToken, isAdmin, deleteUser);
router.delete("/booking/:id", verifyToken, isAdmin, deleteBooking);

export default router;
