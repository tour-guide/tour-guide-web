// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", 
  exphbs({ defaultLayout: "main", 
    helpers: { section: function(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
    }
  }));
app.set("view engine", "handlebars");

// Requiring our routes
const profileController = require("./controllers/profileController.js");
const storypageController = require("./controllers/storypageController.js");
require("./routes/html-routes.js")(app);
app.use(require("./routes/api-routes.js"));
require("./routes/s3-routes.js")(app);
app.use(profileController);
app.use(storypageController);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
