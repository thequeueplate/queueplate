var app = angular.module('QueuePlate')
app.controller('OrderDetailsCtrl', function($scope, restLandingService) {
  $scope.selectedOrder = restLandingService.currentOrder;
  console.log($scope.selectedOrder)
  console.log("currentOrder, boiz")
  $scope.mark = 'perviBoi';
})
