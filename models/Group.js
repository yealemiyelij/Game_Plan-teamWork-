const UserGroup = require("./UserGroup");

module.exports = function(sequelize, DataTypes) {
    
    var Group = sequelize.define("Group", {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        friends: DataTypes.STRING,
        admin: DataTypes.STRING
    });
    
    Group.associate = function(models) {
        Group.hasMany(models.UserGroup);
    };

    return Group;

};
