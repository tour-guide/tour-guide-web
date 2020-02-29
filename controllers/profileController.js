const db = require("../models");
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/profile", isAuthenticated, renderUserProfile);

router.get("/profile/:id", renderPublicProfile);


function renderUserProfile(req, res) {

  const id = req.user.id;
  db.User.findOne({
    where: { id: id },
    attributes: { exclude: ["password"] }
  })
    .then(user => {
      console.log("============== profile page for user ==============")
      console.log(user);
      db.Story.findAll({
        where: { UserId: id }
      }).then(stories => {
        res.render("profile", {
          user: user,
          stories: stories
        });
      });
    });
}

function renderPublicProfile(req, res) {

  const id = req.params.id;
  db.User.findOne({
    where: { id: id },
    attributes: { exclude: ["password"] }
  })
    .then(user => {
      console.log("============== public profile page for user ==============")
      console.log(user);
      db.Story.findAll({
        where: { UserId: id }
      }).then(stories => {
        res.render("profile", {
          user: user,
          stories: stories
        });
      });
    });
}

module.exports = router;

