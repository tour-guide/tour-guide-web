<<<<<<< Updated upstream
const express = require("express");

const router = express.Router();

const rating = require("../models/rating.js");

// get all ratings by story (view/read)
// get all ratings by user (view/read)

// create rating with a number out of 5 and storyID and userID

// update number

// delete specific rating

// "/rest of the url for the stories page"
router.get("/", (req, res) => {
  rating.all(data => {
    var hbsObject = {
      story: data
    };
    console.log(hbsObject);
    res.render("", hbsObject);
  });
});

router.get("/", (req, res) => {
  rating.findAll({
    attributes: [
      [sequelize.fn("avg", sequelize.col("rating")), "ratingAverage"]
    ]
  });
});
// Export routes for server.js to use.
module.exports = router;
=======
const db = require("../models");

module.exports = {
  // get ratings by user
  getRatingsForUser: (req, res) => {
    const id = req.params.id;
    db.Rating.find({
      where: { userId: id }
    })
      .then()
      // logic in here to make average
      .then(rating => {
        res.json(rating);
      });
  },

  // get ratings by story
  getRatingsForStory: (req, res) => {
    const id = req.params.id;
    db.Rating.find({
      where: { storyId: id }
    })
      .then()
      // logic in here to make average
      .then(rating => {
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
>>>>>>> Stashed changes
