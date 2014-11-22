'use strict';

angular.module('sbApp')
  .controller('SbResourceVisualizationController', function ($scope, resourceManager) {
    resourceManager.registerResourceObserver(function () {
      $scope.graphData = resourceManager.getResourceGraphData();
    })
  });