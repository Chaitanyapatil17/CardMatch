const Recommendation = require("../models/Recommendation");

// IMPORTANT: import recommendation service
const { getRecommendedCards } = require("../services/recommendationService");

const recommendCards = async (req, res) => {

  try {

    const userData = req.body;

    // generate recommendations
    const recommendations =
      await getRecommendedCards(userData);

    // save recommendation with userId
    const history = new Recommendation({

      userId: req.user.id,

      userProfile: userData,

      recommendedCards: recommendations

    });

    await history.save();

    res.json({
      success: true,
      data: recommendations
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }

};

// IMPORTANT: export properly
module.exports = {
  recommendCards
};