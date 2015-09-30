var app = angular.module('QueuePlate')
app.controller('OrderDetailsCtrl', function($scope, restLandingService) {
  $scope.currentOrder = restLandingService.currentOrder;

})
