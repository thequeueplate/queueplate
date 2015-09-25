app.controller('RestLandingCtrl', function($scope, $rootScope, registerService, $state, loginService){

  $scope.getMenu = function() {
    mainService.getMenu()
      .then(function(response){
        $scope.MenuItem = angular.copy(response);
        console.log($scope.MenuItem);
        if(!$scope.MenuItem.Course) $scope.MenuItem.Course = [];
        if(!$scope.MenuItem.name) $scope.MenuItem.name = [];
        if(!$scope.MenuItem.description) $scope.MenuItem.description = [];
        if(!$scope.MenuItem.price) $scope.MenuItem.price = [];
      })
  }

  $scope.MenuItems = []

  // $scope.MenuItem = {
  //   name:[],
  //   description: [],
  //   price: 0,
  //   addCourse: ''
  // }




  $scope.courses = [
    {type: "appetizer"},
    {type:"Main Course"},
    {type:"Dessert"}
  ]

  /////////////// Course ////////////
  $scope.addMenuItem = function(idx){
    $scope.MenuItems.push({});
  }
  $scope.removeMenuItem = function(idx){
    $scope.MenuItems.splice(idx, 1);
  }

  /////////////// Course ////////////
  $scope.addName = function(idx){
    $scope.MenuItem.name.push({});
  }
  $scope.removeName = function(idx){
    $scope.MenuItem.name.splice(idx, 1);
  }

  /////////////// Course ////////////
  $scope.addDescription = function(idx){
    $scope.MenuItem.description.push({});
  }
  $scope.removeDescription = function(idx){
    $scope.MenuItem.description.splice(idx, 1);
  }

  /////////////// Course ////////////
  $scope.addPrice = function(idx){
    $scope.MenuItem.price.push({});
  }
  $scope.removePrice = function(idx){
    $scope.MenuItem.price.splice(idx, 1);
  }


})
