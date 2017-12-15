var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");


var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var port = process.env.PORT || 3000;
var app = express();
//app.set('superSecret', config.secret); // secret variable

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Import routes and give the server access to them.
var routes = require("./controllers/routes.js");

app.use("/", routes);

app.listen(port);
