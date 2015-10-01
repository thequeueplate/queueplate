var app = angular.module('QueuePlate')

app.controller('discoverCtrl', function(discoverService, $scope, $state) {

    discoverService.restaurantsByName($scope.restaurants)
      .then(function(response) {
      console.log(response)

      $scope.restaurants = response;

      })


  $scope.filters = [
    {type: "City"},
    {type: "Restaurant Name"},
    {type: "Cuisine"}
  ]

  $scope.cuisines = ["American", "Cajun", "Caribbean", "Chinese", "French", "German", "Greek", "Indian", "Italian", "Korean", "Lebanese", "Mediterranean", "Mexican", "Moroccan", "Soul", "Thai", "Turkish", "Vietnamese", "Other"]
  
  $scope.selected = [];

      $scope.toggle = function (cuisine, list) {
        var idx = list.indexOf(cuisine);
        if (idx > -1) list.splice(idx, 1);
        else list.push(cuisine);
      };

      $scope.exists = function (cuisine, list) {
        return list.indexOf(cuisine) > -1;
      };

      $scope.takeToMenu = function(index, restId) {
        console.log(index)
    
        $scope.restaurantId = restId

        $scope.restId = {};

        $scope.restId.id = $scope.restaurants[index].id;

        console.log($scope.restId.id); 

        $state.go("RestaurantMenu", {restid: $scope.restId.id })

    }

});