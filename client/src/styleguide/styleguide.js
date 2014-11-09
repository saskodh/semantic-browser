'use strict';

angular.module('sbApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/styleguide', {
        templateUrl: 'src/styleguide/styleguide.html',
        controller: 'StyleguideCtrl'
      });
  });
