'use strict';

angular.module('sbApp')
  .controller('SbResourceDescriptionController', function ($scope) {
    $scope.resourceName = 'Resource name';
    $scope.resourceDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis.' +
      ' Vestibulum tincidunt ipsum quis mauris laoreet, sit amet imperdiet nunc commodo.';
    $scope.resourceImage = '...';
  });