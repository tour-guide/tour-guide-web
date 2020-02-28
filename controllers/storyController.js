const db = require("../models");
// const { storyName, location, info, storyImage } = storyMeta;

module.exports = {
  // get all stories
  getStories: (req, res) => {
    db.Story.findAll().then(storyMeta => {
      res.render("/api/story", storyMeta);
    });
  },

  // get stories by location
  getStoryByLocation: (req, res) => {
    const locationSearch = req.body.location;
    db.Story.findAll({
      where: locationSearch
    }).then(storyMeta => {
      res.render("/api/story", storyMeta);
    });
  },

  // get stories from a specific user
  getStoryByUser: (req, res) => {
    let query;
    if (req.params.userId) {
      query = Story.findAll({
        include: [
          { model: User, where: { id: req.params.userId } },
          { model: Story }
        ]
      });
    } else {
      query = Story.findAll({ include: [Story, User] });
    }
    return query.then(story => res.json(story));
  },

  createStory: (req, res) => {
    const { storyName, location, storyCity, storyState, storyTransit, info, storyImage } = req.body;

    db.Story.create({
      storyName,
      location,
      storyCity,
      storyState,
      storyTransit,
      info,
      storyImage
    })
      .then(() => {
        let storyID = res.id;
        console.log("==================story id ===============");
        console.log(storyID);
        res.redirect(307, `/api/story/${storyID}`);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  },

  // update name
  updateStory: (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.Story.find({
      where: { id: id }
    })
      .then(story => {
        return story.updateAttributes(updates);
      })
      .then(updatedStory => {
        res.json(updatedStory);
      });
  },

  // delete specific story
  deleteStory: (req, res) => {
    const id = req.params.id;
    db.story
      .destroy({
        where: { id: id }
      })
      .then(deletedStory => {
        res.json(deletedStory);
      });
  }
};
