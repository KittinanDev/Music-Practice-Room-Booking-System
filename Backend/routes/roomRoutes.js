const express = require("express");
const { getRooms, createRoom } = require("../controllers/roomController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/roleMiddleware");
const router = express.Router();
const { deleteRoom } = require("../controllers/roomController");

router.get("/", protect, getRooms);
router.post("/", protect, adminOnly, createRoom);
router.delete("/:id", protect, adminOnly, deleteRoom);

module.exports = router;
