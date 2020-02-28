const db = require("../models");

module.exports = {
  // get ratings by user
  getRatingsForUser: (req, res) => {
    const id = req.params.id;
    db.Rating.findAll({
      where: { userId: id },
      attributes: [
        [sequelize.fn("avg", sequelize.col("rating")), "ratingAverage"]
      ]
    }).then(rating => {
      console.log(rating);
      res.json(rating);
    });
  },

  // get ratings by story
  getRatingsForStory: (req, res) => {
    const id = req.params.id;
    db.Rating.findAll({
      where: { storyId: id },
      attributes: [
        [sequelize.fn("avg", sequelize.col("rating")), "ratingAverage"]
      ]
    }).then(rating => {
      console.log(rating);
      res.json(rating);
    });
  },

  // create rating with a number out of 5 and storyID and userID
  createRating: (req, res) => {
    const { rating, storyId, userId } = req.body;
    db.Rating.create({
      rating,
      storyId,
      userId
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  }
};
