var app = angular.module('QueuePlate')

app.service('loginService', function($http, $q, $state, $rootScope, authTokenService, $cookies) {

	this.register = function(user, UID) {
		var deferred = $q.defer()

		console.log(deferred)

		$http.put('/api/users/' + UID + '/pref', {
			firstName: user.firstName,
			lastName: user.lastName,
			age: user.age,
			gender: user.gender,
			addLine1: user.addLine1,
			addLine2: user.addLine2,
			addCity: user.addCity,
			addZip: user.addZip,
			addState: user.addState,
			phoneNumber: user.phoneNumber
			// cardNumber: cardNumber,
			// securityDigits: securityDigits,
			// dateOfExp: dateOfExp,

		})
		.then(function(data) {
			console.log(data)
			deferred.resolve(data) //this passes everything back to controller
			console.log(data)

		});

		return deferred.promise
		console.log()
	}
	
	var restData;
	this.getRestData = function(){
		return restData
	}
	this.login = function(email, password) {
		var d = $q.defer();

	    $http.post('/api/users/login', {
			email: email,
			password: password

		})
		.success(function(data) {
			$cookies.putObject("userName", data.firstName)
			$cookies.putObject("lastName", data.lastName)
			$cookies.putObject("role", data.role)
			$cookies.putObject("addLine1", data.addLine1)
			$cookies.putObject("addLine2", data.addLine2)
			$cookies.putObject("addCity", data.addCity)
			$cookies.putObject("addState", data.addState)
			$cookies.putObject("addZip", data.addZip)
			$cookies.putObject("phoneNumber", data.phoneNumber)

			console.log(data)

			d.resolve(data)

			if (data.success === false) {
				alert("Please Check your email to confirm your account")
				$state.go('loginBoth')
			} else {

			authTokenService.setToken(data.token)

			$state.go('dashboard')
	
	        }
	    }).error(function(err){
	    	d.reject(err)
	    })
	  return d.promise; 
    }


	this.loginRest = function(email, password) {

		return $http.post('/api/rests/login', {
			email: email,
			password: password

		})
		.success(function(data) {

			$cookies.putObject("role", data.role)
			$cookies.putObject("addLine1", data.addLine1)
			$cookies.putObject("addLine2", data.addLine2)
			$cookies.putObject("addCity", data.addCity)
			$cookies.putObject("addState", data.addState)
			$cookies.putObject("addZip", data.addZip)
			$cookies.putObject("name", data.name)

			console.log(data.role)
			restData = data;

			if (data.success === false) {
				alert("Please Check your email to confirm your account")
				$state.go('loginBoth')
			} else {
				authTokenService.setToken(data.token);
			
			
				
				$rootScope.loggedIn = true;

				return data;

			}
		})
	}


	this.logout = function() {
		
		$cookies.remove("userName")
		$cookies.remove("lastName")
		$cookies.remove("role")
		$cookies.remove("addLine1")
		$cookies.remove("addLine2")
		$cookies.remove("addCity")
		$cookies.remove("addState")
		$cookies.remove("addZip")
		$cookies.remove("phoneNumber")
		$cookies.remove("userid")

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
