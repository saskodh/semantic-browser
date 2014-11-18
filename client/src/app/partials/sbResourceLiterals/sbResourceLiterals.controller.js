'use strict';

angular.module('sbApp')
  .controller('SbResourceLiteralsController', function ($scope, resourceManager) {
    $scope.literalSearchKeyword = '';
    $scope.literals = [];
    $scope.literals.push({
      uri: 'abstract',
      name: 'abstract',
      literals: [
        {
          language: 'en',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis. ' +
            'Vestibulum tincidunt ipsum quis mauris laoreet, sit amet imperdiet nunc commodo.'
        },
        {
          language: 'de',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis.'
        }
      ]
    });
    $scope.literals.push(angular.copy($scope.literals[0]));
    $scope.literals.push(angular.copy($scope.literals[0]));
    $scope.literals.push(angular.copy($scope.literals[0]));

    resourceManager.registerResourceObserver(function () {
      $scope.literals = resourceManager.getResourceLiterals();
    })
  });