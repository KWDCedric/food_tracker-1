# Food Tracker 

We finished all proposed features in project proposal and even add some fancy features! Every body worked hard and we hope you can enjoy it!

<img src="./photos/mainpage.jpg" alt="mainpage" style="zoom:50%;" />

## Collaborators: 
Wendi Kuang; Xuchen Wang; Yixue (Wendy) Feng; Yuezhan Tao

## Mentor TA:
Alice Deng

## Directory:

**food_tracker/final_data** contains cleaned data used in this project

**food_tracker/data_proprocessing** contains:

- sql: DDL statements for creating tables, load_data querys, sample query for previous project milestone
- Rmd: R file used to preprocessing data
- ipynb: ipynb file used to preprocessing data
- txt: command line script used to dump data out of local machine

**food_tracker/food_tracker** is the our whole application directory

## Dependencies:
We have generated a list of dependecies named **requirements.txt** in **food_tracker/requirements.txt**

## Instructions for building it locally:
You don't have to set up the database locally since we have migrated it into AWS.
1. Download the .zip file, upzip it.
2. Open a terminal and go to the application directory, which should be a **food_tracker** directory conataining files like db-config-aws.js, package.json.
3. use ```node app``` or ```nodemon app``` to start the server.
(Since we migrated the database to AWS, you don't have to set up it locally to run the application)
4. Now open your browser, use the url http://localhost:8081/ to access our application.

(You can also click here and we will take you there!) [food_tracker](http://localhost:8081/)
