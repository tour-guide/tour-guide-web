const db = require("../models");

module.exports = {
  // get all stories
  getStories: (req, res) => {
    db.Story.findAll().then(storyMeta => {
      res.render("/api/story", storyMeta);
    });
  },

  //get a single story
  getStory: (req, res) => {
    const StoryId = req.body.StoryId;
    db.Story.findOne({
      where: StoryId
    }).then(storyMeta => {
      res.json(storyMeta);
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
  getStoriesByUser: (req, res) => {
    const { UserId } = req.params;
    console.log(`Getting stories by ${UserId}`);
    db.Story.findAll({
      where: {
        UserId: UserId
      }
    }).then(stories => {
      res.json(stories);
    });
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
      storyImage,
      UserId: req.user.id
    })
      .then(data => {
        res.json(data);
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
