'use strict';

angular.module('sbApp')
  .controller('SbAppController', function ($scope, $routeParams, resourceManager, SB_APP_EVENTS, sbEventBus) {
    $scope.showResourceDescription = false;
    var checkResourceDescription = function (resourceDescription) {
      $scope.showResourceDescription = resourceDescription && (resourceDescription.image[0] ||
        resourceDescription.description[0] || resourceDescription.title[0]);
    };

    $scope.isSpinnerActive = false;
    sbEventBus.registerListener(SB_APP_EVENTS.RESOURCE_LOAD_START, function () {
      $scope.isSpinnerActive = true;
    });
    sbEventBus.registerListener(SB_APP_EVENTS.RESOURCE_LOAD_END, function () {
      $scope.isSpinnerActive = false;
      checkResourceDescription(resourceManager.getResourceDescription());
    });

    if ($routeParams.resourceUri === 'example') {
      resourceManager.loadMockResource();
    } else {
      resourceManager.loadResource($routeParams.resourceUri);
    }
  });