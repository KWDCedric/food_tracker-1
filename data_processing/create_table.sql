-- 1
CREATE TABLE food_category(
food_category_id INT NOT NULL,
            description VARCHAR(40),
            PRIMARY KEY(food_category_id));

CREATE TABLE food_category4(
food_category_id VARCHAR(10),
            description VARCHAR(1024),
            PRIMARY KEY(food_category_id));

-- 2
CREATE TABLE food(
fdc_id INT NOT NULL, 
            description VARCHAR(255),
            food_category_id INT,
            PRIMARY KEY(fdc_id),
            FOREIGN KEY(food_category_id)
            	REFERENCES food_category(food_category_id));

-- 3
CREATE TABLE branded_food(
fdc_id INT NOT NULL,
            brand_owner VARCHAR(100),
            ingredients VARCHAR(5000),
            serving_size DECIMAL(10, 3),
            serving_size_unit VARCHAR(5),
            PRIMARY KEY(fdc_id),
            FOREIGN KEY(fdc_id)
            	REFERENCES food(fdc_id));

-- 4
CREATE TABLE nutrient(
nutrient_id INT NOT NULL,
name VARCHAR(50),
unit_name VARCHAR(10),
PRIMARY KEY(nutrient_id) 
);


-- 5
CREATE TABLE food_nutrient(
fdc_id INT NOT NULL,
nutrient_id INT NOT NULL,
amount DECIMAL(15, 5),
PRIMARY KEY(fdc_id, nutrient_id),
FOREIGN KEY(fdc_id) 
REFERENCES food(fdc_id),
FOREIGN KEY(nutrient_id) 
REFERENCES nutrient(nutrient_id)
);


-- 6 
CREATE TABLE food_calorie_conversion_factor(
nutrient_conversion_id INT NOT NULL, 
 	protein_value DECIMAL(10, 3),
  	fat_value DECIMAL(10, 3), 
  	carbohydrate_value DECIMAL(10, 3),
  	PRIMARY KEY(nutrient_conversion_id) 
);

-- 7 Old
-- CREATE TABLE food_nutrient_conversion_factor(
-- nutrient_conversion_id INT NOT NULL,
-- fdc_id INT NOT NULL,
-- PRIMARY KEY(nutrient_conversion_id, fdc_id), 
-- FOREIGN KEY(fdc_id) 
-- REFERENCES food(fdc_id),
-- FOREIGN KEY(nutrient_conversion_id) 
-- REFERENCES food_calorie_conversion_factor(nutrient_conversion_id)
 
-- );

-- 7 Current approach:
CREATE TABLE food_nutrient_conversion_factor(
nutrient_conversion_id INT NOT NULL,
fdc_id INT NOT NULL,
PRIMARY KEY(nutrient_conversion_id, fdc_id), 
FOREIGN KEY(fdc_id) 
REFERENCES food(fdc_id)
);

