var app = angular.module('QueuePlate')

app.controller('RestLandingCtrl', function($scope, $cookies, $rootScope, registerService, $state, loginService, restLandingService, restData, orders){
  console.log("THIS REST IS THE BEST",restData);
  console.log("ORDERS ORDASDFIPOJ", orders);
  $scope.goManage = function(){
    $state.go('ManageMenu')
  }

  $scope.restFirst = $cookies.getObject("restFirstName");
  $scope.role = $cookies.getObject("restRole")

  $scope.incomingOrders = orders;

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

  //This boi sets the current order AND the current user.
  $scope.selectedOrders = function(order) {
    console.log("this is the order!", order)
    restLandingService.getOrderUser(order.UserId)
      .then(function(response){
        $scope.user = response.data[0]
        console.log(response.data[0])
        restLandingService.setCurrentOrder(order)
          .then(function(response){
            console.log(response);
            $state.go('RestaurantLanding.orderDetails', {orderId: order.id});
          })
      })
  };

})
