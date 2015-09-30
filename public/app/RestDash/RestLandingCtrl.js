var app = angular.module('QueuePlate')

app.controller('RestLandingCtrl', function($scope, $cookies, $rootScope, registerService, $state, loginService, restLandingService, restData){
  $scope.goManage = function(){
    $state.go('ManageMenu')
  }

  $scope.restFirst = $cookies.getObject("restFirstName");
  $scope.role = $cookies.getObject("restRole");

  restLandingService.getOrders(restData.id)
    .then(function(results){
      $scope.orders = results;
    })

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

  $scope.selectedOrder = function(order) {
    console.log("ORDER ORDER ORDER ORDER", order)
    restLandingService.setCurrentOrder(order)
      .then(function(response){
        console.log(response);
        $scope.currentOrder = response
        $state.go('RestaurantLanding.orderDetails', {orderId: order.id});
      })
  };

  // $scope.orders = restLandingService.getOrders()

  // $scope.sampleOrders = restLandingService.sampleOrders;


})
