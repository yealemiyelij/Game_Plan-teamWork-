//API Routes

var express = require('express')
var router = express.Router();
var path = require("path");

var app = express();
//var user = require("../models/module.js");

var db = require("../models");
var jwt = require("jsonwebtoken");
var Sequelize = require("sequelize");
//var cookie = require('cookie');

//'api to check username and password to database, if username exists --> check password to value, if password matches --> grant token;
// if error--> route to login;'

//Authenticate API - login.onclick execute
router.post("/api/auth", function (req, res) {
  var userName = req.body.userName;
  var userPassword = req.body.password;


  db.User.findOne({
    where: {
      username: userName,
      password: userPassword
    }
  }).then((user) => {

    if (!user) {
      return res.status(200).json({
        message: 'User not found.',
        success: false
      });
    };

    const payload = {
      id: user.id,
      username: user.username
    };

    var token = jwt.sign(payload, "mySuperSecretSecureKey");

    // return the information including token as cookie
    res.cookie("auth", token, {
      expires: new Date(Date.now() + (86400 * 14 * 1000)), //2 weeks
      maxAge: 86400 * 14 * 1000,
      httpOnly: true,
      secure: false // Doesn't need HTTPS
    });

    res.status(200).json({
      success: true
    });

  });

});



//create user api
router.post("/api/users", function (req, res) {

  db.User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if(!user) {
      db.User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        birthdate: req.body.birthday,
        email: req.body.email,
        password: req.body.newpassword,
        phone: req.body.phonenumber,
        image: req.body.exampleFormControlFile1
      }).then(() => {
        res.status(200).json({
          message: 'Successfully created user.',
          success: true
        });;
      });
      
    }else{
      res.json({
        message: "Username already exists.",
        success: false
      })
    };
});
});



//// GET user info personalized display
router.get("/api/userinfo", authMiddleware, function (req, res) { //authMiddleware
    db.User.findOne({
      // include: [{
      //   model: db.UserGroup,
      //   required: true,
      //   where: {
      //     userId: req.decoded.id //req.decoded.user.id
      //   }
      // }]
      where: {
        
        username: req.decoded.username
      }
    }).then((user) => {
  
      res.status(200).json(user);
  
    });
  
  });

//GET and list groups relevant to the user
router.get("/api/groups", authMiddleware, function (req, res) { //authMiddleware
console.log(req.decoded.username);
  db.Group.findAll({
    // include: [{
    //   model: db.UserGroup,
    //   required: true,
    //   where: {
    //     userId: req.decoded.id //req.decoded.user.id
    //   }
    // }]
    where: {
      [Sequelize.Op.or]: [{friends: req.decoded.username}, {admin: req.decoded.username}]
      //friends: req.decoded.username,
      //admin: req.decoded.username

    }
  }).then((groups) => {

    res.status(200).json(groups);

  });

});

// router.get("/api/groups", authMiddleware, function (req, res) { //authMiddleware
// //console.log(req.decoded.username);
//   db.Group.findAll({
//     // include: [{
//     //   model: db.UserGroup,
//     //   required: true,
//     //   where: {
//     //     userId: req.decoded.id //req.decoded.user.id
//     //   }
//     // }]
//     where: {
//       friends: req.decoded.username
//     }
//   }).then((groups) => {

//     res.status(200).json(groups);

//   });

// });

router.get("/api/events", authMiddleware, function (req, res) { //authMiddleware

  db.Event.findAll({
    where: {
      [Sequelize.Op.or]: [{players: req.decoded.username}, {eventadmin: req.decoded.username}]
            //players: req.decoded.username
          }
  }).then((events) => {

    res.status(200).json(events);

  });

});


//create group api
router.post("/api/groups", authMiddleware, function (req, res) {

  //Use req.decoded.userid
  db.Group.create({
    name: req.body.name,
    type: req.body.type,
    friends: req.body.friends,
    admin: req.decoded.username
  }).then((group) => {

    var usergroups = [];

    for (var i = 0; i < req.body.friends.length; i++) {
      usergroups.push({
        UserId: req.body.friends[i].id,
        GroupId: group.id
      });
    }

    db.UserGroup.bulkCreate(usergroups).then(() => {

      res.status(200).json({
        message: "Successfully created group."
      });

    });

  })
});

//create event api
router.post("/api/events", authMiddleware, function (req, res) {
  console.log("req.decoded.auth:  " + req.decoded.id);

  db.Group.findOne({
    // include: [{
    //   model: db.UserGroup,
    //   required: true,
    //   where: {
    //     userId: req.decoded.id //req.decoded.user.id
    //   }
    // }]
    where: {
      
      name: req.body.eventgroup
    }
  }).then((group) => {


    db.Event.create({
      eventadmin: req.decoded.username,
      eventname: req.body.eventname,
      eventgroup: req.body.eventgroup,
      username: req.decoded.username,
      eventdate: req.body.eventdate,
      ongoingevent: false,
      players: group.friends
    }).then((event) => {
      res.status(200).json({
        message: "Successfully created group."
      })
    })


  })


});





//HTML Routes
//default route
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});


//main page route
router.get("/mainpage", authMiddleware, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});

//group page route
router.get("/group", authMiddleware, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/group.html"));
});

//event page route
router.get("/event", authMiddleware, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/event.html"));
});

//alt - login page route
router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

//newuser page route
router.get("/newuser", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/newuser.html"));
});


// verify token API
function authMiddleware(req, res, next) {
  // check cookie for auth parameter
  //Look for req.cookies.auth;
  var token = req.cookies.auth;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, "mySuperSecretSecureKey", function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    
    res.redirect('/login');

    //return res.status(403).send({
      //success: false,
      //message: 'No token provided.'
    //}), res.sendFile(path.join(__dirname, "../public/login.html"));

  }
}



module.exports = router;