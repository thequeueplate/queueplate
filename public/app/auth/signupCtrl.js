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

	$scope.password = document.getElementById("password")

	$scope.passwordCheck = document.getElementById("passwordCheck");


	$scope.validatePassword = function(){

	        if (password.value == "") {
	            Materialize.toast("Enter password!", 1500);
	            var passwordconfirmed = false; 
	        }
	        
	        if (passwordCheck.value !== password.value || passwordCheck.value == "") {
					Materialize.toast("Confirm Password doesn't match", 1000); 
					var passwordconfirmed = false;
					
				} else {
					passwordCheck.value === password.value; 
					var passwordconfirmed = true;
				}

			if 	(passwordconfirmed === true) {
				   $scope.signupUser()
			}
	    }
	})























