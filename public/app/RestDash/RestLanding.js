app.controller('RestLanding', function($scope, $rootScope, registerService, $state, loginService){

  $scope.getMenu = function() {
    mainService.getMenu()
      .then(function(response){
        $scope.menu = angular.copy(response);
        console.log($scope.menu);
        if(!$scope.menu.Course) $scope.menu.Course = [];
        if(!$scope.menu.name) $scope.menu.name = [];
        if(!$scope.menu.description) $scope.menu.description = [];
        if(!$scope.menu.price) $scope.menu.price = [];
      })
  }

  $scope.menu = {
    name:[],
    description: [],
    price: 0,
    addCourse: ''
  }




  $scope.courses = [
    {type: "appetizer"},
    {type:"Main Course"},
    {type:"Dessert"}
  ]

  /////////////// Course ////////////
  $scope.addCourse = function(idx){
    $scope.menu.Course.push({});
  }
  $scope.removeCourse = function(idx){
    $scope.menu.Course.splice(idx, 1);
  }

  /////////////// Course ////////////
  $scope.addName = function(idx){
    $scope.menu.name.push({});
  }
  $scope.removeName = function(idx){
    $scope.menu.name.splice(idx, 1);
  }

  /////////////// Course ////////////
  $scope.addDescription = function(idx){
    $scope.menu.description.push({});
  }
  $scope.removeDescription = function(idx){
    $scope.menu.description.splice(idx, 1);
  }

  /////////////// Course ////////////
  $scope.addPrice = function(idx){
    $scope.menu.price.push({});
  }
  $scope.removePrice = function(idx){
    $scope.menu.price.splice(idx, 1);
  }


})
