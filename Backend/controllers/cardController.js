const CreditCard = require("../models/CreditCard");

// Add credit card
const addCreditCard = async (req, res) => {
  try {

    const { name } = req.body;

    // check if card already exists
    const existingCard = await CreditCard.findOne({ name });

    if (existingCard) {
      return res.status(400).json({
        success: false,
        message: "Credit card already exists"
      });
    }

    const card = new CreditCard(req.body);

    const savedCard = await card.save();

    res.status(201).json({
      success: true,
      message: "Credit card added successfully",
      data: savedCard
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get all cards
const getAllCards = async (req, res) => {
  try {

    const cards = await CreditCard.find();

    res.status(200).json({
      success: true,
      count: cards.length,
      data: cards
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ✅ NEW: Get single card by ID
const getCardById = async (req, res) => {
  try {

    const card = await CreditCard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found"
      });
    }

    res.status(200).json({
      success: true,
      data: card
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  addCreditCard,
  getAllCards,
  getCardById   // export new function
};