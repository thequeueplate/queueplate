var app = angular.module('QueuePlate')

app.controller('loginCtrl', function($rootScope, $state, loginService, $scope) {

	$scope.doLogin = function() {

		$scope.processing = true;

		$scope.error = '';

		loginService.login($scope.loginData.username, $scope.loginData.password)
			.success(function(data) {
				debugger

				if (data.message === "Invalid Password") {
					console.log(data.message)
					alert(data.message)
				} else {
		
				$scope.processing = false;
				$rootScope.loggedIn= true; 


					$state.go('dashboard'); //home????
				}
			});
	}

	$scope.doLogout = function() {
		loginService.logout();
		$rootScope.loggedIn = false; 
		$state.go('home'); //// maybe a 'logout page'
	}


});


// loginService.getUser()
// 					.then(function(data) {
// 						$scope.user = data.data;
// 					});