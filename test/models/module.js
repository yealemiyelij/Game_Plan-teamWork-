var orm = require("../config/orm.js");

//Exposing a group object with function, *module.exports= group*
module.exports.user = {
    all: function (cb) {
        orm.selectAll("member_profile", function (res) {
            cb(res);
        });
    },
    selectWhere: function(colToSearch, valOfCol, cb) {
        orm.selectWhere("member_profile", colToSearch, valOfCol, function (res) {
        cb(res);
        });
    },
    create: function (col, vals, cb) {
        orm.createNewTb("member_profile", col, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.updateTb("member_profle", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.deleteTb("member_profile", condition, function (res) {
            cb(res);
        });
    }
};
module.exports.group = {
    all: function (cb) {
        orm.selectAll("group_profile", function (res) {
            cb(res)
        });
    },
    create: function (col, vals, cb) {
        orm.createNewTb("group_profile", col, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.updateTb("group_profile", objColVals, condition, function (res) {
            cb(res);
        });
    },

    delete: function (condition, cb) {
        orm.deleteTb("group_profile", condition, function (res) {
            cb(res);
        });
    }
};

//Exposing a event object with function, *module.exports= event*

module.exports.event = {
    all: function (cb) {
        orm.selectAll("event_profile", function (res) {
            cb(res)
        });
    },
    create: function (col, vals, cb) {
        orm.createNewTb("event_profile", col, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.updateTb("event_profile", objColVals, condition, function (res) {
            cb(res);
        });
    },

    delete: function (condition, cb) {
        orm.deleteTb("event_profile", condition, function (res) {
            cb(res);
        });
    }
};

//Exposing an event location object with function, *module.exports= eventLocation*
module.exports.eventLocation = {
    all: function (cb) {
        orm.selectAll("entLocation_markers", function (res) {
            cb(res)
        });
    },
    create: function (col, vals, cb) {
        orm.createNewTb("entLocation_markers", col, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.updateTb("entLocation_markers", objColVals, condition, function (res) {
            cb(res);
        });
    },

    delete: function (condition, cb) {
        orm.deleteTb("entLocation_markers", condition, function (res) {
            cb(res);
        });
    }

};

// exporting functions
//module.exports = group,
//module.exports = event,
//module.exports = eventLocation