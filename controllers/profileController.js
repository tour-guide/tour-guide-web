const db = require("../models");
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");

function renderUserProfile(req, res) {

  const id = req.user.id;
  db.User.findOne({
    where: { id: id },
    attributes: { exclude: ["password"] }
  })
    .then(user => {
      db.Story.findAll({
        where: { UserId: id }
      }).then(stories => {
        const userStories = stories.map(story => {
          return story.dataValues;
        });
        res.render("profile", {
          user: user.dataValues,
          stories: userStories
        });
      });
    });
}

router.get("/profile", isAuthenticated, renderUserProfile);

//router.get("/profile/:id", renderPublicProfile);

module.exports = router;

