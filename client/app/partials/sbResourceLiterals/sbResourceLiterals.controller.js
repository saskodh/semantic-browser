'use strict';

angular.module('sbApp')
  .controller('SbResourceLiteralsController', function ($scope, resourceManager) {
    $scope.literalSearchKeyword = '';
    $scope.literals = resourceManager.getResourceLiterals();

    resourceManager.registerResourceObserver(function () {
      $scope.literals = resourceManager.getResourceLiterals();
    });
  });