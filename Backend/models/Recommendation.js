const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userProfile: {
    income: Number,
    creditScore: Number,
    goal: String,
    spending: {
      shopping: Number,
      fuel: Number,
      dining: Number,
      travel: Number
    }
  },

  recommendedCards: [
    {
      cardId: mongoose.Schema.Types.ObjectId,
      name: String,
      bank: String,
      score: Number,
      estimatedMonthlyCashback: Number
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Recommendation", recommendationSchema);