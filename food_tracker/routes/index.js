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

router.get('/category1', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

router.get('/category2', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

router.get('/category3', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

router.get('/category4', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

router.get('/category5', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

router.get('/category6', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

router.get('/search', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'search.html'));
});

router.get('/search1', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'search.html'));
});


router.get('/nutrition', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'nutrition.html'));
});

router.get('/nutrition1', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'nutrition.html'));
});

router.get('/recommendation', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'recommendation.html'));
});


/* ------------------------------------------------ */
/* ----- Routers to handle JSON data requests ----- */
/* ------------------------------------------------ */

router.get('/category1/sql', function(req, res) {
  // Parses the customParameter from the path, and assigns it to variable myData
  // var myData = req.params.s;
  console.log("gkcekckevgwk");
  var query = `SELECT DISTINCT descMajor
               FROM food
               WHERE food_category_id = 1 AND LENGTH(descMajor)< 30 `;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/category2/sql', function(req, res) {
  
  var query = `SELECT DISTINCT descMajor
               FROM food
               WHERE food_category_id = 11 AND LENGTH(descMajor)<30 AND descMajor NOT REGEXP '[0-9]+' `;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/category3/sql', function(req, res) {
  
  var query = `SELECT DISTINCT descMajor
               FROM food
               WHERE food_category_id = 10 or food_category_id = 13 or food_category_id = 17 AND LENGTH(descMajor)<30`;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/category4/sql', function(req, res) {

  var query = `SELECT DISTINCT descMajor
               FROM food
               WHERE food_category_id = 23 AND LENGTH(descMajor)<30`;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/category5/sql', function(req, res) {
  var query = `SELECT DISTINCT descMajor
               FROM food
               WHERE food_category_id = 21 AND LENGTH(descMajor)<30`;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/category6/sql', function(req, res) {
  var query = `SELECT DISTINCT descMajor
               FROM food
               WHERE food_category_id = 14 AND LENGTH(descMajor)<30`;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});


router.get('/search/:s', function(req, res) {
  var myData = req.params.s;
  console.log(myData);
  var query = `SELECT DISTINCT F.descMajor, F.descMinor, F.fdc_id
              FROM food F
              WHERE lower(descMajor) LIKE '%` + myData + `%'
              LIMIT 20 `;

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/search1/:s', function(req, res) {
  var myData = req.params.s;
  console.log(myData);
  var query = `SELECT FN.amount, N.name
              FROM food_nutrient FN JOIN food F ON FN.fdc_id = F.fdc_id
              JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
              WHERE F.fdc_id = ` + myData + ` AND N.name NOT LIKE '%:%'`;

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/nutrition/:s', function(req, res) {
  var myData = req.params.s;
  console.log(myData);
  var query = `SELECT DISTINCT F.descMajor, F.descMinor, F.fdc_id
              FROM food F
              WHERE lower(descMajor) LIKE '%` + myData + `%'
              LIMIT 20 `;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/nutrition1/:id/:amount', function(req, res) {
  var id = req.params.id;
  var amount = req.params.amount;
  console.log(id);
  console.log(amount);
  var query = `
  WITH temp_protein AS(
      SELECT F.fdc_id, FN.amount*(`+amount+`/100) AS protein_value
      FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
              JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
      WHERE N.name = 'protein' AND F.fdc_id=`+id+`
  ),
  temp_fat AS(
      SELECT F.fdc_id, FN.amount*(`+amount+`/100) AS fat_value
      FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
              JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
      WHERE N.name = 'carbohydrate, by difference' AND F.fdc_id=`+id+`
  ),
  temp_carb AS(
      SELECT F.fdc_id, FN.amount*(`+amount+`/100) AS carbohydrate_value
      FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
              JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
      WHERE N.name = 'total lipid (fat)' AND F.fdc_id=`+id+`
  )
  SELECT TP.fdc_id, TP.protein_value, TF.fat_value, TC.carbohydrate_value
  FROM temp_protein TP JOIN temp_fat TF ON TP.fdc_id = TF.fdc_id
      JOIN temp_carb TC ON TP.fdc_id = TC.fdc_id `;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.get('/recommendation/:min/:max/:name', function(req, res) {
  var myData_min = (req.params.min / 100);
  var myData_max = (req.params.max / 100);
  var myData_name = req.params.name.toLowerCase();
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
    WHERE N.name = 'total lipid (fat)'
),
temp_carb AS(
    SELECT F.fdc_id, FN.amount* CCF.carbohydrate_value AS carbohydrate_value
    FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
            JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
            JOIN food_nutrient_conversion_factor NCF ON F.fdc_id = NCF.fdc_id
            JOIN food_calorie_conversion_factor CCF ON NCF.nutrient_conversion_id = CCF. nutrient_conversion_id
    WHERE N.name = 'carbohydrate, by difference'
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
WHERE T.`+myData_name+`_value >= `+myData_min+` AND T.`+myData_name+`_value <= `+myData_max+`
ORDER BY F.descMajor;

`;

  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});


module.exports = router;
