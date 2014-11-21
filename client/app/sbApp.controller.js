'use strict';

angular.module('sbApp')
  .controller('SbAppController', function ($scope, $routeParams, resourceManager, SB_APP_EVENTS, sbEventBus, $location) {

    $scope.isSpinnerActive = false;
    sbEventBus.registerListener(SB_APP_EVENTS.RESOURCE_LOAD_START, function () {
      $scope.isSpinnerActive = true;
    });
    sbEventBus.registerListener(SB_APP_EVENTS.RESOURCE_LOAD_END, function () {
      $scope.isSpinnerActive = false;
    });

    resourceManager.loadResource($routeParams.resourceUri);
  });