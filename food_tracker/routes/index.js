var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../db-config.js');

/* ----- Connects to your mySQL database ----- */

var mysql = require('mysql');

var connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

/* ------------------------------------------- */
/* ----- Routers to handle FILE requests ----- */
/* ------------------------------------------- */

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

router.get('/search', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'search.html'));
});

// TODO: Part (1) - Add router for /friends page

// Template for a FILE request router:

// Specifies that when the app recieves a GET request at <PATH>,
// it should respond by sending file <MY_FILE>

router.get('/nutrition', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'nutrition.html'));
});

router.get('/recommendation', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'recommendation.html'));
});


/* ------------------------------------------------ */
/* ----- Routers to handle JSON data requests ----- */
/* ------------------------------------------------ */

/*

General Template for GET requests:

router.get('/routeName/:customParameter', function(req, res) {

  // Parses the customParameter from the path, and assigns it to variable myData
  var myData = req.params.customParameter;

  var query = '';

  console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // Returns the result of the query (rows) in JSON as the response
      res.json(rows);
    }
  });
});
*/

module.exports = router;
