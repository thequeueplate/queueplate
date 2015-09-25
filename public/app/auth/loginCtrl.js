var app = angular.module('QueuePlate')

app.controller('loginCtrl', function($rootScope, $state, loginService, $scope) {

	$scope.doLogin = function() {

		$scope.processing = true;

		$scope.error = '';

		loginService.login($scope.loginData.email, $scope.loginData.password)
			.success(function(data) {
			
				if (data.message === "Invalid Password") {
					console.log(data.message)
					Materialize.toast('Invalid Password', 1000)
					
				} else {
		
		loginService.getUser()
			.then(function(data) {
				console.log(data)
				});

				$scope.processing = false;
				$rootScope.loggedIn = true; 
				
					$state.go('dashboard'); 
				}
			});
	}

	$scope.doLoginRest = function() {

	$scope.processing = true;

		$scope.error = '';

		loginService.loginRest($scope.loginData.email, $scope.loginData.password)
			.success(function(data) {
			
				if (data.message === "Invalid Password") {
					console.log(data.message)
					Materialize.toast('Invalid Password', 1000)
					
				} else {
		
		loginService.getRest()
			.then(function(data) {
				console.log(data)
				});

				$scope.processing = false;
				$rootScope.loggedIn = true; 
				
					$state.go('RestLanding'); 

				 }
			});
	}

	$scope.doLogout = function() {
		loginService.logout();
		$rootScope.loggedIn = false; 

		$state.go('home'); 
	}
});

