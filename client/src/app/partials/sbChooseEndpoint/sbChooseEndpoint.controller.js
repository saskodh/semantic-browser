'use strict';

angular.module('sbApp')

  .controller('SbChooseEndpointController', function ($scope, sbChooseEndpoint, sbEndpoint) {
    $scope.endpoints = [];
    $scope.searchEndpoint = '';
    $scope.textLengthLimit = 50;
    $scope.currentEndpointName = '';

    sbChooseEndpoint.getEndpoints().then(function (endpoints) {
      $scope.endpoints = endpoints;
    });
    $scope.selectEndpoint = function (selectedEndpoint) {
      $scope.currentEndpointName = selectedEndpoint.name.substring(0, 10);
      sbEndpoint.setCurrentEndpoint(selectedEndpoint);
    };
  });