// Requiring our models and passport as we've configured it
// const db = require("../models");
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const ratingController = require("../controllers/ratingController");
const userController = require("../controllers/userController");
const storyController = require("../controllers/storyController");
const chapterController = require("../controllers/chapterController");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error

router.post("/api/signup",
  userController.createUser);

router.post("/api/story",
  storyController.createStory);

router.post("/api/chapter",
  chapterController.createChap);

router.post("/api/rating",
  ratingController.createRating);

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      firstName: req.user.firstName,
      email: req.user.email,
      id: req.user.id
    });
  }
});

router.get("/api/user/:id",
  userController.getUser);

//router.get("/api/story",
//storyController.getStoryByLocation);

router.get("/api/story/:StoryId",
  storyController.getStory);

router.get("/stories",
  storyController.getStories);

router.get("/api/chapters/:StoryId",
  chapterController.getAllChaps);

//router.get("/api/chapter",
//chapterController.getOneChap);

//router.get("/api/story",
//ratingController.getRatingsForStory);

//router.get("/api/story",
//ratingController.getRatingsForUser);

//router.put("/api/signup",
//userController.updateUser);

//router.put("/api/story",
//storyController.updateStory);

//router.put("/api/chapter",
//chapterController.updateChap);

//router.put("/api/story",
//ratingController.updateRating);

//router.put("/api/signup",
//userController.ghostUser);

router.delete("/api/story",
  storyController.deleteStory);

router.delete("/api/chapter",
  chapterController.deleteChap);

module.exports = router;