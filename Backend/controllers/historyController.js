const Recommendation =
  require("../models/Recommendation");

const getHistory = async (req, res) => {

  try {

    const history =
      await Recommendation.find({
        userId: req.user.id
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: history
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = { getHistory };