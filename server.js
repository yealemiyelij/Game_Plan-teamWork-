var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var path = require("path");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3002;

// Serve static content for the app from the "public" directory in the application directory.

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = require("./controllers/routes");

app.use("/", router);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
});

