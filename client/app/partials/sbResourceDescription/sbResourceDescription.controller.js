'use strict';

angular.module('sbApp')
  .controller('SbResourceDescriptionController', function ($scope, resourceManager) {
    $scope.resource = resourceManager.getResourceDescription();

    resourceManager.registerResourceObserver(function () {
      $scope.resource = resourceManager.getResourceDescription();
    });
  });