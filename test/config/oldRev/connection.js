// This function is for creating function, holding two connections, 1: Heroku and 2: MySql
var mysql = require('mysql');
// Var connection is declared for exporting to the ORM.js file
var connection;
// The frist if condition is used to create connection to Heroku mysql database
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);

    // Else function is for creating mysql connection 
} else {
    connection = mysql.createConnection({
        port: process.env.PORT || 8080,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'Game_plan_db',
    });
};

connection.connect(function (error) {
    if (err) {
        console.error('error connecting: ' + error.stack);
        return;
    }
    console.log('The Game_plan_db is connected as id ' + connection.threadId);
});
// exporting connections to ORM
module.exports = connection;