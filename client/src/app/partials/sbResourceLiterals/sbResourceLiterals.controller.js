'use strict';

angular.module('sbApp')
  .controller('SbResourceLiteralsController', function ($scope) {
    $scope.literalSearchKeyword = '';
    $scope.literals = [];
    $scope.literals.push({
      uri: 'abstract',
      name: 'abstract',
      values: [
        {
          lang: 'en',
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis. ' +
            'Vestibulum tincidunt ipsum quis mauris laoreet, sit amet imperdiet nunc commodo.'
        },
        {
          lang: 'de',
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis.'
        }
      ]
    });
    $scope.literals.push(angular.copy($scope.literals[0]));
    $scope.literals.push(angular.copy($scope.literals[0]));
    $scope.literals.push(angular.copy($scope.literals[0]));
  });