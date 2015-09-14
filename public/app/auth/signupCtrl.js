var app = angular.module('QueuePlate')

app.controller('signupCtrl', function(signupService, $state, $window, $scope) {

//??
	// signupService.all()
	// 	.success(function(data) {
	// 		$scope.users = data;
	// 		console.log($scope.users)
	// 	})
//??

	$scope.signupUser = function() {
		$scope.message = '';


		signupService.create($scope.userData)
			.then(function(response) {

				$scope.userData = {};
				$scope.message = response.data.message;

				$window.localStorage.setItem('token', response.data.token);
				console.log('token')
				console.log(response.data.token)

				$state.go('dashboard');
			})
	}

})
