const express = require("express");
const router = express.Router();

const recommendController = require("../controllers/recommendController");
const protect = require("../middleware/authMiddleware");

// Professional endpoint name
router.post("/analyze", protect, recommendController.recommendCards);

module.exports = router;