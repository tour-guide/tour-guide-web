const db = require("../models");
const express = require("express");
const router = express.Router();
const apikey = process.env.APIKEY;

function renderStory(req, res) {
  const slug = req.params.slug;
  //get the story data
  db.Story.findOne({
    where: { slug: slug }
  }).then(storyMeta => {
    //get the story id
    const id = storyMeta.dataValues.id;
    //next get the chapters
    db.Chapter.findAll({
      where: { StoryId: id }
    }).then(chapsMeta => {
      console.log("==============Story Meta===========");
      console.log(storyMeta.dataValues);
      console.log("==============Chaps Meta===========");
      const chapsArray = chapsMeta.map(chap => {
        return chap.dataValues;
      });
      console.log(chapsArray);
      const directions = getDirections(storyMeta.dataValues, chapsArray)
      res.render("story", {
        storyImage: storyMeta.dataValues.storyImage,
        storyName: storyMeta.dataValues.storyName,
        chapter: chapsArray,
        directions: directions
      });
    });
  });
}

function getDirections(storyMeta, chapsArray) {
  //convert chapsArray to wayPoints
  let wayPoints = chapsArray.map(element => {
    return encodeURIComponent(`${element.chapLocation}, ${element.chapCity}, ${element.chapState}`);
  });
  console.log("=============== wayPoints ==========")
  console.log(wayPoints);
  let startingPoint = wayPoints.shift();
  let endingPoint = wayPoints.pop();
  //modeType is storyTransit
  const modeType = storyMeta.storyTransit;

  let queryURL = "https://www.google.com/maps/embed/v1/directions?key=" + apikey;
  //encode starting point 
  queryURL += "&origin=" + startingPoint;
  //encode ending point
  queryURL += "&destination=" + endingPoint;
  if (wayPoints.length !== 0) {
    queryURL += "&waypoints=" + wayPoints.join("|");
  }
  if (modeType) {
    queryURL += "&mode=" + modeType;
  }

  console.log("=============== Google Directions URL==========")
  console.log(queryURL);
  return queryURL;

};


router.get("/story/:slug", renderStory);

module.exports = router;