var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var user = require("../models/user.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  user.selectAll(function(data) {
    var hbsObject = {
      users: data
    };
    console.log(hbsObject);
    res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("index", hbsObject);
  });
});

router.post("/api/users", function(req, res) {
  user.insertOne([
    "userName", "password"
  ], [
    req.body.userName, req.body.password
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
