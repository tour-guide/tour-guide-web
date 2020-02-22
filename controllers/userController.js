const express = require("express");

const router = express.Router();

const user = require("../models/user.js");

// get specific user

// create user with first name, last name, email, password, bio, profile pic, stories

// update user first/last name, email, password, bio, profile pic, stories

// delete specific user

// "/rest of the url for the stories page"
router.get("/", (req, res) => {
  user.all(data => {
    var hbsObject = {
      story: data
    };
    console.log(hbsObject);
    res.render("", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
