var app = angular.module('QueuePlate')

app.controller('RestaurantMenuCtrl', function($cookies, $scope, $stateParams, RID, RestaurantMenuService) {
	
	$scope.AddDishToOrder = function(orderAmount, id) {
		if(!$scope.orderData) {
			$scope.orderData = $cookies.getObject("orderData")
		}
		
		RestaurantMenuService.addToOrder(orderAmount, id, $scope.orderData.data.id).then(function(){
			Materialize.toast("You have added a dish to your order!", 2000)
		})
	}

	$scope.createOrder = function() {
		
		console.log(RID)

		RestaurantMenuService.order(RID)

			.then(function(response) {
				console.log(response)

				$scope.orderData = response
				$cookies.putObject("orderData", response)

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