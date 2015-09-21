var app = angular.module('QueuePlate')

app.controller('dashboardCtrl', function($scope, loginService) {

	console.log(loginService.testMessage)

})