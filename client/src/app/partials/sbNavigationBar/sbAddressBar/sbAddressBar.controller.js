'use strict';

angular.module('sbApp')
  .controller('SbAddressBarController', function ($scope, sbEventBus, SB_APP_EVENTS, searchService, resourceManager) {
    $scope.addressBar = '';
    $scope.searchingResources = false;
    sbEventBus.registerListener(SB_APP_EVENTS.RESOURCE_LOAD_START, function (e, resourceUri) {
      $scope.addressBar = resourceUri;
    });
    
    var isUrl = function (text) {
      return text.search('http://') !== -1;
    };

    $scope.isResource = function (addressBarText) {
      return isUrl(addressBarText);
    };
    $scope.searchResource = function (searchTerm) {
      return searchService.getResults(searchTerm);
    };
    $scope.submitAction = function (addressBarText) {
      if(isUrl(addressBarText)) {}
      resourceManager.loadResource(addressBarText);
    }
  });