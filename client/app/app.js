'use strict';

angular.module('sbApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ngAnimate'
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
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/resource/:resourceUri*', {
        templateUrl: 'app/sbApp.tpl.html',
        controller: 'SbAppController'
      })
      .otherwise({
        redirectTo: '/resource/example'
      });

    $locationProvider.html5Mode(true);
  });