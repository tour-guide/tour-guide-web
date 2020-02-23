// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {

  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user is already signed in send them to their member profile page
    if (req.user) {
      res.redirect("/members");
    }
    // otherwise, send them to login
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", (req,res) => {
    // if the user clicks the signup option, send them straight to signup
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // this route checks if the user is authenticated before passing them along
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
