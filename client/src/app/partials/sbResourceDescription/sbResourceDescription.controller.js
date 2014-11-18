'use strict';

angular.module('sbApp')
  .controller('SbResourceDescriptionController', function ($scope, resourceManager) {
    $scope.resource = {};
    // mock data
    $scope.resource.title = [{
      literals: [{
        language: 'en',
        text: 'Resource title'
      }]
    }];
    $scope.resource.description = [{
      literals: [{
        language: 'en',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
          'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis.' +
          ' Vestibulum tincidunt ipsum quis mauris laoreet, sit amet imperdiet nunc commodo.'
      }]
    }];
    $scope.resource.image = [{
      literals: [{
        language: 'en',
        text: '...'
      }]
    }];

    $scope.descriptionLimit = 250;
    resourceManager.registerResourceObserver(function () {
      $scope.resource = resourceManager.getResourceDescription();
    });
  });