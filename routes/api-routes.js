// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = app => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login"}));

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    const { firstName, lastName, email, password, profile } = req.body;
    db.User.create({
      email,
      password,
      firstName,
      lastName,
      profile
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/story", (req, res) => {
    const { storyName, location, info, storyImage } = req.body;
    db.Story.create({
      storyName,
      location,
      info,
      storyImage
    })
      .then(data => {
        res.json(data);
      });
  });

  app.post("/api/chapter", (req, res) => {
    const { storyID, chapNumber, chapName, chapLocation, chapAudio } = req.body;
    db.Chapter.create({
      storyID,
      chapNumber,
      chapName,
      chapLocation,
      chapAudio
    })
      .then(data => {
        res.json(data);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
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
};
