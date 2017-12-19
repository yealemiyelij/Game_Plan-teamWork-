const UserGroup = require("./UserGroup");

module.exports = function(sequelize, DataTypes) {
    
    var User = sequelize.define("User", {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        username: DataTypes.STRING,
        birthdate: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        image: DataTypes.STRING
    });
    
    User.associate = function(models) {
        User.hasMany(models.UserGroup);
    }
    
    return User;

};
