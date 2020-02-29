// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {

  app.get("/", (req, res) => {
    //we don't require sign up to see available stories
    //this route takes them to a list of available stories
    res.redirect("/stories");
  });

  app.get("/login", (req, res) => {
    // If the user is already signed in send them to the logged in home page
    if (req.user) {
      res.redirect("/profile");
    }
    // otherwise, send them to login
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", (req,res) => {
    // if the user clicks the signup option, send them straight to signup
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/new", isAuthenticated, (req, res) => {
    //if user is authenticated send them to the page to create a story
    res.sendFile(path.join(__dirname, "../public/new.html"));
  });

  //app.get("/story/:story-slug", (req, res) => {
  //send the user to the selected story
  //res.sendFile(path.join(__dirname, "../public/story.html"));
  //});

};
