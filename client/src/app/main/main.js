'use strict';

angular.module('sbApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/app/main/main.html',
        controller: 'MainCtrl'
      });
  });