var app = angular.module('QueuePlate')




app.controller('RestLandingCtrl', function($scope, $cookies, $rootScope, registerService, $state, loginService, restLandingService){


  $scope.restFirst = $cookies.getObject("restFirstName");
  $scope.role = $cookies.getObject("restRole")




  $scope.incomingOrders = [];

  // $scope.order = {
  //   name: order.name,
  //   address: order.address,
  //   phone: order.phone,
  //   dishes: [],
  //   comments: order.comments
  // };

  // $scope.selectedOrders = function(order) {
  //   $scope.sampleOrders = order;
  //   console.log(order);
  // };

  $scope.selectedOrders = function(order) {
    console.log(order)
    restLandingService.setCurrentOrder(order)
      .then(function(response){
        console.log(response);
        $state.go('RestaurantLanding.orderDetails', {orderId: order.id});
      })
  };

  $scope.sampleOrders = restLandingService.sampleOrders;



})
