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

    $scope.resourceError = null;
    sbEventBus.registerListener(SB_APP_EVENTS.ERROR, function (event, error) {
      var errorMessage = 'Unknown error occurred while loading the resource.';
      // is known error
      if (error.data && error.data.error) {
        errorMessage = error.data.type + ': ' + error.data.message;
      }
      if (angular.isString(error.data)) {
        errorMessage = error.data;
      }

      $scope.resourceError = errorMessage;
    });

    if ($routeParams.resourceUri === 'example') {
      resourceManager.loadMockResource();
    } else {
      resourceManager.loadResource($routeParams.resourceUri);
    }
  });