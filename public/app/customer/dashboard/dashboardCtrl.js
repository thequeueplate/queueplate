var app = angular.module('QueuePlate')

app.controller('dashboardCtrl', function(UID, $scope, $cookies, dashboardService) {

   console.log(UID)

   $scope.userName = $cookies.getObject("userName")
   $scope.lastName =  $cookies.getObject("lastName")
   $scope.role = $cookies.getObject("role")
   $scope.addLine1 = $cookies.getObject("addLine1")
   $scope.addLine2 = $cookies.getObject("addLine2")
   $scope.addCity = $cookies.getObject("addCity")
   $scope.addState = $cookies.getObject("addState")
   $scope.addZip = $cookies.getObject("addZip")
   $scope.phoneNumber = $cookies.getObject("phoneNumber")
   $scope.id = $cookies.getObject("userid")
    
   // $scope.orders = dashboardService.FavDish()

   dashboardService.FavDish(UID).then(function(data){
      console.log(data)
      $scope.orders = data
   })

   // for (var i = 0; i < $scope.orders.length; i++) {
   //    for (var a = 0; a < $scope.orders[i].OrderItems.length; a++) {
   //       $scope.orders[i].OrderItems[a].quantity
   //    }
   // }
 });



