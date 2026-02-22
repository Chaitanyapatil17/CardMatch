const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  bank: {
    type: String,
    required: true,
    trim: true
  },

  annualFee: {
    type: Number,
    default: 0
  },

  joiningFee: {
    type: Number,
    default: 0
  },

  minIncome: {
    type: Number,
    required: true
  },

  minCreditScore: {
    type: Number,
    default: 650
  },

  cashback: {
    shopping: { type: Number, default: 0 },
    fuel: { type: Number, default: 0 },
    dining: { type: Number, default: 0 },
    travel: { type: Number, default: 0 }
  },

  rewardType: {
    type: String,
    enum: ["cashback", "travel", "rewards"],
    default: "cashback"
  },

  benefits: [String],

  bestFor: [String]

}, { timestamps: true });

module.exports = mongoose.model("CreditCard", creditCardSchema);