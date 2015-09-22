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

				$state.go('verify');
				// $window.localStorage.setItem('token', response.data.token);


				}
			})
	}

	$scope.signupRestaurant = function() {
		$scope.message = '';


		signupService.create($scope.restData)
			.then(function(response) {
				console.log(response)

				$scope.userData = {};

				$scope.message = response.data.message;

				if(!response.data.success) {

					Materialize.toast('username is already taken', 2000)

				} else {

				$state.go('verify');
				// $window.localStorage.setItem('token', response.data.token);


				}
			})
	}

	$scope.password = document.getElementById("password")

	$scope.passwordCheck = document.getElementById("passwordCheck");


	$scope.validatePassword = function(p, cp){


	        if (p == "") {


	            Materialize.toast("Enter password!", 1500);
	            var passwordconfirmed = false;
	        }

	        if (cp !== p || cp == "") {
					Materialize.toast("Confirm Password doesn't match", 1000);
					var passwordconfirmed = false;

			} else if (cp === p) {

				var passwordconfirmed = true;
			}

			if 	(passwordconfirmed === true) {

				   $scope.signupUser()
			}
	    }

	    $scope.see = function() {
	    	$scope.showpassword = true;

	    }

	    $scope.hide = function() {
	    	$scope.showpassword = false;

	    }

	})
