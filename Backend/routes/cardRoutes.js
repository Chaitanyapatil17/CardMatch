const express = require("express");
const router = express.Router();

const {
  addCreditCard,
  getAllCards,
  getCardById
} = require("../controllers/cardController");

// Add new credit card
router.post("/", addCreditCard);

// Get all cards
router.get("/", getAllCards);

// ✅ NEW: Get card by ID
router.get("/:id", getCardById);

module.exports = router;