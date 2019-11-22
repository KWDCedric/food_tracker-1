var express = require('express');
var router = express.Router();
var path = require('path');
// var config = require('../db-config.js');
var config = require('../db-config-aws.js');

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

router.get('/search1', function(req, res) {
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

// SELECT DISTINCT F.descMajor
// FROM food F JOIN food_category C ON F.food_category_id = C.food_category_id
// WHERE C.descMajor = '';
router.get('/search/:s', function(req, res) {
  // Parses the customParameter from the path, and assigns it to variable myData
  var myData = req.params.s;
  console.log(myData);
  // var query = `SELECT DISTINCT F.descMinor
  //             FROM food F
  //             WHERE descMajor LIKE '%${mydata}%'`;
  var query = `SELECT DISTINCT  F.descMajor, F.descMinor, F.fdc_id
              FROM food F
              WHERE lower(descMajor) LIKE '%` + myData + `%'
              LIMIT 20 `;

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // Returns the result of the query (rows) in JSON as the response
      res.json(rows);
    }
  });
});

router.get('/search1/:s', function(req, res) {
  // Parses the customParameter from the path, and assigns it to variable myData
  var myData = req.params.s;
  console.log(myData);
  // var query = `SELECT DISTINCT F.descMinor
  //             FROM food F
  //             WHERE descMajor LIKE '%${mydata}%'`;
  var query = `SELECT FN.amount, N.name
              FROM food_nutrient FN JOIN food F ON FN.fdc_id = F.fdc_id
              JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
              WHERE F.fdc_id = ` + myData + ` AND N.name NOT LIKE '%:%'`;

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // Returns the result of the query (rows) in JSON as the response
      res.json(rows);
    }
  });
});

router.get('/nutrition/:s', function(req, res) {
  // Parses the customParameter from the path, and assigns it to variable myData
  var myData = req.params.s;
  console.log(myData);
  // var query = `SELECT DISTINCT F.descMinor
  //             FROM food F
  //             WHERE descMajor LIKE '%${mydata}%'`;
  var query = `SELECT DISTINCT F.descMajor, F.descMinor, F.fdc_id
              FROM food F
              WHERE lower(descMajor) LIKE '%` + myData + `%'
              LIMIT 20 `;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // Returns the result of the query (rows) in JSON as the response
      res.json(rows);
    }
  });
});

router.get('/recommendation/:min/:max/:name', function(req, res) {
  // Parses the customParameter from the path, and assigns it to variable myData
  var myData_min = req.params.min;
  var myData_max = req.params.max;
  var myData_name = req.params.name.toLowerCase();
  // console.log(req.params);
  // console.log(myData_min);
  // console.log(myData_max);
  // console.log(myData_name);
  var query = `WITH temp_protein AS(
    SELECT F.fdc_id, FN.amount * CCF.protein_value AS protein_value
    FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
            JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
            JOIN food_nutrient_conversion_factor NCF ON F.fdc_id = NCF.fdc_id
            JOIN food_calorie_conversion_factor CCF ON NCF.nutrient_conversion_id = CCF. nutrient_conversion_id
    WHERE N.name = 'protein'
),
temp_fat AS(
    SELECT F.fdc_id, FN.amount*CCF.fat_value AS fat_value
    FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
            JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
            JOIN food_nutrient_conversion_factor NCF ON F.fdc_id = NCF.fdc_id
            JOIN food_calorie_conversion_factor CCF ON NCF.nutrient_conversion_id = CCF. nutrient_conversion_id
    WHERE N.name = 'carbohydrate, by summation'
),
temp_carb AS(
    SELECT F.fdc_id, FN.amount* CCF.carbohydrate_value AS carbohydrate_value
    FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
            JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
            JOIN food_nutrient_conversion_factor NCF ON F.fdc_id = NCF.fdc_id
            JOIN food_calorie_conversion_factor CCF ON NCF.nutrient_conversion_id = CCF. nutrient_conversion_id
    WHERE N.name = 'total fat (nlea)'
),
temp1 AS(
	SELECT TP.fdc_id,
        TP.protein_value/(TP.protein_value+TF.fat_value+TC.carbohydrate_value) AS protein_value,
        TF.fat_value/(TP.protein_value+TF.fat_value+TC.carbohydrate_value) AS fat_value,
        TC.carbohydrate_value/(TP.protein_value+TF.fat_value+TC.carbohydrate_value) AS carbohydrate_value
    FROM temp_protein TP JOIN temp_fat TF ON TP.fdc_id = TF.fdc_id
        JOIN temp_carb TC ON TP.fdc_id = TC.fdc_id
)
SELECT DISTINCT F.descMajor
FROM food F JOIN temp1 T ON F.fdc_id = T.fdc_id
WHERE T.`+myData_name+`_value >= `+myData_min+`
ORDER BY F.descMajor;

`;

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // Returns the result of the query (rows) in JSON as the response
      res.json(rows);
    }
  });
});


module.exports = router;
