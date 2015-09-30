var app = angular.module('QueuePlate')
app.controller('OrderDetailsCtrl', function($scope, restLandingService, loginService, cust) {
  console.log(cust);
  $scope.cust = cust.data;
  // $scope.currentOrder = restLandingService.currentOrder;

  $scope.updateStatus = function(id, str) {
  	restLandingService.updateStatus(id, str)
  		.then(function(response){
  			console.log("PUTTY PUTTY PUTTY", response);
  			updateOrders(str);
  		})
  }

  $scope.checkSwitches = function(arr, id){
  	for(var i = 0; i < arr.length; i++){
  		if(!arr[i].complete && $scope.currentOrder.status !== "Completed"){
  			console.log("nooooop.")
  			return
  		}
  		if(i === (arr.length - 1)){
  			restLandingService.updateStatus(id, "Completed")
  				.then(function(response){
  					console.log("AWWWWW YEAH, BOI! PUTTY MCNUTTY!!!!", response)
  					updateOrders('Completed');
  				})
  		}
  	}
  }

  function updateOrders(str){
		$scope.currentOrder.status = str;
		restLandingService.getOrders(loginService.getRestData().id)
			.then(function(response){
				$scope.orders = response;
			})
  }

});
