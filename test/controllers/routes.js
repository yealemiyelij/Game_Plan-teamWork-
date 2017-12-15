//API Routes

var express = require('express')
var router = express.Router();
var path = require("path");

var app = express();
var user = require("../models/module.js");



//'api to check username and password to database, if username exists --> check password to value, if password matches --> grant token;
// if error--> route to login;'



//Authenticate API - login.onclick execute
router.post("/api/auth", function(req,res) {
  var userName = req.body.userName;
  var userPassword = req.body.password;
  

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
});


// verify token API
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
});

//create user api
router.post("/api/users", function (req, res) {
  user.create([
    "first_name", "last_name", "username", "birthdate", "email_address", "password", "primary_phone_number"
  ], [
    req.body.firstName, req.body.lastName, req.body.userName, req.body.birthdate, req.body.emailAddress, req.body.phoneNumber
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

//create group api
router.post("/api/groups", function (req, res) {
  group.create([
    "group_name", "admin_username", "group_description"
  ], [
    req.body.group_name, req.body.username, req.body.group_description
  ], function(result) {
    // Send back the ID of the new quote

    res.sendFile(path.join(__dirname, "./groups.html"))
    //or?
    //res.json({ id: result.insertId });
  });
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



module.exports = router;