const CreditCard = require("../models/CreditCard");

const calculateCardRecommendation = (card, user) => {

  let score = 0;
  let reasons = [];
  let estimatedCashback = 0;
  let eligible = true;

  // 1. Income eligibility
  if (user.income >= card.minIncome) {
    score += 20;
    reasons.push("Eligible based on your income");
  } else {
    eligible = false;
    reasons.push("Income below required minimum");
  }

  // 2. Credit score eligibility
  if (user.creditScore >= card.minCreditScore) {
    score += 20;
    reasons.push("Eligible based on your credit score");
  } else {
    eligible = false;
    reasons.push("Credit score below required minimum");
  }

  // 3. Goal match
  if (card.rewardType === user.goal) {
    score += 30;
    reasons.push(`Best suited for ${user.goal}`);
  }

  // 4. Cashback estimation
  const shoppingCashback =
    (user.spending.shopping || 0) * (card.cashback.shopping || 0) / 100;

  const fuelCashback =
    (user.spending.fuel || 0) * (card.cashback.fuel || 0) / 100;

  const diningCashback =
    (user.spending.dining || 0) * (card.cashback.dining || 0) / 100;

  const travelCashback =
    (user.spending.travel || 0) * (card.cashback.travel || 0) / 100;

  estimatedCashback =
    shoppingCashback +
    fuelCashback +
    diningCashback +
    travelCashback;

  score += estimatedCashback;

  if (estimatedCashback > 500) {
    reasons.push("High cashback potential based on your spending");
  }

  // 5. Annual fee benefit
  if (card.annualFee === 0) {
    score += 10;
    reasons.push("No annual fee");
  }

  return {
    cardId: card._id,
    name: card.name,
    bank: card.bank,
    score: Math.round(score),
    estimatedMonthlyCashback: Math.round(estimatedCashback),
    annualFee: card.annualFee,
    rewardType: card.rewardType,
    reasons,
    eligible
  };
};

const getRecommendedCards = async (user) => {

  const cards = await CreditCard.find();

  const results = cards.map(card =>
    calculateCardRecommendation(card, user)
  );

  // Filter only eligible cards
  const eligibleCards = results.filter(card => card.eligible);

  // Sort by score
  eligibleCards.sort((a, b) => b.score - a.score);

  return eligibleCards.slice(0, 3);

};

module.exports = {
  getRecommendedCards
};