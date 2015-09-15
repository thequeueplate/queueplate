var app = angular.module('QueuePlate')

app.controller('signupCtrl', function($rootScope, signupService, $state, $window, $scope) {

	$scope.signupUser = function() {
		$scope.message = '';


		signupService.create($scope.userData)
			.then(function(response) {

				$scope.userData = {};

				$scope.message = response.data.message;
				$rootScope.loggedIn = true; 

				if(!response.data.success) {
					Materialize.toast('username is already taken', 2000)
				} else {

				$window.localStorage.setItem('token', response.data.token);

				$state.go('dashboard');
				// $scope.$apply();
				}
			})
	}

})
