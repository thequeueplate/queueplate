(function () {

  'use strict';

var app = angular.module('QueuePlate')

app.controller('dashboardCtrl', function($scope, $cookies, dashboardService) {
  
  $scope.customerView; 

   $scope.userName = $cookies.getObject("userName")
   $scope.lastName =  $cookies.getObject("lastName")
   $scope.role = $cookies.getObject("role")
   $scope.addLine1 = $cookies.getObject("addLine1")
   $scope.addLine2 = $cookies.getObject("addLine2")
   $scope.addCity = $cookies.getObject("addCity")
   $scope.addState = $cookies.getObject("addState")
   $scope.addZip = $cookies.getObject("addZip")
   $scope.phoneNumber = $cookies.getObject("phoneNumber")

["American", "Cajun", "Caribbean", "Chinese", "French", "German", "Greek", "Indian", "Italian", "Korean", "Lebanese", "Mediterranean", "Mexican", "Moroccan", "Soul", "Thai", "Turkish", "Vietnamese", "Other"]
 $scope.selected = [];

      $scope.toggle = function (cuisine, list) {
        var idx = list.indexOf(cuisine);
        if (idx > -1) list.splice(idx, 1);
        else list.push(cuisine);
      };

      $scope.exists = function (cuisine, list) {
        return list.indexOf(cuisine) > -1;
      };

//   function DemoCtrl ($timeout, $q) {
//     var self = this;

//     self.querySearch = querySearch;
//     self.allContacts = loadContacts();
//     self.contacts = [self.allContacts[0]];
//     self.filterSelected = true;

//     /**
//      * Search for contacts.
//      */
//     function querySearch (query) {
//       var results = query ?
//           self.allContacts.filter(createFilterFor(query)) : [];
//       return results;
//     }

//     /**
//      * Create filter function for a query string
//      */
//     function createFilterFor(query) {
//       var lowercaseQuery = angular.lowercase(query);

//       return function filterFn(contact) {
//         return (contact._lowername.indexOf(lowercaseQuery) != -1);;
//       };

//     }

//     function loadContacts() {
//       var contacts = [
//         'Marina Augustine',
//         'Oddr Sarno',
//         'Nick Giannopoulos',
//         'Narayana Garner',
//         'Anita Gros',
//         'Megan Smith',
//         'Tsvetko Metzger',
//         'Hector Simek',
//         'Some-guy withalongalastaname'
//       ];

//       return contacts.map(function (c, index) {
//         var cParts = c.split(' ');
//         var contact = {
//           name: c,
//           email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
//           image: 'http://lorempixel.com/50/50/people?' + index
//         };
//         contact._lowername = contact.name.toLowerCase();
//         return contact;
//       });
//     }
//   }





}); 


})();

