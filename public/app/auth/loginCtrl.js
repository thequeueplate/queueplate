var app = angular.module('QueuePlate')

app.controller('loginCtrl', function($window, $state, $rootScope, loginService, $scope, $cookies) {


	$rootScope.loggedIn = false
	 if ($cookies.getObject("role"))
	 $rootScope.loggedIn = true
	 $scope.name = $cookies.getObject("name") 
	 $scope.userName = $cookies.getObject("userName")
	 $scope.lastName =  $cookies.getObject("lastName")
	 $rootScope.role = $cookies.getObject("role")
	 $scope.addLine1 = $cookies.getObject("addLine1")
	 $scope.addLine2 = $cookies.getObject("addLine2")
	 $scope.addCity = $cookies.getObject("addCity")
	 $scope.addState = $cookies.getObject("addState")
	 $scope.addZip = $cookies.getObject("addZip")
	 $scope.phoneNumber = $cookies.getObject("phoneNumber")
	 $scope.userid = $cookies.getObject("userid")
	 
	$scope.doLogin = function() {

		$scope.processing = true;

		$scope.error = '';

		loginService.login($scope.loginData.email, $scope.loginData.password)
			.then(function(data) { 
				if (data.message === "Invalid Password") {
					console.log(data.message)
					Materialize.toast('Invalid Password', 1000)
				} else {
		loginService.getUser()
			.then(function(data) {
				 $rootScope.loggedIn = true; 
				 $scope.userName = $cookies.getObject("userName")
   				 $scope.lastName =  $cookies.getObject("lastName")
   				 $rootScope.role = $cookies.getObject("role")
   				 $scope.addLine1 = $cookies.getObject("addLine1")
   				 $scope.addLine2 = $cookies.getObject("addLine2")
   				 $scope.addCity = $cookies.getObject("addCity")
   				 $scope.addState = $cookies.getObject("addState")
   				 $scope.addZip = $cookies.getObject("addZip")
   				 $scope.phoneNumber = $cookies.getObject("phoneNumber")
   				 $scope.id = $cookies.getObject("userid")

				if (data.role === "restaurant") {
					$state.go("RestaurantLanding")
				} else {
					$state.go('dashboard')
				}
			});

	             }
	     })
	}

	$scope.doLoginRest = function() {

	$scope.processing = true;

		$scope.error = '';

		loginService.loginRest($scope.loginData.email, $scope.loginData.password)
			.success(function(data) {

				 $rootScope.loggedIn = true
				 $scope.name = $cookies.getObject("name")
   				 $rootScope.role = $cookies.getObject("role")
   				 $scope.addLine1 = $cookies.getObject("addLine1")
   				 $scope.addLine2 = $cookies.getObject("addLine2")
   				 $scope.addCity = $cookies.getObject("addCity")
   				 $scope.addState = $cookies.getObject("addState")
   				 $scope.addZip = $cookies.getObject("addZip")
   				 $scope.phoneNumber = $cookies.getObject("phoneNumber")
   				 $scope.id = $cookies.getObject("userid")
   				 console.log($scope.loggedIn)
   				 console.log($scope.role)

				if (data.message === "Invalid Password") {
					console.log(data.message)
					Materialize.toast('Invalid Password', 1000)

				} else {

				loginService.getRest()
					.then(function(data) {
						console.log(data)
					});

				$scope.processing = false;

					$state.go('RestaurantLanding');

				 }
			});
	}

	$scope.doLogout = function() {
		loginService.logout();
		$rootScope.loggedIn = false



		$state.go('home');


	}
});
