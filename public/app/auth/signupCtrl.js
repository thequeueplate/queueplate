var app = angular.module('QueuePlate')

app.controller('signupCtrl', function($rootScope, signupService, $state, $window, $scope) {

	$scope.signupUser = function() {
		$scope.message = '';


		signupService.create($scope.userData)
			.then(function(response) {
				console.log(response)

				$scope.userData = {};

				$scope.message = response.data.message;

				if(!response.data.success) {

					Materialize.toast('username is already taken', 2000)

				} else {

				$window.localStorage.setItem('token', response.data.token);

				$state.go('dashboard');

				}
			})
	}

})
