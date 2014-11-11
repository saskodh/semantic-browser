'use strict';

angular.module('sbApp')

  .controller('SbChooseEndpointController', function ($scope, sbChooseEndpoint, SB_APP_EVENTS, $log) {
    $scope.endpoints = [];
    $scope.searchEndpoint = '';
    $scope.textLengthLimit = 50;

    sbChooseEndpoint.getEndpoints().then(function (endpoints) {
      $scope.endpoints = endpoints;
    });
    $scope.selectEndpoint = function (selectedEndpoint) {
      $log.debug(SB_APP_EVENTS.CHANGE_ENDPOINT, selectedEndpoint);
      $scope.$emit(SB_APP_EVENTS.CHANGE_ENDPOINT, selectedEndpoint);
    }
  });