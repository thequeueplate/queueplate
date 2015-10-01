var app = angular.module('QueuePlate')
app.controller('OrderDetailsCtrl', function($scope, restLandingService, loginService, cust) {
  console.log(cust);
  $scope.cust = cust.data;
  if($scope.currentOrder.status === 'Placed'){
  	$scope.disabled = true;
  }
  
  $scope.updateStatus = function(id, str) {
  	restLandingService.updateStatus(id, str)
  		.then(function(response){
  			if(str === 'Started'){
  				$scope.disabled = false;
  			}
  			updateOrders(str);
  		})
  }

  $scope.checkSwitches = function(arr, id){
  	for(var i = 0; i < arr.length; i++){
  		if(!arr[i].complete && $scope.currentOrder.status !== "Completed"){
  			return
  		}
  		if(i === (arr.length - 1)){
  			restLandingService.updateStatus(id, "Completed")
  				.then(function(response){
  					updateOrders('Completed');
  				})
  		}
  	}
  }

  $scope.outForDelivery = function(id) {
  	restLandingService.updateStatus(id, "Delivery")
  		.then(function(response){
  			updateOrders('Delivery')
  		})
  }

  function updateOrders(str){
		$scope.currentOrder.status = str;
		restLandingService.getOrders(loginService.getRestData().id)
			.then(function(response){
				$scope.orders = response;
			})
  }

});
