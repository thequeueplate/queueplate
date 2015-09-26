angular.module('QueuePlate').controller('MenuController', function($scope, loginService, MenuService, restData){

  var getMenuData = function() {
    MenuService.getMenu(restData.id)
      .then(function(response){
        $scope.menu = response.data[0]
        console.log($scope.menu)
      })
  }

  getMenuData();

  $scope.addSection = function() {
    MenuService.addSection(restData.id, $scope.menu.id, $scope.section)
      .then(function(response){
        $scope.section = {};
        getMenuData();
      })
  }

});
