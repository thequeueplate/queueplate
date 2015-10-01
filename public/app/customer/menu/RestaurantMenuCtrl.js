var app = angular.module('QueuePlate')

app.controller('RestaurantMenuCtrl', function($scope, $stateParams, RID, RestaurantMenuService) {

	RestaurantMenuService.setRID(RID)
	
	RestaurantMenuService.getMenu(RID)
	.then(function(response) {
		$scope.menu = response[0]
})
	RestaurantMenuService.getRest(RID)
	.then(function(response) {
		$scope.rest = response
	})

})