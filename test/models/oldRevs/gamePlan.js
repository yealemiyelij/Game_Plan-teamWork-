// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var user = {
  create: function(cols, vals, cb) {
    orm.create("member_profile", cols, vals, function(res) {
      cb(res);
    });
  },
  selectWhere: function(colToSearch, valOfCol, cb) {
    orm.selectWhere("member_profile", colToSearch, valOfCol, function(res) {
      cb(res);
    });
    orm.selectWhere("pets", "animal_name", "Rachel")
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
