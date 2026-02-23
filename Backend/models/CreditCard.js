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
    required: true,
    // UPDATE THIS ARRAY to include the new types
    enum: ["rewards", "points", "cashback", "discounts", "membership rewards"], 
    lowercase: true // Helps avoid "Points" vs "points" errors
  },

  benefits: [String],

  bestFor: [String]

}, { timestamps: true });

module.exports = mongoose.model("CreditCard", creditCardSchema);