var app = angular.module('QueuePlate')

app.service('loginService', function($http, $q, $state, authTokenService, $cookies) {
		
	this.login = function(email, password) {
		
		return $http.post('/api/users/login', {
			email: email, 
			password: password
		
		})
		.success(function(data) {

			console.log(data)
			authTokenService.setToken(data.token)

			$cookies.putObject("firstName", data.firstName)
			$cookies.putObject("lastName", data.lastName)
			$cookies.putObject("verify", data.verify)

			return data
			
		})
	}

	this.loginRest = function(email, password) {
		
		return $http.post('/api/rests/login', {
			email: email, 
			password: password
		
		})
		.success(function(data) {

			console.log(data)
			authTokenService.setToken(data.token)

			return data
			
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


