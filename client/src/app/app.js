'use strict';

angular.module('sbApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .provider('sbAppBackend', function () {
    var routes = {};
    this.registerBackendRoute = function(key, route) {
      routes[key] = route;
    };
    var getBackendRoute = function (key) {
      return routes[key];
    };

    this.$get = function () {
      return {
        getRoute: getBackendRoute
      }
    }
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/resource/:resourceUri', {
        templateUrl: 'src/app/sbApp.tpl.html',
        controller: 'SbAppController'
      })
      .otherwise({
        redirectTo: '/resource/example'
      });

    //$locationProvider.html5Mode(true);
  });