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

					alert('username is already taken')

				} else {

				$state.go('verify');
				// $window.localStorage.setItem('token', response.data.token);

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

					alert('Restaraunt username is already taken')

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


	            alert("Enter password user validate");
	            var passwordconfirmed = false;
	        }

	        if (cp !== p || cp == "") {
					alert("Confirm Password doesn't match user validate");
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

	            alert("Enter password signUP CTRL line 95!");
	            var passwordrestconfirmed = false;
	        }

	        if (cpw !== pr || cpw == "") {
					alert("Confirm Password doesn't match signUP CTRL line 100");
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
