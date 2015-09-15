var app = angular.module('QueuePlate')

app.controller('loginCtrl', function($rootScope, $state, loginService, $scope) {

	$scope.doLogin = function() {

		$scope.processing = true;

		$scope.error = '';

		loginService.login($scope.loginData.username, $scope.loginData.password)
			.success(function(data) {

				if (data.message === "Invalid Password") {
					console.log(data.message)
					Materialize.toast('Invalid Password', 1000)
					
				} else {
		
		loginService.getUser()
			.then(function(data) {
				$rootScope.userInfo = data.data;
				});

				$scope.processing = false;
				$rootScope.loggedIn = true; 
				
					$state.go('dashboard'); 
				}
			});
	}

	$scope.doLogout = function() {
		loginService.logout();
		$rootScope.loggedIn = false; 

		$state.go('home'); 
	}


});

