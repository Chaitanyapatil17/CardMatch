const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CreditCard",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Favorite", favoriteSchema);