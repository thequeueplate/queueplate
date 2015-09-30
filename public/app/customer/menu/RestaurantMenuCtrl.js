var app = angular.module('QueuePlate')

app.controller('RestaurantMenuCtrl', function($scope, $stateParams, RID, RestaurantMenuService) {
	
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