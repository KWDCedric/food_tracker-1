var app = angular.module("FoodTracker", []);

app.controller('searchController', function($scope, $http) {

  $scope.searchMajorDesc = function(){
    $http({
      url:'/search/' + $scope.major_desc,
      method: 'GET'
    }).then(res => {
      console.log("Search Click: ", res.data);
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
      console.log("Search Click: ", res.data);
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
      console.log("Search Click: ", res.data);
      $scope.items = res.data;
      $scope.selectedItem = res.data[0];
    }, err => {
      console.log("Search Click ERROR: ", err);
    });
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
