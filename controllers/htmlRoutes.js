var path = require("path");

// export below code to be utilized in other files
module.exports = function(app) {
    //HTML get requests to return html content based on the specific url route
    app.get("/", function(req,res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    
    app.get("/survey", function(req,res){
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    //wild card call to defualt back to homepage.
    app.get("*", function(req,res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

};

