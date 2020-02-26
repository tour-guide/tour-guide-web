const db = require("../models");
// const { chapNumber, chapName, chapLocation } = chapterMeta;

module.exports = {
  // get all chapters by story id (view/read)
  getAllChaps: (req, res) => {
    const id = req.params.id;
    db.Chapter.findAll({
      where: { storyId: id }
    }).then(chapterMeta => {
      res.json(chapterMeta);
    });
  },

  // get specific chapter from a story (view/read)
  getOneChap: (req, res) => {
    const id = req.params.id;
    db.Chapter.findAll({
      where: { id: id }
    }).then(chapterMeta => {
      res.json(chapterMeta);
    });
  },

  // create chapter with number, name, location and storyID
  createChap: (req, res) => {
    const { chapNumber, chapName, chapLocation } = req.body;
    db.Chapter.create({
      chapNumber,
      chapName,
      chapLocation
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  },

  // update chapter number name location
  updateChap: (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.Chapter.find({
      where: { id: id }
    })
      .then(chapter => {
        return chapter.updateAttributes(updates);
      })
      .then(updatedChapter => {
        res.json(updatedChapter);
      });
  },

  // delete specific chapter
  deleteChap: (req, res) => {
    const id = req.params.id;
    db.Chapter
      .destroy({
        where: { id: id }
      })
      .then(deletedChapter => {
        res.json(deletedChapter);
      });
  }
};
