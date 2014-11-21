'use strict';

angular.module('sbApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/old', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });