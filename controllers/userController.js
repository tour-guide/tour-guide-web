const db = require("../models");

module.exports = {
  // get specific user
  getUser: (req, res) => {
    const id = req.params.id;
    db.User
      .findOne({
        where: { id: id }
      })
      .then(user => {
        //only return specific fields so we don't accidentally end up with a password
        const { firstName, lastName, profile, email, profilePic } = user;
        res.json({
          firstName,
          lastName,
          profile,
          email,
          profilePic
        });
      });
  },

  // create user with first name, last name, email, password, bio, profile pic, stories
  createUser: (req, res) => {
    const { firstName, lastName, email, password, profile } = req.body;
    db.User.create({
      email,
      password,
      firstName,
      lastName,
      profile
    })
      .then(() => {
        res.redirect(307, "/profile");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  },

  // update user first/last name, email, password, bio, profile pic, stories
  updateUser: (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.user
      .find({
        where: { id: id }
      })
      .then(user => {
        return user.updateAttributes(updates);
      })
      .then(updatedUser => {
        res.json(updatedUser);
      });
  },

  // ghost specific user ---- WORK ON THIS TO HARD CODE TO UPDATE TO NO PERSONAL DETAILS
  ghostUser: (req, res) => {
    const id = req.params.id;
    db.user
      .find({
        where: { id: id }
      })
      .then(user => {
        return user.updateAttributes(updates);
      })
      .then(updatedUser => {
        res.json(updatedUser);
      });
  }
};
