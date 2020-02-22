const express = require("express");

const router = express.Router();

const story = require("../models/story.js");

// get all stories (view/read)
// get stories by location (view/read)
// get stories from a specific user (view/read)

// create story with name, location, info and userID

// update name, location or info

// delete specific story

// "/rest of the url for the stories page"
router.get("/", (req, res) => {
  story.all(data => {
    var hbsObject = {
      story: data
    };
    console.log(hbsObject);
    res.render("", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
