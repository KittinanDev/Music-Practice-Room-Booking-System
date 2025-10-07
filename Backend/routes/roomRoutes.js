const express = require("express");
const { getRooms, createRoom } = require("../controllers/roomController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/roleMiddleware");

const router = express.Router();
router.get("/", protect, getRooms);
router.post("/", protect, adminOnly, createRoom);

module.exports = router;
