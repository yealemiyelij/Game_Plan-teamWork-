const User = require("./User");
const Group = require("./Group");

module.exports = function(sequelize, DataTypes) {
    
    var UserGroup = sequelize.define("UserGroup", {
        
    });

    UserGroup.associate = function(models) {
        UserGroup.belongsTo(models.User, { });
        UserGroup.belongsTo(models.Group, { });
    }
    
    return UserGroup;

};
