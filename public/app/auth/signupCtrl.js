var app = angular.module('QueuePlate')

app.controller('signupCtrl', function(signupService, $state, $window, $scope) {

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

				}
			})
	}

	$scope.signupRestaurant = function() {
		$scope.message = '';

		console.log($scope.restData)
		signupService.createRest($scope.restData)

			.then(function(response) {
				console.log(response)

				$scope.restData = {};

				$scope.message = response.data.message;
				console.log($scope.message)

				if(!response.data.success) {

					Materialize.toast('Restaraunt username is already taken', 2000)

				} else {

				$state.go('verify');

				}
			})
	}

	$scope.password = document.getElementById("password")

	$scope.passwordCheck = document.getElementById("passwordCheck");

	$scope.validatePassword = function(p, cp){


	        if (p == "") {


	            Materialize.toast("Please enter a password", 1000);
	            var passwordconfirmed = false;
	        }

	        if (cp !== p || cp == "") {
					Materialize.toast("confirm Password does not match password", 2000);
					var passwordconfirmed = false;

			} else if (cp === p) {

				var passwordconfirmed = true;
			}

			if 	(passwordconfirmed === true) {

				   $scope.signupUser()
			}
	    }

	$scope.passwordRest = document.getElementById("passwordRest")

	$scope.passwordCheckRest = document.getElementById("passwordCheckRest");

	$scope.validatePasswordRest = function(pr, cpw){

	        if (pr == "") {

	            Materialize.toast("Enter password", 1500);
	            var passwordrestconfirmed = false;
	        }

	        if (cpw !== pr || cpw == "") {
					Materialize.toast("Confirm password does not match password", 2000);
					var passwordrestconfirmed = false;

			} else if (cpw === pr) {

				var passwordrestconfirmed = true;
			}

			if 	(passwordrestconfirmed === true) {

				   $scope.signupRestaurant()
			}
	    }

	    $scope.see = function() {
	    	$scope.showpassword = true;

	    }

	    $scope.hide = function() {
	    	$scope.showpassword = false;

	    }

	    $scope.seeRest = function() {
	    	$scope.showpasswordRest = true;

	    }

	    $scope.hideRest = function() {
	    	$scope.showpasswordRest = false;

	    }

	})
