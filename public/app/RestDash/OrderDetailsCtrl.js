var app = angular.module('QueuePlate')
app.controller('OrderDetailsCtrl', function($scope, restLandingService, cust) {
  console.log(cust);
  $scope.cust = cust.data;
  // $scope.currentOrder = restLandingService.currentOrder;

  $scope.updateStatus = function(id, str) {
  	restLandingService.updateStatus(id, str)
  		.then(function(response){
  			console.log("PUTTY PUTTY PUTTY", response)

  		})
  }

  console.log($scope.krang)

});
