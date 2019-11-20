var app = angular.module("FoodTracker", []);

app.controller('searchController', function($scope, $http) {
  // TODO: Q1
  // $http({
  //   url: '/search',
  //   method: 'GET'
  // }).then(res => {
  //   console.log("Search: ", res.data);
  //   $scope. = res.data;
  // }, err => {
  //   console.log("Search ERROR: ", err);
  // });

  $scope.searchMajorDesc = function(){
    $http({
      url:'/search/' + $scope.major_desc,
      method: 'GET'
    }).then(res => {
      console.log("Search Click: ", res.data);
      // $scope.major_desc = res.data;
      $scope.MinorDesc = res.data;
      // $scope.MinorDesc = res.data;
    }, err => {
      console.log("Search Click ERROR: ", err);
    });
  }
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
