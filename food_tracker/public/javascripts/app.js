var app = angular.module("FoodTracker", []);

app.filter('capitalize', function() {
  return function(input) {
    return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
  }
});

app.controller('homepageController', function($scope, $http) {
  $http({
        url: '/category1/sql',
        method: 'GET'
      }).then(res => {
        console.log("category1: ", res.data);
        var random =  Math.floor((Math.random() * res.data.length));
        console.log(res.data[random]);
        $scope.egg = res.data[random];
      }, err => {
        console.log("Category 1 ERROR: ", err);
      });
 

  $http({
    url: '/category2/sql',
    method: 'GET'
  }).then(res => {
    console.log("category2: ", res.data);
    var random =  Math.floor((Math.random() * res.data.length));
    console.log(res.data[random]);
    $scope.vege = res.data[random];
  }, err => {
    console.log("Category 2 ERROR: ", err);
  });

  $http({
    url: '/category3/sql',
    method: 'GET'
  }).then(res => {
    console.log("category3: ", res.data);
    var random =  Math.floor((Math.random() * res.data.length));
    console.log(res.data[random]);
    $scope.meat = res.data[random];
  }, err => {
    console.log("Category 3 ERROR: ", err);
  });

  $http({
    url: '/category4/sql',
    method: 'GET'
  }).then(res => {
    console.log("category4: ", res.data);
    var random =  Math.floor((Math.random() * res.data.length));
    console.log(res.data[random]);
    $scope.snacks = res.data[random];
  }, err => {
    console.log("Category 4 ERROR: ", err);
  });

  $http({
    url: '/category5/sql',
    method: 'GET'
  }).then(res => {
    console.log("category5: ", res.data);
    var random =  Math.floor((Math.random() * res.data.length));
    console.log(res.data[random]);
    $scope.fastfood = res.data[random];

  }, err => {
    console.log("Category 5 ERROR: ", err);
  });

  $http({
    url: '/category6/sql',
    method: 'GET'
  }).then(res => {
    console.log("category6: ", res.data);
    var random =  Math.floor((Math.random() * res.data.length));
    console.log(res.data[random]);
    $scope.beverages = res.data[random];
  }, err => {
    console.log("Category 6 ERROR: ", err);
  });

});


app.controller('searchController', function($scope, $http) {

  $scope.searchMajorDesc = function(){
    $http({
      url:'/search/' + $scope.major_desc,
      method: 'GET'
    }).then(res => {
      console.log("Search major Click: ", res.data);
      $scope.items = res.data;
      $scope.selectedItem = res.data[0];
    }, err => {
      console.log("Search Click ERROR: ", err);
    });
  };

  $scope.searchMinorDesc = function(){
    $http({
      url:'/search1/' + $scope.selectedItem.fdc_id,
      method: 'GET'

    }).then(res => {
      var selectedItem = $scope.selectedItem;
      console.log("Search minor Click: ", res.data);
      $scope.nutrients = res.data;
      $scope.selectedItem = selectedItem;
      console.log("Selected Item： ", $scope.selectedItem);
    }, err => {
      console.log("Search Click ERROR: ", err);
    });
  }
});

app.controller('recommendController', function($scope, $http) {
  console.log("reached")
  console.log($scope.calorie)
  $scope.submitIds = function(){
    $http({
      url:'/recommendation/' + $scope.min + '/' + $scope.max + '/' + $scope.calorie,
      method: 'GET'
    }).then(res => {
      console.log($scope.calorie)
      console.log("Recommendation: ", res.data);
      $scope.food = res.data;
      // $scope.items = res.data;
      // $scope.selectedItem = res.data[0];
    }, err => {
      console.log("Recommendation ERROR: ", err);
    });
  };
});

app.controller('nutritionSearchController', function($scope, $http, $q) {
  // console.log($scope.calorie)

  $scope.foodList = [];

  $scope.searchFood = function(){
    $http({
      url:'/nutrition/' + $scope.description,
      method: 'GET'
    }).then(res => {
      console.log("Nutrition search click: ", res.data);
      $scope.foodItems = res.data;
      // $scope.selectedItem = res.data[0];
    }, err => {
      console.log("Nutrition search click ERROR: ", err);
    });
  };

  $scope.addFood = function(food){
    console.log("Adding to list: ", food);
    $scope.foodList.push(food);
  };

  $scope.deleteFood = function(myfood){
    console.log("Deleting from list: ", myfood);
    var index = $scope.foodList.indexOf(myfood);
    $scope.foodList.splice(index, 1);   
  };

  $scope.computeNutrient = function(){
    // console.log("amount: ", $scope.foodList);
    // var amount = $scope.amount
    var protein_value = 0;
    var fat_value = 0;
    var carbohydrate_value = 0;
    var promises = [];
    for(var i = 0; i < $scope.foodList.length; i++) {
      // range.push(i);
      console.log($scope.foodList);
      promises.push(
      $http({
        url:'/nutrition1/' + $scope.foodList[i].fdc_id + '/' + $scope.foodList[i].amount,
        method: 'GET'
      }).then(res => {
        console.log("Compute Nutrient click: ", res.data);
        // $scope.foodItems = res.data;
        // console.log(res.data[0].carbohydrate_value)
        carbohydrate_value = carbohydrate_value + res.data[0].carbohydrate_value
        protein_value = protein_value + res.data[0].protein_value
        fat_value = fat_value + res.data[0].fat_value
        // console.log(res.data[0])
        // $scope.selectedItem = res.data[0];
        // console.log("curr:", carbohydrate_value, protein_value, fat_value);
      }, err => {
        console.log("Compute Nuterient click ERROR: ", err);
      }))
    }

    $q.all(promises).then(function(results){
      console.log("final:", protein_value, fat_value, carbohydrate_value);
      $scope.protein = protein_value;
      $scope.fat = fat_value;
      $scope.carbohydrate = carbohydrate_value;
    })
  };



});




// app.controller('homeController', function($scope, $http) {
//   $http({
//     url: '/people',
//     method: 'GET'
//   }).then(res => {
//     console.log("PEOPLE: ", res.data);
//     $scope.people = res.data;
//   }, err => {
//     console.log("People ERROR: ", err);
//   });
// });

// app.controller('findFriendsController', function($scope, $http) {
//   $scope.submitLogin = function() {
//     // TODO: Part (3) - Add an HTTP request to this function (see lines 4-12 above for reference)
//     $http({
//       url: '/friends/' + $scope.login,
//       method: 'GET'
//     }).then(res => {
//       console.log("FRIENDS: ", res.data);
//       $scope.friends = res.data;
//     }, err => {
//       console.log("Friends ERROR: ", err);
//     });
//   }
// });


// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
