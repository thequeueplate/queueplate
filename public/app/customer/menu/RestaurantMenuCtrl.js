var app = angular.module('QueuePlate')

app.controller('RestaurantMenuCtrl', function($cookies, $scope, $stateParams, RID, UID, RestaurantMenuService) {
	
	
	$scope.createOrder = function() {
		
		RestaurantMenuService.order(RID, UID)

			.then(function(response) {
				console.log(response)

				$scope.orderData = {};

			})
	}

	$scope.role = $cookies.getObject("role")
	console.log(RID)

	RestaurantMenuService.setRID(RID)
	
	RestaurantMenuService.getMenu(RID)
	.then(function(response) {

		$scope.menu = response[0]
	 	console.log($scope.menu)
})
	RestaurantMenuService.getRest(RID)
	.then(function(response) {
		$scope.rest = response
		console.log($scope.rest);
	})

})