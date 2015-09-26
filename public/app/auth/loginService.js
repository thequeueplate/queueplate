var app = angular.module('QueuePlate')

app.service('loginService', function($http, $q, $state, $rootScope, authTokenService, $cookies) {
	var restData;
	this.getRestData = function(){
		return restData
	}
	this.login = function(email, password) {

		return $http.post('/api/users/login', {
			email: email,
			password: password

		})
		.success(function(data) {

			console.log(data)

			if (data.success === false) {
				alert("Please Check your email to confirm your account")
				$rootScope.loggedIn = false;
				$state.go('loginBoth')
			} else {

			authTokenService.setToken(data.token)

			$cookies.putObject("userName", data.firstName)
			$cookies.putObject("lastName", data.lastName)
			$cookies.putObject("role", data.role)

			$cookies.putObject("addLine1", data.addLine1)
			$cookies.putObject("addLine2", data.addLine2)
			$cookies.putObject("addCity", data.addCity)
			$cookies.putObject("addState", data.addState)
			$cookies.putObject("addZip", data.addZip)
			$cookies.putObject("phoneNumber", data.phoneNumber)


			$state.go('dashboard')
			return data

	        }
	    })
   }

	this.loginRest = function(email, password) {

		return $http.post('/api/rests/login', {
			email: email,
			password: password

		})
		.success(function(data) {

			console.log(data)
			restData = data;

			if (data.success === false) {
				alert("Please Check your email to confirm your account")
				$rootScope.loggedIn = false;
				$state.go('loginBoth')
			} else {
				authTokenService.setToken(data.token);
				$cookies.putObject("restFirstName", data.firstName)
				$cookies.putObject("restRole", data.role)

				$rootScope.loggedIn = true;

				return data;

			}
		})
	}

	this.logout = function() {
		authTokenService.setToken();

	}

	this.isLoggedIn = function() {
		if(authTokenService.getToken())
				return true;
		else
			return false;
	}

	this.getUser = function() {
		if(authTokenService.getToken())
			return $http.get('/api/users/me');
		else
			return $q.reject({message: "User has no token"})
	}

	this.getRest = function() {

		if(authTokenService.getToken())
			return $http.get('/api/rests/me');
		else
			return $q.reject({message: "Rest has no token"})

	}
});

app.service('authTokenService', function($window) {

	this.getToken = function() {
		return $window.localStorage.getItem('token');
	}

	this.setToken = function(token) {

		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	}
})

app.factory('AuthInterceptor', function($q, authTokenService) {

	var interceptorService = {};

	interceptorService.request = function(config) {

		var token = authTokenService.getToken();

		if(token) {

			config.headers['x-access-token'] = token;
		}
		return config;
	};

	interceptorService.responseError = function(response) {
		if(response.status == 403)
			$state.go('login');

		return $q.reject(response);
	}

	return interceptorService;
});
