module.exports = function (sequelize, DataTypes) {

    var Event = sequelize.define("Event", {
        eventadmin: DataTypes.STRING,
        eventname: DataTypes.STRING,
        eventgroup: DataTypes.STRING,
        username: DataTypes.STRING,
        eventdate: DataTypes.STRING,
        ongoingevent: DataTypes.BOOLEAN
    });
    return Event;
};