const db = require("../models");
const express = require("express");
const router = express.Router();

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
      res.render("story", {
        storyImage: storyMeta.dataValues.storyImage,
        storyName: storyMeta.dataValues.storyName,
        chapter: chapsArray,
      });
    });
  });
}

router.get("/story/:slug", renderStory);

module.exports = router;