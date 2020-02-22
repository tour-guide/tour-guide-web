const express = require("express");

const router = express.Router();

const chapter = require("../models/chapter.js");

// get all chapters by story id (view/read)
// get specific chapter from a story (view/read)

// create chapter with number, name, location and storyID

// update chapter number name location

// delete specific chapter

// "/rest of the url for the stories page"
router.get("/", (req, res) => {
  chapter.all(data => {
    var hbsObject = {
      story: data
    };
    console.log(hbsObject);
    res.render("", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
