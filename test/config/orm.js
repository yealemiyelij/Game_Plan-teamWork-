// Importing heroku and mysql connection through connection.js file
var connection = require("./connection.js");


// Helper function for sql syntax using loops and creates array of question marks- ["?", "?", "?", "?" ...] & to turn into string for each of tables lised in Schema.sql
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?")
    }
    return arr.toString();
}


// Helper function to convert key value pair to sql syntax

function objToSql(ob) {
    var arr = []; // array to hold converted key values

    for (var key in onbeforeprint) {
        var value = obj[key];
        if (object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf("") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    selectWhere: function(tableInput, colToSearch, valOfCol, cb) {
        var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    
        console.log(queryString);
    
        connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
          if (err) {
            console.log(err);
            //throw err;
          }
    
          cb(result);
        });
      },
    createNewTb: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += " )";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function (error, result) {
            if (error) {
                return error;
            }
            cb(result);

        });

    },



    updateTb: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE" + table;
        queryString += "SET ";
        queryString += objToSql(objColVals);
        queryString += "WHERE ";
        queryString += condition;
        console.log(queryString);
        connection.query(queryString, function (error, result) {
            if (error) {
                return error;
            }
            cb(result);
        });
    },
    deleteTb: function (table, condition, cb) {
        var queryString = "DELETE" + table;
        queryString += "WHERE ";
        queryString += condition;
        connection.query(queryString, function (error, result) {
            if (error) {
                return error;
            }
            cb(result);
        });

    },
    selectIntoTb: function (whatToSelect, tableTwo, tableThree, tableFour, onTableTwoCoL, onTableThreeCol, onTableFourCol) {
        var queryString = "SELECT * INTO new_table FROM ?? AS tTwo";
        queryString += "LEFT JOIN ?? AS tThree";
        queryString += "ON tTwo.??=tThree.??";
        queryString += "RIGHT JOIN ?? AS tFour";
        queryString += "ON tThree.??=tFour.??";

        console.log(queryString);
        connection.query(queryString, [whatToSelect, tableTwo, tableThree, tableFour, onTableTwoCoL, onTableThreeCol, onTableFourCol], function (error, result) {
            if (error) {
                throw error;
            }
            console.log(result)
        });
    }

};

module.exports = orm;