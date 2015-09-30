var app = angular.module('QueuePlate')

app.controller('RestLandingCtrl', function($scope, $cookies, $rootScope, registerService, $state, loginService, restLandingService, restData, orders){
  console.log("THIS REST IS THE BEST",restData);
  console.log("ORDERS ORDASDFIPOJ", orders);
  $scope.goManage = function(){
    $state.go('ManageMenu')
  }
  $scope.name = $cookies.getObject("name")
  $scope.restFirst = $cookies.getObject("restFirstName");
  $scope.role = $cookies.getObject("restRole")
  $scope.lastName =  $cookies.getObject("lastName")
  $scope.role = $cookies.getObject("role")
  $scope.addLine1 = $cookies.getObject("addLine1")
  $scope.addLine2 = $cookies.getObject("addLine2")
  $scope.addCity = $cookies.getObject("addCity")
  $scope.addState = $cookies.getObject("addState")
  $scope.addZip = $cookies.getObject("addZip")
  $scope.phoneNumber = $cookies.getObject("phoneNumber")
  $scope.id = $cookies.getObject("userid")


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
