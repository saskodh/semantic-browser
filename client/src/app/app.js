'use strict';

angular.module('sbApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .constant('SB_APP_BACKEND', {
    'ENDPOINTS': 'api/endpoints'
  })
  .constant('SB_APP_EVENTS', {
    'CHANGE_ENDPOINT': 'change_endpoint'
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });