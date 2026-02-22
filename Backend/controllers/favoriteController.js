const Favorite = require("../models/Favorite");

// Add favorite
const addFavorite = async (req, res) => {

  const { cardId } = req.body;

  try {

    const existing = await Favorite.findOne({
      userId: req.user.id,
      cardId
    });

    if (existing) {
      return res.status(400).json({
        message: "Already added to favorites"
      });
    }

    const favorite = await Favorite.create({
      userId: req.user.id,
      cardId
    });

    res.status(201).json(favorite);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// Remove favorite
const removeFavorite = async (req, res) => {

  const { cardId } = req.params;

  try {

    await Favorite.deleteOne({
      userId: req.user.id,
      cardId
    });

    res.json({ message: "Removed from favorites" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// Get user favorites
const getFavorites = async (req, res) => {

  try {

    const favorites = await Favorite
      .find({ userId: req.user.id })
      .populate("cardId");

    res.json(favorites);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites
};