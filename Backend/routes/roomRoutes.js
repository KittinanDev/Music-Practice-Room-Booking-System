const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");
const { getRooms, createRoom } = require("../controllers/roomController");

router.get("/", protect, getRooms);
router.post("/", protect, adminOnly, createRoom);

module.exports = router;
