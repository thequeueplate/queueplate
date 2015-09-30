var app = angular.module('QueuePlate')

app.controller('RestaurantMenuCtrl', function($cookies, $scope, $stateParams, RID, RestaurantMenuService) {
	
	$scope.role = $cookies.getObject("role")
	console.log(RID)

	RestaurantMenuService.setRID(RID)
	
	RestaurantMenuService.getMenu(RID)
	.then(function(response) {

		$scope.menu = response[0]
	 	console.log($scope.menu)
})

})