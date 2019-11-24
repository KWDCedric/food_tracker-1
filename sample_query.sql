-- 1
SELECT DISTINCT F.description
FROM food F JOIN food_category C ON F.food_category_id = C.food_category_id 
WHERE C.description = 'dairy and egg products';

SELECT DISTINCT F.descMajor
FROM food F JOIN food_category C ON F.food_category_id = C.food_category_id 
WHERE C.descMajor = '';

-- 2
SELECT F.description, FN.amount*450/100
FROM food_nutrient FN JOIN food F ON FN.fdc_id = F.fdc_id JOIN nutrient N ON FN.nutrient_id = N.nutrient_id;

-- 3
WITH temp1 AS (
    SELECT F.description
    FROM food F JOIN food_category FC ON F. food_category_id = FC.food_category_id 
        JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id 
        JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
    WHERE FC.description LIKE '%snack%'
        AND N.name = 'protein'
        AND FN.amount > 20
    ORDER BY FN.amount DESC
)
SELECT T.description
FROM temp1 T
LIMIT 20;

-- 4
SELECT DISTINCT F.description 
FROM branded_food BF JOIN food F ON BF.fdc_id = F.fdc_id
WHERE BF.brand_owner = 'g. t. japan, inc.' AND BF.ingredients LIKE '%ice cream%';


-- 5
WITH nutrients AS 
(SELECT F.description, F.fdc_id, N.name, FN.amount
FROM food F JOIN food_category FC ON F.food_category_id = FC.food_category_id
    JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
    JOIN nutrient N ON FN.nutrient_id = N.nutrient_id),
sugar AS 
(SELECT fdc_id, description, amount AS sugar
FROM nutrients
WHERE name = 'sugars, total nlea'),
fiber AS
(SELECT fdc_id, description, amount AS fiber
FROM nutrients
WHERE name = 'fiber, total dietary')
SELECT sugar.description
FROM sugar JOIN fiber ON sugar.fdc_id = fiber.fdc_id
ORDER BY fiber DESC, sugar ASC;



-- 6
WITH temp_protein AS(
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
SELECT DISTINCT F.description
FROM food F JOIN temp1 T ON F.fdc_id = T.fdc_id
WHERE T.protein_value > 0.1
ORDER BY F.description; 


-- 7
var id = req.params.item.fdc_id;
var amount = req.params.item.amount;

WITH temp_protein AS(
    SELECT F.fdc_id, FN.amount*(amount/100) AS protein_value, FN.amount * CCF.protein_value *(amount/100) AS protein_calorie
    FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
            JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
            JOIN food_nutrient_conversion_factor NCF ON F.fdc_id = NCF.fdc_id
            JOIN food_calorie_conversion_factor CCF ON NCF.nutrient_conversion_id = CCF. nutrient_conversion_id
    WHERE N.name = 'protein' AND F.fdc_id=id
),
temp_fat AS(
    SELECT F.fdc_id, FN.amount*(amount/100) AS fat_value, FN.amount*CCF.fat_value*(amount/100) AS fat_calorie
    FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
            JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
            JOIN food_nutrient_conversion_factor NCF ON F.fdc_id = NCF.fdc_id
            JOIN food_calorie_conversion_factor CCF ON NCF.nutrient_conversion_id = CCF. nutrient_conversion_id
    WHERE N.name = 'carbohydrate, by summation' AND F.fdc_id=id
),
temp_carb AS(
    SELECT F.fdc_id, FN.amount*(amount/100) AS carbohydrate_value, FN.amount* CCF.carbohydrate_value*(amount/100) AS carbohydrate_calorie
    FROM food F JOIN food_nutrient FN ON F.fdc_id = FN.fdc_id
            JOIN nutrient N ON FN.nutrient_id = N.nutrient_id
            JOIN food_nutrient_conversion_factor NCF ON F.fdc_id = NCF.fdc_id
            JOIN food_calorie_conversion_factor CCF ON NCF.nutrient_conversion_id = CCF. nutrient_conversion_id
    WHERE N.name = 'total fat (nlea)' AND F.fdc_id=id
)
SELECT TP.fdc_id, TP.protein_value, TF.fat_value, TC.carbohydrate_value, (TP.protein_calorie+TF.fat_calorie+TC.carbohydrate_calorie) AS calorie
FROM temp_protein TP JOIN temp_fat TF ON TP.fdc_id = TF.fdc_id 
    JOIN temp_carb TC ON TP.fdc_id = TC.fdc_id













