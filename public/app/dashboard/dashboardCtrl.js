var app = angular.module('QueuePlate')

app.controller('dashboardCtrl', function($scope, $cookies) {
  
	$scope.cookiesFirstName = $cookies.getObject("firstName");
	$scope.cookiesLastName = $cookies.getObject("lastName");
  $scope.cookiesVerify = $cookies.getObject("verify");
  console.log($scope.cookiesVerify)

}); 

  // $scope.deliveryAddress = function(delivery) {
  //   // console.log(delivery);
  //   firstName= delivery.firstName,
  //   lastName= delivery.lastName,
  //   address= delivery.address,
  //   city= delivery.city,
  //   state= delivery.state,
  //   postalCode= delivery.postalCode
  // };


