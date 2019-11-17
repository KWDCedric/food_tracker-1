LOAD DATA INFILE "~/Desktop/final_data/food_category.csv"
INTO TABLE food_category
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


LOAD DATA INFILE "~/Desktop/final_data/food_new.csv"
INTO TABLE food
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


LOAD DATA INFILE "~/Desktop/final_data/branded_food.csv"
INTO TABLE branded_food
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


LOAD DATA INFILE "~/Desktop/final_data/nutrient.csv"
INTO TABLE nutrient
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


LOAD DATA INFILE "~/Desktop/final_data/food_nutrient.csv"
INTO TABLE food_nutrient
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


LOAD DATA INFILE "~/Desktop/final_data/calorie_conversion_factor.csv"
INTO TABLE food_calorie_conversion_factor
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


LOAD DATA INFILE "~/Desktop/final_data/nutrient_conversion_factor.csv"
INTO TABLE food_nutrient_conversion_factor
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;





