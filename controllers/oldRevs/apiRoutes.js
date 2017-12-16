var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
        console.log("app.get is working")
    })

    console.log("in between is working... module.exports function");
    //send a POST request to handle the users submission of data and route the data to the appropriate js array
    
    
    app.post("/api/friends", function(req, res){

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
          };
      
          // Here we take the result of the user"s survey POST and parse it.
          var userData = req.body;
          var userScores = req.body.scores;
      
          // This variable will calculate the difference between the user"s scores and the scores of
          // each user in the database
          var totalDifference;
      
          // Here we loop through all the friend possibilities in the database.
          for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;
      
            console.log(currentFriend.name);
      
            // We then loop through all the scores of each friend
            for (var j = 0; j < currentFriend.scores.length; j++) {
              var currentFriendScore = currentFriend.scores[j];
              var currentUserScore = userScores[j];
      
              // We calculate the difference between the scores and sum them into the totalDifference
              totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }
      
            // If the sum of differences is less then the differences of the current "best match"
            if (totalDifference <= bestMatch.friendDifference) {
              // Reset the bestMatch to be the new friend.
              bestMatch.name = currentFriend.name;
              bestMatch.photo = currentFriend.photo;
              bestMatch.friendDifference = totalDifference;
            }
          }

        friends.push(userData);
        console.log("One friend in data-base: " + friends[0].name);
        res.json(bestMatch);
        console.log("app.post is working");
        console.log("req.body is: " + req.body.name);
    });

};