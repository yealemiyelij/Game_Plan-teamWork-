//API Routes

var express = require('express')
var router = express.Router();
var path = require("path");

var app = express();
//var user = require("../models/module.js");

var db = require("../models");

//'api to check username and password to database, if username exists --> check password to value, if password matches --> grant token;
// if error--> route to login;'

//Authenticate API - login.onclick execute
router.post("/api/auth", function(req,res) {
  var userName = req.body.userName;
  var userPassword = req.body.password;
  
  /*
  db.Group.findAll().then((groups) => {

    res.json(groups);

  });
  */

  db.User.findOne({
    where: {
      username: userName,
      password: userPassword
    }
  }).then((user) => {

    if (user) {

      var token = "asldkjfalksdjflaksdjflkasjdfljasdf"; // This is where you'll make a JWT

      res.cookie("auth", token, {
        expires: new Date(Date.now() + (86400 * 14 * 1000)), //2 weeks
        maxAge: 86400 * 14 * 1000,
        httpOnly: true,
        secure: false // Doesn't need HTTPS
      });

      res.status(200).json(user);
    }else{
      res.status(404).json({
        message: 'User not found.'
      });
    }

  });



  /*
  user.user.selectWhere("username", req.body.userName,
    function(err, result) {
      if(err) {throw err};
      if (!result.username) {



        //could route back to login here....?
        res.json({success: false, message: 'Incorrect Username'})
      } else if(result.username) {
        if(result.password != req.body.password){
          res.json({ success: false, message: 'Incorrect Password'})
        } else if(result.password === req.body.password){
          const payload = {
            admin: result.userName 
          };
              var token = jwt.sign(payload, app.get('superSecret'), {
                expiresInMinutes: 1440 // expires in 24 hours
              });
      
              // return the information including token as JSON
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              });
            }   
        }
      });
      */


});



//create user api
router.post("/api/users", function (req, res) {
  
  db.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    birthdate: req.body.birthdate,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  }).then((user) => {

    res.json({ id: user.id });

  })
  
  /*
  user.create([
    "first_name", "last_name", "username", "birthdate", "email_address", "password", "primary_phone_number"
  ], [
    req.body.firstName, req.body.lastName, req.body.userName, req.body.birthdate, req.body.emailAddress, req.body.phoneNumber
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
  */

});

router.get("/api/groups", function(req, res) { //authMiddleware

    db.Group.findAll({
      include: [{
        model: db.UserGroup,
        required: true,
        where: {
          userId: 1 //req.decoded.user.id
        }
      }]
    }).then((groups) => {

      res.status(200).json(groups);

    });

});


//create group api
router.post("/api/groups", function (req, res) {

  //Use req.decoded.userid
  db.Group.create({
    name: req.body.name,
    type: req.body.type
  }).then((group) => {

    var usergroups = [];

    for(var i = 0; i < req.body.friends.length; i++){
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
router.post("/api/events", function (req, res) {
  group.create([
    "event_admin", "group_name", "event_name", "event_date", "private_event"
  ], [
    req.body.event_admin, req.body.group_name, req.body.event_name, req.body.event_date, req.body.private
  ], function(result) {
    // Send back the ID of the new quote

    res.sendFile(path.join(__dirname, "./groups.html"))
    //or?
    //res.json({ id: result.insertId });
  });
});





//HTML Routes
//default route
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname,"./login.html"));
});


//main page route
router.get("/mainPage", function (req, res) {
  res.sendFile(path.join(__dirname,"./mainPage.html"));
});



// verify token API
function authMiddleware(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  //Look for req.cookies.auth

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
}



module.exports = router;